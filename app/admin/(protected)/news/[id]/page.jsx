import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import NewsForm from '../_components/NewsForm'

export const dynamic = 'force-dynamic'

export default async function EditNewsPage({ params }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: item, error } = await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !item) notFound()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Edit News Item</h1>
        <p className="text-neutral-600 font-mono text-xs">{item.slug}</p>
      </header>
      <NewsForm mode="edit" initial={item} />
    </div>
  )
}
