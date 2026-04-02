# Upstream-Friendly Slices

**Session:** `orch-20260402-034801`

---

## Purpose

Separate fork-only trainer product work from later slices that could plausibly be proposed upstream to csTimer after validation in the fork.

## Upstream-Friendly Later

These are the best candidates for later upstream discussion because they improve host capabilities without requiring the full trainer product vision.

1. Metadata-safe browser storage and export hooks for `trainer:*`-style extension blocks
2. Allowlist and cleanup behavior that preserves namespaced extension keys
3. Generic integration hooks for mounting additive feature surfaces without mutating the default timer flow
4. Reusable queue-weighting extension points, if they can be expressed without trainer-specific UX assumptions
5. Generic stats and review plumbing that does not hard-code the csTimer Trainer product language

## Fork-Only For V1

These should remain fork-only because they are part of the trainer product identity, not generic csTimer platform work.

1. Trainer home surface and the full V2 editorial UI direction
2. Goal-first trainer flow (`returning`, `last-layer`, `cross`)
3. Structured training plan templates such as `Quick Review`, `Full Rotation`, and `Weakness Blitz`
4. Persistent weakness-summary dashboard and opinionated session review UX
5. Source-backed catalog curation and recommendation packaging
6. Adaptive coach framing, progression language, and future gamified/product layers

## Conditional Upstream Candidates

These are possible only after the fork proves them useful and they are stripped of trainer-specific product assumptions.

1. Pure planner primitives for weighted repetition and anti-starvation
2. Generic result-summary shapes for drill-style practice modes
3. Adapter boundaries that let new practice modules integrate without touching core solve storage

## Recommendation

Treat the fork as the proving ground. Ship trainer product work in the fork first, then extract the smallest host-safe primitives only after they are stable, generic, and clearly valuable to csTimer outside this product direction.
