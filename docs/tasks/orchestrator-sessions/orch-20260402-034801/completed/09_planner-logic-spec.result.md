# Task 09 Result: Planner Logic Specification

**Task:** 09_planner-logic-spec
**Status:** Complete
**Date:** 2026-04-02

---

## Artifacts Produced

| Artifact | Path | Purpose |
|---|---|---|
| Planner Logic Spec | `docs/architecture/planner-logic-spec.md` | Full spec for weakness scoring, weighting, anti-starvation, session structure, and review alignment |

---

## Summary

### Weakness Scoring

- Four-factor weighted formula: normality (0.40), recency (0.25), failure/DNF rate (0.20), trend penalty (0.15)
- Cold-start handling: unpracticed cases get median difficulty tier weight
- Output normalized to `[0, 1]`

### Weighting Rules

- `weakCaseBias` knob controls how much weakness influences queue order (0.0 = uniform, 1.0 = full weakness)
- `coverageFloor` guarantees minimum 20% of queue from non-top-weakness cases
- `sessionMode` adjusts factor weights: standard, speed, accuracy

### Anti-Starvation Behavior

1. Coverage floor: 20% of queue must come from non-top-weakness cases
2. Recency bump: never-practiced cases get max recency score
3. Max 3 consecutive repeats per case
4. 30% per-session cap on any single case

### Session Structure

Four-block split: warmup (~15%, low-difficulty rhythm), focus (~55%, adaptive weakness-driven), integration (~20%, random variation), review (~10%, no solves, artifact generation)

Goal-specific adjustments: returning cuber gets longer warmup and moderate bias; cross skips warmup and adjusts block proportions.

### Review Alignment

- Weak cases: session solve time >150% of historical average, or DNF
- Strong cases: session solve time <85% of historical average, no DNF
- Next recommendation: short actionable string derived from session patterns
- Stats update path: session result → StorageAdapter → SkillStats → next generateQueue()

---

## Scope Compliance

- **In scope:** v1 weakness formula, weighting knobs, anti-starvation rules, session block sequencing, review output definition, goal-specific behavior
- **Out of scope:** ML/predictive models, spaced repetition (SM-2), user-adjustable coefficients, cross-case correlation, multi-session planning
- **Feature creep check:** No ML, no SM-2, no curriculum paths — kept to simple linear recency decay and straightforward weighted formula per avoid-feature-creep guidance

---

## Dependencies Satisfied

- T05 (Architecture): `WeaknessScore`, `SkillStats`, `FocusSettings`, `generateQueue()` types all referenced and aligned
- T07 (Taxonomy): Recognition sub-groups used for review recommendations; difficulty tiers used for warmup selection and cold-start defaults

---

## Downstream Impact

| Task | What this enables |
|---|---|
| T10 UI Packets | UI can display weakness scores, session blocks, and review recommendations |
| T11 Regression Review | Verification matrix can test weighting formula, anti-starvation rules, and review thresholds |

---

## Review Checkpoint

**User approval required** on training philosophy and weighting logic before implementation briefs are created.

Key decisions:
1. Weight coefficients (w1=0.40, w2=0.25, w3=0.20, w4=0.15)
2. Anti-starvation rules (coverage floor 20%, max 3 consecutive, 30% per-session cap)
3. Four-block session structure
4. Cold-start defaults (median difficulty tier weight)
5. Review weak/strong thresholds (150%/85% of historical average)
