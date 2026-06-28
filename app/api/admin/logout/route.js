// app/api/admin/logout/route.js
//
// POST — clears the admin session cookie.

import { NextResponse } from 'next/server'

const SESSION_COOKIE = 'shail-admin-session'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.delete(SESSION_COOKIE)
  return response
}
