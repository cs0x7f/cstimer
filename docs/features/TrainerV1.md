# TrainerV1 Feature Blueprint

## Goal

Define a fork-first training layer inside csTimer that helps users run structured sessions for 3x3 last layer and cross practice, while preserving current offline usage and existing solve-data behavior.

## User Outcome

The user should be able to:
- enter a trainer flow intentionally
- choose a training goal or template
- run a guided drill queue
- review weak cases and session takeaways
- keep trainer data locally and carry it through export/import later

## Components

### Client

- Trainer entry surface
- Goal and plan setup flow
- Active drill/session queue
- Session review and weakness summary surfaces
- Local persistence for trainer plans, stats, and summaries
- UI hooks into existing csTimer training/stat mechanisms where appropriate

### Server

- None required for v1
- Future sync and multiplayer should be modeled as optional later layers, not a v1 dependency

## Data Flow

1. User enters trainer mode and selects a goal or template.
2. Trainer resolves the next drills using normalized case metadata and weakness logic.
3. Drill results and relevant solve metadata update local trainer stats.
4. Session review summarizes outcomes and flags weak cases.
5. Trainer-specific data remains export/import aware and distinct from raw solve records.

## Domain Contracts

The trainer domain is defined by portable data types and pure functions that have no csTimer dependencies. Full type definitions are in `docs/architecture/domain-boundaries.md`.

### Portable Domain Types

| Type | Role | Key Fields |
|------|------|------------|
| `TrainingProfile` | User identity and preferences | `userId`, `preferredGoals`, `defaultSessionLength` |
| `TrainingPlan` | Complete session specification | `planId`, `templateId`, `goal`, `drillBlocks`, `focusSettings` |
| `DrillDefinition` | What the user does in a drill block | `drillId`, `type`, `caseSet`, `targetCount`, `scramblePolicy`, `captureFields` |
| `CaseCatalog` | Normalized case content with provenance | `caseId`, `category`, `name`, `algorithms`, `provenance`, `difficultyTier` |
| `SkillStats` | Per-case performance over time | `caseId`, `avgSolveTime`, `avgRecognitionTime`, `dnfRate`, `skipCount`, `trend`, `attemptCount` |
| `WeaknessScore` | Computed priority for adaptive scheduling | `caseId`, `score`, `reason` |
| `TrainingSessionResult` | Post-session review artifact | `sessionId`, `planId`, `drillResults`, `weakCases`, `strongCases`, `nextRecommendation` |
| `SyncEvent` (future) | Placeholder for post-v1 sync | Not yet defined |

### csTimer Integration Adapters

| Adapter | Depends On | Bridges To |
|---------|-----------|------------|
| `StorageAdapter` | csTimer browser storage | Domain persistence (concrete storage mechanism selected later; trainer key namespace remains separate) |
| `ScrambleAdapter` | csTimer scramble engine | Case-specific and full-solve scrambles |
| `TimerBridge` | csTimer timer UI | Normalized attempt capture linked back to native solves without rewriting raw solve history |
| `ExportBridge` | csTimer export/import format | Trainer data as separate JSON block |
| `TrainerShell` | Shared trainer mount container | Stable entry/setup/active/review surface slots |
| `TrainerIntegration` | StorageAdapter + CaseCatalog + Planner + TrainerShell | Session lifecycle, shell navigation helpers, and review shaping |

### Planner Logic

`generateQueue(trainingPlan, skillStats, caseCatalog, plannerContext)` - pure function, no side effects, no csTimer imports. Returns ordered `DrillQueue` based on plan structure and weakness scores.

Current v1 planner guarantees:
- requested attempt count is preserved in the returned queue
- standard sessions use warmup/focus/integration splits with review handled as post-session analysis, not queue items
- cross sessions use `full-solve` prompts and `planTime` targeting
- focus ordering applies weak-case bias, coverage floor, max-3 consecutive repeat protection, and per-session cap where feasible
- review helpers derive weak cases, strong cases, and next recommendation strings from finished session data

### Shared Shell Contract

- later trainer UI work mounts only through the shared shell, not direct one-off DOM insertion
- the shell owns stable surface slots for `entry`, `setup`, `active`, and `review`
- integration helpers expose shell init/navigation plus storage-backed session lifecycle helpers
- persisted `SkillStats.lastPracticedAt` stays in epoch milliseconds so planner recency scoring remains valid

### Current Shell-Backed Surfaces

- `trainer-entry-home.js` renders the first trainer landing surface from the stable mockup direction and is reachable through the explicit launcher created by `trainer-init.js`
- `trainer-setup.js` renders the training plan setup flow (B06) with template selection, session configuration, bounded case preview, and session summary. It adapts the same shell-backed flow for last-layer, returning, and cross entry goals, then persists a `TrainingPlan` before handing off to the active session surface.
- `trainer-active-session.js` renders the active drill queue surface (B07) for PLL, OLL, and cross practice. It consumes planner output from `trainer-integration.js`, uses the native csTimer scrambler registry with csTimer-aligned PLL/OLL case indexing for real case-correct scrambles, supports spacebar-driven start/finish timing through a document-level active-session key handler, keeps the current queue row scrolled into view as the session advances, and advances the queue into stored session results without mutating raw solve-history keys.
- `session-review.js` renders the post-session review surface (B08) from the approved mockup direction. It shows plan metadata, summary metrics, hardest cases, a full results table, and a next-step recommendation card. Review handoff preserves the originating goal so `Drill Weak Cases` routes back into the correct setup flow for both last-layer and cross sessions.
- `weakness-summary.js` renders the persistent weakness/stats surface and derives its values from persisted trainer sessions, stats, and catalog metadata
- `trainer-init.js` keeps B05 additive by opening the trainer in its own overlay shell; choosing `Timer` exits back to normal csTimer. Routes the `setup` surface to `trainer-setup.js` with fallback to placeholder if unavailable

