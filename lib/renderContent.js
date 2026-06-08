/**
 * Lightweight content renderer for blog/article bodies.
 * - Already-HTML content from the editor: returned unchanged.
 * - Legacy markdown-ish content: converted to real HTML.
 */

const HTML_BLOCK_HINT =
  /<(p|h[1-6]|ul|ol|li|blockquote|table|figure|img|div|article|section)[\s>]/i

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function applyInline(text) {
  text = text.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/__([^_\n]+)__/g, '<strong>$1</strong>')
  text = text.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>')
  text = text.replace(/(^|[^_])_([^_\n]+)_(?!_)/g, '$1<em>$2</em>')
  text = text.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )
  return text
}

function markdownToHtml(src) {
  const lines = src.replace(/\r\n/g, '\n').split('\n')
  const out = []
  let para = []
  let list = null

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${applyInline(escapeHtml(para.join(' ')))}</p>`)
      para = []
    }
  }
  const flushList = () => {
    if (list) {
      const items = list.items
        .map((it) => `<li>${applyInline(escapeHtml(it))}</li>`)
        .join('')
      out.push(`<${list.type}>${items}</${list.type}>`)
      list = null
    }
  }
  const flushAll = () => {
    flushPara()
    flushList()
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    if (!line.trim()) {
      flushAll()
      continue
    }
    const h = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line)
    if (h) {
      flushAll()
      const level = h[1].length
      out.push(`<h${level}>${applyInline(escapeHtml(h[2]))}</h${level}>`)
      continue
    }
    const ul = /^\s*[-*+]\s+(.+)$/.exec(line)
    if (ul) {
      flushPara()
      if (!list || list.type !== 'ul') {
        flushList()
        list = { type: 'ul', items: [] }
      }
      list.items.push(ul[1])
      continue
    }
    const ol = /^\s*\d+\.\s+(.+)$/.exec(line)
    if (ol) {
      flushPara()
      if (!list || list.type !== 'ol') {
        flushList()
        list = { type: 'ol', items: [] }
      }
      list.items.push(ol[1])
      continue
    }
    const boldHeading = /^\s*\*\*(.+?)\*\*\s*:?\s*$/.exec(line)
    if (boldHeading) {
      flushAll()
      out.push(`<h3>${applyInline(escapeHtml(boldHeading[1]))}</h3>`)
      continue
    }
    flushList()
    para.push(line.trim())
  }
  flushAll()
  return out.join('\n')
}

export function renderArticleContent(content) {
  if (!content || typeof content !== 'string') return ''
  if (HTML_BLOCK_HINT.test(content)) return content
  return markdownToHtml(content)
}

/**
 * Normalize tags from any of: array, JSON string, PG "{a,b}", comma-separated.
 */
export function normalizeTags(input) {
  if (!input) return []
  if (Array.isArray(input)) return input.map((s) => String(s).trim()).filter(Boolean)
  if (typeof input !== 'string') return []
  const trimmed = input.trim()
  if (!trimmed) return []
  if (trimmed.startsWith('[')) {
    try {
      const arr = JSON.parse(trimmed)
      if (Array.isArray(arr)) return arr.map((s) => String(s).trim()).filter(Boolean)
    } catch {}
  }
  if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
    return trimmed
      .slice(1, -1)
      .split(',')
      .map((s) => s.replace(/^"|"$/g, '').trim())
      .filter(Boolean)
  }
  return trimmed
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}
