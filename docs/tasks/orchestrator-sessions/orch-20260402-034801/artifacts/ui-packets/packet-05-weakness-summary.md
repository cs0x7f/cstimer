# UI Implementation Packet 05: Weakness Summary

**FR:** `FR-005` (Skill Stats and Session Review)  
**Mockup:** `docs/mockups/weakness-summary.html` - **binding**  
**Design System:** `docs/design/design-system.html`  
**Priority:** Can be built after Packet 00 plus data dependencies; not blocked on Packet 04.

---

## Objective

Build the persistent V2 weakness-summary dashboard that turns accumulated `SkillStats` into a long-lived practice overview with confidence panels, rankings, and direct drill actions.

## Scope - What To Build

| Element | Description |
|---------|-------------|
| Page header | Title/subtitle plus `PLL / OLL / Cross / All` filter tabs |
| Stats row | Total sessions, cases trained, average recognition, confidence, weak case count |
| Confidence panels | Category-level panels like the V2 PLL / OLL cards |
| Case rankings table | Ranked per-case list with avg time, best, trend, confidence, drills, and drill action |
| Section controls | `Sort` control and primary `Drill Weak Cases` action |
| 30-day trend section | Three trend cards with sparkline-style bars |

## Scope - What NOT To Build

- Do not build the discarded PLL heatmap concept from the old packet.
- Do not add export buttons or placeholder export flows; the approved V2 mockup does not center export here.
- Do not require fully populated OLL/cross datasets before the screen can render.

## Data Contracts

### Reads

| Source | Data | Purpose |
|--------|------|---------|
| `trainerStorage.loadStats()` | `SkillStats[]` | Primary source for all summary calculations |
| `CaseCatalog` | `CaseCatalog[]` | Case names / categories |
| `trainerStorage.loadProfile()` | `TrainingProfile \| null` | Optional display defaults |
| `trainerStorage.listRecentSessions(limit)` | `TrainingSessionResult[]` | Optional input for trend rollups |

### Writes

| Action | Target | Data |
|--------|--------|------|
| `Drill Weak Cases` | `trainerStorage.savePlan()` | Focused `TrainingPlan` built from current filtered weak cases |
| row-level `Drill` | `trainerStorage.savePlan()` | Single-case or small-set `TrainingPlan` |
| launch drill actions | `trainerStorage.setActivePlanId()` | New `planId` |
| launch drill actions | Route to Packet 03 | New plan |

## UI Behavior Rules

1. Tabs filter the summary and ranking table by category without changing the underlying stored data.
2. Confidence panels must render from `SkillStats` thresholds; do not hard-code mock values.
3. Sparse categories still render a real empty/low-confidence state instead of a "coming soon" replacement.
4. `Drill Weak Cases` creates a focused plan from the currently filtered weakest cases.
5. Row-level `Drill` actions create narrower follow-up plans for the selected case or subgroup.

## Suggested Derived Metrics

These are UI-layer derivations from `SkillStats`, not new persistence schema:

- `confidenceScore`
- counts for `mastered`, `learning`, `weak`, `untrained`
- 30-day directional trend summaries
- filtered ranking order (`slowest first` default)

## Visual Contract

Preserve the stable V2 structure:

- header with top-right tabs
- stats row first
- confidence panels second
- wide ranking table third
- trend cards last

## Dependencies

| Depends On | Why |
|------------|-----|
| Packet 00 | Shared shell/components |
| T06 persistence | Stored stats/session history |
| T07 catalog | Category and case naming |

## Verification

1. Tabs filter correctly across PLL / OLL / Cross / All.
2. Ranking table reflects actual stats ordering.
3. Confidence panels degrade gracefully with sparse data.
4. `Drill Weak Cases` and row drill actions produce valid follow-up plans.

## Review Gate

**User reviews weakness summary before final orchestration signoff.** Confirm:

- the V2 dashboard layout is preserved
- persistent insights are understandable
- drill actions map cleanly into the trainer flow
