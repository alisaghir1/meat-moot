-- ============================================================================
-- Meat Moot — add repeatable sections to blogs
-- Each section: { title, title_ar, image, content, content_ar }
-- Order is preserved by array index.
-- ============================================================================

alter table public.blogs
  add column if not exists sections jsonb not null default '[]'::jsonb;

-- Optional: validate top-level shape with a CHECK so bad writes are rejected
-- at the DB layer even if app validation is bypassed.
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'blogs_sections_is_array'
  ) then
    alter table public.blogs
      add constraint blogs_sections_is_array
      check (jsonb_typeof(sections) = 'array');
  end if;
end $$;
