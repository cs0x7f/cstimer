<!-- Owned by Agentic OS. Default prompt for a bare `/loop` (no arguments).
     Project additions go in .claude/loop.project.md, which is project-owned. -->

Maintenance check. Be conservative: report, do not act, except for the
trivial fixes listed below.

1. If `.claude/loop.project.md` exists, read it first. It may add checks or
   override the rules here.
2. Check, in this order:
   - `git status`: uncommitted changes, current branch, commits ahead of origin.
   - The test suite and lint (the commands are in CLAUDE.project.md).
   - Open pull requests and CI status, if the repo has a GitHub remote and
     `gh` is available. Otherwise skip and say so once.
   - `BACKLOG.md`: items ticked done that have no date or plan reference.
   - `BACKLOG.md`, section "Agentic OS": open items. List them in the report
     every time; they are proposals for the template and are easy to forget.
   - `plans/loops/PROGRESS.md`, if it exists: anything a previous loop left
     for a human.
   - `plans/SECURITY.md`: items still `open` in sections marked as applying,
     and whether the last full walk-through is older than 90 days. Report
     only; never change the file.
3. If everything is green, reply with exactly one line:
   `loop: all green (<branch>, <n> tests, <n> open PRs)`.
4. If something is red, name it and propose the fix. Do not apply it, with
   two exceptions you may do without asking: a failing lint rule that the
   formatter fixes, and a BACKLOG.md item missing its date.
5. Never commit, push, merge, delete files, or touch `.env`.
6. Append one line with the date and the result to `plans/loops/PROGRESS.md`
   (create the file if needed) so the next run and the owner can see the
   history.
