# Coding Guidelines

## Purpose

These guidelines govern future implementation agents working on the csTimer Trainer fork. They are intentionally strict because the codebase is mature, local-first, and easy to destabilize with broad changes.

## Core Rules

1. Keep v1 inside the current csTimer fork.
2. Treat the trainer as an extension layer, not a rewrite of timer or scramble core logic.
3. Preserve offline-first behavior after first load.
4. Preserve solve-history compatibility and export/import behavior.
5. Document every major feature in `docs/` before and during implementation.

## Architecture Rules

- Prefer existing extension points before introducing new global plumbing.
- Store trainer data separately from raw solve records whenever possible.
- Any new persistence key must be documented in `docs/features/TrainerV1.md`.
- Any change that affects export/import must include a verification step.
- The trainer domain must be documented in a way that could later migrate to TypeScript, Next.js, and Convex.

## Workflow Rules

- Every execution task starts with `vibe-primeAgent`.
- Implementation work must reference the relevant FR issue file and feature blueprint.
- Any UI-bearing feature must have a corresponding mockup artifact before coding begins.
- Keep tasks narrow enough that a reviewer can approve or redirect them quickly.

## Change Control

- Do not rewrite csTimer into a new framework during v1.
- Do not introduce a backend dependency for v1 trainer basics.
- Do not mix fork-only product bets with upstream-friendly cleanup in the same task.
- Do not silently change persistence semantics, export/import formats, or solve-history assumptions.

## Verification Expectations

- Check normal timer flows still behave as expected.
- Check scramble/training utilities continue to work with existing solve data.
- Check offline behavior assumptions are not broken.
- Check export/import includes trainer-specific data when that feature is implemented.
- Check docs and issue acceptance criteria are updated alongside implementation.

## File and Size Discipline

- Keep concerns separated; if a file begins to absorb multiple unrelated responsibilities, split the work.
- Prefer adding modular helpers or domain modules over inflating existing globals.
- Any exception to modularity should be justified in the task summary and review notes.

## Documentation Rule

- `docs/project_requirements.md` is the PRD.
- `docs/features/TrainerV1.md` is the feature blueprint.
- `docs/issues/FR-XXX.md` files are the source of truth for acceptance criteria.
- `docs/design/` and `docs/mockups/` control UI intent before build work starts.
