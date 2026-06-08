/**
 * Pick the locale-appropriate field from a row, with sensible fallback.
 *
 *   pickLocaleField(blog, 'title', 'ar')  // -> blog.title_ar || blog.title
 *   pickLocaleField(blog, 'title', 'ru')  // -> blog.title_ru || blog.title
 *   pickLocaleField(blog, 'title', 'en')  // -> blog.title
 *
 * Fallback for missing translations is always English (not Arabic), since a
 * Russian visitor will not read Arabic and vice versa.
 */
export function pickLocaleField(row, base, locale) {
  if (!row || !base) return ''
  if (locale === 'ar') return row[`${base}_ar`] || row[base] || ''
  if (locale === 'ru') return row[`${base}_ru`] || row[base] || ''
  return row[base] || ''
}

/** Convenience: returns the column suffix for a locale. */
export function localeSuffix(locale) {
  if (locale === 'ar') return '_ar'
  if (locale === 'ru') return '_ru'
  return ''
}
