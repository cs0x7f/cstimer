## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-code.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Build execution |

## Objective

Implement trainer-safe export/import handling and verify offline-first expectations are preserved.

## Scope

- wire trainer data into the current export/import flow
- ensure missing trainer data does not break legacy imports
- preserve offline behavior and local-only usage

## Definition of Done

- trainer data round-trips safely
- existing csTimer data export/import remains intact
- offline assumptions are not weakened

## Expected Artifacts

- export/import integration changes
- compatibility notes if implementation forced any doc updates

## References

- `docs/architecture/export-import-compatibility.md`
- `docs/architecture/persistence-plan.md`
- `docs/issues/FR-006.md`

## Review Checkpoint

Review for round-trip safety and backward compatibility before broader trainer state is trusted.
