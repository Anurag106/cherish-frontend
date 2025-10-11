import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  console.log('🚀 MIDDLEWARE IS RUNNING!')
  console.log('🚀 Path:', request.nextUrl.pathname)
  
  const pathname = request.nextUrl.pathname
  const token = request.cookies.get('auth_token')?.value
  
  console.log('🔒 Token exists:', !!token)
  
  // Protected routes
  if (pathname.startsWith('/home') || pathname.startsWith('/rewards') || pathname.startsWith('/analytics')) {
    console.log('🔒 Protected route detected')
    
    if (!token) {
      console.log('🚫 NO TOKEN - Redirecting to /login')
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    console.log('✅ Token found - allowing access')
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
