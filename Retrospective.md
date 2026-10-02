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
