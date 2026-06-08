-- ============================================================================
-- Meat Moot — blogs table + RLS policies
-- Run in Supabase Dashboard → SQL Editor.
-- ============================================================================

-- pgcrypto provides gen_random_uuid()
create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- blogs
-- ----------------------------------------------------------------------------
create table if not exists public.blogs (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,

  -- English (default) + Arabic twins for every translatable field
  title           text not null,
  title_ar        text,
  excerpt         text,
  excerpt_ar      text,
  content         text,             -- HTML from RichTextEditor (sanitized before insert)
  content_ar      text,

  cover_image     text,             -- public Supabase Storage URL
  category        text,
  tags            text[] default '{}'::text[],
  tags_ar         text[] default '{}'::text[],
  author          text,

  -- SEO
  meta_title           text,
  meta_title_ar        text,
  meta_description     text,
  meta_description_ar  text,

  published       boolean not null default false,
  date            timestamptz not null default now(),

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists blogs_published_date_idx
  on public.blogs (published, date desc);
create index if not exists blogs_slug_idx
  on public.blogs (slug);

-- Auto-touch updated_at
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists blogs_touch_updated_at on public.blogs;
create trigger blogs_touch_updated_at
  before update on public.blogs
  for each row execute function public.touch_updated_at();

-- ----------------------------------------------------------------------------
-- RLS — default deny; explicit public read on published rows only.
-- All writes go through the service-role key from the server (which bypasses
-- RLS), so no write policies are required.
-- ----------------------------------------------------------------------------
alter table public.blogs enable row level security;

drop policy if exists blogs_public_read on public.blogs;
create policy blogs_public_read
  on public.blogs
  for select
  to anon, authenticated
  using (published = true);

-- (No insert/update/delete policies = service-role-only writes.)
