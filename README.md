# KPJMI — Koperasi Petani Jaya Makmur Indonesia

Corporate website and self-hosted admin dashboard for **KPJMI (Koperasi Petani Jaya Makmur Indonesia)**, a cooperative empowering local farmers in Banyumas, Central Java through organic papaya cultivation and processed products.

The public site is a one-page company profile; every editable section is powered by a built-in CMS (admin dashboard) backed by Supabase — no redeploy needed to update content.

## Tech Stack

- **Framework:** React 19 + TypeScript, Vite 8
- **Styling:** Tailwind CSS v4 (CSS-first `@theme`)
- **Animation:** Motion (framer-motion)
- **Carousel:** Embla Carousel
- **Routing:** react-router-dom (admin area)
- **Backend:** Supabase — Postgres (content), Auth (admin login), Storage (images)
- **Analytics:** Vercel Analytics
- **Toasts:** sonner
- **Icons:** Lucide React

## Features

### Public website

- **Editorial one-pager** — Hero, About, Vision & Mission, Business Units, Products, Gallery, Testimonials, FAQ, Contact
- **Live content from Supabase** — admin edits appear instantly for visitors; no rebuild required
- **Layered resilience** — localStorage cache (instant paint) → Supabase fetch (fresh data) → bundled defaults fallback; the site never renders blank
- **Performance** — WebP variants for all imagery, blur-up placeholders, lazy-loaded Google Maps embed
- **Accessibility** — visible focus rings, `prefers-reduced-motion` support, semantic headings, `lang="id"`

### Admin dashboard (`/admin`)

- **Email + password login** via Supabase Auth, protected routes
- **CRUD for core content** — Products, Gallery, Testimonials, FAQ, Contact info
- **Ordering & visibility** — reorder items with arrow controls; hide items from the site without deleting them
- **Image uploads** — automatically compressed and converted to WebP in the browser before upload
- **Collapsible sidebar, breadcrumb navbar, account menu** — clean, minimal admin shell
- **Visitor monitoring** — traffic stats via Vercel Analytics (free tier)

## Getting Started

**Prerequisites:** Node.js 20+, a free [Supabase](https://supabase.com) project.

```bash
npm install
```

**1. Environment variables** — copy `.env.example` to `.env.local` and fill from your Supabase dashboard (Project Settings → API):

| Variable | Used for |
| --- | --- |
| `VITE_SUPABASE_URL` | Website + admin (safe to expose, protected by RLS) |
| `VITE_SUPABASE_ANON_KEY` | Website + admin (safe to expose, protected by RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Seed script only — never commit, never prefix with `VITE_` |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seed script — creates your admin account |

**2. Database schema** — run the full contents of [`supabase/schema.sql`](supabase/schema.sql) in the Supabase SQL Editor (creates tables, row-level security policies, and the public `media` storage bucket; safe to re-run).

**3. Seed initial content** — uploads existing imagery to Storage, inserts the initial content, and creates the admin account:

```bash
npm run seed
```

**4. Run locally:**

```bash
npm run dev
```

- Website: `http://localhost:5173`
- Admin: `http://localhost:5173/admin`

The complete setup guide with troubleshooting lives in [`docs/admin-setup.md`](docs/admin-setup.md).

## Available Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Convert images to WebP (`prebuild`) + type-check + production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint with oxlint |
| `npm run seed` | Seed Supabase: upload assets, insert initial content, create admin |

## Deployment

The project deploys on **Vercel** (auto-deploys on push to `main`/`master`). Required project settings:

1. **Environment Variables** — `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Production + Preview), then redeploy
2. SPA routing is handled by the rewrite in [`vercel.json`](vercel.json) — deep links like `/admin` and `/admin/produk` work
3. Visitor statistics appear in the project's **Analytics** tab once traffic flows

## Project Structure

```
src/
├── assets/           # Images and static assets
│   └── dokumentasi/  # Gallery documentation photos
├── admin/            # Admin dashboard (login, layout, CRUD pages, API)
├── components/
│   ├── layout/       # Navbar, Footer, Container
│   └── sections/     # Hero, About, VisionMission, Products, Gallery, etc.
├── content/          # Content layer: provider, defaults, shared types
├── data/             # Static content files (sections planned for phase 2)
├── lib/              # Supabase client
├── styles/           # Global CSS (Tailwind v4 theme, brand tokens)
├── types/            # TypeScript interfaces
└── utils/            # Helper utilities (cn)
supabase/
└── schema.sql        # DB schema + RLS policies (run in SQL Editor)
scripts/
├── convert-webp.mjs  # Build-time WebP conversion (prebuild)
└── seed-supabase.mjs # Seed: upload assets + insert content + create admin
docs/
└── admin-setup.md    # Full admin/Supabase setup guide
```

## Design

- **Colors:** Brand red (`#B81104`) and lemon (`#FFFACD`) on warm neutrals; the admin shell stays monochrome with red as the single accent
- **Typography:** Satoshi (display/headings), Outfit (body)
- **Philosophy:** Editorial, minimal, premium — inspired by Apple, Stripe, and Swiss editorial design; the admin shell follows the [coss ui](https://coss.com/ui) patterns

## License

All rights reserved. KPJMI — Koperasi Petani Jaya Makmur Indonesia.
