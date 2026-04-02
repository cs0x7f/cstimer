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
| `SkillStats` | Per-case performance over time | `caseId`, `avgSolveTime`, `dnfRate`, `trend`, `attemptCount` |
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

### Planner Logic

`generateQueue(trainingPlan, skillStats, caseCatalog)` — pure function, no side effects, no csTimer imports. Returns ordered `DrillQueue` based on plan structure and weakness scores.

### Persistence Expectations

- local-first storage
- separate `trainer:*` keys from raw session solve chunks
- export/import format is domain-owned, not derived from csTimer internals
- `StorageAdapter` implements the bridge — domain code does not reference storage APIs
- the exact browser storage mechanism is chosen by the persistence task, not hard-coded in this boundary doc

## UI Surfaces Requiring Design

- trainer entry point
- goal/plan setup
- active session queue
- end-of-session review
- weakness/stats summary

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
3. Domain types are plain objects, not classes — serialization is trivial.
4. No v1 code references Convex, Next.js, or React.
5. Export format is defined in the domain layer, not derived from csTimer's internal format.
6. Trainer session linkage references native solves externally; it does not require mutating raw solve-history records.

Full boundary definitions: `docs/architecture/domain-boundaries.md`

## Future Expansion Requests Already Captured

- broader step-by-step training across more puzzles
- daily shared scramble competition with scoring or rewards
- X-cross and advanced opening trainers
- virtual cube support for case practice without a physical cube
- live social or call-based collaborative training
