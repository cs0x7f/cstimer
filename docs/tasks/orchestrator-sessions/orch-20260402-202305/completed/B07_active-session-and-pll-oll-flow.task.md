## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-code.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Build/content task orchestration |

## Objective

Implement the active session surface and PLL/OLL training flow on top of the approved setup, planner, storage, and shared shell work.

## Scope

- build the active session flow from the approved mockup
- drive the flow with planner output and stored trainer state
- support PLL/OLL drill execution for v1
- capture the review inputs needed for the later session-review task

## Definition of Done

- active sessions work end to end for the approved v1 last-layer flow
- state capture is real enough to support the next review and summary task

## Expected Artifacts

- active session UI
- PLL/OLL drill execution flow
- related session data capture

## References

- `docs/issues/FR-003.md`
- `docs/mockups/active-session-queue.html`
- `docs/architecture/planner-logic-spec.md`

## Review Checkpoint

Review for active-session correctness and regression risk before post-session review work begins.
