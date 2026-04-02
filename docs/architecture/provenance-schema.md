# Provenance Schema — v1

**Date:** 2026-04-02
**Session:** orch-20260402-034801
**Task:** 07_case-taxonomy-and-provenance
**Depends on:** domain-boundaries.md, case-taxonomy.md

---

## Purpose

Define the provenance and algorithm entry shapes for the `CaseCatalog` type so that normalization agents can populate catalog records without inventing attribution fields.

---

## CaseCatalog Record

Each catalog entry is a plain object. One record per case.

| Field | Type | Required | Description |
|---|---|---|---|
| `caseId` | `string` | yes | Canonical ID from case-taxonomy.md (e.g. `PLL-T`, `OLL-27`) |
| `category` | `"PLL" \| "OLL" \| "cross"` | yes | Case family |
| `name` | `string` | yes | Human-readable name (e.g. `"T-perm"`, `"OLL 27"`) |
| `groupTags` | `string[]` | yes | Recognition sub-group tags (e.g. `["PLL-DIAG"]`, `["OLL-SMALL-L"]`) |
| `twoLookPhase` | `"edges" \| "corners" \| "dot-resolve" \| null` | no | 2-look OLL phase this case belongs to (PLL and cross = `null`) |
| `algorithms` | `AlgorithmEntry[]` | yes | At least one; first entry is the default recommendation |
| `provenance` | `ProvenanceRecord[]` | yes | Source attribution — one or more records |
| `difficultyTier` | `number` (1-5) | yes | Relative difficulty estimate |
| `notes` | `string` | no | Free-text catalog notes (mnemonics, recognition tips) |
| `fingersTrickNotes` | `string` | no | Execution-specific note from source or maintainer |
| `updatedAt` | `ISODateString` | yes | Last modification timestamp |

---

## AlgorithmEntry

One per algorithm variant for a case. A case may have a recommended algorithm plus alternates.

| Field | Type | Required | Description |
|---|---|---|---|
| `algorithmId` | `string` | yes | Unique within the case: `{caseId}-alg-{n}` (e.g. `PLL-T-alg-1`) |
| `notation` | `string` | yes | Singmaster notation (e.g. `"R U R' U' R' F R2 U' R' U' R U R' F'"`) |
| `variantLabel` | `string` | no | Short label (e.g. `"standard"`, `"left-handed"`, `"2-gen"`) |
| `handedness` | `"right" \| "left" \| "neutral"` | yes | Dominant hand orientation |
| `recommended` | `boolean` | yes | `true` if this is the primary/default algorithm for this case |
| `moveCount` | `number` | yes | HTM (half-turn metric) move count |
| `sourceRefs` | `string[]` | yes | References to `ProvenanceRecord.sourceRef` values that cite this algorithm |

**Rules:**
- Exactly one algorithm per case has `recommended: true`.
- If a source provides only one algorithm for a case, it becomes `recommended: true`.
- Additional algorithms from other sources become alternates (`recommended: false`).
- `notation` uses standard Singmaster face turns with `'` for inverse and `2` for double. No wide moves (`w`) in v1 PLL/OLL.

---

## ProvenanceRecord

Each provenance record attributes a piece of catalog content to a source.

| Field | Type | Required | Description |
|---|---|---|---|
| `sourceRef` | `string` | yes | Stable identifier for this source (e.g. `"jperm-pll"`, `"cubeskills-2look-oll"`) |
| `sourceName` | `string` | yes | Human-readable source name (e.g. `"J Perm PLL"`, `"CubeSkills 2-Look LL"`) |
| `sourceUrl` | `string` | yes | Original URL the content came from |
| `sourceType` | `"page" \| "video" \| "mixed"` | yes | What kind of resource |
| `confidence` | `"high" \| "medium" \| "low"` | yes | Maintainer-assessed trust level |
| `contributedAt` | `ISODateString` | yes | When this provenance was added to the catalog |
| `lastVerifiedAt` | `ISODateString \| null` | no | When a maintainer last confirmed the source still matches |
| `notes` | `string` | no | Why this source was chosen, caveats, or editorial context |
| `coversAlgorithms` | `string[]` | no | Which `algorithmId` values this source contributed to (empty = general reference only) |

### Confidence Levels

| Level | Meaning | When to assign |
|---|---|---|
| `high` | Widely accepted community reference; algorithm is consensus-standard | Established sources like J Perm, Feliks/Zemdegs, CubeSkills |
| `medium` | Credible source but may have stylistic or regional variation | SpeedCubeDB variants, smaller community creators |
| `low` | Useful as reference but algorithm or recommendation may be non-standard or niche | Personal blogs, unverified submissions |

