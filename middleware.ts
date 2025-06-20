import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { securityConfig } from './lib/config/security';

// Security headers middleware
export function securityHeaders(request: NextRequest) {
  const response = NextResponse.next();
  
  // Set security headers
  if (securityConfig.ENABLE_SECURITY_HEADERS) {
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    if (securityConfig.ENABLE_HSTS) {
      response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    }
    
    // Content Security Policy
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join('; ');
    
    response.headers.set('Content-Security-Policy', csp);
  }
  
  return response;
}

// Rate limiting middleware (basic implementation)
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export async function rateLimit(request: NextRequest) {
  const ip = request.ip || '127.0.0.1';
  const now = Date.now();
  const windowMs = securityConfig.RATE_LIMIT_WINDOW_MS;
  const maxRequests = securityConfig.RATE_LIMIT_MAX_REQUESTS;
  
  const clientData = rateLimitStore.get(ip) || { count: 0, resetAt: now + windowMs };
  
  // Reset the counter if the window has passed
  if (now > clientData.resetAt) {
    clientData.count = 0;
    clientData.resetAt = now + windowMs;
  }
  
  // Increment the request count
  clientData.count += 1;
  rateLimitStore.set(ip, clientData);
  
  // Set rate limit headers
  const response = await securityHeaders(request);
  response.headers.set('X-RateLimit-Limit', maxRequests.toString());
  response.headers.set('X-RateLimit-Remaining', (maxRequests - clientData.count).toString());
  
  // Check if rate limit is exceeded
  if (clientData.count > maxRequests) {
    return new NextResponse(JSON.stringify({ 
      error: 'Too many requests, please try again later.' 
    }), { 
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  return response;
}

// Main middleware
export async function middleware(request: NextRequest) {
  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    return rateLimit(request);
  }
  
  // Apply security headers to all routes
  return securityHeaders(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
