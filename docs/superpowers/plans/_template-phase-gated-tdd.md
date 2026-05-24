# Phase-Gated TDD-Disciplined Plan-Doc Template

> **Template version:** v1 (2026-05-24)
> **Empirical basis:** n=5 Plan-Docs shipped at snakeoil-check (Phase-1 + Phase-2-A) + dev-environment (omnopsis-planning Slot 5) + snakeoil-check (Phase-2-B1 + Phase-2-B2). The phase-gated structure (Phase 0 + Phase 1-N + Phase Final) is empirically present in 3 of 5 (B1 + B2 + dev-env). Phase-1 + Phase-2-A use task-numbered legacy shape. **Both shapes are valid — this template documents the phase-gated PRIMARY shape with task-numbered FALLBACK noted.**
> **Lock-status:** Template-Promote is `does_NOT_count_as_lock` per `lock_tracking` rule "plan-docs (reversible by re-write, not a Lock)". Template-deletion does not break existing Plan-Docs. Lock-zero streak preserved at promote-time.

---

## How To Use This Template

1. Copy this file: `cp _template-phase-gated-tdd.md YYYY-MM-DD-feature-name.md`
2. Replace every `[BRACKET-PLACEHOLDER]` with actual content
3. Delete sections marked `OPTIONAL — delete if N/A`
4. Run R2-fact-class-6 triple-source-check BEFORE filling Phase 0+
5. Adjust phase-count to actual scope (5-8 phases typical, do NOT pad)
6. Each Phase MUST have explicit DoD; if a phase has no DoD, it shouldn't be a phase
7. Keep `Plan-Doc Author Notes` section to track R2 application empirically

**When to use phase-gated PRIMARY shape (this template):**
- Production feature-class work (TDD-disciplined, integration-tested)
- Multi-day cross-session execution (Bob multi-terminal-session)
- Risk of partial-shipping (Phase 0 gating prevents wasted work)
- Pre-flight verification needed (env-vars, schema, sibling-doc dependencies)

**When to use task-numbered FALLBACK shape (NOT this template):**
- Foundation-setup work where phases collapse into linear tasks (Phase-1 foundation example)
- Single-session execution where Phase-gating overhead exceeds benefit
- Refactoring where the "Phase 0 verification" overlaps with the actual work

If in doubt, default to phase-gated PRIMARY (this template). Task-numbered FALLBACK is the exception, not the default.

---

# [Phase-X / Feature-Name] Implementation Plan

**Author:** [PERSONA] (Planning session YYYY-MM-DD letter-X)
**Date written:** YYYY-MM-DD
**Supersedes:** [Optional — list prior stubs/specs this Plan-Doc replaces, with archive-paths if applicable]
**Canonical Spec:** [Link to Design-Doc § N OR top-level spec — REQUIRED, no Plan-Doc without canonical spec]
**Sibling Plans:** [Optional — list Plan-Docs that are prerequisites OR depend on this one]
**Template basis:** [`_template-phase-gated-tdd.md`](./_template-phase-gated-tdd.md) — n=N empirical-shape application

> **Goal:** [ONE-paragraph statement of what this Plan-Doc delivers + the bounding anchors. Entry anchor = what must be true before this Plan starts. Exit anchor = what is true when this Plan is DONE.]

---

## Pivot-Context (read first) — OPTIONAL — delete if no pivot/supersession

This Plan-Doc covers [SCOPE]. Scope is bounded by two anchors:

1. **Entry anchor:** [Prereq-state — what must be LIVE/MERGED/verified]
2. **Exit anchor:** [Success-state — what is LIVE/MERGED/verified when Phase done]

**Not in this Plan-Doc:**
- [List 3-7 deferred items with explicit reason — "out of scope per Spec § N" OR "deferred to Phase Y" OR "operational not architectural"]

**N Decision-Needed defaults applied** (if Plan-Doc inherits from a Scope-Clarification Spec):

| # | Question | Default applied |
|---|----------|-----------------|
| 1 | [Decision-Q1] | ✅ [Default] |
| ... | ... | ... |

---

## Architecture Decisions Locked — OPTIONAL — delete if no inline ADs

| # | Decision | Source | Rationale |
|---|----------|--------|-----------|
| 1 | **[Decision]** | [Spec § N / advisor()-catch / etc.] | [1-2 sentence rationale] |
| 2 | ... | ... | ... |

**Note:** Architecture Decisions Locked HERE means "decisions inline to this Plan-Doc". If any decision is org-wide (R-Rule, AD-N, strategic D-N), it belongs in `decisions-architecture.md` NOT here. Plan-Doc-class decisions are reversible by Plan-Doc-re-write.

---

## Prerequisites — Write-Time vs Execution-Time

### Write-Time Preconditions (✅ ALL FILLED at Plan-Doc-write)

Required to write the Plan-Doc with concrete references + commands:

- [x] [Prereq-1: Sibling Plan-Doc exists at path X]
- [x] [Prereq-2: Canonical Spec § Y propagated to main]
- [x] [Prereq-3: Decision-Needed defaults set]
- [x] [Prereq-N: R2-fact-class-6 triple-source-check applied]

