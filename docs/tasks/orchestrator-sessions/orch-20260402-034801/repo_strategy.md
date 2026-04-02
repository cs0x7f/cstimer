# Repo Strategy

## Remote Model

- `origin` = `JStaRFilms/cstimer-trainer`
- `upstream` = `cs0x7f/cstimer`

## Operating Policy

- Build for the fork first.
- Track upstream to stay aware of csTimer core changes and merge opportunities.
- Only propose upstream slices for features that feel native to csTimer itself.

## Recommended Future Setup Command

```powershell
git remote add upstream https://github.com/cs0x7f/cstimer.git
git fetch upstream
```

## Classification Rule

### Upstream-Friendly Later

- generic training stats improvements
- drill queue primitives
- metadata-safe storage/export hooks
- modular weighting hooks

### Fork-Only

- adaptive coach behavior
- structured training philosophy
- future sync and multiplayer direction
- opinionated trainer UX
