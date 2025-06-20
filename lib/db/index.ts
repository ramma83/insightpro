import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_PATH) {
  throw new Error('DATABASE_PATH environment variable is not set');
}

const sqlite = new Database(process.env.DATABASE_PATH);
export const db = drizzle(sqlite);
