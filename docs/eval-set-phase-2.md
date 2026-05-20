# Phase 2 Benchmark Eval-Set (5 URLs)

**Purpose:** Empirical resolution of `scoring-framework.md` §8 #1 (single-call vs per-criterion prompting). **NOT** full calibration — that is Phase 6 with 15 URLs and labels.

**Labelling rule:** Each URL gets an `expected_score_range` (low–high) per reviewer judgment using the §3 rubric. URLs picked **before** any AI run to prevent rubric-gaming.

| # | Bucket | URL | Expected range | Why chosen |
|---|--------|-----|----------------|------------|
| 1 | Gold | `<TBD-A>` | 75–95 | `<one-line>` |
| 2 | Gold | `<TBD-B>` | 75–95 | `<one-line>` |
| 3 | Snake-Oil | `<TBD-C>` | 5–30 | `<one-line>` |
| 4 | Snake-Oil | `<TBD-D>` | 5–30 | `<one-line>` |
| 5 | Ambiguous | `<TBD-E>` | 35–65 | `<one-line>` |

**Sourcing:** German Rauhut hand-picks the 5 URLs before Task 5 runs. Each line filled in this file with concrete URL + range + rationale. Selection criteria:

- **Known Gold (2):** Established providers with clear pricing + named methodology + visible refund policy.
- **Known Snake-Oil (2):** Public-callout targets OR known German coaching with hidden price + lottery-style income claims.
- **Ambiguous (1):** Real-world German coaching offer where reasonable people disagree.

**Sequencing:** This file is a slot-template — Tasks 2, 3, 4 do not depend on URL choice. Task 5 (benchmark execution) prompts the User if any row is still `<TBD-*>`.
