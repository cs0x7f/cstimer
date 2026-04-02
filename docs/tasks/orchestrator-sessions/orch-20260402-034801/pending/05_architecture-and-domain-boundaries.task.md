## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-orchestrator.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Orchestrated architecture planning |
| avoid-feature-creep | Protect v1 from rewrite pressure |

## Objective

Define the trainer as a domain layer that fits inside csTimer now and can move into a TypeScript app later.

## Scope

- refine the contracts in `docs/features/TrainerV1.md`
- separate portable trainer concepts from csTimer-specific adapters
- define the role of `TrainingProfile`, `TrainingPlan`, `DrillDefinition`, `SkillStats`, `WeaknessScore`, `TrainingSessionResult`, and future `SyncEvent`

## Definition of Done

- domain boundaries are explicit
- later implementation agents know which concerns belong in the trainer layer versus csTimer integration glue

## Expected Artifacts

- architecture note or appendix
- refined feature blueprint sections
- future extraction boundary notes

## Dependencies

- `02_prd-and-issues.task.md`

## Review Checkpoint

User approves the domain boundaries before persistence and planner logic tasks proceed.
