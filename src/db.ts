import { Pool } from 'pg';

export const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export async function initDb() {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT false
    );
  `);

    const { rows } = await pool.query<{ count: string }>(
        'SELECT COUNT(*)::text AS count FROM tasks',
    );

    if (Number(rows[0].count) === 0) {
        await pool.query(`
      INSERT INTO tasks (title, done) VALUES
        ('Learn Docker', true),
        ('Learn Compose', true),
        ('Learn networks', false);
    `);
    }
}