# KPJMI — Koperasi Petani Jaya Makmur Indonesia

Corporate website for **KPJMI (Koperasi Petani Jaya Makmur Indonesia)**, a cooperative empowering local farmers in Banyumas, Central Java through organic papaya cultivation and processed products.

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 8
- **Styling:** Tailwind CSS v4
- **Animation:** Motion (framer-motion)
- **Carousel:** Embla Carousel
- **Icons:** Lucide React

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
├── components/
│   ├── layout/       # Navbar, Footer, Container
│   └── sections/     # Hero, About, VisionMission, Products, Gallery, etc.
├── data/             # Content data files
├── styles/           # Global CSS (Tailwind v4)
├── types/            # TypeScript interfaces
└── utils/            # Helper utilities (cn)
```

## Design

- **Colors:** Brand red (#B81104), warm whites, subtle grays
- **Typography:** Satoshi (display/headings), Outfit (body/mono)
- **Philosophy:** Editorial, minimal, premium — inspired by Apple, Stripe, and Swiss editorial design

## License

All rights reserved. KPJMI — Koperasi Petani Jaya Makmur Indonesia.
