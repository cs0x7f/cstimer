# Planner Logic Specification - v1

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
| `SkillStats` | Persistent local storage | `avgSolveTime`, `avgRecognitionTime`, `dnfRate`, `skipCount`, `attemptCount`, `trend`, `lastPracticedAt` |
| `CaseCatalog` | Loaded from catalog | `difficultyTier`, `category`, `groupTags` |
| `FocusSettings` | From current `TrainingPlan` | `weakCaseBias`, `coverageFloor`, `sessionMode` |
| `PlannerContext` | Integration-supplied planner context | `evaluationTime`, `queueSeed` |

### Cold-Start Handling

For cases with zero recorded attempts (`attemptCount === 0`):

- Assign a **cold-start score** equal to the median difficulty tier weight for that category.
- This ensures unpracticed cases enter the queue without being treated as "already mastered" or "desperately weak."
- Once a case receives its first attempt, it transitions to the normal scoring formula.

### Data Constraints

- The scorer reads only `SkillStats`, `CaseCatalog`, and `PlannerContext`. It does not read raw solve history.
- The scorer never mutates `SkillStats`. It is a pure computation.

---

## 2. Weighting Formula

The weakness score for a single case is computed as a weighted sum of six normalized factors:

```text
rawScore = w1 * solveTimeScore
         + w2 * recognitionScore
         + w3 * recencyScore
         + w4 * failureScore
         + w5 * skipScore
         + w6 * trendScore
```

### Factor 1: Solve-Time Score

Measures how much slower a user is on this case compared to their category median solve time.

```text
solveTimeScore = clamp((caseAvgTime - categoryMedianAvg) / categoryMedianAvg, 0, 1)
```

- `0` = user is at or below category median
- `1` = user is 2x or more slower than category median

If the category median is unavailable, use `0.5` as the default.

### Factor 2: Recognition Score

Measures how much slower recognition is on this case compared to the user's category median recognition time.

```text
recognitionScore = clamp((caseAvgRecognitionTime - categoryMedianRecognitionAvg) / categoryMedianRecognitionAvg, 0, 1)
```

- `0` = recognition is at or below category median
- `1` = recognition is 2x or more slower than category median

If recognition timing is unavailable for the case or category, use `0.5` as the neutral default.

### Factor 3: Recency Score

Prevents starvation by boosting cases that have not been drilled recently.

```text
daysSincePracticed = (evaluationTime - lastPracticedAt) / (1000 * 60 * 60 * 24)
recencyScore = clamp(daysSincePracticed / recencyDecayDays, 0, 1)
```

- `recencyDecayDays` = **7** for v1
- `0` = practiced today
- `1` = not practiced in 7 or more days

For cases never practiced (`attemptCount === 0`), `recencyScore = 1.0`.

### Factor 4: Failure Score

Measures how often the user fails or does-not-finish this case.

```text
failureScore = clamp(dnfRate * 2, 0, 1)
```

- `0` = 0% DNF rate
- `1` = 50% or higher DNF rate

### Factor 5: Skip Score

Measures how often the user abandons or skips the case during practice.

```text
skipScore = clamp(skipCount / max(attemptCount, 1), 0, 1)
```

- `0` = never skipped
- `1` = skipped every recorded time

### Factor 6: Trend Score

Applies a normalized urgency score based on whether the case is improving, stable, or declining.

| Trend Value | Score |
|-------------|-------|
| `"declining"` | 1.0 |
| `"stable"` | 0.5 |
| `"improving"` | 0.0 |

```text
trendScore = trendMap[trend]
```

### Weight Coefficients

| Weight | Value | Rationale |
|--------|-------|-----------|
| `w1` | 0.30 | Solve-time disparity is still the main speed signal |
| `w2` | 0.15 | Recognition delay matters for last-layer training quality |
| `w3` | 0.20 | Recency prevents starvation |
| `w4` | 0.15 | DNF is a strong but noisier signal |
| `w5` | 0.10 | Skip behavior signals avoidance |
| `w6` | 0.10 | Trend is directional but lower-confidence |

**Sum = 1.0**

### Final Score

```text
weaknessScore = clamp(rawScore, 0, 1)
```

Output is always normalized to `[0, 1]`.

### Difficulty-Tier Adjustment

The `weakCaseBias` knob in `FocusSettings` scales how much the weakness score influences queue ordering:

- `weakCaseBias = 0.0`: ignore weakness entirely (uniform random sampling)
- `weakCaseBias = 0.5`: moderate weakness influence
- `weakCaseBias = 1.0`: full weakness influence (default)

