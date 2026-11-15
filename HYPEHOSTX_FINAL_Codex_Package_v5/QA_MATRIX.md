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
