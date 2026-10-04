# cstimer_container rules

<!-- Owned by the project. Generated once by agentic-os-template, never
     overwritten by `copier update`. Imported from CLAUDE.md. -->

Self-hosted container build of csTimer, the speedcubing timer (fork of cs0x7f/cstimer)

## Stack
- Fork of cs0x7f/cstimer (`upstream` remote). Plain JavaScript in `src/js`, CSS in
  `src/css`, translations in `src/lang`, PHP entry point `dist/timer.php`.
- Build: `make` (GNU make + Java, Closure Compiler in `lib/compiler.jar`) compiles
  `src/` into `dist/`. On Windows run it from Git Bash with `make SHELL=/usr/bin/sh`.
  `make check` runs Closure's checks; `make local` (needs PHP) renders a static
  `dist/local/index.html`. There is no test suite.
- Runs as one container via docker compose, listening on port 8080.
  The production image is built by GitHub Actions and pushed to
  ghcr.io/axlchris/cstimer-container; it runs on the UMDS home server.
- Not exposed to the internet; LAN and localhost only.

## Safety — Highest Priority
<!-- What must this project never do? Data it must never corrupt, actions
     that need a human, limits enforced in code rather than config. -->
-

## Config and Secrets
- Secrets come only from environment variables (.env locally, compose on the server). Never hardcode them, never log them.
-

## What Must Never Break
<!-- The short list a reviewer checks first. -->
-
