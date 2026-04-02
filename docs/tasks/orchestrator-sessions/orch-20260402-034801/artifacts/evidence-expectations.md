# Evidence Expectations for Implementation Reviews

**Date:** 2026-04-02  
**Session:** orch-20260402-034801  
**Task:** 11_regression-review-packet

---

## Purpose

Define the minimum evidence a review agent must collect before approving an implementation task. This replaces ad hoc review with a consistent, reproducible standard.

---

## Evidence Types

| Type | Description | When Required |
|------|-------------|---------------|
| **Code grep** | Search for forbidden patterns such as csTimer globals, framework imports, or direct storage access | All domain and integration tasks |
| **Unit test output** | Console output from test functions or equivalent verification scripts | Tasks implementing logic |
| **Storage inspection** | Browser storage dump or screenshot of `trainer:*` keys | Tasks implementing persistence |
| **Round-trip diff** | Before/after comparison of exported trainer JSON | Tasks implementing export/import |
| **Screen recording** | Short recording of UI flow end-to-end | Tasks implementing major UI surfaces |
| **Mockup comparison** | Screenshot set and short written comparison against the approved stable unprefixed mockups | All UI tasks |
| **Manual test note** | Written confirmation of manual test steps completed | Tasks with no clean automation path |
| **Import grep** | Search for forbidden imports such as csTimer globals in domain code | All domain tasks |

---

## Minimum Evidence by Task Type

### Persistence Tasks

**Required before approval:**

1. Code grep showing adapter code goes through csTimer's storage abstraction
2. Storage inspection after data creation
3. Reload test showing data survives page refresh
4. Failure degradation test showing trainer falls back safely and csTimer still works

**Minimum deliverable:** Passed checks plus storage proof.

---

### Planner and Logic Tasks

**Required before approval:**

1. Code grep showing no storage or DOM access in planner code
2. Determinism test
3. Cold-start test
4. Anti-starvation test
5. Weight-factor test covering all six factors

**Minimum deliverable:** Pass/fail status for each logic check plus the test bodies or equivalent verification code.

---

### Export and Import Tasks

**Required before approval:**

1. Export structure proof for the `$.trainer` block
2. Round-trip diff showing no drift
3. Missing-block import behavior proof
4. Corrupt-block import behavior proof
5. Wrong-version import behavior proof

**Minimum deliverable:** Pass/fail for each scenario plus sample JSON or diff output.

---

### UI Tasks

**Required before approval:**

1. Mockup comparison against the approved stable unprefixed files in `docs/mockups/`
2. Mount isolation review showing trainer UI stays inside trainer-owned containers
3. Screen recording or detailed manual notes for the implemented flow
4. State-isolation proof showing exit back to normal timer with no residue
5. Offline run when the UI depends on persistent local trainer data

The review note must explicitly name the stable mockup files used:

- `docs/mockups/trainer-entry.html`
- `docs/mockups/training-plan-setup.html`
- `docs/mockups/active-session-queue.html`
- `docs/mockups/session-review.html`
- `docs/mockups/weakness-summary.html`

**Minimum deliverable:** Screenshot set or recording link plus a short mockup-comparison note.

---

### Scramble Tasks

**Required before approval:**

1. Case scramble verification for at least 3 targeted cases
2. Full scramble verification for at least 3 cross-drill scrambles
3. Cache isolation proof for `cachedScr`
4. Option-handling proof for cross scramble options

**Minimum deliverable:** Example scrambles with verification notes plus cache diff.

---

### Catalog Tasks

**Required before approval:**

1. Completeness proof for required case counts
2. Provenance sample records
3. Planner compatibility check
4. Catalog version proof

**Minimum deliverable:** Case counts, sample records, and catalog version value.

---

## Evidence Format

Each review agent produces a result file at:

```text
docs/tasks/orchestrator-sessions/orch-20260402-034801/completed/<task>.result.md
```

The result file must include:

```markdown
## Verification Summary

| Check ID | Check | Result | Evidence |
|----------|-------|--------|----------|
| T-1 | Default timer unchanged | PASS | Screenshot or note |
| P-1 | Profile survives reload | PASS | Storage dump before/after |
| L-2 | Six-factor weights correct | PASS | Unit test output |

## Verdict

[APPROVED / NEEDS CHANGES]
```

If a required check cannot be verified, mark it `PENDING` and request the missing evidence before approval.

---

## Escalation Rules

| Condition | Action |
|-----------|--------|
| Any CRITICAL check fails (`H-1`, `H-2`, `X-1`, `X-2`) | Block approval |
| Planner determinism fails | Block approval |
| Export round-trip fails | Block approval |
| Offline run fails for offline-critical work | Block approval |
| UI task lacks mockup comparison evidence | Block approval for UI approval |
| Non-critical edge case fails | Approve only with explicit follow-up note |

---

## Review Agent Workflow

1. Read the implementation task and its result file
2. Load this evidence expectations document
3. Load `fr-to-verification-mapping.md` to identify applicable checks
4. Run each applicable check
5. Record results in the task result file using the required evidence format
6. Issue a verdict: `APPROVED` or `NEEDS CHANGES`

The review is checklist-driven, not memory-driven.
