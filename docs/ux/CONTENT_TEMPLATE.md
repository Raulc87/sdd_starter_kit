# CONTENT — <Project name> (<source language> source → <other languages>)

Every visitor-facing string lives here, keyed, in every language. The UX/UI direction (`docs/ux/UX_UI_DIRECTION.md`) says how the page looks and behaves; this file says what it says. When the project has this file, it is the **only** source of visitor-facing copy. Implementation copies each string verbatim into the project's translation files (wherever the stack keeps them, e.g. `src/i18n/<lang>/*`). Changing copy means changing this file first (`AGENTS.md` → Change management), then the code.

## Metadata
- Version: 0.1
- Status: Draft / Approved by <owner> on <date> (<PR>)
- Owner: <who approves copy>
- Source language: <e.g. Spanish>. Later changes start in the source language and are translated in the same PR.
- Rules: <tone; claims that must be avoided; no prices / no invented proof; inclusive-language rule>.
- Provisional copy: marked **only** in the `Status` column (`approved` or `provisional`), never inside a value. Values are copied verbatim and never contain markers. The code keeps the list of provisional keys next to the strings; preview builds show a pending badge for those keys, production builds show none (release runbook, build flags).

---

## 1. Site metadata (SEO)

| Key | <Lang 1> | <Lang 2> | Status |
|---|---|---|---|
| `meta.title` | | | |
| `meta.description` | | | |
| `meta.og_alt` | | | |

## 2. Header and navigation

| Key | <Lang 1> | <Lang 2> | Status |
|---|---|---|---|
| `nav.<item>` | | | |
| `nav.cta` | | | |
| `lang.toggle_label` | | | |
| `skip_link` | | | |

## 3. <Section name> (`#<anchor>`)

One section per page section, in page order. Same anchors in every language.

| Key | <Lang 1> | <Lang 2> | Status |
|---|---|---|---|
| `<section>.title` | | | |
| `<section>.body` | | | |

## <N>. Form (`#<anchor>`)

| Key | <Lang 1> | <Lang 2> | Status |
|---|---|---|---|
| `form.<field>.label` | | | |
| `form.<field>.hint` | | | |
| `form.submit` | | | |
| `form.submitting` | | | |
| `form.success.title` | | | |
| `form.success.body` | | | |
| `form.error.<code>` | | | |

Field error messages are keyed by the contract's error codes (`docs/specs/<NAME>_CONTRACT.md`).

## <N>. Privacy notice

Full text per language, with its version identifier. Mark it DRAFT until legal review.

## <N>. Emails (if the project sends any)

Subject and body per language, with the placeholders the sender fills in.

## <N>. Pending badge

| Key | <Lang 1> | <Lang 2> | Status |
|---|---|---|---|
| `pending.badge` | | | |
