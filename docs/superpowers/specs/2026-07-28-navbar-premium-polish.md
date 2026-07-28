# Navbar Premium Polish — KPJMI Corporate Website

## Overview
Redesign navbar to be clean, premium, and interactive with logo + full brand name, scroll-aware states, active section detection, and micro-interactions.

## Design Approach
**Classic Premium** — trustworthy, formal, modern. Suits agricultural cooperative audience.

## Layout
- Fixed top, z-50, h-16 (64px)
- max-w-7xl container
- Left: [logo .png] + "KPJMI" / "Koperasi Petani Jaya Makmur Indonesia" (2-line text stack)
- Right: nav links (desktop) / hamburger (mobile)

## Scroll States
| State | Background | Border |
|---|---|---|
| At top | transparent | none |
| Scrolled > 50px | bg-white/80 backdrop-blur-md | shadow-[0_1px_0_rgba(0,0,0,0.08)] |

## Active Section Detection
IntersectionObserver with rootMargin: -80px 0px 0px 0px, thresholds [0, 0.25, 0.5, 0.75]. Highlights nav link when its section is most visible.

## Desktop Nav Interactions
- Default: text-[#4A4A4A], font-medium
- Hover: text-brand-red
- Active section: text-brand-red + underline (h-[2px], bg-brand-red, scale-x animation from left)
- Press: active:scale-[0.96]
- Underline: slides in from left via scale-x transform, origin-left

## Mobile Nav
- Hamburger → X with rotate animation (90deg)
- AnimatePresence for enter/exit
- Items stagger in with 50ms delay, translateX(-16px) → 0
- Active item: bg-brand-red/5 + text-brand-red

## Micro-interactions (make-interfaces-feel-better)
- Scale on press: active:scale-[0.96]
- Min hit area: p-2 for toggle button
- Specific transitions (not `transition: all`)
- Font smoothing already applied
- Enter/exit animations with cubic-bezier(0.16, 1, 0.3, 1)

## Files Changed
- src/types/index.ts — add id to NavItem
- src/data/navigation.ts — add section IDs
- src/components/layout/Navbar.tsx — full rewrite
- src/components/sections/BusinessUnits.tsx — add id
- src/components/sections/Products.tsx — add id
- src/components/sections/Gallery.tsx — add id
- src/components/sections/Contact.tsx — add id
