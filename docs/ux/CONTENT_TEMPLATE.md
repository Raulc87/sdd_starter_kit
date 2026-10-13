# CONTENT — <Project name> (<source language> source → <other languages>)

Every visitor-facing string lives here, keyed, in every language. The UX/UI direction (`docs/ux/UX_UI_DIRECTION.md`) says how the page looks and behaves; this file says what it says. Implementation copies each string verbatim into the translation files (e.g. `src/i18n/<lang>/*.ts`). Changing copy means changing this file first (`AGENTS.md` → Change management), then the code.

## Metadata
- Version: 0.1
- Status: Draft / Approved by <owner> on <date> (<PR>)
- Owner: <who approves copy>
- Source language: <e.g. Spanish>. Later changes start in the source language and are translated in the same PR.
- Rules: <tone; claims that must be avoided; no prices / no invented proof; inclusive-language rule>.
- Markers: **[PROVISIONAL]** = shown with a pending badge in preview builds only, never in production (see the release runbook's build flags).

---

## 1. Site metadata (SEO)

| Key | <Lang 1> | <Lang 2> |
|---|---|---|
| `meta.title` | | |
| `meta.description` | | |
| `meta.og_alt` | | |

## 2. Header and navigation

| Key | <Lang 1> | <Lang 2> |
|---|---|---|
| `nav.<item>` | | |
| `nav.cta` | | |
| `lang.toggle_label` | | |
| `skip_link` | | |

## 3. <Section name> (`#<anchor>`)

One section per page section, in page order. Same anchors in every language.

| Key | <Lang 1> | <Lang 2> |
|---|---|---|
| `<section>.title` | | |
| `<section>.body` | | |

## <N>. Form (`#<anchor>`)

| Key | <Lang 1> | <Lang 2> |
|---|---|---|
| `form.<field>.label` | | |
| `form.<field>.hint` | | |
| `form.submit` | | |
| `form.submitting` | | |
| `form.success.title` | | |
| `form.success.body` | | |
| `form.error.<code>` | | |

Field error messages are keyed by the contract's error codes (`docs/specs/<NAME>_CONTRACT.md`).

## <N>. Privacy notice

Full text per language, with its version identifier. Mark it DRAFT until legal review.

## <N>. Emails (if the project sends any)

Subject and body per language, with the placeholders the sender fills in.

## <N>. Pending badge

| Key | <Lang 1> | <Lang 2> |
|---|---|---|
| `pending.badge` | | |
