-- Arileon: orders table + basic RLS helpers
-- Run this in Supabase SQL Editor

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  address text not null,
  city text,
  pincode text,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric not null default 0,
  total numeric not null default 0,
  status text not null default 'pending',
  payment_id text,
  payment_method text default 'razorpay'
);

alter table public.orders enable row level security;

-- Anyone can create an order at checkout (tighten later if needed)
drop policy if exists "Anyone can insert orders" on public.orders;
create policy "Anyone can insert orders"
  on public.orders for insert
  to anon, authenticated
  with check (true);

-- Authenticated admins can read/update orders
drop policy if exists "Authenticated can read orders" on public.orders;
create policy "Authenticated can read orders"
  on public.orders for select
  to authenticated
  using (true);

drop policy if exists "Authenticated can update orders" on public.orders;
create policy "Authenticated can update orders"
  on public.orders for update
  to authenticated
  using (true)
  with check (true);

-- Products: allow authenticated users to manage catalog
-- (Assumes public.products already exists)
alter table if exists public.products enable row level security;

drop policy if exists "Public read products" on public.products;
create policy "Public read products"
  on public.products for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated manage products" on public.products;
create policy "Authenticated manage products"
  on public.products for all
  to authenticated
  using (true)
  with check (true);
