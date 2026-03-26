---
"@m3000/market": patch
---

Harden the published package by shipping only `dist` artifacts, removing story exports and raw `src`
files from npm, generating the bundled `styles.css` in `dist`, and adding package metadata plus a
README for npm consumers.
