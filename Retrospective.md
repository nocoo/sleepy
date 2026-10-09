# Retrospective

## 2026-10-02 — Inspect generated lint configuration

During initial setup, `biome migrate --write` changed the deprecated
`recommended: true` setting to `preset: "none"`. This would have disabled the
intended lint rules. Inspection caught the change before the first application
commit. The configuration now explicitly uses `preset: "recommended"`; the full
lint check is rerun after the correction. Treat configuration migrations as code
changes: inspect the resulting policy, not only the successful exit status.

## 2026-10-02 — Inspect rendered SVG, not just JSX types

The first Chromium screenshots showed opaque black mountains despite passing
typecheck and build. Preact emitted camel-case `stopColor` and `stopOpacity`
attributes unchanged; SVG ignored them and used black with full opacity. Inspecting
the actual DOM and computed stop styles confirmed the cause. Use SVG's native
`stop-color`, `stop-opacity`, and `stroke-opacity` attributes, and retain a browser
regression check for the computed gradient color and opacity.

## 2026-10-02 — Persist preferences before a possible reload

Browser tests caught favorites and theme choices being lost when the page was
reloaded immediately after a click. Persistence had been deferred to an effect.
Reading commands now persist the next validated state synchronously. Keyboard
listeners also update during layout, so rapid sequential keys cannot use a stale
poem index. Regression checks retain both immediate reload and consecutive keys.

## 2026-10-02 — Verify WebKit interaction and offline behavior directly

WebKit does not focus a button merely because it was clicked. Modal openers now
explicitly focus their trigger, and the dialog manages the Tab sequence and return
focus. Chromium-only assumptions had missed this difference.

WebKit's forced-offline protocol also returned internal errors for every cached
request. Closing an isolated actual origin proved the generated worker could serve
the collection and font without a server. The regression suite preserves this
method and labels it as origin-outage testing, not physical-device airplane mode.

## 2026-10-02 — Do not cache missing assets for a year

A broad `/assets/*` immutable header also applied to 404 responses. The build now
emits immutable headers only for the exact hashed assets it produced, with a
revalidation default for all other paths. Tests check both the 404 status and its
cache header, rather than only checking that the application shell is absent.

## 2026-10-02 — Keep update consent per window

Independent review reproduced a cross-window interruption: one tab postponed an
update, but another tab activating it still triggered the library's default reload
in the first tab. The app now uses the library's `onNeedReload` callback to reload
only a window that requested it. A window with an already activated update can
refresh later through About. Two-window Chromium and WebKit checks assert that
quiet mode, the current document, and scroll position survive another tab's update.

## 2026-10-02 — Put modal feedback in the top layer

Independent review found that the application's visible toast was behind a native
modal dialog. The dialog's hidden live region announced clipboard results but gave
sighted readers no visible confirmation or failure guidance. Dialogs now render
their own visible status footer in the top layer. Browser tests exercise both
clipboard success and permission denial and assert that feedback is in the viewport.

## 2026-10-02 — Mount a live region before changing its text

The visible dialog feedback fix initially created its status node only when there
was a message. Independent native accessibility-event inspection showed creation
without the change event needed by some screen readers. The status node now stays
mounted, with an empty state hidden only visually, and uses explicit polite/atomic
semantics. Regression checks assert that the empty live region exists first and
the same DOM node receives the successful or denied clipboard result.

## 2026-10-02 — Verify browser-specific edge transformations

The first production checks found Cloudflare automatically injecting its analytics
beacon into browser HTML responses, although a plain HTTP fetch matched the build.
The CSP blocked the beacon from executing. Following Cloudflare's documented
opt-out, HTML responses now use `public, no-cache, no-transform`. This changes only
Sleepy's asset headers; no shared zone analytics configuration was changed. Checks
cover the header and production browser response bytes, as well as external requests.

## 2026-10-09 - Recheck the narrowest header after onboarding

Adding a Hexly header action caused two pixels of horizontal overflow at 320px.
The existing all-poems browser journey caught it in Chromium and WebKit. Keep
44px action targets and reduce the narrow header's inter-group gap instead of
clipping overflow or hiding the new action. Run the full narrow journey after
adding any header control, not only the default mobile viewport.

## 2026-10-09 - Test hover content beyond its trigger

Independent review caught header tooltips disappearing when the pointer moved
from their trigger into the text. Remove the dead gap, keep the tooltip in the
trigger's hover region and provide Escape dismissal without moving focus.
Browser regression tests must move a real pointer into the tooltip; a static
accessibility scan does not exercise this interaction.

## 2026-10-09 - Wait for image decoding in brand tests

The new About-logo test read `naturalWidth` immediately after visibility and
failed in the Chromium mobile viewport before the image finished loading.
Visibility proves layout, not image readiness. Poll the decoded width before
asserting the asset dimensions; retain the same assertion in every browser.

## 2026-10-09 - Do not append duplicate preview flags

The preview script already sets `--port 4173`; appending `--port 4174` made
Wrangler reject two values instead of overriding the port. Inspect the package
script first and invoke the installed CLI directly when selecting another port.

## 2026-10-09 - Budget mobile header width across platforms

Linux WebKit CI exposed header overflow that macOS browser runs did not reproduce.
The brand and five controls cannot reliably share a 320px row while preserving
44px targets and page gutters. Give mobile tools their own compact row instead
of relying on platform-specific flex shrinking, hiding controls, or clipping
the document. Keep Linux CI as an independent release gate.
