# Source Packet Mapping Guide — v1

**Date:** 2026-04-02
**Session:** orch-20260402-034801
**Task:** 07_case-taxonomy-and-provenance
**Depends on:** case-taxonomy.md, provenance-schema.md

---

## Purpose

Tell normalization agents exactly how to convert a user-fetched source packet into structured `CaseCatalog` records. This document is the bridge between raw source intake (user-provided) and the canonical catalog format.

---

## Input: Source Packet Shapes

The intake flow has two layers:

1. **Raw human-authored intake note** for collection and review.
2. **Normalized JSON handoff packet** for downstream normalization agents.

### Raw intake note

A user source intake packet can start in this review-friendly shape (matches `user_source_intake_round_01.md`):

```markdown
### Source
- Name: J Perm PLL
- URL: https://jperm.net/algs/pll
- Type: page
- Tags: PLL, Ua, H, recognition
- Notes:
  - provides standard 2-look PLL progression
  - includes recognition tips per case
- Trust Note: broadly trusted community reference
```

Fields: `Name`, `URL`, `Type`, `Tags`, `Notes`, `Trust Note`.

### Normalized JSON handoff

Before catalog normalization begins, convert the raw intake note into this concrete JSON packet shape:

```json
{
  "sourceRef": "jperm-pll",
  "sourceName": "J Perm PLL",
  "sourceUrl": "https://jperm.net/algs/pll",
  "sourceType": "page",
  "confidence": "high",
  "entries": [
    {
      "caseId": "PLL-Ua",
      "algorithms": [
        {
          "notation": "R U' R U R U R U' R' U' R2",
          "variantLabel": "standard",
          "notes": "common speedsolving default"
        }
      ],
      "notes": "recognition tips included on source page"
    }
  ],
  "notes": "broadly trusted community reference"
}
```

Required JSON fields for FR-007 compliance:
- top level: `sourceRef`, `sourceName`, `sourceUrl`, `sourceType`, `confidence`, `entries`
- per entry: `caseId`, `algorithms`
- per algorithm: `notation`
- optional per entry or algorithm: `notes`, `variantLabel`

---

## Step-by-Step Normalization

### Step 1: Generate a `sourceRef`

From the packet `Name` and URL:

| Packet Name | sourceRef |
|---|---|
| J Perm PLL | `jperm-pll` |
| CubeSkills PLL Introduction | `cubeskills-pll-intro` |
| CubeSkills 2-Look LL | `cubeskills-2look-ll` |
| SpeedCubeDB 3x3 | `speedcubedb-3x3` |
| Cube Academy Finger Tricks | `cubeacademy-fingertricks` |

If the source is not pre-registered, generate by: lowercase the domain prefix + hyphen + topic slug.

### Step 2: Assign confidence

From `Trust Note`:

| Trust Note Keywords | confidence |
|---|---|
| "widely trusted", "community standard", "Feliks", "CubeSkills", "J Perm" | `high` |
| "useful reference", "variant", "comparative" | `medium` |
| "personal", "unverified", "niche", "blog" | `low` |

If ambiguous, default to `medium` and note the judgment in provenance `notes`.

### Step 3: Create a `ProvenanceRecord`

```json
{
  "sourceRef": "jperm-pll",
  "sourceName": "J Perm PLL",
  "sourceUrl": "https://jperm.net/algs/pll",
  "sourceType": "page",
  "confidence": "high",
  "contributedAt": "<ISO now>",
  "lastVerifiedAt": null,
  "notes": "broadly trusted community reference",
  "coversAlgorithms": []
}
```

`coversAlgorithms` is populated in Step 5 after algorithms are extracted.

### Step 4: Build normalized `entries[]` and match cases

For each case mentioned in the packet:

1. Read `Tags` and `Notes` for case identifiers (PLL names like "Ua", OLL numbers like "OLL 27").
2. Map to canonical IDs using case-taxonomy.md:

| Source mentions | Canonical ID |
|---|---|
| `Ua`, `U-perm a`, `U(a)` | `PLL-Ua` |
| `OLL 27`, `OLL-27`, `OLL27` | `OLL-27` |
| `white cross` | `CROSS-WHITE` |

