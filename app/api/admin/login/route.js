// app/api/admin/login/route.js
//
// POST { key: string }
// Hashes the entered key with SHA-256, compares to process.env.ADMIN_KEY_HASH.
// On match, sets an httpOnly session cookie containing the hash itself —
// middleware then checks every /admin request against the same env value.

import { NextResponse } from 'next/server'
import crypto            from 'crypto'

const SESSION_COOKIE = 'shail-admin-session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days, in seconds

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }

  const { key } = body ?? {}

  if (!key || typeof key !== 'string') {
    return NextResponse.json({ error: 'Admin key is required' }, { status: 400 })
  }

  const expectedHash = process.env.ADMIN_KEY_HASH

  if (!expectedHash) {
    // Server misconfigured — fail safe, don't leak details to client
    console.error('[admin/login] ADMIN_KEY_HASH is not set in environment')
    return NextResponse.json({ error: 'Admin login is not configured' }, { status: 500 })
  }

  const enteredHash = crypto.createHash('sha256').update(key).digest('hex')

  if (enteredHash !== expectedHash) {
    // Small artificial delay — reduces value of brute-force timing attacks
    await new Promise(r => setTimeout(r, 400))
    return NextResponse.json({ error: 'Invalid admin key. Please try again.' }, { status: 401 })
  }

  const response = NextResponse.json({ success: true })

  response.cookies.set(SESSION_COOKIE, enteredHash, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  })

  return response
}
