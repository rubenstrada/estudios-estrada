import { expect, test } from "@playwright/test";

test("presents Estudios Estrada as a company", async ({ page }) => {
  await page.goto("/quienes-somos");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Un equipo que se integra a tu proyecto.",
  );
  await expect(page.locator("[data-company-principle]")).toHaveCount(4);
  await expect(
    page
      .locator("#contenido-principal")
      .getByRole("link", { name: "Consultar disponibilidad" }),
  ).toBeVisible();
});

test("provides a complete contact brief without publishing invented details", async ({
  page,
}) => {
  await page.goto("/contacto");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Conversemos sobre lo que quieres producir.",
  );
  await expect(page.locator("[data-project-brief-item]")).toHaveCount(4);
  await expect(page.locator("form")).toHaveCount(0);
});