```text
effectiveWeight = weaknessScore * weakCaseBias + (1 - weakCaseBias) * 0.5
```

When `weakCaseBias = 0`, all cases get `effectiveWeight = 0.5`. When `weakCaseBias = 1`, `effectiveWeight = weaknessScore`.

---

## 3. Anti-Starvation Rules

Starvation occurs when a case is never selected because it is never weak enough relative to always-weak cases. The v1 planner prevents this with four rules:

### Rule 1: Coverage Floor

The `coverageFloor` in `FocusSettings` guarantees a minimum percentage of the queue comes from non-top-weakness cases.

- `coverageFloor = 0.20` means at least 20% of queue items must be drawn from cases **not** in the top-N weakness set.
- The top-N set is defined as the cases with weakness scores in the top 30% of all cases in the active set.
- Implementation: after generating the primary queue, swap in coverage-floor slots from the non-top set before finalizing.

### Rule 2: Recency Bump for Zero-Attempt Cases

Unpracticed cases get `recencyScore = 1.0`, giving them a natural boost. This ensures new catalog cases enter practice promptly.

### Rule 3: Maximum Consecutive Repeats

No single case may appear more than **3 times consecutively** in the queue. After 3 consecutive appearances, the next slot must select a different case.

### Rule 4: Per-Session Case Cap

For PLL (21 cases) and OLL (57 cases), no single case may exceed **30% of the total session attempts**, rounded down with a minimum cap of 1.

For cross drills, this rule does not apply because each scramble is unique.

---

## 4. Session Structure

A v1 training session follows a four-block structure:

```text
WARMUP -> FOCUS BLOCK -> INTEGRATION -> REVIEW
 ~15%      ~55%           ~20%         ~10%
```

Percentages are approximate targets, not hard constraints. The exact split depends on session length.

### Block 1: Warmup (~15% of session)

**Purpose:** Get the user into a solving rhythm with low cognitive load.

| Property | Value |
|----------|-------|
| Case selection | Low difficulty tier (1-2), or cases the user has high confidence on |
| Count | 3-5 attempts for a 20-attempt session |
| Weighting | Flat - weakness scores are ignored during warmup |
| Scramble policy | `from-case` for last-layer; `full-solve` for cross |

If the user has no stats yet, warmup selects from the lowest difficulty tier in the catalog.

### Block 2: Focus Block (~55% of session)

**Purpose:** The adaptive core. Drills the weakest cases.

| Property | Value |
|----------|-------|
| Case selection | Ranked by `effectiveWeight`, highest first |
| Count | Bulk of the session |
| Weighting | Full weakness formula with `weakCaseBias` applied |
| Anti-starvation | Coverage floor, max consecutive repeats, and per-session cap enforced |
| Scramble policy | Determined by drill definition |

Queue order is recomputed from `effectiveWeight` at block start, not frozen at session creation time.

### Block 3: Integration (~20% of session)

**Purpose:** Mix cases to practice recognition speed under variation.

