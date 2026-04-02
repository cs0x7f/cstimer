## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-orchestrator.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Final synthesis and delegation bundle preparation |

## Objective

Produce the final reviewed orchestration bundle that the user can approve and then route to later agents.

## Scope

- synthesize all approved upstream outputs
- order the final task packets
- call out what can run sequentially versus in parallel
- separate fork-only work from possible upstream-friendly slices

## Definition of Done

- the user can delegate the next wave of tasks without re-planning the project

## Expected Artifacts

- final orchestration summary
- ordered delegation plan
- notes on parallelizable tasks
- explicit list of upstream-friendly later slices

## Dependencies

- `00_repo-coordination.task.md`
- `03_coding-guidelines-and-builder-prompt.task.md`
- `04_ui-design-system-and-mockups.task.md`
- `05_architecture-and-domain-boundaries.task.md`
- `06_persistence-and-export-plan.task.md`
- `07_case-taxonomy-and-provenance.task.md`
- `08_source-intake-packet.task.md`
- `09_planner-logic-spec.task.md`
- `10_ui-implementation-packets.task.md`
- `11_regression-review-packet.task.md`

## Review Checkpoint

User signs off on the orchestration bundle before delegating work to separate agents.
