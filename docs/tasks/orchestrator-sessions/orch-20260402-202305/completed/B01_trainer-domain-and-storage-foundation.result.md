# B01 - Trainer Domain and Storage Foundation - Complete

**Session:** `orch-20260402-202305`
**Date:** 2026-04-02
**Status:** Complete

---

## What Was Built

### New Files

#### `src/js/trainer/storage-adapter.js`
`trainerStorage` module implementing the StorageAdapter contract from `docs/architecture/domain-boundaries.md`:

| Method | Contract |
|--------|----------|
| `loadProfile()` | Read `trainer:profile`, returns `TrainingProfile \| null` |
| `saveProfile(profile)` | Write `trainer:profile` as JSON |
| `loadPlans()` | Read all plans from `trainer:plans`, returns `Record<string, TrainingPlan>` |
| `loadPlan(planId)` | Read single plan by ID |
| `savePlan(plan)` | Upsert a plan into the plans record |
| `deletePlan(planId)` | Remove a plan from the plans record |
| `loadActivePlanId()` | Read `trainer:activePlanId` |
| `saveActivePlanId(planId)` | Write `trainer:activePlanId` |
| `loadStats()` | Read `trainer:stats`, returns `SkillStats[]` |
| `saveStats(stats)` | Write `trainer:stats` |
| `loadSessions()` | Read `trainer:sessions`, returns `TrainingSessionResult[]` |
| `saveSessionResult(result)` | Append a session result to `trainer:sessions` |
| `loadCatalogVersion()` | Read `trainer:catalogVersion` |
| `saveCatalogVersion(version)` | Write `trainer:catalogVersion` |
| `exportTrainerData()` | Assemble all trainer data into a `TrainerExportPayload` |
| `importTrainerData(payload)` | Write payload to trainer keys, returns `{ imported, skipped, warnings }` |
| `hasTrainerData()` | Check if any trainer data exists |

Design decisions:
- All values are stored as JSON strings via `storage.setKey()` / `storage.getKey()`
- All reads are wrapped in try/catch with fallback defaults
- `TRAINER_KEYS` is exported for import/export preservation flows

#### `src/js/trainer/export-bridge.js`
`trainerExport` module implementing the ExportBridge contract:

| Method | Contract |
|--------|----------|
| `buildTrainerExportBlock()` | Assemble trainer data into a versioned export block |
| `readTrainerExportBlock(rawImport)` | Extract `$.trainer` from parsed import data |
| `validateTrainerExportBlock(payload)` | Validate version, field types, size, and serialization safety |
| `mergeExportObj(exportObj)` | Inject trainer data into the csTimer export object |
| `processImportData(data)` | Extract, validate, and write imported trainer data |

Export block shape:
```json
{
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

### Modified Files

#### `Makefile`
Added `trainer/storage-adapter.js` and `trainer/export-bridge.js` to the Closure build input list.

#### `src/index.php`
Added trainer script tags for `js/trainer/storage-adapter.js` and `js/trainer/export-bridge.js` so the raw PHP entry path loads the same modules.

#### `src/js/kernel.js`
Added trainer keys to `cleanLocalStorage()` valid-key allowlist:

```js
var validKeys = ['properties', 'cachedScr', 'devData', 'wcaData', 'gglData', 'locData',
    'trainer:profile', 'trainer:plans', 'trainer:activePlanId',
    'trainer:stats', 'trainer:sessions', 'trainer:catalogVersion'];
```

#### `src/js/export.js`
Two trainer integration points were added:

1. `updateExpString()` merges the trainer block into the export object before serialization.
2. `loadData()` now:
   - backs up `trainer:*` keys through the storage abstraction before import
   - preserves trainer data when importing solve-only exports with no `trainer` block
   - processes imported trainer data when a `trainer` block is present

---

## Safety Properties Verified

| Property | How Addressed |
|----------|---------------|
| No mutation of solve records | Trainer code uses `trainer:*` keys only and never writes `session*` solve chunks |
| Build/runtime wiring | Trainer modules are registered in both Closure build inputs and the PHP entrypoint |
| Export safety | Trainer export is additive and only appends a top-level `trainer` block |
| Import safety with IndexedDB | Trainer keys are backed up through `storage.getKey()` before `storage.importAll()` clears the object store |
| Solve-only import preservation | Existing trainer data is restored when an imported file has no `trainer` block |
| `cleanLocalStorage()` safety | Trainer keys are allowlisted and JSON-validated |
| Offline-first | All operations go through `storage.setKey()` / `storage.getKey()` with no network dependency |
| Graceful degradation | Parse and stringify failures return defaults or warnings instead of crashing |

---

## Dependencies Satisfied for Downstream Tasks

- **B02 (Case Catalog):** Can use `trainerStorage.saveCatalogVersion()` to stamp catalog version
- **B03 (Planner):** Can use `trainerStorage.loadStats()` as planner input
- **B04 (Shared Shell):** Can use `trainerStorage.loadProfile()` and `trainerStorage.loadActivePlanId()`
- **B05-B08 (UI):** Can read/write trainer state through the storage adapter
- **B09 (Regression):** Can verify export/import round-trip through the export bridge

---

## Notes

- No csTimer core solve logic was rewritten
- The trainer modules follow the existing `execMain(function() { ... return { ... } })` pattern
- Full browser round-trip regression is still deferred to `B09`
