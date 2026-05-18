# Phase 7 — Legal + Hardening (STUB)

> **STATUS:** Stub — to be filled after Phase 6 ships.

## Goal

Production-ready security, observability, and legal posture before pilot users hit the system.

## Scope

| # | Component | Notes |
|---|-----------|-------|
| 1 | Imprint page | German legal Imprint (§5 TMG). Boilerplate from neckarshore-website + lawyer review |
| 2 | Privacy Policy | DSGVO-compliant. Cover scraping, AI processing (zero-data-retention claim), email storage, Stripe, Resend, Vercel Analytics |
| 3 | Terms of Service | Refund policy (30d on unused shots), defamation disclaimer, AI-judgement disclaimer, governing law |
| 4 | Lawyer review | Send all 3 docs to legal counsel; fold in changes |
| 5 | Cookie banner | NOT added — cookieless via Vercel Web Analytics |
| 6 | BotID enabled | Vercel BotID on Free-Shot form |
| 7 | Rate-limit middleware | IP-based, sliding-window, applied to `/api/check/free` |
| 8 | Sentry integration | `@sentry/nextjs`, alert on Workflow failures, error budget set |
| 9 | Vercel Firewall rules | Block obvious abuse patterns, IPs from sanctioned regions if legal review requires |
| 10 | Backup verification | Neon point-in-time recovery tested. Vercel Blob optional artifact backup. |
| 11 | Incident runbook | One-pager: what to do if Claude rate-limit / Stripe outage / Neon outage / abuse spike |
| 12 | Daily-metrics email cron | `pnpm tsx scripts/daily-metrics.ts` runs via Vercel Cron, emails KPIs |

## Definition of Done

- All 3 legal docs published, lawyer sign-off in writing
- BotID, rate-limit, Sentry all live in production
- Test attack scenarios (5 simulated abuse cases) blocked correctly
- Daily-metrics email arrives next morning with real data
- Incident runbook reviewed and bookmarked
- User says "PASS"

## Dependencies

- Phase 5 Done (full functional product)
- Lawyer engagement booked
- Decision on jurisdiction / governing law (DE default)
