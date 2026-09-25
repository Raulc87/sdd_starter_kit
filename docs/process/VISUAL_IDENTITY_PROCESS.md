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
   - Build them as quick visual mockups with a design tool or skill (e.g. a one-page-offer or artifact/design skill). Mockups are references, not production code.
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

## Rules

- The spec is the source of truth. If the mockup and the spec disagree, the spec wins; fix the spec first if the mockup was right.
- Accessibility is part of the identity: check every text/background pair for contrast before approving.
- Record unresolved brand questions (imagery style, audiences implied by the material) as open decisions in the UX spec. Do not resolve them silently in the design.
