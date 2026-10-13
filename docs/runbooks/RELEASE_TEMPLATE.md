# RELEASE — preview, release and production smoke test (owner runbook)

For: <owner>. How a change goes from a merged PR to production, how to check it, and how to undo it. Written in the style of `docs/process/RUNBOOK_STYLE.md`. Hosting-specific setup (accounts, secrets, upload, rollback commands) lives in `docs/runbooks/DEPLOYMENT.md`. Record the branching and release model in an ADR (start from `docs/decisions/ADR_BRANCHING_AND_RELEASE_TEMPLATE.md`); this runbook implements it.

## 0. The model (default; change it only through the ADR)

| Where | URL | Updated by |
|---|---|---|
| Preview / staging (review only, never linked publicly, `noindex`) | <preview URL> | CI, on every merge to `main` |
| Production | <production URL> | A published release (tag `vMAJOR.MINOR.PATCH`), never a merge |

- **`main` is the only long-lived branch and is always releasable.** PRs are small and complete; unfinished work stays behind a build flag until it is ready.
- **Production changes only on a release.** A release is a semantic-version tag published from `main`; the release workflow builds and deploys that tag.
- **Previews never touch production data.** The preview build points at its own staging endpoint, sheet or database. Tests and test leads never land in the production store.
- **Every release gets a smoke test**, recorded in the release description.

## 1. One-time setup

### 1.1 Preview site
<How the preview is enabled, e.g. GitHub Pages → Source: GitHub Actions.>

### 1.2 Build-time variables (public values, not secrets)
Settings → Secrets and variables → Actions → **Variables**. Secrets (passwords, keys, tokens) go under **Secrets**, never here.

| Variable | Preview value | Production value | Notes |
|---|---|---|---|
| `PUBLIC_<ENDPOINT>_URL` | staging endpoint | production endpoint | Separate stores: preview tests never write to production data |
| `PUBLIC_<CONTACT/SCHEDULER/...>` | | | |
| `PUBLIC_SHOW_<FEATURE>` | `true` | `false` until ready | Build flag for work that is merged but not ready to show |

Set by the workflows, not as variables:

| Flag | Preview | Production |
|---|---|---|
| `PUBLIC_NOINDEX` | `true` | `false` |
| `PUBLIC_SHOW_PENDING_BADGES` (provisional-content markers) | `true` | `false` |
| `PUBLIC_SITE_URL` / base path | preview URL | production URL |

### 1.3 Protection
- `main`: pull request required, required checks (the CI jobs), no force pushes or deletions, administrators included.
- `release/*`: the same rule as `main`.

### 1.4 Before the first release: holding page
Until the first release, the production domain shows a simple holding page (name, one line, contact) instead of an empty server or a hosting placeholder. The first release replaces it; the deployment runbook lists exactly which files it removes.

## 2. Check the preview (after each merge, and before a release)
1. The latest preview run on `main` is green.
2. The preview loads in every language, with styles, fonts and images.
3. A test submission lands in the **staging** store, not production. Mark or delete the test row.

## 3. Cut a release
Preconditions: CI green on the `main` commit; the preview of that commit checked (section 2); backend or third-party changes deployed to staging and tested first; production secrets set.

1. **Releases → Draft a new release** → tag `vX.Y.Z` (new tag on publish), target `main`.
2. Title `vX.Y.Z`; **Generate release notes**.
3. **Publish release.** The release workflow deploys the tag.
4. When it is green, run the smoke test (section 4) before announcing anything.

Versioning: `vX.Y.Z+1` for fixes, `vX.Y+1.0` for new features.

## 4. Production smoke test
Right after each release; write the date, version and results in the release description.
- HTTP redirects to HTTPS on every hostname; every language loads.
- The main flow works end to end with a real submission, which lands in the **production** store; then mark or delete it.
- Provisional-content badges are not shown; the page is indexable.
- **Cookies and third parties:** in a fresh browser profile (private window), load the page and compare the cookies set and the third-party domains contacted with the baseline disclosed in the privacy notice. Hosts can inject their own scripts and cookies; anything new is a privacy-notice change before launch.
- **Transactional email (if any):** a real submission delivers to an external Gmail and an Outlook inbox; check the provider's delivery log, not only "sent", and whether it landed in spam.
- **Performance:** the CI Lighthouse run on our own build is the gate; production scores (which include host-injected scripts) are recorded in the release, not used as a gate.
- <Project-specific checks: scheduler, spam protection, logs.>

If any check fails: roll back to the previous tag (`DEPLOYMENT.md`), then fix forward.

## 5. Urgent fix while `main` has unreleased work
1. Create `release/vX.Y.x` from the last release tag, if it does not exist.
2. Fix on a `<KEY>-FIX-<slug>` branch from it; open the PR **against `release/vX.Y.x`**; CI and the review-only agent run as usual; the owner merges.
3. Publish `vX.Y.Z+1` with **target `release/vX.Y.x`**; smoke test.
4. Bring the fix to `main` in a normal PR so the next release keeps it.

Gate for a release-branch patch (it replaces section 3's "CI green on `main`" and "preview checked", which a release branch cannot meet): the fix PR's required checks are green on its head, the PR is up to date with the release branch so the merged commit is the one CI tested, and the production smoke test right after the deploy passes, with rollback to the previous tag if it fails. `release/*` needs the same protection rule as `main`, including "require branches to be up to date", and CI must run on pushes to `release/**`.

When `main` has nothing unreleased, fix on `main` and release from there.

## 6. Rollback
See `DEPLOYMENT.md`: redeploy the previous tag, smoke test, then fix forward.
