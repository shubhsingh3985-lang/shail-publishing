// middleware.js
//
// Protects all /admin routes except /admin/login.
// The session cookie's VALUE must match process.env.ADMIN_KEY_HASH exactly —
// just having *a* cookie isn't enough, since that could be tampered with.
// Language routing is handled by query params (?lang=hi) — no middleware needed for that.

import { NextResponse } from 'next/server'

const SESSION_COOKIE = 'shail-admin-session'

export function middleware(request) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Always allow the login page itself (avoid redirect loop)
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const session = request.cookies.get(SESSION_COOKIE)

  // Cookie must exist AND match the current admin key hash exactly
  const isValid = session?.value && session.value === process.env.ADMIN_KEY_HASH

  if (!isValid) {
    const loginUrl = new URL('/admin/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
