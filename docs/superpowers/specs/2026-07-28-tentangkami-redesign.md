# About Section Redesign — Tentang Kami

## Objective
Replace the existing two-column About section with a premium editorial layout that communicates professionalism, trust, and sustainable agriculture.

## Data Changes

### company.ts
Replace `description` with:
> Kami hadir sejak tahun 2020 dan didirikan bersama petani lokal di Desa Kramat, Kembaran, Kab. Banyumas. Di sini, kami memproduksi produk olahan pepaya organik. Beberapa produk tersebut antara lain Opak Pepaya, Permen Pepaya, Churros Pepaya, dan Sabun Pepaya. Proses budidaya dilakukan oleh petani lokal dengan konsep pertanian organik dengan mengandalkan input produksi berkelanjutan, serta dalam pengolahan produknya. Proses budidaya dilakukan oleh petani lokal dengan konsep pertanian organik dengan mengandalkan input produksi berkelanjutan, serta pengolahan produknya dilakukan secara tradisional. Kapasitas produksi 1,5 ton produk olahan per produk. Distribusi langsung ke pelanggan, koperasi, reseller di wilayah Jawa Tengah, serta distributor pusat oleh-oleh khas Banyumas.

Replace `history` with bottom story card text (journey-focused, ~1-2 sentences).

## Layout Structure (top → bottom)

### 1. Header
- Label: `Tentang Kami` (14px uppercase, letter-spacing, brand-red)
- Editorial heading: `"Bersama Petani, Membangun Masa Depan Indonesia."` (Satoshi bold, 48-64px, max 2 lines)
- Supporting paragraph: company.description (16-18px, max 3 lines, 60-70ch)

### 2. Editorial Composition Row (asymmetric)
- **Left (~55-60% width):** Image with 36px rounded corners, soft shadow, organic mask/edge fade
- **Floating quote card** (overlapping image bottom-right):
  - Glass effect: `backdrop-blur-xl`, thin white/20 border, 28px radius, subtle shadow
  - Content: quotation mark + philosophy text + "KPJMI" signature
- **Right (~40% width):** 3 feature items stacked vertically
  - Each: outlined monochrome Lucide icon, title, short description
  - Items: Collaboration (Handshake), Innovation (Lightbulb), Sustainability (Leaf)

### 3. Stats Row (4 cards)
- 2020 — Tahun Berdiri
- 2.500+ — Anggota
- 120+ — Mitra Bisnis
- 15+ — Wilayah
- Lightweight cards: thin border, subtle shadow, 24px radius, counter animation on scroll

### 4. Bottom Story Card (full width)
- "Perjalanan Kami" title
- Journey narrative text
- Soft brand-lemon/20 background, 24px radius, subtle shadow

### Design System
- **Background:** White with very subtle warm gray radial gradient
- **Colors:** brand-red (#B81104), text-primary (#111827), text-secondary (#6B7280), border (#E5E7EB)
- **Typography:** Satoshi (display), Outfit (body), per existing project setup
- **Animations:** fade-up reveal, stagger children, image subtle scale, hover lift on cards
- **Responsive:** desktop (asymmetric), tablet (stacked with overlap preserved), mobile (single column, stats 2x2)
