# FR-to-Verification Mapping

**Date:** 2026-04-02  
**Session:** orch-20260402-034801  
**Task:** 11_regression-review-packet

---

## Purpose

Map each functional requirement to the specific regression checks it must pass. Implementation agents use this to know which checks are relevant to their assigned FR.

---

## FR-001: Trainer Entry and Goal Selection

**Regression areas:** Timer Behavior, UI Surface Alignment

| Check ID | Check | Relevance |
|----------|-------|-----------|
| T-1 | Default timer UI loads unchanged when trainer is not entered | Core - entry must not break default |
| T-2 | Entering trainer mode does not modify csTimer's `session` keys | Core - entry must be read-only on solve data |
| T-3 | Exiting trainer mode returns user to the timer with no residual state | Core - clean exit path |
| U-1 | Trainer entry matches the approved stable mockup and includes three goal options | Core - design and scope compliance |
| U-6 | Review uses the stable unprefixed V2 mockups | Supporting - prevents stale design drift |
| X-6 | Trainer UI mount points do not modify default timer DOM | Supporting - mount isolation |

**Evidence priority:** Screen recording plus screenshots compared against `docs/mockups/trainer-entry.html`.

---

## FR-002: Structured Training Plans

**Regression areas:** Trainer Persistence, UI Surface Alignment

| Check ID | Check | Relevance |
|----------|-------|-----------|
| P-2 | `trainer:plans` survives page reload | Core - plan must persist |
| P-5 | `trainer:activePlanId` reflects the current plan | Core - active plan tracking |
| U-2 | Training plan setup matches the approved stable mockup and only wires supported v1 controls | Core - setup scope and UI compliance |
| E-2 | Round-trip export/import preserves plans | Supporting - plans survive export |
| E-7 | Unicode in plan names survives round-trip | Edge case |
| L-1 | Planner output is deterministic for identical plan inputs | Supporting - plan drives queue |

**Evidence priority:** Create plan, reload, verify, plus screenshots of the setup surface state.

---

## FR-003: Adaptive Last-Layer Drill Queue

**Regression areas:** Planner Logic, Scramble Behavior, UI Surface Alignment

| Check ID | Check | Relevance |
|----------|-------|-----------|
| L-1 | `generateQueue()` is deterministic | Core - pure function |
| L-2 | Weakness formula uses all six factors with correct weights | Core - scoring accuracy |
| L-3 | Cold-start behavior follows the documented rule | Core - zero-attempt handling |
| L-4 | Coverage floor is enforced | Core - anti-starvation |
| L-5 | Max consecutive repeats rule is enforced | Core - anti-starvation |
| L-6 | Per-session case cap is enforced | Core - anti-starvation |
| L-7 | Session mode coefficients are correct | Supporting - mode switching |
| L-8 | Planner never imports storage or DOM | Core - purity |
| S-1 | `from-case` scrambles produce the requested case state | Core - scramble accuracy |
| S-4 | Scramble requests reference valid case IDs | Supporting - catalog integration |
| U-3 | Active session matches the approved stable mockup layout and controls | Supporting - UI fidelity for queue/session flow |
| X-1 | Domain code does not import csTimer globals | Core - boundary compliance |

**Evidence priority:** Planner unit tests, scramble verification, and active-session screenshots or recording.

---

## FR-004: Cross Drill Workflows

**Regression areas:** Scramble Behavior, Session Review Output, UI Surface Alignment

| Check ID | Check | Relevance |
|----------|-------|-----------|
| S-2 | `full-solve` scrambles produce a full scramble | Core - cross scramble |
| S-5 | Cross scrambles respect options | Supporting - configuration |
| R-1 | `TrainingSessionResult` contains required weak/strong fields | Supporting - review output |
| R-5 | Session result writes to `trainer:sessions` | Supporting - persistence |
| U-3 | Active session matches the approved stable mockup layout and controls | Supporting - shared drill surface |

**Evidence priority:** Cross scramble verification plus session screenshots or recording.

---

## FR-005: Skill Stats and Session Review

**Regression areas:** Session Review Output, Trainer Persistence, UI Surface Alignment

| Check ID | Check | Relevance |
|----------|-------|-----------|
| R-1 | `TrainingSessionResult` contains `weakCases` and `strongCases` | Core - output shape |
| R-2 | Weak-case tagging uses the 150 percent threshold | Core - threshold accuracy |
| R-3 | Strong-case tagging uses the 85 percent threshold | Core - threshold accuracy |
| R-4 | `nextRecommendation` matches defined conditions | Core - recommendation logic |
| R-5 | Session result writes to `trainer:sessions` | Core - persistence |
| P-3 | `trainer:stats` updates after drill attempts | Core - stats accumulation |
| P-4 | `trainer:sessions` stores completed results | Core - result storage |
| U-4 | Session review matches the approved stable mockup structure | Core - review readability and content hierarchy |
| U-5 | Weakness summary matches the approved stable mockup structure | Core - persistent insight surface |
| E-2 | Round-trip export/import preserves session results | Supporting - export safety |

**Evidence priority:** Threshold unit tests plus screenshots of review and weakness-summary surfaces.

---

## FR-006: Local-First Persistence and Export Compatibility

**Regression areas:** Trainer Persistence, Export/Import, Offline Assumptions, Solve-History Compatibility

| Check ID | Check | Relevance |
|----------|-------|-----------|
| P-1 through P-8 | All persistence checks | Core - persistence correctness |
| E-1 through E-8 | All export/import checks | Core - export correctness |
| O-1 through O-5 | All offline checks | Core - offline guarantees |
| H-1 through H-5 | Solve-history compatibility checks | Core - no corruption |
| X-4 | `StorageAdapter` implements the full interface | Core - contract compliance |
| X-5 | `ExportBridge` injects and reads the trainer block correctly | Core - bridge correctness |

**Evidence priority:** Reload tests, full round-trip, corrupt and missing block import, and offline run.

---

## FR-007: Source-Backed Case Catalog

**Regression areas:** Scramble Behavior, Planner Logic, Cross-Cutting

| Check ID | Check | Relevance |
|----------|-------|-----------|
| P-6 | `trainer:catalogVersion` is preserved by allowlist cleanup rules | Core - catalog version tracking |
| S-4 | Scramble requests reference valid case IDs | Supporting - catalog validity |
| L-3 | Cold-start behavior uses catalog difficulty data | Supporting - catalog integration |
| X-1 | Domain or catalog code does not import csTimer globals | Core - boundary compliance |

**Evidence priority:** Catalog loads cleanly and all referenced case IDs exist.

---

## Cross-Cutting Domain Rules

Applies to all FRs implementing domain-layer code.

| Check ID | Check | Applies To |
|----------|-------|------------|
| X-1 | No csTimer globals in domain code | FR-001 through FR-007 |
| X-2 | No Convex, Next.js, or React imports in domain code | FR-001 through FR-007 |
| X-3 | Domain types are plain objects | FR-002, FR-003, FR-005 |
| X-4 | `StorageAdapter` implements full interface | FR-002, FR-006 |
| X-5 | `ExportBridge` injects/reads trainer block | FR-006 |
| X-6 | Trainer UI mount points isolate DOM | FR-001 |

**Evidence priority:** Static analysis and interface checklist.

---

## Dependency Graph

```text
FR-007 (catalog) --> FR-003 (planner) --> FR-005 (review)
                              |
FR-006 (persistence) <--------+
                              |
FR-002 (plans) --> FR-003 --> FR-004 (cross)
                              |
FR-001 (entry) --> all UI surfaces
```

**Implication:** Review FR-006 first, then FR-007 and FR-003, then the UI-facing FRs.
