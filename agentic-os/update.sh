#!/usr/bin/env bash
# Owned by Agentic OS. Pull the latest template version into this project.
#
# Usage: agentic-os/update.sh [copier update args...]
#   e.g. agentic-os/update.sh                 # latest tag
#        agentic-os/update.sh --vcs-ref HEAD  # unreleased template HEAD
#        agentic-os/update.sh --defaults       # never prompt (CI, loops)
#
# Copier does a three-way merge between the old template version, the new one
# and your working tree. Conflicts land as git conflict markers in the file.
set -euo pipefail

cd "$(dirname "$0")/.."

if ! command -v copier >/dev/null 2>&1; then
  echo "copier not found. Install with: uv tool install copier" >&2
  exit 1
fi

if [ ! -f .copier-answers.yml ]; then
  echo "No .copier-answers.yml here; this project was not generated from the template." >&2
  echo "See agentic-os/README.md, section 'Adopting an existing project'." >&2
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository. copier update needs git history to merge against." >&2
  exit 1
fi

if [ -n "$(git status --porcelain)" ]; then
  echo "Working tree is not clean. Commit or stash first; copier update needs a clean tree." >&2
  git status --short >&2
  exit 1
fi

current=$(grep -E '^_commit:' .copier-answers.yml | awk '{print $2}')
echo "Current template version: ${current:-unknown}"

copier update --skip-answered "$@"

new=$(grep -E '^_commit:' .copier-answers.yml | awk '{print $2}')
echo
echo "Template version: ${current:-unknown} -> ${new:-unknown}"
conflicts=$(grep -rl '^<<<<<<< ' . --exclude-dir=.git --exclude-dir=node_modules --exclude-dir=.venv 2>/dev/null || true)
if [ -n "$conflicts" ]; then
  echo "Conflicts to resolve:"
  echo "$conflicts"
else
  echo "No conflicts."
fi
echo "Review with: git status && git diff"
echo "Then read CHANGELOG.md in the template repo for ${new:-the new version}."
