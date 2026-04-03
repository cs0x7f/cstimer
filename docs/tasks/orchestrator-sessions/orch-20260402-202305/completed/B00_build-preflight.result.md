# Build Preflight — B00

**Session:** `orch-20260402-202305`
**Date:** 2026-04-02
**Status:** Complete

---

## Agent Health

| Check | Status |
|-------|--------|
| TypeScript (`tsc --noEmit`) | Not applicable — no `typescript` package installed; csTimer v1 is Closure-compiled JS |
| Lint | Not applicable — no linter configured in this repo |
| Node/npm | Available |

---

## Baseline Document Review

### PRD (`docs/project_requirements.md`)
- 7 MUS FRs (FR-001 through FR-007), 7 Future FRs (FR-008 through FR-014)
- MUS priority order established
- Success criteria clear
- **Verdict:** Complete. No ambiguity.

### Feature Blueprint (`docs/features/TrainerV1.md`)
- All 8 domain types defined with field contracts
- 4 integration adapters specified (StorageAdapter, ScrambleAdapter, TimerBridge, ExportBridge)
- Planner logic contract (`generateQueue()`) defined as pure function
- Persistence key layout (`trainer:*`) specified
- Extraction boundary rules documented
- **Verdict:** Complete. Build agents can implement against these contracts.

### Coding Guidelines (`docs/Coding_Guidelines.md`)
- Fork-first, no-rewrite rules established
- Mockup-driven development policy clear
- File size and modularity rules defined
- Verification checklist per-FR provided
- **Verdict:** Complete. Implementation agents have clear constraints.

### Architecture Docs (8 files in `docs/architecture/`)
| Doc | Status |
|-----|--------|
| `domain-boundaries.md` | Complete — all types, adapters, extraction rules defined |
| `persistence-plan.md` | Complete — key layout, coexistence rules, StorageAdapter guide |
| `export-import-compatibility.md` | Complete — full checklist with 5 test scenarios |
| `case-taxonomy.md` | Complete — 21 PLL + 57 OLL + 5 cross canonical IDs with grouping |
| `provenance-schema.md` | Complete — CaseCatalog, AlgorithmEntry, ProvenanceRecord shapes |
| `planner-logic-spec.md` | Complete — 6-factor weakness formula, 4-block session, generateQueue() |
| `source-intake-packet.md` | Complete — source normalization workflow |
| `source-packet-mapping.md` | Complete — source-to-catalog mapping |

### Mockups (`docs/mockups/`)
All 5 stable mockups present:
- `trainer-entry.html`
- `training-plan-setup.html`
- `active-session-queue.html`
- `session-review.html`
- `weakness-summary.html`

Plus v1/v2 archived variants and design-system reference.

### FR Issue Files (`docs/issues/`)
All 14 FRs present (FR-001 through FR-014). 7 MUS FRs have acceptance criteria.

---

## Codebase State

| Item | Status |
|------|--------|
| `src/js/trainer/` directory | **Does not exist yet** — will be created by B01 |
| `kernel.js` valid-key allowlist | Trainer keys NOT yet registered (B01 task) |
| `export.js` trainer bridge | NOT yet integrated (B01 task) |
| `src/js/lib/storage.js` | Exists — trainer will use `storage.setKey()`/`storage.getKey()` |
| Prior orchestrator session | `orch-20260402-034801` — planning only, no feature code |

---

## Blockers Found

### Blocker 1: `kernel.js` valid-key allowlist gap
- `cleanLocalStorage()` at `src/js/kernel.js:1231` has `validKeys` that do NOT include `trainer:*` keys
- If fallback `localStorage` is active, `cleanLocalStorage()` could purge trainer data
- **Resolution:** B01 (StorageAdapter task) must add `trainer:profile`, `trainer:plans`, `trainer:activePlanId`, `trainer:stats`, `trainer:sessions`, `trainer:catalogVersion` to the allowlist
- **Severity:** Must-fix in B01, not a planning ambiguity

### Blocker 2: No TypeScript tooling for verification
- The repo has no `typescript` package, so `tsc --noEmit` cannot be run for verification
- This is expected — the csTimer codebase is Closure-compiled JS
- **Resolution:** Build verification should use manual smoke testing against csTimer timer/scramble/export flows instead of type-checking
- **Severity:** Informational, not a blocker

### Blocker 3: Export bridge integration points need inspection
- `src/js/export.js` needs to be inspected to find exact hook points for `ExportBridge.buildTrainerExportBlock()` and `readTrainerExportBlock()`
- The persistence plan documents the intent but not the exact line numbers or function names
- **Resolution:** B01 agent should read `export.js` during implementation and identify `updateExpString()` and `loadData()` hook points
- **Severity:** Low — standard implementation discovery

### Blocker 4: ScrambleAdapter scope unclear for B01
- The ScrambleAdapter is referenced in domain boundaries but is NOT part of B01 scope
- B02 (case catalog) and B07 (active session) are more likely consumers
- **Resolution:** Confirm B01 stays focused on StorageAdapter + ExportBridge, not scramble integration
- **Severity:** Clarification, not a blocker

---

## Go/No-Go Recommendation

### ✅ GO

The planning baseline is coherent and sufficient to start build delegation. Specifically:

1. **Domain contracts are complete** — all 8 types have field-level definitions
2. **Integration adapters have interface contracts** — StorageAdapter, ExportBridge methods are specified
3. **Architecture docs are cross-referenced** — persistence plan references domain boundaries, planner spec references case taxonomy
4. **All 5 UI mockups exist** — no UI task will block on missing design
5. **FR acceptance criteria are documented** — implementation agents know what to verify against
6. **Master plan dependency graph is clear** — B01/B02/B03 can start in parallel after B00

The blockers above are **implementation details**, not planning gaps. They belong in the build tasks themselves.

---

## Recommended First Build Task

### **B01 — Trainer Domain and Storage Foundation**

**Why first:**
- B01 is the root dependency for all UI work (B04-B08 all consume `StorageAdapter`)
- B02 (case catalog) and B03 (planner) can run in parallel with B01 — they depend on domain types, not on StorageAdapter
- B01 touches the most integration points (`kernel.js`, `storage.js`, `export.js`) and de-risks the persistence layer early

**Parallel opportunity:**
Once B00 is approved, launch B01, B02, and B03 simultaneously:
- B01: StorageAdapter + ExportBridge (persistence foundation)
- B02: CaseCatalog + provenance data (content foundation)
- B03: Planner core + `generateQueue()` (logic foundation)

These three tasks share no implementation file conflicts and can proceed independently.

---

## Review Checkpoint

User agrees the baseline is sufficient to start implementation.
