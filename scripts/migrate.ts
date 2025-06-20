import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db } from '../lib/db';

console.log('Running database migrations...');

try {
  migrate(db, { migrationsFolder: './lib/db/migrations' });
  console.log('Migrations applied successfully!');
  process.exit(0);
} catch (error) {
  console.error('Error applying migrations:', error);
  process.exit(1);
}
