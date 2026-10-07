# AGENTS.md

## About this project
Institutional MVP website for NEXUS Creative Lab, a fictional branding/digital
marketing/product development agency. Single-page-rich Home (Hero, social proof,
services, cases, metrics, testimonials, contact form) plus 4 internal pages
(Services, Cases, About, Contact). No backend — the contact form is UI-only, no
real submission.
Full product context: see `docs/PRD.md`.
Design reference: see `docs/DESIGN.md`.
UI convention: use the `design-taste-frontend` skill (github.com/Leonxlnx/taste-skill) for
every UI decision in this project.

## Before starting (every session)
1. Read progress.md — what happened in the last session
2. Read feature_list.json — what's done, what's left
3. Run the verification commands below to confirm the project is in a healthy state

## How to work here
- Pick exactly ONE not-done feature from feature_list.json at a time (WIP=1)
- F001 is the app skeleton (routing + navigation + minimal shell, running in the
  browser) — do not skip ahead to product features before it's done
- Do not mark a feature done without running verification and recording evidence
- Document project-specific decisions and facts in /docs, not here

## Verification commands
Stack: Vue 3 + Vite + Vue Router. No commands were confirmed during the interview —
suggested defaults below, mark as `# confirm` until validated in this repo.

```bash
npm install
npm run dev      # confirm
npm run build     # confirm
npm run lint       # confirm — set up ESLint if not present yet
```

Manual verification checklist (per PRD, success = 100% navigable on desktop and
mobile): after each feature, open the affected route(s) in a desktop and a mobile
viewport and confirm no broken layout, no dead links.

## Limits (do not do without explicit approval)
- Do not add a backend, database, or real form submission — explicitly out of
  scope for this MVP (see PRD Non-goals)
- Do not add third-party integrations (analytics, scheduling, payments) without
  asking first
- Do not change the color palette or typography defined in docs/DESIGN.md without
  asking first
- Do not push directly to a shared branch without approval

## At the end of each session
1. Update progress.md with what was done and verified
2. Update feature_list.json
3. Update session-handoff.md with the current state and the next suggested feature
4. Only commit if the project is left in a safe, resumable state
