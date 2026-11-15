# Module responsibilities

Logical modules use small ES5 files rather than framework bundles.

| Module | Implementation |
|---|---|
| HYPECORE | `assets/app.js`: local state, safe storage, initialization |
| HYPEUI | `assets/style.css`, `assets/cyber.css`, original SVGs, pre-rendered pages |
| HYPEHEN 3/4/5 | Platform pages and Indonesian equivalents; executable release status |
| HYPEDETECT | `app.js` console hint; `modules.js` firmware hint |
| HYPECOMPAT | Exact platform/version/type lookup in `assets/data.js`; evidence table |
| HYPEPAYLOAD | Searchable catalog; local upstream host links and PS5 etaHEN payload menu |
| HYPECACHE | `sw.js`, manifest, cache controls |
| HYPEGUARD | SHA-256 checks, CSP, safe text insertion, scoped cache operations |
| HYPESYSTEM | Browser capabilities and viewport |
| HYPEDIAG | Local report, refresh, clear, copy/manual-copy fallback |
| HYPERECOVERY | Preference reset and host-cache removal |
| HYPEUPDATE | Version/review metadata, changelog |
| HYPELAB | Capability checks and release blockers |

No HEN detection, PSN state, hardware model, free memory or anti-ban status is fabricated. User-agent hints can be spoofed. Unknown firmware means no exact evidence, not unsupported.

Legacy path: ES5 scripts, inline-block CSS fallbacks, local font stacks, links and pre-rendered translations. Modern service worker is only loaded through a feature-detected API, never as a normal script. Animation automatically stops for console UAs. Keyboard direction navigation is implemented; physical controller behavior is unverified.

The PDF's suggested file split is represented by logical modules above; existing compact structure avoids unnecessary requests. No runtime locale fetch is required.
