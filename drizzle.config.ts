import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

export default {
  schema: './lib/db/schema.ts',
  out: './lib/db/migrations',
  dialect: 'sqlite', // <-- This is all Drizzle needs
  dbCredentials: {
    url: process.env.DATABASE_PATH!,
  },
  verbose: true,
  strict: true,
} satisfies Config;