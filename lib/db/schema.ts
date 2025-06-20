import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

// Customers Table
export const customers = sqliteTable('customers', {
  id: text('id').primaryKey(), // Using text for UUIDs
  name: text('name').notNull(),
  contactPerson: text('contactPerson'),
  email: text('email'),
  phone: text('phone'),
  notes: text('notes'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// Devices Table
export const devices = sqliteTable('devices', {
  id: text('id').primaryKey(),
  customerId: text('customerId').notNull().references(() => customers.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  vendor: text('vendor').notNull(),
  systemType: text('systemType').notNull(),
  ipAddress: text('ipAddress').notNull(),
  notes: text('notes'),
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// Users Table
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  passwordHash: text('passwordHash').notNull(),
  role: text('role', { enum: ['Admin', 'PS Manager', 'PS Consultant'] }).notNull(),
  status: text('status', { enum: ['active', 'inactive'] }).default('active'),
  lastLogin: integer('lastLogin', { mode: 'timestamp' }),
  createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// Jobs Table (for Health Checks)
export const jobs = sqliteTable('jobs', {
    id: text('id').primaryKey(),
    deviceId: text('deviceId').notNull().references(() => devices.id),
    userId: text('userId').notNull().references(() => users.id),
    status: text('status', { enum: ['pending', 'running', 'completed', 'failed'] }).default('pending'),
    progress: integer('progress').default(0),
    startedAt: integer('startedAt', { mode: 'timestamp' }),
    completedAt: integer('completedAt', { mode: 'timestamp' }),
    createdAt: integer('createdAt', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
});

// You can add more tables like 'findings', 'reports', 'audit_logs' here later.
