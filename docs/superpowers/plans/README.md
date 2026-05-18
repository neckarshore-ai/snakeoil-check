# Implementation Plans — Snake-Oil-or-Gold Check

Plans for the v0.1 build, organized by phase. Each phase produces working, testable software on its own. Plans follow `superpowers:writing-plans` skill conventions (bite-sized tasks, exact paths, complete code in steps, TDD where applicable).

## Phase Sequence

| # | Plan | File | Status |
|---|------|------|--------|
| 1 | Foundation — scaffold, deploy, DB, tests, CI | `2026-05-18-phase-1-foundation.md` | ✅ written |
| 2 | AI + Workflow Backbone — scraping, AI Gateway, scoring code, durable workflow | `phase-2-ai-workflow.md` | 🔲 stub |
| 3 | Free-Shot Funnel — landing, form, abuse-limits, email, web-report | `phase-3-free-shot.md` | 🔲 stub |
| 4 | Stripe + Auth — magic-link, Checkout, webhooks, user/shot creation | `phase-4-stripe-auth.md` | 🔲 stub |
| 5 | Dashboard + Paid Flows — shot redemption, history, comparison flow | `phase-5-dashboard.md` | 🔲 stub |
| 6 | Scoring Calibration — eval set, calibration runs, weight adjustments | `phase-6-calibration.md` | 🔲 stub |
| 7 | Legal + Hardening — Imprint/Privacy/Terms, BotID, rate-limits, monitoring | `phase-7-hardening.md` | 🔲 stub |
| 8 | Pilot + Polish — 5 pilot users, feedback iteration, copy, Lighthouse | `phase-8-pilot.md` | 🔲 stub |

## How To Use

1. Read the spec first: [`../specs/2026-05-18-snakeoil-check-mmp-design.md`](../specs/2026-05-18-snakeoil-check-mmp-design.md)
2. Pick the phase corresponding to where the build is
3. Each plan starts with a header (Goal, Architecture, Tech Stack), then tasks with checkbox steps
4. Execute via either:
   - `superpowers:subagent-driven-development` — fresh subagent per task with review checkpoints (recommended for production work)
   - `superpowers:executing-plans` — inline batch execution with checkpoints

## When to Write the Next Plan

After a phase plan completes:
1. PR merged to main
2. Vercel preview shows working state matching plan's success criteria
3. MASCHIN runs consistency review (per omnopsis-planning CLAUDE.md rules)
4. Next phase plan gets written from stub, with learnings from prior phase folded in

## Naming Convention

`YYYY-MM-DD-phase-N-<short-name>.md` — date is the date the plan was written (not the target build date).
