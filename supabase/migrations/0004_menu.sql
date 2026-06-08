-- ============================================================================
-- Meat Moot — menu (categories + items) + RLS policies
-- Run in Supabase Dashboard → SQL Editor.
-- ============================================================================

create extension if not exists pgcrypto;

-- ----------------------------------------------------------------------------
-- menu_categories
-- ----------------------------------------------------------------------------
create table if not exists public.menu_categories (
  id              uuid primary key default gen_random_uuid(),
  slug            text not null unique,

  name            text not null,
  name_ar         text,
  description     text,
  description_ar  text,

  image           text,
  display_order   integer not null default 0,
  active          boolean not null default true,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists menu_categories_order_idx
  on public.menu_categories (active, display_order);

drop trigger if exists menu_categories_touch_updated_at on public.menu_categories;
create trigger menu_categories_touch_updated_at
  before update on public.menu_categories
  for each row execute function public.touch_updated_at();

alter table public.menu_categories enable row level security;

drop policy if exists menu_categories_public_read on public.menu_categories;
create policy menu_categories_public_read
  on public.menu_categories
  for select
  to anon, authenticated
  using (active = true);

-- ----------------------------------------------------------------------------
-- menu_items
-- ----------------------------------------------------------------------------
create table if not exists public.menu_items (
  id              uuid primary key default gen_random_uuid(),
  category_id     uuid not null references public.menu_categories(id) on delete cascade,

  name            text not null,
  name_ar         text,
  description     text,
  description_ar  text,

  image           text,
  price           numeric(10, 2),
  currency        text not null default 'AED',

  allergens       text[] default '{}'::text[],
  tags            text[] default '{}'::text[],
  tags_ar         text[] default '{}'::text[],

  available       boolean not null default true,
  featured        boolean not null default false,
  display_order   integer not null default 0,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists menu_items_category_idx
  on public.menu_items (category_id, display_order);
create index if not exists menu_items_available_idx
  on public.menu_items (available);

drop trigger if exists menu_items_touch_updated_at on public.menu_items;
create trigger menu_items_touch_updated_at
  before update on public.menu_items
  for each row execute function public.touch_updated_at();

alter table public.menu_items enable row level security;

drop policy if exists menu_items_public_read on public.menu_items;
create policy menu_items_public_read
  on public.menu_items
  for select
  to anon, authenticated
  using (available = true);
