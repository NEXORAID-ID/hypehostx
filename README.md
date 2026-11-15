# HYPEHOSTX — Universal Cyber Edition

**Unlock Beyond Limits.** Version 1.0.0. Developer: **MR.4NONY**. Publisher: **NEXORAID**.

Static, bilingual PlayStation homebrew portal with local upstream host components for PS3, PS4 and PS5. HYPEHEN 3/4/5 are interface brands; PS3HEN, GoldHEN and etaHEN retain their identities. Following the owner's latest explicit instruction, upstream executable components are included separately under `vendor/`; they are not newly developed HEN engines. Native installation and activation have **not** been tested on hardware.

## Run locally

From this directory:

```sh
python -m http.server 8080 --bind 127.0.0.1
```

Open `http://127.0.0.1:8080/` or `/id/`. There is no production build step, npm dependency, database or backend. `index.html` and the page folders are the deployable source. HTTPS or localhost is required for optional service-worker caching; legacy browsers still get ordinary navigation and reference pages.

## Features

- PS3 offline-local installer with 16 firmware theme files; its native stage may still fetch the final PKG from PS3Xploit.
- GamerHack host snapshot with its firmware-specific routes and GoldHEN binaries; owner states GoldHEN permission has been obtained.
- PS5 UMTX2 with 29 exact offsets (1.00–5.50), etaHEN 2.4B pairing and separate 2.5B option. Relapse adds 33 exact host offsets (7.00–13.60) and an ELF loader; its etaHEN payload must be sent separately with the provided upstream sender. Host coverage is not payload compatibility.
- 121 evidence records across the three platforms. Four PS5 source-only entries (6.00, 6.02, 6.50, 9.05) deliberately have no local launch route because neither bundled host supplies a matching offset.
- Exact firmware reference checker, manual input, user-agent hints (never hardware proof).
- Original local SVG branding, PS3/PS4/PS5 wordmarks, restrained radar and navigation motion.
- Crimson and Terminal Green themes, reduced motion, automatic lightweight console mode, larger text, remembered firmware.
- English/Indonesian pages, keyboard directional navigation and large focus targets.
- Component catalog, diagnostics, system capabilities, recovery and HYPELAB.
- Opt-in cache with SHA-256 installation/verification and scope-specific removal. Only original website assets are cached.

## Validate and package

Python 3.10+ and Node.js are development tools only. Browser tests additionally require Playwright:

```sh
python -m pip install -r requirements-test.txt
python -m playwright install chromium
python scripts/package.py
python tests/check.py
python tests/vendor.py
python tests/browser.py
```

After any site asset changes, run `scripts/package.py` to regenerate `manifest.json` and the service-worker revision. The same command writes `release/HYPEHOSTX-Universal-Cyber-1.0.0.zip`. Tests mount the real `/hypehostx/` path using an ephemeral localhost server. Browser screenshots and results are temporary outputs in `.qa/` and are excluded from the package.

After intentionally changing vendor files, regenerate their separate inventory with `python scripts/vendor_manifest.py`. Do not change executable bytes merely to satisfy a hash check. `vendor/sources/` contains corresponding upstream snapshots; preserve them and license notices when redistributing. Local upstream hosts are opened only by explicit navigation. The original-site service worker does not intercept or cache vendor files; upstream AppCache is a separate legacy mechanism, unverified on console hardware.

## GitHub Pages

Target repository: [NEXORAID-ID/hypehostx](https://github.com/NEXORAID-ID/hypehostx).

1. Extract the ZIP into the repository root; keep `.nojekyll`.
2. Review and commit the files to `main`.
3. Settings → Pages → Deploy from a branch → `main` → `/(root)`.
4. Verify `https://nexoraid-id.github.io/hypehostx/`, Indonesian pages, local assets and optional cache after deployment.

The included Actions workflow validates the site; Pages remains branch-based. No remote push or live deployment was performed. This workspace was not a Git checkout. See [release readiness](docs/RELEASE_READINESS.md) before describing this as an operational HEN host.

## Structure

`assets/app.js` manages preferences, compatibility, diagnostics and cache. `assets/modules.js` adds detection, system information, lab checks and keyboard navigation. `assets/data.js` is the ES5-compatible embedded database; `compatibility/firmware.json` is its readable data equivalent. `assets/style.css` preserves legacy layout fallbacks and `assets/cyber.css` supplies theme/motion. Translations are pre-rendered HTML, including no-JavaScript fallback.

See [upstream audit](docs/UPSTREAM.md), [module map](docs/ARCHITECTURE.md), [security](SECURITY.md), [license status](LICENSE), [test results](TEST_REPORT.md), and [changelog](CHANGELOG.md).
