# Task 07 Result: Case Taxonomy and Provenance Schema

**Task:** 07_case-taxonomy-and-provenance
**Status:** Complete
**Date:** 2026-04-02

---

## Artifacts Produced

| Artifact | Path | Purpose |
|---|---|---|
| Case Taxonomy | `docs/architecture/case-taxonomy.md` | v1 case groups, canonical IDs, grouping rules, recognition sub-groups |
| Provenance Schema | `docs/architecture/provenance-schema.md` | CaseCatalog record shape, AlgorithmEntry, ProvenanceRecord, validation rules |
| Source Packet Mapping | `docs/architecture/source-packet-mapping.md` | Step-by-step guide for normalizing user source packets into catalog records |

---

## Summary

### Taxonomy

- **PLL:** 21 cases, canonical IDs `PLL-<WCA suffix>` (e.g. `PLL-Ua`, `PLL-Gd`). Grouped into 5 recognition sub-groups: EDGE, CORNER-ONLY, DIAG, ADJ, G.
- **OLL:** 57 cases, canonical IDs `OLL-<2-digit>` (e.g. `OLL-01`, `OLL-57`). Grouped into 18 pattern-based sub-groups. 2-look OLL phases defined for returning-cuber progression.
- **Cross:** 5 drill modes (WHITE, YELLOW, CN, PLAN, EXEC). Identified by mode, not by fixed case set.

### Provenance

- `CaseCatalog` records: one per case, containing algorithms, provenance, group tags, and difficulty tier.
- `AlgorithmEntry`: Singmaster notation, handedness, move count, recommended flag, source refs.
- `ProvenanceRecord`: source name/url/type, confidence (high/medium/low), coverage links.
- Validation rules: one record per caseId, exactly one recommended algorithm, no unattributed content.

### Mapping

- 9-step normalization process from user source packet to catalog record.
- SourceRef generation, confidence assignment, case matching, algorithm extraction, merge rules.
- Concrete JSON handoff packet defined for downstream normalization, including `caseId`, `algorithms`, `sourceRef`, and optional notes.
- Multi-source merge order: high-confidence first, conflict resolution by shortest algorithm.
- Edge cases handled for non-v1 cases, non-standard notation, video sources, and missing data.

---

## Scope Compliance

- **In scope:** PLL 21, OLL 57, cross drill modes. Taxonomy IDs, grouping, provenance fields, normalization rules.
- **Out of scope:** F2L cases, COLL/WV/ZBLL, 4x4 parity, exact cross state cataloging. These are deferred per vision brief.
- **Feature creep check:** No algorithm data itself was generated — only the schema and rules. Actual algorithm population is deferred to T08 (source intake) when user source packets are available.

---

## Dependencies Satisfied

- T02 (PRD/FRs): FR-007 "Source-Backed Case Catalog" is the primary driver. Schema covers provenance expectations.
- T05 (Architecture): `CaseCatalog`, `AlgorithmEntry`, `ProvenanceRecord` types from domain-boundaries.md are now synchronized with the Task 7 schema.

---

## Review Fixes Applied

- Added the missing concrete JSON handoff packet format so FR-007 is satisfied before T08 source intake work begins.
- Synchronized `domain-boundaries.md` with the richer Task 7 catalog and provenance fields to avoid hidden schema drift for T08, T09, and T10.
- Corrected the provenance field typing and clarified that descriptive-only sources do not create zero-algorithm catalog records.

---

## Downstream Impact

| Task | What this enables |
|---|---|
| T08 Source Intake | Can fetch sources and normalize into catalog records using the mapping guide |
| T09 Planner Logic | `generateQueue()` can reference case taxonomy groups and difficulty tiers |
| T10 UI Packets | UI can display case names, algorithms, and provenance attribution |

---

## Review Checkpoint

**User approval required** on the catalog shape before T08 or T09 proceed.

Key decisions to approve:
1. PLL/OLL canonical ID format (`PLL-Ua`, `OLL-01`)
2. Recognition sub-group definitions
3. Provenance confidence levels (high/medium/low)
4. One-recommended-algorithm-per-case rule
5. 2-look OLL phase mapping for returning-cuber progression
