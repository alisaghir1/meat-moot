import Link from 'next/link'
import Image from 'next/image'
import { createAdminClient } from '@/lib/supabase/admin'
import { getLocale } from '@/lib/locale'
import { pickLocaleField } from '@/lib/pickLocaleField'

export const revalidate = 60

async function fetchBlogs() {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('blogs')
    .select('id, slug, title, title_ar, title_ru, excerpt, excerpt_ar, excerpt_ru, cover_image, date, tags, tags_ar, tags_ru')
    .eq('published', true)
    .order('date', { ascending: false })
  return data || []
}

function formatDate(iso, locale) {
  if (!iso) return ''
  try {
    const lang = locale === 'ar' ? 'ar-AE' : locale === 'ru' ? 'ru-RU' : 'en-US'
    return new Intl.DateTimeFormat(lang, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso))
  } catch {
    return ''
  }
}

function normalizeTags(raw) {
  if (!raw) return []
  if (Array.isArray(raw)) return raw.filter(Boolean)
  if (typeof raw === 'string') {
    const s = raw.trim()
    if (s.startsWith('[')) {
      try { const a = JSON.parse(s); return Array.isArray(a) ? a : [] } catch {}
    }
    if (s.startsWith('{') && s.endsWith('}')) {
      return s.slice(1, -1).split(',').map((x) => x.replace(/^"|"$/g, '').trim()).filter(Boolean)
    }
    return s.split(',').map((x) => x.trim()).filter(Boolean)
  }
  return []
}

export default async function BlogsPage({ searchParams }) {
  const locale = await getLocale()
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'
  const sp = (await searchParams) || {}
  const blogs = await fetchBlogs()

  const headerTitle = isAr
    ? 'مدونات ميت موت'
    : isRu
    ? 'Истории из коптильни'
    : 'Stories from the smoker'
  const headerEyebrow = isAr ? 'المدونة' : isRu ? 'Блог' : 'Journal'
  const headerDescription = isAr
    ? 'مقالات عن اللحوم، الطهي البطيء، والثقافة من حول العالم.'
    : isRu
    ? 'Лонгриды о мясе, медленной кухне и кулинарных традициях со всего мира.'
    : 'Long-form reads on meat, slow-cooking craft, and food culture from around the world.'

  const pageSize = 7
  const totalPages = Math.max(1, Math.ceil(blogs.length / pageSize))
  let currentPage = parseInt(sp.page || '1', 10)
  if (isNaN(currentPage) || currentPage < 1) currentPage = 1
  if (currentPage > totalPages) currentPage = totalPages
  const startIndex = (currentPage - 1) * pageSize
  const visible = blogs.slice(startIndex, startIndex + pageSize)

  const hrefBase = isAr ? '/ar/blogs' : isRu ? '/ru/blogs' : '/blogs'
  const [featured, ...rest] = visible

  return (
    <main dir={isAr ? 'rtl' : 'ltr'} className="pt-32 sm:pt-40 pb-24">
      <header className="container mx-auto">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow justify-center">{headerEyebrow}</span>
          <h1 className="mt-5 font-display text-white text-5xl sm:text-6xl xl:text-7xl leading-[1.05]">
            {headerTitle}
          </h1>
          <p className="mt-5 text-white/70 text-lg">{headerDescription}</p>
        </div>
        <div className="mx-auto mt-10 h-px w-24 bg-gradient-to-r from-transparent via-orange to-transparent" />
      </header>

      {visible.length === 0 ? (
        <p className="container mx-auto mt-16 text-center text-white/55">
          {isAr
            ? 'لا توجد مقالات حالياً.'
            : isRu
            ? 'Пока нет записей в блоге.'
            : 'No blog posts yet.'}
        </p>
      ) : (
        <section className="container mx-auto mt-16 space-y-16">
          {/* Featured card on page 1 */}
          {featured && currentPage === 1 ? (
            <FeaturedCard item={featured} locale={locale} hrefBase={hrefBase} />
          ) : null}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(currentPage === 1 ? rest : visible).map((item) => (
              <ArticleCard
                key={item.id}
                item={item}
                locale={locale}
                hrefBase={hrefBase}
              />
            ))}
          </div>
        </section>
      )}

      {totalPages > 1 ? (
        <nav
          aria-label="Pagination"
          className="container mx-auto mt-20 flex flex-wrap items-center justify-center gap-2"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`${hrefBase}?page=${p}`}
              className={`grid h-10 w-10 place-items-center rounded-full border text-sm font-medium transition ${
                p === currentPage
                  ? 'border-orange bg-orange text-black-heavy shadow-glow'
                  : 'border-white/15 text-white/75 hover:border-white/40 hover:text-white'
              }`}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </Link>
          ))}
        </nav>
      ) : null}
    </main>
  )
}

