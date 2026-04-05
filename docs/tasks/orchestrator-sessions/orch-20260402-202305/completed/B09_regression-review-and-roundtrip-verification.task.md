## 🔧 Agent Setup (DO THIS FIRST)

### Workflow to Follow
> Read `C:\Users\johno\.agents\skills\takomi\workflows\mode-review.md`

### Prime Agent Context
> MANDATORY: Read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`

### Required Skills
| Skill | Why |
|-------|-----|
| takomi | Review task under execution orchestration |

## Objective

Run the full regression review, code cleanup, and export/import round-trip verification pass, then fix what is necessary.

## Scope

- timer behavior
- scramble behavior
- solve-history compatibility
- trainer persistence safety
- export/import round-trip behavior
- UI mismatch with mockups
- docs drift

## Definition of Done

- review findings are addressed or explicitly documented
- code quality and project organization are good enough to keep building safely

## Expected Artifacts

- review findings
- cleanup/fix commits or patches
- updated task statuses

## References

- `docs/issues/FR-001.md` through `docs/issues/FR-007.md`
- `docs/Coding_Guidelines.md`
- `docs/architecture/export-import-compatibility.md`

## Review Checkpoint

User gets a clear pass/fail summary with round-trip evidence before the build wave is called stable.
