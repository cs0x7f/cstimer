# Architecture: Trainer Domain Boundaries

**Date:** 2026-04-02
**Session:** orch-20260402-034801
**Task:** 05_architecture-and-domain-boundaries

---

## Purpose

Define the trainer as a domain layer that lives inside csTimer for v1 and can migrate into a standalone TypeScript app later. This document establishes which concepts belong to the trainer domain and which belong to csTimer integration glue.

---

## Layer Diagram

```
┌─────────────────────────────────────────────────┐
│               Trainer Domain Layer               │
│                                                  │
│  TrainingProfile   TrainingPlan   DrillDef      │
│  SkillStats        WeaknessScore  SessionResult  │
│  CaseCatalog       Planner Logic                 │
│                                                  │
│  ─── Pure data contracts + pure functions ───    │
│  No csTimer imports. No DOM. No storage APIs.    │
└──────────────────┬──────────────────────────────┘
                   │ adapter interface
┌──────────────────▼──────────────────────────────┐
│            csTimer Integration Layer             │
│                                                  │
│  StorageAdapter    ScrambleAdapter  TimerBridge  │
│  ExportBridge      UI Mount Points               │
│                                                  │
│  ─── Depends on csTimer internals ───            │
│  Imports csTimer globals, storage, scramble.     │
└─────────────────────────────────────────────────┘
```

---

## Domain Concepts (Portable)

These types and functions are **trainer domain** — no csTimer imports, no browser API assumptions. They can move into a TypeScript app unchanged.

### `TrainingProfile`

| Field | Type | Description |
|-------|------|-------------|
| `userId` | `string` | Local identifier (no auth for v1) |
| `preferredGoals` | `GoalType[]` | e.g. `["last-layer", "cross"]` |
| `defaultSessionLength` | `number` | Target drill count or time budget |
| `createdAt` | `ISODateString` | Profile creation timestamp |
| `lastSessionAt` | `ISODateString` | Most recent session timestamp |

**Role:** Persistent identity for the trainer. Holds user preferences that shape plan generation. Does NOT store raw solve data — that belongs to csTimer.

### `TrainingPlan`

| Field | Type | Description |
|-------|------|-------------|
| `planId` | `string` | Unique plan identifier |
| `templateId` | `string` | Which template generated this plan |
| `goal` | `GoalType` | Training goal this plan serves |
| `drillBlocks` | `DrillBlock[]` | Ordered set of drills to execute |
| `sessionLength` | `number` | Configured session budget |
| `focusSettings` | `FocusSettings` | Weighting and coverage knobs |
| `createdAt` | `ISODateString` | When the plan was created |

**Role:** The output of goal selection. Drives what the session queue serves. A `TrainingPlan` is a complete, self-contained session specification — it does not reference csTimer internals.

#### Supporting Types

| Type | Shape | Notes |
|------|-------|-------|
| `GoalType` | `"returning" \| "last-layer" \| "cross"` | Bounded to current v1 goals |
| `DrillBlock` | `{ blockId, label, drillRef, order, targetCount }` | Ordered block inside a plan |
| `FocusSettings` | `{ weakCaseBias, coverageFloor, sessionMode }` | Planner knobs owned by the domain |

### `DrillDefinition`

| Field | Type | Description |
|-------|------|-------------|
| `drillId` | `string` | Unique drill identifier |
| `type` | `"last-layer" \| "cross"` | Drill category |
| `caseSet` | `CaseRef[]` | Which cases this drill covers |
| `targetCount` | `number` | How many attempts in this block |
| `scramblePolicy` | `"from-case" \| "full-solve"` | Whether scramble is case-specific or full |
| `captureFields` | `CaptureField[]` | What data the trainer records per attempt |

**Role:** Describes *what* the user does in a drill block. Pure metadata — no execution logic. The session runner reads this to generate attempts and record results.

#### Supporting Types

| Type | Shape | Notes |
|------|-------|-------|
| `CaseRef` | `{ caseId, category }` | Lightweight link to a catalog entry |
| `CaptureField` | `"solveTime" \| "recognitionTime" \| "selfRatedSuccess" \| "skipped" \| "dnf"` | Only fields the domain may ask the bridge to collect in v1 |

### `CaseCatalog`

| Field | Type | Description |
|-------|------|-------------|
| `caseId` | `string` | e.g. `"PLL-T"`, `"OLL-27"` |
| `category` | `"PLL" \| "OLL" \| "cross"` | Case family |
| `name` | `string` | Human-readable name |
| `groupTags` | `string[]` | Recognition and taxonomy tags |
| `twoLookPhase` | `"edges" \| "corners" \| "dot-resolve" \| null` | Returning-cuber OLL phase when relevant |
| `algorithms` | `AlgorithmEntry[]` | Primary and alternate algorithms |
| `provenance` | `ProvenanceRecord[]` | Source attribution per algorithm |
| `difficultyTier` | `number` (1-5) | Relative difficulty estimate |
| `notes` | `string` | Catalog notes and maintainer comments |
| `fingersTrickNotes` | `string` | Optional execution guidance |
| `updatedAt` | `ISODateString` | Last catalog update timestamp |

