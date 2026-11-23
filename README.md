# VibeVault 🔐✨

**Pick your vibe. Unlock your vault.** — India's personalized mystery-box store.

Customers choose a vibe, answer a few quick taps, and get a surprise jewellery
box matched to them. Built custom on Next.js, mobile-first, with its own admin
panel.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

Build & run production:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

---

## Tech stack

| Layer     | Choice                                                        |
| --------- | ------------------------------------------------------------- |
| Framework | **Next.js 16** (App Router) + React 19                        |
| Styling   | **Tailwind CSS v4** (CSS-based theme in `app/globals.css`)    |
| Fonts     | **Bricolage Grotesque** (display) + **DM Sans** (body)        |
| Payments  | **Razorpay** — UPI / Card / Netbanking / COD _(stubbed)_      |
| Database  | **PostgreSQL + Prisma** or **Supabase** _(not yet wired)_     |
| Admin auth| **NextAuth** / email+password _(demo gate for now)_           |
| Deploy    | **Vercel** + Cloudflare                                       |

---

## Pages

### Storefront (`app/(store)/`)

| Route             | Page                                             |
| ----------------- | ------------------------------------------------ |
| `/`               | Home — hero, vibes, how-it-works, tiers, reviews |
| `/quiz`           | Find Your Box — pick-a-vibe + 3 quick taps       |
| `/boxes`          | Box Tiers — ₹299 / ₹499 / ₹799, filter by vibe   |
| `/box/[id]`       | Box Detail — contents, value promise, reviews    |
| `/vibe/[slug]`    | Per-vibe landing (**Girls is fully girlish** 🎀) |
| `/cart`           | Cart — quantities, subtotal, free-ship threshold |
| `/checkout`       | Address + payment (UPI/Card/COD)                 |
| `/order/[id]`     | Confirmation + live tracking timeline            |
| `/unboxings`      | UGC gallery — customer photos & reviews          |
| `/about`          | About & trust — the guarantee                    |
| `/policies`       | Shipping, Returns, Privacy, Terms                |

### Admin panel (`app/admin/`, password-protected)

Demo password: **`vault123`** (replace with NextAuth — see below).

`/admin` dashboard · `/orders` · `/boxes` · `/inventory` · `/quiz` (builder) ·
`/customers` · `/reviews` · `/coupons` · `/settings`

Every screen — storefront **and** admin — is designed phone-first.

---

## Project structure

```
app/
  (store)/        storefront routes (share nav, footer, cart)
  admin/          admin routes (share AdminShell)
  api/            checkout + razorpay route handlers
  globals.css     design system + 6 vibe themes + girlish mode
components/        Logo, Navbar, Footer, cards, icons, admin/, girlish/
lib/              types, vibes, boxes, quiz, content, admin data, cart store, format
```

## The 6 vibes

Girls 🎀 · Boys 🛹 · Women 🌹 · Men ⚡ · Gamer 🎮 · Car Lover 🏎️

Each lights up its own colour via `data-vibe="…"` (see `globals.css`). The
**Girls** page gets a dedicated, extra-girlish layout (`components/girlish/`).

---

## What's real vs. stubbed

✅ **Fully working now:** every page renders, the quiz flow, cart with
localStorage persistence, checkout form validation, the admin panel with live
(client-side) interactions, SEO (sitemap/robots/metadata), responsive design.

🔌 **Stubbed — wire up for production** (all clearly marked in code):

1. **Razorpay** — `app/api/razorpay/order/route.ts` has the full integration
   recipe. Add keys to `.env.local`.
2. **Database** — mock data lives in `lib/admin-data.ts` & `lib/*.ts`. Swap for
   Prisma/Supabase queries.
3. **Admin auth** — `components/admin/AdminShell.tsx` uses a demo password.
   Replace with NextAuth.
4. **WhatsApp updates** — hook order-status changes to the WhatsApp Business API.

Copy `.env.example` → `.env.local` and fill in your keys.

---

## Build phases (from the blueprint)

- **Phase 1 — Launch MVP:** Home + quiz + 3 tiers + box detail, cart → checkout
  (Razorpay UPI/COD), basic admin (orders + boxes), policies.
- **Phase 2 — Grow & trust:** per-vibe sections, unboxing gallery, reviews,
  coupons, order tracking, inventory + quiz builder.
- **Phase 3 — Premium & scale:** gold/real-silver boxes, loyalty, Meta Ads.

Built for Jaya Kumari · India · on Next.js.
