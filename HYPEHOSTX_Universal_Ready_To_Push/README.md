# HYPEHOSTX · Universal Edition
**Unlock Beyond Limits.** Developed by **MR.4NONY** · Powered by **NEXORAID**.

Original static website for PlayStation 3, 4 and 5 homebrew reference information. HYPEHEN 3/4/5 are original interface labels, not renamed upstream engines. The package contains no HEN binary, exploit, installer or firmware modification. Online means web access, not PSN. Offline caching (when supported) covers only original site assets.

## Quick start (Windows / Linux / macOS)

The `dist/` directory already contains the generated site. Python 3.10+ and Node 20+ are used only for development/testing; no frontend runtime libraries or server database are required.

```sh
python -m http.server 8080 --directory dist
```

Open http://localhost:8080/ in a browser. Stop with Ctrl+C. No npm install is required for build/static tests. Use an HTTPS deployment or localhost for optional service worker caching; an ordinary LAN HTTP URL may not allow it. Do not expose the temporary Python server to the public internet.

```sh
python scripts/build.py
python tests/check.py
node tests/unit.js
# Optional actual browser integration tests:
pip install -r requirements-test.txt
python -m playwright install chromium
python tests/browser.py
```

## Publish to the official repository

1. Clone `https://github.com/NEXORAID-ID/hypehostx.git` (or use the existing working copy). Extract this ZIP's top-level files into the clone, keeping its `.git` directory. Review existing files before replacing them.
2. Run build/tests above. Review `git status` and `git diff`.
3. In GitHub: Settings → Pages → Build and deployment → Source → GitHub Actions. Confirm Actions and Pages are enabled for the organization.
4. Commit and push the reviewed source and `dist/`:

```sh
git add .
git commit -m "feat: initialize HYPEHOSTX Universal Edition"
git push -u origin main
```

If the local branch is not `main`, inspect the branch and remote before pushing. Do not force-push. The Pages workflow deploys only after validation and real browser tests pass. Check the Actions run and the GitHub Pages URL. Expected URL: https://nexoraid-id.github.io/hypehostx/ (not yet verified live). If the workflow fails, inspect the log, correct the error, rerun tests and push a fix. To roll back, revert the relevant commit and allow the same pipeline to rebuild/redeploy.

## Structure

- `src/assets/`: original CSS, JavaScript and illustrations.
- `src/data.json`: exact upstream reference records and catalog.
- `src/sw.template.js`: optional modern service worker, verifies asset SHA-256 at installation.
- `scripts/build.py`: bilingual static page generator and versioned asset manifest.
- `dist/`: pre-generated site; do not hand-edit, rebuild from source.
- `tests/`: static validation, Node VM fixture tests, Playwright integration tests.
- `.github/workflows/`: CI and Pages deployment.
- `docs/`, `reports/`: architectural notes, evidence and limitations.

## Status and limitations

32 HTML files (16 per language, including 404). Original interface, local settings, catalog filtering, diagnostics and exact compatibility checker implemented. PS3 firmware records and three historical PS4 binary filename references are informational; not console compatibility or installation results. No exact PS5 records are asserted. Actual console browser/controller testing and end-to-end offline browser validation are outstanding. A browser automation attempt was blocked by the managed browser policy of the build environment (see report). CI includes a browser test to run independently. Do not advertise HEN activation or claim all console firmware is supported. The original project license remains subject to owner approval (see LICENSE.md).
