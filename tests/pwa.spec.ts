import { expect, type Page, test } from "@playwright/test";
import packageInfo from "../package.json" with { type: "json" };
import { startSite } from "./support/site";

async function waitForOffline(page: Page) {
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
}

test("serves an installable manifest, local icons, and explicit cache policy", async ({
  page,
  request,
}) => {
  const response = await page.goto("/");
  expect(response?.status()).toBe(200);
  expect(response?.headers()["cache-control"]).toContain("no-cache");
  expect(response?.headers()["content-security-policy"]).toContain("script-src 'self'");
  expect(response?.headers()["x-content-type-options"]).toBe("nosniff");
  const manifestResponse = await request.get("/manifest.webmanifest");
  expect(manifestResponse.status()).toBe(200);
  expect(manifestResponse.headers()["cache-control"]).toContain("no-cache");
  const manifest = await manifestResponse.json();
  expect(manifest).toMatchObject({
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "zh-CN",
  });
  for (const icon of manifest.icons as {
    src: string;
    sizes: string;
    purpose: string;
  }[]) {
    const response = await request.get(icon.src);
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("image/png");
    const image = await response.body();
    const size = Number(icon.sizes.split("x")[0]);
    expect(image.readUInt32BE(16)).toBe(size);
    expect(image.readUInt32BE(20)).toBe(size);
  }
  expect(
    manifest.icons.some((icon: { purpose: string }) => icon.purpose === "maskable"),
  ).toBe(true);
  await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
    "href",
    "/icons/apple-touch-icon.png",
  );
  const sw = await request.get("/sw.js");
  expect(sw.status()).toBe(200);
  expect(sw.headers()["content-type"]).toMatch(/javascript/);
  expect(sw.headers()["cache-control"]).toContain("no-cache");
  const script = await page.locator('script[type="module"]').getAttribute("src");
  expect(script).toBeTruthy();
  const bundle = await request.get(script || "");
  expect(bundle.headers()["cache-control"]).toContain("immutable");
  expect(bundle.headers()["cache-control"]).toContain("31536000");
  expect((await bundle.body()).byteLength).toBeLessThan(120_000);
  const font = await request.get("/fonts/sleepy-serif.woff2");
  expect(font.status()).toBe(200);
  expect((await font.body()).byteLength).toBeLessThan(250_000);
  const release = await request.get("/release.json");
  expect(release.headers()["cache-control"]).toContain("no-store");
  expect(await release.json()).toMatchObject({
    name: "sleepy",
    version: packageInfo.version,
    revision: expect.stringMatching(/^[a-f0-9]{40}$/),
  });
});

test("reopens the full poetry collection, font, and controls offline", async ({
  page,
  context,
  browserName,
}, testInfo) => {
  const site = browserName === "webkit" ? await startSite() : undefined;
  try {
    await page.goto(site?.url || "/");
    await waitForOffline(page);
    await page.getByRole("button", { name: "关于 sleepy" }).click();
    await expect(page.locator(".offline-status")).toContainText("整本诗集已备好");
    await page.getByRole("button", { name: "关闭", exact: true }).click();
    if (site) await site.stop();
    else await context.setOffline(true);
    await page.reload({ waitUntil: "load" });
    await expect(page.locator("h1")).toHaveText("静夜思");
    await page.evaluate(() => document.fonts.ready);
    expect(
      await page.evaluate(() =>
        document.fonts.check('30px "Sleepy Serif"', "明月几时有"),
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "诗集", exact: true }).click();
    await expect(page.locator(".poem-list-item")).toHaveCount(30);
    await page.getByRole("searchbox").fill("苏轼");
    await page.locator(".poem-list-item").click();
    await expect(page.locator(".poem-lines p").last()).toHaveText("千里共婵娟。");
    await page.reload({ waitUntil: "load" });
    await expect(page.locator("h1")).toHaveText("水调歌头·明月几时有");
    await page.getByRole("button", { name: "切换到月夜" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.getByRole("button", { name: "关于 sleepy" }).click();
    await expect(page.locator(".offline-status")).toContainText(
      site ? "整本诗集已备好" : "现在离线",
    );
    await page.screenshot({ path: testInfo.outputPath("offline-confirmed.png") });
  } finally {
    await context.setOffline(false);
    await site?.stop();
  }
});

test("missing assets and routes remain 404 before and after service worker control", async ({
  page,
  request,
}) => {
  const paths = [
    "/assets/missing.js",
    "/missing-route",
    "/icons/missing.png",
    "/data/poems.json",
  ];
  for (const path of paths) {
    const response = await request.get(path, { headers: { Accept: "text/html" } });
    expect(response.status(), path).toBe(404);
    expect(response.headers()["cache-control"], path).toBe("no-cache");
    expect(await response.text(), path).not.toContain('<div id="app">');
  }
  await page.goto("/");
  await waitForOffline(page);
  const statuses = await page.evaluate(
    async (urls) =>
      Promise.all(
        urls.map(async (url) => {
          const response = await fetch(url);
          return { url, status: response.status, body: await response.text() };
        }),
      ),
    paths,
  );
  for (const response of statuses) {
    expect(response.status, response.url).toBe(404);
    expect(response.body).not.toContain('<div id="app">');
  }
});

test("safe-area insets keep portrait and landscape controls within simulated display bounds", async ({
  page,
  context,
  browserName,
}, testInfo) => {
  test.skip(
    browserName !== "chromium",
    "Chromium CDP supplies synthetic safe-area insets; this is not a physical iPhone test.",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  const cdp = await context.newCDPSession(page);
  await cdp.send("Emulation.setSafeAreaInsetsOverride", {
    insets: { top: 47, left: 0, bottom: 34, right: 0 },
  });
  await page.goto("/");
  await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
    "content",
    /viewport-fit=cover/,
  );
  await expect(page.locator(".site-header")).toHaveCSS("padding-top", "47px");
  await expect(page.locator(".reading-dock")).toHaveCSS("padding-bottom", "34px");
  const brand = await page.locator(".brand").boundingBox();
  expect(brand?.y).toBeGreaterThanOrEqual(47);
  const next = await page
    .getByRole("button", { name: "下一首", exact: true })
    .boundingBox();
  if (next) expect(next.y + next.height).toBeLessThanOrEqual(844 - 34);
  await page.screenshot({
    path: testInfo.outputPath("safe-area-simulated-portrait.png"),
  });
  await page.setViewportSize({ width: 844, height: 390 });
  await cdp.send("Emulation.setSafeAreaInsetsOverride", {
    insets: { top: 0, left: 47, bottom: 21, right: 47 },
  });
  await expect(page.locator(".reading-dock")).toHaveCSS("padding-bottom", "21px");
  const left = await page.locator(".brand").boundingBox();
  expect(left?.x).toBeGreaterThanOrEqual(47);
  const right = await page
    .getByRole("button", { name: "沉浸阅读", exact: true })
    .boundingBox();
  if (right) expect(right.x + right.width).toBeLessThanOrEqual(844 - 47);
  await page.screenshot({
    path: testInfo.outputPath("safe-area-simulated-landscape.png"),
  });
});
