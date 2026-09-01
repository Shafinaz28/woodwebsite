-- Add subcategory so shop filters and admin product form stay in sync.
-- Run in Supabase → SQL Editor.

alter table public.products
  add column if not exists subcategory text;
