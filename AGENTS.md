# Sleepy

Sleepy is a static Chinese poetry reader. The production hostname is exclusively
`https://sleepy.hexly.ai`, and the Cloudflare Worker is `sleepy`.

## Architecture

- Vite, Preact, TypeScript 7, and Biome. Exact versions live in `package.json`.
- `src/model`: curated texts and validated local preferences.
- `src/viewmodel`: reading commands and PWA lifecycle.
- `src/views`: accessible UI. `src/styles.css` owns theme and spacing tokens.
- Workbox precaches the canonical root and all reading assets, with no navigation fallback.
- Workers serves static `dist` assets only. No request handler, account system,
  remote storage, D1, KV, R2, audio service, or AI backend.
- Fonts are self-hosted. Preserve `public/fonts/OFL.txt` and `docs/content.md`.

## Commands

Use Bun 1.4.0. Node 26.9.0 is verified locally and in the CI configuration.
On the owner's machine, follow the global npm mirror rule:

```sh
BUN_CONFIG_REGISTRY=https://packagefeedproxy.microsoft.io/npm/ bun install --frozen-lockfile
bun run typecheck
bun run lint
bun run build
bunx playwright install chromium webkit
bun run test:e2e
```

`bun run dev` serves Vite on loopback. `bun run preview` serves the built app with
the actual local Workers runtime at `http://127.0.0.1:4173`.
`bun run check` runs typecheck, lint, and build. Browser tests require a build first.

## Quality and release boundaries

- Preserve natural document scrolling, large text, `dvh`, safe-area insets,
  reduced motion, explicit focus restoration, and touch target sizes.
- Check actual rendered SVG attributes: Preact needs native SVG spelling such as
  `stop-color`, not React-style camel case.
- Persist preference changes in the command that changes them, before navigation.
- Missing paths must be 404 with revalidation, never a cached application shell.
  Immutable cache headers are generated only for existing hashed build assets.
- Do not label browser viewports or synthetic safe-area insets as physical devices.
  See `docs/verification.md` for the WebKit offline-test boundary.
- Keep the version authoritative in `package.json`; build metadata and About derive it.
- Work on `main` with atomic commits. Do not create a feature branch or PR for this release.
- A new independent Codex review session must review the completed implementation;
  fix findings and obtain sign-off before production publication. The owner has
  authorized deployment to the hostname above and Git push; do not ask again.
- Further copyright/legal research is outside the remaining release scope. Preserve
  accurate third-party notices and the existing classical collection.
- Before deployment verify the account, hostname, current Worker, clean source SHA,
  exact-revision CI, and review sign-off. Touch only this project's resources.
- Run `node scripts/deploy.mjs --check`, then `bun run deploy` from a TTY with the
  verified `CLOUDFLARE_ACCOUNT_ID`. Stop on any unrelated resource conflict.
- Never commit credentials, account identifiers, local traces, or browser profiles.

