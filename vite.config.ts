import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import manifest from "./package.json" with { type: "json" };

const { version } = manifest;

const revision = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim();
const dirty = Boolean(
  execFileSync("git", ["status", "--porcelain"], { encoding: "utf8" }).trim(),
);

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(version),
    __BUILD_SHA__: JSON.stringify(revision),
  },
  plugins: [
    preact(),
    {
      name: "sleepy-release-metadata",
      generateBundle(_options, bundle) {
        this.emitFile({
          type: "asset",
          fileName: "release.json",
          source: JSON.stringify({ name: "sleepy", version, revision, dirty }),
        });
        this.emitFile({
          type: "asset",
          fileName: "api/live",
          source: JSON.stringify({ status: "ok", name: "sleepy", version, revision }),
        });
        const headers = readFileSync(
          new URL("./config/headers.txt", import.meta.url),
          "utf8",
        );
        const immutableAssets = Object.keys(bundle)
          .filter((path) => path.startsWith("assets/"))
          .sort();
        this.emitFile({
          type: "asset",
          fileName: "_headers",
          source:
            headers +
            immutableAssets
              .map(
                (path) =>
                  `\n/${path}\n  ! Cache-Control\n  Cache-Control: public, max-age=31536000, immutable\n`,
              )
              .join(""),
        });
      },
    },
    VitePWA({
      registerType: "prompt",
      injectRegister: false,
      includeAssets: ["favicon.png", "theme.js", "fonts/*"],
      manifest: {
        id: "/",
        name: "sleepy · 诗意入眠",
        short_name: "sleepy",
        description: "把一首诗读慢一点。和孩子一起，在月色与山水间读古诗，轻轻道晚安。",
        lang: "zh-CN",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "any",
        background_color: "#f4f1ea",
        theme_color: "#f4f1ea",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/maskable-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        cacheId: "sleepy",
        navigateFallback: null,
        manifestTransforms: [
          async (entries) => ({
            manifest: entries.map((entry) =>
              entry.url === "index.html" ? { ...entry, url: "/" } : entry,
            ),
            warnings: [],
          }),
        ],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: false,
        globPatterns: ["**/*.{js,css,html,woff2,png,svg,webmanifest,txt}"],
        maximumFileSizeToCacheInBytes: 1_000_000,
      },
    }),
  ],
  build: { target: "es2022", sourcemap: false },
});
