# Phase 3 — Free-Shot Funnel (STUB)

> **STATUS:** Stub — to be filled after Phase 2 ships.

## Goal

User-facing Free-Shot flow: marketing landing → form (URL + email) → enqueue Workflow → "wird gebaut" page → email with report-link → web-report page. Abuse-limits and rate-limits in place.

## Scope

| # | Component | Notes |
|---|-----------|-------|
| 1 | Landing page | German copy, marketing post tone, mobile-first, Lighthouse 95+ target |
| 2 | Free-Shot form | URL + email field, BotID protection, server-side validation, Zod schema |
| 3 | Abuse-limit logic | 1 Free-Shot per `email_hash` / 30 days. 5 Free-Shots / hour / IP. Stored in `abuse_log` table |
| 4 | Pending-page | `/check/[id]` — server-component status reader, refresh button, no live updates in v0.1 |
| 5 | Email delivery (Resend) | Template: HTML + plaintext. Subject "Dein Snake-Oil-Check ist da: [tendency]". Link to web-report. |
| 6 | Web-report page | `/report/[token]` — token-protected, public (no login), shows 12 criteria as table with evidence quotes |
| 7 | Free-Shot consumed → upgrade CTA | "Du hast diesen Monat schon einen genutzt. 3-Shot kaufen?" |
| 8 | Disclaimer | Required legal text in every report (defamation safety) |

## Definition of Done

- Free-Shot end-to-end works in production
- 30-day abuse limit enforced
- 5/h IP rate limit enforced
- BotID blocks confirmed bots in staging-test
- Email delivers in <2 min p95
- Landing Lighthouse 95+ desktop/mobile
- 2 Playwright e2e flows: happy-path submit, abuse-limit triggers
- User says "PASS"

## Dependencies

- Phase 2 Done (Workflow + scoring pipeline)
- Resend account + sender domain (depends on domain decision — see open question D1)
- Imprint / Privacy / Terms drafts exist (proper sign-off in Phase 7, draft acceptable here)
