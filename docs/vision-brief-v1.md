# csTimer Trainer — Vision Brief v1

**Date:** 2026-04-02  
**Status:** Draft — awaiting user approval  

---

## Product Mission

csTimer Trainer is a **structured training layer built on top of csTimer** that transforms random solve spam into deliberate, coach-guided practice. It helps returning and intermediate cubers improve faster by identifying weak cases, scheduling focused drills, and tracking progress over time — all while staying local-first, offline-capable, and compatible with csTimer's existing ecosystem.

The core question the product answers:

> *"Given this user's recent performance and selected goal, what should they drill next?"*

---

## Primary Audience

| Segment | Description |
|---------|-------------|
| **Returning cubers** | People coming back after a long break who want a structured re-entry instead of random solves |
| **Intermediate CFOP solvers** | Cubers stuck on plateaus who know the method but need targeted weakness work |

**Not the target for v1:** beginners learning to solve, elite solvers chasing marginal gains, 4x4 or other multi-puzzle specialists, or users wanting social/multiplayer features.

---

## V1 Scope (MUS — Minimum Usable State)

V1 delivers a working training experience inside a csTimer fork, focused on **3x3 last layer and cross drills** with adaptive weakness tracking.

### MUS Features

| ID | Feature | Summary |
|----|---------|---------|
| FR-001 | Trainer Entry & Goal Selection | Clear entry point in csTimer UI; user picks a goal (return to cubing, improve last layer, improve cross) |
| FR-002 | Structured Training Plans | Reusable training templates with guided session setup |
| FR-003 | Adaptive Last-Layer Drill Queue | PLL and OLL drills weighted toward weak cases based on recent performance |
| FR-004 | Cross Drill Workflows | Dedicated cross drills with focused goals (color-neutral, planning reps) |
| FR-005 | Skill Stats & Session Review | Post-session summaries showing what improved and what still needs work |
| FR-006 | Local-First Persistence | Trainer data stored in browser storage, survives export/import, works offline |
| FR-007 | Source-Backed Case Catalog | Normalized case content with provenance notes for responsible curation |

### MUS Content Coverage

- **3x3 PLL** — all 21 cases
- **3x3 OLL** — all 57 cases
- **3x3 Cross** — white and yellow cross drills
- **No 4x4, OH, or multi-puzzle content in v1** — those belong to later roadmap expansion

### MUS User Flow

1. User opens trainer, selects a goal
2. App generates or suggests a training plan
3. User starts a session — drills are served in sequence
4. After each attempt, stats update and weak cases get promoted
5. Session ends with a summary of progress and remaining gaps

---

## Future Scope (Post-MUS)

These are explicitly **out of v1** but are part of the longer-term vision:

| ID | Feature | Why Future |
|----|---------|------------|
| FR-008 | Standalone TypeScript Extraction Path | V1 lives inside csTimer's existing stack; extraction happens after v1 proves value |
| FR-009 | Cloud Sync & Profiles | Requires backend infrastructure; v1 is local-first |
| FR-010 | Multiplayer & Live Coaching | Requires real-time backend; changes product category |
| FR-011 | Multi-Puzzle Step Training Library | V1 focuses on 3x3 LL + cross; other puzzles/steps expand later |
| FR-012 | Daily Challenge & Reward Loop | Social/competition layer; not needed for core training loop |
| FR-013 | X-Cross & Advanced Start-State Trainer | Advanced feature; v1 targets fundamentals first |
| FR-014 | Virtual Cube Practice Surface | Nice-to-have; not required for the core drill experience |

---

## V1 Non-Goals (Explicit)

These are **explicitly excluded** from v1 to prevent scope creep:

- **No Convex implementation** — v1 uses csTimer's existing browser storage
- **No multiplayer or social features** — live rooms, leaderboards, club challenges are future
- **No standalone app rewrite** — v1 is a csTimer fork, not a new Next.js app
- **No smart cube hardware integration** — Bluetooth/smart cube support is future
- **No AI-generated algorithm discovery** — the trainer uses curated case content, not generative AI
- **No full csTimer core rewrite** — the training layer is additive, not a replacement
- **No backend dependency** — v1 must work fully offline with no server requirement
- **No 4x4, OH, or multi-puzzle curriculum in v1** — the first release stays intentionally focused on 3x3 last layer and cross

---

## Architecture Principle

**Build the trainer as a modular, near-independent layer on top of csTimer's existing scramble and stats infrastructure.**

- Keep training domain logic separate from core timer logic
- Do not hardwire into existing solve history structures
- Design so that clean pieces could be upstreamed later if desired
- The fork is the product; upstream contribution is optional cherry-picking after v1 ships

---

## Decision Log

| Decision | Rationale |
|----------|-----------|
| Fork-first, not upstream-first | The training philosophy is bigger than a normal feature; building for upstream compatibility from day one slows momentum |
| Local-first, no backend for v1 | Matches csTimer's existing offline behavior; avoids backend complexity in v1 |
| 3x3 LL + cross only for v1 | Returning/intermediate cubers benefit most from fundamentals; avoids spreading across too many puzzles/steps |
| Modular layer, not core rewrite | Preserves ability to upstream pieces later; avoids turning codebase into spaghetti |
| Convex/multiplayer deferred to Future | Changes product category and architecture; not needed to validate the core training loop |

---

## Review Checkpoint

**Pending user approval on:**
1. Product mission wording
2. MUS/Future boundary (is the split clean?)
3. V1 non-goals list (anything missing or incorrectly excluded?)
