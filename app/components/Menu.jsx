import { createAdminClient } from '@/lib/supabase/admin'
import { getLocale } from '@/lib/locale'
import MenuTabs from './MenuTabs'

async function fetchMenu() {
  const supabase = createAdminClient()
  const [{ data: categories }, { data: items }] = await Promise.all([
    supabase
      .from('menu_categories')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true }),
    supabase
      .from('menu_items')
      .select('*')
      .eq('available', true)
      .order('display_order', { ascending: true }),
  ])

  const byCat = new Map()
  for (const c of categories || []) byCat.set(c.id, { ...c, items: [] })
  for (const it of items || []) {
    const bucket = byCat.get(it.category_id)
    if (bucket) bucket.items.push(it)
  }
  return Array.from(byCat.values())
}

const Menu = async () => {
  const locale = await getLocale()
  const categories = await fetchMenu()
  return <MenuTabs categories={categories} locale={locale} />
}

export default Menu
