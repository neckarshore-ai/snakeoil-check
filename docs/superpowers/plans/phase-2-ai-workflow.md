# Phase 2 — AI + Workflow Backbone (STUB)

> **STATUS:** Stub — to be filled in detail after Phase 1 ships and Phase 1 learnings are folded in.

## Goal

Build the AI analysis pipeline end-to-end as a durable Vercel Workflow: a check submitted with a URL produces a saved `Check` row with scored `criterion_scores` and a rendered Markdown report, with retries and observability.

## Scope

| # | Component | Notes |
|---|-----------|-------|
| 1 | Scraping module | `fetch` + `cheerio`. Extract title, headings, body text, testimonial blocks, pricing mentions. Output normalized text (3-20k chars). Cap at 50k input chars before AI. |
| 2 | Vercel AI Gateway client | Provider-string `"anthropic/claude-sonnet-4.5"`. Structured output via JSON schema. Temperature 0. |
| 3 | Scoring rubric in TypeScript | 12 criteria from `docs/scoring-framework.md` encoded as a typed array with weights. JSON-schema for AI structured output generated from the same source. |
| 4 | Vercel Workflow | 5 steps: scrape → classify → analyze → aggregate → notify. Each step idempotent. Max 3 retries with exponential backoff per step. |
| 5 | Persistence | New `checks`, `criterion_scores`, `reports` tables (migration `0001_checks.sql`). Workflow writes to DB at each step boundary. |
| 6 | Internal test harness | `pnpm tsx scripts/run-check.ts <url>` runs the full workflow against a URL and prints the report. Used for manual smoke tests. |
| 7 | Free-Shot variant | Smaller prompt covering top-5 criteria (#1, #4, #7, #10, #11) to control cost. |

## Definition of Done

- One real salespage URL runs end-to-end and produces a saved Check
- Workflow recovers from a simulated mid-step failure (retry succeeds)
- AI cost per check measured and documented (target <0.06 €)
- Vitest coverage on `src/lib/scoring/`, `src/lib/scraping/` ≥80%
- One Playwright e2e: submit URL via internal test page → poll → see report
- User says "PASS"

## Dependencies

- Phase 1 Done (Next.js scaffold, DB, CI, deploy pipeline)
- Eval-Set planning started (5 known-gold URLs identified for first manual test)
- Decision on single-call vs per-criterion prompting (see `scoring-framework.md` §8 #1)

## To Be Written

Full plan with tasks, files, step-by-step code, and TDD cycle — to be authored by MASCHIN after Phase 1 reaches "Done".
