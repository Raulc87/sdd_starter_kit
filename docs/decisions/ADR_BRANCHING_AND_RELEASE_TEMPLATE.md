# ADR-<NNN> — Branching and release model

Default model from the Starter Kit pilots. Copy it to `docs/decisions/ADR-<NNN>_BRANCHING_AND_RELEASE_MODEL.md` (next free ADR number, `AGENTS.md` → Document map) before the first release, adapt what differs, and mark it Accepted. `docs/runbooks/RELEASE.md` (from `RELEASE_TEMPLATE.md`) implements it.

- Status: Proposed
- Date:
- Decision owner:
- Related specs: `AGENTS.md` (branch naming, merging), hosting ADR, `docs/runbooks/RELEASE.md`

## Decision Request
How does work reach production, does the project need a long-lived `develop` branch, and how are urgent fixes and backend changes kept out of production until they are released?

## Context
- <Hosting and how a deploy happens, e.g. a workflow that builds and uploads on a published release.>
- <Whether every merge to `main` is previewed, e.g. a `noindex` preview site.>
- <Protection on `main`: PR required, required checks, review-only agent, owner approval.>
- Team size and release frequency: <e.g. one owner plus agents, frequent small releases>.

## Options Considered

### Option A — Trunk-based on `main`, releases from tags, short-lived release branches only for urgent fixes (default)
Pros: one integration branch; the preview shows exactly what the next release contains; nothing to keep in sync.
Cons: `main` must stay releasable (small PRs, flags for unfinished work).

### Option B — `develop` + `main` (git-flow style)
Pros: unreleased work is visibly separate.
Cons: every change merges twice; the branches drift; CI, previews, rules, agent prompts and runbooks need a second target; release tags already separate "integrated" from "in production".

## Decision
Option A:
1. `main` is the only long-lived branch. Story and docs branches (`AGENTS.md` naming) merge back through reviewed PRs with the required checks green.
2. `main` is always releasable. Work not ready to show stays behind a build flag (e.g. `PUBLIC_SHOW_<FEATURE>`, with your framework's public prefix).
3. Production = release tags (`vMAJOR.MINOR.PATCH`, semantic versioning) on the `main` commit that was checked on the preview. The release workflow deploys the tag; the smoke test is recorded in the release. Release often.
4. Urgent fix while `main` has unreleased work: create `release/vMAJOR.MINOR.x` from the last tag; fix on `<KEY>-FIX-<slug>` with a PR against it; publish the patch release with that branch as target; bring the fix to `main` in a normal PR.
   **Gate for a release-branch patch:** the fix PR's required checks are green on its head and the PR is up to date with the release branch (so the merged commit is the one CI tested); there is no preview step; the production smoke test right after the deploy is the check, with rollback to the previous tag if it fails. `release/*` has the same protection rule as `main`, including "require branches to be up to date"; CI runs on pull requests targeting `release/**` and on pushes to it, so the fix PR has checks to be green.
5. Backends and data follow the same rule: previews and tests use a staging endpoint and data store; backend changes reach production only as part of a release, with the smoke test after it.

## Consequences
### Positive
- One place for all work; production changes only deliberately.
### Negative / Trade-offs
- Discipline in PR size and flags for unfinished work.
- A staging copy of each backend to keep on the same code.

## Review Trigger
Several people or teams developing long-running features in parallel; a long-lived staging site with its own cadence; repeated urgent fixes.
