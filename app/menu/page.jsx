import Image from 'next/image'
import Link from 'next/link'
import { createAdminClient } from '@/lib/supabase/admin'
import { getLocale } from '@/lib/locale'
import { pickLocaleField } from '@/lib/pickLocaleField'
import { formatPrice } from '@/lib/utils'
import { menuSchema, restaurantSchema, websiteSchema } from '@/lib/schema'

const SITE_URL = 'https://meatmoot.ae'

export const revalidate = 120

export async function generateMetadata() {
  const locale = await getLocale()
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'
  const title = isAr
    ? 'قائمة الطعام | ميت موت'
    : isRu
    ? 'Меню | Meat Moot'
    : 'Menu | Meat Moot'
  const description = isAr
    ? 'استكشف قائمة ميت موت — لحوم مدخنة، شواء، ومأكولات شرق أوسطية.'
    : isRu
    ? 'Откройте меню Meat Moot — копчёное мясо, барбекю и блюда ближневосточной кухни.'
    : 'Explore the Meat Moot menu — smoked meats, BBQ, and Middle Eastern favorites.'
  const enPath = '/menu'
  const arPath = '/ar/menu'
  const ruPath = '/ru/menu'
  const canonical = `${SITE_URL}${isAr ? arPath : isRu ? ruPath : enPath}`
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: { en: enPath, ar: arPath, ru: ruPath },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: isAr ? 'ar_AE' : isRu ? 'ru_RU' : 'en_US',
      url: canonical,
    },
  }
}

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
      .order('display_order', { ascending: true })
      .order('name', { ascending: true }),
  ])

  const byCat = new Map()
  for (const c of categories || []) byCat.set(c.id, { ...c, items: [] })
  for (const it of items || []) {
    const bucket = byCat.get(it.category_id)
    if (bucket) bucket.items.push(it)
  }
  return Array.from(byCat.values())
}