3. If the source uses a non-standard naming scheme, check against the full PLL/OLL tables in case-taxonomy.md. When in doubt, ask the user or flag in a normalization note.
4. Emit one JSON `entries[]` item per matched canonical case ID.

### Step 5: Extract algorithms per case

For each case found:

1. Extract the algorithm notation from the source content.
2. Clean to standard Singmaster: remove setup moves, y/z rotations, comments.
3. Count HTM moves for `moveCount`.
4. Determine `handedness`:
   - Mostly R, U, F moves → `"right"`
   - Mostly L, U, B moves → `"left"`
   - Balanced or M/E/S moves → `"neutral"`
5. Generate `algorithmId`: `{caseId}-alg-{n}` where n increments per case.
6. If this is the first algorithm for this case from any source: `recommended: true`.
7. Add the `sourceRef` to the algorithm's `sourceRefs` array.
8. Write the cleaned algorithm(s) into the normalized JSON packet under the matching `entries[]` item before catalog merge begins.

### Step 6: Assign difficulty tier

| Source provides tier? | Action |
|---|---|
| Yes | Use it |
| No | Set `difficultyTier: 3` (neutral) and add `"[needs-tier-review]"` to notes |

### Step 7: Assign group tags

From the case's canonical ID, look up its sub-group in case-taxonomy.md:

| caseId | groupTags |
|---|---|
| `PLL-Ua` | `["PLL-EDGE"]` |
| `OLL-01` | `["OLL-DOT"]` |
| `OLL-21` | `["OLL-CROSS-LINE"]` |
| `CROSS-WHITE` | `[]` |

Cross cases do not use recognition sub-groups.

### Step 8: Merge or create catalog record

| Situation | Action |
|---|---|
| `caseId` not in catalog | Create new `CaseCatalog` record with this source's algorithm(s) |
| `caseId` exists, algorithm is new | Add `AlgorithmEntry` to existing record |
| `caseId` exists, algorithm matches existing | Add `sourceRef` to existing algorithm's `sourceRefs` |
| `caseId` exists, algorithm conflicts | Add as alternate (`recommended: false`); note conflict |

### Step 9: Write the record

Follow the exact shapes from provenance-schema.md. Validate against the rules in that document before writing.

---

## Multi-Source Merge Order

When processing multiple source packets in a batch:

1. Process **high-confidence** sources first (they set the default recommendation).
2. Then process **medium-confidence** sources (they contribute alternates).
3. Then process **low-confidence** sources (they contribute alternates only; never override a default).

If two high-confidence sources disagree on which algorithm is recommended:
- Keep both as alternates.
- Pick the shorter algorithm as `recommended: true`.
- Log the conflict in the case's `notes` field.

---

## Normalization Checklist

For each source packet, the normalization agent should confirm:

- [ ] `sourceRef` generated and matches convention
- [ ] `ProvenanceRecord` created with correct confidence
- [ ] All cases mentioned in Tags/Notes mapped to canonical IDs
- [ ] Each algorithm extracted with clean Singmaster notation
- [ ] `moveCount` calculated in HTM
- [ ] `handedness` assigned
- [ ] `algorithmId` follows `{caseId}-alg-{n}` format
- [ ] Exactly one `recommended: true` per case
- [ ] `sourceRefs` on algorithms point to valid provenance records
- [ ] `groupTags` match case-taxonomy.md sub-groups
- [ ] `difficultyTier` is 1-5 or flagged for review
- [ ] No duplicate `caseId` records in the catalog

---

## Edge Cases

| Situation | Handling |
|---|---|
| Source provides a variant not in standard PLL/OLL (e.g., COLL case) | Skip it for v1. Log in notes as "source includes non-v1 cases" |
| Source uses non-standard notation (wide moves, rotations) | Convert to standard Singmaster if possible; flag if ambiguous |
| Source provides no algorithm, only description | Keep it in intake review notes or a deferred-source list. Do not create a `CaseCatalog` record until at least one algorithm is available |
| Source URL is a video with no text algorithm | Extract algorithm from video description or transcript; note "video-derived" in provenance notes |
| Source provides multiple algorithms for one case, all marked equal | All become alternates; pick the shortest as recommended |
| Source mentions a case that does not exist in the taxonomy | Stop and report to user; do not invent case IDs |

---

## Review Checkpoint

User approves this mapping guide before T08 (source intake) proceeds.
