import AxeBuilder from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";

async function openReader(page: Page, hash = "") {
  await page.goto(`/${hash}`);
  await expect(page.locator("h1")).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    content: document.documentElement.scrollWidth,
    viewport: document.documentElement.clientWidth,
  }));
  expect(dimensions.content).toBeLessThanOrEqual(dimensions.viewport);
}

test("opens a complete poem without runtime errors or third-party requests", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  const external: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("request", (request) => {
    if (
      new URL(request.url()).origin !==
      new URL(testInfo.project.use.baseURL || "http://127.0.0.1:4173").origin
    )
      external.push(request.url());
  });
  await openReader(page);
  await expect(page.locator("h1")).toHaveText("静夜思");
  await expect(
    page.getByRole("link", { name: "在 hexly.ai 查看 Sleepy（新标签页）" }),
  ).toHaveAttribute("href", "https://hexly.ai/projects/sleepy");
  await expect(page.locator(".poem-lines p")).toHaveText([
    "床前明月光，",
    "疑是地上霜。",
    "举头望明月，",
    "低头思故乡。",
  ]);
  await expectNoHorizontalOverflow(page);
  expect(errors).toEqual([]);
  expect(external).toEqual([]);
  const gradient = await page
    .locator("linearGradient stop")
    .first()
    .evaluate((stop) => ({
      opacity: getComputedStyle(stop).stopOpacity,
      color: getComputedStyle(stop).stopColor,
    }));
  expect(gradient.opacity).toBe("0.12");
  expect(gradient.color).not.toBe("rgb(0, 0, 0)");
  await page.screenshot({
    path: testInfo.outputPath("reader-light.png"),
    fullPage: true,
  });
});

test("header tooltips remain hoverable and dismiss with Escape", async ({ page }) => {
  await openReader(page);
  const trigger = page.getByRole("link", {
    name: "在 hexly.ai 查看 Sleepy（新标签页）",
  });
  const tooltip = trigger.getByRole("tooltip");
  await trigger.hover();
  await expect(tooltip).toBeVisible();
  const bounds = await tooltip.boundingBox();
  const triggerBounds = await trigger.boundingBox();
  expect(bounds).not.toBeNull();
  if (!bounds || !triggerBounds) throw new Error("Missing tooltip bounds");
  await page.mouse.move(
    triggerBounds.x + triggerBounds.width / 2,
    bounds.y + bounds.height / 2,
    { steps: 12 },
  );
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2, {
    steps: 12,
  });
  await expect(tooltip).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(tooltip).toBeHidden();
  await page.mouse.move(0, 0);
  await trigger.focus();
  await expect(tooltip).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(tooltip).toBeHidden();
});

test("uses the approved book mark in the header and About panel", async ({ page }) => {
  await openReader(page);
  await expect(page.locator(".brand-logo")).toHaveAttribute("src", "/logo-80.png");
  await page.getByRole("button", { name: "关于 sleepy" }).click();
  const logo = page.getByRole("img", { name: "Sleepy Logo" });
  await expect(logo).toBeVisible();
  await expect(logo).toHaveAttribute("src", "/logo-80.png");
  await expect
    .poll(() => logo.evaluate((image) => (image as HTMLImageElement).naturalWidth))
    .toBe(80);
  await expectNoHorizontalOverflow(page);
});

test("turns pages with controls and keyboard and offers a different surprise", async ({
  page,
}) => {
  await openReader(page);
  await page.getByRole("button", { name: "下一首", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("春晓");
  await page.locator("h1").focus();
  await page.keyboard.press("ArrowLeft");
  await expect(page.locator("h1")).toHaveText("静夜思");
  await page.locator("h1").focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("h1")).toHaveText("春晓");
  await page.getByRole("button", { name: "偶遇一首" }).click();
  await expect(page.locator("h1")).not.toHaveText("春晓");
});

test("searches by author and keeps the final lines of a long poem reachable", async ({
  page,
}, testInfo) => {
  await openReader(page);
  await page.getByRole("button", { name: "诗集", exact: true }).click();
  const search = page.getByRole("searchbox");
  await expect(search).toBeFocused();
  await search.fill("苏轼");
  await expect(page.locator(".poem-list-item")).toHaveCount(1);
  await page.locator(".poem-list-item").click();
  await expect(page.locator("h1")).toHaveText("水调歌头·明月几时有");
  await expect(page.locator("h1")).toBeFocused();
  await expect(page.locator(".poem-lines p")).toHaveCount(19);
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  const last = page.locator(".poem-lines p").last();
  await expect(last).toHaveText("千里共婵娟。");
  const bounds = await last.boundingBox();
  const dock = await page.locator(".reading-dock").boundingBox();
  expect(bounds).not.toBeNull();
  expect(dock).not.toBeNull();
  if (bounds && dock) expect(bounds.y + bounds.height).toBeLessThan(dock.y);
  expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(0);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: testInfo.outputPath("long-poem-bottom.png") });
});

