# Upstream audit — 2026-11-15

| Project | Evidence | Distribution decision |
|---|---|---|
| PS3HEN | [Repository](https://github.com/PS3Xploit/PS3HEN), [GPL-3.0 license](https://github.com/PS3Xploit/PS3HEN/blob/master/LICENSE.txt); reviewed commit `6c529455261db97a0f9028fe96db522a97fd5ccc`. README identifies 3.6.0 and exact OFW/HFW CEX/DEX records. | Reference only; no source or payload redistributed. |
| GamerHack | [Repository](https://github.com/GamerHack/GamerHack.github.io); commit `5bc701d626331ce75f25d02514226324bf575a65`. Firmware-first menu and separate host pages informed navigation architecture. No repository-wide license identified in snapshot. | Original presentation; no copied host/binaries in release. |
| GoldHEN | [Repository](https://github.com/GoldHEN/GoldHEN). Public binary listing supports three historical 2.3 reference records, not an exhaustive current firmware matrix. No repository-wide license identified by GitHub metadata. | No private core source possessed. Owner reports community contact; no written scope, redistribution grant or endorsement supplied or verified. No permission inferred. |
| etaHEN | [Repository/README](https://github.com/etaHEN/etaHEN). Source identified under GPLv3; external PS5 hosts referenced. | Reference only. Host compatibility is not automatically payload compatibility. No unsupported exact PS5 firmware claims added. |

## Final integration decision (supersedes distribution decisions above)

The owner explicitly replaced the earlier exclusion with authorization to integrate local upstream installers for repository-listed firmware, and stated that GoldHEN permission was already obtained. PS3HEN offline-local, GamerHack and UMTX2/etaHEN are now bundled separately under `vendor/`. The table above records the earlier audit findings, not the final package contents. Exact final commits, modifications, source archives, license files and permission limitations are documented in [vendor notices](../vendor/NOTICE.md) and [inventory](../vendor/manifest.json).

UMTX2 is Unlicense; its nested PSFree retains AGPLv3. etaHEN 2.4B exact-source archive and 2.5B current-source archive are included. No private GoldHEN source is possessed. GoldHEN permission is owner-asserted, not independently verified, and is not represented as blanket permission for unrelated code. No exploit/payload was executed during tests. PS3 final native PKG downloading remains an external dependency.

Upstream sites are explicit external navigation. Availability and requirements may change; their content is not cached. PS3Xploit root returned HTTP 403 to research fetch, so hardware reachability is not certified.

Hardware variants are target labels (PS3 Fat/Slim/Super Slim, PS4 Fat/Slim/Pro, PS5 Original/Slim/Pro), not installer support claims. Database records identify evidence and `hardware: not-tested`.

The final PS5 integration additionally uses [ntfargo/Relapse-Exploit](https://github.com/ntfargo/Relapse-Exploit), MIT, pinned in the vendor inventory. Its README lists 7.00–13.60; the database enumerates only existing offset filenames, not every numeric value in the interval. etaHEN source constants outside UMTX2/Relapse coverage are recorded as source-only with no local launch target. `vendor/NOTICE.md` describes the separate payload-sending requirement.