function FeaturedCard({ item, locale, hrefBase }) {
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'
  const title = pickLocaleField(item, 'title', locale)
  const excerpt = pickLocaleField(item, 'excerpt', locale)
  const tags = normalizeTags(pickLocaleField(item, 'tags', locale))
  const featuredLabel = isAr ? 'مميّز' : isRu ? 'Избранное' : 'Featured'
  const readLabel = isAr ? 'اقرأ الмقال' : isRu ? 'Читать статью' : 'Read article'
  return (
    <Link
      href={`${hrefBase}/${item.slug}`}
      className="group grid grid-cols-1 lg:grid-cols-12 gap-8 card-surface !rounded-2xl p-5 sm:p-7 lg:p-8 overflow-hidden"
    >
      <div className="relative lg:col-span-7 aspect-[16/10] lg:aspect-[16/11] overflow-hidden rounded-xl bg-ember-light">
        {item.cover_image ? (
          <Image
            src={item.cover_image}
            alt={title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-ember-light" />
        )}
        <div className="absolute top-4 start-4 rounded-full bg-orange/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-black-heavy">
          {featuredLabel}
        </div>
      </div>
      <div className="lg:col-span-5 flex flex-col justify-center">
        <span className="eyebrow">{formatDate(item.date, locale)}</span>
        <h2 className="mt-4 font-display text-white text-3xl sm:text-4xl xl:text-5xl leading-tight group-hover:text-orange transition-colors">
          {title}
        </h2>
        {excerpt ? (
          <p className="mt-4 text-white/70 leading-relaxed line-clamp-3">{excerpt}</p>
        ) : null}
        {tags.length > 0 ? (
          <div className="mt-5 flex flex-wrap gap-2" style={{ gap: '0.5rem' }}>
            {tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="inline-block rounded-full border border-white/10 px-3 py-1 text-[11px] uppercase tracking-wider text-white/60"
              >
                {t}
              </span>
            ))}
          </div>
        ) : null}
        <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-orange">
          {readLabel}
          <span aria-hidden className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}

function ArticleCard({ item, locale, hrefBase }) {
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'
  const title = pickLocaleField(item, 'title', locale)
  const excerpt = pickLocaleField(item, 'excerpt', locale)
  const readMore = isAr ? 'اقرأ الмزيد' : isRu ? 'Читать далее' : 'Read more'
  return (
    <Link
      href={`${hrefBase}/${item.slug}`}
      className="card-surface group overflow-hidden flex flex-col"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-ember-light">
        {item.cover_image ? (
          <Image
            src={item.cover_image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-ember-light" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="eyebrow">{formatDate(item.date, locale)}</span>
        <h3 className="mt-3 font-display text-white text-xl sm:text-2xl leading-snug group-hover:text-orange transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt ? (
          <p className="mt-3 text-sm text-white/65 leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>
        ) : null}
        <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-orange/85">
          {readMore}
          <span aria-hidden className="transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1">→</span>
        </span>
      </div>
    </Link>
  )
}
