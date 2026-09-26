import { expect, test } from "@playwright/test";

test("presents the Estudios Estrada team and process", async ({ page }) => {
  await page.goto("/quienes-somos");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Equipo de Estudios Estrada" }),
  ).toBeVisible();
  const teamPhotoFrame = page.locator("[data-editorial-photo-frame]");
  await expect(teamPhotoFrame).toBeVisible();
  await expect(teamPhotoFrame).toHaveText("");
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

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("[data-project-brief-item]")).toHaveCount(4);
  await expect(page.locator("form")).toHaveCount(0);
});
