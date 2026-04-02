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

Finalize trainer export/import round-trip behavior once the trainer state and content catalog are real.

## Scope

- validate export/import with meaningful trainer data
- ensure content-backed trainer state survives round-trip
- harden compatibility against missing or older trainer payloads

## Definition of Done

- round-trip behavior works with actual trainer usage, not only empty scaffolding

## Expected Artifacts

- finalized export/import implementation
- review evidence
- docs sync if invariants changed

## References

- `docs/issues/FR-006.md`
- `docs/issues/FR-007.md`
- `docs/architecture/export-import-compatibility.md`

## Review Checkpoint

Review for true round-trip confidence before signoff.
