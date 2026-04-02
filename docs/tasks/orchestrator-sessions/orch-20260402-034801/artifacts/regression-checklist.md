# Regression Checklist

**Date:** 2026-04-02  
**Session:** orch-20260402-034801  
**Task:** 11_regression-review-packet

---

## Purpose

Define every verification area that later implementation review agents must check before marking a trainer task complete. Each check is binary: pass or fail, with specific evidence required.

---

## Area 1: Timer Behavior (FR-001)

Normal csTimer operation must not be affected by trainer presence.

| # | Check | Evidence Required |
|---|-------|-------------------|
| T-1 | Default timer UI loads unchanged when trainer is not entered | Screenshot of normal timer on fresh load |
| T-2 | Entering trainer mode does not modify csTimer's `session` keys | Before/after diff of `session*` storage keys |
| T-3 | Exiting trainer mode returns user to the timer with no residual state | Screen recording or manual test note |
| T-4 | Timer solve capture still works normally after trainer session completes | Capture a solve post-trainer and verify it appears in session history |
| T-5 | Inspecting timer works during trainer drills | Manual test with inspection enabled |

---

## Area 2: Scramble Behavior (FR-003, FR-004)

Scrambles must be generated correctly for each drill type.

| # | Check | Evidence Required |
|---|-------|-------------------|
| S-1 | `from-case` scrambles produce a cube state matching the target case | Verify 3+ case-specific scrambles against known case states |
| S-2 | `full-solve` scrambles produce a fully scrambled cube | Verify 3+ cross-drill scrambles result in a full scramble state |
| S-3 | Scramble generation does not mutate csTimer's scramble cache or `cachedScr` key | Before/after diff of `cachedScr` storage key |
| S-4 | Scrambles for OLL/PLL cases reference valid case IDs from the catalog | Cross-check scramble requests against `CaseCatalog` caseId list |
| S-5 | Cross drill scrambles respect `CrossScrambleOptions` | Verify output differs for different color or difficulty options |

---

## Area 3: Solve-History Compatibility (FR-006)

Trainer must not corrupt, overwrite, or depend on csTimer solve records.

| # | Check | Evidence Required |
|---|-------|-------------------|
| H-1 | Trainer never writes to `session_XX_YY` keys | Grep all trainer code for `session_` storage writes |
| H-2 | Trainer never writes to `sessionData` property | Grep all trainer code for `sessionData` storage writes |
| H-3 | Trainer attempt linkage stores its own metadata, not raw solve format | Inspect `AttemptCapture` shape |
| H-4 | Completing a trainer session does not alter existing csTimer session list | Before/after diff of `session*` keys and `properties` |
| H-5 | Solve-only export still parses correctly when trainer data exists locally | Export with trainer data present and verify solve-only consumers can parse it |

---

## Area 4: Trainer Persistence (FR-006)

All trainer data must persist correctly and degrade gracefully.

| # | Check | Evidence Required |
|---|-------|-------------------|
| P-1 | `trainer:profile` survives page reload | Set profile, reload, verify match |
| P-2 | `trainer:plans` survives page reload | Create plan, reload, verify plan present |
| P-3 | `trainer:stats` updates after drill attempts | Complete a drill, reload, verify stats array updated |
| P-4 | `trainer:sessions` stores completed session results | Finish a session, reload, verify session result in array |
| P-5 | `trainer:activePlanId` reflects the currently selected plan | Set active plan, reload, verify ID matches |
| P-6 | All `trainer:*` keys appear in `kernel.js` valid-key allowlist | Grep `kernel.js` for trainer keys |
| P-7 | Fallback cleanup does not purge `trainer:*` keys | Run fallback cleanup and verify trainer keys survive |
| P-8 | Storage failure degrades to in-memory and never blocks csTimer | Simulate quota failure and verify timer still works |

---

## Area 5: Export/Import (FR-006)

Export/import must be round-trip correct and fault tolerant.

| # | Check | Evidence Required |
|---|-------|-------------------|
| E-1 | Export produces `$.trainer` with `version`, `exportedAt`, `profile`, `plans`, `stats`, `sessions` | Inspect exported JSON structure |
| E-2 | Export -> clear -> import -> export produces identical trainer block | Diff of trainer blocks |
| E-3 | Import with no trainer block leaves existing trainer data untouched | Import solve-only file and verify trainer keys preserved |
| E-4 | Import with corrupt trainer block logs warning and solve import still succeeds | Inject bad payload and verify import completes |
| E-5 | Import with wrong version does not overwrite existing trainer data | Import `version: 99` and verify trainer keys unchanged |
| E-6 | Import with empty arrays intentionally clears matching trainer collections | Import empty stats/sessions and verify keys are overwritten with empty arrays |
| E-7 | Unicode in profile or plan names survives round-trip | Create non-ASCII names, export/import, verify |
| E-8 | Trainer block remains reasonably sized | Measure trainer block size and note if near 1 MB |

