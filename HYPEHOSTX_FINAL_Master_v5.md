# HYPEHOSTX — FINAL UNIFIED MASTER v5.0

MR.4NONY · NEXORAID · 15 November 2026

All documents combined for reading; use ZIP for Codex workspace.

## Contents
- README.md
- CODEX_START.md
- AGENTS.md
- MASTER_SPEC.md
- INDEPENDENT_SPEC.md
- NATIVE_SPEC.md
- ONLINE_SPEC.md
- END_TO_END.md
- RIGHTS_LEDGER.md
- UPSTREAM_CATALOG.md
- BACKLOG.md
- QA_MATRIX.md
- RELEASE_GATE.md
- EVIDENCE_TEMPLATES.md
- source-inventory.json

<!-- README.md -->
# HYPEHOSTX — FINAL MASTER CODEX PACKAGE v5.0
**MR.4NONY / NEXORAID · 15 November 2026 · product target 1.0.0**

This is the single authoritative developer package, superseding v2, v3, v3.1 and v4. It preserves their web, native, and network requirements and adds the independent-engine roadmap, permission ledger and end-to-end integration requirements. It is a specification, not application source, HEN binary, or tested release.

## Start here
1. Extract all files into your authorized project workspace; keep `AGENTS.md` at the repository root. Open that workspace in Codex (target repo `jxxzy/HYPEHOSTX`; not yet created by this package).
2. Give Codex the full contents of `CODEX_START.md` (or ask it to read and execute that file). It must read all specs, then implement—not just plan—and keep a persistent ticket/QA ledger.
3. Run the original web, native portable app and local network tracks independently. No private GoldHEN code is required for those tracks. Native console execution, integration rights, external deployment and any future privileged enabler remain separate gates.
4. Review build/test evidence and approve release scope before any publication. GitHub Pages serves the static frontend; backend is separately hosted. Do not put secrets or private permission evidence into public git.

## Reading order
`MASTER_SPEC.md` → `INDEPENDENT_SPEC.md` → `NATIVE_SPEC.md` → `ONLINE_SPEC.md` → `END_TO_END.md` → `UPSTREAM_CATALOG.md` → `RIGHTS_LEDGER.md` → `BACKLOG.md` → `QA_MATRIX.md` → `RELEASE_GATE.md` → `EVIDENCE_TEMPLATES.md` → `source-inventory.json`. `AGENTS.md` and `CODEX_START.md` define operating instructions. v5 addenda take precedence over older text where they differ; no permission or test status is upgraded by a branding decision.

## Fixed identity
HYPEHOSTX (web platform), HYPEHEN (original launcher), HYPEHEN Native (independent user-space app), HYPEHEN Independent Edition (long-term independent HEN objective), HYPENET (independent online service), HYPEKIT (SDK/tooling), HYPELAB (internal R&D). Developer MR.4NONY, publisher NEXORAID, tagline Unlock Beyond Limits. English + Indonesian; static core free and offline-capable, accounts optional for network features only; no ads or host tracking.


---

<!-- CODEX_START.md -->
# HYPEHOSTX — FINAL AUTONOMOUS DEVELOPMENT DIRECTIVE v5.0

Act as principal software architect, senior web engineer, C/C++ engineer, backend/database engineer, security reviewer, UI/UX engineer, QA and release engineer. Implement all dependency-ready requirements in this workspace. Developer MR.4NONY. Publisher NEXORAID. Product HYPEHOSTX, HYPEHEN Launcher, HYPEHEN Native, HYPEHEN Independent Edition (long-term research objective), HYPENET, HYPEKIT, HYPELAB. Target repo jxxzy/HYPEHOSTX; URL https://jxxzy.github.io/HYPEHOSTX/; product target v1.0.0. Tagline Unlock Beyond Limits.

READ ALL PACKAGE FILES, especially AGENTS.md, MASTER_SPEC.md, INDEPENDENT_SPEC.md, NATIVE_SPEC.md, ONLINE_SPEC.md, END_TO_END.md, RIGHTS_LEDGER.md, UPSTREAM_CATALOG.md, BACKLOG.md, QA_MATRIX.md, RELEASE_GATE.md, EVIDENCE_TEMPLATES.md and source-inventory.json. The v5 addenda resolve previous scope ambiguities. Do not stop at planning, UI mockups, project skeleton, first build or a single milestone.

1. Inspect workspace and git status. Preserve unrelated work. Set up an implementation ledger keyed to all ticket/test IDs. Choose compatible tools from actual environment, record ADRs, pin versions and document commands. Original design and build must not require GoldHEN private source or binary.
2. Implement original HYPEHOSTX web platform: all approved core pages/modules, black/red premium UI, EN/ID, controller-friendly focus, firmware metadata and capability checks, catalog, HYPEHEN launcher, offline cache, local preferences, diagnostics, recovery, version management, validated real states. Legacy browser support and relative Pages paths are mandatory. No dummy production controls or simulated success.
3. Implement independent HYPEHEN Native user-space application: portable C/C++ domain, UI/input/storage/catalog/diagnostics/lifecycle, app-owned file manager and save manager, original app-level extension API, HYPEKIT sample and tooling, signed update metadata and scoped authenticated transfer where supported, optional online adapter. Build/test portable host now; only build and claim native target when actual reviewed toolchain and authorized runtime/hardware available. Do not claim the application itself enables homebrew.
4. Review public upstream references (GamerHack, GoldHEN, Mira, OpenOrbis) as specified. Owner reports obtaining permission and joining Discord; private source not received. Record precise grant before use, modification, redistribution or rebranding. Preserve true names, licenses and credits. Keep vendor artifacts out of original build; optional provider interoperability only within approved documented interfaces and evidence. Do not make original implementation wait for private code. Produce independent-enabler feasibility and gap research documentation, not a privileged bypass implementation. Do not use leaked source, exploit chains, kernel/firmware patches, signature or DRM bypass, protected memory access, piracy, official PSN evasion, online cheats or anti-ban. Do not outsource excluded work.
5. Implement optional HYPENET online stack with independent identity, profiles, friends, report/block, chat, lobbies, own-app saves/sync, approved homebrew metadata store, status, secure backend and original multiplayer demo. Node.js/TypeScript, PostgreSQL, Redis as needed, REST, WebSocket, local Docker Compose, reviewed auth and authorization, schema limits, TLS and privacy. No mandatory network or account for offline shell. No claim of official PSN/retail multiplayer. Run original two-client demo. Do not weaken TLS for legacy devices.
6. Implement contracts, migration and local test data (excluded in production), build tools, CI, code validation, static web/native/backend artifact separation, release metadata, SDK and sample docs, SBOM, license notices, checksums, dependency review, secret scan, setup and rollback. GitHub Pages static only, backend separate. No push, publication, external communication or paid hosting without explicit approval.
7. Run real lint/schema/unit/integration/browser/legacy/portable native/API/database/negative/security/offline tests as environment permits. Cross-reference QA IDs and commands, actual exit results, revisions and artifact hashes. Fix defects and rerun. Physical PS4 and native HEN claims require exact firmware/model/hardware evidence; do not substitute desktop or mocks. Pending third-party rights/hardware/hosting are blockers, not successful tests.
8. Work across tracks in dependency order; if task is blocked, record exact dependency and continue others. Persist ledger and next task after each run. At completion deliver source, actual builds/artifacts, tests, migration/API docs, configuration, CI, notices, reports, known issues and scoped release recommendations. Do not declare 100% unless every required gate for stated scope is genuinely satisfied.

No ads, no host tracking, no embedded secrets, no fabricated hardware or firmware data, no fake success messages. Maintain original brand and honest attribution. Require owner approval only for material choices including original license, external release/spending, credentials/private rights and hardware authorization. Do not invent approvals.

Start by reading specifications and creating status ledger, then IMPLEMENT the first dependency-ready task and continue.

HYPEHOSTX — Unlock Beyond Limits. Developed by MR.4NONY. Powered by NEXORAID.


---

<!-- AGENTS.md -->
# HYPEHOSTX — instructions for Codex / developers

Read MASTER_SPEC, UPSTREAM_CATALOG, NATIVE_SPEC, ONLINE_SPEC, CODEX_START, BACKLOG, QA_MATRIX, RELEASE_GATE and EVIDENCE_TEMPLATES before editing. Treat the product name HYPEHOSTX and launcher label HYPEHEN as fixed. MR.4NONY / NEXORAID; target repo jxxzy/HYPEHOSTX and GitHub Pages subpath. This folder is a specification package, not a completed repository.

## Working method
1. Inspect current repository and git status, preserve existing unrelated work. If no repository exists, propose scaffold and implement original files in authorized workspace only. Do not push, publish, fork upstream, or overwrite existing work without owner request.
2. Create implementation status ledger for each ticket: TODO, IN_PROGRESS, BLOCKED, DONE. Record concrete blockers and evidence. No dummy functionality, fabricated firmware support, fake success, or hidden placeholder buttons in production.
3. Start M0 then M1; implement original UI/core, schema and pure validation tests first. Keep vendor directory empty until rights review. Do not copy or rename proprietary binaries or build kernel/browser exploit chains. HYPEHEN is UI branding; preserve genuine third-party names and notices.
4. Build to static dist; legacy shell compatibility is a mandatory constraint, not a future task. Use capability detection and ES5-compatible critical code. Do not require cloud APIs, login, server database, CDN or telemetry in the core host. Optional network services follow ONLINE_SPEC and must not block core. All asset paths must work under /HYPEHOSTX/.
5. Implement each ready ticket with tests, error handling, accessible states and EN/ID strings. Use mock provider outcomes only in lab/test fixtures; exclude all simulation from stable dist. Unknown provider results are unconfirmed; manual firmware is not verification.
6. Run actual validation/build/test scripts; capture output and report failures. Modern automation does not prove PS4 compatibility. Document actual hardware results separately. Never claim a completed release on mock evidence.
7. Before release, audit license/permission and provenance, check verified status evidence, run dist allowlist, inspect deployment path and offline behavior. Gates in RELEASE_GATE are mandatory. If permission or hardware is unavailable, ship only owner-approved original information-host scope and state limitations clearly; do not call it a working HEN.
8. End each work session with a concise report: completed IDs, files changed, checks run/results, blockers, risks, next prioritized work. Do not invent commits, deployment or tests.

## Engineering rules
- Keep state centralized, modules separate, schemas versioned, runtime small, pure functions testable.
- Avoid unsafe DOM injection and executable remote inputs; use text rendering. No embedded credentials. Use allowlisted URLs.
- Use exact firmware strings, explicit evidence statuses, safe storage fallbacks, namespaced preferences.
- Keep cache state and component state separate; unknown means unknown. Do not promise remote revocation for offline clients.
- Use semantic commits; no force push. Do not silently remove existing files or features.
- No piracy distribution, online cheating, PSN evasion or automatic firmware changes.

## Initial assignment
Begin M0 and M1 after reading the spec; generate an actual status ledger and build/test report. Continue tickets in dependency order, skipping blocked rights/hardware items while completing independent original host work. Ask owner only for decisions that cannot safely be inferred (licensing, publication, vendor approval, real test evidence). Do not treat proposed decisions as already approved.


## Unified native research directive
Treat native/ as an independent app-only track with its own version, build, rights ledger and release gate. Read NATIVE_SPEC before creating files. Work on N0 then portable N1 independently of web milestones; proceed to SDK and hardware tasks only when the prerequisites are actually available. No private GoldHEN source, renamed vendor binary, kernel/browser exploit chain or signature bypass. A native homebrew app is not a native enabler. Do not declare native functionality before actual evidence. Preserve upstream names. Never publish or push without owner approval.


## v5.0 complete execution directive
Read CODEX_START.md and ONLINE_SPEC.md. Continue through all dependency-ready tasks across tracks; the old initial assignment is an ordering instruction, not a stopping point. Work locally on optional backend in parallel where independent. The original core must never require online accounts. Keep native and online release gates separate. No external/public deployment or paid infrastructure without owner approval.

## v5.0 authoritative independent-first directive
Read INDEPENDENT_SPEC.md, RIGHTS_LEDGER.md and END_TO_END.md in addition to all previous files. Use the v5 CODEX_START.md as primary instruction. Original implementation must not depend on private GoldHEN source or binary; do not wait for it. Permission has been reported by owner but its precise scope is not independently evidenced and source has not been received. Work on authorized app-level functionality and independent service locally; treat the independent homebrew enabler as a distinct research objective, not a claim or implementation mandate for protected system bypass. Maintain separate status for native app, optional approved integration, network and independent-enabler research. Complete all dependency-ready I-series tickets; no passing mock evidence in production. Keep secrets and private rights evidence out of public repo. Do not delegate excluded privileged operations to other agents. Owner approval needed only for material external decisions; continue independent work.


---

<!-- MASTER_SPEC.md -->
# HYPEHOSTX — Master Product & Engineering Specification

**Specification revision:** 5.0 | **Target product release:** 1.0.0 stable | **Date:** 15 November 2026

**Developer identity:** MR.4NONY · **Publisher:** NEXORAID · **Product:** HYPEHOSTX · **Launcher UI:** HYPEHEN · **Tagline:** Unlock Beyond Limits.

**Proposed repository:** `jxxzy/HYPEHOSTX` · **Proposed production URL:** `https://jxxzy.github.io/HYPEHOSTX/`.

**Status:** Design specification, not an implemented or tested product. This unified specification defines original host software, an authorization-gated third-party integration boundary, and an independent native homebrew application research track. It does not establish an independently developed native HEN, redistribution permission, successful console execution or firmware support. No repository has been created by this deliverable.

## 1. Product charter

HYPEHOSTX is a lightweight, self-branded PS4 homebrew information and host interface for owners of their own hardware. The product must prioritize console-browser navigation, clear version information, local privacy, reproducible static builds, offline availability of approved assets and trustworthy diagnostics. The main user journey is understanding device compatibility, preparing the host, accessing HYPEHEN, and troubleshooting without false success messages.

### 1.1 Product tiers and scope

| Tier | Scope | Release rule |
|---|---|---|
| Core | Original dashboard, firmware identification, compatibility catalog, help, settings, offline shell, diagnostics | All mandatory acceptance tests pass |
| Integration | Authorized third-party homebrew component handoff, version attribution and outcome reporting | Written permission or applicable license, verified provenance, independent hardware evidence |
| Native R&D | Independent HYPEHEN native homebrew app and documented integration on an already authorized homebrew environment | Separate scope, build and evidence; never presented as an enabler until independently demonstrated and reviewed |
| Future | Additional platforms, local-host packaging, optional community documentation | Separate approved specification; no unfinished buttons on stable |

