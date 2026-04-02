# Project Requirements Document

## Project Overview

**Name:** csTimer Trainer  
**Mission:** Add a structured, local-first training layer to csTimer that helps returning and intermediate cubers practice deliberately instead of only spamming solves.  
**Tech Stack:** Current csTimer stack for v1 (PHP entrypoints, Closure-compiled JavaScript, browser storage, offline/PWA behavior), with a documented future extraction path toward TypeScript, Next.js, and Convex.

## Functional Requirements

| FR ID | Description | User Story | Status |
| :--- | :--- | :--- | :--- |
| FR-001 | Trainer Entry and Goal Selection | As a cuber, I want a clear trainer entry point and goal-selection flow, so that I can start guided practice without leaving csTimer. | MUS |
| FR-002 | Structured Training Plans | As a cuber, I want reusable training templates and guided setup, so that I can practice with a plan instead of inventing sessions manually. | MUS |
| FR-003 | Adaptive Last-Layer Drill Queue | As a cuber, I want PLL and OLL drills to be weighted toward weak cases, so that my practice time targets the cases costing me the most. | MUS |
| FR-004 | Cross Drill Workflows | As a cuber, I want dedicated cross drills with focused goals, so that I can improve planning and execution outside of full solves. | MUS |
| FR-005 | Skill Stats and Session Review | As a cuber, I want post-session summaries and weakness tracking, so that I can see what improved and what still needs work. | MUS |
| FR-006 | Local-First Persistence and Export Compatibility | As a cuber, I want trainer data to work offline and survive export/import, so that the training layer feels like part of csTimer instead of a fragile add-on. | MUS |
| FR-007 | Source-Backed Case Catalog | As a maintainer, I want normalized case content with provenance notes, so that training content can be curated responsibly and updated over time. | MUS |
| FR-008 | Standalone TypeScript Extraction Path | As a maintainer, I want the trainer domain documented independently of csTimer internals, so that it can later move into a modern TypeScript app. | Future |
| FR-009 | Cloud Sync and Profiles | As a cuber, I want optional profile sync across devices, so that I can keep trainer progress beyond one browser. | Future |
| FR-010 | Multiplayer and Live Coaching | As a cuber, I want shared live sessions and multiplayer coaching flows, so that training can become collaborative later. | Future |

## V1 Product Frame

- **Primary audience:** returning cubers and intermediate CFOP solvers who want structure
- **Primary puzzles:** 3x3 last layer and cross
- **Hard constraints:** offline-first, fork-first, no v1 backend dependency, no csTimer core rewrite
- **Out of scope for v1:** Convex implementation, multiplayer, smart cube requirement, standalone app rewrite

## Success Criteria

- A later implementation agent can produce a trainer v1 without making product decisions that are still unresolved.
- All UI-bearing work has a design/mocking requirement before implementation.
- Trainer data and behavior are planned to coexist with current csTimer solve history, export/import, and offline usage.

## Compatibility Note

Some Takomi prompts reference `docs/Project_Requirements.md`. On this filesystem that path resolves to the same file as `docs/project_requirements.md`, so future agents should treat this file as the canonical PRD for either naming convention.
