# UI Implementation Packets - Dependency Map and Review Gates

**Session:** `orch-20260402-034801`  
**Task:** `10_ui-implementation-packets`

---

## Packet Inventory

| Packet | Surface | FRs | Binding Mockup |
|--------|---------|-----|----------------|
| 00 | Shared Components and Trainer Shell | cross-cutting | `docs/design/design-system.html` |
| 01 | Trainer Entry Home | `FR-001` | `docs/mockups/trainer-entry.html` |
| 02 | Training Plan Setup | `FR-002` | `docs/mockups/training-plan-setup.html` |
| 03 | Active Session | `FR-003`, `FR-004` | `docs/mockups/active-session-queue.html` |
| 04 | Session Review | `FR-005` | `docs/mockups/session-review.html` |
| 05 | Weakness Summary | `FR-005` | `docs/mockups/weakness-summary.html` |

## Dependency Graph

```text
T06 Persistence ----┐
T07 Case Catalog ---┼--> Packet 00 --> Packet 01 --> Packet 02 --> Packet 03 --> Packet 04
T09 Planner --------┘                           \_______________________________/

Packet 05 depends on Packet 00 + T06 + T07 and can proceed off the main session-flow path.
```

## Build Phases

### Phase 1: Foundation

- T06 persistence
- T07 case catalog
- T09 planner
- Packet 00 shared trainer shell

### Phase 2: Entry and setup

- Packet 01 trainer entry home
- Packet 02 training plan setup

### Phase 3: Session flow

- Packet 03 active session
- Packet 04 session review

### Phase 4: Persistent insights

- Packet 05 weakness summary

## Critical Coordination Notes

### Packet 01

- depends on recent-session helper access to `trainer:sessions`
- must use the stable V2 home screen, not the older bottom-sheet concept

### Packet 02

- may preview likely queue composition without depending on T09
- must not persist unsupported V1.1 toggle fields into `TrainingPlan`

### Packet 03

- is the only screen that directly depends on planner output
- must route a hydrated review payload into Packet 04

### Packet 04

- must not rely on a nonexistent `loadSessionResult()` adapter method
- uses Packet 03 handoff plus persisted plan context

### Packet 05

- is driven primarily by `SkillStats[]`
- must follow the approved V2 dashboard layout, not the discarded heatmap brief

## Review Gates

### Gate 0 - Shared Shell

- styles and shell helpers reflect V2 design primitives
- trainer launcher is additive to csTimer

### Gate 1 - Entry Home

- trainer home matches `trainer-entry.html`
- explicit entry and goal selection are clear

### Gate 2 - Plan Setup

- templates and settings match `training-plan-setup.html`
- only approved V1 controls are actually wired

### Gate 3 - Active Session

- session ergonomics match `active-session-queue.html`
- queue, timer, and action flow work together cleanly

### Gate 4 - Session Review

- review matches `session-review.html`
- follow-up actions are meaningful

### Gate 5 - Weakness Summary

- dashboard matches `weakness-summary.html`
- rankings and drill actions are useful

### Gate 6 - Full Flow

- entry -> setup -> session -> review works
- weakness summary integrates with the same trainer state/persistence model
- normal csTimer timer flow remains unaffected when trainer is closed
