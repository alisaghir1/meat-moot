import Image from 'next/image'
import Link from 'next/link'

/**
 * Premium long-form article layout shared by /blogs/[slug] and /news/[slug].
 *
 * Props:
 *   eyebrow            string  small uppercase label above the title (e.g. "Journal" or "News")
 *   title              string  main headline
 *   excerpt            string  optional standfirst paragraph
 *   date               string  ISO date
 *   author             string  optional byline
 *   category           string  optional category text
 *   coverImage         string  optional hero image URL
 *   coverAlt           string  hero image alt
 *   content            string  sanitized HTML for the body
 *   sections           array   [{ title, image, content (sanitized html) }]
 *   tags               array   already-normalized string[]
 *   isAr               boolean
 *   backHref           string  link target for the breadcrumb back link
 *   backLabel          string  label for the back link
 *   emptyMessage       string  shown when no content
 */
export default function ArticleLayout({
  eyebrow,
  title,
  excerpt,
  date,
  author,
  category,
  coverImage,
  coverAlt,
  content,
  sections = [],
  tags = [],
  isAr,
  locale,
  backHref,
  backLabel,
  emptyMessage,
}) {
  const lang = locale || (isAr ? 'ar' : 'en')
  const isRu = lang === 'ru'
  const dateLocale = lang === 'ar' ? 'ar-AE' : lang === 'ru' ? 'ru-RU' : 'en-US'
  const formattedDate = date
    ? new Date(date).toLocaleDateString(dateLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <article dir={isAr ? 'rtl' : 'ltr'} className="pt-32 sm:pt-40 pb-24">
      {/* Breadcrumb back link */}
      <div className="container mx-auto max-w-4xl">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/55 hover:text-orange transition-colors"
        >
          <span aria-hidden className="rtl:rotate-180">←</span>
          {backLabel}
        </Link>
      </div>

      {/* Header */}
      <header className="container mx-auto mt-8 max-w-3xl text-center">
        {eyebrow || category ? (
          <span className="eyebrow justify-center">{category || eyebrow}</span>
        ) : null}
        <h1 className="mt-5 font-display text-white text-4xl sm:text-5xl xl:text-6xl leading-[1.05] text-balance">
          {title}
        </h1>
        {excerpt ? (
          <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/75 text-pretty">
            {excerpt}
          </p>
        ) : null}
        {date || author ? (
          <p className="mt-7 text-[13px] uppercase tracking-[0.18em] text-white/45">
            {formattedDate}
            {author ? <span className="mx-2 text-white/25">·</span> : null}
            {author}
          </p>
        ) : null}
      </header>

      {/* Hero image */}
      {coverImage ? (
        <div className="container mx-auto mt-12 max-w-5xl">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-ember-light shadow-card">
            <Image
              src={coverImage}
              alt={coverAlt || title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 960px"
              className="object-cover"
              unoptimized
            />
          </div>
        </div>
      ) : null}

      {/* Body */}
      <div className="container mx-auto mt-14 max-w-2xl">
        {content ? (
          <div
            className="article-body article-body--drop"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-center italic text-white/55">{emptyMessage}</p>
        )}

        {sections.length > 0 ? (
          <div className="mt-14 space-y-14">
            {sections.map((s, i) => (
              <section key={i}>
                {s.title ? (
                  <h2 className="font-display text-white text-3xl sm:text-4xl mb-5">
                    {s.title}
                  </h2>
                ) : null}
                {s.image ? (
                  <div className="relative w-full aspect-[16/9] mb-6 overflow-hidden rounded-xl bg-ember-light">
                    <Image
                      src={s.image}
                      alt={s.title || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                ) : null}
                {s.content ? (
                  <div
                    className="article-body"
                    dangerouslySetInnerHTML={{ __html: s.content }}
                  />
                ) : null}
              </section>
            ))}
          </div>
        ) : null}

        {tags.length > 0 ? (
          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="eyebrow !text-white/40 mb-4">
              {isAr ? 'الوسوم' : isRu ? 'Теги' : 'Tags'}
            </p>
            <div className="flex flex-wrap gap-2" style={{ gap: '0.5rem' }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs uppercase tracking-wider text-white/65"
                  style={{ padding: '0.3rem 0.75rem' }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* Footer CTA */}
      <div className="container mx-auto mt-20 max-w-3xl text-center">
        <div className="mx-auto h-px w-24 bg-gradient-to-r from-transparent via-orange to-transparent" />
        <h3 className="mt-10 font-display text-white text-2xl sm:text-3xl">
          {isAr ? 'هل أعجبتك القصة؟' : isRu ? 'Понравилась статья?' : 'Enjoyed the read?'}
        </h3>
        <p className="mt-3 text-white/65">
          {isAr ? 'احجز طاولتك وعِشها بنفسك.' : isRu ? 'Забронируйте столик и попробуйте сами.' : 'Reserve your table and taste it for yourself.'}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/#reservation" className="btn-primary">
            {isAr ? 'احجز الآن' : isRu ? 'Забронировать' : 'Reserve'}
          </Link>
          <Link href={backHref} className="btn-ghost">
            {backLabel}
          </Link>
        </div>
      </div>
    </article>
  )
}
