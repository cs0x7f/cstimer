# Planner Logic Specification — v1

**Date:** 2026-04-02
**Session:** orch-20260402-034801
**Task:** 09_planner-logic-spec
**Depends on:** domain-boundaries.md, case-taxonomy.md, TrainerV1.md

---

## Purpose

Define the weakness-scoring formula, drill weighting, anti-starvation behavior, and session block sequencing rules so that an implementation agent can build `generateQueue()` and related pure functions without product ambiguity.

---

## 1. Weakness Inputs

The weakness scorer produces a `WeaknessScore` for each case in the catalog. Its inputs are:

| Input | Source | Fields Used |
|-------|--------|-------------|
| `SkillStats` | Persistent local storage | `avgSolveTime`, `dnfRate`, `attemptCount`, `trend`, `lastPracticedAt` |
| `CaseCatalog` | Loaded from catalog | `difficultyTier`, `category`, `group` tags |
| `FocusSettings` | From current `TrainingPlan` | `weakCaseBias`, `coverageFloor`, `sessionMode` |
| `trainingTime.now()` | System clock | Current timestamp (for recency decay) |

### Cold-Start Handling

For cases with zero recorded attempts (`attemptCount === 0`):

- Assign a **cold-start score** equal to the median difficulty tier weight for that category.
- This ensures unpracticed cases enter the queue without being treated as "already mastered" or "desperately weak."
- Once a case receives its first attempt, it transitions to the normal scoring formula.

### Data Constraints

- The scorer reads only `SkillStats` and `CaseCatalog`. It does not read raw solve history.
- The scorer never mutates `SkillStats`. It is a pure computation.

---

## 2. Weighting Formula

The weakness score for a single case is computed as a weighted sum of four normalized factors:

```
rawScore = w1 * normalityScore
         + w2 * recencyScore
         + w3 * failureScore
         + w4 * trendPenalty
```

### Factor 1: Normality Score (solve-time relative to case median)

Measures how much slower a user is on this case compared to their overall average within the same category.

```
normalityScore = clamp((caseAvgTime - categoryMedianAvg) / categoryMedianAvg, 0, 1)
```

- `0` = user is at or below category median (not weak on time)
- `1` = user is 2x+ slower than category median (very weak on time)

If category median is unavailable (no stats for any case in the category), use `0.5` as the default.

### Factor 2: Recency Score (days since last practiced)

Prevents starvation by boosting cases that haven't been drilled recently.

```
daysSincePracticed = (now - lastPracticedAt) / (1000 * 60 * 60 * 24)
recencyScore = clamp(daysSincePracticed / recencyDecayDays, 0, 1)
```

- `recencyDecayDays` = **7** for v1 (configurable per goal template)
- `0` = practiced today
- `1` = not practiced in 7+ days

For cases never practiced (`attemptCount === 0`), `recencyScore = 1.0` (maximum urgency).

### Factor 3: Failure Score (DNF rate)

Measures how often the user fails or does-not-finish this case.

```
failureScore = clamp(dnfRate * 2, 0, 1)
```

- `0` = 0% DNF rate
- `1` = 50%+ DNF rate (doubled amplification because DNF is a strong signal)

### Factor 4: Trend Penalty

Applies a bonus to cases that are declining and a penalty to cases that are already improving.

| Trend Value | Penalty |
|-------------|---------|
| `"declining"` | +0.25 (boost into queue) |
| `"stable"` | 0.0 |
| `"improving"` | -0.20 (reduce priority) |

```
trendPenalty = trendMap[trend]   // map lookup, not formula
```

### Weight Coefficients

| Weight | Value | Rationale |
|--------|-------|-----------|
| `w1` | 0.40 | Solve-time disparity is the primary signal |
| `w2` | 0.25 | Recency prevents starvation |
| `w3` | 0.20 | DNF is a strong but noisier signal |
| `w4` | 0.15 | Trend is directional but lower-confidence |

**Sum = 1.0**

### Final Score

```
weaknessScore = clamp(rawScore, 0, 1)
```

Output is always normalized to `[0, 1]`.

### Difficulty-Tier Adjustment (Optional Modulator)

The `weakCaseBias` knob in `FocusSettings` allows the user (or template) to scale how much the weakness score influences queue ordering:

- `weakCaseBias = 0.0`: ignore weakness entirely (uniform random sampling)
- `weakCaseBias = 0.5`: moderate weakness influence
- `weakCaseBias = 1.0`: full weakness influence (default)

```
effectiveWeight = weaknessScore * weakCaseBias + (1 - weakCaseBias) * 0.5
```

When `weakCaseBias = 0`, all cases get `effectiveWeight = 0.5` (equal priority). When `weakCaseBias = 1`, `effectiveWeight = weaknessScore`.

---

## 3. Anti-Starvation Rules

Starvation occurs when a case is never selected because it isn't "weak enough" relative to always-weak cases. The v1 planner prevents this with three rules:

### Rule 1: Coverage Floor

The `coverageFloor` in `FocusSettings` guarantees a minimum percentage of the queue comes from non-top-weakness cases.

