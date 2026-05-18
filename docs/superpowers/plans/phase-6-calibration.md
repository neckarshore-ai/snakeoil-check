# Phase 6 — Scoring Calibration (STUB)

> **STATUS:** Stub — to be filled in parallel with Phase 5.

## Goal

Calibrate the scoring framework against 15 manually-labeled eval cases so that paid users get defensible scores from day one.

## Scope

| # | Component | Notes |
|---|-----------|-------|
| 1 | Eval-Set Collection | 5 known-gold + 5 known-snake-oil + 5 ambiguous URLs. Per case: expected score range, expected tendency, rationale |
| 2 | Eval Runner Script | `pnpm tsx scripts/run-eval.ts` — runs all 15 cases through current rubric, prints diff vs expected |
| 3 | Calibration Round 1 | Initial run, identify misses, adjust weights, re-run. Target: ≤2 misses, no false-negative on snake-oil |
| 4 | Document Calibration Results | Append to `docs/decisions.md` (D-series) — weight changes, rationale, before/after scores |
| 5 | Rubric Version Bump | Bump `rubric_version` in DB column; new checks use new version, old checks retain old |
| 6 | Quality Gate Wire-Up | Workflow `await humanApproval()` step active for first 50 paid checks (Decision D10) |
| 7 | Spot-Check Tooling | Lightweight admin UI to view recent checks, score-breakdowns, and override if needed |

## Definition of Done

- 15 eval cases collected and labeled
- All 15 run through rubric with ≤2 misses
- No "Known Snake-Oil" case scores >50 (critical-fail criterion)
- Weight changes documented in decisions.md
- Quality-gate step active in Workflow for paid tier
- User says "PASS"

## Dependencies

- Phase 2 Done (Workflow + scoring code)
- 15 candidate URLs identified (started during Phase 2-3)
- German Rauhut available for ~4-6h focused calibration session
