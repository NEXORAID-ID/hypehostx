import { Pool } from 'pg';
import { readFileSync } from 'node:fs';
export type Row = Record<string, any>;
export interface Database {
  query(sql: string, params?: unknown[]): Promise<{ rows: Row[] }>;
  transaction<T>(fn: (db: Database) => Promise<T>): Promise<T>;
  close(): Promise<void>;
}
export async function postgres(url: string): Promise<Database> {
  const pool = new Pool({ connectionString: url, max: 10 });
  const db: Database = {
    query: async (sql, params) => pool.query(sql, params),
    close: () => pool.end(),
    transaction: async (fn) => {
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const tx: Database = {
          query: (s, p) => client.query(s, p),
          transaction: async (f) => f(tx),
          close: async () => {}
        };
        const value = await fn(tx);
        await client.query('COMMIT');
        return value;
      } catch (e) {
        await client.query('ROLLBACK');
        throw e;
      } finally {
        client.release();
      }
    }
  };
  return db;
}
export async function migrate(db: Database) {
  await db.transaction(async (tx) => {
    await tx.query('CREATE TABLE IF NOT EXISTS schema_migrations(version integer PRIMARY KEY)');
    const r = await tx.query('SELECT version FROM schema_migrations WHERE version=1');
    if (!r.rows.length) await tx.query(readFileSync('backend/migrations/001_initial.sql', 'utf8'));
  });
}
