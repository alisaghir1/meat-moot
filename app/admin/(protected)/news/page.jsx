import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import NewsTable from './_components/NewsTable'

export const dynamic = 'force-dynamic'

export default async function AdminNewsListPage({ searchParams }) {
  const sp = (await searchParams) || {}
  const q = (sp.q || '').toString().trim()
  const status = (sp.status || 'all').toString()

  const supabase = createAdminClient()
  let query = supabase.from('news').select('*').order('date', { ascending: false })

  if (q) query = query.or(`title.ilike.%${q}%,slug.ilike.%${q}%`)
  if (status === 'published') query = query.eq('published', true)
  if (status === 'draft') query = query.eq('published', false)

  const { data: items, error } = await query

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">News</h1>
          <p className="text-sm text-neutral-600">All news items.</p>
        </div>
        <Link
          href="/admin/news/new"
          className="rounded bg-orange-500 hover:bg-orange-600 px-4 py-2 text-sm font-medium text-white"
        >
          + New news item
        </Link>
      </div>

      <form className="flex flex-wrap items-end gap-3" action="/admin/news">
        <div>
          <label htmlFor="q" className="block text-xs text-neutral-600 mb-1">Search</label>
          <input id="q" name="q" defaultValue={q} placeholder="title or slug…"
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm focus:outline-none focus:border-orange-500" />
        </div>
        <div>
          <label htmlFor="status" className="block text-xs text-neutral-600 mb-1">Status</label>
          <select id="status" name="status" defaultValue={status}
            className="rounded border border-neutral-300 px-3 py-1.5 text-sm bg-white">
            <option value="all">All</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        <button type="submit" className="rounded border border-neutral-300 bg-white hover:bg-neutral-50 px-3 py-1.5 text-sm">
          Filter
        </button>
      </form>

      {error ? (
        <p className="text-sm text-red-600">
          Failed to load news. Did you run the SQL migration in
          <code className="mx-1 px-1 bg-neutral-100 rounded">supabase/migrations/0003_news.sql</code>?
        </p>
      ) : (
        <NewsTable items={items || []} />
      )}
    </div>
  )
}
