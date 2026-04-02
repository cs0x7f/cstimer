# Case Taxonomy — v1

**Date:** 2026-04-02
**Session:** orch-20260402-034801
**Task:** 07_case-taxonomy-and-provenance
**Depends on:** domain-boundaries.md, TrainerV1.md

---

## Purpose

Define the v1 case groups, canonical identifiers, and grouping rules so that later normalization agents can populate the `CaseCatalog` type without making taxonomy decisions.

---

## v1 Case Groups

### PLL (Permutation of the Last Layer)

21 cases. Affects edge and corner permutation after OLL is solved.

| Canonical ID | Name | WCA Notation | Notes |
|---|---|---|---|
| `PLL-Ua` | U-perm (a) | Ua | Edge 3-cycle, counterclockwise |
| `PLL-Ub` | U-perm (b) | Ub | Edge 3-cycle, clockwise |
| `PLL-Z` | Z-perm | Z | Opposite edge swap |
| `PLL-H` | H-perm | H | Opposite edge swap (symmetric) |
| `PLL-Aa` | A-perm (a) | Aa | Corner 3-cycle, clockwise |
| `PLL-Ab` | A-perm (b) | Ab | Corner 3-cycle, counterclockwise |
| `PLL-E` | E-perm | E | Opposite corner swap (X pattern) |
| `PLL-T` | T-perm | T | Adjacent corner + adjacent edge swap |
| `PLL-Y` | Y-perm | Y | Diagonal corner swap + edge swap |
| `PLL-F` | F-perm | F | T-perm variant with extra setup |
| `PLL-V` | V-perm | V | Diagonal corner swap + edge 3-cycle |
| `PLL-Na` | N-perm (a) | Na | Adjacent corner swap, heavy |
| `PLL-Nb` | N-perm (b) | Nb | Adjacent corner swap, heavy (mirror) |
| `PLL-Ja` | J-perm (a) | Ja | Adjacent corner + adjacent edge, short |
| `PLL-Jb` | J-perm (b) | Jb | Adjacent corner + adjacent edge, short (mirror) |
| `PLL-Ra` | R-perm (a) | Ra | Adjacent corner swap + edge 3-cycle |
| `PLL-Rb` | R-perm (b) | Rb | Adjacent corner swap + edge 3-cycle (mirror) |
| `PLL-Ga` | G-perm (a) | Ga | Adjacent corner + edge, clockwise |
| `PLL-Gb` | G-perm (b) | Gb | Adjacent corner + edge, counterclockwise |
| `PLL-Gc` | G-perm (c) | Gc | Adjacent corner + edge, clockwise (variant) |
| `PLL-Gd` | G-perm (d) | Gd | Adjacent corner + edge, counterclockwise (variant) |

**Grouping rules (PLL):**
- Group by recognition pattern: `U/Z/H` are edge-only; `A/E` are corner-only; `T/Y/F/V` are diag/adj mix; `N/J/R/G` are adjacent-corner-heavy.
- Sub-group G-perms by mirror family: `{Ga, Gb}` and `{Gc, Gd}`.
- Sub-group N-perms by mirror: `{Na, Nb}`.
- J-perm mirrors: `{Ja, Jb}`.

#### PLL Recognition Sub-Groups (for planner weighting)

| Sub-Group | Members | Recognition Affinity |
|---|---|---|
| `PLL-EDGE` | Ua, Ub, Z, H | Solved corners, edges moved |
| `PLL-CORNER-ONLY` | Aa, Ab, E | Solved edges, corners moved |
| `PLL-DIAG` | T, Y, F, V | Diagonal pieces present |
| `PLL-ADJ` | Ja, Jb, Ra, Rb, Na, Nb | Adjacent swap, no diagonal |
| `PLL-G` | Ga, Gb, Gc, Gd | Headlight + block patterns |

---

### OLL (Orientation of the Last Layer)

57 cases. Orients all last-layer pieces before PLL.

