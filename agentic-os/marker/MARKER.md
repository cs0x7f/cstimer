# Marker

<!-- Owned by Agentic OS (agentic-os-template). Replaced on `copier update`.
     Change it in the template, never in a project. -->

The shared visual foundation for Aksel's self-hosted tools. The name is the
orienteering control marker, orange and white: a light primary button, orange
as a detail, dark forest around it.

Density, spacing and control heights were extracted from TagStudio, the only
project with a finished UI. Palette, type weights, shapes and the elevation
model were designed in September 2026 with Linear, Factory and Tinybird as
references, one idea from each. Those references are marketing sites; what was
taken from them is palette, weight band and elevation, never their spacing.

Marker describes **dense, number-heavy working tools for one user**: the app
sits open for hours, little happens, and when something happens it must be
easy to see. It is not a system for marketing pages.

**Files in this folder**

| file | what |
|---|---|
| `tokens.json` | the source of truth: every token with its value per theme and a usage note |
| `tokens.css` | generated from `tokens.json`; the file an app loads |
| `MARKER.md` | this document: the decisions and the patterns |

The claude.ai artifact "Marker" is a view of these files, not a second source.

---

## Five decisions

**Dark is the primary theme.** It is the theme that was designed; light is
derived from it. Every colour exists in both, and every text pair meets AA in
dark. Light has two documented exceptions (below).

**Warm, not cold.** The canvas is `#0f0e0d`, not blue-black. The greys carry a
brown cast (`#171514`, `#2a2725`, `#b8b3b0`). This is what separates Marker
from "everyone's dark mode", and what keeps high contrast from feeling hard.

**The primary button is light.** `primary` is `#eeeeee` with dark text. No
chroma. It is the only filled button on the screen, which is why it stands out.
Unfamiliar for a week; after that, orange buttons look wrong.

**Orange is a detail.** `accent` (`#ee6018`) is the mark, the marker stripe on
a row, an icon. Never button fill, never focus border, never a selected row.
It is also the token a project rebinds: Intellitrader sets something cool here
and keeps orange and red for Live.

**Numbers are set in mono.** Everything numeric (amounts, pips, BPM, years,
file sizes, countdowns) and every status is set in JetBrains Mono. Signs are
always written out. It is "numbers are the content" made visible, and the one
place Marker clearly differs from Linear.

---

## Colour

23 colours in two themes, dark first: three surfaces, two edges, three inks,
three for the primary button, three for the accent, two neutral aliases, one
focus ring, three semantic colours and three tints.

### Roles, not names

`accent` is a role. TagStudio binds it to orange; Intellitrader rebinds it;
everything else is inherited. `sel-bg` and `row-hover` are aliases of `bg3`
and `bg2`: selection and hover are neutral lifts, not colours, and cannot
drift from the surfaces they sit on.

### What text may sit on

Measured contrast against `bg`.

| token | dark | light | usable as text |
|---|---|---|---|
| `text` | 16.6:1 | 16.8:1 | everywhere |
| `text2` | 9.3:1 | 6.6:1 | everywhere |
| `muted` | 5.2:1 | 3.5:1 | dark: yes · light: placeholders and repeated information only |
| `accent` | 5.8:1 | 3.2:1 | dark: yes · light: **no**; use `accent2` (4.3:1) for large figures and icons |
| `green` | 10.4:1 | 6.1:1 | everywhere |
| `amber` | 9.7:1 | 6.1:1 | everywhere |
| `red` | 5.5:1 | 5.9:1 | everywhere |
| `primary-ink` on `primary` | 16.6:1 | 17.7:1 | — |

Semantic colours on their tints (`green` on `green-bg`, etc.) hold 4.6–7.8:1
in dark and 4.8–5.0:1 in light.

### Status is never colour alone

A colour-blind reader cannot tell a green dot from a red one. Every state
(running, paused, stopped, error) has a dot *and* a word in `micro`. The same
goes for numbers: `+` and `−` are written out.

---

## Typography

**Inter** for the interface, **JetBrains Mono** for numbers and status, both
from Google Fonts. Inter is loaded in 400 and 500, and *only* those two.

That is the whole weight band. No 600, no 700. Hierarchy comes from size and
from `text` against `text2`, not from weight. What TagStudio does today (61
occurrences of 600) is exactly what makes nothing stand out.

Inter must have the OpenType features `cv01`, `ss03` and `zero` on (open a,
straight t and g, slashed zero). That is not a token; it is one
`font-feature-settings` line on `html`, and `tokens.css` sets it. Mono styles
add `tnum`.

Eleven styles. Four sizes sit within 3px (10–13), on purpose: density is
chosen, and what separates levels is 400 vs 500, `text` vs `text2`, sans vs
mono. `micro` at 10px is the floor.

Load the fonts with:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## Spacing, radius, control heights

Eight spacing steps from 2 to 20px, from the TagStudio code. Start at
`space-3` (8px).

Three radii with meaning: `radius-sm` 4px on chips and badges, `radius` 6px on
controls, `radius-lg` 12px on cards and modals. A 6px card looks like a large
button; one radius for everything was the old system's mistake.

Three control heights: 26, 30 and 32px. Everything on one row has the same
height.

---

## Elevation

