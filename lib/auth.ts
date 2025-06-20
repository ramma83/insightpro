import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';
import { randomBytes, createHash } from 'crypto';
import { securityConfig } from './config/security';

export interface UserPayload extends JwtPayload {
  userId: string;
  role: string;
  email: string;
}

export class AuthService {
  // Generate a random salt
  static generateSalt(): string {
    return randomBytes(16).toString('hex');
  }

  // Hash a password with a given salt
  static async hashPassword(password: string, salt: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const iterations = 10000;
      const keylen = 64;
      const digest = 'sha512';
      
      crypto.pbkdf2(password, salt, iterations, keylen, digest, (err, derivedKey) => {
        if (err) return reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
  }

  // Verify a password against a hash and salt
  static async verifyPassword(password: string, hash: string, salt: string): Promise<boolean> {
    const hashedPassword = await this.hashPassword(password, salt);
    return hashedPassword === hash;
  }

  // Generate a JWT token
  static generateToken(payload: Omit<UserPayload, 'iat' | 'exp'>, expiresIn = '1d'): string {
    const options: SignOptions = {
      expiresIn,
      issuer: 'insightpro',
    };

    return sign(payload, securityConfig.JWT_SECRET, options);
  }

  // Verify a JWT token
  static verifyToken(token: string): UserPayload | null {
    try {
      return verify(token, securityConfig.JWT_SECRET) as UserPayload;
    } catch (error) {
      return null;
    }
  }

  // Generate a secure random token (for password reset, etc.)
  static generateSecureToken(length = 32): string {
    return randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }

  // Generate a CSRF token
  static generateCsrfToken(): string {
    return randomBytes(32).toString('hex');
  }

  // Verify CSRF token
  static verifyCsrfToken(token: string, csrfToken: string): boolean {
    if (!token || !csrfToken) return false;
    return token === csrfToken;
  }
}

// Session management
export class SessionManager {
  private static sessions = new Map<string, { userId: string; expiresAt: number }>();

  static createSession(userId: string, ttl = 24 * 60 * 60 * 1000): string {
    const sessionId = randomBytes(32).toString('hex');
    const expiresAt = Date.now() + ttl;
    
    this.sessions.set(sessionId, { userId, expiresAt });
    
    // Clean up expired sessions
    this.cleanupSessions();
    
    return sessionId;
  }

  static getSession(sessionId: string): { userId: string } | null {
    const session = this.sessions.get(sessionId);
    if (!session) return null;
    
    if (session.expiresAt < Date.now()) {
      this.sessions.delete(sessionId);
      return null;
    }
    
    return { userId: session.userId };
  }

  static deleteSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }

  private static cleanupSessions(): void {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.expiresAt < now) {
        this.sessions.delete(sessionId);
      }
    }
  }
}
