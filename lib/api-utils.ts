import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

// Standardized success response
export function apiResponseSuccess<T>(data: T, status: number = 200) {
  return NextResponse.json({ success: true, data }, { status });
}

// Standardized error response
export function apiResponseError(error: string | ZodError, status: number = 500) {
  // Handle Zod validation errors specifically
  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((e) => ({
      path: e.path.join('.'),
      message: e.message,
    }));
    return NextResponse.json(
      { success: false, error: 'Validation failed', details: formattedErrors },
      { status: 400 } // Bad Request
    );
  }
  
  // Handle generic string errors
  return NextResponse.json({ success: false, error }, { status });
}

// Higher-order function for wrapping API handlers with error handling
type ApiHandler = (req: Request, params: { params: any }) => Promise<NextResponse>;

export function withApiHandler(handler: ApiHandler): ApiHandler {
  return async (req, params) => {
    try {
      return await handler(req, params);
    } catch (error) {
      console.error('API Route Error:', error);
      if (error instanceof Error) {
        return apiResponseError(error.message, 500);
      }
      return apiResponseError('An unknown error occurred.', 500);
    }
  };
}