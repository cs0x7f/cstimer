# UI Implementation Packet 00: Shared Components and Trainer Shell

**FR:** Cross-cutting (`FR-001` through `FR-006`)  
**Mockup:** `docs/design/design-system.html` - **binding**  
**Priority:** Build first. Every screen packet depends on this layer.

---

## Objective

Create the shared trainer shell and helper modules that let later UI packets implement the approved V2 surfaces without re-inventing styling, navigation, state handoff, or csTimer integration glue.

## Scope - What To Build

### 1. Trainer style injection (`src/js/trainer/trainer-styles.js`)

Inject trainer-only styles that match the approved V2 design system:

- typography tokens for `Instrument Serif`, `DM Sans`, and `IBM Plex Mono`
- theme variables from `docs/design/design-system.html`
- reusable surface primitives:
  - `.trainer-shell`
  - `.trainer-precision-card`
  - `.trainer-btn`, `.trainer-btn-primary`, `.trainer-btn-ghost`, `.trainer-btn-outline`
  - `.trainer-tag`
  - `.trainer-progress-track`, `.trainer-progress-fill`
  - `.trainer-status-dot`
- shared layout primitives for:
  - section headers
  - tab bars
  - stats rows
  - table shells
  - queue rows

**Constraints**

- Prefix all trainer classes with `trainer-`.
- Do not modify csTimer static stylesheets.
- Load fonts only after the trainer launcher is used for the first time.
- Do not force the trainer font stack onto the normal timer UI.

### 2. Trainer shell / DOM helpers (`src/js/trainer/trainer-dom.js`)

Build mount helpers for the V2 full-surface layout.

| Helper | Signature | Purpose |
|--------|-----------|---------|
| `createTrainerRoot()` | `() => HTMLElement` | Creates the full-screen trainer workspace container. |
| `mountTrainerSurface(root, surface)` | `(HTMLElement, HTMLElement) => void` | Replaces active trainer content cleanly. |
| `teardownTrainerSurface(root)` | `(HTMLElement) => void` | Unmounts active trainer content and listeners. |
| `createTrainerHeaderTabs(activeTab)` | `(string) => HTMLElement` | Shared `Train / Stats / Timer` tab row for trainer surfaces. |
| `createStatCell(label, value, tone)` | `(string, string, string?) => HTMLElement` | Shared metric cell used across entry/review/summary screens. |
| `createTag(label, tone)` | `(string, string) => HTMLElement` | Shared status tag builder. |
| `createProgressTrack(percent, tone)` | `(number, string?) => HTMLElement` | Shared progress and confidence bars. |
| `createEmptyState(title, body)` | `(string, string) => HTMLElement` | Shared empty-state surface for cold start and sparse-data states. |

### 3. Trainer state coordinator (`src/js/trainer/trainer-state.js`)

Keep routing and screen handoff lightweight.

| Property | Type | Purpose |
|----------|------|---------|
| `currentSurface` | `string` | Current trainer screen id. |
| `selectedGoal` | `GoalType \| null` | Selected on Packet 01, consumed by Packet 02. |
| `activePlan` | `TrainingPlan \| null` | Current plan in setup/session/review flow. |
| `activeQueue` | `DrillQueue \| null` | Queue returned by planner for Packet 03. |
| `currentQueueIndex` | `number` | Current active queue position. |
| `sessionAttempts` | `AttemptCapture[]` | In-memory attempt timeline for the active session. |
| `reviewPayload` | `object \| null` | Hydrated review model passed from Packet 03 to Packet 04. |
| `uiPrefs` | `{ showAlgorithmHints: boolean }` | Session-local UI preferences exposed by Packet 02. |

| Method | Signature | Purpose |
|--------|-----------|---------|
| `setSelectedGoal(goal)` | `(GoalType) => void` | Stores entry selection. |
| `setActivePlan(plan)` | `(TrainingPlan) => void` | Stores the current plan. |
| `startSession(queue)` | `(DrillQueue) => void` | Initializes queue/session state. |
| `recordAttempt(attempt)` | `(AttemptCapture) => void` | Appends attempt and advances queue state. |
| `setReviewPayload(payload)` | `(object) => void` | Stores the session review handoff. |
| `resetSession()` | `() => void` | Clears queue and attempt state only. |
| `resetAll()` | `() => void` | Clears all trainer state. |

### 4. Storage / adapter shims

Provide UI-friendly wrappers around the documented integrations so later packets do not reach directly into browser storage or csTimer globals.

| Shim | Purpose |
|------|---------|
| `trainerStorage` | Wraps `StorageAdapter` reads/writes and exposes convenience helpers for UI composition. |
| `trainerScramble` | Wraps `ScrambleAdapter`; safe fallback when trainer scrambles are unavailable. |
| `trainerTimer` | Wraps `TimerBridge`; safe fallback when bridge is not attached yet. |

`trainerStorage` may expose these convenience helpers in addition to the domain adapter methods:

- `getActivePlanId(): string | null`
- `setActivePlanId(planId: string | null): void`
- `listRecentSessions(limit: number): TrainingSessionResult[]`

Those helpers exist so the UI can render the approved V2 entry and history views while still centralizing all storage access in one trainer-owned integration file.

### 5. Trainer bootstrap (`src/js/trainer/trainer-init.js`)

Attach the trainer shell to csTimer without disturbing default timer behavior.

Responsibilities:

- inject the small launcher control into an existing csTimer header/nav location
- create the trainer root container on first open
- lazy-load styles/fonts before first trainer render
- wire keyboard shortcuts:
  - `T` = open trainer home using last known configuration
  - `Escape` = close trainer shell and return focus to timer
- route launcher entry into Packet 01's full trainer home surface

## Scope - What NOT To Build

- Do not build screen-specific business UI from Packets 01-05 here.
- Do not implement planner math in this packet.
- Do not modify core timer, scramble, or stats modules beyond documented integration points.
- Do not hard-code product logic into shared helpers.

## File Structure

```text
src/js/trainer/
  trainer-styles.js
  trainer-dom.js
  trainer-state.js
  trainer-storage.js
  trainer-scramble.js
  trainer-timer.js
  trainer-init.js
```

## Dependencies

| Depends On | Why |
|------------|-----|
| `docs/design/design-system.html` | Shared visual system and tokens |
| `docs/architecture/domain-boundaries.md` | Domain types and integration boundaries |
| `docs/architecture/persistence-plan.md` | `trainer:*` storage keys used by shim helpers |

## Verification

1. Trainer launcher opens a full trainer workspace without affecting normal timer behavior.
2. Fonts and style injection are deferred until trainer launch.
3. Unmount/remount does not leak listeners or duplicate DOM nodes.
4. Shared helpers are generic enough to support all V2 screens without copy/paste markup.
5. All storage and timer access goes through trainer-owned shims, not direct UI calls.

## Review Gate

**User reviews shared infrastructure before screen packets are delegated.** Confirm:

- the shell is modular
- the V2 design primitives are represented in shared helpers
- trainer integration stays additive to csTimer
