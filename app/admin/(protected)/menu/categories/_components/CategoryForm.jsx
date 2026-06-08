'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/app/components/admin/ImageUpload'
import LangTabs, { langSuffix } from '@/app/components/admin/LangTabs'

const EMPTY = {
  slug: '',
  name: '',
  name_ar: '',
  name_ru: '',
  description: '',
  description_ar: '',
  description_ru: '',
  image: '',
  display_order: 0,
  active: true,
}

export default function CategoryForm({ mode = 'create', initial }) {
  const router = useRouter()
  const seed = initial
    ? {
        ...EMPTY,
        ...Object.fromEntries(
          Object.entries(initial).map(([k, v]) => [k, v == null ? '' : v])
        ),
        active: initial.active !== false,
        display_order: Number(initial.display_order || 0),
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

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setBusy(true)
    try {
      const url = mode === 'create'
        ? '/api/admin/menu/categories'
        : `/api/admin/menu/categories/${initial.id}`
      const method = mode === 'create' ? 'POST' : 'PUT'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setError(body.error || 'Save failed.')
        return
      }
      router.push('/admin/menu/categories')
      router.refresh()
    } catch {
      setError('Save failed.')
    } finally {
      setBusy(false)
    }
  }

  const enInput =
    'w-full rounded border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:border-orange-500'
  const arInput = `${enInput} text-right`

  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-neutral-700 mb-1">Slug *</label>
          <input id="slug" value={form.slug} onChange={set('slug')} required placeholder="starters" className={enInput} />
        </div>
        <div>
          <label htmlFor="display_order" className="block text-sm font-medium text-neutral-700 mb-1">Display order</label>
          <input id="display_order" type="number" value={form.display_order} onChange={set('display_order')} className={enInput} />
        </div>
      </div>

      <LangTabs label="Name" required>
        {(lang) => {
          const field = `name${langSuffix(lang)}`
          const isAr = lang === 'ar'
          return (
            <input
              value={form[field] || ''}
              onChange={(e) => setField(field, e.target.value)}
              required={lang === 'en'}
              dir={isAr ? 'rtl' : 'ltr'}
              className={isAr ? arInput : enInput}
            />
          )
        }}
      </LangTabs>

      <LangTabs label="Description">
        {(lang) => {
          const field = `description${langSuffix(lang)}`
          const isAr = lang === 'ar'
          return (
            <textarea
              rows={3}
              value={form[field] || ''}
              onChange={(e) => setField(field, e.target.value)}
              dir={isAr ? 'rtl' : 'ltr'}
              className={isAr ? arInput : enInput}
            />
          )
        }}
      </LangTabs>

      <ImageUpload
        value={form.image}
        onChange={(url) => setForm((f) => ({ ...f, image: url }))}
        folder="menu/categories"
        label="Category image"
      />

      <div className="flex items-center gap-2">
        <input id="active" type="checkbox" checked={form.active} onChange={set('active')} className="h-4 w-4" />
        <label htmlFor="active" className="text-sm">Active (show on public menu)</label>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
        <button type="submit" disabled={busy}
          className="rounded bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-4 py-2 text-sm font-medium text-white">
          {busy ? 'Saving…' : mode === 'create' ? 'Create category' : 'Save changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/menu/categories')}
          className="rounded border border-neutral-300 bg-white hover:bg-neutral-50 px-4 py-2 text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}
