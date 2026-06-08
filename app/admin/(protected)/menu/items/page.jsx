import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import ItemsTable from './_components/ItemsTable'

export const dynamic = 'force-dynamic'

export default async function AdminMenuItemsPage({ searchParams }) {
  const sp = (await searchParams) || {}
  const categoryId = (sp.category || '').toString()

  const supabase = createAdminClient()

  const [{ data: items, error }, { data: categories }] = await Promise.all([
    (() => {
      let q = supabase
        .from('menu_items')
        .select('*, menu_categories(id, name)')
        .order('display_order', { ascending: true })
        .order('name', { ascending: true })
      if (categoryId) q = q.eq('category_id', categoryId)
      return q
    })(),
    supabase
      .from('menu_categories')
      .select('id, name')
      .order('display_order', { ascending: true }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Menu Items</h1>
          <p className="text-sm text-neutral-600">All dishes and drinks.</p>
        </div>
        <Link
          href="/admin/menu/items/new"
          className="rounded bg-orange-500 hover:bg-orange-600 px-4 py-2 text-sm font-medium text-white"
        >
          + New item
        </Link>
      </div>

      <form className="flex flex-wrap items-end gap-3" action="/admin/menu/items">
        <div>
          <label htmlFor="category" className="block text-xs text-neutral-600 mb-1">Category</label>
          <select id="category" name="category" defaultValue={categoryId}
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm bg-white">
            <option value="">All</option>
            {(categories || []).map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="rounded border border-neutral-300 bg-white hover:bg-neutral-50 px-3 py-1.5 text-sm">
          Filter
        </button>
      </form>

      {error ? (
        <p className="text-sm text-red-600">
          Failed to load items. Did you run
          <code className="mx-1 px-1 bg-neutral-100 rounded">supabase/migrations/0004_menu.sql</code>?
        </p>
      ) : (
        <ItemsTable items={items || []} />
      )}
    </div>
  )
}
