# KPJMI Corporate Website — Design Document

**Date:** 2026-07-28
**Status:** Approved
**Author:** Generated from PRD + Design Session

---

## 1. Overview

Single-page corporate website for Koperasi Petani Jaya Makmur Indonesia (KPJMI). Static site, no backend, deployed on Vercel. Built from scratch with Vite + React + TypeScript.

---

## 2. Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18+ |
| Bundler | Vite 5 |
| Language | TypeScript |
| Styling | TailwindCSS v3 |
| UI Library | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| Carousel | Embla Carousel |
| Font | Geist Sans + Geist Mono |
| Deployment | Vercel (static) |
| Backend / DB | None |

---

## 3. Color System

| Role | Hex | Usage |
|------|-----|-------|
| Primary (Red) | `#B81104` | CTA buttons, headings, active nav, underline accent, icon fills |
| Secondary | `#FFFACD` | Warm section backgrounds (Vision, Values, FAQ, etc.) |
| Background | `#FFFFFF` | Main page background |
| Text Primary | `#1A1A1A` | Body text |
| Text Secondary | `#6B6B6B` | Supporting / muted text |
| Border / Light | `#F0F0F0` | Dividers, card borders |

---

## 4. Typography

| Face | Usage |
|------|-------|
| `--font-sans: 'Geist', ui-sans-serif, system-ui, sans-serif` | Body text, UI labels |
| `--font-display: 'Geist', ui-sans-serif, system-ui, sans-serif` | Hero headlines, section titles (Bold) |
| `--font-mono: 'Geist Mono', ui-monospace, monospace` | Statistics, numerical data |

---

## 5. Component Styles

| Component | Styling |
|-----------|---------|
| Primary Button | `bg-[#B81104] text-white`, rounded-lg, hover: darker red |
| Secondary Button | `border border-[#B81104] text-[#B81104] bg-white`, rounded-lg |
| Cards | White bg, rounded-xl, subtle shadow, optional red top-border accent |
| Badge / Tag | `bg-[#B81104] text-white` or red outline |
| Section Header | Left red accent bar + bold heading |

---

## 6. Page Sections

All sections are on a single landing page. Navigation scrolls to each section.

### 6.1 Navbar
- Transparent initially, white with blur on scroll
- Logo left, nav links center/right, red active indicator
- Smooth anchor scroll

### 6.2 Hero
- Full-viewport height, white background
- Large Geist Display Bold headline, near-black text
- Milano Red CTA button + white secondary CTA with red border
- Background visual / company image placeholder
- Animated statistics below (Years, Farmers, Partners, Regions) on Lemon Chiffon bg

### 6.3 About
- White background, 2-column layout (text left, image placeholder right)
- Section title "Tentang Kami" with red accent bar
- Company history paragraph + philosophy quote block with red left border

### 6.4 Vision & Mission
- Lemon Chiffon background (warm)
- Vision card: white bg, red top-border accent, bold text
- Mission list with red bullet icons

### 6.5 Core Values
- Lemon Chiffon background
- Grid of 5-6 value cards (3-col desktop, 2-col tablet, 1-col mobile)
- Each card: Lucide icon (red), title, short description
- White card, subtle shadow

### 6.6 Business Units
- White background
- 3-4 modern cards with image placeholder, title, description, CTA "Selengkapnya"
- Hover: card lift + shadow
- Red bottom-border accent

### 6.7 Products
- White background
- Grid: image placeholder, product name, category badge (red), description
- Hover: image zoom + card shadow

### 6.8 Company Journey (Timeline)
- Lemon Chiffon background
- Vertical timeline: year (Geist Mono bold red) left, milestone right
- Red connector line + dot
- Scroll-triggered reveal animation

### 6.9 Gallery
- White background
- Masonry grid (2-3 columns)
- Hover: red transparent overlay + zoom icon
- Click opens lightbox modal

### 6.10 Certifications
- White background
- Logo grid (3-4 columns)
- Card with logo placeholder + certification name
- Hover: card lift + shadow

### 6.11 Partners
- Lemon Chiffon background
- Infinite auto-scroll horizontal logo slider
- Monochrome logos, hover to full color
- Seamless loop

### 6.12 Testimonials
- White background
- Embla Carousel with testimonial cards
- Avatar placeholder, name, position, comment
- Red navigation dots + arrows

### 6.13 FAQ
- Lemon Chiffon background
- shadcn/ui Accordion component
- Smooth open/close animation

### 6.14 Contact
- White background, 2-column layout
- Left: address, phone, email, operating hours with red icons
- Right: Google Maps button + WhatsApp CTA button (red solid)

### 6.15 Footer
- Dark background (near-charcoal)
- 4 columns: Quick Links, Company Info, Social Media (red hover), Copyright
- KPJMI logo left
- Bottom: copyright text

---

## 7. Navigation Items

1. Home (Hero)
2. About
3. Business
4. Products
5. Gallery
6. Contact

---

## 8. Motion Guidelines

- Page fade-in on load
- Section reveal on scroll (Framer Motion `whileInView`)
- Number counter animation (hero stats)
- Card hover lift (translateY -4px, shadow increase)
- Image zoom on hover (scale 1.05)
- Navbar blur on scroll
- Smooth anchor scroll (scroll-behavior: smooth)
- Reduced motion support (`prefers-reduced-motion`)

---

## 9. Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Laptop: 1024px - 1440px
- Desktop: 1440px - 1920px
- Ultra Wide: > 1920px

---

## 10. Accessibility

- Semantic HTML (header, nav, main, section, footer)
- ARIA labels on interactive elements
- Keyboard navigation for carousel, accordion, lightbox
- Visible focus states
- Alt text on all images
- Color contrast compliance
- `prefers-reduced-motion` support

---

## 11. SEO

- Meta title and description
- Open Graph tags
- Twitter Card
- Canonical URL
- robots.txt
- sitemap.xml
- JSON-LD structured data

---

## 12. Folder Structure

```
src/
  components/
    ui/          (shadcn/ui primitives)
    layout/      (Navbar, Footer, Container)
    sections/    (Hero, About, VisionMission, etc.)
  assets/
    images/
    logos/
  data/          (static TS files)
  hooks/
  utils/
  styles/
  types/
  App.tsx
  main.tsx
```

---

## 13. Data Files (Static)

- `company.ts`
- `products.ts`
- `partners.ts`
- `timeline.ts`
- `gallery.ts`
- `faq.ts`
- `testimonials.ts`
- `navigation.ts`

---

## 14. Performance Targets

- Lighthouse: Performance 95+, Accessibility 95+, Best Practices 100, SEO 100
- Load time under 2 seconds
- 60 FPS animations
- WebP images with lazy loading
- Responsive images with blur placeholders