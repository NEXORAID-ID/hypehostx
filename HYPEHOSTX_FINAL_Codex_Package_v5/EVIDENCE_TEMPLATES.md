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
