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
