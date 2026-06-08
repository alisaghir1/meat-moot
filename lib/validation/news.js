import { z } from 'zod'

export const NEWS_FIELDS = [
  'slug',
  'title', 'title_ar', 'title_ru',
  'excerpt', 'excerpt_ar', 'excerpt_ru',
  'content', 'content_ar', 'content_ru',
  'cover_image',
  'category',
  'tags', 'tags_ar', 'tags_ru',
  'author',
  'meta_title', 'meta_title_ar', 'meta_title_ru',
  'meta_description', 'meta_description_ar', 'meta_description_ru',
  'published',
  'date',
  'sections',
]

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

// Accepts a full URL (https://…), a root-relative path (/news/x.webp), or empty.
const imageField = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => (v == null ? '' : String(v).trim()))
  .refine(
    (v) => v === '' || /^https?:\/\//i.test(v) || v.startsWith('/'),
    'Image must be a URL or a root-relative path.'
  )

const tagsField = z
  .union([z.array(z.string()), z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (Array.isArray(v)) return v.map((s) => String(s).trim()).filter(Boolean)
    if (typeof v !== 'string') return []
    return v.split(',').map((s) => s.trim()).filter(Boolean)
  })

const sectionSchema = z.object({
  title: z.string().max(300).optional().nullable(),
  title_ar: z.string().max(300).optional().nullable(),
  title_ru: z.string().max(300).optional().nullable(),
  image: imageField,
  content: z.string().max(100_000).optional().nullable(),
  content_ar: z.string().max(100_000).optional().nullable(),
  content_ru: z.string().max(100_000).optional().nullable(),
})

const sectionsField = z
  .union([z.array(sectionSchema), z.null(), z.undefined()])
  .transform((v) => (Array.isArray(v) ? v : []))
  .transform((arr) =>
    arr.filter(
      (s) =>
        (s.title && s.title.trim()) ||
        (s.title_ar && s.title_ar.trim()) ||
        (s.title_ru && s.title_ru.trim()) ||
        (s.image && s.image.trim()) ||
        (s.content && s.content.trim()) ||
        (s.content_ar && s.content_ar.trim()) ||
        (s.content_ru && s.content_ru.trim())
    )
  )
  .refine((arr) => arr.length <= 50, { message: 'Too many sections (max 50).' })

export const newsSchema = z.object({
  slug: z.string().min(1).max(200).regex(slugRegex, 'Slug must be lowercase letters, digits, and hyphens.'),
  title: z.string().min(1).max(300),
  title_ar: z.string().max(300).optional().nullable(),
  title_ru: z.string().max(300).optional().nullable(),
  excerpt: z.string().max(1000).optional().nullable(),
  excerpt_ar: z.string().max(1000).optional().nullable(),
  excerpt_ru: z.string().max(1000).optional().nullable(),
  content: z.string().max(200_000).optional().nullable(),
  content_ar: z.string().max(200_000).optional().nullable(),
  content_ru: z.string().max(200_000).optional().nullable(),
  cover_image: imageField,
  category: z.string().max(100).optional().nullable(),
  tags: tagsField,
  tags_ar: tagsField,
  tags_ru: tagsField,
  author: z.string().max(150).optional().nullable(),
  meta_title: z.string().max(300).optional().nullable(),
  meta_title_ar: z.string().max(300).optional().nullable(),
  meta_title_ru: z.string().max(300).optional().nullable(),
  meta_description: z.string().max(500).optional().nullable(),
  meta_description_ar: z.string().max(500).optional().nullable(),
  meta_description_ru: z.string().max(500).optional().nullable(),
  published: z.boolean().optional().default(false),
  date: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (v ? new Date(v).toISOString() : new Date().toISOString())),
  sections: sectionsField,
})

export function pickAllowed(input) {
  const out = {}
  for (const k of NEWS_FIELDS) {
    if (input[k] !== undefined) out[k] = input[k]
  }
  return out
}
