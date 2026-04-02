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

Implement the trainer domain foundation and local-first storage scaffolding inside the current csTimer fork.

## Scope

- add trainer data structures and storage access points
- integrate with the existing storage abstraction, not a parallel custom layer
- keep trainer keys separate from raw solve records
- prepare stable interfaces for later queue, cross, and review work

## Definition of Done

- trainer domain and local persistence foundation exists
- no normal solve-history behavior is broken
- later feature tasks can build on stable contracts instead of inventing storage on the fly

## Expected Artifacts

- domain implementation
- trainer storage integration
- docs updates if structure changed from the blueprint

## References

- `docs/features/TrainerV1.md`
- `docs/architecture/domain-boundaries.md`
- `docs/architecture/persistence-plan.md`
- `docs/issues/FR-006.md`
- `docs/issues/FR-008.md`

## Review Checkpoint

Review for data model clarity, storage safety, and compatibility before UI or queue work is approved.
