# Architecture: Trainer Persistence Plan

**Date:** 2026-04-02
**Session:** orch-20260402-034801
**Task:** 06_persistence-and-export-plan
**Depends on:** `docs/architecture/domain-boundaries.md`

---

## Purpose

Define the concrete local-first persistence strategy for trainer data, including storage mechanism, key layout, coexistence rules with csTimer solve data, and export/import round-trip expectations.

---

## Storage Mechanism

### Decision: csTimer `storage.js` abstraction with `trainer:` prefix

Trainer data uses csTimer's existing `storage.setKey(key, value)` / `storage.getKey(key)` API. In the current repo, that abstraction writes to IndexedDB when available and falls back to `localStorage` when IndexedDB is unavailable.

**Why this is the v1 decision:**
- It matches csTimer's real persistence behavior instead of introducing a trainer-only storage path that would drift from the host app.
- The trainer keeps a clean namespace boundary through `trainer:` prefixed keys even though the backing browser store may differ by environment.
- Domain and UI code stay backend-agnostic by talking only to `StorageAdapter`, which delegates to `storage.js`.
- If the persistence backend changes later, the adapter contract stays stable and downstream trainer logic does not need to change.

---

## Key Layout

All trainer keys use the `trainer:` namespace. The specific trainer keys are also registered in csTimer's valid-key list in `kernel.js` so that the fallback `localStorage` cleanup path does not purge trainer data.

### Primary Keys

| Key | Type Stored | Description |
|-----|-------------|-------------|
| `trainer:profile` | `TrainingProfile (JSON)` | Single user profile. Created on first trainer use. |
| `trainer:plans` | `Record<string, TrainingPlan> (JSON)` | All saved plans, keyed by `planId`. |
| `trainer:activePlanId` | `string` | The `planId` of the currently active plan, or empty. |
| `trainer:stats` | `SkillStats[] (JSON)` | All accumulated per-case stats. |
| `trainer:sessions` | `TrainingSessionResult[] (JSON)` | All completed session results. |
| `trainer:catalogVersion` | `string` | Version tag for the bundled case catalog. Used to detect when catalog data needs refresh. |

### Why flat keys, not per-case/per-plan keys

Trainer data is read as a whole (for example, load all stats to compute weakness scores). Splitting into granular keys would add lookup complexity without performance benefit at v1 volumes. If data grows post-v1, the `StorageAdapter` can shard internally without changing the interface.

---

## Coexistence Rules with csTimer Solve Data

These rules ensure trainer persistence never breaks or corrupts csTimer's existing solve storage.

### Rule 1: Separate key namespace

Trainer keys use `trainer:` prefix. csTimer keys use `session`, `properties`, `cachedScr`, and similar names. No overlap is possible. The valid-key allowlist in `kernel.js` must include the trainer keys so the fallback `localStorage` cleanup path leaves them intact.

### Rule 2: No mutation of solve records

The trainer never modifies `session_XX_YY` chunks or `sessionData` properties. Trainer session linkage stores its own copy of attempt metadata and optionally references a native solve ID, but the solve record itself is untouched.

### Rule 3: No dependency on solve data format

The trainer does not parse or depend on csTimer's internal solve-array format (`[time, scramble, date, comment, penalty]`). The `TimerBridge` normalizes timing data into `AttemptCapture` before the domain layer sees it.

### Rule 4: Export is additive, not merged

Trainer data is exported as a separate JSON block alongside csTimer's existing export structure. The combined export looks like:

```json
{
  "properties": { "...": "..." },
  "session1": [],
  "session2": [],
  "trainer": {
    "version": 1,
    "exportedAt": "2026-04-02T12:00:00Z",
    "profile": {},
    "plans": {},
    "stats": [],
    "sessions": []
  }
}
```

The `trainer` key sits at the top level, parallel to `properties` and `session*`. Import of trainer data is independent. If the trainer block is corrupt or missing, csTimer solve import still succeeds.

### Rule 5: Storage failure is contained

If the browser-local persistence backend is full or unavailable, the trainer degrades gracefully:
- Session can still run in-memory (domain layer works without persistence).
- Stats and results are not persisted but the user can complete the session.
- On next load, the trainer detects missing data and offers to reset or retry.

The trainer never blocks csTimer's normal operation if persistence fails.

---

## Round-Trip Export/Import Expectations

### Export

1. `StorageAdapter.exportTrainerData()` assembles a `TrainerExportPayload` from all `trainer:*` keys.
2. `ExportBridge.buildTrainerExportBlock()` wraps the payload with version and timestamp.
3. The export block is injected into csTimer's existing export string under the `"trainer"` top-level key.
4. Export file format remains csTimer's existing `.txt` JSON format. Trainer data is inside, not a separate file.

### Import

1. `ExportBridge.readTrainerExportBlock(rawImport)` extracts the `"trainer"` key from the parsed import data.
2. If the key is absent, import is a no-op for trainer data and solve data still imports normally.
3. If present, `ExportBridge.validateTrainerExportBlock(payload)` checks:
   - `version` field is present and recognized (currently `1`)
   - required fields (`profile`, `plans`, `stats`, `sessions`) are present and parseable
   - no circular references or oversized payloads
