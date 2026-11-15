# Third-party notices

Native metadata parsing includes nlohmann/json 3.12.0. The complete license is preserved in `native/third_party/nlohmann/LICENSE.MIT`; the single header preserves embedded notices. See `docs/rights.md` for pinned provenance and digests.

Node build/backend/test dependencies are pinned in `package-lock.json`. Their license identifiers and integrity references are generated into `artifacts/sbom.cdx.json` using npm SBOM. Installed package license files remain in their packages. Static `dist/web` contains none of these packages. A release requires final per-artifact dependency/license review; the SBOM alone is not approval.
