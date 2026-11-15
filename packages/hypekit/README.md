# HYPEKIT SDK 1

`sample.cpp` compiles with the portable native library. Extensions are bundled, reviewed C++ callbacks/metadata with explicit `app.info` and `app.log` permissions; they are not a sandbox for untrusted code. There is no remote dynamic library or executable loader. Unsupported SDK version and undeclared capabilities fail closed.

`manifest.cjs` verifies Ed25519 signatures over exact base64-decoded payload bytes using an externally pinned trusted public key. Payload schema includes version, createdAt, expiresAt, increasing sequence and approved artifact descriptors. Persist the highest accepted sequence in trusted app settings when integrating it; callers must pass that minimum. Tests generate ephemeral signing keys only. The library does not install updates or alter firmware.

`transfer.cjs` exposes `startTransfer({root,ttlMs,maxBytes})`, returning `{url,token,expiresAt,stop}`. It listens on 127.0.0.1 only; authenticated GET/PUT supports flat `.json`, `.txt`, `.sav` app files. PUT never overwrites an existing file. No command channel, path browsing or executable transfer. Keep the token private and call `stop()` after use. This assumes a private directory not modified by hostile concurrent OS processes; full native race hardening is pending.

Portable source, shared contracts and local tests do not establish native PS4 SDK compatibility. See root README for build/test commands.
