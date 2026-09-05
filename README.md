# KPJMI — Koperasi Petani Jaya Makmur Indonesia

Corporate website for **KPJMI (Koperasi Petani Jaya Makmur Indonesia)**, a cooperative empowering local farmers in Banyumas, Central Java through organic papaya cultivation and processed products.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (framer-motion)
- **Carousel:** Embla Carousel
- **Icons:** Lucide React
- **Backend:** Supabase (database, auth, storage) — untuk panel admin

## Features

- **Editorial Hero** — Full-bleed background with scroll-aware overlay
- **Premium Navbar** — Fixed top, transparent-to-glass transition, active section tracking, CTA button
- **About Section** — Editorial magazine-spread layout with organic image mask, floating glass quote card, feature list, statistics, story card
- **Vision & Mission** — Centered glass vision card, zigzag timeline mission cards, commitment banner on image background
- **Production & Distribution** — Rich detail cards with per-item breakdown
- **Products** — Real product photography showcase for Papaya Candy, Chips, and Soap
- **Gallery** — Documentation photos with lightbox modal
- **Testimonials** — Embla carousel with premium cards and dot navigation
- **FAQ** — Smooth accordion with AnimatePresence
- **Contact** — Live Google Maps embed, WhatsApp integration
- **Footer** — Dark footer with brand SVG social icons
- **Admin Dashboard** (`/admin`) — Kelola konten Produk, Galeri, Testimoni, FAQ, dan Info Kontak; perubahan langsung tayang tanpa deploy. Lihat [panduan setup](docs/admin-setup.md).

## Getting Started

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── assets/           # Images and static assets
│   └── dokumentasi/  # Gallery documentation photos
├── admin/            # Admin dashboard (login, CRUD pages, layout)
├── components/
│   ├── layout/       # Navbar, Footer, Container
│   └── sections/     # Hero, About, VisionMission, Products, Gallery, etc.
├── content/          # Content layer (provider, defaults, types)
├── data/             # Static content data files (fase 2 sections)
├── lib/              # Supabase client
├── styles/           # Global CSS (Tailwind v4)
├── types/            # TypeScript interfaces
└── utils/            # Helper utilities (cn)
supabase/
└── schema.sql        # DB schema + RLS (jalankan di SQL Editor)
scripts/
└── seed-supabase.mjs # Seed awal: upload gambar + isi konten + buat akun admin
```

## Design

- **Colors:** Brand red (#B81104), warm whites, subtle grays
- **Typography:** Satoshi (display/headings), Outfit (body/mono)
- **Philosophy:** Editorial, minimal, premium — inspired by Apple, Stripe, and Swiss editorial design

## License

All rights reserved. KPJMI — Koperasi Petani Jaya Makmur Indonesia.
