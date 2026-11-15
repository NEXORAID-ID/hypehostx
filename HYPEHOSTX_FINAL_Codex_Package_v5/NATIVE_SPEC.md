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
