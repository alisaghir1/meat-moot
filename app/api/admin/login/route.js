import { NextResponse } from 'next/server'
import crypto from 'crypto'
import {
  generateSessionToken,
  setSessionCookie,
  checkRateLimit,
  resetRateLimit,
  isValidEmail,
} from '@/lib/auth'

function timingSafeEqualStr(a, b) {
  const ab = Buffer.from(a || '', 'utf8')
  const bb = Buffer.from(b || '', 'utf8')
  if (ab.length !== bb.length) {
    // Still do a comparison of equal length to keep timing similar
    crypto.timingSafeEqual(ab, ab)
    return false
  }
  return crypto.timingSafeEqual(ab, bb)
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const email = String(body?.email || '').trim().toLowerCase()
  const password = String(body?.password || '')

  if (!isValidEmail(email) || !password) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 400 })
  }

  // Rate limit by IP (best-effort) + email
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  const limit = checkRateLimit(`${ip}:${email}`)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429 }
    )
  }

  const expectedEmail = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  const expectedPassword = String(process.env.ADMIN_PASSWORD || '')

  if (!expectedEmail || !expectedPassword) {
    // Misconfigured server — generic message to client, detail in logs.
    console.error('[admin/login] ADMIN_EMAIL or ADMIN_PASSWORD not set in env.')
    return NextResponse.json({ error: 'Service unavailable.' }, { status: 503 })
  }

  const emailOk = timingSafeEqualStr(email, expectedEmail)
  const passOk = timingSafeEqualStr(password, expectedPassword)

  if (!emailOk || !passOk) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
  }

  resetRateLimit(`${ip}:${email}`)
  const token = generateSessionToken(email)
  await setSessionCookie(token)

  return NextResponse.json({ ok: true })
}
