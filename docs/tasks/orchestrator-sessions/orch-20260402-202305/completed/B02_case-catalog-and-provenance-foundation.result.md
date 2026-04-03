# B02 - Case Catalog and Provenance Foundation - Complete

**Session:** `orch-20260402-202305`
**Date:** 2026-04-03
**Status:** Complete

---

## What Was Built

### New Files

#### `src/js/trainer/case-catalog-data.js`
Structured trainer catalog data for:
- all 21 PLL cases
- all 57 OLL cases
- 5 cross drill modes

The file stores:
- canonical IDs
- category and group tags
- difficulty tiers
- case notes
- one source-backed default algorithm per PLL/OLL case
- provenance source definitions for PLL, OLL, and cross drill taxonomy

#### `src/js/trainer/case-catalog.js`
Catalog access layer that:
- builds normalized `CaseCatalog` records
- assigns `algorithmId` values
- computes `moveCount`
- expands provenance records with `coversAlgorithms`
- exposes category/group/query helpers for planner and UI work

### Modified Files

#### `Makefile`
Added:
- `trainer/case-catalog-data.js`
- `trainer/case-catalog.js`

#### `src/index.php`
Added runtime script tags for:
- `js/trainer/case-catalog-data.js`
- `js/trainer/case-catalog.js`

#### `docs/features/TrainerV1.md`
Documented the current catalog implementation files and the initial source-backed catalog basis.

---

## Source Basis

### PLL
- Source: `https://speedcubedb.com/pdfalgsheet/431/PLL`
- Provenance ref: `speedcubedb-pdf-pll`

### OLL
- Source: `https://speedcubedb.com/pdfalgsheet/481/OLL`
- Provenance ref: `speedcubedb-pdf-oll`

### Cross
- Source reference: `docs/architecture/case-taxonomy.md`
- Provenance ref: `trainer-cross-taxonomy`
- Cross entries are scramble-generated drill descriptors rather than borrowed solve algorithms

---

## Safety / Quality Notes

- Every exported case now has at least one provenance record
- Every exported case now has at least one algorithm entry or drill descriptor entry
- Placeholder duplicated OLL algorithms were replaced with per-case source-backed values
- The catalog files are loaded in both the Closure build and the raw PHP entry path

---

## Verification

- `powershell -ExecutionPolicy Bypass -File .\\scripts\\verify.ps1` -> PASS
- Structural validation -> PASS
  - total cases: 83
  - PLL: 21
  - OLL: 57
  - cross: 5
  - no cases missing provenance
  - no cases missing algorithm entries

---

## Notes

- This is a v1 catalog foundation, not a final curated multi-source algorithm library.
- The current catalog is planner-ready and provenance-valid, while leaving room for later alternate algorithms and richer source merges.
