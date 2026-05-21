# Snake-Oil-or-Gold Check

> Neutral, AI-powered reality-check for online coachings, high-ticket programs, masterclasses, and adjacent snake-oil-prone offers. Submit a link, get a defensible 12-criteria score with a clear tendency: **Go**, **Vorsicht**, or **Lieber lassen**.

**Status (2026-05-21):** Phase-1 Foundation + Phase-2-A Foundation **LIVE on Vercel Production.** Phase-2-B1 (Free-Shot Funnel) Plan-Doc written, Bob-implementation next. Phase-2-B2 (Stripe Single-Shot) stub-only, full Plan-Doc to follow post-B1-ship.

## Pricing (v0.2 Tiered Architecture)

| Tier | Name | Price | Role |
|------|------|-------|------|
| 0 | Pre-loaded Examples Gallery | Free, no signup | Curated showcase + SEO-engine |
| 0.5 | Free-Shot (Email-Gated) | Free, 1 per confirmed email (lifetime) | Activation |
| 1 | Standard Single-Shot | €1 (Stripe Payment-Intent, anonymous) | Conversion — 12-criteria Haiku-class analysis |
| 1.5 | Deep Single-Shot | €3 (Stripe Payment-Intent, anonymous) | Premium — Sonnet-class with extended context budget |
| 2 | Subscription | €10/Monat (account) | Retention — 50 checks/Monat + history + alerts |
| 3 | Subscription + BYOK | €10/Monat + Customer-Tokens | Graduation — Customer keys, unlimited checks |
| 4 | B2B Enterprise | Custom (€100+/seat) | Roadmap — Bulk-API, Custom-Reports, SLA |

## Docs

| Doc | Purpose |
|-----|---------|
| [Design-Doc v0.2 (canonical spec)](docs/superpowers/specs/2026-05-20-tiered-architecture-design.md) | Tiered architecture, customer journey, model router, success criteria |
| [Plans Index](docs/superpowers/plans/README.md) | Phase-sequence, current → next, plan-doc routing |
| [Scoring Framework](docs/scoring-framework.md) | 12 Criteria, weights, thresholds, prompt strategy, eval set |
| [Roadmap](docs/roadmap.md) | Phase milestones |
| [Decisions Log](docs/decisions.md) | D1..Dn — architecture decisions with rationale |
| [CLAUDE.md](CLAUDE.md) | Working rules for Claude Code sessions in this repo |

## Roadmap (post-v0.2-pivot 2026-05-20)

| Phase | Plan | Status |
|-------|------|--------|
| 1 | Foundation — scaffold, deploy, DB, tests, CI | ✅ MERGED 2026-05-18 (PR #1) |
| 2-A | Foundation — Router-Layer + Multi-Model + DB-schema + Workflow + Benchmarks | ✅ MERGED 2026-05-20 (PR #16, 101 tests) |
| 2-B1 | Free-Shot Funnel — Examples Gallery + Email-Verify + Anti-Abuse + Wait-Page-Conversion + GDPR Double-Opt-In + Result Page + Resend Audiences | 🔲 [Plan-Doc written 2026-05-20](docs/superpowers/plans/2026-05-20-phase-2-b1-free-shot-funnel.md), Bob next |
| 2-B2 | Stripe Single-Shot — Payment-Intent + €1/€3 Checkout + Webhook | 🔲 [stub](docs/superpowers/plans/2026-05-20-phase-2-b2-stripe-single-shot.md), full Plan-Doc post-B1-ship |
| 2-C | Frontend + Acquisition | 🔲 not yet written |
| 3 | Subscription + BYOK + Magic-Link Auth + Dashboard + Newsletter | 🔲 stub |
| 6 | Scoring Calibration — eval-set, calibration runs | 🔲 stub |
| 7 | Legal + Hardening — Imprint, Privacy, Terms, rate-limits, monitoring | 🔲 stub |
| 8 | Pilot + Polish — 5 pilot users, feedback iteration, copy | 🔲 stub |

## Quick Facts

- **Owner:** German Rauhut (`neckarshore-ai/snakeoil-check`)
- **Stack:** Next.js 16 App Router, Vercel (Fluid Compute), Stripe Payment-Intents, Neon Postgres + Drizzle, Resend, Vercel AI Gateway, Vercel Workflow (DevKit), Upstash Redis (rate-limits)
- **Model Router (Tiered):**
  - FREESHOT — `google/gemini-2.0-flash` (cost-bound for Tier 0.5)
  - TIER1 — `anthropic/claude-haiku-4-5` (Standard €1 Single-Shot)
  - TIER2 — `anthropic/claude-sonnet-4-5` (Deep €3 Single-Shot + Subscription)
- **Scraping:** `fetch` + `cheerio` (no headless browser at MVP)
- **Tests:** Vitest (unit) + Playwright (E2E)
- **Hosting:** Vercel (Fluid Compute), German market launch target

## Source Material

Original brainstorming and product packages: Obsidian Vault `Idea - Snakeoil or Gold 25-12/`. v0.2 Pricing-Pivot brainstorm: MASCHIN session Tag-61 letter-b (2026-05-20). Marketing tone: skeptical, dry, honest — Western/RDR2 aesthetic.
