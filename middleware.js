// middleware.js
//
// Runs on every request matching the config below.
// Only job: protect /admin routes.
// Language routing is handled by query params (?lang=hi) — no middleware needed.

import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // ─── Admin route protection ───────────────────────────────────────────────
  if (pathname.startsWith('/admin')) {
    // Allow the login page itself through (avoid redirect loop)
    if (pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for valid session cookie
    const adminSession = request.cookies.get('shail-admin-session')

    if (!adminSession?.value) {
      // Not authenticated — redirect to login, remembering the intended destination
      const loginUrl = new URL('/admin/login', request.url)
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Session exists — let through
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Only run middleware on admin routes (not on static files, api routes, etc.)
export const config = {
  matcher: ['/admin/:path*'],
}