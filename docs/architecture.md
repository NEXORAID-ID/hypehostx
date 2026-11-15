# Architecture and decisions — 2026-11-15

## ADR-001: Separate scopes
Web 0.1.0-dev, native app 0.1.0-dev, HYPENET API v1/0.1.0-dev, HYPEKIT SDK 1, and catalog schema 1 are independent. The enabler objective is research only. The user requested all firmware; this is a coverage aspiration, never an eligibility rule. Manual version selection and browser hints are not evidence.

## ADR-002: Static core
Original ES5 code, DOM text rendering and CSS fallbacks; no framework or external runtime assets. Hash routing and relative assets work under the canonical lowercase `/hypehostx/`. Build tooling runs on Node 24.15.0. Acorn checks ES5 syntax; this is not a physical PS4 WebKit certification. Fifteen routes operate independently of the network service.

The service worker downloads and checks build hashes before writing a versioned cache. The UI checks file presence separately and reports it as presence. Current worker cache remains in place during a failed update. Automatic takeover and old-cache deletion are intentionally absent. Legacy Application Cache has no implemented adapter or hardware evidence; those browsers receive the unsupported state. This requirement remains incomplete.

## ADR-003: Native app
C++17 portable domain and CLI; MSVC 19.50.35730.0, Windows SDK 10.0.26100.0. CMake 4.2.3-msvc3 from Visual Studio was selected by discovery. AddressSanitizer runs require the compiler runtime DLL directory on PATH; `tools/native.cjs` sets it for this installation. nlohmann/json 3.12.0 is pinned to a reviewed commit with its MIT notice. No console SDK, exploit, or proprietary package is included.

Files use flat app-owned names, bounded content, staging and atomic replacement. Existing content requires explicit overwrite. Save CRC32 detects accidental corruption, **not authenticity**. Storage is assumed private to the local OS account; hostile concurrent filesystem mutation and full Windows reparse-point races are not yet comprehensively handled. This blocks a security-ready native file-transfer integration.

## ADR-004: Network
Fastify + TypeScript, parameterized PostgreSQL queries, restrictive bodies, scrypt password hashes, random bearer sessions hashed at rest, one-hour sessions and single-use expiry tokens. Browser tokens are memory-only. No cookies are accepted as authentication, so ambient-cookie CSRF is not an authentication path. Origins are explicit. Local HTTP is loopback-only; production requires approved TLS termination and operational settings.

PGlite is a real PostgreSQL WASM engine used for local execution, tests, and archive restore. Docker PostgreSQL remains a separate unexecuted integration gate. Pool-based PostgreSQL adapter and SQL migrations are present. Redis is not needed for the current single-process demo; multi-process event/rate-limit coordination is not implemented. Socket events are bounded and membership/session/block checks are repeated before delivery. Durable event replay, all specified event types, cursor pagination, and production abuse operations remain unfinished.

## ADR-005: SDK integrity and transfer
Ed25519 verification uses Node's maintained crypto implementation over exact payload bytes, externally supplied trusted public keys, expiry and monotonic sequence. No private signing key is checked in. The verifier is an SDK tool; it is not yet wired into native C++ update UI. Scoped transfer uses a short-lived token, loopback binding, no browser origins, strict app file extensions, exclusive creation, size limits and explicit stop. It is a host SDK facility, not console-wide FTP or a native console capability.

## ADR-006: Canonical identity correction
v5.2 supersedes v5.0's `jxxzy/HYPEHOSTX` and `/HYPEHOSTX/`. The existing origin is `https://github.com/NEXORAID-ID/hypehostx.git`. No remote changes or pushes were made.