export default async function MenuPage() {
  const locale = await getLocale()
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'
  const categories = await fetchMenu()
  const jsonLd = menuSchema(categories, locale)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />

      <main dir={isAr ? 'rtl' : 'ltr'} className="pt-32 sm:pt-40 pb-24">
        {/* Hero */}
        <section className="container mx-auto">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow justify-center">
              {isAr ? 'قائمتنا' : isRu ? 'Наше меню' : 'The Menu'}
            </span>
            <h1 className="mt-5 font-display text-white text-5xl sm:text-6xl xl:text-7xl leading-[1.05]">
              {isAr ? 'مختارات ميت موت' : isRu ? 'Мастерство копчения на дровах' : 'Wood-Smoked Excellence'}
            </h1>
            <p className="mt-5 text-white/70 text-lg leading-relaxed">
              {isAr
                ? 'من القطع المُختارة بعناية إلى الصلصات المحضرة في مطبخنا — كل طبق قصة.'
                : isRu
                ? 'От тщательно отобранных отрубов до соусов собственного приготовления — каждое блюдо имеет свою историю.'
                : 'From hand-selected cuts to house-made sauces — every plate is a story we love to tell.'}
            </p>
          </div>

          <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-orange to-transparent" />
        </section>

        {/* Categories */}
        {categories.length === 0 ? (
          <p className="container mx-auto mt-16 text-center text-white/55">
            {isAr ? 'لا توجد عناصر متاحة حالياً.' : isRu ? 'Пока нет доступных позиций.' : 'No items available yet.'}
          </p>
        ) : (
          <div className="container mx-auto mt-20 space-y-24">
            {categories.map((cat, idx) => {
              const catName = pickLocaleField(cat, 'name', locale)
              const catDesc = pickLocaleField(cat, 'description', locale)
              return (
                <section
                  key={cat.id}
                  aria-labelledby={`cat-${cat.id}`}
                  className="scroll-mt-32"
                >
                  <header className="mx-auto max-w-2xl text-center">
                    <span className="eyebrow justify-center">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <h2
                      id={`cat-${cat.id}`}
                      className="mt-4 font-display text-white text-3xl sm:text-4xl xl:text-5xl"
                    >
                      {catName}
                    </h2>
                    {catDesc ? (
                      <p className="mx-auto mt-4 max-w-xl text-white/70">{catDesc}</p>
                    ) : null}
                  </header>

                  {cat.items.length === 0 ? (
                    <p className="mt-10 text-center text-sm text-white/45">
                      {isAr ? 'لا توجد عناصر.' : isRu ? 'Нет позиций.' : 'No items.'}
                    </p>
                  ) : (
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cat.items.map((it) => {
                        const name = pickLocaleField(it, 'name', locale)
                        const desc = pickLocaleField(it, 'description', locale)
                        return (
                          <article
                            key={it.id}
                            className="card-surface group overflow-hidden flex flex-col"
                          >
                            {it.image ? (
                              <div className="relative w-full aspect-[4/3] overflow-hidden bg-ember-light">
                                <Image
                                  src={it.image}
                                  alt={name}
                                  fill
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                  className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.05]"
                                  unoptimized
                                />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                                {it.price != null ? (
                                  <span className="absolute top-3 end-3 rounded-full bg-black/70 backdrop-blur px-3 py-1 text-xs font-semibold text-orange ring-1 ring-white/10">
                                    {it.currency || 'AED'} {formatPrice(it.price)} {isAr ? '(شامل ضريبة القيمة المضافة) / كغ' : isRu ? '(с НДС) / кг' : '(with VAT) / kg'}
                                  </span>
                                ) : null}
                              </div>
                            ) : (
                              <div className="relative aspect-[4/3] grid place-items-center bg-ember-light text-white/20 font-display text-5xl">
                                {name?.[0] || 'M'}
                              </div>
                            )}

                            <div className="flex flex-1 flex-col gap-3 p-6">
                              <div className="flex items-start justify-between gap-3">
                                <h3 className="font-display text-xl text-white leading-tight">
                                  {name}
                                </h3>
                                {it.price != null && !it.image ? (
                                  <span className="shrink-0 text-orange font-semibold">
                                    {it.currency || 'AED'} {formatPrice(it.price)} {isAr ? '(شامل ضريبة القيمة المضافة) / كغ' : isRu ? '(с НДС) / кг' : '(with VAT) / kg'}
                                  </span>
                                ) : null}
                              </div>
                              {desc ? (
                                <p className="text-sm leading-relaxed text-white/65 flex-1">
                                  {desc}
                                </p>
                              ) : null}
                              {Array.isArray(it.allergens) && it.allergens.length > 0 ? (
                                <p className="mt-1 text-[11px] uppercase tracking-wider text-white/40">
                                  {isAr ? 'يحتوي على: ' : isRu ? 'Содержит: ' : 'Contains: '}
                                  {it.allergens.join(', ')}
                                </p>
                              ) : null}
                            </div>
                          </article>
                        )
                      })}
                    </div>
                  )}
                </section>
              )
            })}
          </div>
        )}

        {/* CTA */}
        <div className="container mx-auto mt-24 text-center">
          <h3 className="font-display text-white text-3xl sm:text-4xl">
            {isAr ? 'مستعد للتجربة؟' : isRu ? 'Готовы попробовать?' : 'Ready to taste it?'}
          </h3>
          <p className="mt-3 text-white/60">
            {isAr ? 'احجز طاولتك في أقرب فرع.' : isRu ? 'Забронируйте столик в ближайшем филиале.' : 'Reserve your table at the nearest branch.'}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href="/#reservation" className="btn-primary">
              {isAr ? 'احجز الآن' : isRu ? 'Забронировать' : 'Reserve'}
            </Link>
            <Link href="/contact" className="btn-ghost">
              {isAr ? 'تواصل معنا' : isRu ? 'Связаться с нами' : 'Contact us'}
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