- `coverageFloor = 0.20` means at least 20% of queue items must be drawn from cases **not** in the top-N weakness set.
- The top-N set is defined as the cases with weakness scores in the top 30% of all cases in the active set.
- Implementation: after generating the primary queue, swap in coverage-floor slots from the non-top set before finalizing.

### Rule 2: Recency Bump for Zero-Attempt Cases

As defined in Section 1, unpracticed cases get `recencyScore = 1.0`, giving them a natural boost. This ensures new catalog cases enter practice promptly.

### Rule 3: Maximum Consecutive Repeats

No single case may appear more than **3 times consecutively** in the queue. After 3 consecutive appearances, the next slot must select a different case.

This prevents the planner from locking onto one very-weak case at the expense of all others.

### Rule 4: Per-Session Case Cap

For PLL (21 cases) and OLL (57 cases), no single case may exceed **30% of the total session attempts**. This prevents a single dominant weakness from monopolizing an entire session.

For cross drills, this rule does not apply (each scramble is unique).

---

## 4. Session Structure

A v1 training session follows a four-block structure:

```
┌──────────┐   ┌──────────────┐   ┌─────────────┐   ┌──────────┐
│  WARMUP  │──▶│  FOCUS BLOCK │──▶│ INTEGRATION │──▶│  REVIEW  │
└──────────┘   └──────────────┘   └─────────────┘   └──────────┘
  ~15%           ~55%               ~20%              ~10%
```

Percentages are approximate targets, not hard constraints. The exact split depends on session length.

### Block 1: Warmup (~15% of session)

**Purpose:** Get the user into a solving rhythm with low cognitive load.

| Property | Value |
|----------|-------|
| Case selection | Low difficulty tier (1-2), or cases the user has high confidence on (low dnfRate, below-median solve time) |
| Count | 3-5 attempts for 20-attempt session |
| Weighting | Flat — weakness scores are **ignored** during warmup |
| Scramble policy | `from-case` for last-layer; `full-solve` for cross |

If the user has no stats yet (first session), warmup selects from the lowest difficulty tier in the catalog.

### Block 2: Focus Block (~55% of session)

**Purpose:** The adaptive core. Drills the weakest cases.

| Property | Value |
|----------|-------|
| Case selection | Ranked by `effectiveWeight` (Section 2), highest first |
| Count | Bulk of the session (e.g., 11 of 20 attempts) |
| Weighting | Full weakness formula, `weakCaseBias` applied |
| Anti-starvation | Coverage floor, max consecutive repeats, per-session case cap enforced |
| Scramble policy | Determined by drill definition |

The focus block is where the planner's adaptive logic is fully active. Queue order is recomputed from `effectiveWeight` at block start, not frozen at session start.

### Block 3: Integration (~20% of session)

**Purpose:** Mix cases to practice recognition speed under pressure of variation.

| Property | Value |
|----------|-------|
| Case selection | Random draw from **all cases in the active set**, not weakness-ordered |
| Count | ~4 of 20 attempts |
| Weighting | Uniform random — weakness scores are **ignored** |
| Scramble policy | `from-case` always |

For cross drills, integration is a full-solve scramble with timer execution.

### Block 4: Review (~10% of session)

**Purpose:** No new solves. The planner produces the review artifact.

| Property | Value |
|----------|-------|
| Activities | Score computation, weak/strong case tagging, next recommendation |
| Output | `TrainingSessionResult` |
| Count | 0 attempts |

---

## 5. Queue Generation: `generateQueue()`

### Signature

```typescript
function generateQueue(
  plan: TrainingPlan,
  stats: SkillStats[],
  catalog: CaseCatalog[]
): DrillQueue
```

### Algorithm (v1)

1. **Filter catalog** to cases matching the plan's `goal` and `drillBlocks` case sets.
2. **Compute weakness scores** for every case in the filtered set using the formula in Section 2.
3. **Partition queue** into four blocks proportional to session length:
   - Warmup: select from low-difficulty / high-confidence cases
   - Focus: sort by `effectiveWeight` descending, apply anti-starvation rules
   - Integration: random shuffle of full case set
   - Review: no queue items
4. **Convert to `DrillQueueItem[]`** with `queueIndex`, `drillId`, `caseRef`, `promptMode`, and `targetMetric`.
5. **Return `DrillQueue`** (the ordered array).

### Constraints

- Pure function. No storage reads. No timer access. No DOM.
- Input `stats` may be empty (cold start). The formula handles this via cold-start defaults.
- Output must contain all cases from the plan's `drillBlocks` at least once (via coverage floor), unless the session is too short.
- The function is deterministic for identical inputs. Randomness in integration block uses a seed derived from `sessionId` if available, or the system clock.

---

## 6. Review Output Alignment

The `TrainingSessionResult` produced at session end feeds back into the planner for future sessions. The review block computes:

### 6.1 Weak Cases

Cases that underperformed during this session:

```
if (caseSolveTime > caseAvgTime * 1.5) OR (caseDnfInSession) THEN mark as weak
```

