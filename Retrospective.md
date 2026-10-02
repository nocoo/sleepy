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
