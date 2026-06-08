import { z } from 'zod'

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

const arrayField = z
  .union([z.array(z.string()), z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (Array.isArray(v)) return v.map((s) => String(s).trim()).filter(Boolean)
    if (typeof v !== 'string') return []
    return v.split(',').map((s) => s.trim()).filter(Boolean)
  })

const boolish = z
  .union([z.boolean(), z.string(), z.number(), z.null(), z.undefined()])
  .transform((v) => v === true || v === 'true' || v === 1 || v === '1')

const intish = z
  .union([z.number(), z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (v === '' || v == null) return 0
    const n = Number(v)
    return Number.isFinite(n) ? Math.trunc(n) : 0
  })

const priceField = z
  .union([z.number(), z.string(), z.null(), z.undefined()])
  .transform((v) => {
    if (v === '' || v == null) return null
    const n = Number(v)
    return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : null
  })

// Accepts a full URL (https://…), a root-relative path (/menu/x.webp), or empty.
// Seeded items store root-relative paths, so url()-only validation rejects them.
const imageField = z
  .union([z.string(), z.null(), z.undefined()])
  .transform((v) => (v == null ? '' : String(v).trim()))
  .refine(
    (v) => v === '' || /^https?:\/\//i.test(v) || v.startsWith('/'),
    'Image must be a URL or a root-relative path.'
  )

/* ------------ Categories ------------ */

export const CATEGORY_FIELDS = [
  'slug',
  'name', 'name_ar', 'name_ru',
  'description', 'description_ar', 'description_ru',
  'image',
  'display_order',
  'active',
]

export const categorySchema = z.object({
  slug: z.string().min(1).max(200).regex(slugRegex, 'Slug must be lowercase letters, digits, and hyphens.'),
  name: z.string().min(1).max(200),
  name_ar: z.string().max(200).optional().nullable(),
  name_ru: z.string().max(200).optional().nullable(),
  description: z.string().max(1000).optional().nullable(),
  description_ar: z.string().max(1000).optional().nullable(),
  description_ru: z.string().max(1000).optional().nullable(),
  image: imageField,
  display_order: intish,
  active: boolish.default(true),
})

export function pickCategoryFields(input) {
  const out = {}
  for (const k of CATEGORY_FIELDS) {
    if (input[k] !== undefined) out[k] = input[k]
  }
  return out
}

/* ------------ Items ------------ */

export const ITEM_FIELDS = [
  'category_id',
  'name', 'name_ar', 'name_ru',
  'description', 'description_ar', 'description_ru',
  'image',
  'price',
  'currency',
  'allergens',
  'tags', 'tags_ar', 'tags_ru',
  'available',
  'featured',
  'display_order',
]

export const itemSchema = z.object({
  category_id: z.string().regex(UUID_RE, 'Invalid category id.'),
  name: z.string().min(1).max(200),
  name_ar: z.string().max(200).optional().nullable(),
  name_ru: z.string().max(200).optional().nullable(),
  description: z.string().max(2000).optional().nullable(),
  description_ar: z.string().max(2000).optional().nullable(),
  description_ru: z.string().max(2000).optional().nullable(),
  image: imageField,
  price: priceField,
  currency: z.string().max(8).optional().default('AED'),
  allergens: arrayField,
  tags: arrayField,
  tags_ar: arrayField,
  tags_ru: arrayField,
  available: boolish.default(true),
  featured: boolish.default(false),
  display_order: intish,
})

export function pickItemFields(input) {
  const out = {}
  for (const k of ITEM_FIELDS) {
    if (input[k] !== undefined) out[k] = input[k]
  }
  return out
}
