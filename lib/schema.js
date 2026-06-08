/**
 * JSON-LD schema helpers for Meat Moot.
 * All builders return plain objects ready to be JSON.stringify'd inside a
 * <script type="application/ld+json"> tag.
 */

const SITE_URL = 'https://meatmoot.ae'
const ORG_ID = `${SITE_URL}/#organization`
const WEBSITE_ID = `${SITE_URL}/#website`

/** Pick the locale-appropriate field from a row, falling back to English. */
function loc(row, base, locale) {
  if (!row) return ''
  if (locale === 'ar') return row[`${base}_ar`] || row[base] || ''
  if (locale === 'ru') return row[`${base}_ru`] || row[base] || ''
  return row[base] || ''
}

/** URL prefix for a locale. */
function localeBase(locale) {
  if (locale === 'ar') return '/ar'
  if (locale === 'ru') return '/ru'
  return ''
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': ORG_ID,
    name: 'Meat Moot',
    alternateName: 'MEAT MOOT',
    url: SITE_URL,
    logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
    image: `${SITE_URL}/logo.svg`,
    description:
      'Meat Moot — premium smoked meat restaurant chain in the UAE. Slow-cooked, smoky, tender perfection across Dubai and Abu Dhabi.',
    servesCuisine: ['BBQ', 'Smoked Meat', 'Middle Eastern', 'Steakhouse'],
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressRegion: 'Dubai',
    },
    areaServed: ['Dubai', 'Abu Dhabi', 'Al Ain', 'UAE'],
    sameAs: [
      'https://instagram.com/meatmoot',
      'https://facebook.com/meatmoot',
    ],
  }
}

export const restaurantSchema = organizationSchema

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: 'Meat Moot',
    publisher: { '@id': ORG_ID },
    inLanguage: ['en', 'ar', 'ru'],
  }
}

/**
 * Build Menu schema (https://schema.org/Menu) for the menu page.
 * categories: [{ name, name_ar, items: [{ name, name_ar, description, description_ar, price, image }] }]
 */
export function menuSchema(categories, locale = 'en') {
  const url = `${SITE_URL}${localeBase(locale)}/menu`
  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${url}#menu`,
    url,
    inLanguage: locale,
    provider: { '@id': ORG_ID },
    hasMenuSection: (categories || []).map((cat) => ({
      '@type': 'MenuSection',
      name: loc(cat, 'name', locale),
      hasMenuItem: (cat.items || []).map((item) => ({
        '@type': 'MenuItem',
        name: loc(item, 'name', locale),
        ...(item.description && {
          description: loc(item, 'description', locale),
        }),
        ...(item.price != null && {
          offers: {
            '@type': 'Offer',
            price: String(item.price),
            priceCurrency: 'AED',
          },
        }),
        ...(item.image && { image: item.image }),
      })),
    })),
  }
}

/* ------------ FAQ detection ------------ */

export function extractFaqPairs(content) {
  if (!content || typeof content !== 'string') return []
  const pairs = []
  const htmlRe =
    /<h[2-4][^>]*>\s*([^<]*\?)\s*<\/h[2-4]>\s*((?:(?!<h[2-4])[\s\S])+?)(?=<h[2-4]|$)/gi
  let m
  while ((m = htmlRe.exec(content)) !== null) {
    const question = stripTags(m[1]).trim()
    const answer = stripTags(m[2]).replace(/\s+/g, ' ').trim()
    if (question && answer) pairs.push({ question, answer })
  }
  return pairs
}

function stripTags(html) {
  return String(html).replace(/<[^>]+>/g, '')
}

export function faqPageSchema(pairs) {
  if (!pairs || pairs.length === 0) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

/* ------------ Article schemas (blogs + news share the same builder) ------------ */

export function articleSchema({ post, locale = 'en', section = 'blog' }) {
  const slug = post.slug
  const base = localeBase(locale)
  const sectionLabel = section === 'news' ? 'news' : 'blogs'
  const path = `${base}/${sectionLabel}/${slug}`
  const pageUrl = `${SITE_URL}${path}`

  const title = loc(post, 'title', locale)
  const description =
    loc(post, 'meta_description', locale) || loc(post, 'excerpt', locale) || ''

  const article = {
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#article`,
    headline: title,
    ...(description && { description }),
    url: pageUrl,
    ...(post.cover_image && { image: post.cover_image }),
    ...(post.image && !post.cover_image && { image: post.image }),
    ...(post.date && {
      datePublished: new Date(post.date).toISOString(),
      dateModified: new Date(post.updated_at || post.date).toISOString(),
    }),
    inLanguage: locale,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
    ...(post.category && { articleSection: post.category }),
    ...(Array.isArray(post.tags) && post.tags.length > 0 && {
      keywords: post.tags.join(', '),
    }),
  }

  const webPage = {
    '@type': 'WebPage',
    '@id': `${pageUrl}#webpage`,
    url: pageUrl,
    name: title,
    isPartOf: { '@id': WEBSITE_ID },
    breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
    inLanguage: locale,
  }

  const homeLabel = locale === 'ar' ? 'الرئيسية' : locale === 'ru' ? 'Главная' : 'Home'
  const sectionLabelText =
    section === 'news'
      ? locale === 'ar'
        ? 'الأخبار'
        : locale === 'ru'
        ? 'Новости'
        : 'News'
      : locale === 'ar'
      ? 'المدونة'
      : locale === 'ru'
      ? 'Блог'
      : 'Blogs'

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: `${SITE_URL}${base || '/'}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: sectionLabelText,
        item: `${SITE_URL}${base}/${sectionLabel}`,
      },
      { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
    ],
  }

  const graph = [article, webPage, breadcrumb, organizationSchema(), websiteSchema()]

  const faqSource = loc(post, 'content', locale)
  const faq = faqPageSchema(extractFaqPairs(faqSource))
  if (faq) graph.push(faq)

  return { '@context': 'https://schema.org', '@graph': graph }
}
