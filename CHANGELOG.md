# Changelog

## v1.1.0 - 2026-10-09

- Adopt the approved book identity in the header, About panel, README, browser
  favicons, and installable PWA icons; preserve source artwork and provenance.
- Add a Hexly project link with hoverable, keyboard-accessible header tooltips.
- Emit anonymous `/api/live` JSON with package version and source revision,
  explicitly served without caching.
- Provide complete Chinese and English READMEs and preserve deployment guidance.
- Update pinned development dependencies and remove redundant implementation paths.
- Extend browser checks for brand assets, health responses, and tooltip interaction.

## v1.0.0 — 2026-10-02

Initial release, from the repository's unversioned initial commit `65d15c7`.

- Read 30 classical poems with clear Shijing excerpt labels and source notes.
- Browse, search, save favorites, resize text, and read in light, dark, or quiet mode.
- Share a gentle reading moment using original parent prompts and bedtime scripts.
- Install a static PWA with the complete collection and fonts available offline.
- Keep long poems scrollable, respect safe areas and reduced motion, and support
  keyboard and touch interaction.
- Deploy static assets on Cloudflare Workers with explicit 404 behavior, scoped
  cache headers, no backend storage, and source-revision metadata.
- Pin a verified TypeScript 7 compiler and validate the app in Chromium and WebKit.

