-- Hide products from the shop without deleting them.
-- Run in Supabase → SQL Editor.

alter table public.products
  add column if not exists listed boolean not null default true;
