const { test } = require('node:test'),
  assert = require('node:assert/strict'),
  { generateKeyPairSync, sign, createHash } = require('node:crypto'),
  fs = require('node:fs/promises'),
  os = require('node:os'),
  path = require('node:path');
const { parseVerifiedRelease, verifyArtifact } = require('../packages/hypekit/manifest.cjs'),
  { startTransfer } = require('../packages/hypekit/transfer.cjs');
test('IND-QA-017 IND-QA-018 signed update rejects tampering, wrong key and rollback', () => {
  const { publicKey, privateKey } = generateKeyPairSync('ed25519'),
    now = Date.now(),
    bytes = Buffer.from('original');
  const manifest = {
    schemaVersion: 1,
    sequence: 2,
    version: '0.1.0',
    createdAt: new Date(now - 1000).toISOString(),
    expiresAt: new Date(now + 60000).toISOString(),
    artifacts: [
      {
        path: 'app.zip',
        sha256: createHash('sha256').update(bytes).digest('hex'),
        bytes: bytes.length,
        approval: 'approved'
      }
    ]
  };
  const payload = Buffer.from(JSON.stringify(manifest)),
    envelope = {
      payload: payload.toString('base64'),
      signature: sign(null, payload, privateKey).toString('base64')
    };
  assert.equal(parseVerifiedRelease(envelope, publicKey, { now, minimumSequence: 1 }).sequence, 2);
  assert(verifyArtifact(bytes, manifest.artifacts[0]));
  assert(!verifyArtifact(Buffer.from('tamper'), manifest.artifacts[0]));
  assert.throws(() =>
    parseVerifiedRelease({ ...envelope, payload: Buffer.from('{}').toString('base64') }, publicKey)
  );
  assert.throws(() => parseVerifiedRelease(envelope, generateKeyPairSync('ed25519').publicKey));
  assert.throws(() => parseVerifiedRelease(envelope, publicKey, { now: now + 120000 }));
  assert.throws(() => parseVerifiedRelease(envelope, publicKey, { minimumSequence: 2 }));
});
test('IND-QA-020-022 real authenticated loopback transfer bounds', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'hype-transfer-')),
    transfer = await startTransfer({ root });
  try {
    const headers = { Authorization: 'Bearer ' + transfer.token };
    assert.equal(
      (await fetch(transfer.url + '/note.txt', { method: 'PUT', body: 'denied' })).status,
      401
    );
    assert.equal(
      (await fetch(transfer.url + '/note.txt', { method: 'PUT', headers, body: 'owned file' }))
        .status,
      201
    );
    assert.equal(await (await fetch(transfer.url + '/note.txt', { headers })).text(), 'owned file');
    assert.equal(
      (await fetch(transfer.url + '/note.txt', { method: 'PUT', headers, body: 'overwrite' }))
        .status,
      409
    );
    assert.equal(
      (
        await fetch(transfer.url + '/%2e%2e%2fescape.txt', {
          method: 'PUT',
          headers,
          body: 'escape'
        })
      ).status,
      400
    );
    assert.equal(
      (await fetch(transfer.url + '/cmd.exe', { method: 'PUT', headers, body: 'executable' }))
        .status,
      400
    );
    assert.equal(
      (
        await fetch(transfer.url + '/large.txt', {
          method: 'PUT',
          headers,
          body: 'x'.repeat(1048577)
        })
      ).status,
      413
    );
    assert.equal(
      (
        await fetch(transfer.url + '/note.txt', {
          headers: { ...headers, Origin: 'https://evil.invalid' }
        })
      ).status,
      401
    );
  } finally {
    await transfer.stop();
    await fs.rm(root, { recursive: true, force: true });
  }
});
