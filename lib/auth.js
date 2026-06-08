import { cookies } from 'next/headers'
import crypto from 'crypto'

const SECRET_KEY =
  process.env.AUTH_SECRET_KEY ||
  (process.env.ADMIN_PASSWORD || 'change-me') + '_meatmoot_secret_2026'

/**
 * Generate a signed session token (HMAC-SHA256, base64-encoded JSON).
 * Used as the value of the `admin_session` cookie.
 */
export function generateSessionToken(email) {
  const timestamp = Date.now()
  const expiresAt = timestamp + 7 * 24 * 60 * 60 * 1000 // 7 days
  const nonce = crypto.randomBytes(32).toString('hex')

  const payload = JSON.stringify({ email, timestamp, expiresAt, nonce })
  const signature = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex')

  return Buffer.from(JSON.stringify({ payload, signature })).toString('base64')
}

export function verifySessionToken(token) {
  try {
    if (!token) return null
    const decoded = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'))
    const { payload, signature } = decoded
    const expected = crypto.createHmac('sha256', SECRET_KEY).update(payload).digest('hex')

    const sigBuf = Buffer.from(signature)
    const expBuf = Buffer.from(expected)
    if (sigBuf.length !== expBuf.length) return null
    if (!crypto.timingSafeEqual(sigBuf, expBuf)) return null

    const parsed = JSON.parse(payload)
    if (Date.now() > parsed.expiresAt) return null
    return parsed
  } catch {
    return null
  }
}

export async function setSessionCookie(token) {
  const cookieStore = await cookies()
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })
}

export async function clearSessionCookie() {
  const cookieStore = await cookies()
  cookieStore.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  })
}

export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get('admin_session')
  if (!sessionCookie?.value) return null
  return verifySessionToken(sessionCookie.value)
}

export async function isAuthenticated() {
  return (await getSession()) !== null
}

/**
 * In-memory rate limiter (replace with Redis in production).
 */
const rateLimitStore = new Map()

export function checkRateLimit(identifier, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
  const key = `login_${identifier}`
  const entry = rateLimitStore.get(key)

  if (!entry || now - entry.firstAttempt > windowMs) {
    rateLimitStore.set(key, { attempts: 1, firstAttempt: now })
    return { allowed: true, remaining: maxAttempts - 1 }
  }
  if (entry.attempts >= maxAttempts) {
    const resetTime = entry.firstAttempt + windowMs
    return { allowed: false, remaining: 0, resetIn: Math.ceil((resetTime - now) / 1000) }
  }
  entry.attempts++
  return { allowed: true, remaining: maxAttempts - entry.attempts }
}

export function resetRateLimit(identifier) {
  rateLimitStore.delete(`login_${identifier}`)
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
