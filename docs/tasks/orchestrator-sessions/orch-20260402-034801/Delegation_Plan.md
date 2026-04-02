# Delegation Plan

**Session:** `orch-20260402-034801`  
**Status:** Final orchestration bundle ready for delegation

---

## Purpose

Translate the completed orchestration work into a concrete next-wave build order so separate agents can execute without re-planning the product.

## Preconditions

Before delegating build work, every implementing agent must load:

1. `docs/project_requirements.md`
2. `docs/Coding_Guidelines.md`
3. `docs/features/TrainerV1.md`
4. the relevant `docs/issues/FR-XXX.md`
5. the matching packet in `docs/tasks/orchestrator-sessions/orch-20260402-034801/artifacts/`
6. the approved stable mockup in `docs/mockups/` for UI work

## Recommended Build Waves

### Wave 1: Core infrastructure

Run these first because every later trainer surface depends on them.

1. Implement the `StorageAdapter` and export/import bridge from the persistence plan
2. Bundle the normalized `CaseCatalog` and provenance-backed data structures
3. Implement `generateQueue()` and supporting planner logic

### Wave 2: Shared trainer shell

After the interfaces above are stable:

1. Build Packet 00 shared shell and trainer integration helpers

### Wave 3: First user-visible surfaces

These can be parallelized after Wave 2:

1. Build Packet 01 trainer entry home
2. Build Packet 05 weakness summary

### Wave 4: Plan setup

After Packet 01 is approved:

1. Build Packet 02 training plan setup

### Wave 5: Active training flow

After Packet 02, planner, storage, and catalog are verified:

1. Build Packet 03 active session

### Wave 6: Post-session review

After Packet 03 is working:

1. Build Packet 04 session review

### Wave 7: Full regression review

After the main build wave:

1. Run the Task 11 verification packet across all implemented surfaces and integrations

## Parallelization Notes

### Safe to parallelize

- StorageAdapter implementation and catalog implementation
- Catalog implementation and planner implementation, once catalog schema is fixed
- Packet 01 and Packet 05, after Packet 00 is complete

### Keep sequential

- Packet 02 after Packet 01
- Packet 03 after Packet 02 plus planner/persistence readiness
- Packet 04 after Packet 03
- final approval after Task 11 verification evidence is collected

## Recommended Review Gates

1. Approve storage/export behavior before major UI delegation
2. Approve planner output before active-session work
3. Approve Packet 01 before Packet 02
4. Approve Packet 02 before Packet 03
5. Approve Packet 03 before Packet 04
6. Run the regression packet before calling the implementation wave complete

## Delegation Notes By Area

### Infrastructure agents

- must not write trainer data into raw solve-history keys
- must keep trainer data under `trainer:*`
- must preserve offline-first behavior

### UI agents

- must build against the stable unprefixed V2 mockups only
- must not improvise new v1 controls
- must route through the shared trainer shell instead of attaching ad hoc DOM

### Review agents

- must use `artifacts/regression-checklist.md`
- must use `artifacts/fr-to-verification-mapping.md`
- must use `artifacts/evidence-expectations.md`

## Final Recommendation

Start with an implementation wave centered on infrastructure plus the shared shell, then move into user-visible UI slices. Do not start Packet 03 first; it has the highest dependency load and the greatest regression risk.
