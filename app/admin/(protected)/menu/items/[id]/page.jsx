import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import ItemForm from '../_components/ItemForm'

export const dynamic = 'force-dynamic'

export default async function EditMenuItemPage({ params }) {
  const { id } = await params
  const supabase = createAdminClient()

  const [{ data: item, error }, { data: categories }] = await Promise.all([
    supabase.from('menu_items').select('*').eq('id', id).maybeSingle(),
    supabase.from('menu_categories').select('id, name').order('display_order', { ascending: true }),
  ])

  if (error || !item) notFound()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Edit Menu Item</h1>
        <p className="text-sm text-neutral-600">{item.name}</p>
      </header>
      <ItemForm mode="edit" initial={item} categories={categories || []} />
    </div>
  )
}
