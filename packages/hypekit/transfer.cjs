'use strict';
const http = require('node:http'),
  fs = require('node:fs/promises'),
  path = require('node:path'),
  { randomBytes, timingSafeEqual } = require('node:crypto');
async function startTransfer({ root, ttlMs = 300000, maxBytes = 1048576 }) {
  if (!Number.isInteger(ttlMs) || ttlMs <= 0 || ttlMs > 300000) throw new Error('INVALID_EXPIRY');
  await fs.mkdir(root, { recursive: true });
  const info = await fs.lstat(root);
  if (info.isSymbolicLink()) throw new Error('SYMLINK_ROOT');
  const base = await fs.realpath(root),
    secret = randomBytes(32).toString('hex'),
    expiresAt = Date.now() + ttlMs;
  const server = http.createServer(async (req, res) => {
    const finish = (code, message) => {
      res.writeHead(code, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
      res.end(JSON.stringify({ code: message }));
    };
    const auth = req.headers.authorization ?? '',
      expected = 'Bearer ' + secret;
    if (
      req.headers.origin ||
      Date.now() >= expiresAt ||
      Buffer.byteLength(auth) !== Buffer.byteLength(expected) ||
      !timingSafeEqual(Buffer.from(auth), Buffer.from(expected))
    )
      return finish(401, 'UNAUTHORIZED');
    const name = req.url?.slice(1) ?? '';
    if (
      !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}\.(json|txt|sav)$/.test(name) ||
      /^(CON|PRN|AUX|NUL|COM[0-9]|LPT[0-9])\./i.test(name)
    )
      return finish(400, 'INVALID_APP_FILE');
    const target = path.join(base, name);
    let file;
    try {
      const stat = await fs.lstat(target).catch((e) => {
        if (e.code === 'ENOENT') return null;
        throw e;
      });
      if (stat?.isSymbolicLink() || (stat && !stat.isFile())) return finish(403, 'DENIED');
      if (req.method === 'GET') {
        if (!stat) return finish(404, 'NOT_FOUND');
        if (stat.size > maxBytes) return finish(413, 'TOO_LARGE');
        const content = await fs.readFile(target);
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
          'Cache-Control': 'no-store'
        });
        return res.end(content);
      }
      if (req.method !== 'PUT') return finish(405, 'METHOD_NOT_ALLOWED');
      // Exclusive creation: existing files are never silently overwritten by transfer.
      if (stat) return finish(409, 'EXISTS');
      const staging = target + '.' + randomBytes(8).toString('hex') + '.partial';
      try {
        file = await fs.open(staging, 'wx', 0o600);
        let bytes = 0;
        for await (const chunk of req) {
          bytes += chunk.length;
          if (bytes > maxBytes) {
            await file.close();
            file = null;
            await fs.unlink(staging);
            return finish(413, 'TOO_LARGE');
          }
          await file.write(chunk);
        }
        await file.sync();
        await file.close();
        file = null;
        await fs.link(staging, target);
        await fs.unlink(staging);
        finish(201, 'STORED');
      } catch (e) {
        if (file) await file.close();
        await fs.unlink(staging).catch(() => {});
        finish(e.code === 'EEXIST' ? 409 : 500, 'WRITE_FAILED');
      }
    } catch {
      finish(500, 'IO_ERROR');
    }
  });
  await new Promise((resolve, reject) => {
    server.once('error', reject);
    server.listen(0, '127.0.0.1', resolve);
  });
  const timer = setTimeout(() => {
    server.close();
    server.closeAllConnections();
  }, ttlMs);
  timer.unref();
  return {
    url: 'http://127.0.0.1:' + server.address().port,
    token: secret,
    expiresAt,
    stop: () =>
      new Promise((resolve) => {
        clearTimeout(timer);
        server.close(resolve);
        server.closeAllConnections();
      })
  };
}
module.exports = { startTransfer };
