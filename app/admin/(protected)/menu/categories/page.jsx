import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import CategoriesTable from './_components/CategoriesTable'

export const dynamic = 'force-dynamic'

export default async function AdminMenuCategoriesPage() {
  const supabase = createAdminClient()
  const { data: categories, error } = await supabase
    .from('menu_categories')
    .select('*')
    .order('display_order', { ascending: true })
    .order('name', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Menu Categories</h1>
          <p className="text-sm text-neutral-600">Organize menu items into sections.</p>
        </div>
        <Link
          href="/admin/menu/categories/new"
          className="rounded bg-orange-500 hover:bg-orange-600 px-4 py-2 text-sm font-medium text-white"
        >
          + New category
        </Link>
      </div>

      {error ? (
        <p className="text-sm text-red-600">
          Failed to load categories. Did you run
          <code className="mx-1 px-1 bg-neutral-100 rounded">supabase/migrations/0004_menu.sql</code>?
        </p>
      ) : (
        <CategoriesTable categories={categories || []} />
      )}
    </div>
  )
}
