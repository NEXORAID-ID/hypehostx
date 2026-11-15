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
