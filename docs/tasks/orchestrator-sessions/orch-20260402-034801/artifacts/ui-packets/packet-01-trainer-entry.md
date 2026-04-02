# UI Implementation Packet 01: Trainer Entry Home

**FR:** `FR-001` (Trainer Entry and Goal Selection)  
**Mockup:** `docs/mockups/trainer-entry.html` - **binding**  
**Design System:** `docs/design/design-system.html`  
**Priority:** First screen after Packet 00.

---

## Objective

Build the approved V2 trainer home surface: a full trainer landing view that users enter explicitly from csTimer and use to choose a goal, review recent progress, and start a session.

## Scope - What To Build

| Element | Description |
|---------|-------------|
| Header shell | `csTimer Trainer` brand lockup plus `Train / Stats / Timer` tabs matching the mockup hierarchy. |
| Hero section | V2 headline/subcopy inviting the user to choose what to practice today. |
| Goal card grid | Three cards for `returning`, `last-layer`, and `cross`, with metadata and one selected state at a time. |
| Primary CTA | `Begin Training Session` button that routes into Packet 02 using the currently selected goal. |
| Keyboard hint | Inline `T` shortcut hint for starting from last known configuration. |
| Quick stats row | Four compact progress metrics derived from persisted trainer data. |
| Recent sessions grid | Up to four recent session cards using stored trainer session results. |
| View All affordance | Secondary control that can remain a placeholder in v1 if no dedicated full-history surface exists yet. |

## Scope - What NOT To Build

- Do not use the old bottom-sheet overlay concept from the discarded V1 mockups.
- Do not alter normal timer rendering while the trainer shell is closed.
- Do not build plan setup controls here; this screen only selects the goal and launches Packet 02.
- Do not invent extra goals beyond the three approved V1 options.

## Data Contracts

### Reads

| Source | Data | Purpose |
|--------|------|---------|
| `trainerStorage.loadProfile()` | `TrainingProfile \| null` | Personalize first-use vs returning state. |
| `trainerStorage.loadStats()` | `SkillStats[]` | Derive quick progress metrics. |
| `trainerStorage.listRecentSessions(4)` | `TrainingSessionResult[]` | Populate recent session cards. |
| `trainerStorage.getActivePlanId()` | `string \| null` | Optionally preselect the user's last goal/profile context. |

### Writes

| Action | Target | Data |
|--------|--------|------|
| Goal card selection | `trainer-state` | `GoalType` |
| Begin Training Session | Route to Packet 02 | Selected `GoalType` |
| `T` shortcut | Route to Packet 02 | Last known goal/config if available; fallback to selected goal |

## UI Behavior Rules

1. Entry into trainer mode is explicit: users must click the trainer launcher or press the documented shortcut.
2. Once inside the trainer shell, Packet 01 is a full-surface home screen, not a small modal.
3. Exactly one goal card is selected at a time.
4. Cold-start users still see the full hero and goal cards, but quick stats and recent sessions fall back to empty-state messaging.
5. Returning users see stats/session cards derived from stored trainer data.
6. Clicking the `Timer` tab or pressing `Escape` exits the trainer shell and returns focus to normal csTimer.

## Visual Contract

The stable V2 mockup is binding. Build agents must preserve:

- warm editorial palette
- `Instrument Serif` display typography
- three-card goal selection grid
- centered hero with primary CTA below the cards
- quick stats and recent sessions as separate lower sections

## Acceptance Criteria Alignment

- explicit trainer entry exists
- three V1 goal choices are represented
- trainer entry is additive and does not disrupt normal timer usage

## Dependencies

| Depends On | Why |
|------------|-----|
| Packet 00 | Shared shell, styles, routing helpers |
| T06 persistence | Progress/session data |
| `docs/mockups/trainer-entry.html` | Binding layout and content hierarchy |

## Verification

1. Trainer home opens from the launcher without breaking existing csTimer nav.
2. Goal selection is obvious and stable.
3. Begin CTA routes to Packet 02 with the selected goal.
4. Cold-start and returning-user states both render cleanly.
5. Exiting the trainer returns to the timer without regressions.

## Review Gate

**User reviews the trainer home before Packet 02 is delegated.** Confirm:

- the screen matches the approved V2 direction
- goal selection feels clear
- progress/history sections are useful and not noisy
