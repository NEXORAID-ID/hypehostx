# HYPEHOSTX

**Unlock Beyond Limits.** Developed by MR.4NONY · Powered by NEXORAID.

Target: 1.0.0. Current source/build version: **0.1.0-dev**, not a stable release.
Canonical repository: `NEXORAID-ID/hypehostx`. Static base path: `/hypehostx/`.
The authoritative requirements are in `HYPEHOSTX_MASTER_PROMPT_ALL_IN_ONE_v5_2.md`.

The repository now contains an original offline information host, a portable Windows C++ application, an optional local network service and SDK tools. **It does not activate GoldHEN, implement a WebKit exploit, or establish PS4 firmware support.** All firmware/model claims remain unverified. No private GoldHEN source or binaries are used.

## Run locally

Node 24.15.0 and npm 11.12.1 were used. Install locked dependencies with `npm ci`.

```sh
npm run build
npm run dev
```

Open `http://127.0.0.1:4173/hypehostx/`. Build output is `dist/web/`; edit `src/`, not generated files. Opening the HTML with `file://` does not provide service-worker offline support.

```sh
npm run dev:network
```

Open `http://127.0.0.1:3000/`. This optional development service uses persistent PGlite PostgreSQL and a private local mail sink under `backend/data/mail/`. Verification tokens stay in ignored local files; never publish that directory. No real email is sent. Login tokens stay in browser memory and expire after one hour; reloading signs the UI out. This is not a public service or PSN integration.

```sh
npm run test:native
npm run test:native:asan
```

On this Windows machine the native runner discovers installed Visual Studio 2026 Build Tools. Elsewhere provide CMake and a C++17 compiler on PATH. The interactive executable is `native/build/Debug/hypehen.exe`. Its optional first argument is the app-owned storage directory. Portable tests do not prove console execution. Native SDK sample: `native/build/Debug/hypekit_sample.exe`.

## Verify

```sh
npm test
npm run build:backend
npm run test:network
npx playwright install chromium webkit
npm run test:browser
npm run test:browser:webkit
npm run test:web-negative
npm run test:web-negative:webkit
npm run test:a11y
npm run verify:dist
npm audit
npm run audit:local
```

Playwright WebKit runs on desktop and does not certify the PS4 browser or hardware behavior.

`npm run test:online-browser` requires the local network server running. Tests create local test accounts and remove those accounts after a successful UI flow. Private test mail remains in the ignored local sink.

See [implementation status](IMPLEMENTATION_STATUS.md), [release review](docs/release-readiness.md), [architecture](docs/architecture.md), [API contracts](packages/contracts/openapi.json), [security](SECURITY.md) and [rights ledger](docs/rights.md).

No push, publication, license approval or hardware test is implied by this implementation. Original code licensing awaits the owner's decision; included third-party material retains its own license.
