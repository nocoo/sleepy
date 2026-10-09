<p align="center"><img src="../assets/brand/icon-rounded.png" width="240" alt="Sleepy logo" /></p>
<h1 align="center">sleepy</h1>
<p align="center">Read a poem slowly, together with your child.</p>
<p align="center"><a href="https://sleepy.hexly.ai">Website</a> · <a href="../README.md">简体中文</a></p>

## What it does

Sleepy is a Chinese poetry reader for parents and children. It presents 30 selected classical works, one at a time, with large type and warm paper or moonlit themes that keep the poem at the center.

It is a static website without accounts, ads, tracking analytics, automatic sound, or an AI backend. Favorites and reading preferences stay in the current browser and do not sync across devices.

## Features

- Complete poems and natural scrolling for longer works; Shijing excerpts and textual variants are labeled individually.
- Browse by theme, search titles, authors, or lines, and save favorites.
- Light, dark, and system themes, three text sizes, and a quiet view that hides reading controls.
- Original parent guidance, selected pronunciation notes, conversation prompts, and copyable bedtime messages.
- Install to the home screen in supporting browsers; after the first download completes, the entire collection, font, and reading assets work offline.
- Updates wait for the reader to refresh instead of interrupting a poem.

## Usage

Open [sleepy.hexly.ai](https://sleepy.hexly.ai). Choose a poem with the page controls or search in the collection. Select the reading-together action for parent guidance; select sleepy in the top-left corner for offline status and installation instructions.

The first visit requires a connection. Wait until the About panel reports that the complete collection is saved before reading offline. On iPhone / iPad, use Safari's **Share → Add to Home Screen**. Other supporting browsers provide an **Install app** menu item.

Standalone mode provides more reading space; ordinary Safari's address bar remains under system control. Clearing website data or browser storage eviction requires another online download and may also remove favorites and preferences.

## Development

Requires Node.js 22.12+ and Bun 1.4.0. The verified release environment uses Node.js 26.9.0.

```sh
bun install --frozen-lockfile
bun run dev
```

On the owner's network, use the approved mirror without changing registry locations in the lockfile:

```sh
BUN_CONFIG_REGISTRY=https://packagefeedproxy.microsoft.io/npm/ bun install --frozen-lockfile
```

`dev` binds to loopback only. To preview the actual Workers static asset behavior:

```sh
bun run build
bun run preview
```

The preview runs at `http://127.0.0.1:4173`. `/api/live` is build-generated health JSON with status, package version, and Git SHA, served with `no-store`. It proves static asset delivery, not external dependency health. `/release.json` also records the build-time working-tree state. The ordinary Vite development server does not generate either file.

Brand masters and provenance live in `logo.png` and `assets/brand/`. With Pillow installed, run `python3 scripts/build-icons.py` from the repository root to generate transparent header marks and favicons, and background-bearing PWA platform icons.

## Tests

```sh
bun run check
bunx playwright install chromium webkit
bun run test:e2e
```

`check` runs TypeScript checking, Biome, and the production build in sequence. Browser tests require a build first and cover Chromium and WebKit viewports, reading and panel interactions, themes, keyboard use, offline behavior, updates, and static asset responses. Viewport tests are not physical-device verification; see the verification document for the WebKit offline boundary.

## Stack

- Preact and TypeScript separate poetry, reading state, and UI into Model / ViewModel / View layers.
- Vite and Biome handle builds, formatting, and static checks.
- Workbox precaches the complete collection and reading assets without a navigation fallback.
- Cloudflare Workers Static Assets serves only `dist`, without D1, KV, R2, or application secrets.
- Playwright and axe-core check browser interactions and accessibility.

## Documentation

- [Product and architecture](design.md)
- [Verification scope and deployment procedure](verification.md)
- [Text sources, font, and third-party licensing](content.md)
- [Brand provenance](../assets/brand/provenance.json)

The sole production hostname is `https://sleepy.hexly.ai`, and the Worker is `sleepy`. Publication requires independent review, CI for the intended commit, and a clean build; README or brand changes do not automatically publish production.

## License

Application code and original parent guidance use [MIT](../LICENSE). Classical texts are not relicensed as original MIT works. The Noto Serif subset follows [SIL OFL 1.1](../public/fonts/OFL.txt); Lucide retains ISC and applicable Feather MIT notices. Complete runtime third-party notices ship with the site in [THIRD_PARTY_NOTICES.txt](../public/THIRD_PARTY_NOTICES.txt).