**Rules:**
- Normalization agents assign confidence based on source reputation, not content analysis.
- If the same algorithm appears in multiple sources, each source gets its own `ProvenanceRecord` with its own confidence.
- `lastVerifiedAt` is set when a maintainer confirms the source URL is live and content matches.

---

## Source Reference ID Format

`sourceRef` values follow a stable naming convention:

| Format | Example |
|---|---|
| `{domain-prefix}-{topic}` | `jperm-pll`, `cubeskills-2look-oll`, `speedcubedb-3x3`, `cubeacademy-fingertricks` |

**Rules:**
- Lowercase, kebab-case.
- Domain prefix is the recognizable short name of the site (no `.com`).
- Topic suffix indicates the specific page or content set.
- `sourceRef` is immutable once assigned. If a source URL changes, update `sourceUrl` but keep `sourceRef`.

---

## How Provenance and Algorithms Link

```
CaseCatalog Record
├── algorithms[]
│   ├── algorithmId: "PLL-T-alg-1"
│   ├── notation: "R U R' U' R' F R2 U' R' U' R U R' F'"
│   ├── recommended: true
│   └── sourceRefs: ["jperm-pll", "cubeskills-pll-intro"]
│
├── algorithms[]
│   ├── algorithmId: "PLL-T-alg-2"
│   ├── notation: "R' U R' U' R D' R' D R' U D' R2 U' R2 D R2"
│   ├── recommended: false
│   └── sourceRefs: ["speedcubedb-3x3"]
│
└── provenance[]
    ├── sourceRef: "jperm-pll"
    ├── confidence: "high"
    └── coversAlgorithms: ["PLL-T-alg-1"]
    
    ├── sourceRef: "cubeskills-pll-intro"
    ├── confidence: "high"
    └── coversAlgorithms: ["PLL-T-alg-1"]

    └── sourceRef: "speedcubedb-3x3"
    ├── confidence: "medium"
    └── coversAlgorithms: ["PLL-T-alg-2"]
```

An algorithm can be cited by multiple sources (consensus). A source can cite multiple algorithms for the same case (variant provider).

---

## Difficulty Tier Guide

| Tier | Meaning | Examples |
|---|---|---|
| 1 | Simple, few moves, obvious recognition | PLL-Ua, PLL-Ub, OLL-21 |
| 2 | Standard, commonly taught early | PLL-H, PLL-Z, OLL-22-24 |
| 3 | Moderate complexity, common in practice | PLL-T, PLL-J, OLL-dot cases |
| 4 | Heavier algorithms, harder recognition | PLL-G, PLL-N, OLL-awkward |
| 5 | Rare in solves or very long algorithms | PLL-V, PLL-F, some dot OLLs |

Tiers are **relative** within category. A tier-3 PLL is harder than a tier-1 PLL, not necessarily easier than a tier-3 OLL.

---

## Validation Rules for Normalization Agents

When populating the catalog from source packets, enforce:

1. **One record per `caseId`.** Merge sources into existing records; do not create duplicates.
2. **Exactly one `recommended: true` algorithm per case.** If multiple sources disagree, the first high-confidence source wins. Log the conflict in `notes`.
3. **At least one `ProvenanceRecord` per case.** No unattributed content in the catalog.
4. **`algorithmId` is unique across the catalog.** Format: `{caseId}-alg-{n}`.
5. **`sourceRefs` on algorithms must reference valid `ProvenanceRecord.sourceRef` values** in the same record.
6. **`groupTags` must use sub-group names from case-taxonomy.md.** Do not invent new group names without updating the taxonomy.
7. **`difficultyTier` must be 1-5.** If the source does not provide tier info, leave at 3 (neutral) and flag for maintainer review.
8. **`notation` must be valid Singmaster.** Reject or flag entries with non-standard notation (rotations in brackets, cube rotations, etc.).
9. **Do not create a `CaseCatalog` record with zero algorithms.** If a source is descriptive-only, keep it in source intake review notes until an algorithm-backed record can be created.

---

## Conflict Resolution

When two sources disagree on the recommended algorithm:

| Scenario | Resolution |
|---|---|
| Same algorithm, different notation | Verify they are equivalent; pick the shorter or more standard form |
| Different algorithms, both high confidence | Keep both as alternates; pick the one from the more established source as default; note the disagreement |
| Source retracts or changes algorithm | Keep old as alternate; update provenance notes; set `lastVerifiedAt` |
| Source URL goes dead | Set `lastVerifiedAt: null`; keep the algorithm (content was captured at fetch time) |

---

## Review Checkpoint

User approves this provenance schema before T08 (source intake) or T09 (planner logic) proceed.
