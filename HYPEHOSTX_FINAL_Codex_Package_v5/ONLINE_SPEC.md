# HYPENET — Online Services Specification v5.0

Developer: MR.4NONY | Publisher: NEXORAID | Product: HYPEHOSTX / HYPEHEN

## 1. Scope and meaning of online

The original offline-first host remains independent of the network backend. Online mode provides an independent HYPE Network, not PlayStation Network. HYPEHEN Launcher is the original user interface; HYPEHEN Native is an original user-space application on an already authorized homebrew environment. Neither depends on ownership of GoldHEN source. GoldHEN and upstream components retain their real authors, versions, and permissions. Do not market this as unlocking official PSN, official GTA Online, Fortnite or EA FC services, or as ban protection. Official service interoperability is not an implementation target without authorized vendor interfaces. LAN/custom multiplayer applies only to games or applications that expressly support the relevant interface; there is no universal retail-game integration. Implement an original network demo to prove the protocol independently. No PSN credential collection, impersonation, evasion, or unauthorized game/service modification.

Separate release gates for web, native, and network. The existing no-login/telemetry rule remains mandatory for the core host; optional HYPEID registration applies only to independent online services. No mandatory cloud calls, advertising, paid access, or analytics. Online services will require a separate backend host; GitHub Pages serves static files only. Development should run locally at zero infrastructure cost, with remote deployment disabled pending explicit approval and credentials. Do not describe a local test as public deployment or a PC client as tested on PS4.

## 2. Module ownership and acceptance

| Module | Responsibility | Minimum demonstrable result |
|---|---|---|
| HYPENET | Client transport, capability and connection state | Local API reachability with truthful timeout/offline/unknown states |
| HYPECONNECT | Authorized app/LAN integration interface | Two own demo clients exchange messages through an approved transport |
| HYPECLOUD | Own app save storage | Authenticated upload/download of bounded app-owned data, revision check and deletion |
| HYPEID | Independent identity | Register, verify, sign in/out, revoke sessions and delete account; never ask for PSN details |
| HYPEFRIENDS | Social relationships | Request/accept/decline/remove/block with access checks |
| HYPECHAT | Messaging | Authorized text-only conversations, block/report and rate-limit enforcement |
| HYPELOBBY | Room discovery and membership | Create/join/leave/close with membership and capacity checks |
| HYPESTORE | Homebrew catalog | Approved metadata, version, source, license, checksum and availability; no retail game downloads |
| HYPESYNC | App data consistency | Explicit revision conflicts, no silent overwrite, offline queues only when enabled |
| HYPESERVER | Independent backend | Versioned API, migrations, tests and local Compose environment |
| HYPESTATUS | Operational health | Separate live/ready endpoints and public non-sensitive service status |
| HYPENETGUARD | Security/privacy enforcement | Server-side authentication, authorization, quotas, abuse controls, redaction and audit trails |

## 3. Architecture and stack

Retain original lightweight static web build and native portability requirements. Add backend/ (Node.js LTS + TypeScript; choose a maintained HTTP framework and document ADR), PostgreSQL (authoritative records), Redis (optional realtime fanout, rate limiting and ephemeral presence; never permanent saves), WebSocket (opt-in realtime), Docker Compose local development, and a reverse proxy with HTTPS for production. Use a maintained password hashing implementation (Argon2id or equivalent vetted option), not custom crypto. Pin dependencies, document supported versions, and scan dependencies. Object storage may be introduced later behind a bounded interface; use a private local filesystem adapter for development and never expose upload directories publicly.

Static host uses only relative asset paths and an optional public API base URL. Network APIs are not required for dashboard, firmware selection, offline shell or help. Modern web and portable demo clients are first-class test targets; legacy PS4 browser and C/C++ client need capability detection and actual console validation. Do not weaken TLS, certificates or browser security to support old clients. When unsupported, keep online features inaccessible with a specific explanation and preserve the offline host.

Suggested layout (adapt existing workspace, avoid needless rewrites):

