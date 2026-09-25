# Bundled Claude Code skills

Project skills in `.claude/skills/<name>/SKILL.md` load automatically in Claude Code for anyone who works in a repository created from this template, on any account. Invoke them as `/<name>` (e.g. `/one-page-offer-builder`) or let Claude pick them up from their descriptions.

| Skill | Use it for | SDD guidance |
|---|---|---|
| `one-page-offer-builder` | Visual mockups of a one-page site during visual identity exploration | `docs/process/VISUAL_IDENTITY_PROCESS.md` (Tools) |
| `social-proof-card-studio` | Designing testimonial, stat, and client-win cards from **real, approved** proof | Rules below |

## Provenance

- Both `SKILL.md` files are stored **verbatim** from `.skill` exports provided by the Starter Kit owner (September 2026). They are third-party skills branded "Purely Personal"; they are not part of this kit's own process.
- Do not edit them in place. Put project-specific overrides in the request, or in the process docs. To update a skill, replace its `SKILL.md` with a newer export and note the date here.
- Before making a repository created from this template public, confirm the skills' authors allow redistribution. Remove this folder if not.

## Rules when using them in an SDD project

The skills' built-in defaults (a dark "Purely Personal" palette, pricing value stacks, sample testimonials, grain and glow effects, React output) are for generic marketing assets. In an SDD project the spec wins:

1. **Brand:** pass the client's approved colors and fonts from `UX_UI_DIRECTION.md`. Never ship the skills' default brand or the "Purely Personal" brand mark.
2. **Output is a reference, not code.** The project's own stack implements what the spec records.
3. **Proof must be real.** Use only testimonials, figures, and results the client has supplied and approved, with the consent of each quoted person (name, title, and photo included). Never invent, "improve", or composite quotes or numbers. Quote trimming must keep the meaning.
4. **No guaranteed-outcome framing:** check stat and before/after cards against the spec's business rules (e.g. no promised financial results) before using them.
5. **Scraping:** `social-proof-card-studio` can pull LinkedIn recommendations through Apify. That needs the user's own Apify account or connector, and may be restricted by LinkedIn's terms and by data-protection law. Prefer recommendations the client exports or pastes themselves.
6. **Images must be real files** (attached or committed). Pasted chat images and social-media links may not be usable from the agent's environment.
