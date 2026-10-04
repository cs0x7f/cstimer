"""Generate tokens.css from tokens.json in this folder. Owned by Agentic OS.

Run it after editing tokens.json:

    python agentic-os/marker/build_tokens.py

Stdlib only. The layout of the output is fixed: one block per theme, one
`:root` block for the unthemed tokens and font families, the two base rules
MARKER.md asks every app to have, then one class per type style. The test in
the template repo checks that this script reproduces the committed tokens.css
byte for byte.
"""

import json
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
SOURCE = HERE / "tokens.json"
TARGET = HERE / "tokens.css"

HEADER = (
    "/* Marker — tokens.css. GENERATED from tokens.json in this folder; "
    "edit tokens.json, then regenerate.\n"
    "   Owned by Agentic OS (agentic-os-template). Do not edit in the project; "
    "override per project after this file. */\n"
)

# Not tokens: MARKER.md states them in prose ("Typography", "Focus").
BASE_RULES = (
    "/* Base: the two lines MARKER.md asks every app to have. */\n"
    "html { font-family: var(--font-sans); font-size: 13px; color: var(--text); "
    'background: var(--bg); font-feature-settings: "cv01", "ss03", "zero"; }\n'
    ":focus-visible { outline: 2px solid var(--focus); outline-offset: 1px; }\n"
)

ALIAS = re.compile(r"^\{([\w-]+)\}$")  # "{bg3}" -> var(--bg3)


def css_value(value: str) -> str:
    match = ALIAS.match(value)
    return f"var(--{match.group(1)})" if match else value


def theme_value(token: dict, theme: str) -> str:
    value = token["value"]
    return css_value(value[theme] if isinstance(value, dict) else value)


def block(selector: str, lines: list[str]) -> str:
    body = "".join(f"  {line};\n" for line in lines)
    return f"{selector} {{\n{body}}}\n"


def type_style(style: dict, family: str) -> str:
    props = [
        f"font-family: var(--font-{family})",
        f"font-size: {style['fontSize']}",
        f"line-height: {style['lineHeight']}",
        f"font-weight: {style['fontWeight']}",
    ]
    if "letterSpacing" in style:
        props.append(f"letter-spacing: {style['letterSpacing']}")
    if family == "mono":
        props.append('font-feature-settings: "tnum" 1')
    return f".{style['name']} {{ {'; '.join(props)}; }}\n"


def render(tokens: dict) -> str:
    themed = tokens["color"]["tokens"] + tokens["shadow"]["tokens"]
    out = [HEADER, "\n"]
    for theme in tokens["color"]["themes"]:
        selector = f'[data-theme="{theme["id"]}"]'
        if theme is tokens["color"]["themes"][0]:
            selector = f":root, {selector}"
        out.append(block(selector, [f"--{t['name']}: {theme_value(t, theme['id'])}" for t in themed]))

    unthemed = [
        f"--{t['name']}: {t['value']}"
        for group in ("spacing", "radius", "control")
        for t in tokens[group]["tokens"]
    ]
    unthemed += [f"--font-{name}: {stack}" for name, stack in tokens["type"]["families"].items()]
    out.append(block(":root", unthemed))

    out.append("\n" + BASE_RULES + "\n")
    out.append("/* Type styles */\n")
    for group in tokens["type"]["groups"]:
        out.extend(type_style(style, group["family"]) for style in group["styles"])
    return "".join(out)


def main() -> None:
    tokens = json.loads(SOURCE.read_text(encoding="utf-8"))
    TARGET.write_text(render(tokens), encoding="utf-8", newline="\n")
    print(f"wrote {TARGET}")


if __name__ == "__main__":
    main()