A case is tagged weak if its session solve time exceeded 150% of its historical average, or if it was DNF'd during the session.

### 6.2 Strong Cases

Cases that improved noticeably:

```
if (caseSolveTime < caseAvgTime * 0.85) AND (noDnfInSession) THEN mark as strong
```

A case is tagged strong if its session solve time was under 85% of its historical average with no DNFs.

### 6.3 Next Recommendation

A short actionable string derived from the session results:

| Condition | Recommendation |
|-----------|----------------|
| 3+ cases tagged weak in the same recognition sub-group | `"Focus on [sub-group] recognition patterns next session"` |
| DNF rate increased vs. last session | `"Slow down on recognition — prioritize accuracy over speed"` |
| All cases in focus block improved | `"Increase difficulty tier or add new cases"` |
| Warmup cases were slow | `"Practice low-tier cases before jumping into focus"` |
| Default | `"Continue with current plan"` |

The recommendation is a string, not a structured object. It is displayed in the session review UI and may inform the user's next plan setup.

### 6.4 Stats Update Path

After the session review is produced:

1. The `StorageAdapter` writes the `TrainingSessionResult` to `trainer:sessions`.
2. `SkillStats` for each case attempted are updated with the new attempt data (avg solve time, DNF, recency).
3. The next `generateQueue()` call reads the updated stats, producing an adapted queue.

The planner itself does not update stats. It is a pure reader of stats.

---

## 7. Goal-Specific Behavior

### Returning Cuber (`goal: "returning"`)

- Warmup is longer (~20%) because returning users need more ramp-up.
- Focus block uses 2-look OLL sub-sets (from case taxonomy) as the initial case pool.
- `weakCaseBias` starts at 0.5 (moderate), increasing to 1.0 after 3 sessions.
- `coverageFloor` starts at 0.30 (high coverage), decreasing to 0.15 as the user gains stats.

### Last Layer (`goal: "last-layer"`)

- Standard 4-block split (Section 4).
- `weakCaseBias` defaults to 1.0.
- `coverageFloor` defaults to 0.20.
- Focus block may span PLL-only, OLL-only, or mixed depending on `drillBlocks`.

### Cross (`goal: "cross"`)

- No warmup block (cross is single-phase).
- Focus block is 70%, integration is 30%.
- Weakness scoring uses solve-time comparison to the user's own cross median (no category median).
- Anti-starvation rules 1-3 apply. Rule 4 (per-session case cap) does not apply (each scramble is unique).

---

## 8. Configuration Knobs (FocusSettings)

| Knob | Type | Default | Range | Effect |
|------|------|---------|-------|--------|
| `weakCaseBias` | `number` | 1.0 | 0.0 – 1.0 | How much weakness influences queue order |
| `coverageFloor` | `number` | 0.20 | 0.0 – 0.50 | Minimum % of non-top-weakness cases in queue |
| `sessionMode` | `"standard" \| "speed" \| "accuracy"` | `"standard"` | enum | Alters weighting: speed boosts avg-time factor; accuracy boosts DNF factor |

### Session Mode Adjustments

| Mode | w1 (normality) | w3 (failure) | Notes |
|------|---------------|-------------|-------|
| `"standard"` | 0.40 | 0.20 | Default weights |
| `"speed"` | 0.55 | 0.10 | Prioritize slow cases, less DNF emphasis |
| `"accuracy"` | 0.25 | 0.40 | Prioritize high-DNF cases, less time emphasis |

`w2` and `w4` adjust proportionally to keep the sum at 1.0.

---

## 9. Out of Scope for v1

- **Machine learning or predictive models** — no training curve prediction, no optimal interval calculation.
- **Spaced repetition scheduling** — no SM-2 or similar algorithm. Recency decay is a simple linear function.
- **User-adjustable weight coefficients** — weights are baked in. Users control `FocusSettings` knobs only.
- **Cross-case correlation** — no recognition similarity scoring between cases. Each case is scored independently.
- **Multi-session planning** — the planner generates one queue at a time. There is no "weekly plan" or "curriculum path."
- **Personalized difficulty estimation** — `difficultyTier` comes from the catalog, not from user performance.

---

## 10. Implementation Notes

- All planner functions are **pure** — no side effects, no storage, no DOM.
- The planner is a **portable domain function** — it will move unchanged if the trainer is extracted from csTimer.
- Randomness in integration block should use a seeded PRNG if `sessionId` is available, for reproducibility during debugging.
- The `DrillQueueItem.targetMetric` field should be set to `"solveTime"` for last-layer cases and `"planTime"` for cross-planning mode.

---

## Review Checkpoint

User approves the training philosophy and weighting logic before implementation briefs are created.

Key decisions to approve:
1. Weight coefficients (w1=0.40, w2=0.25, w3=0.20, w4=0.15)
2. Anti-starvation rules (coverage floor 20%, max 3 consecutive repeats, 30% per-session cap)
3. Four-block session structure (warmup/focus/integration/review)
4. Cold-start defaults (median difficulty tier weight)
5. Review weak/strong thresholds (150%/85% of historical average)
