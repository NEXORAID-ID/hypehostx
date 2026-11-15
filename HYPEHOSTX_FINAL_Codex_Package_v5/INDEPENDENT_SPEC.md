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
