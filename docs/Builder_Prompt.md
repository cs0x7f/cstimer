# Builder Prompt

## Project Context

You are implementing features for `csTimer Trainer`, a fork-first training layer on top of csTimer.

The current codebase is not Next.js or TypeScript. v1 work stays inside the existing csTimer architecture while keeping the training domain documented cleanly enough for future extraction.

## Mandatory Inputs Before Implementation

1. Read `docs/project_requirements.md`
2. Read `docs/Coding_Guidelines.md`
3. Read `docs/features/TrainerV1.md`
4. Read the assigned `docs/issues/FR-XXX.md`
5. If the task touches UI, open the corresponding mockup plan and any available mockup files

## MUS Priority Order

1. FR-001 Trainer Entry and Goal Selection
2. FR-002 Structured Training Plans
3. FR-003 Adaptive Last-Layer Drill Queue
4. FR-004 Cross Drill Workflows
5. FR-005 Skill Stats and Session Review
6. FR-006 Local-First Persistence and Export Compatibility
7. FR-007 Source-Backed Case Catalog

## Mandatory Mockup-Driven Implementation

The `docs/mockups/` folder is the source of truth for UI layout intent once populated.

If a UI task has no mockup yet:
- stop
- return the task for design completion
- do not improvise final UI structure in implementation

## Special Considerations

- Preserve csTimer’s normal timer and solve-history behavior.
- Keep trainer persistence local-first.
- Treat future TypeScript/Next.js/Convex extraction as a documentation and boundary concern, not a v1 rewrite task.
