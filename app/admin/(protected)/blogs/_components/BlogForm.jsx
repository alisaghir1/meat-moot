'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/app/components/admin/ImageUpload'
import SectionsEditor from '@/app/components/admin/SectionsEditor'
import LangTabs, { langSuffix } from '@/app/components/admin/LangTabs'

// TipTap is client-only and heavy; lazy-load it.
const RichTextEditor = dynamic(
  () => import('@/app/components/admin/RichTextEditor'),
  { ssr: false, loading: () => <div className="h-64 rounded border border-neutral-300 bg-neutral-50 animate-pulse" /> }
)

const EMPTY = {
  slug: '',
  title: '',
  title_ar: '',
  title_ru: '',
  excerpt: '',
  excerpt_ar: '',
  excerpt_ru: '',
  content: '',
  content_ar: '',
  content_ru: '',
  cover_image: '',
  category: '',
  tags: '',
  tags_ar: '',
  tags_ru: '',
  author: '',
  meta_title: '',
  meta_title_ar: '',
  meta_title_ru: '',
  meta_description: '',
  meta_description_ar: '',
  meta_description_ru: '',
  published: false,
  date: new Date().toISOString().slice(0, 10),
  sections: [],
}

function tagsToString(t) {
  if (!t) return ''
  if (Array.isArray(t)) return t.join(', ')
  return String(t)
}

const INPUT_BASE =
  'w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-orange-500'

