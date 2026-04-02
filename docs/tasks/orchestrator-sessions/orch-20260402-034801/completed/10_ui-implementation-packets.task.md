## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-orchestrator.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Packet generation for later build agents |
| frontend-design | Ensure packets map back to approved mockups |

## Objective

Translate the approved mockups and architecture into screen-specific implementation packets for later build agents.

## Scope

- create one brief per UI surface or tightly related UI slice
- tie each brief back to the relevant FRs, mockup, and data contract
- identify dependencies between UI packets and non-UI infrastructure packets

## Definition of Done

- later build agents can pick up a UI packet and know what to build, what not to build, and which mockup is binding

## Expected Artifacts

- screen-by-screen implementation briefs
- dependency notes for each UI packet
- review gates between infrastructure and UI work

## Dependencies

- `04_ui-design-system-and-mockups.task.md`
- `05_architecture-and-domain-boundaries.task.md`
- `09_planner-logic-spec.task.md`

## Review Checkpoint

User approves the UI implementation packet set before any build delegation starts.
