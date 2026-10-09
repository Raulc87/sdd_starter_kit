# New project setup

How to start a new project from this Starter Kit, from an empty GitHub account to the first discovery session. Two paths: **automated** (a GitHub Actions workflow creates the repository for you) or **manual** (you click "Use this template"). Both end in the same place: a new repository and a Claude Code session running the `project-kickoff` skill.

## 0. One-time setup of the Starter Kit (owner)

1. **Make the kit a template repository:** GitHub → this repository → **Settings → General** → tick **Template repository**. Without this, neither path below works.
2. **For the automated path only, add a token the workflow can use to create repositories:**
   - Create a token: GitHub → **Settings → Developer settings → Personal access tokens**.
     - *Fine-grained (recommended):* resource owner = the account or organization that will own new projects; repository access = **All repositories**; permissions: **Administration: Read and write**, **Contents: Read and write**, **Issues: Read and write**. The workflow creates the repository, protects `main`, and opens the kickoff issue.
     - *Classic:* scope `repo`.
   - Give it an expiry date and renew it when it expires. Never paste it into an issue, a prompt, or a file.
3. **Store the token in a protected environment, not as a repository secret.** The token can create and administer repositories across the whole account, so only runs you approve, from `main`, may read it:
   - This repository → **Settings → Environments → New environment**, name `project-bootstrap`.
   - **Required reviewers:** add yourself. Every run then waits for your approval before it can read the token.
   - **Deployment branches and tags:** choose **Selected branches and tags** and add the rule `main`. A workflow edited on any other branch can never read the token.
   - **Environment secrets → Add environment secret:** name `PROJECT_BOOTSTRAP_TOKEN`, value = the token.
   - If you already created a repository secret with that name (Settings → Secrets and variables → Actions → Repository secrets), delete it.
   - Keep the list of people with write access to this repository short. Required reviewers on environments are free for public repositories; a private template needs a paid plan for them.

## 1. Create the repository

### Automated (recommended)

GitHub → this repository → **Actions → New project → Run workflow** (branch `main`), and fill:

| Input | Example | Notes |
|---|---|---|
| `repo_name` | `acme-landing` | Lowercase letters, digits, `-`, `_`, `.` |
| `project_key` | `ACM` | 2–5 uppercase letters; used in branches, PR titles, commits (`AGENTS.md`) |
| `project_name` | `ACME — Lead page` | Human-readable name |
| `client` | `Jane Doe, founder` | Stakeholder |
| `raw_requirement` | `One-page site to collect leads for…` | A few lines in your words; the discovery session asks for the rest |
| `visibility` | `private` | `private` or `public` |
| `owner` | *(empty)* | Leave empty to use this repository's owner |

The run waits for your approval (**Review deployments → project-bootstrap → Approve and deploy**). Then the workflow:
1. creates the repository from this template;
2. protects `main` for everyone, administrators included: pull request required, no force pushes or deletions. You still merge your own PRs (no approving review is required), but nobody, you included, can push straight to `main`. On a private repository of a free GitHub plan, branch protection is not available; the run then shows a warning and you protect `main` later or make the repository public;
3. opens a **kickoff issue** in the new repository with your inputs and the instructions for step 2.

The run summary links to the new repository and the issue.

### Manual

1. This repository → **Use this template → Create a new repository**. Leave "Include all branches" unticked.
2. In the new repository: **Settings → Rules** (or **Branches**) → protect `main`: require a pull request, block force pushes and deletions, and apply the rule to administrators too.
3. Write down the project key (2–5 uppercase letters).

## 2. Connect the tools to the new repository

- **Claude:** the Claude GitHub app must be able to access the new repository. If it is limited to selected repositories, add this one under GitHub → **Settings → Applications → Claude → Configure**.
- **Automated reviewer (optional):** enable it for the new repository (e.g. Codex code review). `AGENTS.md` → "Automated PR reviewers" says how its findings are handled.

## 3. Run discovery in a new Claude Code session

Open Claude Code (claude.ai/code or the desktop app), start a **new session on the new repository**, and send:

```
/project-kickoff
```

or, if slash commands are not available, "Run the project-kickoff skill." If you used the automated path, add: "The kickoff issue is #1."

The `project-kickoff` skill (`.claude/skills/project-kickoff/`) reads the kit's rules, asks the discovery questions in batches, and only after your answers proposes the specs, contracts, stack, plan, and Sprint 001 as pull requests on `<KEY>-DOCS-<slug>` branches. It never implements code and never merges.

Use one session per project. Do not reuse a session from another project: the context would mix.

## 4. From discovery to delivery

The same loop as the first pilot:

1. Discovery Q&A (step 3).
2. Spec PRs on `<KEY>-DOCS-…` branches; you review and merge.
3. Readiness check (`docs/checklists/SPRINT_READINESS_CHECKLIST.md`); you give the go-ahead.
4. Up to 3 implementation agents, each in its own session, with the prompts the planning session gives you; a review-only agent in another session.
5. You merge after approval. Agents never merge.
6. Local run of the prototype (the project's local-development runbook).
7. Visual identity with the `ux-proposals` skill (`docs/process/VISUAL_IDENTITY_PROCESS.md`).
8. Deployment and go-live through the project's own runbook and go-live gate.

## Troubleshooting

| Symptom | Fix |
|---|---|
| "New project" workflow fails with `404` or `Resource not accessible` on the generate step | The kit is not marked as a template (step 0.1), or `PROJECT_BOOTSTRAP_TOKEN` lacks Administration write for the target owner |
| The run waits with "Waiting for review" | Expected: approve it under **Review deployments** (step 0.3) |
| "Secret PROJECT_BOOTSTRAP_TOKEN is not set" | The secret is missing from the `project-bootstrap` environment, the run was started from a branch other than `main`, or the token expired |
| Workflow fails with `name already exists` | A repository with that name exists; choose another `repo_name` |
| Branch protection step shows a warning | Private repository on a free plan; protect `main` manually later or upgrade the plan |
| The workflow is missing in a project repository | Expected: it only runs in the template itself, not in repositories created from it |
| Claude cannot see the new repository | Add it to the Claude GitHub app's repository access (step 2) |
| `/project-kickoff` is not recognized | The session is not on a repository created from this kit, or the repository was created before the skill existed; say "Run the project-kickoff skill" or paste the skill's prompt from `.claude/skills/project-kickoff/SKILL.md` |
