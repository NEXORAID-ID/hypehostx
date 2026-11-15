import { postgres, migrate } from './database.js';
import { createApp } from './server.js';
async function main() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL required');
  const db = await postgres(process.env.DATABASE_URL);
  await migrate(db);
  // Mail is intentionally unavailable until an operator supplies an approved transport.
  // Returning 503 is preferable to a registration success that cannot deliver verification.
  const { app } = await createApp({
    db,
    origins: (process.env.ALLOWED_ORIGINS ?? '').split(',').filter(Boolean)
  });
  await app.listen({ host: '127.0.0.1', port: 3000 });
  for (const signal of ['SIGINT', 'SIGTERM'] as const)
    process.on(signal, () => {
      void app.close().then(() => db.close());
    });
}
void main().catch(() => {
  console.error('HYPENET startup failed; inspect configuration and database availability.');
  process.exitCode = 1;
});
