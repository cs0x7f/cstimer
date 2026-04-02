# Repo Coordination Brief

**Session:** orch-20260402-034801  
**Task:** 00_repo-coordination  
**Created:** 2026-04-02T17:47:04+01:00

---

## 1. Remote Model

| Remote | URL | Role |
|--------|-----|------|
| `origin` | `https://github.com/JStaRFilms/cstimer-trainer` | **Your fork.** All feature work, docs, and product bets land here. This is the primary remote. |
| `upstream` | `https://github.com/cs0x7f/cstimer.git` | **Original csTimer repo.** Read-only reference for bug fixes, timer core updates, and compatibility checks. |

### Current State (as of this brief)

- `origin/master` and `upstream/master` are at the same commit (merge-base: `f413665`).
- `HEAD` is **2 commits ahead** of both remotes (docs-only commits: `0106736`, `a8d6467`).
- `upstream` has ~1295 total commits; the fork diverges from it at `f413665`.
- No feature code has been pushed to `origin` yet — only documentation scaffolding.

### Commands for Later Agents

```bash
# Add upstream if it ever goes missing
git remote add upstream https://github.com/cs0x7f/cstimer.git

# Fetch latest from both
git fetch origin && git fetch upstream

# See what upstream has that you don't
git log --oneline origin/master..upstream/master

# See what your fork has that upstream doesn't
git log --oneline upstream/master..origin/master
```

---

## 2. Branch & Contribution Policy

### Primary Branch: `master`

- `master` on `origin` is the **integration branch** for all fork-first work.
- All feature branches branch from `origin/master` and merge back into it.
- `master` on `upstream` is treated as a **reference**, never pushed to.

### Feature Branch Naming

```
feature/FR-XXX-short-description   # Functional requirements
docs/FR-XXX-blueprint              # Documentation-only branches
fix/FR-XXX-regression              # Bug fixes
```

### Workflow

1. Create feature branch from `origin/master`.
2. Implement against the fork.
3. Merge into `origin/master` when acceptance criteria are met.
4. **Do not push to `upstream`.** Ever.

### Upstream Sync Policy

- Periodically check `upstream/master` for relevant bug fixes or timer core updates.
- If an upstream commit is relevant to the trainer, **cherry-pick** it rather than merging the entire upstream branch.
- Record cherry-picks in task summaries so the provenance is clear.

```bash
# Cherry-pick a specific upstream fix
git cherry-pick <upstream-commit-sha>
```

---

## 3. Separating Upstream-Friendly vs Fork-Only Work

This is the most important operating rule. Every task must be classified into one of two buckets:

### Bucket A: Upstream-Friendly Cleanup

Work that **could** be contributed back to csTimer upstream:

- Bug fixes in timer core logic
- Scramble algorithm improvements
- Performance fixes that don't depend on trainer-specific code
- Generic utility improvements

**Rule:** These should be developed on branches that stay clean of trainer-specific code so they can be upstreamed as PRs if desired. Keep them isolated.

### Bucket B: Fork-Only Product Bets

Work that is **specific to the trainer product** and will never go upstream:

- Trainer UI components and entry points
- Training plan persistence (new keys, new data structures)
- Adaptive drill queue logic
- Session review and skill stats
- Any feature listed in `docs/project_requirements.md` as FR-001 through FR-014

**Rule:** These live entirely in the fork. They should not be mixed with Bucket A work in the same commit or branch.

### Why This Matters

- If you mix trainer-specific code with a generic bug fix, you can't upstream the fix without also shipping trainer code.
- Keeping them separate means you can contribute useful fixes back to csTimer (goodwill, shared maintenance) while keeping your product bets private to the fork.
- The Coding Guidelines already state: *"Do not mix fork-only product bets with upstream-friendly cleanup in the same task."*

### Practical Enforcement

- **One commit, one concern.** Don't fix a scramble bug and add a trainer UI panel in the same commit.
- **Branch per bucket.** `fix/scramble-edge-case` (Bucket A) vs `feature/FR-003-oll-drills` (Bucket B).
- **Task files declare the bucket.** Later orchestrator sessions should tag tasks as `bucket: upstream-friendly` or `bucket: fork-only`.

---

## 4. What This Means for Future Agents

When a later agent receives a task packet:

1. **Check the bucket tag** (if present) or classify the work.
2. **Bucket A tasks:** Branch from `upstream/master`, develop, merge to `origin/master`. Optionally prepare an upstream PR.
3. **Bucket B tasks:** Branch from `origin/master`, develop, merge to `origin/master`. Never touch `upstream`.
4. **Always run** `git fetch upstream` before starting to check for relevant upstream changes.

---

## 5. Summary

| Concern | Policy |
|---------|--------|
| Primary remote | `origin` (JStaRFilms/cstimer-trainer) |
| Reference remote | `upstream` (cs0x7f/cstimer) |
| Integration branch | `origin/master` |
| Feature branches | Branch from and merge into `origin/master` |
| Upstream sync | Cherry-pick selectively, don't merge |
| Work classification | Bucket A (upstream-friendly) vs Bucket B (fork-only) |
| Commit discipline | One concern per commit, no mixing buckets |
| Push target | Always `origin`, never `upstream` |