Out of scope: game distribution or copyrighted game assets, PSN evasion, online cheating, account unlocking, automatic firmware modification or downgrades, collecting credentials, remote arbitrary file execution, reverse engineering proprietary components for rebranding, and developing exploit chains. No paid access, advertising, telemetry, or account registration in 1.0.0. Neither platform vendor endorsement nor upstream developer endorsement may be implied.

### 1.2 Personas and top-level user stories

- U01 Console owner: see a readable page using controller navigation from a TV viewing distance.
- U02 New user: discover what is supported, what is not, and the difference between host readiness and component compatibility.
- U03 Offline user: reliably open the installed original shell offline; distinguish it from optional component availability.
- U04 Advanced user: inspect exact version, provenance, device identification confidence, local logs and documented limitations.
- U05 Maintainer: update the catalog independently, review the source ledger, publish a reproducible build, revoke an unsafe entry and roll back.
- U06 Desktop/mobile visitor: browse documentation and catalog information without being treated as a verified PS4.

### 1.3 Success measures

Initial shell uncompressed assets <= 500 KiB; initial JS <= 100 KiB after minification, CSS <= 60 KiB; zero mandatory external runtime dependencies, dead controls, uncaught errors in tested flows, fabricated data or fake-success paths; all P0 test cases pass; 100% of published compatibility claims linked to evidence; zero unresolved release-blocking rights or security issues. Loading-time target is <= 2 seconds on the documented test device/network; record median and p95, not only a best run. Budgets are proposals and can be revised only with documented evidence.

## 2. Reference audit and intellectual property

Initial public-source review on 2026-11-15: GamerHack root exposes a README, firmware-specific directories and a multi-firmware host. Its README lists 5.05, 6.72, 7.xx–13.xx and 14.00; the multi-firmware page also references 14.02. The publicly visible root did not show a LICENSE file at review; individual files and components have not been comprehensively audited. The GoldHEN public documentation states its project source is currently private. A public GitHub repository can be viewed/forked on GitHub under its terms, but that is not a blanket license to copy, rebrand or redistribute code.

### 2.1 Mandatory inventory before vendor integration

| Ledger field | Required content |
|---|---|
| component_id | Immutable unique ID |
| upstream_name / author | Actual identity; no substitution |
| upstream_url / revision | Official source, immutable revision or release |
| file inventory | Exact files, sizes and SHA-256 where relevant |
| license / permission | SPDX or documented permission; UNKNOWN blocks redistribution |
| allowed actions | Link only, use, modify, redistribute, as applicable |
| attribution | Required notices and placement |
| integrity evidence | Trusted digest/release source; unverified digest is not authenticity |
| audit status / reviewer | Date, decision, evidence path |
| hardware compatibility | Exact version, model if known, result, test report |
| distribution status | denied, link-only, authorized, withdrawn |

Do not copy the reference tree into a distributable product without audit. Use independently authored UI, CSS, assets, configuration, documentation and tests. Preserve vendor notices and names. HYPEHEN is the name of the HYPEHOSTX launcher interface; it does not rename the actual GoldHEN binary, metadata, technical attribution, release version or system-menu identity. Use a small technical info line, e.g. “Third-party component: GoldHEN — by its upstream authors”, only when an authorized integration really exists. If unavailable, state exactly why without claiming full HEN support. No owner license may be applied to vendor files. Proposed license for original project code: MIT, subject to owner approval and rights review; original logo/brand asset permissions separately documented.

## 3. Branding and UI system

Product lockup HYPEHOSTX (X as crimson accent); launcher HYPEHEN; ecosystem signature “Developed by MR.4NONY · Powered by NEXORAID”. Distinct H/X monogram; do not reuse PS logo or upstream graphics. No implied official Sony affiliation. Public UI default English, Bahasa Indonesia optional. Stable labels show actual release; no roadmap, preview badges or gimmicks on production screens. Experimental features remain in HYPELAB and never in production bundle.

| Token | Value |
|---|---|
| background | #09090B |
| surface | #18181B |
| elevated | #222226 |
| brand | #E92840 |
| brand button | #B91C35 with white text |
| primary text | #F5F5F5 |
| secondary | #B7B7BF |
| border | #39393F |
| success | #22C55E plus text/icon |
| warning | #FBBF24 plus text/icon |
| focus | #F5F5F5 outline, 3 px |
| spacing | 4, 8, 12, 16, 24, 32, 48 px |
| radius | 6, 10, 14 px |
| fonts | local system sans-serif, no remote fonts |

Use flexible legacy-compatible layouts, 5% approximate TV safe-area inset validated on hardware, readable type (target base 18–20 CSS px on TV), primary headings 30–40 px, action targets at least 48×48 CSS px, contrast target WCAG AA, no reliance on color alone. Keyboard/controller behavior: deterministic focus order, visible focus, arrow navigation if supported, activate only actual focused action, no focus traps except accessible modal with exit, restore focus when modal closes, do not intercept browser Back. Test physical controller; browser focus support is not guaranteed. Reduced-motion default; no animation required to understand state. Do not require CSS Grid, custom properties, optional chaining, Promises, fetch or ES modules for critical legacy shell paths without fallback.

### 3.1 Navigation map (15 public routes proposed)

Use hash navigation for static hosting; no server rewrite required. Dedicated deep links must open within `/HYPEHOSTX/`. On unknown route, show recoverable not-found page or dashboard link. Route names below are proposed; relevant content may share a layout.

| Route | Page | Required interaction |
|---|---|---|
| #/ | Dashboard | Readiness, quick links, firmware identification, offline state |
| #/hypehen | HYPEHEN | Compatibility report, consent, authorized provider information, truthful session state |
| #/firmware | Firmware Library | Search exact versions; select or clear manual selection |
| #/compatibility | Compatibility | Evidence, source/verification filters, explanation of unsupported status |
| #/payloads | HYPEPAYLOAD | Approved homebrew catalog, filters, details, favorites; no arbitrary executable uploads |
| #/offline | HYPECACHE | Prepare approved shell, show progress/status, verify, update, recovery guidance |
| #/system | HYPESYSTEM | Accessible device properties, copy report, distinguish user-supplied values |
| #/diagnostics | HYPEDIAG | Local session events, capability tests, export/clear logs |
| #/recovery | HYPERECOVERY | Reset local preferences; instructions for browser cache clearing and crash response |
| #/settings | Settings | Language, accessibility, diagnostics opt-in; reset with confirmation |
| #/updates | HYPEUPDATE | Compare host version if online; release metadata, stale/offline state |
| #/guide | User Guide | First run, offline limitations, safety and supported-device help |
| #/changelog | Changelog | Released versions and known issues, no fabricated entries |
| #/credits | Credits & Licenses | Original team, true third-party names, notices, source links |
| #/about | About | Product identity, version, disclaimer, privacy, support link |

### 3.2 Critical layouts and screen states

Dashboard: brand/version top, sidebar or compact navigation, device + firmware + evidence + offline cards; primary HYPEHEN tile; contextual message; two secondary tiles Offline and Compatibility. Launcher: actual selected version, detection source/confidence, component identity/version, eligibility reason, consent panel, session state; activation control absent or explicitly disabled when unavailable. Offline: separate shell availability, optional asset availability, current/staged version, progress bytes only if measurable, actionable failure and recovery. Catalog: search/filter plus card list, empty state, details and source URL; details show copyright, risks, status. Settings: independent preference toggles with save feedback, reset scope and cancel. Generic state handling: initializing, loading, empty, populated, restricted, error, offline, stale, unsupported. No dead button for absent feature.

### 3.3 Exact user-facing terminology (EN / ID)

| Key | English | Bahasa Indonesia |
|---|---|---|
| launch.title | HYPEHEN | HYPEHEN |
| launch.action | Open HYPEHEN | Buka HYPEHEN |
| launch.unavailable | Integration unavailable | Integrasi belum tersedia |
| compat.unknown | Firmware not verified | Firmware belum terverifikasi |
| compat.manual | Manually selected; not device-verified | Dipilih manual; bukan hasil verifikasi perangkat |
| cache.shell.ready | Offline host ready | Host offline siap |
| cache.component.unknown | Component availability not verified | Ketersediaan komponen belum terverifikasi |
| session.unknown | Result could not be confirmed | Hasil tidak dapat dikonfirmasi |
| system.unavailable | Not available in this browser | Tidak tersedia di browser ini |
| recovery.reset | Reset host preferences | Reset pengaturan host |

Provide all other keys in both locales. Escape dynamic strings; no concatenation of HTML from untrusted sources. Locale key equality is a CI gate.

## 4. Module contracts (12 original modules)

| Module | Owns | Public contract (conceptual) | Failure behavior |
|---|---|---|---|
| HYPECORE | Initialization, state, event bus, routing | init(), getState(), transition(event), navigate(route) | Render fallback without reload loop |
| HYPEUI | Presentation and accessibility | render(view,state), focusRestore(), announce(message) | Show safe plain-text status |
| HYPEDETECT | Browser classification, firmware hints, exact catalog lookup | inspectBrowser(), parseFirmwareHint(ua), selectManual(version), lookup(version) | unknown/information mode, no capability assumptions |
| HYPEHEN | Launcher UI and consent, provider status | getAvailability(), requestConsent(), getSessionStatus() | unavailable or unconfirmed; no native implementation |
| HYPEPAYLOAD | Metadata and favorites | list(filters), describe(id), setFavorite(id,value) | safe empty state; no arbitrary remote loader |
| HYPECACHE | Original static shell offline capability | inspect(), prepare(), verify(), requestUpdate(), describeRecovery() | retain known usable cache where possible; truthful status |
| HYPEGUARD | Eligibility, rights, version and integrity policy | evaluate(context), verifyApprovedAsset(metadata) | fail closed; explicit reasons |
| HYPESYSTEM | Browser-visible properties | collect(), redact(report) | field-level unavailable/null |
| HYPEDIAG | Local events with bounded storage | record(event), export(), clear() | in-memory fallback; avoid sensitive data |
| HYPERECOVERY | Local preference reset and guidance | previewReset(), confirmReset(), getHelp(code) | no system resets, no destructive automatic action |
| HYPEUPDATE | Host release information | getInstalledVersion(), checkMetadata(), compare() | offline/stale/unknown; never flash firmware |
| HYPELAB | Development-only fixtures and simulation | runFixture(), assertState(), exportTestReport() | excluded from production artifact |

Contracts are interfaces for original host functions. Third-party execution internals are not part of this specification. A provider is represented by reviewed metadata and an authorized external handoff at the integration boundary; no runtime import of arbitrary URLs. Integration availability must remain false until the conditions in §2 and §10 are met. A provider result is unconfirmed unless the approved interface truly reports a result. Navigation, UI and data layers must never treat a spoofed browser UA or manual selection as authorization.

### 4.1 Architecture rules

Presentation -> core state/actions -> domain services -> bounded platform adapters (storage, connectivity, offline shell, static catalog). Catalog data is immutable per build. No direct UI mutation by vendor content; no direct cross-module storage writes; no circular dependencies. One source of truth for state. Keep build-only tooling out of runtime. Prefer callbacks for legacy runtime; modern tooling may be transpiled only if generated output passes syntax/API checks. No runtime eval(), new Function(), unknown HTML injection, or executable strings. Do not have a network service, database or secrets in the static build.

### 4.2 Runtime state model

| Domain | Enumeration |
|---|---|
| device | unknown, ps4_hint, other |
| firmware | unknown, detected_hint, manual_only, conflict |
| compatibility | unknown, reference_listed, under_review, verified, failed, withdrawn, unsupported |
| shell cache | unsupported, absent, preparing, verifying, ready, update_available, stale, failed, unknown |
| component availability | not_configured, pending_review, unavailable, eligible, withdrawn |
| session | idle, consent_required, checking, awaiting_external_result, confirmed, unconfirmed, failed, cancelled |
| connectivity | unknown, online_hint, offline_hint, fetch_ok, fetch_failed |

Rules: initialization does not trigger a privileged operation. Duplicate actions are collapsed or rejected. Confirmation is user initiated; cancel restores prior safe state. An interrupted or reloaded session is unconfirmed; no auto-retry. No elapsed timer may produce confirmed. Browser online status is a hint; distinguish network errors from actual offline. Verified compatibility requires exact record and actual test evidence. A firmware change/disagreement invalidates readiness and consent. Withdrawal overrides previous verification. Do not claim remote revocation reaches an offline client; display last catalog revision and offline staleness. Keep logs local by default with explicit export.

## 5. Firmware and compatibility policy

Reference candidates, not supported HYPEHOSTX versions. README includes 6.72; the inspected multi-firmware entry lists 5.05/5.07 and groups from 7.00 to 14.02 with gaps. Do not interpolate values between groups. Audit separate older host references independently. No exact release list has been certified by this design document.

| Reference group | HYPEHOSTX initial verification status |
|---|---|
| 5.05 / 5.07 | Reference listed; untested |
| 6.72 | Reference listed; untested |
| 7.00–8.52 | Reference listed; enumerate actual candidate versions; untested |
| 9.00–9.60 | Reference listed; enumerate actual candidate versions; untested |
| 10.00–11.02 | Reference listed; enumerate actual candidate versions; untested |
| 11.50–12.02 | Reference listed; enumerate actual candidate versions; untested |
| 12.50–13.00 | Reference listed; enumerate actual candidate versions; untested |
| 13.02–13.52 | Reference listed; enumerate actual candidate versions; untested |
| 14.00 / 14.02 | Reference listed in multi-firmware page; untested |
| Other / unknown | Not verified; information mode |

Firmware representation: exact normalized string, never floating-point. Do not silently treat `9.10` as `9.1`, or `11.02` as `11.2`. Strictly validate accepted grammar and parse only a bounded PlayStation 4 UA hint. User-entered strings are data, not URL/path components. Keep reported hint and manual selection separate; conflicts disable eligibility. Browser UA is not proof of device identity, model, permissions, hardware capabilities, or current HEN state. Model Fat/Slim/Pro may be user-supplied or recorded by test staff, not guessed from UA.

