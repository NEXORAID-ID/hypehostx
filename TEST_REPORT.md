# Cyber Edition verification

Latest local verification:

- `python scripts/package.py`: passed; release ZIP and asset manifest generated.
- `python tests/check.py`: passed; 35 HTML pages, local links/assets, unique IDs, 50 SHA-256 entries and JavaScript syntax.
- `python tests/vendor.py`: passed; 446 vendor hashes/sizes, AppCache paths, platform routes and selected payload dependencies. No native execution tested.
- `python tests/browser.py`: passed all 12 check groups, including bilingual routes, desktop/mobile layouts, offline cache, recovery, no-JavaScript fallback and no uncaught JavaScript errors.

The browser suite uses desktop Chromium, including a simulated PS3 user-agent. This is not a physical PlayStation test and does not establish native activation, controller behavior, firmware support or payload compatibility. Public deployment has not been performed. See [release readiness](docs/RELEASE_READINESS.md).
