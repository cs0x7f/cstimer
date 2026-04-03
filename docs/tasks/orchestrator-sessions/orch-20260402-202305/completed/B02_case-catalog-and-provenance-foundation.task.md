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

Implement the `CaseCatalog` and provenance-backed content foundation for trainer logic.

## Scope

- implement the normalized case catalog shape for v1
- include provenance, recommendation notes, alternates, and confidence fields
- make the structure usable by planner logic without depending on raw source dumps
- bundle the approved initial catalog content if source-backed data is already available

## Definition of Done

- [x] the trainer has a structured catalog foundation for PLL, OLL, and cross content
- [x] the catalog shape matches the planning docs closely enough that planner work can begin without schema guesswork

## Expected Artifacts

- catalog implementation
- provenance-aware data structures
- docs sync if catalog structure changed from the approved schema

## References

- `docs/architecture/case-taxonomy.md`
- `docs/architecture/provenance-schema.md`
- `docs/issues/FR-007.md`

## Review Checkpoint

Review for schema quality, provenance integrity, and planner-readiness before queue work is approved.
