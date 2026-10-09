# Spec-Driven Development Starter Kit

A reusable starter kit for projects developed with Spec-Driven Development (SDD) and agentic programming.

## Core flow

1. Raw requirement
2. Discovery
3. PROJECT_SPEC
4. USER_STORIES
5. FEATURE_SPEC(s), when needed
6. ARCHITECTURE_SPEC, when needed
7. UX_UI_DIRECTION, when the project has a user interface (visual identity via `docs/process/VISUAL_IDENTITY_PROCESS.md`, usually after the first functional prototype)
8. TECH_STACK
9. ADRs, when a decision needs to be recorded
10. IMPLEMENTATION_PLAN
11. SPRINT_PLAN
12. Implementation by agents
13. Review by review-only agent
14. Final human review and approval
15. Verification against specs and acceptance criteria

## Working model

- Methodology: Scrum.
- Sprint duration: 7 business days.
- Saturdays and Sundays do not count as business days.
- Every sprint must end with a demonstrable deliverable.
- Up to 3 implementation agents may work in parallel.
- A separate review-only agent may review pull requests.
- The human owner/reviewer is the final approver.
- Parallel work must use explicit contracts and integration boundaries to reduce breakage.
- Specs are the source of truth for product behavior.
- Tests and validation must trace back to requirements and acceptance criteria.
- The least-complex stack that satisfies the requirements should be preferred.

## Starting a new project

Step by step, from creating the repository to the first discovery session: **`docs/process/NEW_PROJECT_SETUP.md`**.

In short:

1. One time: mark this repository as a **template** and, for the automated path, add the `PROJECT_BOOTSTRAP_TOKEN` secret.
2. Create the project repository, either:
   - **automated:** Actions → **New project** → Run workflow. It creates the repository from this template, protects `main`, and opens a discovery kickoff issue; or
   - **manual:** **Use this template**, then protect `main`.
3. Open a new Claude Code session on the new repository and run **`/project-kickoff`**. The skill runs discovery, then proposes the specs, contracts, stack, plan and Sprint 001 as pull requests. No code until you give the go-ahead.
4. From there: readiness checklist, your go-ahead, implementation agents plus a review-only agent, and you merge (`AGENTS.md`).

Templates end in `_TEMPLATE.md`. A project copies each one it needs to its working path without the suffix (see the document map in `AGENTS.md`) and deletes the rest. Branches, PR titles and commits use the project key (`<KEY>-<NNN>-<slug>`).

## Lessons from the first pilot

The first pilot (`Raulc87/gaby-main-page`) showed that these are usually missing and block parallel work:

- a locked integration contract (paths, validation rules, status codes, formats, timezone) — use `docs/specs/INTEGRATION_CONTRACT_TEMPLATE.md`
- a file ownership map, a scaffold-first merge order, and an integration PR owner in the sprint plan
- supported languages and how the language is chosen
- legal jurisdiction and consent for personal data
- inclusive-language rules applied to the proposed copy itself
- where the sprint deliverable runs (local vs. hosted) and confirmation of the hosting runtime
- a visual-identity step: build the first prototype on provisional theme tokens, then explore 2 proposals from the client's brand material, record the chosen one in the UX spec, and apply it as its own story

## Bundled skills

These load automatically in Claude Code for any account working in a repository created from this template.

- `.claude/skills/project-kickoff/`: runs discovery for a new project and proposes the first documents and Sprint 001 as pull requests. See `docs/process/NEW_PROJECT_SETUP.md`.
- `.claude/skills/ux-proposals/`: creates look-and-feel proposals from the project's UX spec and the client's brand material, then drafts the spec section for the chosen direction. See `docs/process/VISUAL_IDENTITY_PROCESS.md`.

## Agent bootstrap

All implementation and review agents start from `AGENTS.md`.

For Claude Code, `CLAUDE.md` redirects Claude to the same process.

## Documentation depth

Use the minimum documentation required by complexity.

### Simple project
- PROJECT_SPEC
- Integration contract(s) when workstreams share an interface
- USER_STORIES
- UX_UI_DIRECTION if applicable
- TECH_STACK
- IMPLEMENTATION_PLAN
- SPRINT_PLAN

### Standard project
Add:
- FEATURE_SPEC(s)
- ARCHITECTURE_SPEC
- ADR(s) when needed

### Complex project
Add:
- Detailed architecture
- Multiple feature specs
- ADRs
- Explicit integration contracts
- Migration/rollback strategy
- Stronger automated verification and traceability
