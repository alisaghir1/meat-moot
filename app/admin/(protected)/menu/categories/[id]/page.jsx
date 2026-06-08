import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import CategoryForm from '../_components/CategoryForm'

export const dynamic = 'force-dynamic'

export default async function EditCategoryPage({ params }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: category, error } = await supabase
    .from('menu_categories')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !category) notFound()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Edit Category</h1>
        <p className="text-neutral-600 font-mono text-xs">{category.slug}</p>
      </header>
      <CategoryForm mode="edit" initial={category} />
    </div>
  )
}
