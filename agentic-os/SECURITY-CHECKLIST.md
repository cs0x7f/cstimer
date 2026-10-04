# Security checklist

<!-- Owned by Agentic OS (agentic-os-template). Updated by `copier update`.
     The project's filled-in copy is plans/SECURITY.md (project-owned). -->

The master list. Every project keeps its own status in `plans/SECURITY.md`:
which sections apply, and for each item whether it is done, not applicable,
or accepted as a deviation with a reason and a date.

Each item has three fields: **what**, **how it is verified**, **who**
(CI = enforced by the pipeline, Claude = checked during the work, owner = a
decision or an action only the owner can take).

When to walk through it:
- A new project: fill in `plans/SECURITY.md` before the first feature.
- Any change that touches routes, auth, sessions, uploads, file writes,
  secrets, or exposure: the relevant sections, plus `/security-review`.
- First public exposure, and every change to auth afterwards: the whole
  list, plus the scan in section 6.

---

## 1. Always

| # | What | Verified by | Who |
|---|---|---|---|
| 1.1 | Secrets and account identifiers come only from environment variables (`.env` locally, compose on the server). Never hardcoded, never in logs, not even truncated. | grep for key-like strings in `src/`; log output inspected once | Claude |
| 1.2 | Required env vars are validated at startup. Missing or invalid values refuse to start with a clear message; never a silent fallback. The starter code ships this in `config` (exit code 2, every problem listed at once); keep the pattern when adding variables. | start with an empty env, expect exit 2 naming the variable; tests in `tests/` | Claude |
| 1.3 | No secrets in git history. | gitleaks step in CI | CI |
| 1.4 | Dependencies with known high or critical vulnerabilities are not shipped. | audit step in CI (`npm audit` / `pip-audit`) | CI |
| 1.5 | Traffic to the service is HTTPS, also on the LAN. If a port is served over plain HTTP, the deviation is written in `plans/SECURITY.md` with the reason and what is accepted. | `curl -I` against every published port | owner |
| 1.6 | The container has a memory limit on the server (`mem_limit` in `compose.server.yml`). | file content | Claude |
| 1.7 | The container does not run as root. The starter Dockerfile runs as uid 1000 (matches the owner's user on UMDS so bind mounts stay writable). | `USER` line in the Dockerfile; on the server `docker exec <c> id` shows uid 1000 | Claude |
| 1.8 | Every paid API key (Anthropic, broker, Spotify, ...) has a spend cap set at the provider. | provider console, date recorded in `plans/SECURITY.md` | owner |
| 1.9 | `/security-review` has been run on the change before it is called done. | its report is in the transcript | Claude |

## 2. Web app or API (anything that serves HTTP)

| # | What | Verified by | Who |
|---|---|---|---|
| 2.1 | Every route requires authentication unless it is listed as public in `plans/SECURITY.md`. A new route is private by default. | test: unauthenticated request to each route returns 401/403 | Claude |
| 2.2 | Authorization is enforced on the server for every action, never only by hiding a button in the UI. | test per role or per user where roles exist | Claude |
| 2.3 | Admin or destructive routes (delete, bulk write, settings) are separated and need the strongest auth the app has. | route list in `plans/SECURITY.md` | Claude |
| 2.4 | Input is validated at the boundary (schema, type, length, allowed values) before it reaches business logic or the filesystem. | tests with invalid input | Claude |
| 2.5 | No user-controlled data is rendered as raw HTML (`dangerouslySetInnerHTML`, `innerHTML`, template `safe` filters). | grep | Claude |
| 2.6 | Cookie-based sessions have CSRF protection (SameSite=Lax or Strict, and a token for state-changing requests when cross-site use is needed). | test: state-changing request without token is rejected | Claude |
| 2.7 | CORS lists explicit origins. No `*` with credentials. | config inspected, one preflight tested | Claude |
| 2.8 | Session cookies are `HttpOnly`, `Secure`, `SameSite`. Behind Traefik the app trusts the proxy (`trust proxy` or equivalent) so `Secure` is set correctly. | response headers inspected | Claude |
| 2.9 | Rate limiting exists on login and on expensive endpoints. Behind Traefik this is the proxy's job (section 6); LAN-only services state whether they have any. | `plans/SECURITY.md` | owner |
| 2.10 | Error responses do not leak stack traces, paths or dependency versions. | one forced error inspected | Claude |

## 3. File uploads and writes to user data

| # | What | Verified by | Who |
|---|---|---|---|
| 3.1 | Uploads have a size limit enforced before the body is read into memory. | test with an oversized body | Claude |
| 3.2 | File type is checked on content (magic bytes), not on the filename or the client's MIME type. | test with a renamed file | Claude |
| 3.3 | No path component comes from the user. Target paths are built server-side and resolved; anything outside the allowed root is rejected. | test with `../` and absolute paths | Claude |
| 3.4 | Writes to existing user files (audio tags, playlists, config) read and verify the current state first, write to a temp file, and rename. A failed write leaves the original untouched. | test that simulates a failure mid-write | Claude |
| 3.5 | Bulk or destructive operations on user data need a confirmation step and are logged. | UI flow inspected | Claude |

## 4. Database

| # | What | Verified by | Who |
|---|---|---|---|
| 4.1 | Only parameterized queries. No string-built SQL, no raw query with user input. | grep for query building | Claude |
| 4.2 | The application's DB user has the least privileges it needs (no DDL, no superuser). | grant list | owner |
| 4.3 | Backups run, and a restore has been tested at least once. Date in `plans/SECURITY.md`. | restore test | owner |
| 4.4 | Access rules (row ownership, per-user filters) are enforced in queries, not only in the UI. | tests with two users | Claude |

## 5. Secrets and paid APIs

| # | What | Verified by | Who |
|---|---|---|---|
| 5.1 | Each third-party key has the narrowest scope the provider offers (read-only where possible). | provider console | owner |
| 5.2 | Keys can be rotated without a code change (env only). | rotation done once | owner |
| 5.3 | Outbound calls have timeouts and retry limits so a stuck provider cannot pile up cost or requests. | code inspected | Claude |
| 5.4 | Spend cap set at the provider (see 1.8). | provider console | owner |

## 6. Publicly exposed (through Traefik on UMDS)

| # | What | Verified by | Who |
|---|---|---|---|
| 6.1 | TLS, security headers and rate limiting are provided by the Traefik middleware chain (`chain-oauth@file` for browser apps, `chain-no-auth@file` for non-browser clients). The app does not duplicate them, but sets `trust proxy`. | `curl -I https://<domain>` shows the headers | owner |
| 6.2 | The Traefik router uses the OAuth chain unless the app has its own login that has been through section 2. | router labels on the server | owner |
| 6.3 | Media endpoints use a DNS-only (grey cloud) record, not the Cloudflare proxy. | DNS record | owner |
| 6.4 | An OWASP ZAP baseline scan has been run against the public URL before first exposure and after every auth change. The `ZAP baseline` workflow (manual trigger, URL input) does it from GitHub; behind the OAuth chain it only sees the login wall, so also run ZAP from inside the LAN against the app (command in the workflow file). Findings triaged in `plans/SECURITY.md`. | scan report artifact | owner |
| 6.5 | Health endpoints exposed without auth return no internal detail (versions, paths, counts of private data). | response inspected | Claude |

## 7. Money and live systems

| # | What | Verified by | Who |
|---|---|---|---|
| 7.1 | Live mode is opt-in through env vars and cannot be enabled from the UI. | test | Claude |
| 7.2 | Hard limits (max size, max loss, max instances) are enforced in code, not only in config or UI. | tests at the limit | Claude |
| 7.3 | A kill switch exists, needs a deliberate action (typed word), and is tested. | manual test | owner |
| 7.4 | Loops and agents are read-and-report against live systems. Acting requires a human. | `CLAUDE.md` section 5, loop skills inspected | Claude |
| 7.5 | A manual penetration test of the exposed surface (GUI, API, credentials handling) is done before real money or other people's data is involved. | report and date in `plans/SECURITY.md` | owner |

---

## When is a manual pen test warranted?

Automated scanning (sections 1 and 6) and `/security-review` cover a
self-hosted service used by the owner alone. A manual test by a person is
warranted when the project crosses any of these lines:

- open to people the owner does not know,
- handles money or can place orders,
- stores or processes other people's personal data.

Record the decision either way in `plans/SECURITY.md`.
