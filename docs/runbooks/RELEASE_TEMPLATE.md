# RELEASE — preview, release and production smoke test (owner runbook)

- Last updated: <YYYY-MM-DD> · Applies to: <first release this runbook covers, e.g. v0.1.0>
- For: <owner>

How a change goes from a merged PR to production, how to check it, and how to undo it. Written in the style of `docs/process/RUNBOOK_STYLE.md`. Hosting-specific setup (accounts, secrets, upload, rollback commands) lives in `docs/runbooks/DEPLOYMENT.md` (from `DEPLOYMENT_TEMPLATE.md`). Record the branching and release model in an ADR (start from `docs/decisions/ADR_BRANCHING_AND_RELEASE_TEMPLATE.md`); this runbook implements it.

Names in this template use `PUBLIC_` as the prefix for build-time values that are safe to expose to the browser. Use your framework's prefix instead (e.g. `PUBLIC_` for Astro, `VITE_` for Vite, `NEXT_PUBLIC_` for Next.js).

## 0. The model (default; change it only through the ADR)

| Where | URL | Updated by |
|---|---|---|
| Preview / staging (review only, never linked publicly, `noindex`) | <preview URL> | CI, on every merge to `main` |
| Production | <production URL> | A published release (tag `vMAJOR.MINOR.PATCH`), never a merge |

- **`main` is the only long-lived branch and is always releasable.** PRs are small and complete; unfinished work stays behind a build flag until it is ready.
- **Production changes only on a release.** A release is a semantic-version tag on a commit of `main` that was checked on the preview; the release workflow builds and deploys that tag.
- **Previews never touch production data.** The preview build points at its own staging endpoint, sheet or database. Automated tests and test submissions never land in the production store (the marked submissions of each production smoke test, deleted or marked right after, are the only exception; section 4, including the re-run after a rollback in section 6).
- **Every release gets a smoke test**, recorded in the release description.

## 1. One-time setup

### 1.1 Preview site
<How the preview is enabled, e.g. GitHub Pages → Source: GitHub Actions.>

Expected: the first merge to `main` after this produces a green preview run and the preview URL loads.

### 1.2 Build-time values per environment (public values, not secrets)

Preview and production need **different values** for some settings (above all the data endpoint). A repository-level Actions variable holds **one** value, so keep the two apart in one of these ways and write down which one the project uses:

- **Option A — distinct names (works on every plan):** Settings → Secrets and variables → Actions → **Variables**, one variable per environment, e.g. `PUBLIC_ENDPOINT_URL_PREVIEW` and `PUBLIC_ENDPOINT_URL`. The preview workflow maps the `_PREVIEW` variable onto the build's setting; the release workflow uses the production one.
- **Option B — environment-scoped variables:** Settings → Environments → create `preview` and `production`, each with a variable of the **same** name (`PUBLIC_ENDPOINT_URL`) and its own value. The preview job declares `environment: preview`, the release job `environment: production`. Environments are not available for private repositories on GitHub Free.

| Setting | Preview value | Production value | Notes |
|---|---|---|---|
| Data endpoint (`PUBLIC_ENDPOINT_URL`) | staging endpoint | production endpoint | Separate stores: preview tests never write to production data |
| Contact / scheduler / other public settings | | | Same value in both, usually |
| `PUBLIC_SHOW_<FEATURE>` | `true` | `false` until ready | Build flag for work that is merged but not ready to show |

Secrets (passwords, keys, tokens) go under **Secrets** (or environment secrets), never in variables.

Set by the workflows themselves, not as variables:

| Flag | Preview | Production |
|---|---|---|
| `PUBLIC_NOINDEX` | `true` | `false` |
| `PUBLIC_SHOW_PENDING_BADGES` (provisional-content markers) | `true` | `false` |
| `PUBLIC_SITE_URL` / base path | preview URL | production URL |

Expected: a preview build and a production build of the same commit use different endpoint values (check the network request of a test submission on the preview, section 2).

### 1.3 Protection
- `main`: pull request required, required checks (the CI jobs), branches up to date before merging, no force pushes or deletions, administrators included.
- `release/*` (if the project uses release branches): added as a target of the same `main` ruleset, so it gets the same rules and checks.
- CI runs on **pull requests targeting `main` and `release/**`**, and on pushes to both.

Expected: Settings → Rules → Rulesets shows the `main` ruleset (created by the "New project" workflow, or by hand) with Enforcement status **Active**, targeting the default branch and, if used, `release/*`.

### 1.4 Before the first release: holding page
Until the first release, the production domain shows a simple holding page (name, one line, contact) instead of an empty server or a hosting placeholder. The first release replaces it; the deployment runbook lists exactly which files it removes.

