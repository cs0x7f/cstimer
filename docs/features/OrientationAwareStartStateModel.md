# Orientation-Aware Start-State Model

## Goal

Define a future trainer feature that models meaningful start-state variants inside the same named case family so the planner, analytics, and recommendation engine reflect real human recognition and execution difficulty.

Examples:
- a `PLL-Ja` that begins with a required `U`
- a `PLL-Ja` that begins with a required `U2`
- an F2L pair in back-right versus front-left

The trainer should eventually be able to say not only "you are slow at J perms" but "you are slow at J perms that begin from this orientation and angle."

## User Outcome

The user should be able to:
- see weakness analysis at a more granular variant level when the data supports it
- get suggestions for better algorithms or pre-turn choices for a specific variant
- separate recognition problems from execution problems
- benefit from the same modeling pattern as the trainer expands into F2L and other future case families

## Components

### Client

- Setup and analytics surfaces that can show variant-aware drill focus when available
- Review surfaces that can explain variant-specific weakness
- Recommendation UI that can present alternates such as:
  - "use `U` then normal alg"
  - "use this alternate algorithm for this angle"

### Server

- None required for v1 or for the first implementation pass of this feature

## Data Flow

1. The trainer resolves a base case from the scramble or drill definition.
2. The trainer also resolves a start-state variant descriptor for that attempt.
3. Attempt capture records recognition and execution metrics against the variant.
4. Aggregation rolls variant data into both:
   - variant-specific stats
   - base-case summary stats
5. Planner and recommendation logic decide whether to schedule or explain at:
   - base-case level
   - variant level

## Domain Shape

This feature should extend the portable trainer domain rather than introducing csTimer-bound logic into the planner.

### Proposed Portable Types

| Type | Role | Key Fields |
|------|------|------------|
| `CaseVariantKey` | Stable identifier for a start-state variant | `familyId`, `baseCaseId`, `variantCode` |
| `StartStateDescriptor` | Human-meaningful variant metadata | `startingAUF`, `requiredPreTurn`, `viewAngle`, `pairLocation`, `slotTarget`, `rotationNeed` |
| `VariantSkillStats` | Recognition and execution history for a variant | `variantKey`, `avgRecognitionTime`, `avgExecutionTime`, `attemptCount`, `dnfRate`, `trend` |
| `AlgorithmRecommendation` | Alternate algorithm or setup guidance | `variantKey`, `strategyType`, `notation`, `notes`, `provenance` |

### Modeling Rules

- A base case and a start-state variant are not the same thing.
- Recognition and execution must remain separate metrics.
- A variant should only exist when the start-state difference is expected to affect human performance.
- Base-case stats should still exist so sparse variant data does not make the product unusable.

## Planner Implications

Future planner work should be able to:
- prioritize a weak variant inside an otherwise average case family
- avoid overfitting to variant noise when sample size is too small
- recommend either:
  - extra repetition for a weak variant
  - an alternate algorithm
  - a pre-turn strategy
  - recognition-specific practice

### Example

If the system sees:
- `PLL-Ja` overall average is acceptable
- `PLL-Ja` with a required `U` is consistently slower

Then the trainer should be able to schedule more of that exact variant and explain the reason precisely.

## Current Status

Not implemented.

Today the trainer is primarily case-level, not variant-level.
This means current weakness analysis can identify a weak family or named case, but not yet a weak start-state orientation inside that case.

## Scope Guidance

### First Target Family

- PLL orientation and AUF-sensitive starts

### Follow-On Families

- OLL where orientation or view angle materially changes recognition
- F2L pair plus slot variants
- X-cross and future advanced start-state drills

## Database Schema

No backend schema is required for the initial design because the current trainer is local-first.

Expected local persistence additions when implemented:
- variant-aware stats store
- variant-aware recommendation store or derived cache
- export/import support for variant data

## Acceptance Gate

Future implementation work for this feature should not proceed as ad hoc UI polish.
It should first define:
- the variant key contract
- the minimum data capture contract
- the planner fallback rules when variant data is sparse

## Non-Goals

- Replacing all current case-level stats immediately
- Blocking current trainer improvements until variant modeling is done
- Requiring a backend or smart cube to start

## Why This Matters

This feature is the difference between:
- "you are slow at this case"

and:

- "you are slow at this case from this exact human starting situation, and here is the better tactic."
