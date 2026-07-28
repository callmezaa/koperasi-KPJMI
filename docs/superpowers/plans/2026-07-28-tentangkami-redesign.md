# About Section Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing About section with an editorial premium layout featuring the new company story, image composition, floating quote card, feature list, stats, and bottom story card.

**Architecture:** Single `About.tsx` component with no new sub-components (inline composition keeps it modular but readable). Update `company.ts` with new copy. Import `tentangkami_section.jpg` as the visual centerpiece.

**Tech Stack:** React 19, TypeScript, Tailwind v4, Motion (framer-motion), Lucide React, existing `cn` utility

## Global Constraints

- Brand colors: `brand-red: #B81104`, `brand-lemon: #FFFACD`
- Fonts: Satoshi (`font-display`) for headings, Outfit (`font-sans`/`font-mono`) for body
- Container max-w-7xl from existing `Container` component
- All animations: 300-500ms, ease-out, fade-up pattern, `viewport={{ once: true }}`
- Mobile: single column, stats 2x2 grid. Tablet: stacked with overlap preserved

---

### Task 1: Update company data

**Files:**
- Modify: `src/data/company.ts`

- [ ] **Replace `description` with the new copy**

Replace the `description` field value with:

```
"Kami hadir sejak tahun 2020 dan didirikan bersama petani lokal di Desa Kramat, Kembaran, Kab. Banyumas. Di sini, kami memproduksi produk olahan pepaya organik. Beberapa produk tersebut antara lain Opak Pepaya, Permen Pepaya, Churros Pepaya, dan Sabun Pepaya. Proses budidaya dilakukan oleh petani lokal dengan konsep pertanian organik dengan mengandalkan input produksi berkelanjutan, serta dalam pengolahan produknya. Proses budidaya dilakukan oleh petani lokal dengan konsep pertanian organik dengan mengandalkan input produksi berkelanjutan, serta pengolahan produknya dilakukan secara tradisional. Kapasitas produksi 1,5 ton produk olahan per produk. Distribusi langsung ke pelanggan, koperasi, reseller di wilayah Jawa Tengah, serta distributor pusat oleh-oleh khas Banyumas."
```

Also add a new `aboutStats` array and `featureList` array to the export for use by the About component:

```typescript
export const aboutStats = [
  { value: "2020", label: "Tahun Berdiri" },
  { value: "2.500+", label: "Anggota" },
  { value: "120+", label: "Mitra Bisnis" },
  { value: "15+", label: "Wilayah" },
] as const;

export const featureList = [
  {
    icon: "Handshake",
    title: "Kolaborasi",
    description: "Memberdayakan petani melalui kerja sama yang erat.",
  },
  {
    icon: "Lightbulb",
    title: "Inovasi",
    description: "Mengadopsi praktik pertanian modern yang ramah lingkungan.",
  },
  {
    icon: "Leaf",
    title: "Keberlanjutan",
    description: "Membangun ekosistem pertanian jangka panjang.",
  },
] as const;
```

- [ ] **Verify file saves correctly**

Run: `npx tsc --noEmit src/data/company.ts`
Expected: no type errors

---

### Task 2: Rewrite About.tsx with editorial layout

**Files:**
- Overwrite: `src/components/sections/About.tsx`

**Imports needed:**
```typescript
import { motion } from "motion/react";
import { Handshake, Lightbulb, Leaf, Quote, ArrowUpRight } from "lucide-react";
import { Container } from "../layout/Container";
import { company, aboutStats, featureList } from "../../data/company";
import aboutImg from "../../assets/tentangkami_section.jpg";
```

- [ ] **Build the section shell**

```tsx
export function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      {/* Subtle warm gray radial gradient background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_#fafafa_0%,_transparent_60%)]" />
      <Container>
        {/* header, editorial row, stats row, bottom card go here */}
      </Container>
    </section>
  );
}
```

