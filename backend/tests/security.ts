import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PGlite } from '@electric-sql/pglite';
import { readFileSync, writeFileSync } from 'node:fs';
import { createApp } from '../src/server.js';
import type { Database } from '../src/database.js';
test('rate limits, disabled mail, invalid JSON and actual PostgreSQL backup restore', async () => {
  const pg = new PGlite();
  await pg.exec(readFileSync('backend/migrations/001_initial.sql', 'utf8'));
  const wrap = (engine: any): Database => ({
    query: (s, p) => engine.query(s, p),
    transaction: (fn) => engine.transaction((tx: any) => fn(wrap(tx))),
    close: () => pg.close()
  });
  const { app } = await createApp({ db: wrap(pg), origins: [], authLimit: 2 });
  try {
    const request = () =>
      app.inject({
        method: 'POST',
        url: '/api/v1/auth/register',
        payload: {
          email: 'test@example.test',
          password: 'Long-passphrase-123',
          displayName: 'test'
        }
      });
    assert.equal((await request()).statusCode, 503);
    assert.equal((await request()).statusCode, 503);
    assert.equal((await request()).statusCode, 429);
    assert.equal((await pg.query('SELECT id FROM users')).rows.length, 0);
    const invalid = await app.inject({
      method: 'POST',
      url: '/api/v1/reports',
      headers: { 'content-type': 'application/json' },
      payload: '{broken'
    });
    assert.equal(invalid.statusCode, 400);
    assert(!invalid.body.includes('SyntaxError'));
    const large = await app.inject({
      method: 'POST',
      url: '/api/v1/reports',
      headers: { 'content-type': 'application/json' },
      payload: 'x'.repeat(1100001)
    });
    assert.equal(large.statusCode, 413);
    await pg.query("INSERT INTO audit_events(id,code) VALUES('restore-test','BACKUP_TEST')");
    const backup = await pg.dumpDataDir();
    const restored = new PGlite({ loadDataDir: backup });
    try {
      assert.equal(
        (await restored.query("SELECT code FROM audit_events WHERE id='restore-test'")).rows.length,
        1
      );
      writeFileSync(
        'evidence/backup-restore.json',
        JSON.stringify(
          {
            engine: 'PGlite PostgreSQL WASM',
            result: 'PASS',
            backupBytes: backup.size,
            scope:
              'in-memory database archive restored into a separate engine; Docker pg_dump not exercised'
          },
          null,
          2
        )
      );
    } finally {
      await restored.close();
    }
  } finally {
    await app.close();
    await pg.close();
  }
});