---

## Area 6: Offline Assumptions (FR-006)

| # | Check | Evidence Required |
|---|-------|-------------------|
| O-1 | Trainer works with no network | Disable network and run a full session |
| O-2 | Trainer data survives browser restart | Complete session, close browser, reopen |
| O-3 | Trainer data survives csTimer code update | Simulate update scenario and verify trainer keys intact |
| O-4 | Fresh browser initializes trainer to defaults with no errors | New browser profile entering trainer |
| O-5 | Export/import works fully offline | Disable network, export, clear, import |

---

## Area 7: Planner Logic Correctness (FR-003)

| # | Check | Evidence Required |
|---|-------|-------------------|
| L-1 | `generateQueue()` produces deterministic output for identical inputs | Call twice with same args and diff output |
| L-2 | Weakness formula uses all six factors with correct weights | Unit test for each factor contribution |
| L-3 | Cold-start cases receive the documented neutral tier treatment | Unit test with `attemptCount = 0` |
| L-4 | Coverage floor guarantees minimum non-top-weakness representation | Unit test verifying at least 20 percent non-top cases |
| L-5 | No case appears more than 3 times consecutively | Unit test scanning generated queue |
| L-6 | Per-session case cap is enforced for PLL/OLL queues | Unit test with bounded session length |
| L-7 | Session mode coefficient tables are respected | Unit test for standard, speed, accuracy |
| L-8 | Planner code never reads storage or DOM directly | Grep planner files for `storage`, `localStorage`, `document`, `window` |

---

## Area 8: Session Review Output (FR-005)

| # | Check | Evidence Required |
|---|-------|-------------------|
| R-1 | `TrainingSessionResult` contains `weakCases` and `strongCases` | Inspect output shape |
| R-2 | Weak-case tagging uses the 150 percent threshold rule | Unit test for weak tagging |
| R-3 | Strong-case tagging uses the 85 percent threshold rule | Unit test for strong tagging |
| R-4 | `nextRecommendation` matches defined rule branches | Unit test for each recommendation branch |
| R-5 | Session result writes to `trainer:sessions` on completion | Verify storage key updated after session end |

---

## Area 9: UI Surface Alignment (FR-001, FR-002, FR-003, FR-005)

UI tasks must be verified against the approved stable mockups, not just judged by behavior.

| # | Check | Evidence Required |
|---|-------|-------------------|
| U-1 | Trainer entry matches `docs/mockups/trainer-entry.html` and includes the three v1 goal options | Screenshot set plus comparison note against the stable mockup |
| U-2 | Training plan setup matches `docs/mockups/training-plan-setup.html` and only wires approved v1 controls | Screenshot set plus note listing any visible but disabled future controls |
| U-3 | Active session matches `docs/mockups/active-session-queue.html`, including queue sidebar, timer workspace, and action set | Screenshot set or short recording of an active drill |
| U-4 | Session review matches `docs/mockups/session-review.html`, including summary row, hardest-cases section, results table, and CTA set | Screenshot set plus note mapping rendered metrics to data fields |
| U-5 | Weakness summary matches `docs/mockups/weakness-summary.html`, including tabs, confidence panels, ranking table, and drill actions | Screenshot set plus note explaining any sparse-data placeholder states |
| U-6 | UI review explicitly uses the approved stable unprefixed V2 mockups, not archived `v1_*` artifacts | Reviewer note naming the binding mockup files used for comparison |

---

## Area 10: Cross-Cutting Checks

| # | Check | Evidence Required |
|---|-------|-------------------|
| X-1 | No domain code imports csTimer globals | Grep domain files for forbidden imports |
| X-2 | No domain code imports Convex, Next.js, or React | Grep domain files for framework imports |
| X-3 | Domain types are plain objects, not classes | Inspect type definitions |
| X-4 | `StorageAdapter` implements all methods from the documented interface | Interface checklist against implementation |
| X-5 | `ExportBridge` injects and reads trainer block correctly | Code review of export/import hooks |
| X-6 | Trainer UI mount points do not modify default timer DOM | Inspect mount functions for DOM scope |