| Property | Value |
|----------|-------|
| Case selection | Deterministic seeded shuffle from all cases in the active set |
| Count | About 4 of 20 attempts |
| Weighting | Uniform - weakness scores are ignored |
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
  catalog: CaseCatalog[],
  plannerContext: PlannerContext
): DrillQueue
```

### Algorithm (v1)

1. **Filter catalog** to cases matching the plan's `goal` and `drillBlocks` case sets.
2. **Compute weakness scores** for every case in the filtered set using the formula in Section 2.
3. **Partition the queue** into four blocks proportional to session length:
   - Warmup: select from low-difficulty or high-confidence cases
   - Focus: sort by `effectiveWeight` descending and apply anti-starvation rules
   - Integration: seeded shuffle of the full case set using `plannerContext.queueSeed`
   - Review: no queue items
4. **Convert to `DrillQueueItem[]`** with `queueIndex`, `drillId`, `caseRef`, `promptMode`, and `targetMetric`.
5. **Return `DrillQueue`** (the ordered array).

### Constraints

- Pure function. No storage reads. No timer access. No DOM.
- Input `stats` may be empty (cold start). The formula handles this via cold-start defaults.
- Output must contain all cases from the plan's `drillBlocks` at least once unless the session is too short.
- The function is deterministic for identical inputs. Integration-block randomness must use `plannerContext.queueSeed`, never the system clock.

---

## 6. Review Output Alignment

The `TrainingSessionResult` produced at session end feeds back into the planner for future sessions. The review block computes:

### 6.1 Weak Cases

Cases that underperformed during this session:

```text
if (caseSolveTime > caseAvgTime * 1.5) OR (caseDnfInSession) then mark as weak
```

### 6.2 Strong Cases

Cases that improved noticeably:

```text
if (caseSolveTime < caseAvgTime * 0.85) AND (noDnfInSession) then mark as strong
```

### 6.3 Next Recommendation

A short actionable string derived from the session results:

| Condition | Recommendation |
|-----------|----------------|
| 3+ cases tagged weak in the same recognition sub-group | `"Focus on [sub-group] recognition patterns next session"` |
| DNF rate increased vs. last session | `"Slow down on recognition - prioritize accuracy over speed"` |
| All cases in focus block improved | `"Increase difficulty tier or add new cases"` |
| Warmup cases were slow | `"Practice low-tier cases before jumping into focus"` |
| Default | `"Continue with current plan"` |

### 6.4 Stats Update Path

After the session review is produced:

1. The `StorageAdapter` writes the `TrainingSessionResult` to `trainer:sessions`.
2. `SkillStats` for each case attempted are updated with the new attempt data.
3. The next `generateQueue()` call reads the updated stats and produces an adapted queue.

The planner itself does not update stats. It is a pure reader of stats.

---

## 7. Goal-Specific Behavior

### Returning Cuber (`goal: "returning"`)

- Warmup is longer (~20%) because returning users need more ramp-up.
- Focus block uses 2-look OLL sub-sets from the case taxonomy as the initial case pool.
- `weakCaseBias` starts at 0.5 and increases to 1.0 after 3 sessions.
- `coverageFloor` starts at 0.30 and decreases to 0.15 as the user gains stats.

### Last Layer (`goal: "last-layer"`)

- Standard 4-block split.
- `weakCaseBias` defaults to 1.0.
- `coverageFloor` defaults to 0.20.
- Focus block may span PLL-only, OLL-only, or mixed depending on `drillBlocks`.

### Cross (`goal: "cross"`)

- No warmup block.
- Focus block is 70%, integration is 30%.
- Weakness scoring uses solve-time comparison to the user's own cross median instead of PLL/OLL category medians.
- Anti-starvation rules 1-3 apply. Rule 4 does not apply.

---

## 8. Configuration Knobs (FocusSettings)

| Knob | Type | Default | Range | Effect |
|------|------|---------|-------|--------|
| `weakCaseBias` | `number` | 1.0 | 0.0-1.0 | How much weakness influences queue order |
| `coverageFloor` | `number` | 0.20 | 0.0-0.50 | Minimum percentage of non-top-weakness cases in queue |
| `sessionMode` | `"standard" \| "speed" \| "accuracy"` | `"standard"` | enum | Alters weighting emphasis while keeping the formula explainable |

### Session Mode Adjustments

| Mode | w1 solve | w2 recognition | w3 recency | w4 failure | w5 skip | w6 trend |
|------|----------|----------------|------------|------------|---------|----------|
| `"standard"` | 0.30 | 0.15 | 0.20 | 0.15 | 0.10 | 0.10 |
| `"speed"` | 0.40 | 0.20 | 0.15 | 0.10 | 0.05 | 0.10 |
| `"accuracy"` | 0.20 | 0.20 | 0.15 | 0.25 | 0.10 | 0.10 |

---

## 9. Out of Scope for v1

- machine learning or predictive models
- spaced repetition scheduling such as SM-2
- user-adjustable raw coefficients
- cross-case correlation scoring
- multi-session planning
- personalized catalog difficulty estimation

---

## 10. Implementation Notes

- All planner functions are pure: no side effects, no storage, no DOM.
- The planner is a portable domain function and should move unchanged if the trainer is extracted from csTimer.
- Integration-block randomness should use a seeded PRNG fed by `plannerContext.queueSeed`.
- `DrillQueueItem.targetMetric` should be `"solveTime"` for last-layer cases and `"planTime"` for cross-planning mode.

---

## Review Checkpoint

User approves the training philosophy and weighting logic before implementation briefs are created.

Key decisions to approve:
1. Weight coefficients for the six-factor weakness formula
2. Anti-starvation rules (coverage floor 20%, max 3 consecutive repeats, 30% per-session cap)
3. Four-block session structure (warmup/focus/integration/review)
4. Cold-start defaults (median difficulty tier weight)
5. Review weak/strong thresholds (150%/85% of historical average)
