import { expect, test } from "@playwright/test";

const categoryNames = [
  "Bodas y celebraciones",
  "Eventos corporativos e institucionales",
  "Producciones especiales",
  "Fotografía y video en una misma cobertura",
];

test("presents events and video as a complete company service", async ({
  page,
}) => {
  await page.goto("/eventos-y-video");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Eventos sociales y producciones especiales.",
  );

  for (const categoryName of categoryNames) {
    await expect(
      page.getByRole("heading", { name: categoryName, exact: true }),
    ).toBeVisible();
  }

  await expect(page.locator("[data-service-media]")).toHaveCount(4);
  await expect(
    page.getByRole("link", { name: "Hablar sobre mi proyecto" }),
  ).toHaveAttribute("href", "/contacto");
  await expect(page.getByRole("link", { name: /portafolio/i })).toHaveCount(0);
});