```text
HYPEHOSTX/
  AGENTS.md
  docs/                    # all approved spec documents and ADRs
  src/                     # original host (preserve prior layout)
  native/                  # independent user-space app
  backend/
    src/{config,auth,users,friends,chat,lobbies,saves,catalog,status,security}/
    migrations/
    tests/
    package.json
    package-lock.json
  packages/contracts/      # versioned JSON schemas/OpenAPI/protocol
  clients/network-demo/    # original two-client demo, not retail games
  infra/{compose,proxy}/
  scripts/
  tests/
  evidence/
  .github/workflows/
  .env.example             # example variables only
```

## 4. Functional behavior and navigation

Add Online Center, Sign in, Profile & Privacy, Friends, Chat, Lobbies, Cloud Saves, Homebrew Store, and Service Status to the optional network section. In offline mode, hide online-only navigation or explain why it is unavailable; never render an enabled control with no working handler. Online service status must not imply HEN active or PSN connected. Display separate host version, network API version, and native version. Online session expiry returns to sign-in without erasing local non-sensitive preferences. Sign-out cancels subscriptions and clears tokens; account removal revokes sessions and deletes or anonymizes data under documented retention rules. Presence is opt-in or controlled by visibility preference. A block prevents messaging, invites, and presence disclosure. Catalog installation is never implied by a metadata link; link to approved publisher sources only. No server-provided executable JavaScript or arbitrary file paths.

Connection state: DISABLED, UNKNOWN, PROBING, AVAILABLE, DEGRADED, OFFLINE, UNSUPPORTED. Auth state: SIGNED_OUT, VERIFY_PENDING, SIGNED_IN, EXPIRED, REVOKED. Socket state: CLOSED, CONNECTING, READY, RETRY_WAIT. Use bounded exponential backoff with jitter, pause when offline, and show errors. Network hint is not proof of API reachability. Mutations must require user intent, not auto retry unless idempotent. Never report sync or message delivery before acknowledgement. Use server timestamps for persisted events; avoid treating user-supplied timestamps as authoritative.

## 5. Versioned API contracts

Base `/api/v1` with JSON, documented request/response schemas and limits. IDs are opaque; server derives actor from authenticated context. Codes: 400 invalid, 401 unauthenticated, 403 forbidden, 404 absent/not visible, 409 conflict, 413 oversized, 429 rate limited, 503 unavailable. Structured errors: `code`, `message`, `requestId`; no traces or sensitive details. Cursor pagination for lists; enforce max page size. Authentication transport must be an ADR with tests (e.g., secure HttpOnly cookie for modern same-site web, properly protected native token route; no long-lived secrets in localStorage). Explicit CORS allowlist and CSRF protection where cookies apply. Native sign-in availability depends on secure storage and TLS support. Verification/reset email requires approved provider; local test mail sink only, never expose codes to production clients. Rate limit auth and reset, avoid user enumeration. All write routes validate authorization server-side.

| Method and route | Purpose |
|---|---|
| GET /status | Non-sensitive availability / API version |
| POST /auth/register, /auth/verify | Independent account registration |
| POST /auth/login, /auth/logout | Session lifecycle |
| POST /auth/reset/request, /auth/reset/confirm | Credential recovery |
| GET/PATCH/DELETE /me | Profile, privacy, account deletion |
| GET /me/sessions; DELETE /me/sessions/:id | Session inventory and revocation |
| GET /friends; POST /friend-requests | List friends, request connection |
| POST /friend-requests/:id/respond | Accept/decline by recipient only |
| DELETE /friends/:id; PUT/DELETE /blocks/:id | Remove relation/block |
| GET/POST /conversations | Authorized thread access/create |
| GET/POST /conversations/:id/messages | History/send with membership check |
| POST /reports | Abuse report with moderation queue |
| GET/POST /lobbies | Visible rooms and creation |
| POST /lobbies/:id/join, /leave; DELETE /lobbies/:id | Membership/owner close |
| GET /saves; GET/PUT/DELETE /saves/:appId/:slot | App-owned save data with revision control |
| GET /catalog; GET /catalog/:id | Approved read-only metadata |

