# Local host usage and limits

Open HYPEHOSTX on the intended console, select its platform and exact system firmware, then check the record. The result describes repository evidence, not a successful install. The local host button follows the matched record. Do not select a different version to bypass a missing route.

| Platform | Local entry | What happens next |
|---|---|---|
| PS3 | `vendor/ps3hen/index.html` | Original PS3HEN offline-local installer selects its CEX/DEX theme file. Follow the upstream page. The native stage can download a final PKG from PS3Xploit; internet and upstream availability may still be required. |
| PS4 | `vendor/gamerhack/index.html` | Original GamerHack firmware menu; the platform checker can select the corresponding multi-firmware or 6.72 route. Its own requirements and legacy cache behavior apply. |
| PS5 1.00–5.50 listed offsets | `vendor/ps5/index.html` | UMTX2 host and ELF loader with etaHEN payload menu. 2.4B preserves the imported pairing; 2.5B is a separate manual selection. |
| PS5 7.00–13.60 listed offsets | `vendor/ps5-relapse/index.html` | Relapse launches its ELF loader. It does not automatically load etaHEN. Use the separately supplied upstream sender and payload only after verifying payload support for the exact firmware. |

For the Relapse payload step, download `vendor/ps5/send_payload.ps1` and the selected etaHEN binary to a Windows computer on the console's LAN. Follow the [etaHEN upstream sender instructions](https://github.com/etaHEN/etaHEN#payload-powershell-script-usage-for-windows-send_payloadps1), using the actual console IP and loader port (Relapse README specifies 9021). GitHub Pages cannot originate a raw TCP connection to the console, and HYPEHOSTX does not pretend to send one.

PS5 6.00, 6.02, 6.50 and 9.05 have etaHEN source-only records but no matching bundled WebKit host. Their checked local-launch button is disabled. Later firmware/model labels are not a guarantee of payload support. A console's body style alone cannot select a compatible exploit.

Original-site offline cache is separate from upstream AppCache. The recovery page clears HYPEHOSTX's service worker/cache only; use the console browser's own controls for upstream AppCache. Never interpret a cached page, browser status or animation as native activation.

GitHub Pages runs on HTTPS. Legacy console TLS/browser behavior must be tested on the actual device. If the console cannot open Pages, serve the same static folder on a trusted LAN for testing using an ordinary static HTTP server; this does not add a production backend. No PSN or anti-ban claim is made.
