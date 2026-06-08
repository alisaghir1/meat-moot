import { NextResponse } from 'next/server'

const SECRET_KEY =
  process.env.AUTH_SECRET_KEY ||
  (process.env.ADMIN_PASSWORD || 'change-me') + '_meatmoot_secret_2026'

/* ---------- Edge-compatible HMAC verification ---------- */

function stringToArrayBuffer(str) {
  return new TextEncoder().encode(str)
}

function arrayBufferToHex(buffer) {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

async function createHmacSignature(data, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    stringToArrayBuffer(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, stringToArrayBuffer(data))
  return arrayBufferToHex(sig)
}

async function verifySessionToken(token) {
  try {
    if (!token) return null
    const decoded = JSON.parse(atob(token))
    const { payload, signature } = decoded
    const expected = await createHmacSignature(payload, SECRET_KEY)
    if (signature !== expected) return null
    const parsed = JSON.parse(payload)
    if (Date.now() > parsed.expiresAt) return null
    return parsed
  } catch {
    return null
  }
}

/* ---------- Middleware ---------- */

export async function middleware(request) {
  const { pathname } = request.nextUrl

  // Locale detection from URL prefix: /ar/* → ar, /ru/* → ru, default → en.
  // We strip the leading /xx segment so a single page implementation can serve
  // all three locales via the x-locale header (read by getLocale() server-side).
  let locale = 'en'
  let rewritePath = pathname
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    locale = 'ar'
    rewritePath = pathname.replace(/^\/ar/, '') || '/'
  } else if (pathname === '/ru' || pathname.startsWith('/ru/')) {
    locale = 'ru'
    rewritePath = pathname.replace(/^\/ru/, '') || '/'
  }

  let response
  if (rewritePath !== pathname) {
    const url = request.nextUrl.clone()
    url.pathname = rewritePath
    response = NextResponse.rewrite(url)
  } else {
    response = NextResponse.next()
  }

  response.headers.set('x-pathname', pathname)
  response.headers.set('x-locale', locale)
  response.cookies.set('NEXT_LOCALE', locale, { path: '/' })

  // Lightweight security headers (full set lives in next.config.mjs)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')

  // Admin route guard (skip /admin/login itself)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session')
    const session = sessionCookie ? await verifySessionToken(sessionCookie.value) : null

    if (!session) {
      const redirect = NextResponse.redirect(new URL('/admin/login', request.url))
      redirect.cookies.delete('admin_session')
      return redirect
    }
  }

  // If logged in and hitting /admin/login, bounce to dashboard
  if (pathname === '/admin/login') {
    const sessionCookie = request.cookies.get('admin_session')
    const session = sessionCookie ? await verifySessionToken(sessionCookie.value) : null
    if (session) return NextResponse.redirect(new URL('/admin', request.url))
  }

  // Protect /api/admin/* (except login/logout endpoints)
  if (
    pathname.startsWith('/api/admin') &&
    !pathname.includes('/login') &&
    !pathname.includes('/logout')
  ) {
    const sessionCookie = request.cookies.get('admin_session')
    const session = sessionCookie ? await verifySessionToken(sessionCookie.value) : null
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|logo.svg|robots.txt|sitemap.xml).*)'],
}