### Execution-Time Preconditions (Phase 0 RE-VERIFY before execution starts)

Required before this Plan-Doc's execution starts (separate session, NOT at write-time):

- [ ] [Prereq-1: Prior Plan-Doc MERGED + LIVE]
- [ ] [Prereq-2: Env-var / feature-flag in correct state]
- [ ] [Prereq-3: Stability window completed]
- [ ] [Prereq-N: Conversion/usage-baseline met]

---

## File Structure (decomposition before tasks)

```
[Use a tree-diagram showing all files this Plan-Doc creates/edits.
 Include comments on each file's purpose.
 Mark NEW / EDIT / EXTEND / DELETE explicitly.
 Include tests/ subtree.
 Include any config/script files.]
```

**~N new files + M edits.** [Zero / X] new DB migrations. [Zero / X] new API-routes.

---

## Phase 0 — Pre-Flight Verification (Gating, ~N min, NO code)

Phase 0 is the **gating phase**. If any Task 0.N fails, execution STOPS and surfaces to MASCHIN-handoff. Phase 0 must complete BEFORE any code is written.

### Task 0.1 — [Verification step 1, concrete command]

- [ ] `[bash command with expected output]` returns [expected result]
- [ ] If failed: [explicit STOP-action + handoff-instruction]

### Task 0.2 — [Verification step 2]

- [ ] [Concrete check]
- [ ] If failed: [explicit STOP-action]

### Task 0.N — [Additional verifications as needed]

- [ ] [Concrete check]

**Phase 0 DoD:** All N checks pass. NO code yet. If any check fails, [PERSONA] halts + surfaces to MASCHIN-handoff.

---

## Phase 1 — [First Substantive Phase] (~Nh)

Each Phase is TDD-disciplined: **failing-test FIRST commit + RED-gate transcript in commit-body**, then implementation, then test green. Phase has explicit DoD at end.

### Task 1.1 — [Concrete task, TDD: failing-test first]

- [ ] Write failing test: `[test-file-path]` asserts [behavior]
- [ ] RED-gate transcript in commit-body (`pnpm test [test-name]` → expect FAIL)
- [ ] Implement [code-file-path] to make test pass
- [ ] Test green: `pnpm test [test-name]` → PASS
- [ ] [Optional: integration / visual UAT step]

### Task 1.2 — [Next task]

- [ ] [Concrete TDD-disciplined step]

### Task 1.N — [Additional tasks as needed]

**Phase 1 DoD:** [Concrete success-criteria: tests pass + feature behaves as specified + any visual/integration checkpoints met]

---

## Phase 2 — [Next Substantive Phase] (~Nh)

[Same structure as Phase 1]

---

## Phase N — Post-Merge Smoke Tests (~Nh)

The **final phase** is post-merge smoke tests. Even Plan-Docs without explicit feature-shipping have a final-phase that verifies the work is integrated correctly.

### Task N.1 — E2E happy-path

- [ ] `pnpm test:e2e [happy-path-spec]` green
- [ ] Visual UAT on Vercel Preview URL

### Task N.2 — [Additional smoke / integration tests as needed]

### Task N.3 — Vercel Preview UAT (if applicable)

- [ ] [PERSONA / User-Action]: visit Preview URL, manually exercise the new flow
- [ ] Capture screenshot in PR comment for record

**Phase N DoD:** All smoke + UAT checks pass. Plan-Doc execution is complete.

---

## Phase X+1 — CONDITIONAL [Optional Phase Name] — OPTIONAL — delete if no conditional work

If a Phase is conditional (e.g., Apple-Pay/Google-Pay activation, Phase-Skip-on-pilot-recruitment-delay), document it explicitly as Phase X+1 CONDITIONAL with the **trigger-condition** stated.

### Trigger condition

This Phase activates ONLY when: [SPECIFIC CONDITION].

If trigger NOT met: Phase X+1 is DEFERRED. Plan-Doc still DONE without it.

### Task X+1.1 — [Conditional task]

- [ ] [Task as in regular Phase]

**Phase X+1 DoD:** [Conditional success-criteria]

---

## Success Criteria (Plan-Doc Done When)

1. **[Concrete deliverable 1]** (NOT a vague statement like "feature works" — must be testable)
2. **[Deliverable 2]**
3. **[Deliverable 3]**
4. ...
5. **CI green** on this PR including [any new gating-steps added in this Plan-Doc]
6. **[Stability window if applicable]** before declaring Plan-Doc-DONE

---

## Risks + Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|-----------|
| [Concrete risk 1, NOT "it might break"] | [Low/Med/High] | [Low/Med/High] | [Explicit pre-emptive action] |
| [Risk 2] | ... | ... | [Mitigation] |
| ... | ... | ... | ... |

**At least 3 risks required.** If you can't identify 3 risks, you haven't thought hard enough about what can go wrong.

---

## Cross-References

