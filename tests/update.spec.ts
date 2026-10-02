import { expect, test } from "@playwright/test";
import { startSite } from "./support/site";

test("a waiting service worker update requires consent and preserves the reading place", async ({
  page,
}) => {
  const site = await startSite();
  try {
    await page.goto(`${site.url}/#chun-xiao`);
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
    await page.reload();
    await expect(page.locator("h1")).toHaveText("春晓");
    await page.getByRole("button", { name: "藏起这首诗" }).click();
    site.update();
    await page.evaluate(async () => {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
    });
    await expect(page.locator(".update-prompt")).toBeVisible();
    await expect(page.locator("h1")).toHaveText("春晓");
    expect(
      await page.evaluate(async () =>
        Boolean((await navigator.serviceWorker.ready).waiting),
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "稍后", exact: true }).click();
    await expect(page.locator(".update-prompt")).toHaveCount(0);
    expect(
      await page.evaluate(async () =>
        Boolean((await navigator.serviceWorker.ready).waiting),
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "关于 sleepy" }).click();
    await page.getByRole("button", { name: "诗集有更新 · 刷新诗集" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("h1")).toHaveText("春晓");
    await expect(page.getByRole("button", { name: "从心藏移出" })).toBeVisible();
    await expect
      .poll(async () =>
        page.evaluate(async () => (await navigator.serviceWorker.ready).waiting === null),
      )
      .toBe(true);
  } finally {
    await site.stop();
  }
});

test("another tab cannot reload a reader who postponed the update", async ({
  page,
  context,
}) => {
  const site = await startSite();
  const other = await context.newPage();
  try {
    await page.goto(`${site.url}/#shui-diao-ge-tou`);
    await page.evaluate(() => navigator.serviceWorker.ready);
    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
    await page.reload();
    await other.goto(`${site.url}/#chun-xiao`);
    await other.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
    site.update();
    await other.evaluate(async () => (await navigator.serviceWorker.ready).update());
    await expect(page.locator(".update-prompt")).toBeVisible();
    await expect(other.locator(".update-prompt")).toBeVisible();
    await page.getByRole("button", { name: "稍后", exact: true }).click();
    await page.getByRole("button", { name: "沉浸阅读", exact: true }).click();
    const scroll = await page.evaluate(() => {
      Reflect.set(window, "sleepyReadingMarker", "keep-this-document");
      window.scrollTo(0, 600);
      return window.scrollY;
    });
    expect(scroll).toBeGreaterThan(0);
    await other.getByRole("button", { name: "刷新诗集", exact: true }).click();
    await expect(other.locator(".update-prompt")).toHaveCount(0);
    await expect
      .poll(async () =>
        page.evaluate(async () => (await navigator.serviceWorker.ready).waiting === null),
      )
      .toBe(true);
    await expect(page.getByRole("button", { name: "退出沉浸阅读" })).toBeVisible();
    expect(await page.evaluate(() => Reflect.get(window, "sleepyReadingMarker"))).toBe(
      "keep-this-document",
    );
    expect(Math.abs((await page.evaluate(() => window.scrollY)) - scroll)).toBeLessThan(
      2,
    );
    await page.getByRole("button", { name: "退出沉浸阅读" }).click();
    await page.getByRole("button", { name: "关于 sleepy" }).click();
    await page.getByRole("button", { name: "诗集有更新 · 刷新诗集" }).click();
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator("h1")).toHaveText("水调歌头·明月几时有");
    expect(
      await page.evaluate(() => Reflect.get(window, "sleepyReadingMarker")),
    ).toBeUndefined();
  } finally {
    await other.close();
    await site.stop();
  }
});
