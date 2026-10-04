"""PostToolUse hook for Write/Edit. Owned by Agentic OS.

Rendered for language=other, deploy=container.

Two reminders, never a block (exit 2 = feedback to Claude, the edit stands):

1. Template-owned file edited: the change will conflict on the next
   `copier update`. Move it to the project-owned sibling, or note it in
   BACKLOG.md under "Agentic OS" so it reaches the template.
2. Source file edited: name the test file that mirrors it.

Reads the hook payload from stdin and CLAUDE_PROJECT_DIR from the environment.
"""

import json
import os
import re
import sys
from pathlib import Path

# Files and directories replaced by `copier update` (see agentic-os/README.md).
TEMPLATE_OWNED = (
    "CLAUDE.md",
    ".copier-answers.yml",
    ".gitignore",
    ".gitattributes",
    ".claude/settings.json",
    ".claude/settings.loop.json",
    ".claude/loop.md",
    ".claude/agents/checker.md",
    ".claude/skills/test-fix/",
    ".github/workflows/ci.yml",
    ".github/workflows/zap-baseline.yml",
    "agentic-os/",
)

SOURCE = re.compile(r"^src/(?:(.+)/)?([^/]+)\.[^/.]+$")
IGNORE: set[str] = set()
RUN = "the test command in CLAUDE.project.md"


def test_hint(package: str | None, module: str) -> str:
    target = Path("tests") / (package or "") / f"test_{module}"
    verb = "Update" if (PROJECT_ROOT / target).exists() else "Create"
    return f"{verb} {target.as_posix()} and run `{RUN}`"


PROJECT_ROOT = Path(os.environ.get("CLAUDE_PROJECT_DIR") or os.getcwd())


def relative_to_project(raw: str) -> str:
    """Path below the project root, forward slashes, original case, or raw if outside."""
    path = os.path.abspath(raw)
    root = os.path.abspath(PROJECT_ROOT)
    if os.path.normcase(path).startswith(os.path.normcase(root) + os.sep):
        return path[len(root) + 1 :].replace("\\", "/")
    return raw.replace("\\", "/")


def template_owned(rel: str) -> bool:
    # Case-insensitive: Windows treats CLAUDE.md and claude.md as the same file.
    low = rel.casefold()
    return any(
        low == entry.casefold() or (entry.endswith("/") and low.startswith(entry.casefold()))
        for entry in TEMPLATE_OWNED
    )


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, OSError):
        return 0
    raw = str(payload.get("tool_input", {}).get("file_path", ""))
    if not raw:
        return 0
    rel = relative_to_project(raw)

    if template_owned(rel):
        print(
            f"[agentic-os] {rel} is owned by the template and will be replaced or "
            "conflict on the next `copier update`. Put project-specific content in the "
            "project-owned sibling (CLAUDE.project.md, .claude/loop.project.md, "
            ".claude/settings.local.json, your own skills/agents), or note the change "
            'in BACKLOG.md under "Agentic OS" so it can go into the template.',
            file=sys.stderr,
        )
        return 2

    match = SOURCE.match(rel)
    if not match or match.group(2) in IGNORE:
        return 0
    package, module = match.groups()
    print(
        f"[test-gate] {rel} was modified. {test_hint(package, module)} "
        "before this task is complete.",
        file=sys.stderr,
    )
    return 2


if __name__ == "__main__":
    sys.exit(main())
