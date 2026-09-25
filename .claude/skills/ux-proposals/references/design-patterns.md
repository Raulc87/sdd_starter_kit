# Design patterns for proposals

Use this to pick directions (step 3) and to make each one look deliberate. It combines what landing-page and form research consistently reports with a catalog of treatments that suit service businesses, coaches, advisors, and small brands.

## Contents
1. What research consistently says (apply to every proposal)
2. Treatment catalog (pick 2)
3. Type pairings that work (Google Fonts)
4. Hero patterns
5. Section patterns
6. Avoid list

---

## 1. What research consistently says

These hold across sources (conversion studies, NN/g-style usability findings, Baymard form research). Apply them to every direction; they are not style choices.

**Hero**
- The hero is the highest-impact area. It needs: a headline that states the value plainly (clear beats clever), one supporting line, and one primary CTA visible without scrolling.
- Put a small trust signal in or right under the hero (e.g. "free initial call", a credential, a data-protection note), and repeat trust near the form.

**CTA**
- One consistent action, repeated: in the hero, mid-page after the value is explained, and at the end. Same wording each time.
- Action wording ("Book my call", "Take the first step") beats vague wording ("Learn more", "Submit").

**Forms**
- Ask only what the spec requires; every extra field costs completions. For a considered decision (coaching, advisory, B2B), give context before the form rather than putting the form in the hero.
- Single column. Labels **above** fields (never placeholder-only labels: they vanish when typing and hide errors). Hints under the label for format rules (e.g. phone with country code).
- Inline validation after the user leaves a field, not while typing; clear errors as soon as fixed.
- Show what happens next (e.g. "you'll pick a time in the calendar") near the submit button.

**Trust for professional services**
- Generous white space, restrained palette, and good typography read as confidence. Clutter reads as insecurity.
- A real photo of the person, looking at the camera, outperforms stock imagery. Credentials and real testimonials near decision points.
- For finance/health/legal, calm beats hype: no fear tactics, no "get rich" imagery.

**Accessibility (also a quality signal)**
- Text contrast ≥4.5:1 (≥3:1 for large text ≥24px or bold ≥18.5px); UI boundaries ≥3:1.
- Bright accents (yellow, gold, lime, light cyan) almost never pass as text on white: use them as fills, rules, and highlights behind dark text, and add a darker text-safe variant.

## 2. Treatment catalog

Each is a direction, not a template: adapt it to the client's colors and material.

### Institutional (light corporate)
- **Feel:** serious, established, consultancy-grade.
- **Palette logic:** cool off-white page; brand's darkest color as the structural color (headings, buttons, a few full-bleed bands); accent used sparingly (rules, one motif).
- **Type:** refined serif display + neutral humanist sans body.
- **Layout:** split hero (copy panel | brand-color panel with portrait), bordered grids, thin rules, 0–4px radius.
- **Fits:** advisors, lawyers, B2B, clients who want "more serious".

### Editorial (brand-color field)
- **Feel:** confident, magazine-like, closest to presentation decks.
- **Palette logic:** the brand color as the page background; white cards; accent for large shapes and italic emphasis.
- **Type:** high-contrast or classic serif with italics for emphasis + geometric sans.
- **Layout:** big type, large geometric motifs bleeding off edges, alternating full-bleed bands.
- **Fits:** clients whose existing material is already bold and colored; personal brands.

### Warm human
- **Feel:** approachable, personal, calm.
- **Palette logic:** warm light neutrals (sand, cream) with the brand color softened; photography does the work.
- **Type:** soft serif or rounded sans display + friendly sans body.
- **Layout:** large photo moments, rounded (8–16px) cards, generous spacing, quote-led sections.
- **Fits:** coaches, therapists, wellness, education.

### Modern minimal / modular
- **Feel:** crisp, current, product-like.
- **Palette logic:** near-white or near-black base, one saturated accent, grey scale doing most of the work.
- **Type:** grotesk/geometric sans for everything, maybe a mono for small labels.
- **Layout:** modular (bento-style) grids for benefits and steps, oversized headline, lots of alignment discipline.
- **Fits:** tech-adjacent services, young audiences, clients with little brand material.

### Bold brand
- **Feel:** energetic, memorable.
- **Palette logic:** two brand colors at full strength in large blocks, strong contrast.
- **Type:** heavy display face used large; simple sans body.
- **Layout:** color-blocked sections, big numbers or statements, strong CTA color.
- **Fits:** events, launches, consumer brands. Usually wrong for finance/health unless the brand already is bold.

Default pairing rule: A = the treatment closest to the client's material; B = the nearest *different* treatment that suits the audience (e.g. Editorial → Institutional; Warm human → Modern minimal).

## 3. Type pairings that work (Google Fonts)

| Character | Display | Body |
|---|---|---|
| Classic, trustworthy | Crimson Pro / Source Serif 4 | IBM Plex Sans / Source Sans 3 |
| Elegant, editorial | Cormorant Garamond / Playfair Display | Outfit / Karla |
| Warm, contemporary | Fraunces | Work Sans / DM Sans |
| Modern, neutral | Manrope / Plus Jakarta Sans | same family |
| Crisp, technical | Space Grotesk (sparingly) | IBM Plex Sans + IBM Plex Mono for labels |

If the client's material uses an identifiable face (or a close cousin), prefer it or its closest Google Font in direction A. Load at most 2 families (+1 for a logo stand-in), only the weights used.

## 4. Hero patterns

- **Split:** copy left, image/brand panel right. Best default for a personal-service page with a portrait. Stacks copy-first on mobile.
- **Centered statement:** big headline, one line, CTA, image below. Good when there's no strong photo.
- **Full-bleed photo with overlay:** strong only with an excellent, high-res photo; check text contrast over the image.
- **Statement + proof strip:** headline and CTA, then a thin row of credentials or logos. Use only with real proof.

Headline: 6–12 words, one idea. Emphasis on part of it (italic/color) is enough decoration.

## 5. Section patterns

- **Problem/recognition:** two-column (short title | 2 paragraphs) or a single calm statement band. Hopeful, not fearful.
- **Process/steps:** real sequences only get numbers. 3 columns on desktop, stacked on mobile; one line of text each.
- **Guide/about:** portrait + short bio + credential chips.
- **Proof:** one featured testimonial larger than the rest, or a 3-card row. Placeholders until real.
- **Offer:** a contrasting band (brand color) that states what the call/offer includes, 3 check points, CTA.
- **Form:** context column (what happens next) + form card. Success state replaces the form in place.
- **Closing:** one sentence restating the invitation + CTA.
- **Footer:** contact, privacy link, language switch if multilingual.

Rhythm: alternate background tones between adjacent sections (page / white / brand) so sections read as distinct without heavy dividers.

## 6. Avoid list

These make proposals look generic or AI-made, or break SDD rules:

- The skill author's or any tool's default brand; purple-to-blue gradient heroes; neon accent on near-black unless the brand is that.
- Inter/Roboto/Arial as the only face; emoji as icons; every card with the same big radius and shadow; everything centered.
- Glow orbs, grain, and parallax by default. Add effects only when the treatment calls for it.
- Stock "handshake/laptop/cash pile" imagery; 3D money illustrations for finance (reads as hype).
- Invented testimonials, logos, stats, prices, badges, or "as seen in" strips.
- Lorem ipsum, or copy rewritten "to fit the design": change the design, not the approved copy.
