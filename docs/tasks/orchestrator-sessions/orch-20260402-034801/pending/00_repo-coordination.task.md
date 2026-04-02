## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-orchestrator.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | This is an orchestration and repo-coordination task |
| avoid-feature-creep | Keep fork strategy from turning into rewrite scope |

## Objective

Produce a repo coordination brief that explains how this project should operate with `origin = fork` and `upstream = original csTimer repo`.

## Scope

- document the intended remote model
- define branch and contribution policy for fork-first work
- define how to separate upstream-friendly slices from fork-only product bets

## Out of Scope

- actually changing git remotes
- building features

## Definition of Done

- a later agent could execute repo setup without asking what `origin` and `upstream` should mean
- future task packets can reference a stable contribution policy

## Expected Artifacts

- repo coordination note in the session summary
- explicit command suggestions for adding `upstream` later

## Dependencies

- none

## Review Checkpoint

User approves the fork/upstream operating model before any upstream-aware implementation work is delegated.
