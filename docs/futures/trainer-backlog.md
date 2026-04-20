# Trainer Backlog

Living handoff file for the next agent.

Rule: do not treat new ideas as a new batch. Keep appending to the same queue below.

## Read First

- `docs/project_requirements.md`
- `docs/Coding_Guidelines.md`
- `docs/features/TrainerV1.md`
- `docs/features/TrainerNativeIntegration.md`
- `docs/architecture/persistence-plan.md`
- `docs/architecture/export-import-compatibility.md`
- `docs/architecture/domain-boundaries.md`

## Already Done

- Native trainer entry is wired into csTimer and opens trainer mode from the app chrome.
- The trainer mounts into a dedicated native surface instead of a floating overlay.
- Core session flow exists: entry, setup, active drill queue, review, and weakness summary.
- Local-first trainer persistence is real through `trainer:*` storage keys.
- Session plans, stats, and completed sessions persist locally.
- Export/import for trainer data is implemented and round-trips through csTimer export paths.
- The planner is real: it scores cases, weights weak cases, enforces repeat protection, and builds queues.
- PLL and OLL case mapping to native scramblers is implemented.
- Active-session timing, skip, next, pause, and end-session flows are implemented.
- Review data is generated from real session results.
- Weakness summary reads real persisted trainer sessions and stats.
- Source-backed case catalog data exists for the trainer domain.

## Partially Done

- Adaptive weighting is real, but the setup UI still overstates how much of the plan behavior is user-controlled.
- Cross drills are functional, but they are still simplified prompt-based practice rather than a full cross-state generator.
- The trainer has a stable shell, but the native surface still needs polish on narrow screens.
- The case diagram/visual area is a placeholder-style visual, not a true cube-state surface.
- Export/import is real for core trainer data, but some transient state is intentionally not part of the export payload.
- Current analytics are mostly case-level, not start-state-variant-level.

## Remaining Work Queue

1. Wire setup state rehydration so saved plans and prior settings actually come back in the setup UI.
2. Make `Save as Template` create a real reusable template model instead of only saving the current plan.
3. Load user templates back into the template picker so saved templates can be selected later.
4. Wire `Show Algorithm Hints` to real behavior in the active session surface.
5. Implement `Repeat Failed Cases` so failed or slow cases can be re-queued in-session or in the next queue as designed.
6. Implement `Randomize Order` as a real user-facing planner option, or remove the control if the planner will stay deterministic.
7. If `adaptive waiting` is intended, add actual pacing or recognition-gating logic rather than a static remaining-time estimate.
8. Tighten the cross drill workflow so it produces a clearer, more realistic cross practice experience.
9. Improve mobile layout behavior and the visual polish of the active-session placeholders.
10. Review whether any additional trainer state should persist across app restarts and be restored intentionally.
11. Add or update regression tests whenever queue logic, persistence, export/import, or native mounting changes.
12. Design and implement orientation-aware start-state modeling so the trainer can distinguish the same named case by angle, AUF, slot, or similar human-meaningful variant data.
13. Start with PLL orientation or AUF-sensitive starts so the trainer can identify cases like "J perm with required U" instead of only "J perm".
14. Keep recognition time and execution time separate in any future variant-aware analytics and recommendation logic.
15. Apply the same modeling rule to F2L and future case families where pair location, slot target, or start angle materially changes real human difficulty.
16. Extend recommendation logic so it can suggest either a better algorithm for the exact variant or a better pre-turn or setup strategy for that variant.
17. Update the feature docs and FR issue notes whenever a remaining item gets completed.
18. Keep any new ideas in this same queue, in priority order, rather than starting a new batch.

## Future Roadmap Items

- FR-008: standalone TypeScript extraction path
- FR-009: cloud sync and profiles
- FR-010: multiplayer and live coaching
- FR-011: multi-puzzle step training library
- FR-012: daily challenge and reward loop
- FR-013: X-cross and advanced start-state trainer
- FR-014: virtual cube practice surface
- FR-015: orientation-aware start-state modeling

## Handoff Rules

- Keep trainer data local-first for v1.
- Do not mutate raw solve records unless a documented trainer feature explicitly requires it.
- Any export/import change needs a regression check.
- Any UI change should stay aligned with the mockups and design docs.
- Do not split this list into a new batch when you add more work; append to `Remaining Work Queue`.
- Treat orientation, AUF, slot, and other meaningful start-state differences as first-class future modeling concerns rather than optional polish.
