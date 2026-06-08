'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import en from '@/locales/en.json'
import ar from '@/locales/ar.json'
import ru from '@/locales/ru.json'

const translations = { en, ar, ru }

const LanguageContext = createContext()

export const LANGUAGES = {
  en: { code: 'en', name: 'English', nativeName: 'English', dir: 'ltr', flag: '🇬🇧' },
  ar: { code: 'ar', name: 'Arabic',  nativeName: 'العربية', dir: 'rtl', flag: '🇦🇪' },
  ru: { code: 'ru', name: 'Russian', nativeName: 'Русский', dir: 'ltr', flag: '🇷🇺' },
}

function getLocaleFromPath(pathname) {
  if (pathname.startsWith('/ar')) return 'ar'
  if (pathname.startsWith('/ru')) return 'ru'
  return 'en'
}

function stripLocale(pathname) {
  if (pathname.startsWith('/ar')) {
    return pathname.replace(/^\/ar/, '') || '/'
  }
  if (pathname.startsWith('/ru')) {
    return pathname.replace(/^\/ru/, '') || '/'
  }
  return pathname
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

export function LanguageProvider({ children, initialLocale }) {
  const pathname = usePathname()
  const router = useRouter()
  const [language, setLanguageState] = useState(initialLocale || 'en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const urlLocale = getLocaleFromPath(window.location.pathname)
    setLanguageState(urlLocale)
  }, [pathname])

  useEffect(() => {
    if (mounted) {
      const lang = LANGUAGES[language]
      document.documentElement.lang = lang.code
      document.documentElement.dir = lang.dir
    }
  }, [language, mounted])

  const setLanguage = useCallback(
    (newLang) => {
      if (newLang === 'en' || newLang === 'ar' || newLang === 'ru') {
        setLanguageState(newLang)
        const currentPath = stripLocale(window.location.pathname)
        const newPath = localePath(currentPath, newLang)
        router.push(newPath)
      }
    },
    [router]
  )

  const toggleLanguage = useCallback(() => {
    // Legacy 2-way toggle, kept for backwards-compat. Cycles en → ar → ru → en.
    const next = language === 'en' ? 'ar' : language === 'ar' ? 'ru' : 'en'
    setLanguage(next)
  }, [language, setLanguage])

  const t = useCallback(
    (key, fallback = '') => {
      const keys = key.split('.')
      let value = translations[language]

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          // Fallback to English
          value = translations.en
          for (const ek of keys) {
            if (value && typeof value === 'object' && ek in value) {
              value = value[ek]
            } else {
              return fallback || key
            }
          }
          break
        }
      }

      if (Array.isArray(value) || typeof value === 'string') return value
      return fallback || key
    },
    [language]
  )

  const getLocalePath = useCallback((path) => localePath(path, language), [language])

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    dir: LANGUAGES[language]?.dir || 'ltr',
    isRTL: language === 'ar',
    isArabic: language === 'ar',
    isRussian: language === 'ru',
    currentLanguage: LANGUAGES[language],
    languages: LANGUAGES,
    mounted,
    localePath: getLocalePath,
  }

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export default LanguageContext
