# Builder Prompt

## Project Context

You are implementing features for `csTimer Trainer`, a fork-first training layer on top of csTimer.

The current codebase is not Next.js or TypeScript. v1 work stays inside the existing csTimer architecture while keeping the training domain documented cleanly enough for future extraction.

**Tech Stack:**
- Entry point: `src/index.php` with PHP-based build/serve
- JavaScript: Closure-compiled via `lib/compiler.jar`, source in `src/js/`
- Storage: Browser localStorage/IndexedDB, offline-first with service worker (`src/sw.js`)
- PWA: Web manifest (`src/cstimer.webmanifest`), cache manifest (`src/cache.manifest`)
- Dependencies: jQuery 1.7 (`lib/jquery-1.7.js`)
- Build: Makefile-driven compilation
- Future path: TypeScript, Next.js, Convex extraction (documented but not implemented in v1)

## Mandatory Inputs Before Implementation

1. Run `vibe-primeAgent` workflow (read `C:\Users\johno\.agents\skills\takomi\workflows\vibe-primeAgent.md`)
2. Read `docs/project_requirements.md` (the PRD)
3. Read `docs/Coding_Guidelines.md` (the Law)
4. Read `docs/features/TrainerV1.md` (the feature blueprint)
5. Read the assigned `docs/issues/FR-XXX.md` (acceptance criteria source of truth)
6. If the task touches UI, open the corresponding mockup in `docs/mockups/` — **do not proceed without it**

## Blueprint Rule For Complex Work

Before writing complex feature code:

1. Read `docs/features/` and `docs/project_requirements.md`
2. Confirm there is a feature blueprint covering the work
3. If the blueprint is missing or stale, update or create `docs/features/[FeatureName].md` first
4. Wait for blueprint approval before proceeding with the implementation task

Do not skip this by treating a complex feature as a "small patch."

## MUS Priority Order

1. FR-001: Trainer Entry and Goal Selection
2. FR-002: Structured Training Plans
3. FR-003: Adaptive Last-Layer Drill Queue
4. FR-004: Cross Drill Workflows
5. FR-005: Skill Stats and Session Review
6. FR-006: Local-First Persistence and Export Compatibility
7. FR-007: Source-Backed Case Catalog

## Mandatory Mockup-Driven Implementation

The `docs/mockups/` folder is the **UNQUESTIONABLE source of truth** for all front-end UI/UX. You must NOT deviate from the layout, color palette, typography, or component structure defined in the mockups.

Before implementing any page, open the corresponding mockup file and replicate it exactly.

**Required v1 mockups (STABLE):**
- `docs/mockups/trainer-entry.html`
- `docs/mockups/training-plan-setup.html`
- `docs/mockups/active-session-queue.html`
- `docs/mockups/session-review.html`
- `docs/mockups/weakness-summary.html`

These stable files reflect the approved **V2** design direction. Versioned alternates such as `v1_*` and `v2_*` are reference material only unless the unprefixed stable files are updated again through an approved design task.

If a UI task has no mockup yet:
1. **Stop** immediately
2. Return the task for design completion
3. Do not improvise final UI structure in implementation

Non-UI work (persistence, data models, export/import logic) may proceed without mockups.

## Implementation Rules

- New trainer modules should live under `src/js/trainer/` or a clearly named trainer subdirectory.
- Do not modify `src/js/timer/`, `src/js/scramble/`, or `src/js/stats/` core logic unless explicitly required and documented.
- Store trainer data separately from raw solve records.
- Document any new persistence keys in `docs/features/TrainerV1.md`.
- Follow existing csTimer naming conventions and directory structure.
- Keep concerns separated; split files if they absorb multiple unrelated responsibilities.
- If a file approaches 200 lines, stop and check whether it should be split before making it larger.

## Verification Checklist (Run Before Marking Complete)

- [ ] Normal timer flows still work (start, stop, inspect, delete solves)
- [ ] Scramble generation and display continue to work correctly
- [ ] Existing solve data is not corrupted or lost
- [ ] Offline behavior assumptions are not broken
- [ ] Export/import includes trainer-specific data (when that feature is implemented)
- [ ] Docs and issue acceptance criteria are updated
- [ ] No new console errors or warnings are introduced
- [ ] Acceptance criteria checkboxes in FR issue are updated

## Special Considerations

- Preserve csTimer's normal timer and solve-history behavior.
- Keep trainer persistence local-first (no network dependencies for core functionality).
- Treat future TypeScript/Next.js/Convex extraction as a documentation and boundary concern, not a v1 rewrite task.
- Do not introduce a backend dependency for v1 trainer basics.
- Do not silently change persistence semantics, export/import formats, or solve-history assumptions.
