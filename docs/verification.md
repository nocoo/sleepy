# Verification

## Toolchain

Verified locally on 2026-10-02: Node 26.9.0, Bun 1.4.0, TypeScript **7.0.2**, Vite
8.3.1, Biome 2.5.14, Wrangler 4.139.0, and Playwright 1.63.0. All package versions
are pinned. Initial installation downloaded and installed the dependencies;
subsequent frozen-lockfile installation also passed.

`bunx tsc --version` returned `Version 7.0.2`. This is the stable `typescript`
package, not `@typescript/native-preview`. The [official announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
and [v7.0.2 release](https://github.com/microsoft/TypeScript/releases/tag/v7.0.2)
were checked. Vite transpiles TS/TSX independently; the native TypeScript compiler
actually typechecks application, build configuration, and browser tests.

Workers compatibility is pinned to **2026-09-30**, the date supported by the
installed runtime. A newer compatibility date initially failed local startup;
no application behavior depends on unverified newer flags.

## Browser checks

The pre-release suite passed **59 checks**, with **one explicit platform skip**.
It uses real Chromium 153 and WebKit 26.6 engines in isolated browser contexts:

| Project | Viewport | Mode |
| --- | --- | --- |
| Chromium desktop | 1440 × 960 | Browser automation |
| Chromium mobile | 390 × 844 | Touch/device emulation |
| WebKit mobile | 390 × 844 | iPhone viewport/device emulation |

Checks cover both themes and system preference, all 30 poems at 320 px with larger
type, long-poem scrolling, favorites and immediate reload, search, keyboard
navigation, modal focus and restoration, reduced motion, unavailable storage,
source/excerpt labels, visible clipboard success/denial feedback, and Axe checks
on light/dark/library views.

PWA checks cover manifest fields, icon dimensions, local font, response headers,
offline reload and navigation, unknown-resource 404 responses before and after
service-worker control, and a real waiting-worker update that requires an explicit
refresh while preserving the poem and favorite. Two-window tests also prove that
a reader who postponed an update retains their document, quiet mode, and scroll
position when the other window updates, until they explicitly choose to refresh.

Chromium receives **synthetic** `env(safe-area-inset-*)` values through CDP: portrait
47 px top / 34 px bottom, landscape 47 px left/right / 21 px bottom. Bounds and
padding are asserted, and screenshots are saved. The equivalent CDP check is
explicitly skipped in WebKit, which does not expose that Chromium protocol.

### Offline methods

Chromium uses `BrowserContext.setOffline(true)` and actually reloads the page.
On this macOS WebKit build, that protocol setting caused internal browser errors
even for already cached assets. The WebKit test instead serves the exact `dist`
from an isolated loopback fixture, installs the real generated worker, **closes
the origin server**, and then reloads, browses the collection, loads the font, and
changes theme using cached assets. The fixture has no SPA fallback and is never
deployed. This proves operation without the origin; it does not claim an actual
iPhone airplane-mode test.

### Physical device boundary

No physical iPhone or Android device was available in this run. Safari's actual
address-bar animation, hardware notch, OS status bar, and Home Screen installation
are not represented as physical-device passes. The product does not claim that
ordinary Safari can be forced to hide its system UI.

## Reproduction and release evidence

```sh
bun run check
bun run test:e2e
```

The browser suite runs against `wrangler dev`, including Cloudflare's static-asset
routing and `_headers` behavior. Its JSON report is `artifacts/playwright-results.json`;
screenshots and failure traces are in `test-results`. CI uploads these for its exact
commit. Set `E2E_BASE_URL=https://sleepy.hexly.ai` to run applicable checks against
production; the update and WebKit origin-outage fixtures remain isolated locally.

Publication requires independent Codex sign-off, successful exact-revision CI,
and `node scripts/deploy.mjs --check`. The deployment embeds the same source SHA
in `/release.json`, the About view, and Worker version annotations. Production
HTTPS responses, assets, manifest, service worker, cache policy, and screenshots
are checked after deployment and reported separately from local evidence.
