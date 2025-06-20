import { db } from '../lib/db';
import { sql } from 'drizzle-orm';

async function initDb() {
  console.log('Initializing database...');
  
  try {
    // Enable foreign keys
    db.run(sql`PRAGMA foreign_keys = ON`);
    
    // Create customers table
    db.run(sql`
      CREATE TABLE IF NOT EXISTS customers (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        "contactPerson" TEXT,
        email TEXT,
        phone TEXT,
        notes TEXT,
        "createdAt" INTEGER DEFAULT (strftime('%s', 'now'))
      );
    `);

    // Create devices table
    db.run(sql`
      CREATE TABLE IF NOT EXISTS devices (
        id TEXT PRIMARY KEY,
        "customerId" TEXT NOT NULL,
        name TEXT NOT NULL,
        vendor TEXT NOT NULL,
        "systemType" TEXT NOT NULL,
        "ipAddress" TEXT NOT NULL,
        notes TEXT,
        "createdAt" INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY ("customerId") REFERENCES customers(id) ON DELETE CASCADE
      );
    `);

    // Create users table
    db.run(sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        "passwordHash" TEXT NOT NULL,
        role TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        "lastLogin" INTEGER,
        "createdAt" INTEGER DEFAULT (strftime('%s', 'now'))
      );
    `);

    // Create jobs table
    db.run(sql`
      CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        "deviceId" TEXT NOT NULL,
        "userId" TEXT NOT NULL,
        status TEXT DEFAULT 'pending',
        progress INTEGER DEFAULT 0,
        "startedAt" INTEGER,
        "completedAt" INTEGER,
        "createdAt" INTEGER DEFAULT (strftime('%s', 'now')),
        FOREIGN KEY ("deviceId") REFERENCES devices(id),
        FOREIGN KEY ("userId") REFERENCES users(id)
      );
    `);

    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

initDb().catch(console.error);
