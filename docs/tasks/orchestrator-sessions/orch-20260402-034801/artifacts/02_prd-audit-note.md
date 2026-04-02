# PRD and FR Audit — Clarifications Note
**Date:** 2026-04-02  
**Session:** orch-20260402-034801  
**Task:** 02_prd-and-issues

## Summary

Audited `docs/project_requirements.md` and all 14 FR issues (`FR-001` through `FR-014`). No FR merges or splits were required — the scope boundaries are clean. Tightened acceptance criteria in 4 MUS issues where ambiguity remained.

## Changes Made

### FR-003 — Adaptive Last-Layer Drill Queue
- **Before:** "Weighting logic inputs are documented" (too vague)
- **After:** Specified which metrics drive case priority (solve time, recognition time, DNF rate, skip count) and added minimum coverage guarantee requirement.

### FR-005 — Skill Stats and Session Review
- **Before:** "Review outputs line up with training logic" (not testable)
- **After:** Defined concrete metrics (avg time, best/worst cases, improvement trend, weakness ranking) and added a "next recommended action" requirement.

### FR-006 — Local-First Persistence and Export Compatibility
- **Before:** "Compatibility risks are called out explicitly" (documentation-only)
- **After:** Specified storage mechanism selection, concrete JSON schema for export/import, and explicit offline behavior definitions.

### FR-007 — Source-Backed Case Catalog
- **Before:** "Provenance fields are documented" (no schema)
- **After:** Defined provenance schema fields (source URL, algorithm variant, confidence level, last-updated date) and conflict resolution approach for conflicting algorithms.

### FR-002 — Structured Training Plans
- **Before:** "Plan output shape is clear enough" (too subjective)
- **After:** Defined named v1 template scope, exact setup-input expectations, and minimum `TrainingPlan` output fields.

### FR-004 — Cross Drill Workflows
- **Before:** "Shared plan/session structures can support cross drills" (too vague)
- **After:** Defined required captured data, explicit cross-drill bounds, and concrete review-output expectations.

## MUS Priority Order (Confirmed and copied into the PRD)

1. FR-001: Trainer Entry and Goal Selection
2. FR-002: Structured Training Plans
3. FR-003: Adaptive Last-Layer Drill Queue
4. FR-004: Cross Drill Workflows
5. FR-005: Skill Stats and Session Review
6. FR-006: Local-First Persistence and Export Compatibility
7. FR-007: Source-Backed Case Catalog

## Future Items (No Changes)

FR-008 through FR-014 are correctly scoped as Future. No action needed.

## Readiness Assessment

The FR set is now **internally consistent** with **testable acceptance criteria**. Ready for downstream design, architecture, and build-packet work.
