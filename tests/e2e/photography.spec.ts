import { expect, test } from "@playwright/test";

const categoryNames = [
  "Retratos personales, familiares y de grupo",
  "Retratos profesionales y corporativos",
  "Sesiones en estudio o locación",
  "Fotografía de producto y marca",
  "Sesiones a la medida",
];

test("presents photography as its own complete service module", async ({
  page,
}) => {
  await page.goto("/fotografia-profesional");

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  for (const categoryName of categoryNames) {
    await expect(
      page.getByRole("heading", { name: categoryName }),
    ).toBeVisible();
  }

  await expect(page.locator("[data-service-media]")).toHaveCount(5);
  await expect(
    page.getByRole("link", { name: "Hablar sobre mi proyecto" }),
  ).toHaveAttribute("href", "/contacto");
  await expect(
    page.getByRole("link", { name: "Contacto" }).last(),
  ).toHaveAttribute("href", "/contacto");
  await expect(page.getByRole("link", { name: /portafolio/i })).toHaveCount(0);
});

test("keeps photography content usable with a keyboard", async ({ page }) => {
  await page.goto("/fotografia-profesional");

  await page.getByRole("link", { name: "Saltar al contenido" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#contenido-principal")).toBeFocused();

  await page.getByRole("link", { name: "Hablar sobre mi proyecto" }).focus();
  await expect(
    page.getByRole("link", { name: "Hablar sobre mi proyecto" }),
  ).toBeFocused();
});