Expected: the production URL shows the holding page over HTTPS.

## 2. Check the preview (after each merge, and before a release)
1. The latest preview run on `main` is green. Note its **commit SHA**: that is the commit you are checking. Expected: green run, SHA written down.
2. The preview loads in every language, with styles, fonts and images. Expected: no broken layout or missing images.
3. Preview-only safeguards are on: the page source contains `<meta name="robots" content="noindex">` (or the response has `X-Robots-Tag: noindex`), and the provisional-content badges are visible where content is still provisional. Expected: both present.
4. A test submission lands in the **staging** store, not production. Mark or delete the test row. Expected: the row appears in staging only.

## 3. Cut a release
Preconditions: CI green on the commit from section 2; that commit checked on the preview (section 2); backend or third-party changes deployed to staging and tested first; production secrets set.

1. **Releases → Draft a new release** → **Choose a tag** → type the new tag (e.g. `v0.1.0`) → create it on publish. Expected: "Create new tag on publish".
2. **Target:** open the target menu → **Recent commits** → select the **exact commit SHA you checked in section 2**. Do not pick the `main` branch: it resolves to whatever is newest at publish time, which may not be the commit you checked. Expected: the target shows that SHA.
3. Title = the tag; **Generate release notes**. Expected: the notes list the PRs since the last release.
4. **Publish release.** Expected: the release workflow starts for that tag (Actions).
5. When the workflow is green, run the smoke test (section 4) before announcing anything.

Versioning (semantic versioning): after `v1.2.3`, a fix release is `v1.2.4` and a feature release is `v1.3.0`; `v2.0.0` only for breaking changes.

## 4. Production smoke test
Right after each release; write the date, version and results in the release description.
- HTTP redirects to HTTPS on every hostname; every language loads. Expected: padlock, no mixed-content warnings.
- The main flow works end to end with a real submission, which lands in the **production** store; then mark or delete it. Expected: one new production row.
- Provisional-content badges are not shown; the page is indexable (no `noindex`). Expected: neither present.
- **Cookies and third parties:** in a fresh browser profile (private window), load the page and compare the cookies set and the third-party domains contacted with the baseline disclosed in the privacy notice. Hosts can inject their own scripts and cookies; anything new is a privacy-notice change before launch. Expected: matches the baseline.
- **Transactional email (if any):** a real submission delivers to an external Gmail and an Outlook inbox; check the provider's delivery log, not only "sent", and whether it landed in spam. Expected: delivered to both inboxes.
- **Performance:** the CI Lighthouse run on our own build is the gate; production scores (which include host-injected scripts) are recorded in the release, not used as a gate.
- <Project-specific checks: scheduler, spam protection, logs.>

If any check fails: roll back to the previous tag (section 6), then fix forward.

## 5. Urgent fix while `main` has unreleased work
1. Create `release/vX.Y.x` from the last release tag, if it does not exist (e.g. `release/v1.2.x` from `v1.2.3`). Expected: the branch exists and its protection rule applies (1.3).
2. Fix on a `<KEY>-FIX-<slug>` branch from it; open the PR **against `release/vX.Y.x`**; CI runs on that PR (1.3) and the review-only agent reviews it; the owner merges. Expected: required checks green on the PR head.
3. Publish the patch release (e.g. `v1.2.4`) with **target `release/vX.Y.x`**; smoke test.
4. Bring the fix to `main` in a normal PR so the next release keeps it.

Gate for a release-branch patch (it replaces section 3's "CI green" and "preview checked", which a release branch cannot meet): the fix PR's required checks are green on its head, the PR is up to date with the release branch so the merged commit is the one CI tested, and the production smoke test right after the deploy passes, with rollback to the previous tag if it fails.

When `main` has nothing unreleased, fix on `main` and release from there.

## 6. Rollback
1. Redeploy the previous release tag, as described in `DEPLOYMENT.md` (Rollback). Expected: the deploy workflow is green for that tag.
2. Run the smoke test (section 4) on the rolled-back version.
3. Fix forward on `main` and release again.

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Preview test lands in the production store | Preview and production share one variable value | Separate them (1.2 Option A or B) and rebuild the preview |
| Release deployed a commit you did not check | Target was the `main` branch, not the checked SHA | Roll back (section 6); next time pick the SHA (section 3, step 2) |
| Fix PR into `release/*` shows no checks | CI only runs on PRs to `main` | Add `release/**` to CI's `pull_request` and `push` branches (1.3) |
| Production shows provisional badges or `noindex` | Release workflow did not set the production flags | Fix the workflow's flags (1.2) and release a patch |
| Release workflow did not start | Release saved as draft, or the workflow listens to a different event | Publish the release; check the workflow's trigger |
