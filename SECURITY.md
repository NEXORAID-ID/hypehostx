# Security and privacy

No accounts, credentials, analytics, backend or telemetry. Preferences stay in local storage. Diagnostics are generated locally and copied only on request.

CSP restricts scripts to local files and disallows objects, forms and base injection. External links navigate away explicitly. User input is inserted as text, not HTML. Do not paste secrets into reports or public issues.

Cache installation and verification compare original assets to SHA-256 hashes. These detect corruption relative to the deployed manifest, not malicious replacement of both manifest and files. Cache names include the site scope; recovery affects only the original site's worker/cache. Vendor files are excluded from HYPECACHE and use separate upstream AppCache where supported. Their inventory is validated by `tests/vendor.py`.

Report website issues to the repository owner; no private disclosure channel is configured. Unknown capabilities remain unavailable/unknown states. Upstream hosts execute console code after explicit navigation/actions. The portal's restrictive CSP does not apply to those separate upstream documents. Tests verify paths and hashes without executing native exploit flows. Real-device compatibility, native dependencies and permission scope must still be reviewed before release.