### 5.1 Compatibility record schema (example; no claim)

```json
{
  "schemaVersion": 1,
  "firmware": "9.00",
  "platform": "ps4",
  "referenceStatus": "reference_listed",
  "verificationStatus": "under_review",
  "shellTestStatus": "not_tested",
  "integrationTestStatus": "not_tested",
  "providerId": null,
  "providerVersion": null,
  "modelsTested": [],
  "evidenceIds": [],
  "reviewedAt": null,
  "notes": "Example metadata; no verified support claim."
}
```

Unique key: platform + exact firmware + host release/catalog revision (and provider version for integration evidence). `verified` requires nonempty evidence IDs, reviewer, test date and exact version. Shell verification alone does not establish third-party compatibility. Schema validation rejects duplicate IDs, unrecognized statuses, malformed files and inconsistent claims. Compatibility badges must render actual record statuses.

## 6. Data and storage design

No server-side accounts, API or database. Static JSON files are validated at build time and compiled into a legacy-readable immutable configuration where needed. Runtime must tolerate missing local storage, quota failure and malformed stored values. Namespaced keys include schema version; migration is versioned, guarded, and does not delete unrelated site data. Never call global localStorage.clear().

| Resource | Data / owner |
|---|---|
| app.json | identity, feature availability, default locale, budgets |
| release.json | build ID, version, revision, date, notes checksum |
| compatibility.json | exact version records |
| components.json | approved component descriptors, audit statuses |
| sources.json | provenance, notices, official links |
| integrity.json | original/authorized published asset paths, SHA-256 and byte lengths |
| locales/en.json, id.json | complete UI strings |
| hypehostx:v1:preferences | locale, layout, reduced motion, local diagnostics option |
| hypehostx:v1:favorites | validated catalog IDs only |
| hypehostx:v1:session | non-sensitive local state, bounded lifespan; no secrets |
| hypehostx:v1:events | bounded redacted events when enabled |

Component example (metadata only): id, displayName, actualUpstreamName, actualUpstreamVersion, author, category, sourceUrl, license, permissionEvidenceId, auditStatus, supportedFirmwareRecords, verifiedDigest (nullable), distributionStatus, riskNotes, knownIssues, lastReviewed. `distributionStatus=link-only` exposes documentation but not a bundled file; `unknown` or `withdrawn` never eligible. No user input controls a resource path or script URL. JSON schema must reject unsupported properties where appropriate.

Diagnostics opt-in proposed off by default. In-memory lifecycle events can still show current status; persistent events require opt-in. Cap at 200 events or 64 KiB, whichever is reached first; show truncation. Event record: timestamp (client clock and untrusted), module, event type, error code, sanitized message, hostVersion, catalogVersion, optional firmwareHint. Exclude account IDs, IPs, credentials, filesystem contents and persistent device identifiers. Export only after user action. Clear deletes HYPEHOSTX logs only. Fallback copy: selectable text when Clipboard API is unavailable.

## 7. Offline design and deployment topology

GitHub Pages is static hosting, not a runtime backend. Target path `/HYPEHOSTX/`; static root and all relative links must be validated with a nested base path. Production artifact is `dist/`; build includes only explicitly allowlisted assets. Provide no secret config in browser code. For modern offline shell, service worker is optional after capability/secure-context checks; for legacy PS4, research a legacy application-cache adapter for original shell assets only with actual device testing. Upstream uses legacy application cache, which is deprecated and no longer broadly available; do not assume it works for every device. Test actual HTTP status/MIME types on target deployment; GitHub Pages does not allow arbitrary per-file MIME configuration.

Cache plan: static shell release identity; inventory approved shell files; distinguish browser-reported availability from cryptographically verified content; stage a new revision where backend supports it; validate file set and version; activate only if successful; keep old usable revision if supported. On legacy cache, server/build-time hash checks and browser event reporting are separate evidence—do not claim per-file client verification when unavailable. Offline status is never based solely on a localStorage flag. A successful shell cache does not establish executable component caching. Avoid mixing versioned resources across releases. Use an explicit offline exercise (disconnect, reopen, navigate, capture evidence) before labeling a firmware offline-ready. If clearing a particular cache programmatically is unavailable, provide browser instructions and explain other browser data may be affected. Reinstall/reset must have confirmation. No firmware updates, no DNS modifications, no system storage changes.

## 8. Security, privacy and risk register

Threat model: tampered build artifact, wrong or stale catalog, malicious third-party URL, untrusted strings in metadata, corrupted local preferences, misleading compatibility, offline withdrawal, browser crash and data loss. Scope is an owner-authorized interface; no claim that browser checks constitute a console security boundary.

| Risk ID | Risk | Impact | Mitigation / gate |
|---|---|---|---|
| R01 | Unclear upstream redistribution rights | Critical | Block bundling/deployment; written evidence |
| R02 | Incorrect firmware classification | High | Exact strings, conflicts fail closed, separate states |
| R03 | Tampered component or build | Critical | Trusted provenance, digest check, reviewed release artifact |
| R04 | Legacy browser crashes or lacks APIs | High | Capability-based fallbacks, physical tests |
| R05 | Broken offline updates | High | Versioned assets, staged update where supported, recovery help |
| R06 | False HEN success | High | Explicit provider evidence or unconfirmed result |
| R07 | User data collision in same origin | Medium | Namespace keys; no global clear; narrow cache scope |
| R08 | Unauthorized claims in branding | High | Credits and actual component identity |
| R09 | Stale verified status offline | High | Show revision/date, no false freshness/revocation promise |
| R10 | Public release contains test fixtures | High | Production allowlist; fixture scan; artifact review |
| R11 | User loses console data | High | Clear risk message, recommend backup of personal saves, no automatic retry or destructive action |

Trust boundaries: UI, static release, browser storage and third-party provider are distinct. HTTPS for hosted site, reviewed external link allowlist, no user-provided URLs, no injection primitives, no secrets or privileged endpoints. Build-time SHA-256 inventory is not equivalent to publisher signature or runtime security; only call it verified at the appropriate layer. Maintain SECURITY.md with private reporting instructions, supported releases and coordinated remediation process. Check GitHub Acceptable Use Policies and applicable local law before publication; this is engineering guidance, not legal advice.

## 9. Error catalog and user recovery

| Code | Condition | Required user guidance |
|---|---|---|
| HX-1001 | Non-PS4/unknown client | Information mode; no console actions |
| HX-1002 | Firmware hint missing | Explain manual field and its limits |
| HX-1003 | Exact firmware not verified | Show record status, do not auto-select neighboring version |
| HX-1004 | Manual/hint conflict | Recheck console settings; clear manual selection |
| HX-2001 | Integration unavailable | Explain missing review/permission/testing |
| HX-2002 | Integrity check failure | Stop; use reviewed source/release |
| HX-2003 | Result interrupted/unconfirmed | Do not retry automatically; display recovery information |
| HX-2004 | Repeated action | Ignore duplicate and show current state |
| HX-3001 | Offline preparation failure | Explain retry with connectivity and recovery instructions |
| HX-3002 | Cache incomplete or version mismatch | Keep or recover known-good shell; no readiness claim |
| HX-3003 | Cache API unsupported | Online mode, explain limitation |
| HX-3004 | Cache status unavailable | Display unknown; offer verification procedure |
| HX-4001 | Required static asset missing | Safe fallback and report code |
| HX-4002 | Invalid catalog schema | Block related claims; fallback shell |
| HX-4003 | Local storage denied/quota | Session-only preferences/logs |
| HX-5001 | Unexpected host error | Safe fallback, export minimal diagnostics |
| HX-5002 | Route missing | Dashboard recovery link |
| HX-6001 | Release metadata unavailable | Show installed version, online status unknown |
| HX-7001 | Rights or review pending | Component information only |
| HX-7002 | Component withdrawn | Stop offering integration, explain last reviewed status |

Error mapping should include localized title, description, next action, recoverable flag, log severity. No exception stack in public UI; local sanitized report available. No silent failure or forced infinite reload.

## 10. Testing strategy and release gates

Unit: string parsing, exact matching, guards, reducers/state transitions, locale parity, schema validators, storage migration, redaction, routing, cache capability fallback. Integration: original shell end-to-end flows with test fixtures only; validate unavailable, stale, conflict, obvious false success, cancellation and invalid data. Browser automation: modern desktop/mobile plus legacy syntax checks; automation cannot certify PS4 WebKit or native activity. Physical tests use consoles lawfully controlled by testers; record model, exact firmware, host release hash, browser capability, network configuration category, scenario IDs, attempts/results, failure codes, operator and date. Never invent results. Keep separate shell and authorized integration reports.

Proposed minimum for each claimed firmware/model combination: 5 cold shell opens, 5 repeat opens, 3 offline reopen trials when supported, 3 navigation trials with controller; performance report with measurement method. Integration-specific criteria determined with authorized provider and safety review; report denominator, failures, reboots and actual confirmed outcomes, never percentage from assumptions or simulated events. A single successful trial is not enough to imply universal stability. If only one model tested, do not claim all three. Unverified versions may be listed as reference only. No public stable integration if license/provenance or test gate is unmet.

Severity: S0 rights/security/data-risk or false-critical-success => block release; S1 core workflow/compatibility fail => block; S2 noncritical issue => fix or documented owner exception with mitigation; S3 cosmetic => triage. Release review: owner approves license and branding, engineering signs build, QA signs test evidence, security reviews provenance. A single maintainer may fill roles, but decisions remain documented. No fabricated sign-offs.

## 11. Repository and build design

```text
HYPEHOSTX/
  AGENTS.md                   # developer handoff rules
  README.md
  LICENSE                     # original code only, after approval
  NOTICE.md
  THIRD_PARTY_NOTICES.md
  CREDITS.md
  SECURITY.md
  PRIVACY.md
  CONTRIBUTING.md
  CHANGELOG.md
  package.json
  package-lock.json
  .gitignore
  .github/
    workflows/{ci.yml,pages.yml,release.yml}
    ISSUE_TEMPLATE/
    PULL_REQUEST_TEMPLATE.md
  src/
    index.html
    404.html
    core/{bootstrap.js,state.js,router.js,events.js,storage.js}
    modules/{hypeui,hypehen,hypedetect,hypepayload,hypecache,hypeguard,hypesystem,hypediag,hyperecovery,hypeupdate}/
    pages/                    # 15 public page views
    adapters/{storage,network,offline}/
    assets/{brand,icons,styles}/
    data/{app,release,compatibility,components,sources}.json
    locales/{en,id}.json
  schemas/                    # versioned JSON schemas
  tools/                      # build, validate, asset inventory, local preview
  lab/                        # never in production
  tests/{unit,integration,browser,fixtures,hardware}/
  docs/{architecture,adr,dev,compatibility,qa,release,privacy,licenses}/
  reports/                    # real reports, redact before publication
  vendor/README.md             # empty until authorized; no bundled files by default
  dist/                       # generated artifact only, normally gitignored
```

Proposed npm scripts: `npm run dev` (local preview), `npm run lint`, `npm run validate` (data/path/locales/rights gates), `npm run test:unit`, `npm run test:integration`, `npm run test:browser`, `npm run test:legacy`, `npm run build`, `npm run verify:dist`, `npm run test:release`. Pin dependencies with lockfile and supported Node runtime; CI uses clean `npm ci`. Do not create command names without implementation; test reports record exact commands and real results. Static local preview must bind to localhost by default; optional LAN exposure is a separately documented owner action with appropriate network precautions.

Build algorithm: validate inputs -> assemble original assets -> compile ES5-compatible shell or verified equivalent -> bundle locales/catalog as needed -> generate release ID -> emit hash inventory -> validate paths and MIME assumptions -> test static artifact at nested path -> package allowlisted dist. Hash manifest excludes its own digest to avoid recursion; detached artifact digest recorded separately. Avoid timestamps in deterministic output unless derived from explicit release metadata; compare repeat builds. `main` protected where available; pull requests reviewed; no force pushes; CI read-only by default; deployment job minimal permissions. Pages uses GitHub Actions publishing dist after gate approval. Actions versions pinned/reviewed; secrets not used by static runtime. Provide documented manual deployment rollback to prior reviewed artifact; offline clients may need manual cache recovery. No live URLs asserted until deployment and smoke test actually succeed.

## 12. Milestones / ticket system

Priorities: P0 mandatory for relevant release; P1 desirable; P2 future; R = rights/hardware gated. Ticket fields: ID, owner, priority, dependency, description, acceptance criteria, evidence, status. Initial statuses are TODO, not completed. Detailed task breakdown is in BACKLOG.md; test requirements in QA_MATRIX.md. Proposed sequencing: M0 provenance + repo foundation -> M1 original UI/core -> M2 compatibility and catalog -> M3 offline/diagnostics/settings -> M4 hardening + actual hardware evidence -> M5 release. Integration eligibility may remain disabled indefinitely if permissions are missing. Core information-host release is a separate honest deliverable; it must not be marketed as a working jailbreak/HEN release.

## 13. Definition of done and handoff

Every completed ticket has: code or documentation diff; passing applicable tests with exact command; reviewed UI including fallback/error state; no unapproved vendor content; both languages where user-facing; compatible asset paths; evidence not a simulated result; documentation updated. Each release includes versioned source, dist archive, manifest and artifact digest, change log, verified compatibility table, third-party notices, privacy/security docs, actual automated report, physical test report (or explicit not tested), known limitations, rollback notes, build revision and owner decision. Mark any unmet gate as blocked and describe the precise dependency. Do not generate dashboards full of inert features or hide missing back-end functionality behind success animations.

## 14. Reference links and limitations

Reviewed public sources (15 Nov 2026; upstream can change):

- GamerHack root: https://github.com/GamerHack/GamerHack.github.io
- GamerHack multi-firmware entry (compatibility reference only): https://github.com/GamerHack/GamerHack.github.io/blob/main/g2all/index.html
- GoldHEN public documentation: https://github.com/GoldHEN/GoldHEN
- GitHub licensing documentation: https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/licensing-a-repository
- GitHub Pages documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- GitHub Acceptable Use Policies: https://docs.github.com/en/site-policy/acceptable-use-policies/github-acceptable-use-policies