**Role:** The content layer. Pure catalog data with provenance. No behavioral logic — the planner and stats modules read from this, but the catalog does not depend on them.

#### Supporting Types

| Type | Shape | Notes |
|------|-------|-------|
| `AlgorithmEntry` | `{ algorithmId, notation, variantLabel, handedness, recommended, moveCount, sourceRefs }` | Supports primary plus alternates with attribution links |
| `ProvenanceRecord` | `{ sourceRef, sourceName, sourceUrl, sourceType, confidence, contributedAt, lastVerifiedAt?, notes, coversAlgorithms }` | Matches FR-007 provenance expectations |

### `SkillStats`

| Field | Type | Description |
|-------|------|-------------|
| `caseId` | `string` | Reference to catalog case |
| `attemptCount` | `number` | Total attempts recorded |
| `avgSolveTime` | `number` | Mean solve time in ms |
| `bestSolveTime` | `number` | Best solve time in ms |
| `worstSolveTime` | `number` | Worst solve time in ms |
| `dnfRate` | `number` | 0-1 fraction of DNF attempts |
| `skipCount` | `number` | Times this case was skipped |
| `lastPracticedAt` | `ISODateString` | Most recent attempt |
| `trend` | `"improving" \| "stable" \| "declining"` | Computed from recent window |

**Role:** Accumulated per-case performance. Fed by session results. Read by the weakness scorer. This is the primary input to adaptive scheduling.

### `WeaknessScore`

| Field | Type | Description |
|-------|------|-------------|
| `caseId` | `string` | Reference to catalog case |
| `score` | `number` | Computed priority weight |
| `reason` | `string` | Human-readable why this case is weak |
| `computedAt` | `ISODateString` | When the score was last calculated |

**Role:** Output of the weighting formula. Input to queue generation. Pure computation from `SkillStats` + catalog metadata — no storage, no UI.

### `TrainingSessionResult`

| Field | Type | Description |
|-------|------|-------------|
| `sessionId` | `string` | Unique session identifier |
| `planId` | `string` | Which plan was executed |
| `startedAt` | `ISODateString` | Session start timestamp |
| `completedAt` | `ISODateString` | Session end timestamp |
| `drillResults` | `DrillResult[]` | Per-drill outcome summaries |
| `weakCases` | `CaseRef[]` | Cases that underperformed in this session |
| `strongCases` | `CaseRef[]` | Cases that improved in this session |
| `nextRecommendation` | `string` | Actionable suggestion for the user |

**Role:** The review artifact. Produced at session end. Read by the review UI and by persistent weakness tracking. Self-contained — does not depend on csTimer's solve history format.

#### Supporting Types

| Type | Shape | Notes |
|------|-------|-------|
| `DrillResult` | `{ drillId, attemptsCompleted, avgSolveTime, weakCases, notes }` | Summary per executed drill block |
| `DrillQueue` | `DrillQueueItem[]` | Ordered planner output returned by `generateQueue()` |
| `DrillQueueItem` | `{ queueIndex, drillId, caseRef, promptMode, targetMetric }` | Atomic queue item served during a session |

### `SyncEvent` (future)

Reserved for post-v1 cloud sync and multiplayer. Not defined yet — this slot exists so that the domain boundary is clear when sync is added later.

---

## Integration Layer (csTimer-Specific)

These modules depend on csTimer internals. They implement adapter interfaces defined by the domain layer.

### `StorageAdapter`

- Reads/writes trainer data to browser storage (the concrete mechanism is selected by T06, not fixed by this document)
- Key namespace: `trainer:*` — separate from csTimer's raw session keys
- Implements serialization for all domain types
- Handles export/import bridge with csTimer's format

**Minimum interface contract**

- `loadProfile(): TrainingProfile | null`
- `saveProfile(profile: TrainingProfile): void`
- `loadPlan(planId: string): TrainingPlan | null`
- `savePlan(plan: TrainingPlan): void`
- `loadStats(): SkillStats[]`
- `saveStats(stats: SkillStats[]): void`
- `saveSessionResult(result: TrainingSessionResult): void`
- `exportTrainerData(): TrainerExportPayload`
- `importTrainerData(payload: TrainerExportPayload): ImportResult`

### `ScrambleAdapter`

- Wraps csTimer's existing scramble generator
- Produces case-specific scrambles when `scramblePolicy` is `"from-case"`
- Falls back to full random scrambles for cross drills
- No trainer logic — purely a bridge

**Minimum interface contract**

- `getCaseScramble(caseRef: CaseRef): string`
- `getCrossScramble(options: CrossScrambleOptions): string`
- `getFullSolveScramble(eventId: string): string`

### `TimerBridge`

- Captures solve times when trainer mode is active
- Does NOT mutate raw csTimer solve records to add trainer-only metadata
- Stores trainer-session linkage in trainer-owned records, optionally referencing a native solve ID when available
- Does NOT modify csTimer's normal solve capture flow
- Feeds raw timing data back to the domain layer for `SkillStats` update through normalized attempt records

