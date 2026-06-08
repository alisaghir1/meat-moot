import { headers, cookies } from 'next/headers'

/**
 * Get the current locale (server-side only).
 *
 * Priority:
 *  1. URL prefix (`/ar`, `/ru`) — set by middleware as the `x-locale` header.
 *  2. The `language` cookie set by the client-side language switcher — this is
 *     what lets non-prefixed routes (e.g. the home page `/`) localize server
 *     components when the visitor toggles the language switcher.
 *  3. Default English.
 */
export async function getLocale() {
  const headersList = await headers()
  const fromUrl = headersList.get('x-locale')
  if (fromUrl === 'ar' || fromUrl === 'ru') return fromUrl

  const cookieStore = await cookies()
  const fromCookie = cookieStore.get('language')?.value
  if (fromCookie === 'ar' || fromCookie === 'ru') return fromCookie

  return 'en'
}

export async function getPathname() {
  const headersList = await headers()
  return headersList.get('x-pathname') || '/'
}

export function localePath(path, locale) {
  if (locale === 'ar') {
    return path === '/' ? '/ar' : `/ar${path}`
  }
  if (locale === 'ru') {
    return path === '/' ? '/ru' : `/ru${path}`
  }
  return path
}
