import { createAdminClient } from '@/lib/supabase/admin'
import ItemForm from '../_components/ItemForm'

export const dynamic = 'force-dynamic'

export default async function NewMenuItemPage() {
  const supabase = createAdminClient()
  const { data: categories } = await supabase
    .from('menu_categories')
    .select('id, name')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">New Menu Item</h1>
        <p className="text-sm text-neutral-600">Add a dish or drink.</p>
      </header>
      <ItemForm mode="create" categories={categories || []} />
    </div>
  )
}
