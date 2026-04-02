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

Implement the adaptive PLL/OLL drill queue using the approved planner logic and case taxonomy.

## Scope

- queue generation for v1 last-layer cases
- weighting toward weak cases
- anti-starvation behavior
- drill execution data capture needed for later review

## Definition of Done

- adaptive queue works for PLL/OLL training
- behavior matches planner logic well enough to review, tune, and trust

## Expected Artifacts

- queue logic implementation
- drill execution integration
- any doc sync required by implementation discoveries

## References

- `docs/issues/FR-003.md`
- `docs/architecture/planner-logic-spec.md`
- `docs/architecture/case-taxonomy.md`

## Review Checkpoint

Review for correctness, explainability, and scope discipline before cross or review surfaces build on it.