Decisions proposed by specification author (not explicit owner approval): EN default, offline shell work prioritized over vendor integration, 15 public routes and 12 modules, MIT for original code subject to approval, static architecture, visual tokens, performance budgets, opt-in logs, release taxonomy and QA repetitions. Missing evidence: full file-level upstream/license audit, exact firmware enumeration, provider agreements, hardware access, console testing, deployment verification and final brand artwork. No implementation code, exploit payload, repository or live product is delivered by this planning package.


## 15. Unified product roadmap and architecture

This revision supersedes v2.0 while retaining its host requirements. If earlier language is narrower, the new native R&D track adds a separate user-space application, not a modification of GoldHEN or an implementation of a security bypass. The three layers share brand and documentation, not privileged code or a common version counter.

| Product / layer | Ownership | Technology | Release target |
|---|---|---|---|
| HYPEHOSTX Web | Original MR.4NONY code | HTML/CSS/ES5-compatible JS; Node.js build tooling | 1.0.0 after approved scope and QA |
| HYPEHEN Launcher | Original host UI module | Host state machine, catalog and consent | Same host release |
| Third-party provider | Actual upstream author | Approved published component; metadata or authorized interface | Separate upstream version and release rights |
| HYPEHEN Native | Original MR.4NONY research project | C/C++ user-space homebrew app, approved open toolchain | Independent 0.1.0 research milestone; no stable claim |
| HYPEKIT / HYPELAB | Original developer tooling and tests | Node.js, host tests, portable C/C++ test harness | Internal; not shipped with website |

Delivery order: build original web shell; review each dependency; enable only separately approved integrations; prototype native application with documented APIs in an existing authorized development environment; prove native features individually; approve any later privileged research scope separately. A standalone native homebrew application does not itself enable homebrew on a retail PS4. Do not label it as a full GoldHEN replacement. No exploit-chain development, privilege escalation, signature bypass, proprietary binary patching, or online-service evasion is included in these deliverables.

The public name on the launcher stays **HYPEHEN**. In technical details show the real provider name and version when applicable. The independent native application has its own About screen and original version. Do not change system menus or embedded strings in a proprietary provider to make it look original.

### 15.1 Cross-project release identity

- Host version (SemVer), catalog revision, immutable host commit, build digest, provider name/version/revision, native version and toolchain revision are independent.
- Example: host 1.0.0; catalog r1; provider null until approved; native 0.1.0-dev until validation. These are planned labels, not actual published releases.
- Public release notes list exactly the features shipped, physical devices tested and scope limitations. No native dependency makes the web shell fail to start.
- Normal users see only working features; internal research milestones stay in developer docs.

### 15.2 Folder and ownership strategy (proposed monorepo)

Use the existing web layout from §11 for host implementation; add `native/` and `compliance/` as siblings, not inside the web dist. Keep the previous root `src/` and `dist/` for compatibility with host build instructions. The native artifact is built and published separately only after its own gates.

```text
HYPEHOSTX/
  src/               # Original website and launcher
  vendor/            # Empty by default; approved material only
  native/            # Independent user-space homebrew research
    CMakeLists.txt   # Proposed portable build entry
    include/         # Original API definitions
    src/             # App UI, catalog, settings, diagnostics, lifecycle
    platform/        # Host test / approved console SDK adapter boundary
    tests/           # Portable tests, device test reports
    docs/            # Native architecture and limitations
  compliance/        # Rights ledger, SBOM, hashes, source inventory
  scripts/           # Reproducible host build and checks
  tests/             # Web tests and fixtures
  docs/              # Specifications, ADRs, release evidence
  dist/              # Website only; no native research binaries
  AGENTS.md
```

CI must reject accidental shipping of `native/`, private lab fixtures, unreviewed vendor files, or evidence containing personal information in Pages. A later split to `jxxzy/HYPEHEN` is optional; not necessary to begin design. No repo created by this document.

## 16. Implementation and governance documents

`UPSTREAM_CATALOG.md` is the public reference inventory, not a redistribution manifest. `NATIVE_SPEC.md` defines the independent application boundary; `BACKLOG.md`, `QA_MATRIX.md` and `RELEASE_GATE.md` include the native track. `AGENTS.md` is the master agent directive. `EVIDENCE_TEMPLATES.md` supplies reusable sign-off and test formats. `source-inventory.json` is metadata only, no binaries. If an approved dependency is absent, complete independent work and record a blocker. Do not retrieve private source or assume all public SDKs have the same license.

This revision chooses the monorepo form, native C/C++ application target, separate native version, and additional work items as proposals. Owner must approve license, final distribution scope and use of hardware before release. No production integration or native build has been attempted.


## v5.0 scope extension — HYPENET
ONLINE_SPEC.md adds optional independent online services, 12 modules and separate gates. Earlier no-login/no-backend requirements apply to the original offline-first host, not the optional network service. Prior exclusions on proprietary code, exploit chains, online-service evasion and misrepresentation remain. Online support means HYPE Network and authorized app connectivity, not official PSN. See ONLINE_SPEC.md for contracts and acceptance.

## v5.0 final unification — independent-first
Read INDEPENDENT_SPEC.md, RIGHTS_LEDGER.md and END_TO_END.md as authoritative addenda. HYPEHEN Independent Edition is the long-term original enabler objective; the implementable independent native deliverable remains a user-space application requiring an established authorized environment. Independence is assessed separately for source, binary and runtime. Optional GoldHEN integration must not be a required build dependency. Owner reports permission and Discord membership but has not received private source; review exact scope before use/redistribution, not before original code. Add HYPEFILES, HYPEPLUGIN and HYPEKIT application-level functionality, HYPE Transfer, app save manager and verified updates within the explicit application boundaries. No feature comparison is a support claim. Maintain separate gates for the web, native app, authorized integrated edition, independent enabler research and HYPENET. No production placeholder; hide or truthfully explain unavailable features. See CODEX_START for the sole current execution directive.


---

<!-- INDEPENDENT_SPEC.md -->
# HYPEHEN Independent Edition — product requirements and research gates

## I1. Objective and honest terminology
Owner wants an original HEN ecosystem without waiting for GoldHEN private source. The primary implementation track is original HYPEHOSTX and an independent user-space native application, with its own core, release artifacts, SDK and optional HYPENET. Independent native homebrew enabling (the ability to establish a homebrew execution environment itself) is a distinct long-term research objective, NOT a currently feasible deliverable proven by this specification. A user-space application requires an existing authorized execution environment. The native app must not be renamed as a verified enabler. GoldHEN integration is optional and is not required to build or test original application logic. Independence from GoldHEN source, binary and execution environment are three separate claims; verify each explicitly before marketing it.

| Track | Output | Can start now? | Required external gate |
|---|---|---|---|
| I-A Web host | Original static HTML/CSS/JS, metadata and cache | Yes | Hardware for PS4 support claim |
| I-B Native app | Portable C/C++ core, original app, documented SDK adapter | Yes (portable) | Toolchain and authorized console runtime for PS4 build/launch |
| I-C Integrated edition | Optional approved third-party interoperability | Metadata/rights review only until approved | Written scope, artifact provenance, compatible runtime, actual tests |
| I-D Network | Original server, web/native client contracts and original demo | Yes (local) | Hosting, operator approval, TLS and device tests |
| I-E Independent enabler | Research objective, feasibility and evidence report | Non-operational research planning only | Separate expert review, authorized hardware, suitable documented interfaces and evidence |

## I2. Feature requirements for original native application
| Capability | Implementation scope | Acceptance |
|---|---|---|
| HYPE Native Core | C/C++ portable domain, state, dependency interfaces, bounded buffers | Host test suite; no GoldHEN source or binary dependency |
| Native dashboard / themes | Original UI, system font, black/red; accessible contrast | Controller navigation, compact view, safe theme parser |
| Homebrew library / package catalog | Inspect metadata for approved homebrew, browse and verify app-owned downloads | Invalid signature/hash rejected; no unapproved install |
| HYPEFILES | File manager scoped to app-owned directory; user initiated import/export | Path escape and invalid names denied; confirmed overwrite |
| HYPEPLUGIN | Versioned app-level extension contract; bundled reviewed extensions and sample | Incompatible ABI/manifest rejected; permissions explicit; no remote arbitrary executable loading |
| HYPEKIT | Headers, schema, sample extension, sample own homebrew, developer docs | Sample compiles and runs on portable host; target result separate |
| HYPE Native Diagnostics | bounded app event logs, version, available capabilities, application timing | Redacted export; unknown hardware info remains unknown |
| HYPE Save Manager | Export/import and atomic writes for HYPE app-owned saves | Corruption detected; prior revision retained; no game save/DRM manipulation |
| HYPE Native Updates | Versioned signed release metadata, check, explicit approved download | Reject stale/untrusted manifest; no firmware modifications |
| HYPE Transfer | Optional authenticated user-initiated transfer limited to app-owned files | Local-only default, no unauthenticated FTP, no remote execution, clear stop and expiry |
| HYPENET adapter | HTTPS to own service, optional account, local demo synchronization | TLS fail closed; inactivity handled; offline app works |
| Lifecycle/recovery | pause/resume/exit where supported; bounded errors, app data recovery | No automatic repeated launch; real console rest mode claim requires test |

Advanced GoldHEN-like capabilities (system-wide plugin manager, package installation, system-level FTP, kernel debugging, Rest Mode behavior, VR, Remote Play, external storage management, FPS/system monitoring) are feature comparison/research candidates only; do not implement or advertise unsupported privileged behavior. For each document required capability, authorized documented interface, scope, risk, feasibility and independent gate. Do not use DRM/signature bypass, exploit chains, firmware/kernel offsets or patches, protected memory access, piracy, unofficial PSN authentication, spoofing or anti-ban evasion. No instructions to delegate excluded work to another agent. If normal interfaces cannot meet the goal, report `BLOCKED_EXTERNAL` and continue original work.

## I3. Portable native architecture
Layers: `domain` (no platform headers), `ports` (interfaces), `adapters/host` (portable app and test), `adapters/ps4` (reviewed documented user-space toolchain), `ui`, `app`, `samples`, `tests`. Own app modules expose result/error types rather than pretending success. No global raw memory access, no hardcoded device identifiers, no app privilege escalation. Core state transitions: UNINITIALIZED → STARTING → READY → SUSPENDED/READY → STOPPING → STOPPED; ERROR transitions to safe exit or documented recoverable state. Store only app-owned files. For storage use atomic replace or journal equivalent, size bounds and explicit recovery. For C/C++ use RAII where possible, checked arithmetic, sanitizers on portable build, warnings-as-errors for own code, defensive parsers and test fixture corpus. Native UI and backend share versioned JSON metadata, not executable content.

## I4. Provider and independence record
`providerId`, `componentName`, `upstreamVersion`, `sourceRevision`, `rightsDecision`, `artifactSha256`, `runtimeRequirement`, `exactFirmware`, `capabilities`, `evidenceIds`. Status: UNAVAILABLE, METADATA_ONLY, APPROVED_UNVERIFIED, VERIFIED_FOR_SCOPE. Do not infer one provider's verified state from another. Raw third-party binary retains true author/name/version. For original app, `sourceOrigin=original` records source ownership only; `runtimeDependency` separately records established environment. Build original app in clean job with no GoldHEN files; inspect dependency list and publish reproducibility evidence. Do not install, obtain or extract closed-source material except through explicit grant; no private Discord data in public repo.

## I5. Research protocol for independent enabler objective
Produce capability gap matrix vs published features (not reverse engineering private implementation), literature/license review, documented interfaces inventory, non-operational threat and impact assessment, hardware authorization/test resources list, test budget, rollback/recovery plan, and go/no-go report. Separate research docs from distributable application. No privileged execution mechanisms are included in this package or stable implementation. Require specialist review before expanding research scope. Do not mark an enabler as released until actual independently developed native enabling is demonstrated in a separately approved safe scope; no claim of universal firmware. Public Mira project shows historic homebrew research, but its firmware status is not current coverage and no automatic reuse approval exists. The native release gate is not an enabler release gate.

## I6. Candidate firmwares & hardware
Retain prior GamerHack candidate groups: 5.05/5.07, 6.72, 7.xx, 8.xx, 9.xx, 10.xx, 11.xx, 12.xx, 13.xx, and prior host observations 14.00/14.02 (reverify exact records). Target Fat/Slim/Pro where available. Do not manufacture firmware numbers. Separate shell, offline, provider, native and network evidence for each exact firmware/model. Test baseline with portable host and authorized console only when actually available; backups and documented recovery are required before hardware testing. No console identifiers in public reports.


---

<!-- NATIVE_SPEC.md -->
# HYPEHEN Native — independent research and application specification

Status: NOT IMPLEMENTED. Planned milestone 0.1.0-dev. This track is a native user-space homebrew application for an already authorized development environment. It is not an independent homebrew enabler on its own. The long-term goal of a truly independent native enabler remains unverified and requires separate authorized research and scope review; this plan does not specify exploit development, kernel patching, signature bypass or proprietary source extraction.

## N1. Product boundaries

HYPEHEN Launcher is the browser interface. HYPEHEN Native is an original application that can present local information and approved homebrew catalog metadata, not a renamed GoldHEN binary. Native app must have no dependency on proprietary SDKs or leaked sources. Select a public SDK following license and security review. OpenOrbis publishes a community PS4 toolchain with headers and examples; candidate only. C and C++ are proposed languages, portable CMake host tests are proposed tooling; adapt to the reviewed SDK build process. Native execution requires an established authorized development environment and is not obtained by compiling source alone.

## N2. Proposed native application modules

| Module | Contract | Failure behavior |
|---|---|---|
| HYPE Native Core | initialize/shutdown, state reducer, version info | Graceful exit; no privileged fallback |
| HYPE Native UI | render catalog/settings, navigation, focus | Text fallback, restore focus |
| HYPE Native Input | normalize supported controller input | Ignore unknown events; no unsafe repeated action |
| HYPE Native Catalog | parse schema, filter catalog, inspect metadata | Reject invalid file; preserve validated data |
| HYPE Native Storage | read/write app-owned settings only | Read-only or in-memory fallback |
| HYPE Native Diagnostics | record redacted app events and export report | Bounded local buffer; no remote service |
| HYPE Native Platform | adapter for documented user-space SDK calls | Return unsupported/unknown; no bypass |
| HYPE Native Lifecycle | pause, resume, exit, recovery of app state | No automatic restart loop |

