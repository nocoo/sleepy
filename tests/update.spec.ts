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
