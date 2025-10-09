import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard'];

// Define public routes that should redirect to dashboard if already authenticated
const publicRoutes = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from session storage (we'll check this on client side)
  // For server-side middleware, we need to check cookies or headers
  const token = request.cookies.get('auth_token')?.value;
  
  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is public (login/register)
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // If accessing public route with token, redirect to dashboard
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