**Minimum interface contract**

- `beginTrainerCapture(sessionId: string, drillId: string): void`
- `endTrainerCapture(): void`
- `readLatestAttempt(): AttemptCapture | null`
- `linkAttemptToNativeSolve(attemptId: string, nativeSolveId: string | null): void`

### `ExportBridge`

- Extends csTimer's existing export/import to include trainer data
- Trainer data travels as a separate JSON block alongside solve history
- Import validates trainer data independently — corrupt trainer data does not break solve import

**Minimum interface contract**

- `buildTrainerExportBlock(): TrainerExportPayload`
- `readTrainerExportBlock(rawImport: unknown): TrainerExportPayload | null`
- `validateTrainerExportBlock(payload: TrainerExportPayload): ValidationResult`

### `UI Mount Points`

- Trainer entry surface: added to csTimer's existing layout without modifying default timer UI
- Active session queue: overlays or side-panel that coexists with the timer
- Session review: post-session surface that appears after session completion
- Weakness summary: accessible from trainer entry, not from main timer

**Minimum interface contract**

- `mountTrainerEntry(container: HTMLElement): void`
- `mountPlanSetup(container: HTMLElement): void`
- `mountSessionQueue(container: HTMLElement): void`
- `mountSessionReview(container: HTMLElement): void`
- `mountWeaknessSummary(container: HTMLElement): void`

---

## Extraction Boundary Rules

These rules protect the domain layer's portability for future FR-008 extraction:

1. **No csTimer globals in domain code.** Domain types and planner functions must never import or reference `localStorage`, `csTimer`, `timer`, or any csTimer module.

2. **Adapter interfaces are defined by the domain, not by csTimer.** The domain declares what it needs (e.g., "a way to persist a `TrainingPlan`"); the integration layer implements it with csTimer specifics.

3. **Domain types use plain objects, not classes.** This keeps serialization trivial and avoids framework assumptions.

4. **Planner logic is a pure function.** `generateQueue(trainingPlan, skillStats, caseCatalog)` returns a `DrillQueue` without side effects. No storage reads, no timer access.

5. **Export format is domain-owned.** The JSON schema for trainer export/import is defined in the domain layer, not derived from csTimer's internal format. The `ExportBridge` translates between the two.

6. **No v1 code references future tech.** Domain code must not import Convex, Next.js, or React. Those are future-framework concerns that will replace the integration layer, not the domain.

7. **Trainer metadata stays in trainer-owned records.** The bridge may reference native solve IDs, but trainer session linkage must not require rewriting csTimer's raw solve-history format.

---

## What Stays, What Moves

| Concept | Portable? | Notes |
|---------|-----------|-------|
| `TrainingProfile` | Yes | Pure data |
| `TrainingPlan` | Yes | Pure data |
| `DrillDefinition` | Yes | Pure data |
| `CaseCatalog` | Yes | Pure data |
| `SkillStats` | Yes | Pure data |
| `WeaknessScore` | Yes | Pure computation |
| `TrainingSessionResult` | Yes | Pure data |
| Planner logic | Yes | Pure function |
| Weighting formula | Yes | Pure function |
| Storage keys | No | csTimer browser storage |
| Scramble generation | No | csTimer scramble engine |
| Timer capture | No | csTimer timer UI |
| Export format bridge | No | csTimer format translation |
| UI components | No | csTimer DOM/layout |

---

## Integration Payload Shapes

These shapes are intentionally lightweight so downstream tasks can implement adapters without inventing hidden schema.

| Type | Shape | Notes |
|------|-------|-------|
| `AttemptCapture` | `{ attemptId, solveTime, recognitionTime?, dnf, skipped, nativeSolveId? }` | Normalized bridge output for one attempt |
| `TrainerExportPayload` | `{ version, profile, plans, stats, sessionResults }` | Domain-owned export block |
| `ImportResult` | `{ imported, skipped, warnings }` | Returned by storage/import flows |
| `ValidationResult` | `{ valid, errors }` | Export/import validation summary |
| `CrossScrambleOptions` | `{ colorSet, difficultyTier }` | Bounded v1 cross generation hint |

---

## Downstream Task Guide

For agents working on persistence (T06), planner logic (T09), or UI packets (T10):

- **T06 persistence:** Implement the `StorageAdapter` interface. Define the concrete browser storage strategy. The domain types above are your schema — store them as-is.
- **T07 case catalog:** Populate the `CaseCatalog` with PLL 21 and OLL 57 cases. Define `ProvenanceRecord` sources. The catalog is pure data.
- **T09 planner:** Implement `generateQueue()` as a pure function. Input: plan + stats + catalog. Output: ordered drill queue. No side effects.
- **T10 UI:** Mount trainer surfaces at the defined UI mount points. Read domain types for display. Write results back through the `StorageAdapter`.

---

## Review Checkpoint

User approves these domain boundaries before T06 (persistence) and T09 (planner logic) proceed.