First working milestone: portable application tests plus minimal native app UI with version, navigation and controlled exit on authorized hardware. Second milestone: validated catalog, preferences, diagnostics and lifecycle. Any operation beyond application-owned resources requires separately documented authorization, feasibility analysis and new review. Do not claim FTP, package installation, debugger, cheat engine, fan control, system memory access or HEN activation from a native app unless separately implemented within authorized scope and verified; exclude them from this release.

## N3. Build and module dependency policy

Portable domain logic -> abstract platform interface -> host test adapter / approved native environment adapter. UI uses only documented user-space graphics/input interfaces where supported. No platform secrets or hardcoded console identifiers. Use fixed bounds for file input and logs, checked allocations, defensive parsing, clear error returns and compiler warnings. Unit tests for domains run on development host; never report them as PS4 tests. Keep compiler/toolchain versions pinned, dependency sources recorded, and artifacts traceable to commit. Maintain independent dependency lock/inventory, license notices, artifact hash, compiler flags and build log. Do not bundle the SDK or its binaries unless rights are established. Packaging format must be selected using reviewed documentation and an authorized target; no proprietary packaging secrets.

## N4. Data exchange

Use a shared, versioned metadata schema for host and native catalog; exchange is via reviewed static data artifacts or a user-initiated import of approved metadata (not executable input). Validate size, type, supported schema version, IDs, encoding and source. Do not infer accessibility, provider execution or firmware from an imported file. No host-to-console remote control, no arbitrary command channel, no default server, no background daemon. Native output is an independent redacted diagnostic report with actual app version, platform information obtainable by documented APIs, capabilities, error codes and test evidence.

## N5. Native QA and release

Use test fixtures of malformed and valid metadata, invalid UTF-8, oversize input, storage denial, unknown platform functions, rapid controller input, lifecycle interruptions, memory allocation failure and clean exit. On owned or explicitly authorized console, record exact model, firmware, authorized environment, toolchain, build revision, and actual app behavior. Where meaningful, repeat launch/exit and suspend/resume cycles and record failures rather than hiding them. If no hardware is available, native artifact remains unverified; no production native claim. Do not test on third-party devices without permission. No automatic firmware changes, destructive actions, or network-service exposure.

Release progression: N0 rights/scope + toolchain review; N1 portable app and tests; N2 approved hardware smoke; N3 catalog/preferences/diagnostics; N4 regression, evidence and native release approval. Gate N4 does not grant enabler status. A separate future architecture review is required before changing this scope.


## Optional online adapter (v5.0)
Follow ONLINE_SPEC.md for original app-owned data, secure transport and authorized demo connectivity. Keep default offline; no listening services or remote exposure by default. Test portable code first; real console TLS and secure storage require evidence. Do not claim this enables PSN or retail multiplayer.

## v5.0 independent-first expansion
INDEPENDENT_SPEC.md defines the expanded native app requirements, the distinction between source/binary/runtime independence, app-owned file and save management, app-level extension SDK, authenticated scoped transfer, signed update metadata, and the research-only independent enabler objective. Its scope and release gates override older milestone descriptions. Keep GoldHEN out of original application build dependencies; only reviewed documented user-space SDK interfaces are candidates. Any actual native toolchain/hardware result must be recorded separately. Do not market native app completion as HEN activation.


---

<!-- ONLINE_SPEC.md -->
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


---

<!-- END_TO_END.md -->
# End-to-end implementation, operations and handoff

## E1. Monorepo boundaries and release artifacts
Keep existing source if present. Otherwise web `src/`; portable native `native/`; backend `backend/`; contracts `packages/contracts/`; SDK `packages/hypekit/`; local client demo `clients/network-demo/`; tests `tests/`; infra `infra/`; rights and architecture `docs/`; internal tests `lab/`; logs `evidence/`. Never commit secrets, personal user data, private source, build cache or production credentials. Outputs are separated `dist/web`, `artifacts/native`, `artifacts/backend`, `artifacts/sdk`, `artifacts/test-evidence`; GitHub Pages only sees allowlisted original web assets. Preserve version 1.0.0 as product target; independently version native app, network API, SDK and catalog schema. Version mismatch fails gracefully; no forced update when offline.

## E2. Product UI and user flows
1. Startup → real device/browser capability check → dashboard or information-only mode. Firmware hint and manually selected exact firmware are different. A conflict is explicit, not silently overwritten.
2. HYPEHEN → verified compatibility detail → approved component information or unavailable status. No fake launch completion; when no real provider integration, present accurate catalog/readme path only. No fake indicator or bait button.
3. HYPECACHE → display plan and size if known → user confirms → cache genuine approved shell assets → verify available evidence → offline reopen test on target. Keep current valid version if update fails; expose clear/recovery action.
4. Native app → original library, settings, app-owned files, extension list, diagnostics, exit. Only display hardware signals actually exposed. Theme and language are local. Label app launch vs system enabling separately.
5. HYPENET → connection status → sign in if desired → profile and privacy → friends, chat, lobbies, own-app saves, store metadata → sign out/revoke. User can always return to offline mode. Public service and PSN are not the same.
6. HYPESTORE → approved metadata and version detail → source, license, digest, size, compatibility → confirm user-initiated download only when approved; invalid data rejected. No unsigned server-delivered active content.
7. Recovery → copy redacted diagnostics → safe app-only reset confirmation → restore normal navigation. Console-wide reset or firmware alteration excluded.

## E3. Cross-module contracts and trust boundaries
- `CapabilitySnapshot`: schemaVersion, deviceHint, firmwareHint, selectedFirmware, evidenceLevel, browserCapabilities, observedAt. Never treats user-agent as authority.
- `CatalogEntry`: id, name, version, publisher, sourceUrl, licenseId, rightsStatus, sha256 (if artifact authorized), size, exactFirmware[], evidenceIds[], runtimeRequirement. Invalid fields fail validation; no arbitrary URL fetch from server.
- `OperationResult`: operationId, state, errorCode, userMessageKey, evidenceId (nullable). `COMPLETE` requires actual verification appropriate to operation; never by timer. `UNKNOWN` explicit.
- `ReleaseManifest`: schemaVersion, productVersion, channel, sourceCommit, createdAt, artifacts with path/hash/size and approval state, signature metadata. Verify with reviewed signature library and pinned trusted public key; no hardcoded private key. Existing verified release preferred to invalid network update; offline status not current revocation proof.
- `DiagnosticEvent`: timestamp, subsystem, safeCode, severity, correlationId, redacted data. Bounded buffer; exclude secrets, chat and saves. No host telemetry.
- `ExtensionManifest`: extensionId, sdkVersionRange, declared capabilities, entry version, license, source, approval. Bundled app-level extensions only; validate version, cap privileges; disallow remotely supplied executable modules.
- Independent backend authenticates accounts and authorizes each object operation; clients are untrusted. Native app accepts only app-owned data; no web-to-kernel or remote shell path.

## E4. Interface and budgets
Premium Obsidian Black #09090B, Dark Surface #18181B, Hype Red #E92840, Cyber Silver #C4C4CC, text #F5F5F5. Keep text focus and contrast; controller/keyboard focus order deterministic. No external CDN, autoplay, huge animation or desktop framework in console shell. Core JS ES5-compatible, CSS fallbacks, modern enhancements capability-gated. Proposed budgets (shell only): initial static assets 500 KB, JS 100 KB minified, CSS 60 KB; target 2s on specified trial setup, not universal. UI must work without backend. Core 15 routes from MASTER_SPEC; online 9 sections from ONLINE_SPEC; native menu targets from INDEPENDENT_SPEC. Locale keys EN/ID complete including errors and recovery. Modern browser automation is not proof of PS4 support.

## E5. Local development and testing contract
Codex chooses supported tool versions by actual environment inspection, records an ADR, locks dependencies and supplies cross-platform setup. Root convenience commands proposed: `npm run lint`, `npm run validate`, `npm run test`, `npm run build`, `npm run test:e2e`, `npm run verify:dist`; implement scripts before documenting as runnable. Backend local Compose start, migration, health, demo tests and stop commands should be written against actual files; native host test uses its actual CMake/build system. Never run command examples against a live production system. CI jobs: web syntax/schema/unit/browser; legacy output check; native portable compiler+test; backend API/database contract; dependency and secret scan; license checks; reproducibility and dist allowlist. Artifact upload to internal CI permitted only when workspace rules allow; no public publication without approval. Keep logs, exit codes, environment and revision.

## E6. Staged implementation and release
Phase 0: status/permissions/tooling and ADRs. Phase 1: core web and portable native. Phase 2: storage/cache/catalog/SDK and tests. Phase 3: local HYPENET (migrations/auth/social/cloud/store), original multiplayer demo. Phase 4: end-to-end integration plus signed metadata, packaging and negative tests. Phase 5: actual authorized console verification with per-feature evidence. Phase 6: independent research decision and only approved release scopes, GitHub Pages and separate server. Do not let one external blocker stop other phases. Report core, native app, integrated edition, independent-engine objective and network readiness separately.

Release rollback: preserve last reviewed web artifact and catalog version; for backend backup before irreversible changes, test restore, reversible migration where feasible, document compatibility, recover user data. For offline shell show local version and recovery instructions; cannot promise instant remote update. Infrastructure: no VPS or paid services provisioned without owner consent; public frontend base URL remains proposed. Backend requires TLS, separate deployment, mail provider approval, monitoring/retention/operator policy and abuse handling. Do not publish secrets or user reports.

## E7. Codex status and delivery
Maintain `IMPLEMENTATION_STATUS.md` and machine-readable `evidence/status.json`: ticket, state, priority, dependencies, commit/files, test IDs, command/exit code, evidence link, blocker, next step. Initial state TODO except explicit external gates. For each run store status ledger and next action; no claims of 100% when blocked. Actual source code, local builds, docs, tests, artifacts, API/OpenAPI, database migrations, SBOM, notices, compatibility reports and signed-manifest verification evidence are expected outputs of Codex, not included in this planning package. Owner decisions are license, actual publication, external spending, sensitive credentials and hardware permission. `DONE` requires a mapped acceptance test and observable output; `BLOCKED_EXTERNAL` identifies missing material without fake workaround.


---

<!-- RIGHTS_LEDGER.md -->
# Upstream rights, permission and evidence ledger

Owner statement (15 November 2026, conversation): owner has obtained permission and joined GoldHEN Discord, but has not received private source code. This is a reported fact, not independent verification of the precise grant. It does not establish redistribution, modification, rebranding or private-source access. Record `OWNER_REPORTED_SCOPE_UNVERIFIED` and request only the specific evidence necessary for the proposed action. Do not require this for original code work; keep original tracks moving.

| Permission | Present state | Rule |
|---|---|---|
| Community membership | Owner-reported | No rights inferred |
| General developer permission | Owner-reported | Scope unverified |
| Use existing release | Scope not recorded | Review exact artifact and terms before integration |
| Redistribute binary | Unverified | Exclude until explicit grant/valid license |
| Modify or rebrand upstream | Unverified | Exclude until explicit rights; preserve credits |
| Private source access | Not received | Do not assume availability or seek leaked material |
| GamerHack reuse | Not established | Reference only pending file-level review |
| Mira / OpenOrbis reuse | Public projects; review needed | Check pinned version, GPL obligations and dependencies |

A grant record must specify grantor/authority, project, artifact/tag/hash, permitted actions, audience, attribution, conditions, date/expiry, reviewer, evidence reference and release scope. Store sensitive proof outside public git; commit a redacted outcome only. Keep original license separate (MIT proposed, owner approval pending); GPL-derived material must meet applicable obligations; do not label vendor code as MIT merely because the original app is MIT. Private code stays outside build until owner-approved terms and authorized access. Do not contact third parties, create forks or publish anything automatically. If granted rights change, suspend new distribution and update the release scope; offline copies already installed cannot be remotely recalled.

Public sources reviewed on 15 November 2026 at repository/README level (not recursive file audit): GoldHEN core README states source private; public releases are available; Mira project has a public repository with LICENSE and historical firmware list; OpenOrbis toolchain README identifies GPLv3 and separately licensed LLVM. URLs in UPSTREAM_CATALOG.md, not a determination that all content may be used.


---

<!-- UPSTREAM_CATALOG.md -->
# Upstream catalog and file-availability audit

Public documentation reviewed 15 November 2026. This is a repository-level audit, not a full recursive inventory. No upstream files were copied into this package. No upstream repository is a substitute for the missing private GoldHEN core source.

