-- Product image uploads (Supabase Storage)
-- Run once in Supabase → SQL Editor

insert into storage.buckets (id, name, public)
values ('products', 'products', true)
on conflict (id) do update set public = true;

-- Anyone can view product images
drop policy if exists "Public read product images" on storage.objects;
create policy "Public read product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'products');

-- Logged-in admin can upload
drop policy if exists "Authenticated upload product images" on storage.objects;
create policy "Authenticated upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'products');

-- Logged-in admin can update/replace
drop policy if exists "Authenticated update product images" on storage.objects;
create policy "Authenticated update product images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'products')
  with check (bucket_id = 'products');

-- Logged-in admin can delete
drop policy if exists "Authenticated delete product images" on storage.objects;
create policy "Authenticated delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'products');
