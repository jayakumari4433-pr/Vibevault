# Connecting VibeVault to Supabase

The app is fully wired to Supabase. It runs in a **demo fallback** (no data
persisted) until you add your keys. Follow these 3 steps to go live with real
data.

## 1. Create the tables

In your Supabase dashboard → **SQL Editor** → **New query**, run these two
files (in order). You can copy-paste their contents:

1. `supabase/migrations/0001_init_schema.sql` — creates all 11 tables + RLS
2. `supabase/migrations/0002_seed_catalog.sql` — seeds the real catalog
   (products, vibes, colours, quiz). **No fake orders/customers/reviews.**

Tables created:

| Table | Purpose |
|---|---|
| `products` | the box menu (ring / pendant / jewellery / customise) |
| `vibes`, `colours` | lookups for the quiz & pickers |
| `quiz_questions` | the quiz (editable) |
| `customers` | buyers (filled on checkout) |
| `orders`, `order_items` | real orders + line items |
| `reviews` | customer reviews to moderate |
| `inventory` | stock tracking |
| `coupons` | discount codes |
| `settings` | shipping / payment config |

## 2. Add your keys

In the dashboard → **Project Settings → API**, copy:

- **Project URL** → already set in `.env.local`
  (`https://dhzmrgfdgllhcazozxya.supabase.co`)
- **anon public** key → paste into `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **service_role** secret key → paste into `SUPABASE_SERVICE_ROLE_KEY`

(These go in `.env.local`, which is gitignored.)

## 3. Restart

```bash
npm run dev
```

That's it. Now:

- **Checkout writes real orders** → `orders` + `order_items`, and upserts the
  buyer into `customers`.
- **Admin shows real data** — dashboard, orders (with each buyer's colour +
  note), customers, reviews, inventory, coupons. All reads/writes hit Supabase
  server-side with the service-role key.
- The admin empty states ("No orders yet") fill in as real activity happens.

## Security notes

- The admin is gated server-side by a cookie (`ADMIN_PASSWORD` +
  `ADMIN_SESSION_SECRET`). Unauthenticated requests to `/admin/*` redirect to
  `/admin/login` **before** any data is fetched.
- The `service_role` key is only ever used in server code (`lib/supabase/admin.ts`
  is `server-only`). It is never shipped to the browser.
- RLS is on for every table. The public (anon) role can only read the catalog +
  approved reviews, submit a review, and place an order. Everything else is
  admin-only via the service role.
- For production, replace the demo password gate with real auth (Supabase Auth
  or NextAuth) and verify Razorpay signatures server-side.
