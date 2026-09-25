# VISUAL_IDENTITY_PROCESS

How a project with a user interface goes from "provisional look" to an approved visual identity that agents can implement. Run it once per project, and again only for a deliberate redesign.

The first pilot used this sequence: functional prototype first, then 2 visual proposals built from the client's existing brand material, the owner picked one, it was written into the UX spec, then it was implemented as its own story.

## When to run it

- **Default:** after the first functional prototype, before the go-live sprint. Visitors see the real flow, and stakeholders react to real content instead of lorem ipsum.
- **Earlier**, at discovery, when the client already has a firm brand guide and wants it from day one.
- Until it runs, the UI uses a **provisional palette defined as theme tokens** (e.g. Tailwind `@theme`), never hex literals in components. Applying the approved identity then becomes one focused story instead of a rewrite.

## Steps

1. **Collect brand inputs** (the human owner, from the client):
   - existing material: slides, social posts, business cards, current site
   - logo as SVG, or PNG with transparency (a screenshot crop is only good enough for mockups)
   - photos of the people the page presents: original files, at least 800×800 px, with consent for web use
   - 1–3 reference sites the client likes, and anything to avoid
2. **Extract the basics** from that material: sample the exact brand colors (hex), identify the typeface style, and note recurring motifs.
3. **Explore: 2 proposals, 3 at most.**
   - Build them as quick visual mockups with a design tool or skill (see Tools below). Mockups are references, not production code.
   - Each proposal uses the **approved copy and section order** from the UX spec, and differs in treatment (e.g. light/corporate vs. dark/editorial), not in content.
   - Proposals must obey the spec's business rules: no invented testimonials, prices, or outcomes; provisional items visibly marked.
   - Label each mockup as a proposal, and list which assets are provisional.
4. **Decide:** the human owner picks one, or a mix. Record who decided and the date. Stakeholder (client) review can follow, but the decision is recorded either way.
5. **Write it into the spec** (`docs/ux/UX_UI_DIRECTION.md`, "Visual Identity" section) as implementable facts:
   - color tokens (name, hex, use), including a text-safe variant of any accent that fails contrast
   - typefaces per role, weights, and the type scale
   - component descriptions per section, corner radius, motif rules
   - imagery rules and asset requirements
   - a link to the chosen mockup as a visual reference only
6. **Create the story** "Apply the approved visual identity", with acceptance criteria for: tokens replacing the provisional palette, fonts, every section in every language and at the defined widths, assets, contrast (WCAG AA), and existing tests staying green.
7. **Implement** through the normal sprint flow. The review agent checks against the spec section, not the mockup.

## Tools

The steps are tool-agnostic: which skills and design tools are available depends on the account and environment, and names change. Use whatever produces a quick, reviewable visual mockup.

### Used in the pilot: `one-page-offer-builder` (Claude skill, bundled)

Bundled with this kit in `.claude/skills/` (see `.claude/skills/README.md`), so it is available on any account: invoke `/one-page-offer-builder`. In the pilot it ran from an organization skill (`/anthropic-skills:one-page-offer-builder`); the mockups were published as private Claude artifacts and shared with the client from there.

What worked well:
- Fast, polished one-page layouts; good typographic pairing, spacing, and section rhythm.
- Easy to produce two contrasting treatments of the same content side by side.

Its defaults must be overridden in the request, because they conflict with a typical SDD spec:

| Skill default | What to do instead |
|---|---|
| Its own brand palette and fonts | Pass the client's sampled hex colors and type style explicitly |
| A "value stack" pricing block with prices | Remove it unless the spec approves showing prices |
| Sample testimonials and results | Use "pending" placeholders only; never invented proof or outcomes |
| Glow, grain, and similar effects | Keep them only if they suit the brand (the pilot's corporate direction dropped them) |
| React output | Treat it as a visual reference; the project's own stack implements it from the spec |

Practical notes from the pilot:
- Give it the approved copy and section order from the UX spec, and ask for 2 named proposals (e.g. "A · Institucional", "B · Editorial") in one request.
- Images must be actual files (attached or committed). Images only pasted inline in chat, and social-media profile links, could not be used from the agent's environment.
- A logo cropped from a screenshot is only good enough for a mockup; use a typographic stand-in and request the vector file.
- Check each proposal's text/background pairs for contrast before presenting it.

### For proof sections: `social-proof-card-studio` (Claude skill, bundled)

Once the client supplies real, approved testimonials or results, `/social-proof-card-studio` designs the testimonial and stat cards for the proof section. Pass it the approved brand tokens, and follow the proof rules in `.claude/skills/README.md`: real, consented quotes only, never invented or embellished.

## Rules

- The spec is the source of truth. If the mockup and the spec disagree, the spec wins; fix the spec first if the mockup was right.
- Accessibility is part of the identity: check every text/background pair for contrast before approving.
- Record unresolved brand questions (imagery style, audiences implied by the material) as open decisions in the UX spec. Do not resolve them silently in the design.
