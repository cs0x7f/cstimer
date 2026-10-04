# Security status: cstimer_container

<!-- Owned by the project. Generated once by agentic-os-template. The master
     list with what each item means and how it is verified is
     agentic-os/SECURITY-CHECKLIST.md; item numbers below refer to it. -->

**Last full walk-through:** never
**Public routes:** none
**Exposure:** LAN and localhost only

## Sections that apply

| Section | Applies | Why |
|---|---|---|
| 1 Always | yes | every project |
| 2 Web app or API | ? |  |
| 3 Uploads and writes to user data | ? | |
| 4 Database | ? | |
| 5 Secrets and paid APIs | ? |  |
| 6 Publicly exposed | no | not exposed at generation |
| 7 Money and live systems | ? | |

## Status

Status values: `done YYYY-MM-DD`, `n/a`, `open`, or `deviation: <reason> (YYYY-MM-DD)`.

| Item | Status | Note |
|---|---|---|
| 1.1 secrets via env only | open | |
| 1.2 env validated at startup | open | no starter code for this language |
| 1.3 no secrets in git (CI) | done at generation | gitleaks in ci.yml |
| 1.4 dependency audit (CI) | n/a | no package manager audit for this language |
| 1.5 HTTPS also on LAN | open | if any port is plain HTTP, write the deviation here |
| 1.6 mem_limit on the server | done at generation | 512m in compose.server.yml |
| 1.7 container not root | done at generation | USER uid 1000 in Dockerfile |
| 1.8 spend cap per paid key | open | |
| 1.9 /security-review run | open | per change; record the last date |

Add rows for the sections that apply. A deviation is not a failure; an
undocumented one is.

## Public routes

| Route | Why public | Since |
|---|---|---|
| | | |

## Scans and tests

| What | Date | Result / report |
|---|---|---|
| ZAP baseline | | workflow `ZAP baseline` (manual), plus LAN run |
| Manual pen test | | decision: not warranted / done, see report |
| Backup restore test | | |
