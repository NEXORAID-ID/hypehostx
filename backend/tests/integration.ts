import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createApp } from '../src/server.js';
import type { Database } from '../src/database.js';
import WebSocket from 'ws';
test('HYPENET PostgreSQL engine API and two real WebSocket clients', async () => {
  const pg = new PGlite();
  await pg.exec(readFileSync('backend/migrations/001_initial.sql', 'utf8'));
  const wrap = (engine: any): Database => ({
    query: (s, p) => engine.query(s, p),
    transaction: (fn) => engine.transaction((tx: any) => fn(wrap(tx))),
    close: () => pg.close()
  });
  const mails: any[] = [];
  const { app, routes } = await createApp({
    db: wrap(pg),
    sendMail: async (mail) => {
      mails.push(mail);
    },
    origins: ['http://127.0.0.1:4173'],
    authLimit: 100
  });
  const request = async (method: any, url: string, body?: unknown, token?: string) => {
    const r = await app.inject({
      method,
      url: '/api/v1' + url,
      payload: body as any,
      headers: token ? { authorization: 'Bearer ' + token } : {}
    });
    return { status: r.statusCode, body: r.json() };
  };
  async function user(name: string) {
    assert.equal(
      (
        await request('POST', '/auth/register', {
          email: name + '@example.test',
          password: 'Long-passphrase-123!',
          displayName: name
        })
      ).status,
      200
    );
    const mail = mails.at(-1);
    assert.equal((await request('POST', '/auth/verify', { token: mail.token })).status, 200);
    assert.equal((await request('POST', '/auth/verify', { token: mail.token })).status, 400);
    const login = await request('POST', '/auth/login', {
      email: name + '@example.test',
      password: 'Long-passphrase-123!'
    });
    assert.equal(login.status, 200);
    const me = await request('GET', '/me', undefined, login.body.token);
    return { id: me.body.user_id, token: login.body.token };
  }
  try {
    const a = await user('alice'),
      b = await user('bob'),
      c = await user('charlie');
    assert.equal((await request('GET', '/me')).status, 401);
    assert.equal(
      (
        await request(
          'PATCH',
          '/me',
          { displayName: 'x', presenceVisible: false, role: 'moderator' },
          a.token
        )
      ).status,
      400
    );
    const origin = await app.inject({
      method: 'GET',
      url: '/api/v1/status',
      headers: { origin: 'https://evil.invalid' }
    });
    assert.equal(origin.statusCode, 403);
    const invalid = await request('POST', '/auth/login', {
      email: 'alice@example.test',
      password: 'Wrong-password-123'
    });
    assert.equal(invalid.status, 401);
    const fr = await request('POST', '/friend-requests', { userId: b.id }, a.token);
    assert.equal(fr.status, 200);
    assert.equal(
      (
        await request(
          'POST',
          '/friend-requests/' + fr.body.id + '/respond',
          { accept: true },
          c.token
        )
      ).status,
      404
    );
    assert.equal(
      (
        await request(
          'POST',
          '/friend-requests/' + fr.body.id + '/respond',
          { accept: true },
          b.token
        )
      ).status,
      200
    );
    const conversation = await request('POST', '/conversations', { userId: b.id }, a.token);
    assert.equal(conversation.status, 200);
    const path = '/conversations/' + conversation.body.id + '/messages';
    assert.equal(
      (await request('POST', path, { body: '<script>text only</script>' }, a.token)).status,
      200
    );
    assert.equal((await request('GET', path, undefined, c.token)).status, 404);
    assert.equal((await request('POST', path, { body: 'intrude' }, c.token)).status, 404);
    assert.equal((await request('GET', path, undefined, b.token)).body.items.length, 1);
    assert.equal(
      (await request('POST', '/reports', { userId: b.id, reason: 'test report' }, a.token)).status,
      200
    );
    assert.equal((await request('GET', '/moderation/reports', undefined, a.token)).status, 403);
    const lobby = await request(
      'POST',
      '/lobbies',
      { name: 'Original demo', capacity: 2 },
      a.token
    );
    assert.equal(lobby.status, 200);
    assert.equal(
      (await request('POST', '/lobbies/' + lobby.body.id + '/join', {}, b.token)).status,
      200
    );
    assert.equal(
      (await request('POST', '/lobbies/' + lobby.body.id + '/join', {}, c.token)).status,
      409
    );
    assert.equal(
      (await request('DELETE', '/lobbies/' + lobby.body.id, undefined, c.token)).status,
      404
    );
    const save = '/saves/hypeconnect-demo/slot1';
    assert.equal(
      (await request('PUT', save, { revision: 0, content: 'own app save' }, a.token)).body.revision,
      1
    );
    assert.equal(
      (await request('PUT', save, { revision: 0, content: 'stale' }, a.token)).status,
      409
    );
    assert.equal((await request('GET', save, undefined, b.token)).status, 404);
    assert.equal(
      (await request('PUT', '/saves/retail-game/slot1', { revision: 0, content: 'no' }, a.token))
        .status,
      400
    );
    await app.listen({ host: '127.0.0.1', port: 0 });
    const address = app.server.address();
    assert(address && typeof address !== 'string');
    const connect = (t: string) =>
      new Promise<WebSocket>((resolve, reject) => {
        const ws = new WebSocket(`ws://127.0.0.1:${address.port}/api/v1/events`, {
          headers: { authorization: 'Bearer ' + t }
        });
        ws.once('open', () => resolve(ws));
        ws.once('error', reject);
      });
    const wa = await connect(a.token),
      wb = await connect(b.token);
    const next = (ws: WebSocket, type: string) =>
      new Promise<any>((resolve, reject) => {
        const timer = setTimeout(() => {
          ws.off('message', listener);
          reject(new Error('event timeout ' + type));
        }, 5000);
        function listener(raw: WebSocket.RawData) {
          const msg = JSON.parse(raw.toString());
          if (msg.type === type) {
            clearTimeout(timer);
            ws.off('message', listener);
            resolve(msg);
          }
        }
        ws.on('message', listener);
      });
    for (const ws of [wa, wb]) {
      const promise = next(ws, 'subscribed');
      ws.send(JSON.stringify({ type: 'subscribe', lobbyId: lobby.body.id }));
      await promise;
    }
    const delivered = next(wb, 'demo.move');
    wa.send(JSON.stringify({ type: 'demo.move', lobbyId: lobby.body.id, x: 12, y: 34 }));
    const event = await delivered;
    assert.equal(event.payload.x, 12);
    assert.equal(event.payload.userId, a.id);
    wa.close();
    wb.close();
    assert.equal((await request('PUT', '/blocks/' + b.id, {}, a.token)).status, 200);
    assert.equal((await request('POST', path, { body: 'blocked' }, b.token)).status, 403);
    assert.equal((await request('GET', '/friends', undefined, a.token)).body.items.length, 0);
    assert.equal((await request('GET', '/catalog')).body.items.length, 0);
    assert.equal(
      (await request('POST', '/auth/reset/request', { email: 'absent@example.test' })).status,
      200
    );
    assert.equal(
      (await request('POST', '/auth/reset/request', { email: 'alice@example.test' })).status,
      200
    );
    const reset = mails.at(-1);
    assert.equal(
      (
        await request('POST', '/auth/reset/confirm', {
          token: reset.token,
          password: 'Another-passphrase-123'
        })
      ).status,
      200
    );
    assert.equal((await request('GET', '/me', undefined, a.token)).status, 401);
    assert.equal((await request('DELETE', '/me', undefined, b.token)).status, 200);
    assert.equal((await request('GET', '/me', undefined, b.token)).status, 401);
    mkdirSync('evidence', { recursive: true });
    writeFileSync(
      'evidence/network.json',
      JSON.stringify(
        {
          engine: 'PGlite PostgreSQL WASM (not Docker PostgreSQL)',
          scope: 'local HTTP on loopback only',
          routes: routes.length,
          twoClientEvent: { type: event.type, x: event.payload.x, y: event.payload.y },
          checks: [
            'registration',
            'verification single-use',
            'login',
            'authz',
            'strict body',
            'origin denial',
            'friends',
            'membership',
            'block',
            'report role',
            'lobby capacity',
            'save ownership/conflict',
            'two-client WebSocket',
            'reset revoke',
            'account deletion'
          ],
          result: 'PASS'
        },
        null,
        2
      )
    );
    mkdirSync('packages/contracts', { recursive: true });
    writeFileSync('packages/contracts/routes.json', JSON.stringify(routes, null, 2));
  } finally {
    await app.close();
    await pg.close();
  }
});
