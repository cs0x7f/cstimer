## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-code.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Build flow discipline |

## Objective

Implement the shared trainer shell and integration helpers that all trainer surfaces attach to.

## Scope

- build the shared trainer container/shell
- wire trainer state, storage, and planner outputs into reusable integration helpers
- avoid ad hoc surface-specific DOM attachment patterns
- prepare stable mount points for entry, setup, active session, and review surfaces

## Definition of Done

- the trainer has a shared shell that later UI surfaces can plug into
- integration helpers are stable enough that UI tasks do not have to invent their own wiring

## Expected Artifacts

- shared trainer shell implementation
- trainer integration helpers
- docs sync if surface wiring changed from the design intent

## References

- `docs/issues/FR-001.md`
- `docs/features/TrainerV1.md`
- approved mockups in `docs/mockups/`

## Review Checkpoint

Review for maintainable integration and shell quality before user-visible surfaces are approved.
