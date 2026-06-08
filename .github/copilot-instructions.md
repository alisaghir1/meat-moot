# Copilot Project Instructions — Meat Moot

These rules apply to **every** Copilot response in this repository. Follow them
without being reminded. If a request conflicts with a rule, flag the conflict
and propose the compliant alternative before writing code.

The full reference lives in user memory at
`/memories/seo-i18n-admin-checklist.md`. Treat that file as the source of
truth; the sections below are the minimum each PR/edit must satisfy.

Brand: `Meat Moot` in prose, `MEAT MOOT` in display headings, `meatmoot.ae`
in URLs. Stay consistent.

---

## 1. i18n — no hardcoded strings

- Every visible string MUST go through `t('namespace.key')` from
  `@/lib/LanguageContext`.
- When a new key is introduced in code, add it to **both** `locales/en.json`
  and `locales/ar.json` in the same edit. Never ship a key in only one file.
- Match nesting structure between locale files exactly.
- Locale is driven by URL prefix: `/ar/*` for Arabic, everything else is
  English. Middleware rewrites `/ar/*` to the underlying route.
- The legacy `app/context/index.jsx` (`AppWrapper`) is still mounted for
  existing public pages. When refactoring a public page, migrate it to
  `useLanguage()` + `t()` and delete its `app/translation/*.js` file.

## 2. Locale-aware content (Supabase)

- Every translatable DB column has an `_ar` twin: `title`/`title_ar`,
  `excerpt`/`excerpt_ar`, `content`/`content_ar`, `meta_title`/`meta_title_ar`,
  `meta_description`/`meta_description_ar`, `tags`/`tags_ar`,
  `name`/`name_ar` (menu items), `description`/`description_ar`, etc.
- Admin forms render EN and AR inputs side-by-side. Arabic inputs use
  `dir="rtl"` and `text-right`. Never a single shared field.
- Frontend selector pattern:
  `const v = isAr ? (row.field_ar || row.field) : row.field`
- Initialize `_ar` keys in `useState` defaults and hydrate with
  `data.field_ar || ''` on fetch (prevents controlled→uncontrolled warnings).
- Confirm the Supabase schema actually has the `_ar` column before adding
  the input.

## 3. Metadata

- `generateMetadata` prefers `meta_title_ar`/`meta_description_ar` for
  Arabic and falls back to title/excerpt.
- Set `openGraph.locale` (`ar_AE` / `en_US`) and `alternates.languages`.
- Set `alternates.canonical` per page.

## 4. Rich text / article body

- Headings are real `<h2>`/`<h3>`, never `**bold**` paragraph text.
- The shared `RichTextEditor` (TipTap) toolbar exposes H2/H3/H4 buttons.
- Render content with a `.article-body` container (defined in
  `app/globals.css`). Do **not** use Tailwind `prose-*` — `@tailwindcss/typography`
  is not installed.
- Always pass stored content through `renderArticleContent()` from
  `@/lib/renderContent` before rendering.
- Sanitize HTML with `sanitizeHtml()` from `@/lib/sanitize` before passing
  to `dangerouslySetInnerHTML`.

## 5. Tags / chips

- Normalize before render: accept array, JSON string, PG `{a,b}` string,
  comma-separated string. Always emit a clean `string[]`.
- Wrapper: `flex flex-wrap gap-2` AND inline `style={{ gap: '0.5rem' }}` as
  a fallback. Each chip is `inline-block` with its own padding.

## 6. JSON-LD schema

- Root layout emits `Restaurant` + `WebSite` (skip on `/admin` paths).
- Menu page emits `Menu` schema referencing the restaurant by `@id`.
- Blog/News detail pages emit `BlogPosting` + `WebPage` + `BreadcrumbList`.
- Detect FAQ sections (headings ending in `?`) and emit `FAQPage`.
- Use `inLanguage` on Article/WebPage; localize breadcrumb labels.
- Validate at https://search.google.com/test/rich-results before merging.

## 7. Security (OWASP-aligned, non-negotiable)

- **Secrets:** never commit `.env*`. `NEXT_PUBLIC_*` is browser-exposed —
  only public values. `SUPABASE_SERVICE_ROLE_KEY` and `AUTH_SECRET_KEY` are
  server-only.
- **Auth:** every admin route guarded by server-side session check
  (`getSession()` from `@/lib/auth`). Middleware enforces it at the edge;
  routes re-check. Never trust a client redirect.
- **Supabase RLS:** enabled on every table. Default deny; explicit policies
  per role. Never `USING (true)` on write operations.
- **Input validation:** validate all incoming data server-side with zod.
- **Mass assignment:** explicitly pick allowed fields before insert/update.
  Never `supabase.from(t).update(req.body)`.
- **XSS:** sanitize any rich text before storage AND before render.
- **File uploads:** whitelist MIME + max size (5 MB images); rename to UUID;
  never use user-supplied filename in the storage path. Use `ImageUpload`
  component.
- **Headers** (`next.config.mjs`): CSP, HSTS, `X-Content-Type-Options: nosniff`,
  `X-Frame-Options: DENY` on `/admin`, strict referrer, restrictive
  Permissions-Policy, `poweredByHeader: false`.
- **Cookies:** `httpOnly`, `secure` in production, `sameSite: 'strict'` on
  auth cookies.
- **Errors:** generic message to client, detail only in server logs.

## 8. Performance / Core Web Vitals

- `next/image` with explicit `width`/`height` or `fill` + sized container.
- `priority` ONLY on the LCP image.
- Avoid `force-dynamic` unless required; prefer ISR (`revalidate`).
- Lazy-load admin/heavy widgets with `dynamic(() => ..., { ssr: false })`.

## 9. Accessibility (WCAG 2.1 AA)

- Real `<button>`/`<a>` only — no `<div onClick>`.
- Every `<img>` / `<Image>` has `alt` (empty `alt=""` only when decorative).
- Form inputs paired with `<label htmlFor>`.
- Color contrast ≥ 4.5:1 body, ≥ 3:1 large text.
- Focus styles visible.
- Icon-only buttons need `aria-label`.

## 10. SEO add-ons

- `sitemap.xml` includes both `/path` and `/ar/path` for every public page.
- `robots.txt` blocks `/admin` and `/api/admin`.
- Canonical URL + `hreflang` alternates per page.

---

## Reference imports

```js
import { useLanguage } from '@/lib/LanguageContext'        // client
import { getLocale } from '@/lib/locale'                   // server
import { createClient } from '@/lib/supabase/client'       // browser
import { createClient } from '@/lib/supabase/server'       // server (anon)
import { createAdminClient } from '@/lib/supabase/admin'   // server (service role)
import { getSession } from '@/lib/auth'                    // server
import { renderArticleContent } from '@/lib/renderContent'
import { sanitizeHtml } from '@/lib/sanitize'
import { organizationSchema, websiteSchema, restaurantSchema } from '@/lib/schema'
```

## Refusal is acceptable

If a request would violate §7 (Security), point out the violation and
propose a compliant alternative before proceeding.
