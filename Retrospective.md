# Retrospective

## 2026-10-02 — Inspect generated lint configuration

During initial setup, `biome migrate --write` changed the deprecated
`recommended: true` setting to `preset: "none"`. This would have disabled the
intended lint rules. Inspection caught the change before the first application
commit. The configuration now explicitly uses `preset: "recommended"`; the full
lint check is rerun after the correction. Treat configuration migrations as code
changes: inspect the resulting policy, not only the successful exit status.
