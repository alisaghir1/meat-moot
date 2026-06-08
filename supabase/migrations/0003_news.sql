-- ============================================================================
-- Meat Moot — news table + RLS policies
-- Same shape as blogs, kept separate so editorial workflows stay independent.
-- Run in Supabase Dashboard → SQL Editor.
-- ============================================================================

create extension if not exists pgcrypto;

create table if not exists public.news (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,

  title           text not null,
  title_ar        text,
  excerpt         text,
  excerpt_ar      text,
  content         text,
  content_ar      text,

  cover_image     text,
  category        text,
  tags            text[] default '{}'::text[],
  tags_ar         text[] default '{}'::text[],
  author          text,

  meta_title           text,
  meta_title_ar        text,
  meta_description     text,
  meta_description_ar  text,

  sections        jsonb not null default '[]'::jsonb,

  published       boolean not null default false,
  date            timestamptz not null default now(),

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  constraint news_sections_is_array check (jsonb_typeof(sections) = 'array')
);

create index if not exists news_published_date_idx
  on public.news (published, date desc);
create index if not exists news_slug_idx
  on public.news (slug);

drop trigger if exists news_touch_updated_at on public.news;
create trigger news_touch_updated_at
  before update on public.news
  for each row execute function public.touch_updated_at();

alter table public.news enable row level security;

drop policy if exists news_public_read on public.news;
create policy news_public_read
  on public.news
  for select
  to anon, authenticated
  using (published = true);