- [ ] **Build the header block** (label + editorial heading + supporting paragraph)

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
>
  <span className="mb-4 block text-[14px] font-medium uppercase tracking-[0.15em] text-brand-red">
    Tentang Kami
  </span>
  <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-bold leading-[1.1] tracking-tight text-[#111827] max-w-[14ch]">
    Bersama Petani,
    <br />
    Membangun Masa Depan Indonesia.
  </h2>
  <p className="mt-6 max-w-[65ch] text-[16px] leading-relaxed text-[#6B7280]">
    {company.description}
  </p>
</motion.div>
```

- [ ] **Build the editorial composition row** (image left + feature list right, staggered entrance)

The image composition with floating quote card:
- Position the image at ~55-60% width on desktop
- Apply 36px rounded corners, subtle shadow, object-fit cover
- Overlay a glass quote card positioned at the bottom-right of the image area

Feature list on the right:
- Three items stacked vertically with stagger animation (0.12s delay between each)
- Each: outline icon in a minimal circle, title (font-semibold), description (text-secondary)

```tsx
<div className="mt-16 grid items-start gap-8 lg:grid-cols-[3fr_2fr]">
  {/* Left: Image composition */}
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="relative"
  >
    <div className="overflow-hidden rounded-[36px] shadow-[0_2px_20px_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.04)]">
      <motion.img
        src={aboutImg}
        alt="Petani di Desa Kramat, Banyumas"
        className="w-full object-cover"
        whileInView={{ scale: [1.02, 1] }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>

    {/* Floating quote card */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="absolute -bottom-6 -right-4 max-w-[280px] rounded-[28px] border border-white/20 bg-white/70 p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:-bottom-8 sm:-right-8"
    >
      <Quote className="mb-2 h-6 w-6 text-brand-red/60" />
      <p className="text-sm italic leading-relaxed text-[#4B5563]">
        {company.philosophy}
      </p>
      <div className="mt-3 text-xs font-semibold text-brand-red">
        KPJMI
      </div>
    </motion.div>
  </motion.div>

  {/* Right: Feature list */}
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{
      hidden: {},
      visible: { transition: { staggerChildren: 0.12 } },
    }}
    className="flex flex-col justify-center gap-8 pl-0 lg:pl-8"
  >
    {[
      { Icon: Handshake, title: "Kolaborasi", desc: "Memberdayakan petani melalui kerja sama yang erat." },
      { Icon: Lightbulb, title: "Inovasi", desc: "Mengadopsi praktik pertanian modern yang ramah lingkungan." },
      { Icon: Leaf, title: "Keberlanjutan", desc: "Membangun ekosistem pertanian jangka panjang." },
    ].map((item) => (
      <motion.div
        key={item.title}
        variants={{
          hidden: { opacity: 0, y: 15 },
          visible: { opacity: 1, y: 0 },
        }}
        className="group flex items-start gap-4"
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E5E7EB]">
          <item.Icon className="h-5 w-5 text-[#6B7280]" />
        </div>
        <div>
          <h3 className="font-semibold text-[#111827]">{item.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-[#6B7280]">{item.desc}</p>
        </div>
      </motion.div>
    ))}
  </motion.div>
</div>
```

- [ ] **Build the stats row** (4 cards, counter animation ready)

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
  className="mt-24 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
>
  {aboutStats.map((stat) => (
    <div
      key={stat.label}
      className="rounded-[24px] border border-[#E5E7EB] bg-white p-6 text-center shadow-[0_1px_4px_rgba(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
    >
      <div className="font-display text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-brand-red">
        {stat.value}
      </div>
      <div className="mt-1 text-sm text-[#6B7280]">{stat.label}</div>
    </div>
  ))}
</motion.div>
```

- [ ] **Build the bottom story card**

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
  className="mt-16 rounded-[24px] bg-brand-lemon/20 p-8 shadow-[0_1px_4px_rgba(0,0,0,0.02)] sm:p-10"
>
  <div className="flex items-start gap-5">
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red text-white">
      <ArrowUpRight className="h-5 w-5" />
    </div>
    <div>
      <h3 className="font-display text-xl font-bold text-[#111827]">
        Perjalanan Kami
      </h3>
      <p className="mt-2 max-w-[60ch] leading-relaxed text-[#4B5563]">
        Berawal dari semangat petani lokal di Desa Kramat, kami terus berkembang — dari budidaya pepaya organik hingga 1,5 ton produksi olahan per produk, menjangkau mitra di seluruh Jawa Tengah.
      </p>
    </div>
  </div>
</motion.div>
```

- [ ] **Verify the component compiles**

Run: `npx tsc --noEmit --pretty`
Expected: no type errors

---

### Task 3: Verify build

**Files:**
- Run full build

- [ ] **Run the dev build or typecheck**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Run the Vite build**

```bash
npm run build
```

Expected: success with no errors