test("labels Shijing excerpts and exposes their original sources", async ({ page }) => {
  await openReader(page, "#cai-wei");
  await expect(page.locator(".excerpt-note")).toHaveText("节选第六章前四句 · 原作共六章");
  await expect(page.locator(".poem-lines p")).toHaveText([
    "昔我往矣，",
    "杨柳依依。",
    "今我来思，",
    "雨雪霏霏。",
  ]);
  await page.getByRole("button", { name: "和孩子一起读", exact: false }).click();
  await expect(page.getByRole("dialog")).toContainText("yù xuě");
  await expect(page.locator(".bedtime-note")).toContainText("晚安");
  await page.getByText("诗文出处与版本", { exact: true }).click();
  await expect(page.getByRole("link", { name: "查看原文出处" })).toHaveAttribute(
    "href",
    "https://zh.wikisource.org/wiki/詩經/采薇",
  );
});

test("persists favorites locally and explains an empty favorites collection", async ({
  page,
}) => {
  await openReader(page);
  await page.getByRole("button", { name: "藏起这首诗" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "从心藏移出" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "诗集", exact: true }).click();
  await page.getByRole("button", { name: "心藏", exact: true }).click();
  await expect(page.locator(".poem-list-item")).toHaveCount(1);
  await page.locator(".poem-list-item").click();
  await page.getByRole("button", { name: "从心藏移出" }).click();
  await page.getByRole("button", { name: "诗集", exact: true }).click();
  await expect(page.locator(".poem-list-item")).toHaveCount(0);
  await expect(page.locator(".empty-state")).toContainText("把喜欢的诗，轻轻放进心藏。");
});

test("honors system color, manual override, and browser chrome color", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ colorScheme: "dark" });
  await openReader(page);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#152927",
  );
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(21, 41, 39)");
  await expect(page.locator(".reading-dock")).toHaveCSS(
    "background-color",
    "rgb(21, 41, 39)",
  );
  await page.screenshot({ path: testInfo.outputPath("reader-dark.png"), fullPage: true });
  await page.getByRole("button", { name: "切换到纸白" }).click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute(
    "content",
    "#f4f1ea",
  );
  await page.getByRole("button", { name: "阅读设置" }).click();
  await page.getByRole("button", { name: "随系统", exact: true }).click();
  await page.getByRole("button", { name: "关闭", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.emulateMedia({ colorScheme: "light" });
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
});