One model: **hairlines and layers of darkness**. A card is `bg2` with an inset
1px edge in `border` (`shadow-card`). A selected row is `bg3`. A hover is one
step up. Shadow (`shadow`) exists only on what floats above the page (modals,
popovers, toasts) and nowhere else.

The one question to ask: does this sit *on* the page or *above* it?

---

## Focus

`focus` is a 2px `outline` with 1px `outline-offset`, the text colour at 30%.
It shows on every surface in both themes, uses no chroma, and does not vanish
against `bg2` the way an orange border did. `tokens.css` applies it to
`:focus-visible`; do not set `border-color` on focus.

---

## Motion

Transitions of 0.10–0.15 s on `background` and `border-color` only. Nothing
moves. In an app that stays open all day, motion is a signal, and a signal
spent on hover is spent.

---

## Iconography

No icon set yet. TagStudio uses inline SVG and emoji directly. Choosing a set
is a decision for all projects and belongs here. Requirement: single stroke,
1.5px, drawn on a 16px grid, which is what fits 12px text.

---

## Patterns

Seven recurring elements. Not a component library: the recipes, so the next
project builds them the same way. Every value below is a token; use
`var(--token)`, never the number.

### Button

| variant | fill | text | border | hover |
|---|---|---|---|---|
| primary | `primary` | `primary-ink` | none | `primary-hover` |
| secondary | transparent | `text2` | `border` | `bg3` |
| destructive | transparent | `red` | `border` | `red-bg` |

One primary button per view. Height `control-lg` in modals, `control-md` in
toolbars, `control-sm` inside cards. Horizontal padding `space-4`, `space-6`
when the button stands alone. Text in `button`, radius `radius`. Disabled:
`opacity: .4`. No borderless ghost variant: a button with neither border nor
fill is a link, and links belong in text.

### Status chip

Text in `micro` (mono, uppercase), a 6px `radius-round` dot before it, padding
`space-0` `space-2`, radius `radius-sm`. Colour and tint go together: `green`
on `green-bg`, `amber` on `amber-bg`, `red` on `red-bg`; stopped is `text2` on
`bg3`. Dot *and* word, always.

### Table

`border-collapse: collapse`, `table-layout: fixed`. Header cell: `bg2`, `label`
in `text2`, padding `space-2` `space-3`, sticky to the top, hairline below in
`border`. Data cell: padding `space-2` `space-3`, `body-sm`, ellipsis on
overflow, hairline below. Numeric columns right-aligned in `num`; secondary
columns in `text2`.

Row states, in priority order:

1. **Selected**: `sel-bg`. Beats everything.
2. **Hover**: `row-hover`.
3. **Marked**: a 2px stripe in `accent` inset on the first cell
   (`box-shadow: inset 2px 0 0`), the row in `text2`. The only place `accent`
   has in a table.

### Card

`bg2`, `radius-lg`, `shadow-card` as the edge, padding `space-5`. Title in
`card-title` with the status chip right-aligned on the same line, metadata in
`meta` below. Key figures in a grid with `space-3` gaps: label in `micro` in
`muted`, value in `num-lg`, positive in `green`, negative in `red`, neutral in
`text`. Actions at the bottom in `control-sm`. Cards stack with `space-4`
between them. There is no card inside a card.

### Segmented control

For mutually exclusive views, not actions. A row of buttons in one frame:
`border`, `radius`, `overflow: hidden`, height `control-md`. Active segment
`bg3` and `text`; the others transparent in `text2`. One hairline in `border`
between segments. No accent. Above four segments it is tabs.

### Toast

Bottom centre, `space-7` from the edge, stacked with `space-2`. Padding
`space-3` `space-6`, `radius-lg`, `shadow`, text in `body-sm`. Confirmation is
`primary` as fill and `primary-ink` as text (the same inversion as the button,
not green). Error is `red-bg` with `red` text and a 1px `red` border. No info
variant.

### Modal

Centred, `bg` as surface, `radius-lg`, `shadow`, behind it a 50% black
scrim. Padding `space-6`. Title in `title`, body in `body`. Actions bottom
right: cancel as secondary, to the left of confirm as primary. A destructive
confirm uses the destructive variant, not `primary`. When the action has
financial or irreversible consequences, the button text names the action
("Close 3 positions"), never "OK".

---

## Use in a project

**Inherited unchanged**: surfaces, edges, inks, the primary button, the focus
ring, the semantic colours, spacing, radii, control heights, typography,
elevation.

**Rebound per project**: `accent`, `accent2`, `accent-bg`. Three tokens; that
is the whole difference between two projects. The override goes in the
project's own stylesheet, after `tokens.css`, and nowhere else:

```css
/* after agentic-os/marker/tokens.css — example shape, not Intellitrader's decided colour */
:root, [data-theme="dark"] { --accent: #6b9fd4; --accent2: #8ab4e0; --accent-bg: #16202b; }
[data-theme="light"]        { --accent: #2f6ba8; --accent2: #245489; --accent-bg: #e3ecf6; }
```

Theme switching: set `data-theme="dark"` or `"light"` on `<html>`. Dark is
the default (the `:root` block). Persist the choice per browser.

**Changing Marker**: edit `tokens.json` in the template, regenerate
`tokens.css`, note it in `CHANGELOG.md`, tag. Projects receive it through
`agentic-os/update.sh`. A token that exists in only one project belongs to
that project; one that appears in a second project belongs here.
