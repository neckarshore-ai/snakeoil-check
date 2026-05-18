# Phase 5 — Dashboard + Paid Flows (STUB)

> **STATUS:** Stub — to be filled after Phase 4 ships.

## Goal

Logged-in paid users can spend shots (submit URLs), see history of past checks, mark 2-3 checks for comparison, and trigger a Comparison-Workflow.

## Scope

| # | Component | Notes |
|---|-----------|-------|
| 1 | Shot-redeem flow | Server Action: validate shot-balance, decrement, enqueue Workflow with `tier=paid` |
| 2 | Check history list | `/dashboard/history` — sortable, filterable, links to web-reports |
| 3 | Comparison flow | Select 2-3 checks → Comparison-Workflow runs → email with comparison report |
| 4 | Shot expiry cron | Daily background job: flag expired shots, send 7-day-warning email |
| 5 | Re-run option (10-Shot only) | Spend 1 € via Stripe one-off charge to re-score an existing URL after 30 days |
| 6 | Empty/error states | Dashboard works when shot-balance=0, when checks failed, when shots expired |

## Definition of Done

- Paid user redeems 3 shots → all 3 checks complete → 1 comparison generated
- Re-run option works on a real test URL
- Expiry cron tested in staging (manipulate time)
- Empty-state UI shown for new users with 0 redeemed shots
- 2 Playwright e2e: redeem → history → comparison; expiry-warning
- User says "PASS"

## Dependencies

- Phase 4 Done (Stripe + Auth + Dashboard skeleton)
