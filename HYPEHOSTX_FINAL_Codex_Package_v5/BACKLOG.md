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
