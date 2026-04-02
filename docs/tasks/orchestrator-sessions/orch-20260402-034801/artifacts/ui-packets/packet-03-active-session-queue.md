# UI Implementation Packet 03: Active Session

**FR:** `FR-003` (Adaptive Last-Layer Drill Queue), `FR-004` (Cross Drill Workflows)  
**Mockup:** `docs/mockups/active-session-queue.html` - **binding**  
**Design System:** `docs/design/design-system.html`  
**Priority:** After Packets 00-02 and planner/persistence dependencies.

---

## Objective

Build the approved V2 active-session surface: a focused practice workspace wrapped around the timer, with current-case context, queue visibility, session metrics, and clean handoff into review.

## Scope - What To Build

| Element | Description |
|---------|-------------|
| Session header | Session name, current position, progress copy, `Pause`, and `End Session` controls |
| Scramble bar | Current scramble in a readable mono block |
| Active case card | Case name, full description, status tag, visual placeholder, timer display, algorithm hint area |
| Action row | `Re-scramble`, `Skip`, `Next Case` controls |
| Queue sidebar | Vertical queue list with completed, current, and upcoming items |
| Session stats panel | Live summary metrics such as average, best, weak-count remaining, or completion %

## Scope - What NOT To Build

- Do not use the discarded footer-rail-only layout from the older packet.
- Do not implement planner logic inside the UI.
- Do not persist pause/resume across page reloads; pause is in-session only for v1.
- Do not replace csTimer's timer engine; use `TimerBridge`.

## Data Contracts

### Reads

| Source | Data | Purpose |
|--------|------|---------|
| `generateQueue()` | `DrillQueue` | Session queue at start |
| `trainer-state.activePlan` | `TrainingPlan` | Header/session metadata |
| `CaseCatalog` | `CaseCatalog[]` | Case display names and algorithm text |
| `trainerTimer.readLatestAttempt()` | `AttemptCapture \| null` | Latest solve record |
| `trainerStorage.loadStats()` | `SkillStats[]` | Live comparison metrics |
| `trainer-state.uiPrefs` | `{ showAlgorithmHints: boolean }` | Controls hint visibility |

### Writes

| Action | Target | Data |
|--------|--------|------|
| solve complete / skip | `trainer-state.recordAttempt()` | `AttemptCapture` or skip-equivalent record |
| session end | `trainerStorage.saveSessionResult()` | `TrainingSessionResult` |
| session end | `trainerStorage.saveStats()` | Updated `SkillStats[]` |
| session end | `trainer-state.setReviewPayload()` | Hydrated review model for Packet 04 |
| session end | Route to Packet 04 | Review payload |

## Required Review Handoff

Packet 03 must route to Packet 04 with a hydrated review payload rather than relying on a nonexistent `loadSessionResult()` API.

Minimum handoff:

```typescript
{
  sessionResult: TrainingSessionResult,
  attemptTimeline: AttemptCapture[],
  summary: {
    totalCases: number,
    avgTime: number | null,
    bestTime: number | null,
    worstTime: number | null,
    eliteRate: number | null
  },
  rankedCases: Array<...>
}
```

## UI Behavior Rules

1. On mount, call `generateQueue(trainingPlan, skillStats, caseCatalog, plannerContext)`.
2. `Pause` temporarily freezes trainer interactions in the current tab only. It does not create a resumable persisted state.
3. `End Session` computes a partial `TrainingSessionResult`, saves it, and routes to Packet 04.
4. `Skip` records skip behavior so Packet 09 weighting remains accurate.
5. The queue sidebar, not a footer rail, is the primary lookahead surface in V2.
6. If `showAlgorithmHints` is false, keep the hint area hidden while preserving layout spacing.

## Visual Contract

Preserve the stable V2 structure:

- left-side main case workspace
- right-side queue + session stats stack
- large timer within the active case card
- warm editorial style rather than tactical HUD framing

## Dependencies

| Depends On | Why |
|------------|-----|
| Packet 02 | Active plan |
| Packet 00 | Shared shell/helpers |
| T06 persistence | Save results and stats |
| T07 catalog | Names / algorithm hints |
| T09 planner | Queue generation |

## Verification

1. Queue renders correctly from planner output.
2. Timer events flow through `TimerBridge`.
3. Skip and end-session actions produce correct attempt/session records.
4. Queue sidebar state stays in sync with attempt progression.
5. Review payload is complete enough for Packet 04 without extra storage reads.

## Review Gate

**User reviews the active session before Packet 04 is delegated.** Confirm:

- session ergonomics match the mockup
- queue visibility is useful
- pause/end/skip behavior is understandable