- **Canonical Spec:** [Link]
- **Scope-Clarification Spec:** [Link if applicable]
- **Sibling Plan-Docs:** [Links to prereq + dependent Plan-Docs]
- **Template basis:** [`_template-phase-gated-tdd.md`](./_template-phase-gated-tdd.md)
- **Archived prior stubs:** [Links to docs/archive/ if applicable]
- **CLAUDE.md context:** [Aesthetic-target, stack-decisions, AT-1 / AD-N references]
- **Bob-Brief / Persona-Brief context:** [Link to dispatch-brief if applicable]

---

## Estimated Effort

- **Phase 0** — ~Nmin (pre-flight verification only)
- **Phase 1** — ~Nh
- **Phase 2** — ~Nh
- ...
- **Phase N** — ~Nh (post-merge smoke)

**Total active-work:** ~N-Mh across ~N calendar-days [if pilot/UAT-gated, note that explicitly].

**Persona-split (if applicable):** [Phase 1-3 = Bob-execution, Phase 4-6 = MASCHIN+User] OR [single-persona-execution].

**Recommended sequencing:** [Single PR OR Multi-PR split with rationale]

---

## Out of Scope (Phase Y+ defers)

- ❌ [Item deferred to Phase Y, with explicit reason]
- ❌ [Item explicitly out-of-scope per Spec § N]
- ❌ ... [aim for 3-8 items; if fewer, scope is too broad; if more, scope is too narrow]

---

## Plan-Doc Author Notes (R2 fact-class 6 Application Log) — OPTIONAL — strongly recommended

**Pre-write R2-fact-class-6 triple-source-check executed YYYY-MM-DD letter-X:**

| Source | Reference | Verification |
|--------|-----------|--------------|
| Canonical Spec | [Spec § N] | ✅ [Verification method + result] |
| Scope-Clarification | [Spec link] | ✅ [Verification] |
| Plans-Index | plans/README.md row [N] | ✅ [Verification] |
| Sibling Plan-Docs | [B1 / B2 / etc.] | ✅ [Verification] |
| Archive State (if applicable) | docs/archive/ | ✅ [Verification] |

**Plan-Doc-Routing-Drift preflight:** [N drifts caught + fixed in same PR OR ZERO drift caught]. R2 fact-class 6 efficacy: this is n=N cross-session same-rule-application post-codify.

**Template basis confirmation:** This Plan-Doc is the [Nth] application of `_template-phase-gated-tdd.md`. [Note any shape-deviations from template + reason.]

---

## Cross-Class Shape Deviation Notes — OPTIONAL — delete if no deviations

If this Plan-Doc's work-class deviates from the template-baseline (e.g., dev-environment-bootstrap vs production-feature, refactoring vs new-feature, frontend vs backend), document the deviations explicitly:

| Slot | Template baseline | This Plan-Doc | Reason |
|------|-------------------|---------------|--------|
| Phase 0 character | Pre-Flight Verification (gating, NO code) | [E.g., Pre-Condition Design-Spike (gating, paper-design)] | [Reason] |
| Phase 3 presence | Always present | [E.g., N/A — work-class is 4-phase not 5+] | [Reason] |
| Branch model | Feature-branch + PR | [E.g., Direct-to-main per AD-27] | [Reason] |
| Specialist handoff | Bob / Linus terminal-session | [E.g., Inline single-persona execution] | [Reason] |
| Test framework | Vitest + Playwright | [E.g., Bash + manual-UAT] | [Reason] |

**Honest deviation-cataloging > silent force-fit.** If a phase doesn't fit, document the deviation, don't force-fit a phase that doesn't apply.

---

## Self-Review Checklist (run before MASCHIN PR-merge of this Plan-Doc)

Before opening the PR for this Plan-Doc:

- [ ] All `[BRACKET-PLACEHOLDER]` replaced with actual content
- [ ] All OPTIONAL sections either filled OR deleted (no stub-sections left)
- [ ] Every Phase has explicit DoD
- [ ] Every Task has TDD-failing-test-FIRST step (or explicit "no test needed" justification)
- [ ] Every Risk has explicit Mitigation
- [ ] Phase 0 has at least 3 verification-steps
- [ ] Phase N (final) is Post-Merge Smoke OR explicit "no smoke needed" justification
- [ ] Cross-References section links ALL referenced specs/plans (no dangling references)
- [ ] R2 fact-class 6 triple-source-check applied + documented in Author Notes
- [ ] Estimated Effort total is realistic (not aspirational — under-estimating burns trust)
- [ ] Out of Scope section has 3-8 items
- [ ] Architecture Decisions Locked are Plan-Doc-scope (NOT org-wide R-Rules / ADs / Ds)
- [ ] `./scripts/check-docs.sh` passes (link this file from plans/README.md)

---

**Template Author-Stamp:** This template was extracted 2026-05-24 letter-b from n=5 Plan-Docs (Phase-1 foundation + Phase-2-A foundation + Phase-2-B1 free-shot-funnel + Phase-2-B2 stripe-single-shot + dev-environment-bootstrap). Phase-gated PRIMARY shape (Phase 0 + 1-N + Final) holds in n=3 (B1 + B2 + dev-env). Task-numbered FALLBACK shape (Tasks 1-N, no Phase-numbering) holds in n=2 (Phase-1 + Phase-2-A). Both shapes are documented + valid per work-class.
