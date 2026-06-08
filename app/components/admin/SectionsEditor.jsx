'use client'

import dynamic from 'next/dynamic'
import ImageUpload from '@/app/components/admin/ImageUpload'
import LangTabs, { langSuffix } from '@/app/components/admin/LangTabs'

const RichTextEditor = dynamic(
  () => import('@/app/components/admin/RichTextEditor'),
  {
    ssr: false,
    loading: () => (
      <div className="h-40 rounded border border-neutral-300 bg-neutral-50 animate-pulse" />
    ),
  }
)

const EMPTY_SECTION = {
  title: '',
  title_ar: '',
  title_ru: '',
  image: '',
  content: '',
  content_ar: '',
  content_ru: '',
}

/**
 * Repeatable section editor.
 * value: array of section objects. onChange: receives the new array.
 */
export default function SectionsEditor({ value = [], onChange }) {
  const sections = Array.isArray(value) ? value : []

  function update(index, patch) {
    const next = sections.map((s, i) => (i === index ? { ...s, ...patch } : s))
    onChange?.(next)
  }
  function add() {
    onChange?.([...sections, { ...EMPTY_SECTION }])
  }
  function remove(index) {
    if (!confirm('Remove this section?')) return
    onChange?.(sections.filter((_, i) => i !== index))
  }
  function move(index, dir) {
    const j = index + dir
    if (j < 0 || j >= sections.length) return
    const next = sections.slice()
    ;[next[index], next[j]] = [next[j], next[index]]
    onChange?.(next)
  }

  const enInput =
    'w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-orange-500'
  const arInput = `${enInput} text-right`

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Sections</h3>
          <p className="text-xs text-neutral-500">
            Optional repeating blocks shown after the main content. Each has a title and body
            in EN / AR / RU plus an image.
          </p>
        </div>
        <button
          type="button"
          onClick={add}
          className="rounded border border-neutral-300 bg-white hover:bg-neutral-50 px-3 py-1.5 text-sm"
        >
          + Add section
        </button>
      </div>

      {sections.length === 0 ? (
        <p className="text-sm text-neutral-500 italic">No sections yet.</p>
      ) : null}

      {sections.map((section, i) => (
        <div
          key={i}
          className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 space-y-4"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">Section {i + 1}</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                className="text-xs px-2 py-1 rounded border border-neutral-300 bg-white hover:bg-neutral-100 disabled:opacity-40"
                aria-label="Move section up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === sections.length - 1}
                className="text-xs px-2 py-1 rounded border border-neutral-300 bg-white hover:bg-neutral-100 disabled:opacity-40"
                aria-label="Move section down"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => remove(i)}
                className="text-xs px-2 py-1 rounded border border-red-300 bg-white text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>

          <div>
            <LangTabs label="Title">
              {(lang) => {
                const field = `title${langSuffix(lang)}`
                const isAr = lang === 'ar'
                return (
                  <input
                    value={section[field] || ''}
                    onChange={(e) => update(i, { [field]: e.target.value })}
                    dir={isAr ? 'rtl' : 'ltr'}
                    className={isAr ? arInput : enInput}
                  />
                )
              }}
            </LangTabs>
          </div>

          <ImageUpload
            value={section.image || ''}
            onChange={(url) => update(i, { image: url })}
            folder="blogs/sections"
            label="Section image"
          />

          <div>
            <LangTabs label="Body">
              {(lang) => {
                const field = `content${langSuffix(lang)}`
                return (
                  <RichTextEditor
                    key={`${i}-${field}`}
                    value={section[field] || ''}
                    onChange={(html) => update(i, { [field]: html })}
                    dir={lang === 'ar' ? 'rtl' : 'ltr'}
                  />
                )
              }}
            </LangTabs>
          </div>
        </div>
      ))}

      {sections.length > 0 ? (
        <button
          type="button"
          onClick={add}
          className="rounded border border-neutral-300 bg-white hover:bg-neutral-50 px-3 py-1.5 text-sm"
        >
          + Add another section
        </button>
      ) : null}
    </div>
  )
}
