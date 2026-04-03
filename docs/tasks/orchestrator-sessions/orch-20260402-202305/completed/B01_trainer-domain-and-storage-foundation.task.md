## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-code.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Task follows the Takomi build flow |

## Objective

Implement the `StorageAdapter` foundation and the base trainer export bridge inside the current csTimer fork.

## Scope

- integrate trainer state with the existing storage abstraction, not a parallel custom layer
- keep trainer keys under `trainer:*`
- keep trainer data separate from raw solve records
- add the export bridge foundation required by the persistence plan
- prepare the storage-facing interfaces needed by later planner and UI work

## Definition of Done

- trainer storage foundation exists and uses the host storage layer correctly
- base export bridge hooks exist without breaking current csTimer export behavior
- no normal solve-history behavior is broken

## Expected Artifacts

- `StorageAdapter` implementation or equivalent trainer storage integration
- base export bridge integration
- docs updates if implementation forced storage-plan changes

## References

- `docs/features/TrainerV1.md`
- `docs/architecture/domain-boundaries.md`
- `docs/architecture/persistence-plan.md`
- `docs/issues/FR-006.md`
- `docs/issues/FR-008.md`

## Review Checkpoint

Review for storage safety, trainer key isolation, offline behavior, and compatibility before UI or queue work is approved.
