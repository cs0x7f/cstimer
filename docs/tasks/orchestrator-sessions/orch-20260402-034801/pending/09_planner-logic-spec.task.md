## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-orchestrator.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Orchestrated architecture task |
| avoid-feature-creep | Keep logic powerful but bounded for v1 |

## Objective

Specify the weakness-scoring, drill weighting, and session block sequencing rules for v1.

## Scope

- define weakness inputs
- define weighting and anti-starvation behavior
- define session structure such as warmup, focus block, integration, and review
- align review outputs with the planner logic

## Definition of Done

- the planning logic is explicit enough for a later implementation agent to build without product ambiguity

## Expected Artifacts

- planner logic spec
- weighting rules
- session sequencing rules

## Dependencies

- `05_architecture-and-domain-boundaries.task.md`
- `07_case-taxonomy-and-provenance.task.md`

## Review Checkpoint

User approves the training philosophy and weighting logic before implementation briefs are created.
