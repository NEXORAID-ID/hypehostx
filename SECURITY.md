# Security

There is no supported public release yet. Do not expose the development server or mail sink to the Internet. Report a vulnerability privately through the repository's private vulnerability reporting feature if the owner enables it; no private contact address has been invented. Public reports must omit credentials, personal messages, tokens and private grants.

Threat boundaries: untrusted browser/storage/metadata, application-owned files, authenticated API objects, upstream licensing, release artifacts and offline stale metadata. Text-only DOM rendering, CSP, allowlisted links, body limits, parameterized SQL, token hashing and authorization checks address parts of these boundaries. No claim of complete security is made.

Open release concerns include filesystem race/reparse handling, production mail delivery and retry, distributed rate limits, durable event replay, comprehensive concurrency testing, production PostgreSQL/TLS validation and exact hardware support. Signed metadata verification in HYPEKIT is not yet a complete native updater. See release readiness and the QA ledger.