export default function BlogForm({ mode = 'create', initial }) {
  const router = useRouter()
  const seed = initial
    ? {
        ...EMPTY,
        ...Object.fromEntries(
          Object.entries(initial).map(([k, v]) => [k, v == null ? '' : v])
        ),
        tags: tagsToString(initial.tags),
        tags_ar: tagsToString(initial.tags_ar),
        tags_ru: tagsToString(initial.tags_ru),
        date: initial.date
          ? new Date(initial.date).toISOString().slice(0, 10)
          : EMPTY.date,
        published: !!initial.published,
        sections: Array.isArray(initial.sections) ? initial.sections : [],
      }
    : EMPTY

  const [form, setForm] = useState(seed)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  function set(field) {
    return (e) => {
      const v = e?.target ? (e.target.type === 'checkbox' ? e.target.checked : e.target.value) : e
      setForm((f) => ({ ...f, [field]: v }))
    }
  }

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)

    const splitTags = (s) =>
      s ? s.split(',').map((x) => x.trim()).filter(Boolean) : []

    const payload = {
      ...form,
      tags: splitTags(form.tags),
      tags_ar: splitTags(form.tags_ar),
      tags_ru: splitTags(form.tags_ru),
      sections: Array.isArray(form.sections) ? form.sections : [],
    }

    try {
      const url =
        mode === 'create' ? '/api/admin/blogs' : `/api/admin/blogs/${initial.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error || 'Save failed.')
        return
      }
      router.push('/admin/blogs')
      router.refresh()
    } catch {
      setError('Save failed.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top meta row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-neutral-700 mb-1">
            Slug *
          </label>
          <input
            id="slug"
            value={form.slug}
            onChange={set('slug')}
            required
            placeholder="best-smoked-brisket"
            className={INPUT_BASE}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-neutral-700 mb-1">
            Category
          </label>
          <input id="category" value={form.category} onChange={set('category')} className={INPUT_BASE} />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1">
            Date
          </label>
          <input id="date" type="date" value={form.date} onChange={set('date')} className={INPUT_BASE} />
        </div>
      </div>

      {/* Title (EN / AR / RU) */}
      <LangTabs label="Title" required>
        {(lang) => (
          <LocalizedInput
            field={`title${langSuffix(lang)}`}
            value={form[`title${langSuffix(lang)}`]}
            onChange={setField}
            lang={lang}
            required={lang === 'en'}
          />
        )}
      </LangTabs>

      {/* Excerpt */}
      <LangTabs label="Excerpt">
        {(lang) => (
          <LocalizedTextarea
            field={`excerpt${langSuffix(lang)}`}
            value={form[`excerpt${langSuffix(lang)}`]}
            onChange={setField}
            lang={lang}
            rows={3}
          />
        )}
      </LangTabs>

      {/* Cover image */}
      <ImageUpload
        value={form.cover_image}
        onChange={(url) => setForm((f) => ({ ...f, cover_image: url }))}
        folder="blogs"
        label="Cover image"
      />

      {/* Content (EN / AR / RU) */}
      <LangTabs label="Content">
        {(lang) => {
          const field = `content${langSuffix(lang)}`
          return (
            <RichTextEditor
              key={field}
              value={form[field] || ''}
              onChange={(html) => setField(field, html)}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
            />
          )
        }}
      </LangTabs>

      {/* Repeating sections (after main content) */}
      <fieldset className="border-t border-neutral-200 pt-6">
        <legend className="sr-only">Sections</legend>
        <SectionsEditor
          value={form.sections}
          onChange={(sections) => setForm((f) => ({ ...f, sections }))}
        />
      </fieldset>

      {/* Tags */}
      <LangTabs label="Tags (comma-separated)">
        {(lang) => (
          <LocalizedInput
            field={`tags${langSuffix(lang)}`}
            value={form[`tags${langSuffix(lang)}`]}
            onChange={setField}
            lang={lang}
            placeholder={lang === 'en' ? 'bbq, brisket' : ''}
          />
        )}
      </LangTabs>

      {/* Author */}
      <div className="max-w-md">
        <label htmlFor="author" className="block text-sm font-medium text-neutral-700 mb-1">
          Author
        </label>
        <input id="author" value={form.author} onChange={set('author')} className={INPUT_BASE} />
      </div>

      {/* SEO */}
      <fieldset className="space-y-6 border-t border-neutral-200 pt-6">
        <legend className="text-sm font-semibold text-neutral-700 mb-2">SEO</legend>
        <LangTabs label="Meta title">
          {(lang) => (
            <LocalizedInput
              field={`meta_title${langSuffix(lang)}`}
              value={form[`meta_title${langSuffix(lang)}`]}
              onChange={setField}
              lang={lang}
            />
          )}
        </LangTabs>
        <LangTabs label="Meta description">
          {(lang) => (
            <LocalizedTextarea
              field={`meta_description${langSuffix(lang)}`}
              value={form[`meta_description${langSuffix(lang)}`]}
              onChange={setField}
              lang={lang}
              rows={2}
            />
          )}
        </LangTabs>
      </fieldset>

      {/* Publish */}
      <div className="flex items-center gap-2">
        <input
          id="published"
          type="checkbox"
          checked={form.published}
          onChange={set('published')}
          className="h-4 w-4"
        />
        <label htmlFor="published" className="text-sm">Published</label>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
        <button
          type="submit"
          disabled={busy}
          className="rounded bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-4 py-2 text-sm font-medium text-white"
        >
          {busy ? 'Saving…' : mode === 'create' ? 'Create blog' : 'Save changes'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/blogs')}
          className="rounded border border-neutral-300 bg-white hover:bg-neutral-50 px-4 py-2 text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

function LocalizedInput({ field, value, onChange, lang, required, placeholder }) {
  const isAr = lang === 'ar'
  return (
    <input
      value={value || ''}
      onChange={(e) => onChange(field, e.target.value)}
      required={required}
      placeholder={placeholder}
      dir={isAr ? 'rtl' : 'ltr'}
      className={`${INPUT_BASE} ${isAr ? 'text-right' : ''}`}
    />
  )
}

function LocalizedTextarea({ field, value, onChange, lang, rows = 3 }) {
  const isAr = lang === 'ar'
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(field, e.target.value)}
      rows={rows}
      dir={isAr ? 'rtl' : 'ltr'}
      className={`${INPUT_BASE} ${isAr ? 'text-right' : ''}`}
    />
  )
}
