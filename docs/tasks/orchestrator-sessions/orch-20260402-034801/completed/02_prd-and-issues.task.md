## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-genesis.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Genesis and issue planning |
| avoid-feature-creep | Prevent FR sprawl |

## Objective

Audit and refine the PRD and FR issue set so later agents work from stable acceptance criteria.

## Scope

- review `docs/project_requirements.md`
- review all `docs/issues/FR-XXX.md`
- tighten wording where ambiguity remains
- ensure each FR maps cleanly to an implementable concern

## Definition of Done

- FR set is internally consistent
- MUS priorities are explicit
- acceptance criteria are testable

## Expected Artifacts

- reviewed PRD
- reviewed FR issue set
- short note on any FR merges, splits, or clarifications

## Dependencies

- `01_vision-brief.task.md`

## Review Checkpoint

User approves the FR list before downstream design, architecture, or build-packet work continues.
