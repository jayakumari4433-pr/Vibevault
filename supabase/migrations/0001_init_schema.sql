-- ============================================================
-- VibeVault — database schema (Postgres / Supabase)
-- Real tables for the storefront + admin. No throwaway sample
-- data: only the real catalog (products, vibes, colours, quiz)
-- is seeded. Orders, customers, reviews, inventory and coupons
-- start empty and fill with real activity.
-- ============================================================

-- ---------- Catalog ----------

create table if not exists public.vibes (
  slug        text primary key,
  name        text not null,
  tagline     text,
  quote       text,
  emoji       text,
  blurb       text,
  sort_order  int  not null default 0
);

create table if not exists public.colours (
  id          text primary key,
  label       text not null,
  swatch      text,
  sort_order  int  not null default 0
);

create table if not exists public.products (
  id          text primary key,
  type        text not null check (type in ('ring','pendant','jewellery','customize')),
  name        text not null,
  price       int  not null check (price >= 0),   -- INR, whole rupees
  kicker      text,
  tagline     text,
  description text,
  feelings    text[] not null default '{}',
  sort_order  int  not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.quiz_questions (
  id          text primary key,
  question    text not null,
  helper      text,
  options     jsonb not null default '[]'::jsonb,  -- [{id,label,emoji,sub,box}]
  sort_order  int  not null default 0
);

-- ---------- People ----------

create table if not exists public.customers (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  phone       text,
  email       text unique,
  city        text,
  created_at  timestamptz not null default now()
);

-- ---------- Orders ----------

create table if not exists public.orders (
  id           text primary key,                 -- e.g. VV-10231
  customer_id  uuid references public.customers(id) on delete set null,
  customer_name text,
  phone        text,
  email        text,
  address      text,
  city         text,
  pincode      text,
  amount       int not null check (amount >= 0),
  shipping     int not null default 0,
  status       text not null default 'new' check (status in ('new','packed','shipped','delivered')),
  payment      text not null check (payment in ('prepaid','cod')),
  vibe         text,                              -- primary vibe (summary)
  colour       text,
  note         text,
  placed_at    timestamptz not null default now()
);

create index if not exists orders_status_idx   on public.orders (status);
create index if not exists orders_placed_at_idx on public.orders (placed_at desc);

create table if not exists public.order_items (
  id          uuid primary key default gen_random_uuid(),
  order_id    text not null references public.orders(id) on delete cascade,
  product_id  text,
  type        text,
  name        text,
  price       int not null check (price >= 0),
  qty         int not null check (qty > 0),
  vibe        text,
  colour      text,
  note        text,
  category    text
);

create index if not exists order_items_order_idx on public.order_items (order_id);

-- ---------- UGC ----------

create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  city        text,
  vibe        text,
  rating      int not null check (rating between 1 and 5),
  text        text not null,
  verified    boolean not null default false,
  status      text not null default 'pending' check (status in ('pending','approved','hidden')),
  created_at  timestamptz not null default now()
);

-- ---------- Operations ----------

create table if not exists public.inventory (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  vibe        text,
  stock       int not null default 0,
  threshold   int not null default 10,
  used        int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.coupons (
  code        text primary key,
  description text,
  type        text,
  uses        int not null default 0,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);

create table if not exists public.settings (
  key   text primary key,
  value jsonb not null default '{}'::jsonb
);

-- ============================================================
-- Row Level Security
-- Public (anon) can: read catalog, read approved reviews,
-- submit a review, place an order (+ items) and upsert their
-- own customer row. Everything else is admin-only and reached
-- through the service-role key (which bypasses RLS) on the server.
-- ============================================================

alter table public.vibes          enable row level security;
alter table public.colours        enable row level security;
alter table public.products       enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.customers      enable row level security;
alter table public.orders         enable row level security;
alter table public.order_items    enable row level security;
alter table public.reviews        enable row level security;
alter table public.inventory      enable row level security;
alter table public.coupons        enable row level security;
alter table public.settings       enable row level security;

-- Catalog: public read
create policy "read vibes"    on public.vibes          for select using (true);
create policy "read colours"  on public.colours        for select using (true);
create policy "read products" on public.products       for select using (active);
create policy "read quiz"     on public.quiz_questions for select using (true);

-- Coupons: public can read active codes (to validate at checkout)
create policy "read active coupons" on public.coupons for select using (active);

-- Reviews: public reads approved, can submit (lands as pending)
create policy "read approved reviews" on public.reviews for select using (status = 'approved');
create policy "submit review"         on public.reviews for insert with check (status = 'pending');

-- Customers: anon can create their row (checkout/signup)
create policy "create customer" on public.customers for insert with check (true);

-- Orders: anon can place an order and its items
create policy "place order"      on public.orders      for insert with check (true);
create policy "add order items"  on public.order_items for insert with check (true);

-- NOTE: no public SELECT/UPDATE/DELETE on orders, order_items,
-- customers, inventory, settings — the admin reads & mutates
-- these server-side with the service-role key.
