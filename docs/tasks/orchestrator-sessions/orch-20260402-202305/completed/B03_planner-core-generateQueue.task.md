## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-code.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Build flow discipline |
| frontend-design | UI task must align to approved mockups |

## Objective

Implement the planner core, including `generateQueue()` and its supporting queue logic.

## Scope

- implement `generateQueue(trainingPlan, skillStats, caseCatalog)`
- apply the approved weakness weighting and anti-starvation rules
- keep the planner portable and free of DOM coupling
- expose output in a form the shared shell and active session flow can consume

## Definition of Done

- planner output is stable and reviewable
- queue behavior matches the approved planner-logic spec well enough to support active-session UI later

## Expected Artifacts

- queue-generation implementation
- any helper logic required for weakness scoring and drill ordering
- docs sync if implementation required logic clarifications

## References

- `docs/issues/FR-003.md`
- `docs/architecture/planner-logic-spec.md`
- `docs/architecture/case-taxonomy.md`

## Review Checkpoint

Review for correctness and explainability before the shared shell or active-session work depends on it.