| Reference | Visible material / role | License and distribution decision |
|---|---|---|
| [GamerHack host](https://github.com/GamerHack/GamerHack.github.io) | Static host, firmware-specific directories, multi-firmware host | Root listing has no visible LICENSE; reference only unless file-level rights are established |
| [GamerHack multi-firmware page](https://github.com/GamerHack/GamerHack.github.io/blob/main/g2all/index.html) | Metadata evidence: references through 14.02 | Same review requirement; no HYPEHOSTX support inferred |
| [GoldHEN core public repository](https://github.com/GoldHEN/GoldHEN) | Documentation, feature notes, release references; core source expressly private | Owner reports permission; exact scope/evidence not yet recorded; no proprietary binary redistribution or renaming until reviewed |
| [GoldHEN releases](https://github.com/GoldHEN/GoldHEN/releases) | Published compiled release packages; not full buildable source | Verify specific release and accompanying terms; distribution blocked by default |
| [GoldHEN Plugin SDK](https://github.com/GoldHEN/GoldHEN_Plugins_SDK) | Public source, headers and build files for plugin developers | MIT indicated; audit specific revision; does not confer GoldHEN core rights |
| [GoldHEN organization](https://github.com/GoldHEN) | Website, debugger and associated projects listed | Review each separately; no automatic inclusion |
| [GoldHEN website](https://github.com/GoldHEN/GoldHEN.github.io) | Website repository listed by organization | Unreviewed; reference only |
| [GoldHEN loader repository](https://github.com/GoldHEN/henloader_lp) | Separate public loader project, not full GoldHEN core | Repository shows MIT; bundled components need separate review; not included in implementation scope |
| [GoldHEN debugger](https://github.com/GoldHEN/ps4debug) | Separate debugger project, listed by organization | Exact terms not reviewed; reference only |
| [GoldHEN cheat database](https://github.com/GoldHEN/GoldHEN_Cheat_Repository) | Separate game-specific data project | Organization lists GPL-3.0; individual contents not audited; not included in stable scope |
| [OpenOrbis PS4 Toolchain](https://github.com/OpenOrbis/OpenOrbis-PS4-Toolchain) | Public SDK, headers, sample applications, build documentation | Organization lists GPL-3.0; check individual dependencies and output licensing; candidate for independent app development |

GamerHack root README lists up to 14.00 at the time of review; its multi-firmware page references 14.02. Keep both source observations in the ledger. A public release version label on a host is not evidence that it matches a release from the original author. Do not infer that every number in a range is an actual firmware, or that a listed firmware is verified. Exact compatibility records require a later reviewed inventory and real test evidence.

## Ownership and inclusion decision

Original HTML, CSS, JS, graphics, application logic, tests, native app code and written specifications may be created independently. Vendor code, assets, SDK components and binaries require recorded rights and provenance before redistribution. Do not apply an original project license to vendor content. Link-only reference approval is not authorization to bundle or execute. Public SDK license rights do not grant privileged console access. Do not use private or leaked proprietary source.

For each proposed vendor item record: ID, source URL, immutable commit/tag, file paths and hashes, creator, SPDX/license text, notices, separately bundled terms, reviewed rights, security risk, software bill of materials, decision, reviewer/date, approved scope, and exact hardware evidence if applicable. Revise on every version change. See evidence templates.

## v5.0 additions and permission update (15 November 2026)
| Reference | Role | Decision |
|---|---|---|
| [Mira](https://github.com/OpenOrbis/mira-project) | Public C/C++ homebrew research project; historical firmware list | Reference only for feature/architecture comparison; LICENSE present, review exact terms and dependencies; no inclusion of privileged components |
| [Mira license](https://github.com/OpenOrbis/mira-project/blob/master/LICENSE) | License text | Pin and review before any permitted reuse |
| [Mira archive](https://github.com/OpenOrbis/mira-project-archive) | Historical archived project, read-only since May 2020 | Historical reference, not current firmware proof |
| [OpenOrbis toolchain](https://github.com/OpenOrbis/OpenOrbis-PS4-Toolchain) | Public headers, samples, tools for native app | README identifies GPLv3 and separate LLVM license; file-level review mandatory |
| [GoldHEN README](https://github.com/GoldHEN/GoldHEN) | Core source availability | Private according to public README |
| [GoldHEN releases](https://github.com/GoldHEN/GoldHEN/releases) | Public release artifacts/notes | Owner-reported permission, exact rights unknown; no automatic download, inclusion or rebranding |

Latest web result for GamerHack README does not consistently show earlier 14.xx observations. Keep 14.00/14.02 as historical candidate observations pending exact revision check; not supported by HYPEHOSTX. Source review is repository-level only, no upstream bytes or permission evidence obtained. RIGHTS_LEDGER.md supersedes previous permission state.


---

<!-- BACKLOG.md -->
# HYPEHOSTX — Engineering Backlog

Initial ticket status: TODO unless dependency marked BLOCKED pending external evidence. All priorities scoped to the relevant release. P0 = mandatory; P1 = desirable. M0–M5 are ordering, not time promises.

| ID | Milestone | Pri | Work item | Dependency | Acceptance / evidence |
|---|---|---|---|---|---|
| HX-001 | M0 | P0 | Inspect repo and ownership | Owner workspace | Inventory and git status recorded |
| HX-002 | M0 | P0 | Upstream rights ledger | Public references | File-level inventory plan, unknown rights denied |
| HX-003 | M0 | P0 | Approve original license | Owner | License decision recorded; vendor excluded |
| HX-004 | M0 | P0 | Architecture decisions | 001 | ADRs for static runtime, offline and compatibility |
| HX-005 | M0 | P0 | Scaffold and lockfile | 004 | Reproducible clean install |
| HX-006 | M0 | P0 | Repository policy docs | 003 | README, privacy, security, contributing, notices |
| HX-007 | M0 | P0 | Data schemas | 004 | Validate good fixtures, reject malformed examples |
| HX-008 | M0 | P0 | CI baseline | 005,007 | Lint/schema/unit jobs run on PR |
| HX-009 | M0 | P1 | Issue/PR templates | 005 | Evidence fields and risk checklist |
| HX-010 | M1 | P0 | Original branding assets | 004 | Owner review; no upstream logos |
| HX-011 | M1 | P0 | CSS tokens + legacy layout | 010 | Contrast, focus, responsive visual tests |
| HX-012 | M1 | P0 | Bootstrap | 005 | Safe fallback on missing dependency |
| HX-013 | M1 | P0 | State machine | 012 | Transition unit tests incl unknown outcome |
| HX-014 | M1 | P0 | Router | 012 | 15 routes, deep links, Back, not-found |
| HX-015 | M1 | P0 | Localization | 007 | EN/ID key parity; fallback validated |
| HX-016 | M1 | P0 | Storage adapter | 013 | Denied/quota/corrupt cases handled |
| HX-017 | M1 | P0 | Navigation/focus | 011,014 | Keyboard navigation and focus restore |
| HX-018 | M1 | P0 | Dashboard | 013,017 | Actual state cards, no fake runtime data |
| HX-019 | M1 | P0 | Generic empty/error/restricted screens | 011 | All states accessible |
| HX-020 | M1 | P0 | Static help/about/credits | 006,015 | Accurate disclaimers and attribution |
| HX-021 | M2 | P0 | Browser capability probe | 013 | Unknown API handled without crash |
| HX-022 | M2 | P0 | Firmware hint parser | 021 | Bounded parsing, string equality, invalid rejection |
| HX-023 | M2 | P0 | Manual selection | 022 | Not device-verified; conflict blocks eligibility |
| HX-024 | M2 | P0 | Reference catalog | 002,007 | Explicit examples, no interpolation |
| HX-025 | M2 | P0 | Compatibility views | 024 | Filters, empty state, evidence labels |
| HX-026 | M2 | P0 | HYPEGUARD policy | 023,024 | Unknown/withdrawn/unapproved fail closed |
| HX-027 | M2 | P0 | HYPEHEN interface | 026 | Unavailable reason; consent/result UI; no fake success |
| HX-028 | M2 | P0 | Metadata catalog | 007,026 | Link-only and unavailable differentiated |
| HX-029 | M2 | P1 | Favorites/search | 016,028 | Valid IDs, filter result and persistence |
| HX-030 | M2 | P0-R | Vendor authorization review | External permissions | BLOCKED until rights and provenance confirmed |
| HX-031 | M2 | P0-R | Authorized provider handoff review | 030 + hardware | BLOCKED; evidence-based integration assessment |
| HX-032 | M3 | P0 | Cache capability adapter | 021 | Unsupported/unknown state clear |
| HX-033 | M3 | P0 | Shell asset inventory | 005 | Paths/bytes/hash verified at build |
| HX-034 | M3 | P0 | Original offline shell | 032,033 | Offline tests, separate component state |
| HX-035 | M3 | P0 | Cache update and recovery UX | 034 | Interrupt/mismatch tested, no unsupported claims |
| HX-036 | M3 | P0 | Device information | 021 | Available properties only, manual labels |
| HX-037 | M3 | P0 | Diagnostics/error registry | 013,016 | Redaction, cap, clear, fallback export |
| HX-038 | M3 | P0 | Recovery page | 035,037 | Scoped reset only, confirmed user action |
| HX-039 | M3 | P0 | Settings | 015,016 | Persist language/accessibility, scoped reset |
| HX-040 | M3 | P0 | Version metadata/update view | 007 | Installed vs available; stale/offline states |
| HX-041 | M3 | P0 | Changelog and guide | 020,040 | Real versions, known limits, bilingual copy |
| HX-042 | M4 | P0 | Legacy syntax/API audit | M1–M3 | Actual artifact check; fallback tests |
| HX-043 | M4 | P0 | Static subpath verification | 033 | No missing links/assets under /HYPEHOSTX/ |
| HX-044 | M4 | P0 | Accessibility QA | 017,039 | Contrast/focus/modal; keyboard evidence |
| HX-045 | M4 | P0 | Security/privacy review | M1–M3 | No credentials, injection, arbitrary URLs, telemetry |
| HX-046 | M4 | P0 | Browser matrix | M1–M3 | Desktop/mobile tests with actual reports |
| HX-047 | M4 | P0 | Physical shell QA | Hardware access | BLOCKED until consoles and records available |
| HX-048 | M4 | P0-R | Authorized integration QA | 030,031 | BLOCKED; actual provider/hardware evidence |
| HX-049 | M4 | P0 | Performance budget | M1–M3 | Size and measured latency report |
| HX-050 | M4 | P0 | Dist allowlist and reproducibility | 033,042 | Repeat build digest; lab/vendor excluded by default |
| HX-051 | M4 | P0 | Regression/defect triage | 046–050 | No open S0/S1; evidence ledger |
| HX-052 | M5 | P0 | Scope and release permission | Owner + gates | Explicit approved release scope |
| HX-053 | M5 | P0 | Pages workflow | 050,052 | Least privilege, tested artifact, no secret runtime |
| HX-054 | M5 | P0 | Production smoke test | 053 | Actual URL and network checks |
| HX-055 | M5 | P0 | Rollback drill | 053 | Previous reviewed artifact restored in test |
| HX-056 | M5 | P0 | Release notes and checksums | 051–055 | Notes match tested scope; archive verified |
| HX-057 | M5 | P1 | Support templates | 037 | Minimal redacted report instructions |

| HX-058 | N0 | P0 | Native scope and rights review | Owner | Written app-only scope and source policy |
| HX-059 | N0 | P0 | SDK inventory | N0 | Pinned revision and license ledger |
| HX-060 | N0 | P0 | Native architecture ADR | N0 | Separate app and host versioning |
| HX-061 | N0 | P0 | Native build boundary | N0 | No native files in web dist |
| HX-062 | N1 | P0 | Portable C/C++ domain project | N0 | Clean build on developer host |
| HX-063 | N1 | P0 | Native lifecycle reducer | N1 | State transition tests |
| HX-064 | N1 | P0 | Platform adapter interface | N1 | Documented calls; unknown fallback |
| HX-065 | N1 | P0 | Native settings schema | N1 | Validation and bounded storage |
| HX-066 | N1 | P0 | Catalog schema sharing | N1 | Host/native data parity |
| HX-067 | N1 | P0 | Native diagnostic model | N1 | Redaction and bounds tests |
| HX-068 | N1 | P0 | Native UI design | N1 | Focus, version, exit states |
| HX-069 | N1 | P0 | Controller input model | N1 | Repeat and unknown event tests |
| HX-070 | N1 | P0 | Host test adapter | N1 | Portable test pass; lab only |
| HX-071 | N2 | P0-R | Authorized environment confirmation | Owner hardware | BLOCKED until environment verified |
| HX-072 | N2 | P0-R | Native SDK build | N0,N1 | Actual build log and artifact digest |
| HX-073 | N2 | P0-R | Hardware smoke test | N2 | Actual device report |
| HX-074 | N3 | P0 | Approved metadata import | N1 | Malformed input rejected |
| HX-075 | N3 | P0 | Settings persistence | N1 | App-only reset and fallback tests |
| HX-076 | N3 | P0 | Diagnostics export | N1 | Redacted local report |
| HX-077 | N3 | P0 | Lifecycle and clean exit | N2 | Actual test results |
| HX-078 | N4 | P0 | Native dependency SBOM | N0 | Complete approved inventory |
| HX-079 | N4 | P0 | Native regression suite | N1–N3 | Pass applicable gates |
| HX-080 | N4 | P0 | Native artifact packaging audit | N2 | Rights, hash, build provenance |
| HX-081 | N4 | P0-R | Native release decision | N4 | Owner approval and hardware evidence |

## Status ledger format
`Ticket | Status | Owner | Commit | Verification command | Result | Evidence | Blocker | Review date`

Do not turn BLOCKED into DONE by mocking unavailable hardware, granting permission to yourself or renaming a third-party component. P0-R blocks the integration release only; owner may separately approve original information-host scope with clear support limitations.


## Online track — separate from mandatory offline release

| ID | Phase | Work | Acceptance |
|---|---|---|---|
| NET-00 | O0 | Network ADR and scope boundaries | Local-only architecture and approved trust boundaries |
| NET-01 | O0 | Schema contracts and OpenAPI | Validated request/response/error schemas |
| NET-02 | O0 | Service scaffold / Compose / env | Clean local boot and health evidence |
| NET-03 | O0 | Database migrations and constraints | Clean apply and rollback strategy |
| NET-04 | O1 | Independent identity and verification | Registration and login tests with local mail sink |
| NET-05 | O1 | Session revoke and reset | Expired/revoked denial, recovery tests |
| NET-06 | O1 | Profile, privacy, deletion | Owner-only controls and deletion tests |
| NET-07 | O1 | HYPENET client and truthful status | Offline/timeout/unsupported/capability tests |
| NET-08 | O1 | HYPEFRIENDS and block | Relationship and privacy tests |
| NET-09 | O2 | HYPECHAT and reports | Membership, block, rate limits, moderation test |
| NET-10 | O2 | HYPELOBBY | Capacity race, owner authorization, join/leave |
| NET-11 | O2 | Realtime events | Handshake, scoped subscriptions, reconnect tests |
| NET-12 | O2 | Original HYPECONNECT demo | Two independent local clients, no retail game integration |
| NET-13 | O3 | HYPECLOUD and HYPESYNC | Quotas, ownership, stale revision, delete |
| NET-14 | O3 | HYPESTORE | Approved metadata and rights gate |
| NET-15 | O3 | Online UI plus EN/ID | Working routes, fallback, no mandatory login |
| NET-16 | O3 | Portable native network adapter | Capability/TLS fail closed, portable tests |
| NET-17 | O4 | HYPENETGUARD audit | Authz, abuse, XSS, secrets and dependency regression |
| NET-18 | O4 | Ops and backup/restore | Health, restore drill, migration/rollback docs |
| NET-19 | O4 | Native network hardware verification | BLOCKED until authorized console and toolchain available |
| NET-20 | O4 | Network release and deployment approval | BLOCKED until approval, hosting and real evidence |

## v5.0 independent-first supplemental backlog
All new tickets are initially TODO except I-17/I-18 external gates. Earlier M/N/NET tickets remain mandatory for included scopes. Prioritize I-01 through I-04 and reusable contracts. Dependency labels reference milestones or tickets; verify actual prerequisites before executing. I-15 also requires completed online local demo tasks; I-17 requires native SDK build and relevant network/hardware gates. I-20 does not override remaining blocked work.

| ID | Task | Dependency | Acceptance |
|---|---|---|---|
| I-01 | Independent track status split and product labels | M0 | Five scopes represented; no native app/enabler conflation |
| I-02 | Record owner-reported rights and grant schema | I-01 | Redacted ledger; no unverified redistribution |
| I-03 | Review Mira and OpenOrbis public terms and provenance | I-02 | Pinned sources and decision; no privileged code imported |
| I-04 | Original dependency isolation verification | I-01 | Clean build dependency report excludes GoldHEN |
| I-05 | Portable app-owned file operations | I-04 | Path boundary and overwrite tests |
| I-06 | Atomic app save manager | I-05 | Corrupt input and rollback tests |
| I-07 | App-level extension contract | I-04 | Manifest validation and permission boundaries |
| I-08 | HYPEKIT SDK sample and docs | I-07 | Sample build/test evidence |
| I-09 | Theme schema and accessible native settings | I-04 | Invalid theme fallback; focus tests |
| I-10 | Release metadata verification | I-04 | Valid/invalid/stale signature tests |
| I-11 | Authorized app-file transfer | I-05 | Authenticated bounded local transfer; no command channel |
| I-12 | Native menu and feature integration | I-06,I-07,I-09 | Real portable handlers and explicit unsupported state |
| I-13 | Native HTTPS client contract | I-12 | TLS/timeout and offline adapter tests |
| I-14 | Cross-module metadata schema and release versions | I-01 | Schema contract tests and migration notes |
| I-15 | Original full-flow two-client network demo | I-14 | Actual local demo evidence; no PSN dependence |
| I-16 | Independent feature gap and public research report | I-03 | Capability, safety, authorization and go/no-go report only |
| I-17 | Physical hardware per-scope verification | I-12,I-13 | BLOCKED until authorized hardware/toolchain; actual report |
| I-18 | Optional integration rights and evidence review | I-02 | BLOCKED until exact grant and compatible environment |
| I-19 | Separate artifact pipelines and SBOM | I-08,I-14 | Allowlisted web and traceable native/backend artifacts |
| I-20 | Final independent-first acceptance review | I-16,I-19 | Separate gated decisions; pending dependencies not passed |


---

<!-- QA_MATRIX.md -->
# HYPEHOSTX — Acceptance Test Matrix

All cases below are **NOT RUN**. These are expected outcomes, not actual results. Record evidence for every execution; include release revision, browser/device/firmware, network condition, actual outcome, date and reviewer. Test original host only unless separately authorized provider and hardware conditions are met.

| ID | Area | Scenario | Expected result |
|---|---|---|---|
| T001 | Boot | Open valid shell | Readable dashboard, version true |
| T002 | Boot | Missing optional asset | Text fallback; no blank screen |
| T003 | Boot | Missing required asset | Clear HX-4001 and recovery |
| T004 | Route | Each of 15 routes | Correct view; meaningful controls |
| T005 | Route | Invalid hash | Recovery link |
| T006 | Route | Nested deploy path | No root-path dependency |
| T007 | Route | Browser Back | Correct navigation, no trap |
| T008 | UI | 720p, 1080p, 4K layout | Readable and no clipped actions |
| T009 | UI | Keyboard traversal | Deterministic visible focus |
| T010 | UI | Physical PS4 controller | Actual focus/action behavior recorded |
| T011 | UI | Dialog open/cancel | Exit available; focus restored |
| T012 | UI | Reduced motion | Essential status still visible |
| T013 | Locale | EN to ID | Complete translation, no raw keys |
| T014 | Locale | Missing translation fixture | Documented fallback plus CI failure |
| T015 | Device | PS4 UA hint fixture | Hint only; no claim of verified hardware |
| T016 | Device | Desktop/mobile UA | Information mode |
| T017 | Device | Missing/invalid UA hint | Unknown status |
| T018 | Firmware | 9.10 vs 9.1 | No floating point equivalence |
| T019 | Firmware | 11.02 vs 11.2 | Exact version distinction |
| T020 | Firmware | Gap or unlisted version | Unsupported/unverified; no interpolation |
| T021 | Firmware | Valid manual selection | Manual-only label |
| T022 | Firmware | Manual/hint conflict | Eligibility blocked |
| T023 | Firmware | Clear manual selection | Actual remaining state displayed |
| T024 | Catalog | Reference-only record | No verified badge |
| T025 | Catalog | Verified record missing evidence | Schema/release rejects |
| T026 | Catalog | Duplicate version/ID | Validation rejects |
| T027 | Catalog | Invalid JSON | Safe information mode/error |
| T028 | Catalog | Search no matches | Empty state |
| T029 | Catalog | Link-only record | Documentation only, no executable asset |
| T030 | Catalog | Withdrawn entry | Unavailable and reason |
| T031 | Guard | Unknown rights | No integration eligibility |
| T032 | Guard | Digest mismatch fixture | Integrity failure, no false readiness |
| T033 | Guard | Untrusted URL/path input | Rejected, no arbitrary fetch/load |
| T034 | Guard | Firmware changes after consent | Consent invalidated |
| T035 | Launcher | Unavailable integration | Clear explanation; no dead button |
| T036 | Launcher lab | Consent cancelled | No handoff; safe prior state |
| T037 | Launcher lab | Double activate | One logical action |
| T038 | Launcher lab | No authoritative outcome | Unconfirmed, not success |
| T039 | Launcher lab | Simulated interruption | Unconfirmed/failed; no auto retry |
| T040 | Launcher lab | Reload during session | No auto resume; unconfirmed |
| T041 | Cache | No supported cache API | Honest online-only state |
| T042 | Cache | First shell preparation | Progress and real backend status |
| T043 | Cache | Network interruption | Failed/incomplete; no ready badge |
| T044 | Cache | Shell ready, component unknown | Distinct status |
| T045 | Cache | Reopen offline | Actual shell loads and navigation works, or documented fail |
| T046 | Cache | New release metadata | Update state; no silent false success |
| T047 | Cache | Revision mismatch | Recoverable warning, old usable cache if supported |
| T048 | Cache | Clear/recovery requested | Confirmation; no unsupported clear claim |
| T049 | Cache | Stale offline catalog | Last revision/date; not current verification |
| T050 | Storage | Disabled localStorage | Session fallback, no app crash |
| T051 | Storage | Quota reached | Bounded fallback |
| T052 | Storage | Corrupted preference | Validate/reset only affected key |
| T053 | Storage | Reset HYPEHOSTX | Unrelated origin keys untouched |
| T054 | System | Missing hardware field | Unavailable rather than guessed |
| T055 | Diag | Persistent logs opt-out | No persistent event store |
| T056 | Diag | Event cap exceeded | Bound enforced, truncation visible |
| T057 | Diag | Redaction fixture | No identifiers/credentials in export |
| T058 | Diag | Clipboard unavailable | Selectable report fallback |
| T059 | Diag | Clear logs | Only HYPEHOSTX events removed |
| T060 | Update | Offline metadata request | Installed version + unknown/stale available version |
| T061 | Security | HTML string in metadata | Render escaped text |
| T062 | Security | External runtime audit | No CDN/tracking/ads |
| T063 | Security | Build secret scan | No secrets in published files |
| T064 | Security | Unknown license fixture | Bundling blocked |
| T065 | Build | Clean reproducible build | Same intended artifact/digest |
| T066 | Build | Production fixture scan | No lab/test provider or dummy result |
| T067 | Build | Size budgets | Report actual JS/CSS/shell bytes |
| T068 | Browser | Legacy syntax check | Critical shell parses on target baseline |
| T069 | Browser | Unsupported modern APIs | Fallback or clear unsupported status |
| T070 | Network | Deployed URL + MIME checks | Correct resources; record headers/results |
| T071 | Network | Broken connectivity | Reasoned error; no endless reload |
| T072 | Release | Prior artifact rollback | Verified restoration within documented test environment |
| T073 | Hardware | Cold and repeat opening | Actual counts and error observations recorded |
| T074 | Hardware | Offline reopen repetitions | Actual counts; shell-only claims |
| T075 | Hardware | Firmware/model evidence | Each public verified claim traces to report |
| T076 | Integration | Authorized provider review | Rights, version and testing all satisfied; otherwise blocked |
| T077 | Integration | Outcome evidence review | Confirmed only by reliable actual provider result |
| T078 | Release | Public credits | Genuine attribution and notices retained |
| T079 | Release | Public status audit | No fake support, no experimental/placeholder controls |
| T080 | Release | Public smoke test | Real deployed URL and artifact revision verified |

| T081 | Native scope | App branding | No enabler or upstream ownership false claim |
| T082 | Native build | Clean portable build | Pinned tools and real build log |
| T083 | Native build | Web dist audit | No native or lab artifacts |
| T084 | Native build | Third-party right missing | Build/release scope blocks unauthorized distribution |
| T085 | Native version | Host differs from native | Independent actual versions displayed |
| T086 | Native core | Normal initialization | Ready only on successful initialization |
| T087 | Native core | Missing platform adapter | Unsupported returned |
| T088 | Native core | Repeated start | No duplicate lifecycle |
| T089 | Native core | Shutdown | App-owned resources released |
| T090 | Native core | Resume interruption | Safe valid state restored or unknown |
| T091 | Native input | Unknown controller event | Ignored |
| T092 | Native input | Rapid repeat | No duplicate action |
| T093 | Native UI | Focus traversal | Deterministic visible focus |
| T094 | Native UI | Exit action | Explicit clean exit |
| T095 | Native catalog | Valid metadata | Validated correct entries |
| T096 | Native catalog | Malformed JSON | Reject without crash |
| T097 | Native catalog | Oversize record | Bounded rejection |
| T098 | Native catalog | Unknown schema | Unsupported version message |
| T099 | Native catalog | Duplicate ID | Reject ambiguity |
| T100 | Native catalog | Invalid UTF-8 | Reject safely |
| T101 | Native storage | Denied storage | In-memory/read-only fallback |
| T102 | Native storage | Corrupt prefs | Safe default, no unrelated deletion |
| T103 | Native storage | App-only reset | Unrelated data untouched |
| T104 | Native diagnostics | Sensitive data input | Redacted |
| T105 | Native diagnostics | Log capacity reached | Bounded buffer |
| T106 | Native diagnostics | Export failure | Actual error displayed |
| T107 | Native hardware | Real launch / exit trials | Actual report, not simulated |
| T108 | Native hardware | Suspend/resume where supported | Actual outcome recorded |
| T109 | Native release | Source and artifact provenance | Reviewed hashes and notices |
| T110 | Native release | Hardware missing | No production support claim |

## Hardware execution report template

- Report ID / tester / date / owner authorization confirmation:
- Host release / build commit / catalog revision:
- Console model (actual), exact firmware, browser UA hint and capabilities:
- Network category and test setup (no public IP or credentials):
- Shell start trials: attempted / successful / failed; median / p95 method:
- Repeat open trials: attempted / successful / failed:
- Offline reopen trials: attempted / successful / failed / unsupported:
- Controller navigation trials: attempted / successful / failed:
- Any authorized integration: separate report and evidence ID; not assumed from shell tests:
- Crash/reboot/storage anomalies, error codes, reproduction, mitigations:
- Scope of verified claim, known limitations, tester/QA approval:

All fields blank until real execution. Modern automated browser results are never substituted for this report.


## HYPENET supplemental QA (all pending actual execution)

| ID | Scenario | Required evidence |
|---|---|---|
| NET-QA-001 | Offline host works with API unset | Actual test result or explicit blocker |
| NET-QA-002 | Offline host works with backend down | Actual test result or explicit blocker |
| NET-QA-003 | Invalid TLS fails closed | Actual test result or explicit blocker |
| NET-QA-004 | API timeout does not falsely mark offline | Actual test result or explicit blocker |
| NET-QA-005 | Unsupported browser shows clear limitation | Actual test result or explicit blocker |
| NET-QA-006 | Registration validates input and rate limits | Actual test result or explicit blocker |
| NET-QA-007 | Verification token single use/expiry | Actual test result or explicit blocker |
| NET-QA-008 | Login invalid credentials generic error | Actual test result or explicit blocker |
| NET-QA-009 | Password reset avoids enumeration | Actual test result or explicit blocker |
| NET-QA-010 | Logout and revoke invalidate session | Actual test result or explicit blocker |
| NET-QA-011 | Unauthorized profile change denied | Actual test result or explicit blocker |
| NET-QA-012 | Account deletion follows retention policy | Actual test result or explicit blocker |
| NET-QA-013 | CORS denies unapproved origins | Actual test result or explicit blocker |
| NET-QA-014 | CSRF attempt denied for cookie mutation | Actual test result or explicit blocker |
| NET-QA-015 | Invalid JSON and oversize body rejected | Actual test result or explicit blocker |
| NET-QA-016 | Friend request duplicate handled | Actual test result or explicit blocker |
| NET-QA-017 | Only recipient may accept request | Actual test result or explicit blocker |
| NET-QA-018 | Block suppresses contact/presence | Actual test result or explicit blocker |
| NET-QA-019 | Nonmember message read denied | Actual test result or explicit blocker |
| NET-QA-020 | Nonmember message write denied | Actual test result or explicit blocker |
| NET-QA-021 | XSS string rendered as text | Actual test result or explicit blocker |
| NET-QA-022 | Spam rate limit returns 429 | Actual test result or explicit blocker |
| NET-QA-023 | Reports only visible to authorized moderator | Actual test result or explicit blocker |
| NET-QA-024 | Lobby capacity concurrency enforced | Actual test result or explicit blocker |
| NET-QA-025 | Nonowner lobby close denied | Actual test result or explicit blocker |
| NET-QA-026 | Socket invalid auth denied | Actual test result or explicit blocker |
| NET-QA-027 | Unauthorized subscription denied | Actual test result or explicit blocker |
| NET-QA-028 | Reconnect deduplicates events | Actual test result or explicit blocker |
| NET-QA-029 | Two local original demo clients communicate | Actual test result or explicit blocker |
| NET-QA-030 | Save cross-user access denied | Actual test result or explicit blocker |
| NET-QA-031 | Save quota exceeded rejected | Actual test result or explicit blocker |
| NET-QA-032 | Stale save revision gives 409 | Actual test result or explicit blocker |
| NET-QA-033 | Save deletion and backup retention verified | Actual test result or explicit blocker |
| NET-QA-034 | Catalog unauthorized item not distributed | Actual test result or explicit blocker |
| NET-QA-035 | Health has no secrets | Actual test result or explicit blocker |
| NET-QA-036 | Logs redact token and message content | Actual test result or explicit blocker |
| NET-QA-037 | Production artifact excludes test fixtures | Actual test result or explicit blocker |
| NET-QA-038 | Database backup restored in test | Actual test result or explicit blocker |
| NET-QA-039 | Native unsupported TLS fails closed | Actual test result or explicit blocker |
| NET-QA-040 | Real console network test recorded or blocked | Actual test result or explicit blocker |
| NET-QA-041 | Production deploy blocked without owner authorization | Actual test result or explicit blocker |

## v5.0 independent-first QA additions

| ID | Scenario | Expected evidence |
|---|---|---|
| IND-QA-001 | Independent source/binary/runtime claims separated | Actual executed result with command/evidence or explicit blocker |
| IND-QA-002 | Clean original build contains no GoldHEN dependency | Actual executed result with command/evidence or explicit blocker |
| IND-QA-003 | Owner-reported rights never upgrade unverified state | Actual executed result with command/evidence or explicit blocker |
| IND-QA-004 | Unknown provider unavailable, no fake success | Actual executed result with command/evidence or explicit blocker |
| IND-QA-005 | App file traversal denied | Actual executed result with command/evidence or explicit blocker |
| IND-QA-006 | Symlink escape denied or unsupported filesystem handled | Actual executed result with command/evidence or explicit blocker |
| IND-QA-007 | Oversized app import rejected | Actual executed result with command/evidence or explicit blocker |
| IND-QA-008 | Overwrite requires confirmation | Actual executed result with command/evidence or explicit blocker |
| IND-QA-009 | Atomic save interrupted retains previous valid revision | Actual executed result with command/evidence or explicit blocker |
| IND-QA-010 | Corrupt save rejected | Actual executed result with command/evidence or explicit blocker |
| IND-QA-011 | Extension unknown SDK version rejected | Actual executed result with command/evidence or explicit blocker |
| IND-QA-012 | Extension undeclared permission denied | Actual executed result with command/evidence or explicit blocker |
| IND-QA-013 | Remote executable content rejected | Actual executed result with command/evidence or explicit blocker |
| IND-QA-014 | Bundled sample extension works on portable host | Actual executed result with command/evidence or explicit blocker |
| IND-QA-015 | Theme invalid values safely fall back | Actual executed result with command/evidence or explicit blocker |
| IND-QA-016 | Keyboard/controller navigation and focus restoration | Actual executed result with command/evidence or explicit blocker |
| IND-QA-017 | Signed manifest invalid signature rejected | Actual executed result with command/evidence or explicit blocker |
| IND-QA-018 | Stale update manifest rejected | Actual executed result with command/evidence or explicit blocker |
| IND-QA-019 | Unapproved artifact excluded from store | Actual executed result with command/evidence or explicit blocker |
| IND-QA-020 | Authenticated app-owned transfer works locally | Actual executed result with command/evidence or explicit blocker |
| IND-QA-021 | Transfer unauthorized or expired rejected | Actual executed result with command/evidence or explicit blocker |
| IND-QA-022 | Transfer cannot escape app directory or execute commands | Actual executed result with command/evidence or explicit blocker |
| IND-QA-023 | Native TLS unavailable leaves offline mode usable | Actual executed result with command/evidence or explicit blocker |
| IND-QA-024 | Cloud sync only contains app-owned records | Actual executed result with command/evidence or explicit blocker |
| IND-QA-025 | Two independent local clients exchange original demo state | Actual executed result with command/evidence or explicit blocker |
| IND-QA-026 | Portable test never presented as physical PS4 result | Actual executed result with command/evidence or explicit blocker |
| IND-QA-027 | Enabler objective stays unverified when research only | Actual executed result with command/evidence or explicit blocker |
| IND-QA-028 | Separate release artifacts contain no lab fixtures/private source | Actual executed result with command/evidence or explicit blocker |
| IND-QA-029 | No private permission details in public output | Actual executed result with command/evidence or explicit blocker |
| IND-QA-030 | External publication blocked without approval | Actual executed result with command/evidence or explicit blocker |
| IND-QA-031 | Actual exact-model/firmware scope in hardware report or BLOCKED | Actual executed result with command/evidence or explicit blocker |


---

<!-- RELEASE_GATE.md -->
# HYPEHOSTX — Release Readiness Gate

Target v1.0.0. Initial state: NOT READY. Every item requires evidence; unchecked is not a pass.

## G0 — Owner and scope
- [ ] Owner approves project license and final branding for original code/assets.
- [ ] Owner approves repo and release scope: original information-host or authorized integration release.
- [ ] Owner authorizes actual public deployment.

## G1 — Rights and attribution
- [ ] Actual source inventory and license/permission ledger complete for every published third-party item.
- [ ] Unknown/disallowed rights excluded from dist.
- [ ] Actual component names, versions, authors and notices preserved.
- [ ] No misleading claims of original native HEN or official vendor affiliation.

## G2 — Original host quality
- [ ] All mandatory routes and modules for approved scope work; unavailable integrations truthfully labeled.
- [ ] EN/ID translations, controller/keyboard-oriented UX and safe error states reviewed.
- [ ] No dummy production features, fabricated data or simulate-success paths.
- [ ] Exact firmware validation; unsupported/unknown/conflict handled.
- [ ] Local preferences and diagnostics bounded, scoped and privacy-reviewed.
- [ ] Cache implementation/status matches actual browser capabilities; shell and component status separated.

## G3 — Engineering
- [ ] Lint and schema checks pass; actual reports stored.
- [ ] Unit, integration and automated browser checks pass for scope.
- [ ] Legacy compatibility and nested base path checked on actual artifact.
- [ ] Build budgets measured; exceptions reviewed.
- [ ] Dist allowlist, reproducibility, dependency review, secret scan, asset hashes verified.
- [ ] No S0/S1 defects; documented disposition of remaining issues.

## G4 — Hardware & third-party integration
- [ ] Each verified shell/platform claim has exact-version physical evidence or claim removed.
- [ ] Each verified offline claim has actual offline reopen evidence or claim removed.
- [ ] Each integration claim has explicit rights, verified provenance, actual provider result and hardware evidence; otherwise exclude integration from release scope.
- [ ] Hardware limitations, models tested and sample counts clearly stated.

## G5 — Deployment
- [ ] Approved GitHub Pages workflow and least-privilege permissions reviewed.
- [ ] Actual URL serves reviewed build and expected assets.
- [ ] Release notes, known issues, privacy/security documentation, artifact digests and credits published.
- [ ] Previous reviewed artifact/rollback procedure verified; offline recovery limitations documented.
- [ ] Final owner, engineering and QA decisions recorded (roles may be held by one person, no fabricated signatures).

Decision: BLOCKED / APPROVED FOR ORIGINAL INFORMATION-HOST ONLY / APPROVED FOR AUTHORIZED INTEGRATION SCOPE. Record revision, date, actual evidence and limitations. If mandatory physical evidence is missing, do not claim PS4 verified support or release an unverified integration. No fake launch results, and no automatic publication based solely on CI green.


## G6 — Independent native research release (separate from web)
- [ ] Owner approves native app-only scope and independent license.
- [ ] SDK revision, dependency rights, inventory and provenance approved.
- [ ] Actual portable test/build reports stored; actual native build verified if claimed.
- [ ] Physical hardware permission and documented authorized environment.
- [ ] Actual hardware launch/input/exit and scoped feature evidence.
- [ ] Native version, notices, SBOM, artifact digest and limitations documented.
- [ ] Web dist excludes native/lab output.
- [ ] No unsupported security bypass or claim of independent HEN activation.

Native decision: BLOCKED / RESEARCH BUILD ONLY / APPROVED NATIVE APP RELEASE. This decision is independent of web scope and never authorizes a privileged enabler.


## GN — independent network release
All items initially unchecked. Core offline release need not wait on network readiness.
- [ ] All mandatory NET tests for included features passed with logs; no fabricated hardware or game support.
- [ ] Live/ready state, migration and backup restore verified; resource limits and rollback documented.
- [ ] Authentication, authorization, privacy, report/block, revocation and deletion independently tested.
- [ ] No PSN credentials, official service claims or unauthorized content; approved catalog provenance.
- [ ] External mail, origin, endpoints, operator moderation, hosting and privacy/retention settings approved.
- [ ] Production secrets configured privately, test data absent, HTTPS verified.
- [ ] Native support only advertised for tested hardware and exact firmware.
- [ ] Explicit owner approval before paid infrastructure or public deployment.

## GI — v5.0 independent-first release and research gates
- [ ] Original source and binary independence proved via clean builds, dependency inventory and artifact review; runtime requirements explicitly documented.
- [ ] Every claimed original app-level feature has actual acceptance evidence. SDK/sample, app files/saves, extension isolation and update verification checked if included.
- [ ] Owner-reported permission is documented without treating it as license evidence. Exact upstream grants reviewed before any integration or distribution.
- [ ] Hardware and runtime claims use separate evidence, no extrapolation across firmware/model.
- [ ] HYPEHEN Independent Edition enabler remains RESEARCH / NOT VERIFIED unless a separately approved scope and independent evidence exist; no privileged bypass implementation is a deliverable here.
- [ ] All release artifacts and public documentation carry correct MR.4NONY / NEXORAID identity and upstream attribution; release decisions recorded for web, native app, optional integration, network and enabler objective separately.
- [ ] All included I-series tasks and IND-QA scenarios passed or scope narrowed with owner approval; external blockers kept visible.


---

<!-- EVIDENCE_TEMPLATES.md -->
# Developer evidence and handoff templates

All rows below are blank templates; no test, license or owner approval has been performed.

## Source review ledger
`component ID | upstream name | owner | URL | commit/tag | artifact paths | sizes | SHA-256 | SPDX | license text location | permitted uses | bundled third-party terms | attribution | reviewer/date | decision | risk | evidence path`

## Implementation status
`ticket ID | scope | priority | dependency | status | owner | diff/commit | actual command | actual result | evidence path | blocker | review date`

## Hardware test
`test ID | host/native version | exact firmware | actual hardware/model | authorized environment | catalog/provider version | commit/digest | tester/date | setup | trial count | pass | fail | unexpected outcomes | error codes | evidence | claim allowed`

## Release manifest
`release scope | product version | catalog revision | commit | artifact name | SHA-256 | SBOM reference | rights ledger revision | QA report | hardware evidence | known issues | recovery/rollback | owner decision | release date`

## Architecture decision record
`ADR number | status proposed/accepted/superseded | problem | options | decision | rationale | tradeoffs | owner review | date | evidence`

## Release blockers
`blocker | scope web/provider/native | dependency | reason | effect on product claims | next action | owner | evidence | resolution status`

## Minimum handoff
Original source and reproducible build instructions; exact test commands and outcomes; dependency ledger; asset manifest; localized user docs; privacy and security docs; QA evidence; release gate; known limitations. Unchecked items are not passes. No fake signatures, results, permission, or deployment URLs.


## Network evidence
Record NET ticket/test IDs, commit, API version, test client, environment, command, date, outcome, artifact path, redacted error, limitations and reviewer. For native or public network include actual hardware/TLS or deployment evidence; never substitute desktop tests for those. Record backup/restore outcome and moderation/retention decision separately.

## v5.0 additional templates
- Independence evidence: build revision, exact dependencies, clean environment, source origin, binary provenance, runtime prerequisites, artifact hashes, claim limits, reviewer.
- Permission evidence: owner report, grantor authority, approved artifact/version, action (use/modify/redistribute/rebrand/source access), conditions, dates, evidence pointer held privately, redacted decision.
- Independent enabler research record: required capability, documented public interface, feasibility, risk, hardware authorization, evidence gap, specialist review, go/no-go; do not include exploit instructions or private code.
- Handoff matrix: original web / native user-space / optional provider / HYPENET / independent-enabler objective; status, actual evidence, blockers, next action, authorized release scope.


---

<!-- source-inventory.json -->
```json
{
  "schemaVersion": 2,
  "reviewDate": "2026-11-15",
  "status": "repository_level_review_only",
  "components": [
    {
      "id": "gamerhack",
      "name": "GamerHack host",
      "sourceUrl": "https://github.com/GamerHack/GamerHack.github.io",
      "status": "reference_only",
      "revision": null,
      "files": [],
      "distributionApproved": false,
      "hardwareVerified": false
    },
    {
      "id": "goldhen",
      "name": "GoldHEN",
      "sourceUrl": "https://github.com/GoldHEN/GoldHEN",
      "status": "owner_reported_permission_scope_unverified",
      "revision": null,
      "files": [],
      "distributionApproved": false,
      "hardwareVerified": false
    },
    {
      "id": "sdk",
      "name": "GoldHEN Plugin SDK",
      "sourceUrl": "https://github.com/GoldHEN/GoldHEN_Plugins_SDK",
      "status": "license_review_required",
      "revision": null,
      "files": [],
      "distributionApproved": false,
      "hardwareVerified": false
    },
    {
      "id": "openorbis",
      "name": "OpenOrbis PS4 Toolchain",
      "sourceUrl": "https://github.com/OpenOrbis/OpenOrbis-PS4-Toolchain",
      "status": "license_review_required",
      "revision": null,
      "files": [],
      "distributionApproved": false,
      "hardwareVerified": false
    },
    {
      "id": "mira",
      "name": "Mira Project",
      "sourceUrl": "https://github.com/OpenOrbis/mira-project",
      "status": "reference_only_license_review_required",
      "revision": null,
      "files": [],
      "distributionApproved": false,
      "hardwareVerified": false
    },
    {
      "id": "mira-archive",
      "name": "Mira Project Archive",
      "sourceUrl": "https://github.com/OpenOrbis/mira-project-archive",
      "status": "reference_only_license_review_required",
      "revision": null,
      "files": [],
      "distributionApproved": false,
      "hardwareVerified": false
    }
  ],
  "ownerStatement": {
    "permission": "owner_reported_scope_unverified",
    "discordMembership": "owner_reported",
    "privateGoldHENSource": "not_received"
  }
}
```