---
name: one-page-offer-builder
description: "Build stunning one-page offer sheets, sales one-pagers, event promo pages, and lead magnet covers as beautiful React artifacts and downloadable PDFs. Use this skill whenever the user asks to create an offer one-pager, sales sheet, promo page, event flyer, lead magnet cover, service overview page, pricing page, or any single-page marketing asset. Triggers on: 'one-pager', 'offer page', 'sales sheet', 'promo page', 'one page offer', 'marketing one-pager', 'event page', 'lead magnet cover', 'service page', 'pricing sheet', 'build me a one-pager for', 'turn this offer into a page', 'create a sales page', or any request to create a single-page visual marketing document. Also triggers when the user has output from hormozi-offer-creator or taki-offer-diamond and wants a visual asset. Always use for ANY one-page marketing asset request."
---

# One-Page Offer Builder

## Overview

Creates publication-ready, visually stunning one-page offer sheets as React artifacts (`.jsx` files). Each output renders as a high-end marketing document in Claude's artifact viewer. Designed to look like $10K agency work — grain textures, SVG icons, editorial typography, and strategic value-stack pricing.

## Design Philosophy

Every one-pager tells a story in a single scroll: Problem → Promise → Proof → Price → Push. Intentional white space, bold typography hierarchy, accent color pops, and subtle texture guide the eye. No clutter. No walls of text. Every element earns its place.

## Supported Types

### 1. HIGH-TICKET OFFER PAGE
For coaching programs, consulting packages, courses, premium services.
Sections: Hero → Deliverables with value prices → Featured testimonial + small proof grid → Value stack pricing → CTA

### 2. EVENT PROMO PAGE
For workshops, summits, bootcamps, webinars, live events.
Sections: Event banner → Key outcomes → Speaker card → Schedule → Urgency strip → Register CTA

### 3. LEAD MAGNET COVER
For free guides, checklists, frameworks, resources.
Sections: Title with FREE badge → Inside this guide bullets → Visual preview → Author strip → Download CTA

### 4. SERVICE OVERVIEW
For summarizing what a business/agency offers.
Sections: Company hero → Service pillars → 3-step process → Results stats → Contact CTA

## Design System — MANDATORY FOR EVERY BUILD

### Grain Texture Overlay — ALWAYS INCLUDE
This is the single biggest differentiator between AI-generated and agency-designed output.
```css
.page::before {
  content: '';
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  opacity: 0.035;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 128px 128px;
  pointer-events: none; z-index: 100;
}
```

### Brand Defaults (Purely Personal)
```
Background: #07070a | Card: #0f0f14 | Card Hover: #141419
Accent: #e90d41 | Silver: #b8bec1
Text: #ffffff | Sub: #c8c8d4 | Muted: #7a7a8e | Dim: #44445a
Border: rgba(255,255,255,0.05) | Green: #00C853
```
Override with client brand colors when specified.

### Typography — NEVER use Inter, Roboto, Arial, or system fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500&display=swap');
```
- Display: Outfit 900, 46-52px, letter-spacing -0.035em
- Accent keywords: Cormorant Garamond italic 600, accent color, slightly larger than headline
- Subheadlines: Outfit 600, 18-22px
- Body: Outfit 400, 14-16px
- Labels: Outfit 700, 10-11px, letter-spacing 0.16em, uppercase
- Mono: JetBrains Mono 400, 12px
- Price: Outfit 900, 60-64px, gradient text (white → accent)

### Visual Patterns — ALL REQUIRED

**Glow orbs (always 2):** Top-right accent 15% opacity 500px, bottom-left silver 4% opacity 400px

**Hero diagonal stripe:** Absolute div, right 40%, `linear-gradient(165deg, transparent 40%, accentSoft 70%, transparent 100%)`

**Badge:** Outline style with pulsing dot animation

**Deliverable cards:** Dark card, 3px left accent border (5px on hover), SVG icons in 46px accent squares (NEVER emoji), struck-through value price on right, hover translateX(4px)

**SVG Icons:** Inline 24x24 SVG paths (target, brain, zap, flame, shield) with stroke="currentColor" strokeWidth="1.5"

**Social proof — featured + grid:** Best testimonial full-width card with 120px decorative quote mark at 12% opacity. Remaining in 2-column grid below.

**Value Stack Pricing — ALWAYS INCLUDE for paid offers:**
Total Value (struck-through, dim) → Your Investment (gradient text, huge). Show individual deliverable values summing to total.

**CTA button:** Accent bg, 12px radius, 20px 64px padding, 700 weight, box-shadow with accent glow, hover translateY(-3px)

**Brand footer:** "Purely" Outfit 800 + "Personal" Cormorant italic accent | URL in JetBrains Mono

**Entrance animations:** IntersectionObserver with opacity 0 → 1 and translateY(36px → 0), cubic-bezier(0.16,1,0.3,1)

## Build Process

### Step 1: Gather Inputs
1. Offer name 2. Type (auto-detect) 3. Headline (generate if needed) 4. Deliverables with individual values 5. Price + payment plan 6. Social proof 7. CTA 8. Brand colors 9. Author name

Minimal input = smart defaults. Don't over-interview.

### Step 2: Generate Content
Headline 5-10 words, one keyword in Cormorant italic accent. Short punchy sentences. No jargon. No em dashes. No hashtags. No emoji in body.

### Step 3: Build React Artifact
Single `.jsx` with: grain texture, glow orbs, diagonal stripe, SVG icons, value stack, scroll reveals, Google Fonts, responsive under 640px.

### Step 4: Deliver
Present artifact → offer adjustments → offer PDF export.

## Integration Points
- **From hormozi-offer-creator:** Grand Slam name → headline, value stack → deliverables with prices
- **From taki-offer-diamond:** Promise → headline, guarantee → badge, scarcity → urgency
- **To carousel-builder:** Break into slides: hero → cover, deliverables → slides, price → final

## Quality Checklist
- [ ] Grain texture present
- [ ] SVG icons (NOT emoji) on deliverables
- [ ] Value stack pricing with total → investment
- [ ] Featured testimonial larger than others
- [ ] Outfit + Cormorant Garamond fonts (never Inter)
- [ ] Glow orbs + diagonal stripe
- [ ] Scroll reveal animations
- [ ] Responsive under 640px
