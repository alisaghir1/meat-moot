-- Add Russian (_ru) translatable columns to all content tables.
-- Idempotent: safe to run multiple times.

-- BLOGS
alter table public.blogs
  add column if not exists title_ru               text,
  add column if not exists excerpt_ru             text,
  add column if not exists content_ru             text,
  add column if not exists tags_ru                text[] default '{}'::text[],
  add column if not exists meta_title_ru          text,
  add column if not exists meta_description_ru    text;

-- NEWS
alter table public.news
  add column if not exists title_ru               text,
  add column if not exists excerpt_ru             text,
  add column if not exists content_ru             text,
  add column if not exists tags_ru                text[] default '{}'::text[],
  add column if not exists meta_title_ru          text,
  add column if not exists meta_description_ru    text;

-- MENU CATEGORIES
alter table public.menu_categories
  add column if not exists name_ru                text,
  add column if not exists description_ru         text;

-- MENU ITEMS
alter table public.menu_items
  add column if not exists name_ru                text,
  add column if not exists description_ru         text,
  add column if not exists tags_ru                text[] default '{}'::text[];

-- SECTIONS (jsonb) — no schema change required; each section can now also hold
-- { title_ru, content_ru } alongside the existing { title, title_ar, image, content, content_ar }.
-- Admin form writes these fields; public readers fall back to the EN value when missing.

comment on column public.blogs.title_ru is 'Russian translation of title';
comment on column public.news.title_ru  is 'Russian translation of title';