### Native Integration Follow-Up

- The current overlay mount is now considered transitional, not the desired end state
- Native integration work is documented in `docs/features/TrainerNativeIntegration.md`
- Future trainer UI passes should target the native csTimer-mounted shell rather than further investing in the floating overlay frame

### Current Catalog Foundation

- **Implementation files:** `src/js/trainer/case-catalog-data.js` and `src/js/trainer/case-catalog.js`
- **Source-backed defaults:** PLL and OLL starter algorithms currently come from SpeedCubeDB PDF algorithm sheets, with provenance attached per case.
- **Cross representation:** cross entries are stored as scramble-generated drill descriptors with internal taxonomy provenance rather than borrowed solve algorithms.

### Persistence Expectations

- **Storage mechanism:** csTimer's `storage.js` abstraction via `storage.setKey()` / `storage.getKey()`. In the current repo that means IndexedDB when available, with `localStorage` fallback. Trainer uses `trainer:` prefixed keys and does not bypass the host storage layer.
- **Key layout:** `trainer:profile`, `trainer:plans`, `trainer:activePlanId`, `trainer:stats`, `trainer:sessions`, `trainer:catalogVersion`. All registered in `kernel.js` valid-key allowlist so fallback cleanup does not purge them.
- **Coexistence:** Trainer keys are separate from `session_XX_YY` solve chunks. Trainer never mutates csTimer solve records. Trainer linkage stores its own attempt metadata with optional native solve ID reference.
- **Export format:** Trainer block at `$.trainer` in the exported JSON, parallel to `$.properties` and `$.session*`. Export is additive across file export, csTimer/WCA-backed server upload-download, and Google Drive backup. A missing trainer block on import does not break solve import and does not clear existing trainer data.
- **Import confirmation:** the normal csTimer import confirmation now summarizes trainer impact too, including unchanged/no-trainer imports, default resets from an empty trainer block, ignored invalid trainer blocks, and overwrite counts for valid trainer imports.
- **Round-trip invariant:** export -> clear -> import -> export produces identical trainer data.
- **Offline-first:** All data in browser-local persistence through `storage.js`. No API calls. Degrades to in-memory if storage is unavailable.
- Full details: `docs/architecture/persistence-plan.md`
- Compatibility checklist: `docs/architecture/export-import-compatibility.md`

## UI Surfaces Status

All five v1 surfaces are implemented and shipped behind the overlay shell:

| Surface | Module | Status |
|---------|--------|--------|
| Trainer entry / goal selection | `trainer-entry-home.js` | Implemented (B05) |
| Training plan setup | `trainer-setup.js` | Implemented (B06) |
| Active session / drill queue | `trainer-active-session.js` | Implemented (B07) |
| Post-session review | `session-review.js` | Implemented (B08) |
| Weakness / stats summary | `weakness-summary.js` | Implemented (B05) |

### Surfaces Still Requiring Design Passes

- native csTimer-mounted shell (see `TrainerNativeIntegration.md`)
- mobile polish beyond functional responsive layout
- visual polish of case diagram placeholders in active session

## Regression Risks

- breaking normal timer entry and solve capture
- coupling trainer persistence too tightly to raw solves
- drifting from export/import compatibility
- adding UI without a mockup-driven flow
- over-designing for multiplayer or backend sync in v1

## V1 Boundaries

Included:
- 3x3 PLL training
- 3x3 OLL training
- cross drills
- weighted weak-case repetition
- post-session review planning

Excluded:
- Convex implementation
- live sync
- multiplayer
- standalone app rewrite
- smart-cube-required flows
- all-cubes/every-step curriculum
- X-cross optimization workflows
- virtual-cube-first practice surfaces

## Extraction Boundary Notes (FR-008 Path)

The domain layer is designed so that future extraction into a standalone TypeScript app requires replacing only the integration layer:

| What Moves | What Stays Behind |
|------------|-------------------|
| All domain types (plain objects) | csTimer storage key conventions |
| Planner and weighting functions | csTimer scramble engine bridge |
| Case catalog data | csTimer timer UI integration |
| Export JSON schema | csTimer format translation code |
| Session review logic | csTimer DOM mount points |

### Rules That Protect Portability

1. Domain code never imports csTimer globals, `localStorage`, or DOM APIs.
2. Adapter interfaces are declared by the domain, implemented by csTimer glue.
3. Domain types are plain objects, not classes. Serialization is trivial.
4. No v1 code references Convex, Next.js, or React.
5. Export format is defined in the domain layer, not derived from csTimer's internal format.
6. Trainer session linkage references native solves externally. It does not require mutating raw solve-history records.

Full boundary definitions: `docs/architecture/domain-boundaries.md`

## Future Expansion Requests Already Captured

- broader step-by-step training across more puzzles
- daily shared scramble competition with scoring or rewards
- X-cross and advanced opening trainers
- virtual cube support for case practice without a physical cube
- live social or call-based collaborative training
- orientation-aware start-state modeling so the same named case can be tracked by angle, AUF, slot, and other human-meaningful start-state differences

### Future Modeling Reminder

When future work adds richer case families such as F2L or more advanced start-state trainers, the trainer should avoid collapsing meaningful start-state variants into one case-level average when those variants materially change recognition or execution.

Reference blueprint:
- `docs/features/OrientationAwareStartStateModel.md`
