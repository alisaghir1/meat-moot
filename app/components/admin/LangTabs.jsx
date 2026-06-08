'use client'

import { useState } from 'react'

/**
 * Trilingual tab wrapper for admin forms.
 *
 * Usage:
 *   <LangTabs label="Title" required>
 *     {(lang) => (
 *       <input
 *         dir={lang === 'ar' ? 'rtl' : 'ltr'}
 *         className={lang === 'ar' ? 'text-right' : ''}
 *         value={form[`title${suffix(lang)}`] || ''}
 *         onChange={(e) => setField(`title${suffix(lang)}`, e.target.value)}
 *       />
 *     )}
 *   </LangTabs>
 *
 * Where suffix(lang): 'en' -> '', 'ar' -> '_ar', 'ru' -> '_ru'
 *
 * The render-prop receives the current language code ('en' | 'ar' | 'ru')
 * each time a tab is clicked. Only one tab body is rendered at a time.
 */
export default function LangTabs({
  label,
  required = false,
  children,
  defaultLang = 'en',
  className = '',
}) {
  const [lang, setLang] = useState(defaultLang)

  return (
    <div className={`space-y-2 ${className}`}>
      {label ? (
        <div className="flex items-center justify-between gap-2">
          <label className="block text-sm font-medium">
            {label}
            {required ? <span className="text-red-600 ml-0.5">*</span> : null}
          </label>
          <LangTabBar lang={lang} setLang={setLang} />
        </div>
      ) : (
        <LangTabBar lang={lang} setLang={setLang} />
      )}

      <div>{typeof children === 'function' ? children(lang) : children}</div>
    </div>
  )
}

const TABS = [
  { code: 'en', label: 'EN' },
  { code: 'ar', label: 'AR' },
  { code: 'ru', label: 'RU' },
]

function LangTabBar({ lang, setLang }) {
  return (
    <div
      role="tablist"
      aria-label="Language"
      className="inline-flex rounded-md border border-neutral-300 bg-neutral-50 p-0.5"
    >
      {TABS.map((t) => {
        const active = t.code === lang
        return (
          <button
            key={t.code}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => setLang(t.code)}
            className={[
              'px-3 py-1 text-xs font-medium rounded transition-colors',
              active
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900',
            ].join(' ')}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

/** Returns the column suffix for a given language code. */
export function langSuffix(lang) {
  if (lang === 'ar') return '_ar'
  if (lang === 'ru') return '_ru'
  return ''
}
