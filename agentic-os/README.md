# Agentic OS

<!-- Owned by Agentic OS (agentic-os-template). Updated by `copier update`. -->

This project was generated from `agentic-os-template` and receives framework
updates from it. "Agentic OS" is the shared way of working with Claude Code
across projects: the rules in `CLAUDE.md`, the permission sets and hooks in
`.claude/`, the checker subagent, the loop skills, CI, the conventions
for plans, backlog and handoffs, and Marker, the shared design system in
`agentic-os/marker/` (`MARKER.md` has the decisions and patterns).

## What is owned by whom

| Owned by the template (replaced on update) | Owned by the project (never touched after first render) |
|---|---|
| `CLAUDE.md` | `CLAUDE.project.md` |
| `.claude/settings.json`, `.claude/settings.loop.json` | `.claude/settings.local.json` (gitignored, per machine) |
| `.claude/loop.md` | `.claude/loop.project.md` |
| `.claude/agents/checker.md` | your own agents next to it |
| `.claude/skills/test-fix/` | your own skills next to it (e.g. `verify`) |
| `agentic-os/` (this folder, incl. `SECURITY-CHECKLIST.md`) | `scripts/`, `plans/SECURITY.md` |
| `.github/workflows/` (`ci.yml`, `zap-baseline.yml`) | `Dockerfile`, `docker-compose.yml`, `compose.server.yml` |
| `.gitignore` | `src/`, `tests/`, `plans/`, `BACKLOG.md`, `README.md`, `.env*` |
| `.copier-answers.yml` | `pyproject.toml` / `package.json` |
| | `source/`, `resources/`, `manifest.xml`, `monkey.jungle` (Monkey C) |

Project-owned files are generated once. On update they are excluded
outright: never overwritten, and not recreated if you deleted them (an adopted
project rarely keeps the starter `src/` and `tests/`). If you want a starter
file back, copy it from the template repo.

If a template-owned file needs a project-specific change, the change belongs
in the template (add a question or a conditional) or in the project-owned
sibling. Editing it in place works, but the next update will produce a
conflict you have to resolve by hand.

## Updating this project

```bash
agentic-os/update.sh                  # latest tagged template version
agentic-os/update.sh --vcs-ref HEAD   # unreleased template HEAD
```

The script refuses to run on a dirty tree. Copier merges the template diff
into your files; conflicts show up as git conflict markers. Read the
template's `CHANGELOG.md` for the version you moved to, resolve, run the
tests, commit.

## Permissions

- `.claude/settings.json`: interactive work. A small allowlist for the
  language toolchain and read-only git; `git push` and `.env` are denied.
- `.claude/settings.loop.json`: unattended work. Start a loop session with
  `claude --settings .claude/settings.loop.json`. It denies commits, package
  changes, network tools and edits to `.claude/` and `agentic-os/`.
- `.claude/settings.local.json`: your machine-specific extras. Gitignored.

## Hooks

`agentic-os/edit_hook.py` runs after every Write/Edit and gives one of two
reminders. It never blocks; the edit stands.

- **Template-owned file edited**: the change will be replaced or conflict on
  the next update. Put the content in the project-owned sibling, or note the
  proposal in `BACKLOG.md` under "Agentic OS" (which file, what, why) so it
  can go into the template. The maintenance loop reports those proposals.
- **Source file edited**: which test file mirrors it (`src/` to `tests/`; for
  Monkey C, `(:test)` functions in the same file or `source/tests/`).

It reads the hook payload from stdin and `CLAUDE_PROJECT_DIR` from the
environment, so it works from any working directory and on Windows paths.

## Project kinds

`language` (typescript, python, node, monkeyc, other) picks the toolchain:
starter code, tests, permissions, the test-gate mapping, CI steps.
`deploy` (container or none) says whether the project is a Docker image run
on UMDS via compose. `none` drops Dockerfile, compose, `.dockerignore`, the
GHCR publish job and the ZAP workflow, and marks the container items in
`plans/SECURITY.md` as n/a. Monkey C projects are always `none`: they build
locally with the Connect IQ SDK and the developer key, and CI only scans.

## Loops

A loop is a skill with a stop criterion (see `templates/loop-skill.md`).
Three ways to run one:

| | `/loop 30m /<skill>` | `/goal <condition>` | Desktop scheduled task or cron |
|---|---|---|---|
| Next run starts when | interval elapses | previous turn ends and the condition is not yet met | schedule |
| Needs an open session | yes | yes | no |
| Good for | polling something slow | driving work to a verifiable end state | nightly jobs |

Rules that apply to every loop are in `CLAUDE.md`, section 5. In short: the
`checker` subagent grades, the loop works in a worktree, it has a maximum
number of iterations, and it writes what it did to `plans/loops/PROGRESS.md`.

`test-fix` is the reference loop. Run it manually first (`/test-fix`), then
as a goal (the exact `/goal` line is in its SKILL.md).

## Security

`SECURITY-CHECKLIST.md` in this folder is the master list, grouped by what
the project is (always, web app or API, uploads, database, paid APIs, public
exposure, money). `plans/SECURITY.md` is the project's status against it:
which sections apply, each item done, n/a, open, or a documented deviation.

CI enforces the two items a tool can enforce: gitleaks (no secrets in
history) and a dependency audit. The `ZAP baseline` workflow (manual trigger)
scans a URL on demand. The starter code refuses to start on missing env vars
and the starter Dockerfile runs as uid 1000, not root. Everything else is checked by Claude during
the work (`CLAUDE.md`, section 5, "Security"), by the `checker` subagent
when a diff touches security-relevant code, and by the built-in
`/security-review` skill. The maintenance loop reports open items but never
changes the file.

Rule of thumb for HTTPS: also on the LAN. A plain-HTTP port is allowed only
as a written deviation with a reason.

## Adopting an existing project

1. On a branch, in the project root:
   `copier copy --vcs-ref <tag> https://github.com/<owner>/agentic-os-template .`
2. Copier asks the questions, then offers to overwrite each existing file.
   Say yes to template-owned files, no to project-owned ones.
3. Move the old project-specific section of `CLAUDE.md` into
   `CLAUDE.project.md`. Move project-specific `permissions.allow` entries from
   `.claude/settings.json` into `.claude/settings.local.json`.
   For a Monkey C project answer `language: monkeyc`; `deploy` is then not
   asked. Keep your `manifest.xml`, `monkey.jungle`, `source/` and
   `resources/`; they are project-owned.
4. Run the tests, review the diff, commit. From then on `agentic-os/update.sh`
   works.

## Template repo

`https://github.com/<owner>/agentic-os-template` (see `_src_path` in
`.copier-answers.yml`). Changes to the framework are made there, tagged, and
pulled into projects with the update script. Ideas for the framework go in
this project's `BACKLOG.md` under "Agentic OS" until they are moved over.
