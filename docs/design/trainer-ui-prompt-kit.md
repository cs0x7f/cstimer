# Trainer UI Prompt Kit

Use this file when giving design or UI-fix work to another agent.

The point is to keep every pass grounded in the same story:
- the trainer should feel like part of csTimer
- the active training experience should feel more native than modal
- the left-side csTimer real estate is valuable and can be used intentionally
- entry/setup/review can be more custom, but active sessions should feel tightly integrated

---

## 1. Base Prompt

Paste this first before any screenshots or fix notes:

```text
You are refining the UI for csTimer Trainer, a structured training layer embedded inside csTimer.

Product context:
- This is not a separate app.
- It should feel native to csTimer while still allowing the trainer to have its own visual identity.
- The current goal is not backend or feature expansion. The goal is interface quality, integration, and seamlessness.
- csTimer normally uses its left-side area and timer/scramble regions in very recognizable ways. We are allowed to hijack or reinterpret those areas creatively, but the result should still feel like it belongs inside csTimer.

Design direction:
- Entry, setup, and review screens can use the custom trainer visual language.
- Active training sessions should feel more native to csTimer.
- The normal scramble region can be reused or echoed for training scrambles.
- The timer region can be reused or echoed for actual solve timing.
- The left-side area should not feel wasted. It can hold queue, drill context, progress, weak-case info, status, or session controls.

Hard constraints:
- Keep the trainer local-first and compatible with existing csTimer behavior.
- Do not redesign this into a generic SaaS dashboard.
- Avoid making the trainer feel like a floating modal layered on top of csTimer.
- Avoid nested-scrollbar traps unless there is a very strong reason.
- Prefer one clear scroll surface over small internal scrolling panes.
- Active session should ideally avoid visible internal scrollbars entirely.

What �good� looks like:
- seamless with csTimer
- intentional use of layout regions
- coherent typography and spacing
- less �overlay app�, more �native training mode�
- clear focus during active drills

When making changes:
- preserve the strongest parts of the current trainer UI
- fix structural feel first, then polish
- explain the design reasoning in plain language
- call out any tradeoffs if a change improves native feel but reduces visual drama
```

---

## 2. Screenshot Add-On Prompt

After the base prompt, attach screenshots and add this:

```text
Use the attached screenshot(s) as the source of truth for the current state.

What I want you to pay attention to:
- where the layout feels disconnected from csTimer
- whether the left-side area is underused or awkward
- whether the scrollbar behavior feels trapped, ugly, or unnecessary
- whether the spacing, sizing, and typography feel seamless with the csTimer shell
- whether the current screen should lean more native or more custom

Do not just cosmetically tweak colors.
First identify the structural UI problem, then propose or implement the fix.
```

---

## 3. Patch Prompt Template

Use this after the base prompt whenever you want a specific fix:

```text
Focus on this specific issue:
[describe the issue in one sentence]

What I dislike:
- [issue 1]
- [issue 2]
- [issue 3]

What I want instead:
- [desired outcome 1]
- [desired outcome 2]
- [desired outcome 3]

Boundaries:
- do not rewrite unrelated screens
- keep the existing trainer direction unless this issue proves the structure is wrong
- if you think the right fix requires changing layout ownership, say so clearly and do that instead of superficial polish
```

---

## 4. Recommended Standing Guidance

You can append this often:

```text
Bias toward these decisions:
- use the left side intentionally
- make active session feel native to csTimer
- reduce overlay energy
- remove awkward or trapped scroll behavior
- prefer stronger structure over decorative polish
```

---

## 5. Example Prompt For Right Now

Use this for the current pass:

```text
You are refining csTimer Trainer UI inside csTimer.

This should feel like part of csTimer, not a separate overlay product.
The current trainer direction is decent, but the integration and scrolling still feel off.

Use the attached screenshots as the current state.

Focus on this specific issue:
the scrollbar and layout ownership still make the trainer feel less seamless than it should.

What I dislike:
- the scrollbar draws too much attention
- some regions still feel like a trapped panel instead of a native screen
- the left side is not being used as intentionally as it could be

What I want instead:
- cleaner scrolling behavior
- stronger use of csTimer�s existing layout logic
- better use of the left-side area during training
- a more seamless bridge between csTimer chrome and trainer content

Design intent:
- entry/setup/review can stay more custom
- active session should feel more natively integrated into csTimer
- if needed, reuse the normal scramble and timer regions during live training
- use the left-side area for queue, progress, drill context, or session controls

Do not just repaint the UI.
Identify whether the right fix is:
1. scrollbar removal/reduction
2. layout restructuring
3. better use of the left-side space
4. all three together

Then implement the strongest version of that fix.
Explain the reasoning briefly after the changes.
```

---

## 6. How To Use This

Best pattern:

1. Paste the Base Prompt.
2. Attach screenshot(s).
3. Paste the Screenshot Add-On Prompt.
4. Paste a short Patch Prompt Template filled in with the exact problem.

That gives you consistency across passes without rewriting the whole story every time.
