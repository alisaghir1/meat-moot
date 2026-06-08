'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/app/components/admin/ImageUpload'
import LangTabs, { langSuffix } from '@/app/components/admin/LangTabs'

const EMPTY = {
  category_id: '',
  name: '',
  name_ar: '',
  name_ru: '',
  description: '',
  description_ar: '',
  description_ru: '',
  image: '',
  price: '',
  currency: 'AED',
  allergens: '',
  tags: '',
  tags_ar: '',
  tags_ru: '',
  available: true,
  featured: false,
  display_order: 0,
}

function toCsv(t) {
  if (!t) return ''
  if (Array.isArray(t)) return t.join(', ')
  return String(t)
}

export default function ItemForm({ mode = 'create', initial, categories = [] }) {
  const router = useRouter()
  const seed = initial
    ? {
        ...EMPTY,
        ...Object.fromEntries(
          Object.entries(initial).map(([k, v]) => [k, v == null ? '' : v])
        ),
        allergens: toCsv(initial.allergens),
        tags: toCsv(initial.tags),
        tags_ar: toCsv(initial.tags_ar),
        tags_ru: toCsv(initial.tags_ru),
        price: initial.price == null ? '' : String(initial.price),
        currency: initial.currency || 'AED',
        available: initial.available !== false,
        featured: !!initial.featured,
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

    const payload = {
      ...form,
      allergens: form.allergens ? form.allergens.split(',').map((s) => s.trim()).filter(Boolean) : [],
      tags: form.tags ? form.tags.split(',').map((s) => s.trim()).filter(Boolean) : [],
      tags_ar: form.tags_ar ? form.tags_ar.split(',').map((s) => s.trim()).filter(Boolean) : [],
      tags_ru: form.tags_ru ? form.tags_ru.split(',').map((s) => s.trim()).filter(Boolean) : [],
    }

    try {
      const url = mode === 'create'
        ? '/api/admin/menu/items'
        : `/api/admin/menu/items/${initial.id}`
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
      router.push('/admin/menu/items')
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

  if (!categories.length) {
    return (
      <p className="text-sm text-red-600">
        You must create at least one category before adding items.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category_id" className="block text-sm font-medium text-neutral-700 mb-1">Category *</label>
          <select
            id="category_id"
            value={form.category_id}
            onChange={set('category_id')}
            required
            className={`${enInput} bg-white`}
          >
            <option value="" disabled>Select…</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
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
        folder="menu/items"
        label="Item image"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-neutral-700 mb-1">Price</label>
          <input id="price" type="number" step="0.01" min="0" value={form.price} onChange={set('price')} className={enInput} />
        </div>
        <div>
          <label htmlFor="currency" className="block text-sm font-medium text-neutral-700 mb-1">Currency</label>
          <input id="currency" value={form.currency} onChange={set('currency')} className={enInput} />
        </div>
        <div>
          <label htmlFor="allergens" className="block text-sm font-medium text-neutral-700 mb-1">Allergens (comma)</label>
          <input id="allergens" value={form.allergens} onChange={set('allergens')} placeholder="dairy, gluten" className={enInput} />
        </div>
      </div>

      <LangTabs label="Tags (comma-separated)">
        {(lang) => {
          const field = `tags${langSuffix(lang)}`
          const isAr = lang === 'ar'
          return (
            <input
              value={form[field] || ''}
              onChange={(e) => setField(field, e.target.value)}
              dir={isAr ? 'rtl' : 'ltr'}
              className={isAr ? arInput : enInput}
            />
          )
        }}
      </LangTabs>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.available} onChange={set('available')} className="h-4 w-4" />
          Available
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.featured} onChange={set('featured')} className="h-4 w-4" />
          Featured
        </label>
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="flex items-center gap-3 pt-4 border-t border-neutral-200">
        <button type="submit" disabled={busy}
          className="rounded bg-orange-500 hover:bg-orange-600 disabled:opacity-60 px-4 py-2 text-sm font-medium text-white">
          {busy ? 'Saving…' : mode === 'create' ? 'Create item' : 'Save changes'}
        </button>
        <button type="button" onClick={() => router.push('/admin/menu/items')}
          className="rounded border border-neutral-300 bg-white hover:bg-neutral-50 px-4 py-2 text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}
