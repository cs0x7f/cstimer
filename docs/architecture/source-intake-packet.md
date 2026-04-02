# Source Intake Packet — v1

**Date:** 2026-04-02
**Session:** orch-20260402-034801
**Task:** 08_source-intake-packet
**Depends on:** source_registry.md, case-taxonomy.md, provenance-schema.md, source-packet-mapping.md

---

## Purpose

Give you a single document that tells you exactly which pages to visit, what to look for, and how to hand it back — so a normalization agent can turn your fetches into catalog records without guessing.

---

## Prioritized Fetch List

### Tier 1 — Fetch First (High Confidence, Core Content)

These sources are the algorithm backbone. Fetch them before anything else.

| # | Source | URL | Why It Matters | Covers |
|---|---|---|---|---|
| 1 | **J Perm PLL** | https://jperm.net/algs/pll | Community-standard PLL reference. Approachable framing, recognition tips per case. | All 21 PLL cases |
| 2 | **CubeSkills PLL Intro** | https://www.cubeskills.com/tutorials/pll-algorithms/introduction | High-trust last-layer framing from Feliks Zemdegs' platform. Strong terminology. | All 21 PLL cases |

### Tier 2 — Fetch Second (Structured Progression, Recognition Groups)

These sources add 2-look OLL structure and recognition-group coverage.

| # | Source | URL | Why It Matters | Covers |
|---|---|---|---|---|
| 3 | **CubeSkills 2-Look LL** | https://www.cubeskills.com/tutorials/2-look-last-layer | Defines the returning-cuber progression path. Covers 2-look OLL phases. | OLL 1-4, 21-27, 57 + PLL subset |

### Tier 3 — Fetch Third (Variants, Execution Notes)

These add algorithm variants and fingertrick detail. Fetch after tier 1-2 are normalized.

| # | Source | URL | Why It Matters | Covers |
|---|---|---|---|---|
| 4 | **SpeedCubeDB 3x3** | https://www.v6.speedcubedb.com/a/3x3 | Broad variant comparison. Many algorithms per case. Good for alternate picks. | PLL + OLL variants |
| 5 | **Cube Academy Finger Tricks** | https://www.cube.academy/finger-tricks | Execution-focused notes. Fingertrick annotations per algorithm. | Selected PLL/OLL cases |

---

## Why Grouping Matters

| Group | Sources | What They Set |
|---|---|---|
| **Core PLL algorithms** | #1 J Perm, #2 CubeSkills PLL | Default recommended algorithms for all 21 PLL cases |
| **2-look progression** | #3 CubeSkills 2-Look LL | Phase mapping for returning-cuber OLL path |
| **Variant comparison** | #4 SpeedCubeDB | Alternate algorithms, shorter or left-handed variants |
| **Execution quality** | #5 Cube Academy | Fingertrick notes, handedness confirmation |

Processing order matters: high-confidence sources (#1, #2) set `recommended: true` algorithms. Lower-confidence or variant sources (#4, #5) add alternates without overriding defaults.

---

## What To Bring Back For Each Source

For each source you fetch, produce a **source packet** with these fields. Fill in as much as you can from the page. Leave a field blank rather than guessing.

### Required Fields

| Field | What To Capture | Example |
|---|---|---|
| **Name** | Source name from the registry or the page title | `J Perm PLL` |
| **URL** | Exact URL you fetched | `https://jperm.net/algs/pll` |
| **Type** | `page`, `video`, or `mixed` | `page` |
| **Tags** | Case names or numbers mentioned on the page | `PLL, Ua, Ub, H, Z, T, Y, recognition` |
| **Trust Note** | Your sense of how trusted this source is | `broadly trusted community reference` |

### Content To Extract

| What To Look For | How To Capture It |
|---|---|
| **Algorithms** | Copy the Singmaster notation exactly (e.g. `R U R' U' R' F R2 U' R' U' R U R' F'`) |
| **Case-to-algorithm mapping** | Note which algorithm goes with which case name/number |
| **Recognition tips** | Any text about how to visually identify the case |
| **Fingertrick notes** | Any execution advice, grip notes, or regrip warnings |
| **Difficulty or progression info** | Any mention of "beginner", "advanced", recommended order |
| **Multiple algorithms per case** | Capture all variants. Note if the source marks one as "main" or "recommended" |

### Notes Field

Use the `Notes` section to capture:
- Anything unusual about the page layout or data structure
- Cases where the source uses non-standard naming
- Missing cases (e.g., source covers 19 of 21 PLLs)
- Video timestamps if the source is a video

---

## Source Packet Template

Copy this template for each source you fetch. Fill in the sections.

```markdown
### Source Packet: [Source Name]

- **Name:** [source name]
- **URL:** [exact URL]
- **Type:** [page / video / mixed]
- **Tags:** [comma-separated case names or numbers]
- **Trust Note:** [your assessment]

#### Algorithms Found

| Case | Algorithm (Singmaster) | Source Marks As |
|---|---|---|
| PLL-Ua | R U' R U R U R U' R' U' R2 | main |
| PLL-Ub | R2 U R U R' U' R' U' R' U R' | main |
| ... | ... | ... |

#### Recognition Tips

[paste or summarize any recognition guidance]

#### Fingertrick / Execution Notes

[paste or summarize any execution advice]

#### Difficulty / Progression Info

[note any tier, difficulty, or ordering information]

#### Other Notes

[anything else worth capturing]
```

---

## What NOT To Do

- **Do not reformat algorithms.** Copy notation exactly as shown on the source page. The normalization agent handles cleaning.
- **Do not skip cases.** If the source covers 15 of 21 PLLs, list the 15 and note which 6 are missing.
- **Do not assign confidence yourself.** State what you observe (e.g., "site is run by well-known cuber") and let the normalization agent assign the level.
- **Do not capture setup moves or scramble states.** Only the solving algorithm notation.
- **Do not fetch multiple pages from the same site in one packet.** One packet per URL.

---

## After You Fetch

Hand back your completed source packets as a single file:

```
docs/architecture/user-source-intake-round-01.md
```

A normalization agent will then:
1. Read your packets against `source-packet-mapping.md`
2. Generate `sourceRef` values and `ProvenanceRecord` objects
3. Extract algorithms into `AlgorithmEntry` records
4. Merge into `CaseCatalog` following the multi-source merge order (high-confidence first)
5. Flag edge cases per the mapping guide

---

## Review Checkpoint

User approves this fetch list, then performs the source pull manually. Return completed packets for normalization.

---

## Quick Reference

| Step | Action |
|---|---|
| 1 | Visit each URL in the prioritized list |
| 2 | Copy the source packet template |
| 3 | Fill in required fields and content |
| 4 | Save all packets to `docs/architecture/user-source-intake-round-01.md` |
| 5 | Hand off to normalization agent |
