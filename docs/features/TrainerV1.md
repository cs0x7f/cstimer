# TrainerV1 Feature Blueprint

## Goal

Define a fork-first training layer inside csTimer that helps users run structured sessions for 3x3 last layer and cross practice, while preserving current offline usage and existing solve-data behavior.

## User Outcome

The user should be able to:
- enter a trainer flow intentionally
- choose a training goal or template
- run a guided drill queue
- review weak cases and session takeaways
- keep trainer data locally and carry it through export/import later

## Components

### Client

- Trainer entry surface
- Goal and plan setup flow
- Active drill/session queue
- Session review and weakness summary surfaces
- Local persistence for trainer plans, stats, and summaries
- UI hooks into existing csTimer training/stat mechanisms where appropriate

### Server

- None required for v1
- Future sync and multiplayer should be modeled as optional later layers, not a v1 dependency

## Data Flow

1. User enters trainer mode and selects a goal or template.
2. Trainer resolves the next drills using normalized case metadata and weakness logic.
3. Drill results and relevant solve metadata update local trainer stats.
4. Session review summarizes outcomes and flags weak cases.
5. Trainer-specific data remains export/import aware and distinct from raw solve records.

## Persistence Schema

Planned top-level concepts to document and later implement:
- `TrainingProfile`
- `TrainingPlan`
- `DrillDefinition`
- `SkillStats`
- `WeaknessScore`
- `TrainingSessionResult`
- future `SyncEvent`

Persistence expectations:
- local-first storage
- separate trainer keys from raw session solve chunks
- export/import compatibility planned from the start

## UI Surfaces Requiring Design

- trainer entry point
- goal/plan setup
- active session queue
- end-of-session review
- weakness/stats summary

## Regression Risks

- breaking normal timer entry and solve capture
- coupling trainer persistence too tightly to raw solves
- drifting from export/import compatibility
- adding UI without a mockup-driven flow
- over-designing for multiplayer or backend sync in v1

## V1 Boundaries

Included:
- 3x3 PLL training
- 3x3 OLL training
- cross drills
- weighted weak-case repetition
- post-session review planning

Excluded:
- Convex implementation
- live sync
- multiplayer
- standalone app rewrite
- smart-cube-required flows
- all-cubes/every-step curriculum
- X-cross optimization workflows
- virtual-cube-first practice surfaces

## Future Expansion Requests Already Captured

- broader step-by-step training across more puzzles
- daily shared scramble competition with scoring or rewards
- X-cross and advanced opening trainers
- virtual cube support for case practice without a physical cube
- live social or call-based collaborative training
