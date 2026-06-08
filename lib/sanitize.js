/**
 * HTML sanitizer used before any dangerouslySetInnerHTML call.
 * Wraps isomorphic-dompurify so it works in both browser and SSR.
 */
import DOMPurify from 'isomorphic-dompurify'

const ALLOWED_TAGS = [
  'p', 'br', 'hr',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li',
  'strong', 'em', 'b', 'i', 'u', 's',
  'blockquote', 'code', 'pre',
  'a', 'img', 'figure', 'figcaption',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'span', 'div',
]

const ALLOWED_ATTR = [
  'href', 'target', 'rel',
  'src', 'alt', 'title', 'width', 'height', 'loading',
  'class', 'id',
  'colspan', 'rowspan',
]

export function sanitizeHtml(html) {
  if (!html || typeof html !== 'string') return ''
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'],
  })
}

/**
 * Escape user text for safe insertion as plain text.
 */
export function escapeText(s) {
  if (typeof s !== 'string') return ''
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
}
