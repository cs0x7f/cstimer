# Verification Expectations For Future Implementation Tasks

**Session:** `orch-20260402-034801`  
**Task:** `03_coding-guidelines-and-builder-prompt`  
**Date:** 2026-04-02

Future implementation agents should treat verification as mandatory evidence, not an optional final pass.

## Minimum Verification Expectations

1. Check normal timer flows still work: start, stop, inspection, and solve deletion.
2. Check scramble generation and scramble display still work.
3. Check existing solve data is not corrupted or silently remapped.
4. Check offline assumptions are preserved, including service worker/cache behavior and browser-local storage behavior.
5. Check export/import behavior when trainer persistence is touched.
6. Check browser console output for new errors or warnings.
7. Update the relevant FR acceptance criteria checkboxes and any affected docs.

## Verification Evidence To Include In Task Handoffs

- files changed
- verification steps run
- verification steps not run
- known risks or follow-up checks still needed
