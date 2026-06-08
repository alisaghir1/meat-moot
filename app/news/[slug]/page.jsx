import { notFound } from 'next/navigation'
import { createAdminClient } from '@/lib/supabase/admin'
import { getLocale } from '@/lib/locale'
import { renderArticleContent, normalizeTags } from '@/lib/renderContent'
import { sanitizeHtml } from '@/lib/sanitize'
import { articleSchema } from '@/lib/schema'
import { pickLocaleField } from '@/lib/pickLocaleField'
import ArticleLayout from '@/app/components/ArticleLayout'

const SITE_URL = 'https://meatmoot.ae'

export const revalidate = 10

async function fetchBySlug(slug) {
  const supabase = createAdminClient()
  const { data } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  return data || null
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const item = await fetchBySlug(slug)
  if (!item) return {}

  const locale = await getLocale()
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'

  const title =
    pickLocaleField(item, 'meta_title', locale) ||
    pickLocaleField(item, 'title', locale)
  const description =
    pickLocaleField(item, 'meta_description', locale) ||
    pickLocaleField(item, 'excerpt', locale) ||
    ''

  const enPath = `/news/${slug}`
  const arPath = `/ar/news/${slug}`
  const ruPath = `/ru/news/${slug}`
  const canonical = `${SITE_URL}${isAr ? arPath : isRu ? ruPath : enPath}`
  const ogLocale = isAr ? 'ar_AE' : isRu ? 'ru_RU' : 'en_US'

  return {
    title,
    description,
    alternates: { canonical, languages: { en: enPath, ar: arPath, ru: ruPath } },
    openGraph: {
      title,
      description,
      type: 'article',
      locale: ogLocale,
      url: canonical,
      ...(item.cover_image && { images: [item.cover_image] }),
    },
  }
}

export default async function NewsDetailPage({ params }) {
  const { slug } = await params
  const item = await fetchBySlug(slug)
  if (!item) notFound()

  const locale = await getLocale()
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'

  const title = pickLocaleField(item, 'title', locale)
  const excerpt = pickLocaleField(item, 'excerpt', locale)
  const rawContent = pickLocaleField(item, 'content', locale)
  const content = sanitizeHtml(renderArticleContent(rawContent))
  const tags = normalizeTags(pickLocaleField(item, 'tags', locale))

  const sections = (Array.isArray(item.sections) ? item.sections : [])
    .map((s) => ({
      title: pickLocaleField(s, 'title', locale),
      image: s.image || '',
      content: sanitizeHtml(renderArticleContent(pickLocaleField(s, 'content', locale)) || ''),
    }))
    .filter((s) => s.title || s.image || s.content)

  const jsonLd = articleSchema({ post: item, locale, section: 'news' })

  const eyebrow = isAr ? 'الأخبار' : isRu ? 'Новости' : 'News'
  const backHref = isAr ? '/ar/news' : isRu ? '/ru/news' : '/news'
  const backLabel = isAr ? 'كل الأخبار' : isRu ? 'Все новости' : 'All news'
  const emptyMessage = isAr
    ? '(لا يوجد محتوى لهذا الخبر بعد.)'
    : isRu
    ? '(Для этой новости пока нет содержимого.)'
    : '(No content for this news article yet.)'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticleLayout
        eyebrow={eyebrow}
        title={title}
        excerpt={excerpt}
        date={item.date}
        author={item.author}
        category={item.category}
        coverImage={item.cover_image}
        coverAlt={title}
        content={content}
        sections={sections}
        tags={tags}
        isAr={isAr}
        locale={locale}
        backHref={backHref}
        backLabel={backLabel}
        emptyMessage={emptyMessage}
      />
    </>
  )
}
