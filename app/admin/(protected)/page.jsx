import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

async function getStats() {
  try {
    const supabase = createAdminClient()
    const [
      { count: blogs },
      { count: news },
      { count: categories },
      { count: items },
    ] = await Promise.all([
      supabase.from('blogs').select('id', { count: 'exact', head: true }),
      supabase.from('news').select('id', { count: 'exact', head: true }),
      supabase.from('menu_categories').select('id', { count: 'exact', head: true }),
      supabase.from('menu_items').select('id', { count: 'exact', head: true }),
    ])
    return {
      blogs: blogs || 0,
      news: news || 0,
      categories: categories || 0,
      items: items || 0,
    }
  } catch {
    return { blogs: 0, news: 0, categories: 0, items: 0 }
  }
}

export default async function AdminDashboardPage() {
  const stats = await getStats()

  const cards = [
    { href: '/admin/blogs', label: 'Blogs', count: stats.blogs, accent: 'bg-orange-500' },
    { href: '/admin/news', label: 'News', count: stats.news, accent: 'bg-orange-500' },
    { href: '/admin/menu/categories', label: 'Menu Categories', count: stats.categories, accent: 'bg-neutral-700' },
    { href: '/admin/menu/items', label: 'Menu Items', count: stats.items, accent: 'bg-neutral-700' },
  ]

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-neutral-600">Manage Meat Moot content.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="block rounded-lg border border-neutral-200 bg-white p-5 hover:shadow-md transition"
          >
            <div className={`inline-block w-2 h-2 rounded-full ${c.accent} mb-3`} />
            <div className="text-3xl font-bold">{c.count}</div>
            <div className="mt-1 text-sm text-neutral-600">{c.label}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}
