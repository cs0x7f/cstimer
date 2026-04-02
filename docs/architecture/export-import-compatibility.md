# Export/Import Compatibility Checklist

**Date:** 2026-04-02
**Session:** orch-20260402-034801
**Task:** 06_persistence-and-export-plan
**Related:** `docs/architecture/persistence-plan.md`, `docs/architecture/domain-boundaries.md`

---

## Purpose

Verification checklist for ensuring trainer data survives export/import round-trips and remains compatible with csTimer's existing export format.

---

## Export Block Contract

The trainer block lives at `$.trainer` in the exported JSON, parallel to `$.properties` and `$.session*`:

```json
{
  "properties": { "...": "..." },
  "session1": [],
  "trainer": {
    "version": 1,
    "exportedAt": "<ISO 8601>",
    "profile": {},
    "plans": {},
    "stats": [],
    "sessions": []
  }
}
```

---

## Compatibility Checklist

### Export Correctness

- [ ] `version` field is present and equals `1`
- [ ] `exportedAt` is a valid ISO 8601 timestamp
- [ ] `profile` serializes all fields from `TrainingProfile` contract
- [ ] `plans` is a `Record<string, TrainingPlan>` keyed by `planId`
- [ ] Each plan contains all required fields (`planId`, `templateId`, `goal`, `drillBlocks`, `focusSettings`, `createdAt`)
- [ ] `stats` array contains `SkillStats` objects with all required fields
- [ ] `sessions` array contains `TrainingSessionResult` objects with all required fields
- [ ] Export block is valid JSON (no trailing commas, no undefined values)
- [ ] Export file opens in a text editor as parseable JSON

### Import Resilience

- [ ] Import with **no trainer block** imports solve data normally and leaves existing trainer data untouched
- [ ] Import with **empty trainer block** (`{}`) does not crash, trainer resets to defaults
- [ ] Import with **corrupt trainer block** (malformed JSON under `"trainer"`) logs warning, solve import proceeds
- [ ] Import with **wrong version** (for example `version: 0` or `version: 99`) logs warning and does not overwrite existing trainer data
- [ ] Import with **missing sub-fields** (for example no `stats` array) fills defaults for missing fields and does not crash
- [ ] Import with **extra unexpected fields** ignores them and does not fail validation
- [ ] Import with **duplicate planIds** deduplicates or overwrites deterministically
- [ ] Import with **empty arrays** (`stats: []`, `sessions: []`) overwrites existing data (user intended to clear)

### Round-Trip Invariance

- [ ] **Basic round-trip:** export -> clear all `trainer:*` keys -> import -> export produces identical trainer block
- [ ] **Unicode round-trip:** profile and plan names with emoji, CJK characters, and RTL text survive round-trip
- [ ] **Large dataset round-trip:** 1000+ session results and 100+ plans survive round-trip
- [ ] **Empty state round-trip:** export with no trainer data -> import -> trainer initializes to clean defaults
- [ ] **Partial data round-trip:** profile exists but no plans/stats -> export -> import -> only profile persists, rest resets

### csTimer Solve Data Independence

- [ ] Exporting trainer data does not modify `session*` keys
- [ ] Importing trainer data does not modify `session*` keys
- [ ] Importing a file with **only solve data** (no trainer block) does not clear existing trainer data
- [ ] Importing a file with **only trainer data** (no session keys) does not clear existing solve data
- [ ] Trainer export block size does not exceed reasonable limits (<1MB uncompressed)

### Cross-Version Compatibility

- [ ] v1 export is forward-compatible: a future v2 import can read v1 trainer blocks without crashing
- [ ] v1 import handles missing fields gracefully (future exports may add fields v1 does not know about)
- [ ] `catalogVersion` field allows detection of stale catalog data on import

### Browser Storage Coexistence

- [ ] `cleanLocalStorage()` in `kernel.js` does not remove any `trainer:*` keys when the fallback `localStorage` backend is active
- [ ] Trainer keys are visible in browser DevTools Application storage for whichever backend `storage.js` is using (IndexedDB when available, Local Storage in fallback mode)
- [ ] Manually editing a `trainer:*` record in the active storage backend and reloading does not crash the trainer
- [ ] Clearing browser site data removes trainer data (expected behavior, same as solve data)

---

## Test Scenarios

### Scenario 1: Clean export/import

1. Start fresh (no trainer data).
2. Create profile, 2 plans, complete 1 session.
3. Export file.
4. Clear all `trainer:*` keys.
5. Import file.
6. Verify profile, plans, and session result match.

### Scenario 2: Solve-only import preserves trainer

1. Have existing trainer data.
2. Import a csTimer export file that has no `"trainer"` key.
3. Verify all `trainer:*` keys are untouched.

### Scenario 3: Corrupt trainer block

1. Have existing trainer data.
2. Import a file where `"trainer"` contains invalid JSON or wrong structure.
3. Verify solve data imports normally.
4. Verify existing trainer data is preserved and never half-written.

### Scenario 4: Combined csTimer + trainer export

1. Have both solve data and trainer data.
2. Export file.
3. Clear everything.
4. Import file.
5. Verify both solve data and trainer data are fully restored.

### Scenario 5: Large session history

1. Accumulate 500+ session results across multiple plans.
2. Export.
3. Clear and import.
4. Verify all 500+ sessions are present and ordered correctly.

---

## Open Questions

| # | Question | Status |
|---|----------|--------|
| 1 | Should the trainer block be LZString-compressed in the export, or left as plain JSON inside the `.txt` file? | Open. Recommendation: plain JSON to match csTimer file export convention. |
| 2 | Should import offer a "merge" option (keep existing trainer data, add new) or always overwrite? | Open. Overwrite is simpler and safer for v1. Merge is more user-friendly for multi-device scenarios but adds complexity. |
| 3 | Should `catalogVersion` be validated on import to warn about stale algorithm data? | Deferred. Catalog versioning logic belongs to T07 (case catalog task). |
| 4 | Maximum recommended trainer export block size? | No hard limit for v1. Expected to stay under 100KB for typical usage. Monitor in practice. |

---

## Summary

The trainer export/import system is **additive and independent** from csTimer's existing solve export. Trainer data travels as a separate `"trainer"` block inside the same export file. Import is fault-tolerant: corrupt or missing trainer data never breaks solve import, and a missing trainer block does not wipe existing trainer state. Round-trip correctness is the primary invariant.
