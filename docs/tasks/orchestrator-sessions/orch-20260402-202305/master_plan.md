# Build Orchestrator Session Master Plan

**Session ID:** `orch-20260402-202305`  
**Mode:** Takomi execution orchestrator  
**Project:** csTimer Trainer build session

## Purpose

Run the first real implementation orchestration cycle for csTimer Trainer using the completed planning bundle as the baseline.

This session is for:
- actual feature build delegation
- review and correction loops
- docs sync
- task state movement through `pending`, `in-progress`, and `completed`

This session is not for:
- restarting the PRD process
- reopening settled scope unless a blocker forces it

## Baseline Inputs

- `docs/project_requirements.md`
- `docs/Coding_Guidelines.md`
- `docs/features/TrainerV1.md`
- `docs/architecture/domain-boundaries.md`
- `docs/architecture/persistence-plan.md`
- `docs/architecture/export-import-compatibility.md`
- `docs/architecture/case-taxonomy.md`
- `docs/architecture/planner-logic-spec.md`
- `docs/mockups/*.html`
- prior planning session `orch-20260402-034801`

## Execution Order

`B00 preflight -> B01/B02/B03 infrastructure -> B04 shared shell -> B05 entry + weakness summary -> B06 plan setup -> B07 active session -> B08 post-session review + cross workflows -> B09 regression + round-trip verification -> B10 docs/final synthesis`

## Parallelism Rules

- `B01`, `B02`, and `B03` may run in parallel once the schema and write ownership are clear.
- `B04` starts only after infrastructure contracts are stable enough for UI to consume.
- `B05` may combine the trainer entry home and weakness summary because both are first-user-visible surfaces.
- `B06` stays after `B05`.
- `B07` stays after `B06` plus approved planner and persistence behavior.
- `B08` stays after `B07`.
- `B09` runs after the main build wave and after meaningful feature merges.
- `B10` runs after approved implementation and review work.

## Task Registry

| ID | Task | Depends On | Workflow | Review Gate |
| :--- | :--- | :--- | :--- | :--- |
| B00 | Build-session preflight | none | `mode-orchestrator` + `vibe-primeAgent` | approve baseline before coding |
| B01 | StorageAdapter and export bridge foundation | B00 | `mode-code` / build | approve storage safety |
| B02 | CaseCatalog and provenance foundation | B00 | `mode-code` / build | approve catalog shape |
| B03 | Planner core and `generateQueue()` | B00,B02 | `mode-code` / build | approve planner output |
| B04 | Shared trainer shell and integration helpers | B01,B02,B03 | `mode-code` / build | approve integration surface |
| B05 | Trainer entry home and weakness summary | B04 | `vibe-design` reference + build | approve mockup fidelity |
| B06 | Training plan setup | B05 | `vibe-design` reference + build | approve flow before active session |
| B07 | Active session and PLL/OLL training flow | B01,B02,B03,B04,B06 | build | approve active-session behavior |
| B08 | Session review and cross drill workflows | B07 | build | approve review and cross scope |
| B09 | Regression review and round-trip verification | B01-B08 | `mode-review` | approve stability |
| B10 | Docs sync and release-ready synthesis | B03-B09 | `vibe-syncDocs` + orchestrator | approve final state |

## Review Policy

- Nothing is marked complete until reviewed against the matching FRs, docs, and mockups.
- The orchestrator may fix code, docs, or organization issues after review.
- Task files move only when status truly changes.

## Additional Execution Rules

- Infrastructure agents must keep trainer data under `trainer:*` and never write into raw solve-history keys.
- UI agents must build against the stable unprefixed mockups in `docs/mockups/` and route through the shared trainer shell instead of attaching ad hoc DOM fragments.
- Final approval requires both regression evidence and export/import round-trip confidence.
