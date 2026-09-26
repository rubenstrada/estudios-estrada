import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "../..");
const approvedRoutes = [
  "/",
  "/fotografia-profesional",
  "/eventos-y-video",
  "/quienes-somos",
  "/contacto",
] as const;

describe("site content contract", () => {
  test("keeps the approved five-route navigation in order", async () => {
    const modulePath = resolve(root, "src/content/site.ts");
    expect(existsSync(modulePath), "src/content/site.ts should exist").toBe(
      true,
    );
    if (!existsSync(modulePath)) return;

    const { navigation } = await import(modulePath);

    expect(navigation.map((item: { href: string }) => item.href)).toEqual(
      approvedRoutes,
    );
  });

  test("points service links only to approved routes or in-page anchors", async () => {
    const modulePath = resolve(root, "src/content/services.ts");
    expect(existsSync(modulePath), "src/content/services.ts should exist").toBe(
      true,
    );
    if (!existsSync(modulePath)) return;

    const { services } = await import(modulePath);
    const validTargets = new Set<string>(approvedRoutes);

    for (const service of services as Array<{ href: string }>) {
      expect(
        service.href.startsWith("#") || validTargets.has(service.href),
      ).toBe(true);
    }
  });

  test("gives every service specific Spanish benefit copy", async () => {
    const modulePath = resolve(root, "src/content/services.ts");
    expect(existsSync(modulePath), "src/content/services.ts should exist").toBe(
      true,
    );
    if (!existsSync(modulePath)) return;

    const { services } = await import(modulePath);

    expect(services).toHaveLength(3);
    for (const service of services as Array<{
      title: string;
      description: string;
    }>) {
      expect(service.title.trim().length).toBeGreaterThan(3);
      expect(service.description.trim().length).toBeGreaterThan(35);
      expect(service.description).toMatch(/[áéíóúñ]/i);
    }
  });

  test("does not position the company as a portfolio or quotation calculator", async () => {
    const sitePath = resolve(root, "src/content/site.ts");
    const pagesPath = resolve(root, "src/content/pages.ts");
    expect(existsSync(sitePath) && existsSync(pagesPath)).toBe(true);
    if (!existsSync(sitePath) || !existsSync(pagesPath)) return;

    const [{ navigation }, { pageSeo }] = await Promise.all([
      import(sitePath),
      import(pagesPath),
    ]);
    const labels = navigation
      .map((item: { label: string }) => item.label)
      .join(" ");
    const titles = Object.values(pageSeo as Record<string, { title: string }>)
      .map((page) => page.title)
      .join(" ");

    expect(`${labels} ${titles}`).not.toMatch(/portafolio|cotizador/i);
  });
});