Private moderation endpoints require separate authorization and audit. Use a narrow role model (user, moderator, operational administrator); never grant privileged roles at sign-up or via client-supplied fields. Public status endpoint is distinct from internal live/ready probes. Define OpenAPI and JSON schemas, generate contract tests, verify route existence, and remove or disable unavailable features in the release. Route names are proposed implementation contracts; any change must be documented.

Realtime events: `presence.changed`, `message.created`, `lobby.updated`, `session.revoked`, `sync.conflict`. Envelope: eventId, type, version, timestamp, scoped payload. Authenticate handshake, authorize subscription and each action, validate payload sizes, heartbeat and disconnect slow clients. No subscription to arbitrary conversation IDs. Reconnect fetches authorized durable history; deduplicate by event ID; presence expires and is never considered durable. Outages fall back to documented HTTP flows when appropriate.

## 6. Database and storage

Tables: users, verification_tokens, password_reset_tokens, sessions, profiles, friend_requests, friendships, blocks, conversations, conversation_members, messages, lobbies, lobby_members, saves, catalog_items, reports, moderation_actions, audit_events. Add foreign keys, unique constraints and indexes on access/filter fields; canonicalize unordered friend pair; transactional lobby joins and capacity check; direct chat creation idempotency; validate state transitions. Secrets/tokens stored as hashes where applicable. A save key belongs to authenticated user + approved app ID + slot; constrain size and slot count, stream safely, validate content type and revision. Proposed defaults: 1 MiB/save, 10 MiB/user, 2 KiB/message, 8 members/demo lobby, max 50 records/page. Tune and document actual limits. No console-wide game saves, PSN data or filesystem browsing. Identify retention and deletion semantics for messages/reports and backup copies before public release. Audit only necessary metadata, redact passwords, tokens, message bodies and save contents from logs. Data export and deletion are account-owner operations.

## 7. Security, privacy, moderation and operations

Threat model: account takeover, IDOR, CSRF, XSS, SQL injection, SSRF, abuse/spam, resource exhaustion, unauthorized subscriptions, path traversal, compromised catalog, stale saves and secret leakage. Use parameterized queries, schema validation, output escaping, secure cookies where applicable, allowlisted origins, size quotas and rate limits. Never fetch arbitrary catalog URLs at user request; only approved sources. Metadata moderation is owner-controlled; written permission/appropriate licenses and hashes required for any distributed file. Do not ship upstream binary or code absent authorization. Use real dependency scanning and review, not claims of perfect security. HTTPS, least privilege database accounts, backups with restore drill, secret manager for prod, migrations with rollback strategy, health probes, clear degraded-mode UI. Configure logs without private contents. Report/block functionality and a documented handling process are mandatory before public social features. No remote telemetry in the original host; necessary backend security/access logs are disclosed and minimized.

## 8. Test and rollout

Local Compose must start database/backend with fixtures not included in prod. Provide non-secret example env, migration command, seed for demo only and documented API health check. Run unit, integration, OpenAPI contract, browser E2E, authorization-denial, concurrency, realtime and failure tests. Portable native network adapter has unit tests and a documented test harness; any native network claim requires actual owned/authorized hardware and TLS evidence. Public network readiness is independent of core web readiness. Deliver exact commands, results, hashes and blockers. Do not deploy VPS, create paid accounts, send external emails, publish data, push git changes or expose services outside localhost without owner authorization. Link static web to API only after both are approved; keep URL unset when service is not deployed. No sham URL or production fixtures. Roll back API/image/migration safely, retaining user data. Provide a status ledger and redacted deployment checklist.

## v5.0 end-to-end requirements
HYPENET supports the independent native app and original web client without a GoldHEN source or binary build dependency. It is an independent service, not official PSN. Application-level extension and signed update manifests follow INDEPENDENT_SPEC and END_TO_END. Only allow app-owned cloud data; store metadata for approved homebrew; original demo performs multiplayer verification with real independent clients. No retail-game or PSN spoofing; do not claim anti-ban. Network backend can be built and tested locally without PS4 equipment. Console-specific TLS/mobile support and actual public service remain external gates.
