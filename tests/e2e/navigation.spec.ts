import { expect, test } from "@playwright/test";

const approvedNavigation = [
  ["Inicio", "/"],
  ["Fotografía profesional", "/fotografia-profesional"],
  ["Eventos y video", "/eventos-y-video"],
  ["Quiénes somos", "/quienes-somos"],
  ["Contacto", "/contacto"],
] as const;

test("renders the approved navigation and marks the current route", async ({
  page,
}) => {
  await page.goto("/");
  const navigation = page.locator("[data-desktop-nav]");

  for (const [label, path] of approvedNavigation) {
    await expect(navigation.locator("a", { hasText: label })).toHaveAttribute(
      "href",
      path,
    );
  }

  await expect(navigation.locator("a", { hasText: "Inicio" })).toHaveAttribute(
    "aria-current",
    "page",
  );
});

test("opens and closes the mobile menu with keyboard focus restored", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const trigger = page.locator("[data-menu-trigger]");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(trigger).toHaveAttribute("aria-label", "Cerrar menú");
  await expect(page.locator("[data-mobile-menu]")).toHaveAttribute(
    "data-open",
    "true",
  );

  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toHaveAttribute("aria-label", "Abrir menú");
  await expect(trigger).toBeFocused();
});

test("uses the contact page as the availability fallback when WhatsApp is not configured", async ({
  page,
}) => {
  await page.goto("/");
  const cta = page.locator('[data-availability-link="header"]');

  await expect(cta).toHaveAttribute("href", "/contacto");
  await expect(cta).toHaveText(/Consultar disponibilidad/i);
});

test("avoids document overflow at 320 pixels", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto("/");

  const widths = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth,
  }));

  expect(widths.scroll).toBeLessThanOrEqual(widths.client);
});

test("changes the sticky header state after scrolling", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    document.body.style.minHeight = "200vh";
    window.scrollTo(0, 200);
  });

  await expect(page.locator("[data-site-header]")).toHaveAttribute(
    "data-scrolled",
    "true",
  );
});