| Canonical ID | Name | WCA Notation | Pattern Family |
|---|---|---|---|
| `OLL-01` | OLL 1 | OLL 1 | Dot |
| `OLL-02` | OLL 2 | OLL 2 | Dot |
| `OLL-03` | OLL 3 | OLL 3 | Dot |
| `OLL-04` | OLL 4 | OLL 4 | Dot |
| `OLL-05` | OLL 5 | OLL 5 | Square |
| `OLL-06` | OLL 6 | OLL 6 | Square |
| `OLL-07` | OLL 7 | OLL 7 | Small L |
| `OLL-08` | OLL 8 | OLL 8 | Small L |
| `OLL-09` | OLL 9 | OLL 9 | Small L |
| `OLL-10` | OLL 10 | OLL 10 | Small L |
| `OLL-11` | OLL 11 | OLL 11 | Small L (fishtail) |
| `OLL-12` | OLL 12 | OLL 12 | Small L (fishtail) |
| `OLL-13` | OLL 13 | OLL 13 | P shape |
| `OLL-14` | OLL 14 | OLL 14 | P shape |
| `OLL-15` | OLL 15 | OLL 15 | P shape |
| `OLL-16` | OLL 16 | OLL 16 | P shape |
| `OLL-17` | OLL 17 | OLL 17 | I shape |
| `OLL-18` | OLL 18 | OLL 18 | I shape |
| `OLL-19` | OLL 19 | OLL 19 | I shape |
| `OLL-20` | OLL 20 | OLL 20 | Full cross (all oriented) |
| `OLL-21` | OLL 21 | OLL 21 | Line (bar) |
| `OLL-22` | OLL 22 | OLL 22 | Line (bar) |
| `OLL-23` | OLL 23 | OLL 23 | Line (bar) |
| `OLL-24` | OLL 24 | OLL 24 | Line (bar) |
| `OLL-25` | OLL 25 | OLL 25 | L shape (big) |
| `OLL-26` | OLL 26 | OLL 26 | L shape (big) |
| `OLL-27` | OLL 27 | OLL 27 | L shape (big) |
| `OLL-28` | OLL 28 | OLL 28 | C shape |
| `OLL-29` | OLL 29 | OLL 29 | C shape |
| `OLL-30` | OLL 30 | OLL 30 | C shape |
| `OLL-31` | OLL 31 | OLL 31 | L shape (corner) |
| `OLL-32` | OLL 32 | OLL 32 | L shape (corner) |
| `OLL-33` | OLL 33 | OLL 33 | L shape (corner) |
| `OLL-34` | OLL 34 | OLL 34 | L shape (corner) |
| `OLL-35` | OLL 35 | OLL 35 | T shape |
| `OLL-36` | OLL 36 | OLL 36 | T shape |
| `OLL-37` | OLL 37 | OLL 37 | T shape |
| `OLL-38` | OLL 38 | OLL 38 | W shape |
| `OLL-39` | OLL 39 | OLL 39 | W shape |
| `OLL-40` | OLL 40 | OLL 40 | W shape |
| `OLL-41` | OLL 41 | OLL 41 | Z shape |
| `OLL-42` | OLL 42 | OLL 42 | Z shape |
| `OLL-43` | OLL 43 | OLL 43 | Lightning |
| `OLL-44` | OLL 44 | OLL 44 | Lightning |
| `OLL-45` | OLL 45 | OLL 45 | Lightning |
| `OLL-46` | OLL 46 | OLL 46 | Lightning |
| `OLL-47` | OLL 47 | OLL 47 | Fish shape |
| `OLL-48` | OLL 48 | OLL 48 | Fish shape |
| `OLL-49` | OLL 49 | OLL 49 | Knight move |
| `OLL-50` | OLL 50 | OLL 50 | Knight move |
| `OLL-51` | OLL 51 | OLL 51 | Knight move |
| `OLL-52` | OLL 52 | OLL 52 | Knight move |
| `OLL-53` | OLL 53 | OLL 53 | Awkward shape |
| `OLL-54` | OLL 54 | OLL 54 | Awkward shape |
| `OLL-55` | OLL 55 | OLL 55 | Awkward shape |
| `OLL-56` | OLL 56 | OLL 56 | Awkward shape |
| `OLL-57` | OLL 57 | OLL 57 | H shape (pure edge flip) |

**Grouping rules (OLL):**
- Primary grouping by **pattern family**: dot, square, small-L, P, I, line, big-L, C, corner-L, T, W, Z, lightning, fish, knight, awkward, H.
- Sub-group by **2-look OLL** membership for returning-cuber progression paths.
- Recognize that OLL 20 (full cross) is a degenerate case — always solved, never drilled.

#### OLL Recognition Sub-Groups (for planner weighting)

| Sub-Group | Members | Recognition Affinity |
|---|---|---|
| `OLL-DOT` | 1, 2, 3, 4 | No edges oriented |
| `OLL-SQUARE` | 5, 6 | Small square pattern |
| `OLL-SMALL-L` | 7, 8, 9, 10 | Small L, one edge |
| `OLL-FISHTAIL` | 11, 12 | Fishtail / small L variant |
| `OLL-P` | 13, 14, 15, 16 | P / lightning bolt |
| `OLL-I` | 17, 18, 19 | Line + dot mix |
| `OLL-CROSS-LINE` | 21, 22, 23, 24 | Cross edges formed, line remaining |
| `OLL-BIG-L` | 25, 26, 27 | Large L, no cross |
| `OLL-C` | 28, 29, 30 | C-shaped pattern |
| `OLL-CORNER-L` | 31, 32, 33, 34 | Corner + small L |
| `OLL-T` | 35, 36, 37 | T-shaped pattern |
| `OLL-W` | 38, 39, 40 | W-shaped pattern |
| `OLL-Z` | 41, 42 | Z-shaped pattern |
| `OLL-LIGHTNING` | 43, 44, 45, 46 | Lightning bolt variants |
| `OLL-FISH` | 47, 48 | Fish shape |
| `OLL-KNIGHT` | 49, 50, 51, 52 | Knight move pattern |
| `OLL-AWKWARD` | 53, 54, 55, 56 | Awkward / hard-to-name |
| `OLL-H` | 57 | Pure edge flip, all corners oriented |

