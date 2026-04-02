# Persistence and Export Plan - Result

**Session:** `orch-20260402-034801`
**Task:** `06_persistence-and-export-plan`
**Completed:** 2026-04-02

## Deliverables

### 1. Persistence Plan: `docs/architecture/persistence-plan.md`
New document defining:
- **Storage mechanism decision:** csTimer `storage.js` abstraction via `storage.setKey()` with `trainer:` prefix. In the current repo this means IndexedDB when available, with `localStorage` fallback.
- **Key layout:** 6 keys (`trainer:profile`, `trainer:plans`, `trainer:activePlanId`, `trainer:stats`, `trainer:sessions`, `trainer:catalogVersion`). All must be registered in `kernel.js` valid-key allowlist.
- **5 coexistence rules** that ensure trainer persistence never breaks csTimer's existing solve storage.
- **Round-trip export/import contract** with exact JSON structure (`$.trainer` block at top level).
- **Offline-first guarantees** (5 items) and **risks** (6 items with mitigations).
- **csTimer integration requirements** for `kernel.js` and `export.js`.
- **StorageAdapter implementation guide** with pseudo-code for all 9 methods.
- **Verification checklist** (11 items).
- **Downstream task guide** for T07, T09, T10 agents.

### 2. Export/Import Compatibility Checklist: `docs/architecture/export-import-compatibility.md`
New document defining:
- **Export block contract** - exact JSON shape for the `$.trainer` block.
- **6 compatibility categories** with checkbox items: Export Correctness (9), Import Resilience (8), Round-Trip Invariance (5), csTimer Solve Data Independence (5), Cross-Version Compatibility (3), Browser Storage Coexistence (4).
- **5 test scenarios** for verification.
- **4 open questions** (LZString compression, merge-vs-overwrite, catalog versioning, size limits).

### 3. Updated TrainerV1.md
Edited `docs/features/TrainerV1.md` - expanded the "Persistence Expectations" section with concrete decisions (storage mechanism, key layout, coexistence rules, export format, round-trip invariant, offline-first behavior) and links to the new architecture docs.

## Key Decisions Made

| Decision | Rationale |
|----------|-----------|
| `storage.js` abstraction, not direct browser API calls | Matches the real repo behavior while keeping trainer code backend-agnostic. IndexedDB is used when available, with `localStorage` fallback. |
| `trainer:` prefixed keys | Visual and operational separation from csTimer's `session*` and `properties` keys. |
| Export block at `$.trainer` | Additive. Missing trainer block on import does not break solve import. |
| Flat keys, not per-case/per-plan | Trainer data is read as a whole. Granular keys add lookup complexity without v1 benefit. |
| In-memory fallback on storage failure | Trainer can run a session without persistence. Never blocks csTimer operation. |

## Risks and Open Questions

| # | Item | Status |
|---|------|--------|
| 1 | LZString compression in export block? | Open. Recommendation: plain JSON to match csTimer file export convention. |
| 2 | Merge vs overwrite on import? | Open. Overwrite is simpler and safer for v1. |
| 3 | Catalog version validation on import? | Deferred to T07. |
| 4 | Max trainer export block size? | No hard limit. Expected <100KB. Monitor in practice. |

## Review Fixes Applied

- Corrected the storage decision so the docs match the current repo: trainer persistence goes through csTimer's `storage.js` abstraction, not a trainer-specific direct-`localStorage` path.
- Clarified that `kernel.js` allowlist protection matters for the fallback `localStorage` cleanup path, while the primary backend may be IndexedDB.
- Fixed the export/import checklist so a solve-only import with no `trainer` block preserves existing trainer data instead of resetting it.

## Files Changed

- `docs/architecture/persistence-plan.md` - **new**
- `docs/architecture/export-import-compatibility.md` - **new**
- `docs/features/TrainerV1.md` - **edited** (expanded persistence expectations)

## Review Checkpoint

User must approve the local-first storage model and compatibility approach before T07 (case catalog) and T09 (planner logic) proceed.
