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

Turn fetched source packets into the structured v1 case catalog with provenance.

## Scope

- normalize source-backed PLL/OLL/cross content into the planned catalog structure
- record provenance, recommendation notes, alternates, and confidence fields
- do not dump raw source content into the product

## Definition of Done

- the content catalog is structured enough for trainer logic and future curation

## Expected Artifacts

- normalized catalog data
- provenance mapping notes
- docs sync if schema details changed

## References

- `docs/issues/FR-007.md`
- `docs/architecture/case-taxonomy.md`
- `docs/architecture/provenance-schema.md`
- `docs/architecture/source-packet-mapping.md`

## Review Checkpoint

Review for structure, provenance integrity, and maintainability before product dependence increases.
