import { PGlite } from '@electric-sql/pglite';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createApp } from '../src/server.js';
import { Database } from '../src/database.js';
async function main() {
  if (process.env.NODE_ENV === 'production')
    throw new Error('Development mail sink cannot run in production');
  mkdirSync('backend/data/mail', { recursive: true });
  const pg = new PGlite('backend/data/postgres');
  await pg.exec('CREATE TABLE IF NOT EXISTS schema_migrations(version integer PRIMARY KEY)');
  if (!(await pg.query('SELECT * FROM schema_migrations WHERE version=1')).rows.length)
    await pg.exec(readFileSync('backend/migrations/001_initial.sql', 'utf8'));
  const wrap = (engine: any): Database => ({
    query: (sql, params) => engine.query(sql, params),
    transaction: (fn) => engine.transaction((tx: any) => fn(wrap(tx))),
    close: () => pg.close()
  });
  const { app } = await createApp({
    db: wrap(pg),
    origins: ['http://127.0.0.1:3000'],
    sendMail: async (mail) => {
      writeFileSync(
        'backend/data/mail/' + Date.now() + '-' + mail.purpose + '.json',
        JSON.stringify(mail),
        { mode: 0o600 }
      );
    }
  });
  for (const [route, file, mime] of [
    ['/', 'index.html', 'text/html'],
    ['/online.js', 'online.js', 'text/javascript'],
    ['/styles.css', 'styles.css', 'text/css']
  ])
    app.get(route, async (_req, reply) =>
      reply.type(mime).send(readFileSync('clients/online/' + file))
    );
  await app.listen({ host: '127.0.0.1', port: 3000 });
  console.log(
    'HYPENET development only: http://127.0.0.1:3000 | mail sink: backend/data/mail (private; never publish)'
  );
  for (const signal of ['SIGINT', 'SIGTERM'] as const)
    process.on(signal, () => {
      void app.close().then(() => pg.close());
    });
}
void main().catch((e) => {
  console.error(e.message);
  process.exitCode = 1;
});
