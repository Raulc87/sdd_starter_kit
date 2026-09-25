---
name: social-proof-card-studio
description: "Create stunning social proof cards, testimonial graphics, client win visuals, stat cards, and before/after transformation graphics. Scrapes LinkedIn recommendations via Apify or accepts manual input. Triggers on: 'testimonial card', 'social proof', 'client win graphic', 'quote card', 'stat card', 'review graphic', 'before after card', 'make my testimonials look good', 'scrape my testimonials', 'LinkedIn recommendations', 'create proof cards', or any request involving testimonials, reviews, or client results turned into visuals. Always use for ANY social proof visualization."
---

# Social Proof Card Studio

## Overview

Turns raw testimonials, client wins, stats, and recommendations into beautifully designed visual cards — ready for LinkedIn, Instagram, presentations, or websites. Pulls testimonials automatically via Apify LinkedIn scraping, accepts manual paste, or works from any text input. Every card looks agency-designed with grain textures, editorial typography, and animated transitions.

## Data Input Methods

### Method 1: Apify LinkedIn Scraping (Automated)
Ask for profile URL, then guide:
- **Option A — Apify MCP:** Fire the scraper directly via Apify connector
- **Option B — Apify Dashboard:** Search "LinkedIn Profile Scraper" Actor, run, export JSON, paste here
- **Option C — Manual:** Copy recommendations from LinkedIn profile, paste here

Parse each recommendation for: quote, author_name, author_title, relationship. Trim to best 1-2 sentences if long.

### Method 2: Manual Paste
Parse for quote, author name, title/company, specific metrics.

### Method 3: Stats and Wins
Revenue numbers, growth percentages, before/after transformations, client counts.

## Card Types

### 1. QUOTE CARD
Large decorative quote mark (Cormorant Garamond 120px+, accent at 12% opacity) → Quote in Cormorant italic → Result badge (accent outline pill) → Author with gradient avatar → Brand footer

### 2. STAT HIGHLIGHT CARD
"Key Result" label → Huge gradient number (Outfit 900, 60-80px, white→accent gradient text) → Metric label → Context line → Brand footer

### 3. BEFORE/AFTER CARD
Split layout. Left: dark/muted/defeated (rgba(0,0,0,0.35) overlay, grey ✕ markers, dim text). Right: bright/accent glow bleeding in (accent radial gradient overlay, green ✓ markers, white text). Strong visual contrast is critical.

### 4. WIN STORY CARD
"Client Win" accent badge → Client name + industry → Challenge (1 line) → Solution (1 line) → Result (bold, accent, prominent) → Quote snippet → Brand footer

### 5. MULTI-TESTIMONIAL GRID
2x2 or 3x2 grid of mini quote cards → Each: short quote, author, tiny avatar → "And N more..." tag

## Design System — MANDATORY

### Grain Texture — ALWAYS INCLUDE
```css
.studio::before {
  content: ''; position: fixed; inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 128px; pointer-events: none; z-index: 100;
}
```

### Brand Defaults
```
Background: #06060a | Card: #0e0e14 | Border: rgba(255,255,255,0.05)
Accent: #e90d41 | Silver: #b8bec1
Text: #fff | Sub: #c0c0d0 | Muted: #7a7a8e | Dim: #44445a
Green: #00C853 | Gold: #FFD700
```

### Typography — NEVER Inter, Roboto, Arial
```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap');
```
- Quote text: Cormorant Garamond italic 400, 20-26px (elegance)
- Stats/Numbers: Outfit 900, 48-80px, gradient text
- Author name: Outfit 700, 14px
- Author title: Outfit 400, 11-12px, dim color
- Labels: Outfit 700, 9-10px, uppercase, 0.16em spacing
- Body: Outfit 400, 13-15px

### Card Dimensions
- LinkedIn Post: 1:1 (460x460) — DEFAULT
- Carousel Slide: 4:5 (368x460)
- Presentation: 16:9 (560x315)

### Visual Patterns — ALL REQUIRED

**Card styling:** Dark surface, 20px radius, 1px border, subtle bottom-right accent glow (radial gradient, 8% opacity)

**Quote marks:** Cormorant Garamond 120px+, accent at 12% opacity, top-left. Push larger and more visible.

**Avatar circles:** 42px, gradient accent→silver, white initials, box-shadow with accent glow

**Result badges:** Accent outline pill: `background: rgba(accent,0.08); border: 1px solid rgba(accent,0.15); color: accent`

**Before/After contrast:** Left must feel genuinely defeated (dark overlay, crossed-out items in grey-red #553340). Right must feel energized (accent radial glow, green checkmarks, white text).

**Top accent line:** 3px, gradient accent→transparent, on every card

**Brand mark:** "PURELY" Outfit 700 9px + "Personal" Cormorant italic accent 10px, bottom-right

### Crossfade Transitions — REQUIRED
When switching between cards, use opacity + scale transition:
```css
.card-wrap { transition: opacity 0.2s ease, transform 0.2s ease; }
.fading { opacity: 0; transform: scale(0.97); }
.visible { opacity: 1; transform: scale(1); }
```

## Build Process

### Step 1: Gather Testimonials
Determine input method: Apify scraping → manual paste → stats/wins → data from other skills

### Step 2: Select Card Types
- Single quote → Quote Card
- Number/metric → Stat Highlight
- Transformation → Before/After
- Case study → Win Story
- 3+ testimonials → Multi-Grid + individual cards for top 3

### Step 3: Build React Artifact
Single `.jsx` gallery with:
- Format selector (1:1, 4:5, 16:9) with sub-labels (LinkedIn, Carousel, Presentation)
- Card preview area with crossfade transitions
- Themed thumbnail selector (red=quote, blue=stat, green=before-after)
- "Ready to export: N cards" bar with export button
- Card counter: "1 / 6 — Quote Card"
- Grain texture, all Google Fonts

### Step 4: Deliver
Present gallery → adjust individual cards → offer PDF (one card per page) → offer carousel conversion

## Content Processing Rules

**Quote trimming:** Max 3 sentences. Extract strongest result/emotion sentence. Use "..." for trimming.

**Auto-bold:** Numbers/percentages, time references with outcomes, superlatives, transformation words.

**Author cleanup:** "Name — Title at Company" format. Emphasize well-known companies.

## Integration Points
- **From apify-linkedin:** Extract recommendations + engagement stats
- **From ai-cro:** Client wins → Win Story Cards, conversion rates → Stat Cards
- **To one-page-offer-builder:** Best quote → social proof strip, best stat → credibility badge
- **To carousel-builder:** Each card → one carousel slide + cover + CTA

## Quality Checklist
- [ ] Grain texture present
- [ ] Every quote trimmed to 1-3 sentences
- [ ] Key results emphasized (bold or accent)
- [ ] Crossfade transition between cards
- [ ] Before/After has strong visual contrast
- [ ] Format selector with 3 options
- [ ] Export bar at bottom
- [ ] Outfit + Cormorant fonts (never Inter)
- [ ] Decorative quote marks at 12%+ opacity
- [ ] Avatar gradient + glow shadow
