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

`B00 preflight -> B01/B02 foundation -> B03 entry/setup UI -> B04 drill queue -> B05 cross drills -> B06 review/stats UI -> B07 content normalization -> B08 export/import integration -> B09 regression review -> B10 docs/final synthesis`

## Parallelism Rules

- `B01` and `B02` may run in parallel if they keep disjoint write sets.
- `B03` may start after `B01` if it only consumes stable contracts.
- `B04` depends on `B01`, `B02`, and approved planner logic.
- `B05` depends on `B01`, `B02`, and the baseline drill framework from `B04`.
- `B06` depends on `B03`, `B04`, and `B05`.
- `B07` may run in parallel with core feature work once source packets exist.
- `B08` depends on `B02` and the trainer persistence model being implemented.
- `B09` runs after each meaningful feature merge and as a full pass before signoff.
- `B10` runs after every approved build slice and as a final cleanup pass.

## Task Registry

| ID | Task | Depends On | Workflow | Review Gate |
| :--- | :--- | :--- | :--- | :--- |
| B00 | Build-session preflight | none | `mode-orchestrator` + `vibe-primeAgent` | approve baseline before coding |
| B01 | Trainer domain and storage foundation | B00 | `mode-code` / build | approve contracts and storage behavior |
| B02 | Export/import and offline integration | B00 | `mode-code` / build | approve data safety |
| B03 | Trainer entry and plan setup UI | B01 | `vibe-design` reference + build | approve UI against mockups |
| B04 | Adaptive PLL/OLL drill queue | B01,B02 | build | approve queue behavior |
| B05 | Cross drill workflows | B01,B02,B04 | build | approve cross scope and UX |
| B06 | Session review and weakness summary | B03,B04,B05 | build | approve outputs and presentation |
| B07 | Source-backed catalog normalization | B00 + source packet | build/content | approve content structure |
| B08 | Trainer export/import round-trip completion | B02,B07 | build | approve compatibility |
| B09 | Regression and cleanup review | B03-B08 | `mode-review` | approve stability |
| B10 | Docs sync and release-ready synthesis | B03-B09 | `vibe-syncDocs` + orchestrator | approve final state |

## Review Policy

- Nothing is marked complete until reviewed against the matching FRs, docs, and mockups.
- The orchestrator may fix code, docs, or organization issues after review.
- Task files move only when status truly changes.
