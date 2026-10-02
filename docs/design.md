# Sleepy

A quiet Chinese poetry reader for a parent and child. The poem is the interface:
large, carefully spaced serif characters, warm paper or deep blue-green ink,
a moon and distant mountains. The visual treatment is drawn in CSS and SVG;
there are no stock images, audio services, generated readings, or AI endpoints.

## Product

- Read one complete poem at a time, with natural document scrolling for long works.
- Browse a small, deliberate collection by theme, title, author, or a remembered line.
- Save favorites, adjust type size, choose light/dark/system, and enter a quiet view.
- Read original parent guidance and a short, gentle bedtime script for each poem.
- Install as a standalone PWA and read the entire collection offline after download.
- Persist only reading preferences and favorites in this browser. No accounts,
  analytics, cookies, remote storage, or automatic sound.

## Architecture

Vite builds a Preact application. TypeScript 7 checks TS/TSX independently of Vite's
transpilation. A typed content model, a reader view model, and small view components
separate content, state, and presentation. Biome formats and lints the source.
Dependencies and the package manager are pinned; `package.json` owns the version.

Cloudflare Workers serves only static assets. No Worker request handler, D1, KV,
R2, or application secrets are necessary. The Worker is `sleepy`; the sole custom
domain is **https://sleeply.hexly.ai**. Missing routes and assets must return 404,
never a successful application-shell fallback.

Workbox precaches the built shell, every poem, fonts, and icons. Navigation fallback
is disabled. Updates require an explicit refresh; an update must not interrupt a
parent reading. Offline readiness is reported only after installation completes.

## Visual and interaction constraints

Semantic controls have visible focus, useful accessible names, and generous touch
targets. Native modal dialogs own focus and restore it on close. Reading animations
are short and decorative motion stops for reduced-motion. Gradients and landscape
shapes are static; no canvas render loop, animation library, or blur-heavy background.

Use `viewport-fit=cover`, `dvh`, safe-area insets, and matching document, header,
footer, and `theme-color` surfaces. Keep all text reachable at increased font size,
landscape orientation, and with the virtual keyboard open. Quiet view hides the
application chrome with an always-reachable exit; it does not promise to hide iOS
Safari's browser UI. Add-to-Home-Screen is the supported standalone experience.

## Content and licensing

Ship ancient public-domain originals. Mark every excerpt and provide provenance
and editorial-variant notes. Parent prompts and explanations are written for this
project, not copied from modern editions. Keep poetry and font licensing distinct
from the MIT software license. Do not include full Mao Zedong poems without verified
rights for all served regions. The initial unrestricted worldwide site may ship
only public-domain classics, as authorized by the owner.

## Release gates

1. Clean install; actual TypeScript 7 compiler version; typecheck, lint, build.
2. Real Chromium and WebKit browser runs at desktop and mobile viewport sizes:
   light/dark, keyboard/touch, long poems, dialogs, favorites, reduced motion,
   manifest, service-worker lifecycle, offline use, and missing-resource responses.
3. Label viewport and safe-area simulations honestly. No physical iPhone claim
   without a physical device run.
4. After implementation, create a new regular pane in this Herdr space and start
   a fresh `cdx -m gpt-6-astra -c model_reasoning_effort='max'` reviewer. Resolve all
   findings and obtain explicit sign-off before production deployment.
5. Deploy only the approved Cloudflare Worker/domain, record the source SHA and
   deployment version, verify live HTTPS/assets/headers, push `main`, and observe
   the CI result for that exact revision. Preserve screenshots and a release report.