4. On validation success, `StorageAdapter.importTrainerData(payload)` writes to `trainer:*` keys.
5. On validation failure, import logs warnings but does not abort the solve import.

### Round-trip invariant

```text
export -> import -> export must produce identical trainer data.
```

This is verified by:
- exporting trainer data
- clearing all `trainer:*` keys
- importing the exported file
- exporting again and diffing the trainer blocks

Any difference indicates a serialization or import bug.

---

## Offline-First Guarantees

| Guarantee | How |
|-----------|-----|
| Works without network | All data lives in browser-local persistence through `storage.js`. No API calls. |
| Survives browser restart | `storage.js` persists across sessions through IndexedDB when available, with `localStorage` fallback. |
| Survives csTimer update | Trainer keys use a separate namespace. csTimer updates do not touch `trainer:*`. |
| Works on fresh browser | Trainer initializes with defaults on first use. No migration needed. |
| Export/import works offline | File save/open is browser-native. No server involved. |

---

## Offline-First Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Browser storage cleared by user/browser | All trainer data lost | Export reminder in UI. Future: periodic auto-export prompt. |
| Active `storage.js` backend quota exceeded | New data fails to save | Trainer data is small (<100KB typical). Monitor size. Degrade to in-memory if quota hit. |
| Browser incompatible with `storage.js` fallback | Trainer not available | csTimer already handles this. Trainer inherits the same fallback. |
| Corrupt JSON in a `trainer:*` key | Parse error on load | `StorageAdapter` wraps all reads in try/catch. On error, resets that key to default and warns user. |
| Multiple tabs writing simultaneously | Last-write-wins within the active browser storage backend | Acceptable for v1 single-user scenario. Future: add cross-tab sync handling if needed. |
| csTimer cleanup misses trainer keys in fallback mode | Trainer data purged by `cleanLocalStorage()` | Register trainer keys in the allowlist. Add a test that verifies fallback cleanup preserves them. |

---

## csTimer Integration Requirements

The persistence plan requires these changes to csTimer's existing code:

### `kernel.js`

- Add `trainer:profile`, `trainer:plans`, `trainer:activePlanId`, `trainer:stats`, `trainer:sessions`, `trainer:catalogVersion` to the valid-key allowlist in `cleanLocalStorage()`. This matters for the fallback `localStorage` cleanup path.

### `export.js`

- In `updateExpString()`: after collecting session data, call `ExportBridge.buildTrainerExportBlock()` and add the result under the `"trainer"` key.
- In `loadData()`: after importing properties and sessions, call `ExportBridge.readTrainerExportBlock()` and process trainer data if present.

### `storage.js`

- No product-level backend changes are required. Trainer persistence should go through `storage.setKey()` / `storage.getKey()` and must not assume whether IndexedDB or `localStorage` is active underneath.

---

## StorageAdapter Implementation Guide

For the agent implementing persistence:

```text
StorageAdapter {
  loadProfile(): TrainingProfile | null
    -> storage.getKey('trainer:profile') -> JSON.parse -> return or null

  saveProfile(profile): void
    -> JSON.stringify -> storage.setKey('trainer:profile', ...)

  loadPlan(planId): TrainingPlan | null
    -> storage.getKey('trainer:plans') -> JSON.parse -> return plans[planId] or null

  savePlan(plan): void
    -> load all plans -> set plans[plan.planId] = plan -> save all

  loadStats(): SkillStats[]
    -> storage.getKey('trainer:stats') -> JSON.parse -> return or []

  saveStats(stats): void
    -> JSON.stringify -> storage.setKey('trainer:stats', ...)

  saveSessionResult(result): void
    -> load sessions -> push result -> save sessions

  exportTrainerData(): TrainerExportPayload
    -> read all trainer:* keys -> assemble payload with version + timestamp

  importTrainerData(payload): ImportResult
    -> validate each field -> write to trainer:* keys -> return { imported, skipped, warnings }
}
```

All methods use try/catch for parse errors. Failed reads return null or empty values. Failed writes log warnings.

---

## Verification Checklist

Before marking persistence as complete:

- [ ] All `trainer:*` keys appear in `kernel.js` valid-key allowlist
- [ ] `StorageAdapter` implements all methods from the interface contract
- [ ] `ExportBridge` injects trainer block into export output
- [ ] `ExportBridge` reads trainer block from import input
- [ ] Import with missing trainer block does not break solve import
- [ ] Import with corrupt trainer block does not break solve import
- [ ] Round-trip test: export -> clear -> import -> export produces identical trainer data
- [ ] Trainer data survives page reload
- [ ] Trainer data survives browser restart
- [ ] `cleanLocalStorage()` does not purge `trainer:*` keys in fallback `localStorage` mode
- [ ] Trainer works when the active storage backend is unavailable (in-memory fallback)

---

## Downstream Task Guide

- **T07 case catalog:** Populate `trainer:catalogVersion` and ensure catalog data is bundled. Catalog content is pure data and does not need persistence logic.
- **T09 planner:** Read stats from `StorageAdapter.loadStats()`. Planner itself is pure. It receives stats as input and does not read storage directly.
- **T10 UI:** Read trainer data through `StorageAdapter` methods. Write session results through `saveSessionResult()`. Never access browser storage directly from UI code.
