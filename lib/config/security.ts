import { z } from 'zod';

const securitySchema = z.object({
  // JWT Configuration
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters long'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  
  // Password hashing
  SALT_ROUNDS: z.number().int().positive().default(10),
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: z.number().int().positive().default(15 * 60 * 1000), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.number().int().positive().default(100),
  
  // CORS
  CORS_ORIGINS: z.string().transform(str => 
    str.split(',').map(origin => origin.trim())
  ).default('http://localhost:3000'),
  
  // Security headers
  ENABLE_SECURITY_HEADERS: z.string().default('true').transform(val => val === 'true'),
  ENABLE_HSTS: z.string().default('true').transform(val => val === 'true'),
  
  // CSRF Protection
  CSRF_SECRET: z.string().min(32, 'CSRF_SECRET must be at least 32 characters long'),
});

export const securityConfig = securitySchema.parse({
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  SALT_ROUNDS: process.env.SALT_ROUNDS,
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS: process.env.RATE_LIMIT_MAX_REQUESTS,
  CORS_ORIGINS: process.env.CORS_ORIGINS,
  ENABLE_SECURITY_HEADERS: process.env.ENABLE_SECURITY_HEADERS,
  ENABLE_HSTS: process.env.ENABLE_HSTS,
  CSRF_SECRET: process.env.CSRF_SECRET,
});

export type SecurityConfig = z.infer<typeof securitySchema>;
