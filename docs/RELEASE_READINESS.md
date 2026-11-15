# Release readiness — 2026-11-15

**Website and local upstream integration package prepared; universal native HEN operation is not certified.**

Included: bilingual portal, all original interface modules, local PS3HEN/GamerHack/UMTX2 routes, GoldHEN and etaHEN payload files, source archives/notices, exact source-linked firmware records, offline original-site cache, automated checks and a deployable root ZIP.

Remaining blockers for an operational public console release:

1. No physical PS3, PS4 or PS5 was tested. The owner requested repository-listed versions but supplied no tested devices/firmwares. Browser tests cannot establish native activation, controller behavior, TLS access, payload stability or model support.
2. PS3 local installer native code can request the final PKG from PS3Xploit. That dependency and complete install/reboot/enable cycle remain unverified. The package does not silently patch native code or claim a fully offline install.
3. PS5 UMTX2 covers 29 imported offsets (1.00–5.50). Relapse adds 33 exact offsets (7.00–13.60) and an ELF loader, requiring separate payload sending. Firmware 6.00, 6.02, 6.50 and 9.05 appears in etaHEN source but has no matching bundled host: launch is disabled for those records. Host availability does not prove etaHEN compatibility, particularly newer firmware. 2.5B is a manual choice, not an asserted upgrade of the original UMTX2 pairing.
4. GoldHEN permission is owner-asserted and accepted for this integration. No private source is possessed. Separate GamerHack/other component redistribution terms and the original portal's public license are not independently established.
5. Production deployment is not performed/verified. Workspace has no Git metadata. Branch/root Pages settings and CI are prepared; no account changes, push or publication occurred.

Desktop checks prove web behavior, routes, data and package integrity only. Supported repository routes are distinguishable from hardware results in the firmware database. No PSN, anti-ban or all-firmware promise is made.

The newest direct owner instructions supersede the pasted directive's earlier exclusion of active components. The supplied PDF is reference material; its appendix is not independent authorization for deployment.
