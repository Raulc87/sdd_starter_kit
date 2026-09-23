# Spec-Driven Development Starter Kit

A reusable starter kit for projects developed with Spec-Driven Development (SDD) and agentic programming.

## Core flow

1. Raw requirement
2. Discovery
3. PROJECT_SPEC
4. USER_STORIES
5. FEATURE_SPEC(s), when needed
6. ARCHITECTURE_SPEC, when needed
7. UX_UI_DIRECTION, when the project has a user interface
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

## GitHub usage

This repository should be configured as a GitHub Template Repository.

For a new project:

1. Click **Use this template** in GitHub.
2. Create a new repository.
3. Fill `PROJECT_CONTEXT.md`.
4. Run discovery.
5. Complete the required specs before implementation begins.
6. Start agents only after the sprint plan is approved.

## Agent bootstrap

All implementation and review agents start from `AGENTS.md`.

For Claude Code, `CLAUDE.md` redirects Claude to the same process.

## Documentation depth

Use the minimum documentation required by complexity.

### Simple project
- PROJECT_SPEC
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
