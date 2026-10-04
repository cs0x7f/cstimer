---
name: test-fix
description: Run the test suite, diagnose failures, fix the code (never the assertion) and repeat until the checker subagent confirms green. The reference Agentic OS loop. Use when tests are red, after a refactor, or as the body of a /goal.
---

# test-fix

## Goal
The full test suite, lint and type check exit 0, verified by the `checker`
subagent, with no test weakened or skipped to get there.

## Trigger / interval
- Manually: `/test-fix`
- Toward a condition (preferred for unattended runs):
  ```
  /goal the test and lint commands in CLAUDE.project.md exit 0, confirmed by the checker subagent, or stop after 15 turns
  ```
- On an interval (only for slow, flaky suites): `/loop 30m /test-fix`

## Context to read first
- `CLAUDE.project.md`: commands, stack, the never-break list.
- `plans/loops/PROGRESS.md` if it exists: what a previous run already tried.

## Allowed actions
- Run tests, lint, type check.
- Edit source files under `src/` (and the mirrored test when the *test* is
  wrong for a reason you can state and the owner would agree with, e.g. it
  tests removed behavior).
- Add a regression test for a bug you fixed.

## Forbidden
- Deleting, skipping (`skip`, `xfail`, `.only`, `todo`) or loosening a test
  to make it pass.
- Changing files outside `src/ and tests/`.
- Installing or upgrading dependencies.
- Committing or pushing.

## Iteration
Each round, max 10 rounds:
1. Run the suite. Record the first failing test and its message.
2. Form one hypothesis about the cause. Write it down in one line.
3. Make the smallest change that tests the hypothesis.
4. Re-run only the failing test. If it passes, run the whole suite.
5. Append to `plans/loops/PROGRESS.md`: round number, test name, hypothesis,
   result.

## Verification
When you believe it is green, spawn the `checker` subagent with the
acceptance criteria above. Its verdict is the only thing that counts.
If it says FAIL, treat its notes as the next hypothesis.

## Stop criterion
- Checker says PASS, or
- 10 rounds without the number of failing tests decreasing, or
- the same hypothesis appears twice.

## Escalation to a human
On stop without PASS, write a section `## Needs a human` in
`plans/loops/PROGRESS.md` with: the remaining failures, what was tried, and
your best guess about the cause. Then end the turn with one line:
`test-fix: stopped, <n> failures remain, see plans/loops/PROGRESS.md`.
