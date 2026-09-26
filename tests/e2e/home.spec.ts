import { expect, test } from "@playwright/test";

test("explains the company and routes visitors to each service", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Conocer fotografía" }),
  ).toHaveAttribute("href", "/fotografia-profesional");
  await expect(
    page.getByRole("link", { name: "Conocer eventos" }),
  ).toHaveAttribute("href", "/eventos-y-video");
  await expect(
    page.getByRole("link", { name: "Conocer video" }),
  ).toHaveAttribute("href", "/eventos-y-video");
  await expect(page.locator("[data-primary-home-cta]")).toHaveCount(1);
});

test("keeps essential home content visible with JavaScript disabled", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page
      .locator('[data-home-section="introduction"]')
      .getByRole("heading", { level: 2 }),
  ).toBeVisible();
  await expect(page.locator("[data-reveal]").first()).toBeVisible();
  await context.close();
});

test("stops the film rail and reveals content under reduced motion", async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.locator("[data-reveal]").first()).toBeVisible();
  await expect(page.locator("[data-film-track]")).toHaveCSS(
    "animation-name",
    "none",
  );
  await context.close();
});

test.describe("home section order", () => {
  for (const viewport of [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1440, height: 900 },
  ]) {
    test(`keeps the narrative order on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto("/");

      const order = await page
        .locator("[data-home-section]")
        .evaluateAll((sections) =>
          sections.map((section) => section.getAttribute("data-home-section")),
        );

      expect(order).toEqual([
        "hero",
        "introduction",
        "services",
        "reasons",
        "company",
        "closing",
      ]);
    });
  }
});
