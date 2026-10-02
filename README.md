<p align="center"><img src="public/favicon.svg" width="72" height="72" alt="sleepy moon" /></p>
<h1 align="center">sleepy</h1>
<p align="center">One poem. A little quiet.</p>
<p align="center"><a href="https://sleepy.hexly.ai">Read a poem</a> · <a href="docs/design.md">Design</a> · <a href="docs/verification.md">Verification</a></p>

A Chinese poetry reader for parents and children. Thirty carefully selected
classics, large serif type, distant mountains, and a little moonlight. Read
together, linger over a question, or finish with a gentle goodnight.

- Warm paper, dark ink, and system themes; three text sizes and a quiet reading view.
- Search by title, author, or a remembered line. Keep favorites on your own device.
- Natural scrolling for longer poems. Shijing excerpts and text variants are labeled.
- Original parent guidance, selected pronunciation notes, and bedtime prompts.
- Installable PWA with the full collection, font, and artwork available offline.
- No accounts, analytics, automatic sound, AI backend, or remote storage.

## Development

Requires Node 22.12+ and Bun 1.4.0; Node 26.9.0 is the verified release environment.

```sh
bun install --frozen-lockfile
bun run dev
```

On the owner's network, install with the approved mirror:

```sh
BUN_CONFIG_REGISTRY=https://packagefeedproxy.microsoft.io/npm/ bun install --frozen-lockfile
```

The lockfile retains registry-independent package locations. Do not commit a
machine-specific registry URL.

```sh
bun run check
bunx playwright install chromium webkit
bun run test:e2e
```

`check` runs the actual TypeScript compiler, Biome, and Vite production build.
The pinned TypeScript is **7.0.2**, a stable release, not a preview package.
See [toolchain evidence](docs/verification.md#toolchain).

## Install and read offline

Open [sleepy.hexly.ai](https://sleepy.hexly.ai) once while connected. The About
panel reports when the complete collection is saved. In Safari, use **Share →
Add to Home Screen**; other supporting browsers offer **Install app**.

The reading view respects safe areas and the dynamic viewport. Ordinary iOS Safari
controls remain under system control. Standalone mode provides the fuller app
experience. Browser storage can be cleared or evicted; reconnect to save again.

Updates wait for the reader to choose when to refresh. Reading preferences and
favorites are stored only in local storage, so they do not sync between devices.

## Deployment

Cloudflare Worker `sleepy` serves only `dist`. Its only custom domain is
**sleepy.hexly.ai**; `workers.dev` and preview URLs are disabled.
No D1, KV, R2, runtime bindings, or application secrets are required.

After review sign-off and CI for the intended commit:

```sh
bun run build
node scripts/deploy.mjs --check
bun run deploy
```

Set `CLOUDFLARE_ACCOUNT_ID` to the already verified account in the deployment shell.
The deploy command requires a clean tree, a matching build revision, and an
interactive terminal so domain conflicts cannot be silently overridden.
Do not approve replacement of another project's resources.

`release.json` exposes the package version and source SHA. HTML, the manifest, and
the service worker revalidate; only existing hashed assets use immutable caching.
Unknown routes and resources return 404. There is no SPA navigation fallback.

## License and sources

Application code and original reading guidance: [MIT](LICENSE).
Classical texts are not claimed as original MIT writing. The subset Noto Serif
font remains under [SIL OFL 1.1](public/fonts/OFL.txt); Lucide icons retain ISC.
See [text sources and third-party notices](docs/content.md).
Full runtime dependency notices are also [shipped with the site](public/THIRD_PARTY_NOTICES.txt).