test("keeps modal keyboard focus contained and restores the opener", async ({ page }) => {
  await openReader(page);
  const opener = page.getByRole("button", { name: "阅读设置" });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  for (let index = 0; index < 12; index++) {
    await page.keyboard.press("Tab");
    expect(
      await page.evaluate(() => Boolean(document.activeElement?.closest("dialog"))),
    ).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(opener).toBeFocused();
});

test("quiet mode keeps an accessible exit and retains natural scrolling", async ({
  page,
}) => {
  await openReader(page, "#shui-diao-ge-tou");
  await page.getByRole("button", { name: "沉浸阅读", exact: true }).click();
  await expect(page.locator(".site-header")).toHaveCount(0);
  const exit = page.getByRole("button", { name: "退出沉浸阅读" });
  await expect(exit).toBeVisible();
  await exit.focus();
  await page.keyboard.press("Escape");
  await expect(page.locator(".site-header")).toBeVisible();
  await expect(page.getByRole("button", { name: "沉浸阅读", exact: true })).toBeFocused();
  await page.getByRole("button", { name: "沉浸阅读", exact: true }).click();
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect(page.locator(".poem-lines p").last()).toBeInViewport();
  await expect(exit).toBeInViewport();
  await exit.click();
  await expect(page.locator(".site-header")).toHaveCount(1);
});

test("reduced motion removes page and dialog animations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openReader(page);
  await expect(page.locator(".poem-page")).toHaveCSS("animation-duration", "0s");
  await page.getByRole("button", { name: "诗集", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCSS("animation-duration", "0s");
});

test("all 30 poems remain readable at a narrow viewport with larger type", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await page.setViewportSize({ width: 320, height: 740 });
  await openReader(page);
  await page.getByRole("button", { name: "阅读设置" }).click();
  await page.getByRole("button", { name: "更大", exact: true }).click();
  await page.getByRole("button", { name: "关闭", exact: true }).click();
  const visited = new Set<string>();
  for (let index = 0; index < 30; index++) {
    visited.add(await page.locator("h1").innerText());
    await expectNoHorizontalOverflow(page);
    await expect(page.locator(".poem-lines p").first()).not.toBeEmpty();
    await page.getByRole("button", { name: "下一首", exact: true }).click();
  }
  expect(visited.size).toBe(30);
  await expect(page.locator("h1")).toHaveText("静夜思");
});

test("handles malformed preferences and unavailable local storage", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("sleepy.preferences", "{broken");
    Storage.prototype.setItem = () => {
      throw new DOMException("Unavailable", "QuotaExceededError");
    };
  });
  await openReader(page);
  await expect(page.locator("h1")).toHaveText("静夜思");
  await page.getByRole("button", { name: "藏起这首诗" }).click();
  await expect(page.getByRole("button", { name: "从心藏移出" })).toBeVisible();
  await page.getByRole("button", { name: "阅读设置" }).click();
  await expect(page.getByRole("dialog")).toContainText("浏览器暂时无法保存偏好");
});

test("light, dark, and library views meet automated accessibility checks", async ({
  page,
}) => {
  test.setTimeout(90_000);
  await openReader(page);
  for (const mode of ["light", "dark", "library"] as const) {
    if (mode === "dark") await page.getByRole("button", { name: "切换到月夜" }).click();
    if (mode === "library")
      await page.getByRole("button", { name: "诗集", exact: true }).click();
    await page.evaluate(() =>
      Promise.allSettled(document.getAnimations().map((animation) => animation.finished)),
    );
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  }
});

for (const outcome of ["success", "denied"] as const) {
  test(`copy feedback stays visible inside the dialog when clipboard access is ${outcome}`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.addInitScript((mode) => {
      Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: {
          writeText: async (text: string) => {
            if (mode === "denied")
              throw new DOMException("Clipboard access denied", "NotAllowedError");
            Reflect.set(window, "sleepyCopiedText", text);
          },
        },
      });
    }, outcome);
    await openReader(page);
    await page.getByRole("button", { name: "和孩子一起读", exact: false }).click();
    const feedback = page.getByRole("dialog").getByRole("status");
    await expect(feedback).toHaveText("");
    await expect(feedback).toHaveAttribute("aria-live", "polite");
    await expect(feedback).toHaveAttribute("aria-atomic", "true");
    await feedback.evaluate((element) =>
      Reflect.set(element, "sleepyExistingStatus", true),
    );
    await page.getByRole("button", { name: "复制晚安话" }).click();
    expect(
      await feedback.evaluate((element) => Reflect.get(element, "sleepyExistingStatus")),
    ).toBe(true);
    await expect(feedback).toHaveText(
      outcome === "success" ? "晚安话已复制" : "未能复制，可以长按文字选择",
    );
    await expect(feedback).toBeInViewport();
    await expect(feedback).not.toHaveClass(/sr-only/);
    if (outcome === "success") {
      expect(await page.evaluate(() => Reflect.get(window, "sleepyCopiedText"))).toBe(
        await page.locator(".bedtime-note > p").innerText(),
      );
    }
    await page.screenshot({ path: testInfo.outputPath(`copy-${outcome}-feedback.png`) });
  });
}
