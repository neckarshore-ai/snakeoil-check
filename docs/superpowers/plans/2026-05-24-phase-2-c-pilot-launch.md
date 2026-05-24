# Phase-2-C Pilot-Launch + Landing-Polish + Legal-Pages Implementation Plan

**Author:** MASCHIN (Planning session 2026-05-24 letter-b)
**Date written:** 2026-05-24
**Supersedes:** v0.1 stubs `docs/archive/phase-7-hardening.md` (launch-blocker scope only) + `docs/archive/phase-8-pilot.md` (entire scope) — both archived 2026-05-24 letter-a (PR #24 MERGED `e41578c`)
**Canonical Spec:** [Design-Doc v0.2 § 14.1.5 Phase-2-C](../specs/2026-05-20-tiered-architecture-design.md) + [Phase-2-C Scope-Clarification Spec 2026-05-21](../specs/2026-05-21-phase-2-c-scope-clarification.md) (User-pick Option B 2026-05-24 letter-a)
**Sibling Plans:** [Phase-2-B1 Free-Shot Funnel](./2026-05-20-phase-2-b1-free-shot-funnel.md) + [Phase-2-B2 Stripe Single-Shot](./2026-05-21-phase-2-b2-stripe-single-shot.md) — execution-time prerequisites (B1 + B2 both LIVE before C starts)
**Template basis:** [`_template-phase-gated-tdd.md`](./_template-phase-gated-tdd.md) — n=5 empirical-shape, this Plan-Doc is the 6th application

> **Goal:** Bridge between "Phase-2-B2 ships" (MVP functionally complete) and "5 pilot users running real checks in production" (MVP publicly launched). Eliminate launch-blockers (Legal-Pages, GDPR-Endpoint, Rate-limits visible) + polish (Landing-Copy post-Pricing-Pivot, Lighthouse 95+ all routes) + manual pilot-onboarding workflow (5 users, daily-feedback-review 7 days).

---

## Pivot-Context (read first)

This Plan-Doc covers the **pre-public-launch hardening + polish + pilot-recruitment block**. Scope is bounded by two anchors:

1. **Entry anchor:** Phase-2-B2 MERGED to main + LIVE on Vercel Production + `B2_LIVE=true` + 48h-stability green.
2. **Exit anchor:** 5 real pilot users completing ≥1 Free-Shot + ≥1 paid Single-Shot each, with daily-feedback-capture for 7 consecutive days.

**Not in this Plan-Doc:**
- Marketing-channel mechanics (X/LinkedIn posts, content-marketing) — operational, not architectural per Design-Doc § 13
- Magic-Link Auth + Subscription Tier + BYOK + Dashboard — Phase-3 scope per Design-Doc § 14.2
- Programmatic SEO + B2B Enterprise + i18n — Phase-4+ scope per Design-Doc § 14.3
- Domain-Classifier + Tier-2 Auto-Escalation + Advanced Anti-Abuse — Phase-3+ scope per Design-Doc § 14.2

**6 Decision-Needed defaults applied (per Spec 2026-05-21 § Decision-Needed table, all set at write-time per letter-a Option B):**

| # | Question | Default applied |
|---|----------|-----------------|
| 1 | Confirm Phase-2-C = Pilot-Launch + Landing-Polish + Legal-Pages scope | ✅ Yes (User-pick Option B 2026-05-24 a) |
| 2 | Phase-2-C effort estimate: pilot users target (3 / 5 / 10) | ✅ **5 pilot users** |
| 3 | Pilot-user-recruitment channel | ✅ **Personal network + X-DM** (NOT cold-email / form on landing) |
| 4 | Legal pages bundle in Phase-2-C OR Phase-7 | ✅ **In Phase-2-C** (launch-blocker for German market per BGB/TMG) |
| 5 | Lighthouse-tuning — separate task OR per-route in B1+B2 Phase-DoD | ✅ **Separate cross-cutting Phase 3** (cleaner — applies to all routes uniformly) |
| 6 | Pricing-page separate OR fold into landing | ✅ **Fold into landing** (single-page presentation, lower cognitive load for pilot users) |

---

## Architecture Decisions Locked

| # | Decision | Source | Rationale |
|---|----------|--------|-----------|
| 1 | **Legal-Pages bundled into single PR (Imprint + Privacy + Terms, DE-only)** | Spec 2026-05-21 § Recommendation #3 | Atomic launch-blocker removal; partial-shipping (only Imprint, no Privacy) = not-launchable |
| 2 | **Lighthouse 95+ target across ALL v0.2 routes** | CLAUDE.md current target | Cross-cutting Phase 3 task; route-list is concrete (8 routes), measurement is mechanical |
| 3 | **GDPR delete-endpoint visible in MVP** | Design-Doc § 14.1.5 "To Build" | Launch-blocker for German market; minimum: `/legal/data-deletion` form-page + backend stub |
| 4 | **Pilot-onboarding = manual email + Resend Audiences** | Spec 2026-05-21 Decision-Needed Q3 default | 5 users does NOT warrant onboarding-automation infrastructure (Build-vs-Buy = manual cheaper at n=5) |
| 5 | **Feedback-capture = single Resend-Audiences segment + manual Airtable / Linear** | NEW lightweight pick | DB-table for pilot-feedback overkill at n=5; revisit at Phase-3 (real subscription user-count) |
| 6 | **Rate-limits visibility = `/legal/rate-limits` info-page** | Design-Doc § 14.1.5 "To Build" | Already in B1 `rate_limits` table; only needs surfacing as user-visible info |
| 7 | **Daily-feedback-review-cadence: 7 consecutive days post-pilot-start** | Spec 2026-05-21 § Recommendation Phase 6 | Operational discipline embedded in Plan-Doc to avoid drift |
| 8 | **No new Drizzle migrations** | inherits from B2 architecture | All required tables already exist (B1 + B2 schema) |

---

## Prerequisites — Write-Time vs Execution-Time

### Write-Time Preconditions (✅ ALL FILLED at Plan-Doc-write)

Required to write the Plan-Doc with concrete references + commands:

- [x] **Phase-2-B1 Plan-Doc exists** — [`2026-05-20-phase-2-b1-free-shot-funnel.md`](./2026-05-20-phase-2-b1-free-shot-funnel.md)
- [x] **Phase-2-B2 Plan-Doc exists** — [`2026-05-21-phase-2-b2-stripe-single-shot.md`](./2026-05-21-phase-2-b2-stripe-single-shot.md)
- [x] **Design-Doc v0.2 § 14.1.5 scope-defined** — propagated 2026-05-24 letter-a PR #24 `e41578c`
- [x] **plans/README Phase-2-C row scope-defined** — same PR #24
- [x] **v0.1 stubs archived** — `docs/archive/phase-7-hardening.md` + `docs/archive/phase-8-pilot.md` (verified `ls docs/archive/`)
- [x] **6 Decision-Needed defaults set** (Spec 2026-05-21 § Decision-Needed table, User-pick Option B 2026-05-24 a)
- [x] **R2-fact-class-6 triple-source-check applied** — Plan-Doc target verified canonical (Spec PR #23 MERGED + Design-Doc § 14.1.5 propagated + plans/README updated)

### Execution-Time Preconditions (Phase 0 RE-VERIFY before Bob/MASCHIN starts)

Required before Phase-2-C execution starts (separate session, NOT now):

- [ ] **Phase-2-B1 + Phase-2-B2 both MERGED** to snakeoil-check main + LIVE on Vercel Production
- [ ] **`B1_LIVE=true` + `B2_LIVE=true`** in Vercel Production
- [ ] **B1 + B2 Phase-7 Smoke-Tests all green** (E2E + Stripe-Webhook + Refund-flow)
- [ ] **48h-stability window post-B2-deploy** completed (no Sentry critical errors, no Stripe-dispute-events)
- [ ] **B1 produces ≥10 Free-Shots end-to-end** + **B2 produces ≥1 successful paid Single-Shot** (real conversion baseline)
- [ ] **5 pilot-user candidates identified** (User-Action, Personal network + X-DM outreach) — names + email-addresses captured in private notes BEFORE Phase 4 starts
- [ ] **Resend Audiences "Pilot-2026-Q2" segment created** in Resend Dashboard (Phase 4 Task 4.1)

---

## File Structure (decomposition before tasks)

```
src/
├── app/
│   ├── (legal)/                                # Route-group, NO URL prefix
│   │   ├── imprint/page.tsx                    # NEW — DE Impressum per TMG § 5
│   │   ├── privacy/page.tsx                    # NEW — DE Datenschutzerklärung per GDPR Art. 13
│   │   ├── terms/page.tsx                      # NEW — DE AGB
│   │   ├── rate-limits/page.tsx                # NEW — info-page describing rate-limits visibility
│   │   └── data-deletion/page.tsx              # NEW — GDPR delete-endpoint form-page
│   ├── api/
│   │   └── gdpr/
│   │       └── delete/route.ts                 # NEW — POST: receive email, queue deletion, send confirm-link
│   └── page.tsx                                # EDIT — Landing-Copy revision (remove Shot-Bundle, add €1/€3 + Subscription €10 future)
├── components/
│   ├── legal/
│   │   ├── LegalLayout.tsx                     # NEW — shared layout for all 5 legal routes
│   │   └── LastUpdatedNote.tsx                 # NEW — auto-rendered "Stand: YYYY-MM-DD" footer
│   └── landing/
│       ├── PricingSection.tsx                  # NEW — €1 Standard / €3 Deep cards + Subscription "coming soon" placeholder
│       └── PilotBanner.tsx                     # NEW (CONDITIONAL Phase 4) — "Du bist Pilot-Tester" badge if email in pilot-segment
└── content/                                    # NEW directory — static content lives here, not in components
    ├── legal/
    │   ├── imprint.de.md                       # NEW — Impressum content (User-provided personal-data)
    │   ├── privacy.de.md                       # NEW — Datenschutz content (template + customization)
    │   └── terms.de.md                         # NEW — AGB content (template + customization)
    └── landing/
        └── pricing-copy.de.md                  # NEW — Pricing-section copy (€1/€3 + future-Subscription)

tests/
├── unit/
│   └── legal/
│       └── legal-pages-render.test.tsx         # Smoke: each /legal/* route renders 200 + has h1
├── integration/
│   └── gdpr-delete-flow.test.ts                # POST /api/gdpr/delete → expect 202 + email-queued
└── e2e/
    ├── lighthouse-all-routes.spec.ts           # Playwright + lighthouse-ci: all 8+5 routes ≥95
    └── pilot-onboarding-email.spec.ts          # Manual-run: Resend test-email delivery + open-rate check

scripts/
└── pilot-feedback-collector.sh                 # NEW — daily-cron-runnable: pulls Resend opens + replies + Sentry errors → digest

public/
└── docs/
    └── pilot-onboarding-guide.de.pdf           # NEW (CONDITIONAL Phase 4) — sent to pilot-users via Resend
```

**~14 new files + 1 edit (landing page).** Zero new DB migrations. Zero new API-routes besides `/api/gdpr/delete`.

---

## Phase 0 — Pre-Flight Verification (Gating, ~20 min, NO code)

### Task 0.1 — Verify B1 + B2 both MERGED + LIVE

- [ ] `gh pr list --state merged --search "Phase-2-B1" --repo neckarshore-ai/snakeoil-check` returns ≥1 merged PR
- [ ] `gh pr list --state merged --search "Phase-2-B2" --repo neckarshore-ai/snakeoil-check` returns ≥1 merged PR
- [ ] `curl -I https://snakeoil-check.com/free-shot` returns 200
- [ ] `curl -I https://snakeoil-check.com/checkout/single-shot` returns 200
- [ ] If any fails: STOP. Phase-2-C execution gated on B1 + B2 LIVE.

### Task 0.2 — Verify `B1_LIVE=true` + `B2_LIVE=true` in Vercel Production

- [ ] `vercel env ls production | grep -E "B1_LIVE|B2_LIVE"` returns both as `true`
- [ ] If either is `false`: REVERT to `true` (Phase-2-C assumes both flows active for pilot-users)

### Task 0.3 — Verify 48h-stability window completed

- [ ] Check Sentry dashboard: zero P1 errors in last 48h on Production
- [ ] Check Stripe Dashboard Events: zero `charge.dispute.created` events in last 48h
- [ ] If unstable: extend stability-window OR fix-and-restart. Do NOT pilot-launch on unstable foundation.

### Task 0.4 — Verify conversion-baseline (B1 ≥10 Free-Shots, B2 ≥1 paid)

- [ ] `psql $DATABASE_URL -c "SELECT count(*) FROM checks WHERE result_status='completed' AND payment_status IS NULL"` returns ≥10 (Free-Shots)
- [ ] `psql $DATABASE_URL -c "SELECT count(*) FROM checks WHERE payment_status='succeeded'"` returns ≥1 (paid)
- [ ] If either insufficient: pilot-recruitment is premature. Drive ≥1 personal Free-Shot + ≥1 personal paid first.

### Task 0.5 — Verify 5 pilot-candidate names captured

- [ ] User-Action: confirm 5 names + emails in private notes (NOT in repo)
- [ ] If <5: STOP Phase 4 + 5 + 6. Phase 1-3 (Landing + Legal + Lighthouse) can proceed.

### Task 0.6 — Verify Resend Audiences "Pilot-2026-Q2" segment exists

- [ ] `curl -s -H "Authorization: Bearer $RESEND_API_KEY" https://api.resend.com/audiences | jq '.data[] | select(.name == "Pilot-2026-Q2")'` returns segment-object
- [ ] If missing: create via Resend Dashboard (5 min User-Action)

**Phase 0 DoD:** All 6 checks pass. NO code yet. Phase 4-6 gated on Task 0.5 + 0.6; Phase 1-3 can proceed even if pilot-recruitment delayed.

---

## Phase 1 — Landing-Page Copy Revision + Pricing-Section (~2-3h)

### Task 1.1 — Write Pricing-Copy content file (TDD: snapshot-test first)

- [ ] Write failing test: `tests/unit/landing/pricing-copy.test.tsx` asserts `<PricingSection>` renders €1 Standard + €3 Deep + "Subscription coming soon" placeholder
- [ ] RED-gate transcript in commit-body
- [ ] Write `src/content/landing/pricing-copy.de.md` with Western/RDR2-aesthetic copy (per CLAUDE.md aesthetic-target)
- [ ] Write `src/components/landing/PricingSection.tsx` consuming the .md file
- [ ] Test green
- [ ] Visual UAT: `pnpm dev` + browser-screenshot, no Shot-Bundle remnants visible

### Task 1.2 — Edit `app/page.tsx` to include PricingSection + remove Shot-Bundle references

- [ ] grep `app/page.tsx` for any string containing "3-Shot" / "10-Shot" / "Bundle" — remove or rewrite
- [ ] Insert `<PricingSection>` in landing hero-flow per UX-decision (after main-CTA, before footer)
- [ ] Run `pnpm test:unit landing/pricing-copy.test.tsx` — green
- [ ] Playwright snapshot test landing: `pnpm test:e2e landing-pricing-visible.spec.ts`

### Task 1.3 — Copy QA — German native-speaker pass (User-Action)

- [ ] User-Action: read all landing-copy + pricing-copy aloud, flag awkward phrasing
- [ ] Iterate until User signals "Copy ready" — capture iteration-count in commit-body

---

## Phase 2 — Legal-Pages Bundle: Imprint + Privacy + Terms + Data-Deletion + Rate-Limits (~3-4h)

### Task 2.1 — Create `LegalLayout` component (TDD)

- [ ] Failing test: renders children + LastUpdatedNote + back-to-home link
- [ ] Implement `src/components/legal/LegalLayout.tsx` + `LastUpdatedNote.tsx`
- [ ] Test green

### Task 2.2 — Write Imprint content + page (User-Action: provide personal-data + business-data)

- [ ] User-Action: provide all TMG § 5 required fields (name, address, contact, USt-IdNr if applicable, regulatory-body if applicable) — capture in `src/content/legal/imprint.de.md`
- [ ] Implement `src/app/(legal)/imprint/page.tsx` consuming the .md
- [ ] Smoke test: `/imprint` returns 200 + h1 contains "Impressum"

### Task 2.3 — Write Privacy content + page (template-based)

- [ ] Use German GDPR-Privacy-template (e.g., adapted from datenschutz-generator.de) — capture in `src/content/legal/privacy.de.md`
- [ ] Customize for snakeoil-check specifics: data-classes processed (URL + email), retention (90 days for Free-Shot results, 7 years for paid-Single-Shot per German tax-law)
- [ ] Cookie-banner if applicable (decide at write-time — if site has zero non-essential cookies, no banner needed)
- [ ] Implement `src/app/(legal)/privacy/page.tsx`
- [ ] Smoke test green

### Task 2.4 — Write Terms (AGB) content + page (template-based)

- [ ] Use German AGB-template adapted for digital-service (single-shot consumable + future-subscription)
- [ ] Include: scope-of-service, payment-terms, refund-policy (consistent with B2 auto-refund-on-failure logic), liability-limitation
- [ ] Capture in `src/content/legal/terms.de.md`
- [ ] Implement `src/app/(legal)/terms/page.tsx`
- [ ] Smoke test green

### Task 2.5 — GDPR Data-Deletion endpoint + page (TDD)

- [ ] Failing test: `POST /api/gdpr/delete` with `{email: "x@y.de"}` returns 202 + queues deletion-confirmation-email
- [ ] Implement `src/app/api/gdpr/delete/route.ts` — receives email, sends magic-link-style confirmation, on-confirm wipes checks + check_results rows where `submitted_email = X`
- [ ] Implement `src/app/(legal)/data-deletion/page.tsx` — form-page with email-input + GDPR explanation
- [ ] Integration test: full flow (form-submit → email → confirm-link-click → DB-rows deleted)

### Task 2.6 — Rate-Limits visibility page (info-only, no logic)

- [ ] Implement `src/app/(legal)/rate-limits/page.tsx` describing: Free-Shot 1/day/email + paid Single-Shot 10/day/IP + B1+B2 anti-abuse layers visible
- [ ] Link from privacy-page footer + landing-page footer
- [ ] Smoke test: /rate-limits returns 200

### Task 2.7 — Footer + cross-link wiring

- [ ] Edit `app/layout.tsx` footer: links to /imprint + /privacy + /terms + /rate-limits + /data-deletion
- [ ] Lighthouse: footer-links keyboard-tabbable
- [ ] Playwright smoke: tab-order through footer reaches all 5 links

---

## Phase 3 — Lighthouse-Tuning Cross-Cutting (~2-3h)

### Task 3.1 — Baseline measurement (NO code)

- [ ] Run `pnpm lighthouse:ci --routes=/,/free-shot,/wait/test,/result/test,/checkout/single-shot,/processing/test,/examples,/examples/test-slug,/imprint,/privacy,/terms,/rate-limits,/data-deletion`
- [ ] Capture baseline scores for each route in `docs/lighthouse-baseline-2026-05-NN.md` (NOT committed, for reference)
- [ ] Identify routes <95 Performance OR <95 Accessibility OR <95 Best-Practices OR <95 SEO

### Task 3.2 — Performance fixes (per-route, in order of lowest-score first)

For each route <95 Performance:
- [ ] Inspect: LCP element + critical path + render-blocking resources
- [ ] Apply: image-optimization (Next/Image), font-preload, code-splitting, lazy-load below-fold
- [ ] Re-measure: confirm ≥95 OR document why infeasible (e.g., Stripe.js Elements has known LCP penalty, mitigate not eliminate)

### Task 3.3 — Accessibility fixes

- [ ] Run `pnpm axe-core --routes=...` for full a11y audit
- [ ] Fix: missing aria-labels, color-contrast, focus-management, semantic-html
- [ ] Re-measure: all routes ≥95 Accessibility

### Task 3.4 — Best-Practices + SEO fixes

- [ ] Add Open Graph + Twitter Card meta-tags to landing + legal pages
- [ ] Add canonical + robots-meta per route
- [ ] Fix HTTPS-only references, no mixed-content
- [ ] Re-measure: all routes ≥95 Best-Practices + ≥95 SEO

### Task 3.5 — Lighthouse-CI integration (TDD-driven gating)

- [ ] Add `pnpm lighthouse:ci` to `.github/workflows/ci.yml` post-build step
- [ ] Configure `lighthouserc.js`: `assertions.preset='lighthouse:no-pwa'`, `assertions.minScore=0.95`
- [ ] CI fails if any route <95
- [ ] First CI-run on this PR's branch must pass

---

## Phase 4 — Pilot-User-Onboarding Workflow (~2-3h, depends on User-Action Task 0.5 + 0.6)

### Task 4.1 — Resend Audiences "Pilot-2026-Q2" segment + manual-add 5 users

- [ ] User-Action: in Resend Dashboard, create segment "Pilot-2026-Q2" if not yet exists
- [ ] Add 5 pilot-emails to the segment
- [ ] Test: `curl ...resend.com/audiences/pilot-2026-q2/contacts | jq '.data | length'` returns 5

### Task 4.2 — Write pilot-onboarding email template (User-Action: copy)

- [ ] User-Action: draft email content (subject + body) — DE, Western/RDR2-aesthetic per CLAUDE.md, ~200-300 words
- [ ] Content includes: welcome + how-to-use-Free-Shot + how-to-use-Paid-Shot + feedback-channel (reply-to-email or Linear-form)
- [ ] Save to `docs/pilot-onboarding-email.de.md`

### Task 4.3 — Manually send 5 onboarding emails via Resend Dashboard

- [ ] User-Action: send-test to own-email first, verify rendering + link-correctness
- [ ] Send to all 5 pilot-users
- [ ] Capture send-timestamp + open-rate-day-1 in `docs/pilot-onboarding-log.md`

### Task 4.4 — PilotBanner conditional component (TDD)

- [ ] Failing test: `<PilotBanner email="known-pilot@x.de">` renders badge; `<PilotBanner email="random@x.de">` renders null
- [ ] Implement `src/components/landing/PilotBanner.tsx` — checks email against Resend-segment via lightweight API-call (`/api/pilot/is-pilot`)
- [ ] Add to landing layout above-fold (if email-from-session-or-cookie matches)
- [ ] Test green

---

## Phase 5 — Feedback-Capture Mechanism (~1-2h)

### Task 5.1 — Decide feedback-form vs reply-to-email

- [ ] User-Decision at execution-time: form (Tally / Typeform / custom) OR reply-to-email (simpler, lower-tech)
- [ ] **Default per AD #5: reply-to-email + Linear-issue-per-feedback** (no DB-table)

### Task 5.2 — Manual feedback-collection routine

- [ ] User-Action: each morning during 7-day pilot-window, check inbox for replies-to-onboarding-email
- [ ] Each substantive feedback → Linear-issue tagged `pilot-feedback-2026-q2`
- [ ] Capture daily-summary in `docs/pilot-feedback-day-N.md` (7 daily files)

### Task 5.3 — Feedback-collector script (lightweight, optional)

- [ ] Implement `scripts/pilot-feedback-collector.sh` — pulls Resend opens (last-24h) + replies (last-24h) + Sentry errors (filtered to pilot-emails) → markdown-digest
- [ ] Run daily during pilot-window (cron OR manual)
- [ ] Output appended to `docs/pilot-feedback-day-N.md`

---

## Phase 6 — Pilot Smoke + 7-Day-Review (~7 days elapsed, ~1h active work per day)

### Task 6.1 — Day-1 active check (post-onboarding-email-sent)

- [ ] All 5 onboarding-emails delivered (Resend Dashboard confirms)
- [ ] ≥3 of 5 opens within 24h (open-rate baseline)
- [ ] ≥1 reply OR ≥1 Free-Shot from pilot-emails within 24h

### Task 6.2-6.7 — Day-N active checks (Day 2-7)

For each day:
- [ ] Inbox-check + Linear-issue-tagging
- [ ] Sentry-check for pilot-user errors (filter by email)
- [ ] Capture daily-summary in `docs/pilot-feedback-day-N.md`
- [ ] Cumulative-metric tracking: total Free-Shots from pilot-emails, total paid-Single-Shots from pilot-emails

### Task 6.8 — Day-7 retrospective + Phase-2-C closure decision

- [ ] User-Action: review all 7 daily-summaries + Linear-issues
- [ ] Decision: Phase-2-C DONE (ready for public-launch) OR Phase-2-C-Extension (more polish needed before public-flip)
- [ ] If DONE: capture retrospective in session-close report + Phase-3 backlog
- [ ] If EXTENSION: identify top-3 blockers + author Phase-2-C-Extension Plan-Doc

---

## Success Criteria (Phase-2-C Done When)

1. **All 5 legal-pages routes** (`/imprint`, `/privacy`, `/terms`, `/rate-limits`, `/data-deletion`) return 200 + render content in DE
2. **Landing-page copy** has zero Shot-Bundle references + includes €1/€3 Pricing-Section + Subscription "coming soon" placeholder
3. **Lighthouse 95+** on all routes (13 routes total: 8 from B1+B2 + 5 from Phase-2-C)
4. **5 pilot-user-emails sent** + tracked in `docs/pilot-onboarding-log.md`
5. **7 daily-feedback-summaries** captured in `docs/pilot-feedback-day-N.md` (N=1..7)
6. **GDPR delete-endpoint** functional: form → email → confirm-link → DB-rows deleted (integration-test green)
7. **CI green** on Phase-2-C PR including Lighthouse-CI gating step
8. **48h-stability post-Phase-2-C-merge** before declaring Phase-2-C-DONE + Phase-3 dispatch-eligible

---

## Risks + Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| Imprint/Privacy/Terms templates outdated for 2026-DE-law | Medium | Legal-blocker | Use 2026-current templates (datenschutz-generator.de) + User-review before merge |
| Pilot-users don't engage (zero replies / zero Free-Shots in 48h) | Medium | Pilot-data-empty | Day-2 follow-up email (manual); if still zero by Day-3, restart with revised recruitment |
| Lighthouse <95 unreachable on Stripe-pages | Medium | Score-target-miss | Document why (Stripe.js Elements LCP-penalty); aim ≥90 on those routes specifically |
| GDPR delete-endpoint bug = wrong-row deletion | Low | Data-loss + legal-risk | Soft-delete first (status='pending_delete'); cron-hard-delete after 7-day-cooldown |
| Phase-2-C wall-clock balloons past 1-week | Medium | Roadmap-slip | Capture-Phase-Skip if Phases 4-6 delayed by pilot-recruitment; ship Phases 1-3 + Lighthouse-CI as Phase-2-C-Part-1 |

---

## Cross-References

- **Canonical Spec:** [Design-Doc v0.2 § 14.1.5 Phase-2-C](../specs/2026-05-20-tiered-architecture-design.md)
- **Scope-Clarification:** [Phase-2-C Scope-Clarification Spec 2026-05-21](../specs/2026-05-21-phase-2-c-scope-clarification.md) (Option B chosen)
- **Sibling Plan-Docs:** [Phase-2-B1](./2026-05-20-phase-2-b1-free-shot-funnel.md), [Phase-2-B2](./2026-05-21-phase-2-b2-stripe-single-shot.md)
- **Template basis:** [`_template-phase-gated-tdd.md`](./_template-phase-gated-tdd.md)
- **Archived v0.1 stubs:** [`docs/archive/phase-7-hardening.md`](../../archive/phase-7-hardening.md), [`docs/archive/phase-8-pilot.md`](../../archive/phase-8-pilot.md)
- **CLAUDE.md aesthetic-target:** Western/RDR2 (consult before copy-write)
- **Bob-Brief context:** [omnopsis-planning Bob Phase-2-B Brief](https://github.com/omnopsis-ai/omnopsis-planning/blob/main/docs/plans/2026-05-24-bob-phase-2-b1-b2-dispatch-brief.md) (B1+B2 prereqs for Phase-2-C)

---

## Estimated Effort

- **Phase 0** — ~20 min (pre-flight verification only)
- **Phase 1** — ~2-3h (Landing-Copy Revision + Pricing-Section)
- **Phase 2** — ~3-4h (5 legal-pages + GDPR endpoint, includes content-write + page-implementation)
- **Phase 3** — ~2-3h (Lighthouse-Tuning cross-cutting + CI-integration)
- **Phase 4** — ~2-3h (pilot-onboarding workflow + PilotBanner component)
- **Phase 5** — ~1-2h (feedback-capture mechanism, minimal-tech)
- **Phase 6** — ~7 days elapsed, ~7h cumulative active work (daily 1h checks)

**Total active-work:** ~17-22h across ~7-10 calendar-days (gated by pilot-window).

**Bob vs MASCHIN-split:** Phases 1-3 are Bob-execution (TDD-disciplined feature-work). Phases 4-6 are mixed — pilot-onboarding-email is User+MASCHIN, daily-checks are User, PilotBanner component is Bob, feedback-collector script is Bob.

**Recommended sequencing:** Bob executes Phases 1-3 as Phase-2-C-Part-1 PR (~7-10h, 1-2 Bob-sessions). User + MASCHIN execute Phases 4-6 as Phase-2-C-Part-2 PR + daily-routine (~7 days). Single Phase-2-C-DONE declaration at Day-7 retrospective.

---

## Out of Scope (Phase 3+ defers)

- ❌ Cookie-banner (deferred until first non-essential cookie is added — currently zero)
- ❌ Magic-Link Auth (Phase-3 per Design-Doc § 14.2)
- ❌ Subscription Tier + BYOK (Phase-3)
- ❌ Newsletter Engine + Welcome-Drip (Phase-3 per Design-Doc § 14.2)
- ❌ Programmatic SEO + per-domain landing pages (Phase-4+ per Design-Doc § 14.3)
- ❌ B2B Enterprise Tier (Phase-4+)
- ❌ Multi-language i18n (DE-only at launch per Design-Doc § 14.4)
- ❌ Customer-support-tooling (out-of-scope per Design-Doc § 14.4)
- ❌ Brand-Identity revision for Omnopsis Documentor (different MMP, different brand-stack)

---

## Plan-Doc Author Notes (R2 fact-class 6 Application Log)

**Pre-write R2-fact-class-6 triple-source-check executed 2026-05-24 letter-b:**

| Source | Reference | Verification |
|--------|-----------|--------------|
| Canonical Spec | Design-Doc v0.2 § 14.1.5 | ✅ Present on main since PR #24 MERGED 2026-05-24 letter-a (`e41578c`) |
| Scope-Clarification | Spec 2026-05-21-phase-2-c-scope-clarification.md | ✅ Present on main since PR #23 MERGED 2026-05-22 |
| Plans-Index | plans/README.md Phase-2-C row | ✅ Scope-defined 2026-05-24 letter-a, this Plan-Doc fills the "TBD" → file-reference |
| Archive State | docs/archive/phase-7-hardening.md + phase-8-pilot.md | ✅ Both present in archive/ (ls-verified) |
| Sibling Plan-Docs | B1 + B2 | ✅ Both present on main |

**Plan-Doc-Routing-Drift preflight:** ZERO drift caught. All 5 sources are canonical + consistent + freshly-propagated. R2 fact-class 6 efficacy: this is now n=4 cross-session same-rule-application post-codify (letter-a Brief + letter-b PR #22 CLAUDE.md drift + letter-b PR #23 Phase-2-C scope-undefined + today Phase-2-C Plan-Doc-write zero-drift).

**Template basis:** This is the **6th** Plan-Doc in the empirical-shape. n=5 shape codified into [`_template-phase-gated-tdd.md`](./_template-phase-gated-tdd.md) (same PR). Template-extraction was Plan-Doc-class (reversible by re-write) — `does_NOT_count_as_lock`, Lock-zero streak holds at 47.

---

**MASCHIN Author-Stamp:** 2026-05-24 letter-b MASCHIN-Planning-session. Plan-Doc for Phase-2-C Pilot-Launch + Landing-Polish + Legal-Pages. **All 6 Decision-Needed defaults applied per Spec 2026-05-21 § Decision-Needed table (Option B chosen 2026-05-24 a). Execution gated on B1 + B2 LIVE + 48h-stability.**
