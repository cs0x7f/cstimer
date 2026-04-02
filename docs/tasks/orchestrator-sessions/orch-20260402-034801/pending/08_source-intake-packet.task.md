## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-orchestrator.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | This is a human-in-the-loop orchestration task |

## Objective

Produce the first user-facing source intake packet that tells the user exactly which creator pages or videos to fetch next.

## Scope

- use `source_registry.md` as the starting point
- group sources by why they matter
- define what the user should bring back for each source

## Definition of Done

- the user can fetch source material without guessing format or priority
- a later normalization agent can work from the returned packet cleanly

## Expected Artifacts

- prioritized fetch list
- intake instructions
- expected return format

## Dependencies

- `07_case-taxonomy-and-provenance.task.md`

## Review Checkpoint

User approves the fetch list and then performs the source pull manually.
