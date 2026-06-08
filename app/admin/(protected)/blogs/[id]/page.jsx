import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import BlogForm from '../_components/BlogForm'

export const dynamic = 'force-dynamic'

export default async function EditBlogPage({ params }) {
  const { id } = await params
  const supabase = createAdminClient()
  const { data: blog, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !blog) notFound()

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Edit Blog</h1>
        <p className="text-sm text-neutral-600 font-mono text-xs">{blog.slug}</p>
      </header>
      <BlogForm mode="edit" initial={blog} />
    </div>
  )
}
