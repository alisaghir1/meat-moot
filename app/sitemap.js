import { createAdminClient } from '@/lib/supabase/admin'

const SITE_URL = 'https://meatmoot.ae'

// Static routes that should always be in the sitemap.
const STATIC_ROUTES = [
  '',
  '/about',
  '/contact',
  '/terms',
  '/menu',
  '/al-qana',
  '/al-ain',
  '/city-walk',
  '/dubai-hills',
  '/jbr',
  '/khawaneej',
  '/blogs',
  '/news',
  // Legacy static blog/news folders still in the repo.
  '/blogs/beef-cuts-guide',
  '/blogs/food-and-friendship',
  '/blogs/global-flavors',
  '/blogs/lamb-cuts-guide',
  '/blogs/meat-myths-busted',
  '/blogs/seasonal-menu-specials',
  '/blogs/secret-sauces',
  '/blogs/signature-lamb-dishes',
  '/blogs/smoking-history',
  '/blogs/special-occasions',
  '/news/al-ain-grand-opening',
  '/news/arab-stars-visit',
  '/news/dubai-grand-opening',
  '/news/dubai-hills-branch',
  '/news/dubai-hills-opening',
  '/news/ertugrul-cast-visit',
  '/news/happy-new-year-2026',
  '/news/immersive-experience',
  '/news/jbr-branch-opening',
  '/news/meat-moot-fastest-growing-chain',
  '/news/meat-moot-global-success',
]

async function fetchDbSlugs() {
  try {
    const supabase = createAdminClient()
    const [{ data: blogs }, { data: news }] = await Promise.all([
      supabase.from('blogs').select('slug, updated_at').eq('published', true),
      supabase.from('news').select('slug, updated_at').eq('published', true),
    ])
    return { blogs: blogs || [], news: news || [] }
  } catch {
    return { blogs: [], news: [] }
  }
}

export default async function sitemap() {
  const now = new Date()
  const { blogs, news } = await fetchDbSlugs()

  const entries = []
  for (const path of STATIC_ROUTES) entries.push(buildEntry(path, now))
  for (const b of blogs) {
    entries.push(buildEntry(`/blogs/${b.slug}`, b.updated_at ? new Date(b.updated_at) : now))
  }
  for (const n of news) {
    entries.push(buildEntry(`/news/${n.slug}`, n.updated_at ? new Date(n.updated_at) : now))
  }

  // De-duplicate by URL (DB slug could collide with legacy static path).
  const seen = new Set()
  return entries.filter((e) => {
    if (seen.has(e.url)) return false
    seen.add(e.url)
    return true
  })
}

function buildEntry(path, lastModified) {
  return {
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1.0 : 0.7,
    alternates: {
      languages: {
        en: `${SITE_URL}${path}`,
        ar: `${SITE_URL}/ar${path}`,
        ru: `${SITE_URL}/ru${path}`,
      },
    },
  }
}
