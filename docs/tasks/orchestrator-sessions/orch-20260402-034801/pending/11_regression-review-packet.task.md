## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-review.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Review-oriented orchestration |
| sync-docs | Keep review and docs aligned |

## Objective

Create the regression and verification packet that later review agents will use while trainer features are implemented.

## Scope

- define verification areas for timer behavior, scramble behavior, solve-history compatibility, trainer persistence, export/import, and offline assumptions
- map each area to the affected FRs
- define the minimum review evidence later agents must provide

## Definition of Done

- the review packet is explicit enough that later implementation can be checked consistently instead of by memory

## Expected Artifacts

- regression checklist
- FR-to-verification mapping
- evidence expectations for later implementation reviews

## Dependencies

- `05_architecture-and-domain-boundaries.task.md`
- `06_persistence-and-export-plan.task.md`
- `09_planner-logic-spec.task.md`

## Review Checkpoint

User approves the verification matrix before major implementation tasks are assigned.
