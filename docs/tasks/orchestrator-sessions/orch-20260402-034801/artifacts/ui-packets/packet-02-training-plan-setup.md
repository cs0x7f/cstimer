# UI Implementation Packet 02: Training Plan Setup

**FR:** `FR-002` (Structured Training Plans)  
**Mockup:** `docs/mockups/training-plan-setup.html` - **binding**  
**Design System:** `docs/design/design-system.html`  
**Priority:** After Packet 01.

---

## Objective

Build the V2 plan-setup surface where the user chooses a template, adjusts the allowed V1 plan knobs, previews the drill mix, and starts a session.

## Scope - What To Build

| Element | Description |
|---------|-------------|
| Back link + goal tag | Return to Packet 01 and show the active goal context. |
| Template grid | `Quick Review`, `Full Rotation`, and `Weakness Blitz` cards with one selected state. |
| Session name input | Editable label used for the created `TrainingPlan`. |
| Case-set segmented control | `PLL`, `OLL`, `Both` selector constrained by the active goal. |
| Session-length slider | Maps directly to the number of queued cases/attempts for the created plan. |
| Settings toggles | Match the V2 layout while respecting V1 schema limits. |
| Drill queue preview | Chip-based preview of likely weak / learning / confident cases. |
| Session summary card | Total cases, weak-case count, estimated minutes, weighting summary. |
| Actions | `Save as Template` secondary action and `Start Session` primary action. |

## Scope - What NOT To Build

- Do not use the discarded V1 checkbox/sidebar layout.
- Do not invent new persisted plan fields outside the documented `TrainingPlan` schema.
- Do not call `generateQueue()` from this screen.
- Do not add multi-session planning, custom ordering, or arbitrary saved template systems beyond reusing `TrainingPlan`.

## Mapping To V1 Contracts

### Template presets

| Template | Goal Use | Plan Mapping |
|----------|----------|--------------|
| `Quick Review` | returning / last-layer | Short session, balanced mix, moderate `weakCaseBias` |
| `Full Rotation` | last-layer | Full active case set, standard mode, strong adaptive weighting |
| `Weakness Blitz` | returning / last-layer / cross | Shorter session focused on weakest available cases |

### Settings rules

| UI Control | V1 Rule |
|------------|---------|
| `Adaptive Weighting` | Maps to `focusSettings.weakCaseBias` |
| `Show Algorithm Hints` | UI-only preference stored in `trainer-state.uiPrefs`; do not add to `TrainingPlan` |
| `Repeat Failed Cases` | Present in layout but disabled for v1 unless a later planner packet explicitly adds support |
| `Randomize Order` | Present in layout but disabled for v1 because custom ordering is out of scope |

## Data Contracts

### Reads

| Source | Data | Purpose |
|--------|------|---------|
| `trainer-state.selectedGoal` | `GoalType` | Goal context from Packet 01 |
| `trainerStorage.loadStats()` | `SkillStats[]` | Derive weak / learning / confident preview chips |
| `CaseCatalog` | `CaseCatalog[]` | Name the previewed cases |
| `trainerStorage.loadProfile()` | `TrainingProfile \| null` | Apply user defaults if available |

### Writes

| Action | Target | Data |
|--------|--------|------|
| `Save as Template` | `trainerStorage.savePlan()` | Current `TrainingPlan`, no navigation |
| `Start Session` | `trainerStorage.savePlan()` | Current `TrainingPlan` |
| `Start Session` | `trainerStorage.setActivePlanId()` | Saved `planId` |
| `Start Session` | Route to Packet 03 | Saved `TrainingPlan` |

### Required `TrainingPlan` shape

```typescript
{
  planId: generateId(),
  templateId: "quick-review" | "full-rotation" | "weakness-blitz",
  goal: selectedGoal,
  drillBlocks: [...],
  sessionLength: number,
  focusSettings: {
    weakCaseBias: number,
    coverageFloor: 0.20,
    sessionMode: "standard"
  },
  createdAt: new Date().toISOString()
}
```

## UI Behavior Rules

1. Exactly one template is selected at a time.
2. Goal-specific guards apply:
   - `cross` hides unsupported PLL/OLL combinations and uses cross-safe defaults
   - `returning` defaults to a mixed review setup
   - `last-layer` defaults to `Full Rotation`
3. The queue preview is stats-derived and does not require planner completion.
4. `Save as Template` persists the current plan but stays on Packet 02.
5. `Start Session` saves the plan, updates active plan id, and routes into Packet 03.
6. Disabled V1.1 toggles must remain visibly non-destructive and must not leak unsupported fields into saved plan data.

## Visual Contract

The stable V2 mockup is binding. Preserve:

- the three-card template row
- two-column configuration layout
- chip-based queue preview
- large session summary card above the action row

## Dependencies

| Depends On | Why |
|------------|-----|
| Packet 01 | Goal context |
| Packet 00 | Shared shell/components |
| T06 persistence | Save plan and default values |
| T07 catalog | Queue preview naming |

## Verification

1. Each goal opens Packet 02 with sane template defaults.
2. Template selection changes preview and summary data.
3. `Adaptive Weighting` maps cleanly to `weakCaseBias`.
4. Disabled future toggles do not mutate plan schema.
5. `Start Session` produces a valid `TrainingPlan` and routes to Packet 03.

## Review Gate

**User reviews plan setup before Packet 03 is delegated.** Confirm:

- the V2 layout is preserved
- template choices feel useful
- only supported V1 plan controls are actually wired
