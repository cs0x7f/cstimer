## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-orchestrator.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Orchestrated planning |
| sync-docs | This task is mostly data-flow documentation |

## Objective

Define the local-first persistence model and export/import expectations for trainer data.

## Scope

- identify trainer data ownership
- define where trainer data should remain separate from raw solves
- define round-trip expectations for export/import
- document offline-first guarantees and risks

## Definition of Done

- later implementation agents know what must persist, how it must coexist with solve data, and what compatibility needs verification

## Expected Artifacts

- persistence plan
- export/import compatibility checklist
- documented risks and open questions if any remain

## Dependencies

- `05_architecture-and-domain-boundaries.task.md`

## Review Checkpoint

User approves the local-first and compatibility model before implementation planning continues.
