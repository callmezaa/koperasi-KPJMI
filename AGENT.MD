# Product Requirement Document (PRD)

# KPJMI Corporate Website Redesign
Version : 1.0
Status : Planning
Author : Ken Zamariyan
Project Type : Frontend Web Application
Category : Corporate Website / Company Profile

---

# 1. Overview

## Project Name

KPJMI Corporate Website Redesign

## Background

Koperasi Petani Jaya Makmur Indonesia (KPJMI) previously owned a company profile website developed during an internship project. While the website fulfilled its functional objectives, the overall visual design, user experience, responsiveness, and maintainability no longer reflect current web standards.

This project rebuilds the website from scratch using a modern frontend stack while preserving the company's identity and business information.

Unlike the previous implementation, this redesign prioritizes:

- Modern UI Design
- Smooth User Experience
- High Performance
- Accessibility
- Responsive Layout
- Professional Branding
- Scalable Component Architecture

This project is intentionally developed as a static website without a backend or database, allowing maximum optimization and simple deployment.

---

# 2. Goals

Primary Goals

• Create a premium-looking corporate website

• Improve user trust through modern visual design

• Showcase company credibility

• Present company information clearly

• Improve mobile experience

• Improve website loading performance

• Demonstrate frontend engineering capability

---

# 3. Non Goals

This project will NOT include:

- Authentication
- Dashboard
- CMS
- Database
- Admin Panel
- Payment
- Booking System
- API Integration
- Blog Management

All content will be stored locally.

---

# 4. Target Audience

Primary

- Business partners
- Government institutions
- Agricultural organizations
- Investors
- Potential clients

Secondary

- Farmers
- Cooperative members
- Job applicants
- Students
- General public

---

# 5. Product Vision

Deliver a modern corporate website that represents KPJMI as a trusted, professional, and future-oriented agricultural cooperative while showcasing modern frontend engineering practices.

---

# 6. Design Principles

The interface should communicate:

Professional

Minimal

Elegant

Clean

Trustworthy

Natural

Modern

Readable

---

# 7. Visual Direction

Inspired By

- Apple
- Stripe
- Linear
- Vercel
- Notion
- Arc Browser
- Framer

Characteristics

Large whitespace

Editorial layout

Large typography

Soft shadows

Rounded cards

Glass blur accents

Minimal illustrations

High-quality imagery

Smooth animations

Consistent spacing

---

# 8. Brand Personality

Reliable

Transparent

Professional

Innovative

Community Driven

Agriculture Focused

---

# 9. Tech Stack

Framework

React

Bundler

Vite

Language

TypeScript

Styling

TailwindCSS

UI Components

shadcn/ui

Animation

Motion (Framer Motion)

Icons

Lucide React

Carousel

Embla Carousel

Deployment

Vercel

Hosting

Static

Database

None

Backend

None

---

# 10. Website Architecture

Landing Page

├── Hero
├── About Company
├── Vision & Mission
├── Core Values
├── Business Units
├── Products
├── Company Journey
├── Gallery
├── Certifications
├── Partners
├── Testimonials
├── FAQ
├── Contact
└── Footer

---

# 11. Navigation

Home

About

Business

Products

Gallery

Contact

---

# 12. Page Structure

Only one landing page.

Each navigation item scrolls to a dedicated section.

---

# 13. Hero Section

Purpose

Immediately establish trust.

Content

Headline

Supporting Text

CTA Button

Secondary CTA

Background Visual

Company Image

Animated Statistics

Possible Statistics

Years Experience

Farmers

Partners

Products

Regions

---

# 14. About Section

Company introduction

History

Short description

Company philosophy

Company image

---

# 15. Vision Mission

Vision Card

Mission List

Animated layout

---

# 16. Core Values

Represent each value using icons.

Example

Integrity

Innovation

Sustainability

Collaboration

Quality

Responsibility

---

# 17. Business Units

Display as modern cards.

Each card contains

Image

Title

Description

CTA

Hover animation

---

# 18. Products Section

Grid Layout

Each Product

Image

Name

Description

Category

---

# 19. Company Journey

Interactive timeline.

Display

Year

Achievement

Milestone

Expansion

---

# 20. Gallery

Responsive Masonry

Hover Preview

Lightbox

Lazy Loading

---

# 21. Certifications

Logo Grid

Certification Cards

Government Recognition

Awards

---

# 22. Partners

Infinite logo slider

Hover animation

Monochrome logos

---

# 23. Testimonials

Modern card carousel

Avatar

Name

Position

Comment

---

# 24. FAQ

Accordion Layout

Smooth animation

---

# 25. Contact Section

Company Address

Phone

Email

Google Maps Button

WhatsApp Button

Operating Hours

---

# 26. Footer

Quick Links

Company Info

Social Media

Copyright

---

# 27. Component List

Navbar

Container

Button

Section Header

Card

Timeline

Accordion

Gallery

Modal

Badge

Tag

Logo Grid

Footer

Statistic Counter

Carousel

Partner Slider

Product Card

Testimonial Card

Contact Card

---

# 28. Motion Guidelines

Page Fade

Section Reveal

Scroll Animation

Number Counter

Hover Lift

Image Zoom

Navbar Blur

Button Ripple

Smooth Anchor Scroll

---

# 29. Responsive Breakpoints

Mobile

Tablet

Laptop

Desktop

Ultra Wide

---

# 30. Accessibility

Semantic HTML

ARIA Labels

Keyboard Navigation

Focus States

Alt Images

Color Contrast

Reduced Motion Support

---

# 31. SEO

Meta Title

Meta Description

Open Graph

Twitter Card

Canonical URL

robots.txt

sitemap.xml

Structured Data

JSON-LD

---

# 32. Performance Targets

Performance

95+

Accessibility

95+

Best Practices

100

SEO

100

Lighthouse Score Target

95+

---

# 33. Image Optimization

WebP

Lazy Loading

Responsive Images

Blur Placeholder

---

# 34. Folder Structure

src/

components/

ui/

layout/

sections/

Hero/

About/

VisionMission/

Business/

Products/

Gallery/

Timeline/

Testimonials/

Partners/

FAQ/

Contact/

Footer/

assets/

images/

logos/

icons/

data/

hooks/

utils/

styles/

types/

App.tsx

main.tsx

---

# 35. Static Data Structure

company.ts

products.ts

partners.ts

timeline.ts

gallery.ts

faq.ts

testimonials.ts

navigation.ts

---

# 36. Future Expansion

CMS Integration

Blog

Career Page

News

Farmer Portal

Product Catalog

Admin Dashboard

International Language

Dark Mode

---

# 37. Deliverables

Responsive Website

Reusable Components

Modern UI Design

Professional Animations

Production Build

SEO Ready

Performance Optimized

Fully Responsive

Documentation

Deployment on Vercel

---

# 38. Success Metrics

Website loads under 2 seconds

Lighthouse score above 95

Responsive on all devices

Smooth animations (60 FPS target)

Modern visual identity

Professional portfolio-quality implementation

Maintainable and scalable component architecture