#### 2-Look OLL Sub-Sets (for returning-cuber progression)

| Phase | Cases | Purpose |
|---|---|---|
| **2LOLL-edges** | OLL 21, 22, 23, 24, 25, 26, 27, 57 | Orient cross edges first |
| **2LOLL-corners** | OLL 21-27 (plus dot cases 1-4) | Then orient corners |
| **2LOLL-dot-resolve** | OLL 1, 2, 3, 4 | Convert dots to recognizable shapes |

---

### Cross

Cross does not have named permutation cases like PLL/OLL. Instead, cross drills use **state-based** or **goal-based** groupings.

| Canonical ID | Name | Description |
|---|---|---|
| `CROSS-WHITE` | White cross | Standard white-face cross practice |
| `CROSS-YELLOW` | Yellow cross | Yellow-face cross practice |
| `CROSS-CN` | Color-neutral cross | Random color cross assignment |
| `CROSS-PLAN` | Cross planning | Scramble-to-plan practice (no execution) |
| `CROSS-EXEC` | Cross execution | Plan + execute, measuring time |

**Grouping rules (cross):**
- Group by **face color** for fixed-color drills.
- Group by **goal mode** (planning-only vs. execution).
- Cross cases are identified by `scrambleId` rather than a fixed case set — each scramble produces a unique cross state.
- For difficulty tiering, use `CrossScrambleOptions.colorSet` and `CrossScrambleOptions.difficultyTier` from the domain boundaries.

---

## Canonical ID Format

| Category | Format | Example |
|---|---|---|
| PLL | `PLL-<WCA suffix>` | `PLL-Ua`, `PLL-Gd` |
| OLL | `OLL-<2-digit number>` | `OLL-01`, `OLL-57` |
| Cross | `CROSS-<mode>` | `CROSS-WHITE`, `CROSS-CN` |

**Rules:**
- IDs are **kebab-case** strings.
- PLL IDs match the standard WCA community suffix exactly (case-sensitive: `Ua`, not `UA`).
- OLL IDs are zero-padded two digits (`OLL-01` not `OLL-1`).
- Cross IDs are uppercase mode names prefixed with `CROSS-`.
- IDs are **immutable** — once assigned, they never change. Name or grouping changes happen via metadata, not ID mutation.

---

## Grouping Hierarchy

```
Catalog
├── PLL (21 cases)
│   ├── PLL-EDGE        [Ua, Ub, Z, H]
│   ├── PLL-CORNER-ONLY [Aa, Ab, E]
│   ├── PLL-DIAG        [T, Y, F, V]
│   ├── PLL-ADJ         [Ja, Jb, Ra, Rb, Na, Nb]
│   └── PLL-G           [Ga, Gb, Gc, Gd]
├── OLL (57 cases)
│   ├── OLL-DOT         [1-4]
│   ├── OLL-SQUARE      [5-6]
│   ├── OLL-SMALL-L     [7-10]
│   ├── OLL-FISHTAIL    [11-12]
│   ├── OLL-P           [13-16]
│   ├── OLL-I           [17-19]
│   ├── OLL-CROSS-LINE  [21-24]
│   ├── OLL-BIG-L       [25-27]
│   ├── OLL-C           [28-30]
│   ├── OLL-CORNER-L    [31-34]
│   ├── OLL-T           [35-37]
│   ├── OLL-W           [38-40]
│   ├── OLL-Z           [41-42]
│   ├── OLL-LIGHTNING   [43-46]
│   ├── OLL-FISH        [47-48]
│   ├── OLL-KNIGHT      [49-52]
│   ├── OLL-AWKWARD     [53-56]
│   └── OLL-H           [57]
└── Cross
    ├── CROSS-WHITE
    ├── CROSS-YELLOW
    ├── CROSS-CN
    ├── CROSS-PLAN
    └── CROSS-EXEC
```

A single case may belong to **both** a primary group and a 2-look sub-set (e.g., `OLL-21` is in `OLL-CROSS-LINE` and `2LOLL-edges`). The catalog stores one record per case; groupings are metadata tags, not separate records.

---

## Out of Scope for v1

- **F2L cases** — not in MUS; add later when full-solve training ships.
- **4x4 OLL/PLL parity** — multi-puzzle, future roadmap.
- **COLL, WV, ZBLL** — advanced last-layer subsets; defer to post-v1 expansion.
- **Cross cases by exact state** — cross uses scramble-based drills, not a fixed 40-case lookup.

---

## Review Checkpoint

User approves this taxonomy shape before T08 (source intake) or T09 (planner logic) proceed.
