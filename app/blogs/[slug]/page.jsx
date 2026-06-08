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
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()
  return data || null
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = await fetchBySlug(slug)
  if (!post) return {}

  const locale = await getLocale()
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'

  const title =
    pickLocaleField(post, 'meta_title', locale) ||
    pickLocaleField(post, 'title', locale)
  const description =
    pickLocaleField(post, 'meta_description', locale) ||
    pickLocaleField(post, 'excerpt', locale) ||
    ''

  const enPath = `/blogs/${slug}`
  const arPath = `/ar/blogs/${slug}`
  const ruPath = `/ru/blogs/${slug}`
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
      ...(post.cover_image && { images: [post.cover_image] }),
    },
  }
}

export default async function BlogDetailPage({ params }) {
  const { slug } = await params
  const post = await fetchBySlug(slug)
  if (!post) notFound()

  const locale = await getLocale()
  const isAr = locale === 'ar'
  const isRu = locale === 'ru'

  const title = pickLocaleField(post, 'title', locale)
  const excerpt = pickLocaleField(post, 'excerpt', locale)
  const rawContent = pickLocaleField(post, 'content', locale)
  const content = sanitizeHtml(renderArticleContent(rawContent))
  const tags = normalizeTags(pickLocaleField(post, 'tags', locale))

  const sections = (Array.isArray(post.sections) ? post.sections : [])
    .map((s) => ({
      title: pickLocaleField(s, 'title', locale),
      image: s.image || '',
      content: sanitizeHtml(renderArticleContent(pickLocaleField(s, 'content', locale)) || ''),
    }))
    .filter((s) => s.title || s.image || s.content)

  const jsonLd = articleSchema({ post, locale, section: 'blog' })

  const eyebrow = isAr ? 'المدونة' : isRu ? 'Блог' : 'Journal'
  const backHref = isAr ? '/ar/blogs' : isRu ? '/ru/blogs' : '/blogs'
  const backLabel = isAr ? 'كل المدونات' : isRu ? 'Все статьи' : 'All articles'
  const emptyMessage = isAr
    ? '(لا يوجد محتوى لهذه المدونة بعد.)'
    : isRu
    ? '(Для этой записи пока нет содержимого.)'
    : '(No content for this blog post yet.)'

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
        date={post.date}
        author={post.author}
        category={post.category}
        coverImage={post.cover_image}
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
