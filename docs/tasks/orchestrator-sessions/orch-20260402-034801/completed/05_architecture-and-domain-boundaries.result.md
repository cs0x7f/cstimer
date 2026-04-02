# Architecture and Domain Boundaries — Result

**Session:** `orch-20260402-034801`
**Task:** `05_architecture-and-domain-boundaries`
**Completed:** 2026-04-02

## Deliverables

### 1. Architecture Note: `docs/architecture/domain-boundaries.md`
New document defining:
- Layer diagram (domain layer → adapter interface → csTimer integration layer)
- Full type contracts for all 7 portable domain types (`TrainingProfile`, `TrainingPlan`, `DrillDefinition`, `CaseCatalog`, `SkillStats`, `WeaknessScore`, `TrainingSessionResult`) plus future `SyncEvent` slot
- csTimer integration adapter definitions (`StorageAdapter`, `ScrambleAdapter`, `TimerBridge`, `ExportBridge`, `UI Mount Points`)
- 7 extraction boundary rules that protect domain portability
- Portable vs. stays-behind matrix for every concept
- Downstream task guide for T06, T07, T09, T10 agents

### 2. Refined TrainerV1.md
Updated `docs/features/TrainerV1.md` with:
- Expanded "Persistence Schema" section → renamed to "Domain Contracts" with full type table, adapter table, planner function definition, and refined persistence expectations
- New "Extraction Boundary Notes" section before Future Expansion Requests: what moves/stays matrix, 6 portability rules, link to full architecture doc

## Review Fixes Applied

- defined the previously implicit helper types used by the architecture note (`GoalType`, `DrillBlock`, `FocusSettings`, `CaseRef`, `CaptureField`, `AlgorithmEntry`, `ProvenanceRecord`, `DrillResult`, `DrillQueue`, `DrillQueueItem`)
- added minimum interface contracts for `StorageAdapter`, `ScrambleAdapter`, `TimerBridge`, `ExportBridge`, and UI mount points so downstream tasks are not forced to invent bridge signatures
- removed the implication that v1 must mutate raw solve records with trainer metadata; trainer linkage now lives in trainer-owned records and may reference native solve IDs externally
- relaxed the storage wording so Task 06 can still choose the exact browser storage mechanism without contradicting Task 05

## Domain Boundary Summary

**Portable layer** (no csTimer imports):
- All 7 domain types as plain objects
- Planner logic (`generateQueue` pure function)
- Weighting formula
- Case catalog data
- Export JSON schema

**csTimer integration layer** (depends on csTimer):
- Browser storage keys (`trainer:*` namespace)
- Scramble engine bridge
- Timer UI integration
- Export format translation
- DOM mount points

## Review Checkpoint

User must approve these domain boundaries before T06 (persistence) and T09 (planner logic) proceed.

## Files Changed
- `docs/architecture/domain-boundaries.md` — **new**
- `docs/features/TrainerV1.md` — **edited** (expanded domain contracts, added extraction boundary notes)
