# UI Implementation Packet 04: Session Review

**FR:** `FR-005` (Skill Stats and Session Review)  
**Mockup:** `docs/mockups/session-review.html` - **binding**  
**Design System:** `docs/design/design-system.html`  
**Priority:** After Packet 03.

---

## Objective

Build the approved V2 post-session review surface: a polished recap with summary stats, hardest cases, full results table, and clear next actions.

## Scope - What To Build

| Element | Description |
|---------|-------------|
| Completion header | Review badge, session title, completion metadata |
| Summary row | Five headline stats matching the mockup hierarchy |
| Hardest-cases grid | Top three weakest/slowest cases from the just-finished session |
| Results table | Ranked results table with case, time, delta, status, and distribution bar |
| Recommendation card | Uses `nextRecommendation` plus recommended weak-case chips |
| Action row | `Start Weakness Blitz`, `Repeat This Session`, `Back to Trainer` |

## Scope - What NOT To Build

- Do not use the discarded anomaly-sidebar-only layout from the older packet.
- Do not rely on `StorageAdapter.loadSessionResult()`; it is not part of the documented adapter contract.
- Do not add replay/edit flows here.

## Data Contracts

### Reads

| Source | Data | Purpose |
|--------|------|---------|
| `trainer-state.reviewPayload` | hydrated review model | Primary UI source |
| `trainer-state.activePlan` | `TrainingPlan` | Needed for repeat flows |
| `CaseCatalog` | `CaseCatalog[]` | Case display names if payload uses ids |

### Writes

| Action | Target | Data |
|--------|--------|------|
| `Start Weakness Blitz` | `trainerStorage.savePlan()` | New weak-case-focused `TrainingPlan` |
| `Start Weakness Blitz` | `trainerStorage.setActivePlanId()` | New `planId` |
| `Repeat This Session` | `trainerStorage.savePlan()` | Duplicated/renewed `TrainingPlan` |
| `Back to Trainer` | Route to Packet 01 | none |

## Required UI Model

Packet 04 expects Packet 03 to hand it enough data to render the V2 screen without recomputing the session from scratch.

At minimum the review payload must support:

- headline metrics: total, avg, best, worst, elite rate
- top three hardest cases
- row-by-row result table
- recommendation body and recommended case chips

## UI Behavior Rules

1. Use the hydrated review payload as the primary source of truth for the surface.
2. `Start Weakness Blitz` creates a focused follow-up plan using the current session's weak cases.
3. `Repeat This Session` creates a fresh plan with the same configuration as the completed session.
4. `Back to Trainer` returns to Packet 01 without mutating completed session data.
5. If a cold/incomplete review payload is missing optional values, keep the layout but render graceful placeholders.

## Visual Contract

Preserve the stable V2 structure:

- centered completion header
- 5-up summary stats row
- three-card hardest-case section
- wide results table
- recommendation card above final actions

## Dependencies

| Depends On | Why |
|------------|-----|
| Packet 03 | Hydrated review payload |
| Packet 00 | Shared shell/components |
| T06 persistence | Follow-up plan saves |
| T07 catalog | Case labeling |

## Verification

1. Full and aborted sessions both reach review cleanly.
2. The summary row and hardest-cases grid reflect the just-finished session.
3. Results table ordering matches the routed review payload.
4. Weakness Blitz and Repeat actions generate valid new plans.

## Review Gate

**User reviews session review before final UI delegation continues.** Confirm:

- the V2 review surface is matched
- the recommended actions feel useful
- the hardest-cases section highlights the right problems
