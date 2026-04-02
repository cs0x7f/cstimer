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
- New trainer modules should live under `src/js/trainer/` or a clearly named trainer subdirectory.
- Do not modify `src/js/timer/`, `src/js/scramble/`, or `src/js/stats/` core logic unless a trainer feature explicitly requires it and the change is documented.

## Workflow Rules

- Every execution task starts with `vibe-primeAgent` (read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`).
- Follow the Blueprint Rule for complex feature work: read `docs/features/` and `docs/project_requirements.md`, create or update the relevant feature blueprint, and do not proceed with complex implementation until that blueprint has been reviewed.
- Implementation work must reference the relevant FR issue file and feature blueprint.
- Any UI-bearing feature must have a corresponding mockup artifact before coding begins (see Mockup-Driven Development below).
- Keep tasks narrow enough that a reviewer can approve or redirect them quickly.
- Update acceptance criteria checkboxes in the FR issue as you complete them.

## Mockup-Driven Development

- The `docs/mockups/` folder is the source of truth for UI layout intent.
- Required first-pass mockups: `trainer-entry.html`, `training-plan-setup.html`, `active-session-queue.html`, `session-review.html`, `weakness-summary.html`.
- If a UI task has no mockup yet: **stop**, return the task for design completion, do not improvise final UI structure.
- Mockups must exist before any implementation code that renders UI is written.
- Non-UI work (persistence, data models, export/import logic) may proceed without mockups.

## Change Control

- Do not rewrite csTimer into a new framework during v1.
- Do not introduce a backend dependency for v1 trainer basics.
- Do not mix fork-only product bets with upstream-friendly cleanup in the same task.
- Do not silently change persistence semantics, export/import formats, or solve-history assumptions.
- Do not add network dependencies for core trainer functionality (v1 is offline-first).

## Verification Expectations

Before marking any FR as complete, verify:

- Normal timer flows still behave as expected (start, stop, inspect, delete solves).
- Scramble generation and display continue to work correctly.
- Existing solve data is not corrupted or lost.
- Offline behavior assumptions are not broken (service worker, cache manifest, local storage).
- Export/import includes trainer-specific data when that feature is implemented.
- Docs and issue acceptance criteria are updated alongside implementation.
- No new console errors or warnings are introduced.

## File and Size Discipline

- Keep concerns separated; if a file begins to absorb multiple unrelated responsibilities, split the work.
- If a file approaches 200 lines, stop and justify whether it should be split into smaller modules, helpers, or UI/domain pieces before continuing.
- Prefer adding modular helpers or domain modules over inflating existing globals.
- Any exception to modularity should be justified in the task summary and review notes.
- New files should follow the existing csTimer naming conventions and directory structure.

## Documentation Rule

- `docs/project_requirements.md` (also referenced as `docs/Project_Requirements.md`) is the PRD — the canonical source of truth for requirements.
- `docs/features/TrainerV1.md` is the feature blueprint for the trainer domain.
- `docs/issues/FR-XXX.md` files are the source of truth for acceptance criteria.
- `docs/design/` and `docs/mockups/` control UI intent before build work starts.
- `docs/Builder_Prompt.md` is the implementation starter prompt.
- Update `docs/features/TrainerV1.md` with any new persistence keys, data structures, or architectural decisions.

## Tech Stack Context

- **Entry point**: `src/index.php` with PHP-based build/serve
- **JavaScript**: Closure-compiled via `lib/compiler.jar`, source in `src/js/`
- **Storage**: Browser localStorage/IndexedDB, offline-first with service worker (`src/sw.js`)
- **PWA**: Web manifest at `src/cstimer.webmanifest`, cache manifest at `src/cache.manifest`
- **Dependencies**: jQuery 1.7 (`lib/jquery-1.7.js`)
- **Build**: Makefile-driven compilation
- **Future path**: TypeScript, Next.js, Convex extraction (documented but not implemented in v1)
