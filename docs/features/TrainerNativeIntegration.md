# Trainer Native Integration Blueprint

## Goal

Move the trainer from an additive floating overlay into a native csTimer surface so it feels like part of the app instead of a separate mini-app.

The trainer should:
- launch from a real csTimer control
- take over the main working area instead of sitting inside a centered panel
- preserve recognizable csTimer chrome where helpful
- let the user move between timer mode and trainer mode without confusion

## Problem Statement

The current trainer flow is mounted through a floating launcher and overlay panel. That keeps the implementation isolated, but it creates several UX problems:
- the timer remains visually present behind the trainer
- only part of the screen is used for trainer content
- the entry point feels bolted on instead of built in
- the trainer reads like a separate product rather than a mode inside csTimer

The screenshot captured on April 5, 2026 reflects this clearly: the trainer content itself is promising, but the overlay framing breaks the "native csTimer" feel.

## User Outcome

The user should be able to:
- spot a trainer entry point in the existing csTimer interface
- enter trainer mode without feeling like they opened a modal
- use the full content area for setup, active drills, and review
- return to timer mode quickly
- understand whether they are in `Timer` or `Trainer` at all times

## Components

### Client

- Native trainer launcher integrated into csTimer button chrome
- Trainer mode controller that toggles between timer and trainer presentation
- Full-surface trainer mount inside the main app layout
- Shared trainer shell reused for `entry`, `setup`, `active`, and `review`
- Mode-aware header or navigation treatment so the user can switch between trainer and timer
- CSS layout updates so trainer can own the main viewport cleanly on desktop and mobile

### Server

- None
- No backend or sync dependency is required for this feature

## Data Flow

1. User taps a native trainer control from the csTimer chrome.
2. App enters `trainer mode` and updates layout state.
3. Timer-first surfaces are hidden, minimized, or deprioritized depending on the chosen shell treatment.
4. Trainer shell mounts into the primary app surface instead of a floating overlay panel.
5. Existing trainer navigation continues across `entry`, `setup`, `active`, and `review`.
6. User exits trainer mode and returns to the standard timer layout without losing trainer progress.

## UI States

### State A: Timer Mode

- Current csTimer experience remains primary
- Trainer entry point is visible in native chrome
- No floating trainer pill is shown

### State B: Trainer Mode

- Trainer occupies the main working surface
- Background timer glow and overlay backdrop are removed
- csTimer identity remains present through shared chrome or a compact header treatment

### State C: Active Drill Emphasis

- Trainer active-session UI may optionally suppress extra chrome further
- Session timing and prompts remain the primary focus

## Integration Strategy

### Preferred Direction

Mount the trainer as a first-class app mode using existing csTimer layout primitives rather than a standalone overlay.

This means:
- replace the floating `Trainer` launcher button
- register trainer entry through native csTimer button wiring
- give the trainer a dedicated root in the main app surface
- keep the shared trainer shell, but change where it mounts

### Why This Is the Right Cut

- It fixes the biggest perception problem first
- It preserves current trainer domain logic and surface modules
- It avoids redesigning every trainer screen inside the wrong container
- It gives later design passes a stable, native frame to target

## Layout Options

### Option 1: Persistent csTimer Chrome

- Keep left bar / logo area visible
- Trainer fills the remaining main surface
- Best if we want trainer to feel like a mode inside csTimer

### Option 2: Immersive Trainer Mode

- Trainer takes over nearly the whole app
- Keep only a compact top bar or exit control
- Best for deep practice flow, especially active sessions

### Recommendation

Start with Option 1 for entry, setup, and review, then allow Option 2 styling inside active sessions if needed.

## Components Ownership

### Existing Modules To Reuse

- `trainer-shell.js`
- `trainer-entry-home.js`
- `trainer-setup.js`
- `trainer-active-session.js`
- `session-review.js`
- `weakness-summary.js`
- `trainer-integration.js`

### Existing Modules To Change

- `trainer-init.js`
- csTimer UI wiring in `kernel.js`
- layout and surface CSS in `style.css`
- markup or mount-target support in `index.php` if a dedicated root is needed

## Database Schema

No new database or persistence schema is required.

### Storage Impact

- Keep existing `trainer:*` storage keys unchanged
- Keep export/import format unchanged
- Keep solve history isolated from trainer records

### Migration Requirement

- None expected for stored trainer data
- This feature is a presentation and integration change, not a data-model rewrite

## Acceptance Criteria

- The floating bottom-right trainer launcher no longer appears
- Trainer can be opened from a native csTimer control
- Trainer no longer renders inside a centered overlay panel
- Trainer uses substantially more of the screen on desktop
- User can move between trainer and timer modes intentionally
- Existing trainer session, review, and weakness flows still work
- Export/import and local storage behavior remain unchanged

## Regression Risks

- Breaking normal csTimer button behavior
- Blocking timer keyboard handling when trainer is closed
- Letting timer touch/mouse handlers interfere with active trainer surfaces
- Creating layout overlap with stats, tools, or scramble panels
- Reintroducing overlay assumptions in later trainer screens

## Non-Goals

- Full visual polish of every trainer screen
- Rewriting trainer flows or planner logic
- Changing trainer data schema
- Adding cloud sync or Convex
- Finalizing all mobile behavior beyond maintaining functional layout

## Build Sequence

1. Replace overlay launcher with native csTimer entry point.
2. Add trainer mode state and main-surface mount.
3. Remove centered overlay panel behavior.
4. Make entry, setup, active, and review render correctly in the new shell.
5. Run section-by-section design passes after the native mount feels right.

## Approval Gate

This document is the implementation blueprint for the next step.

Recommended next build packet:
- native trainer entry in csTimer chrome
- full-surface trainer mount
- timer/trainer mode switching

## Implementation Status

Completed in the first native integration packet:
- floating bottom-right trainer launcher removed
- native trainer entry moved into a real left-bar grid slot instead of an external floating square
- trainer now mounts into a full app surface instead of a centered overlay panel
- timer keyboard handlers are suppressed while trainer mode is active so active-drill spacebar flow does not fight the hidden timer

Still expected in follow-up UI passes:
- refine the trainer button icon and placement
- improve native shell styling on mobile and narrow widths
- polish each trainer surface inside the new mount
