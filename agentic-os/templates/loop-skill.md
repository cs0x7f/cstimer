<!-- Skeleton for a new loop skill. Copy to .claude/skills/<name>/SKILL.md.
     Every section is required; a loop without a stop criterion or an
     escalation path is not allowed (CLAUDE.md, section 5). -->

---
name: <name>
description: <one sentence: what it does and when to use it. Claude reads this to decide whether to invoke the skill.>
---

# <name>

## Goal
One measurable end state, written so the `checker` subagent can grade it
and a `/goal` evaluator can read it from the transcript.

## Trigger / interval
- Manually: `/<name>`
- Toward a condition: `/goal <condition>, or stop after <n> turns`
- On an interval: `/loop <interval> /<name>` (state why polling is needed)

## Context to read first
Files and commands that must be read before acting, in order.

## Allowed actions
What the loop may change or run. Be explicit about directories.

## Forbidden
What it must never do, beyond the rules in CLAUDE.md (commit, push, touch
`.env`, act on live systems).

## Iteration
Numbered steps for one round, and the maximum number of rounds. Every round
appends a line to `plans/loops/PROGRESS.md`.

## Verification
How the result is checked, by whom (the `checker` subagent, a command, a
URL) and what counts as PASS.

## Stop criterion
When the loop ends on its own: PASS, max rounds, no progress, repeated
hypothesis.

## Escalation to a human
What is written where when it stops without PASS, and the one-line message
that ends the turn.
