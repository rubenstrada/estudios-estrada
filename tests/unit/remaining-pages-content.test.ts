import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "../..");

describe("remaining company pages", () => {
  test.each([
    ["Quiénes somos", "src/pages/quienes-somos.astro"],
    ["Contacto", "src/pages/contacto.astro"],
  ])("implements the %s route", (_label, relativePath) => {
    expect(
      existsSync(resolve(root, relativePath)),
      `${relativePath} should exist`,
    ).toBe(true);
  });

  test("keeps company and contact copy in dedicated content modules", async () => {
    const companyPath = resolve(root, "src/content/company.ts");
    const contactPath = resolve(root, "src/content/contact.ts");

    expect(existsSync(companyPath), "company content should exist").toBe(true);
    expect(existsSync(contactPath), "contact content should exist").toBe(true);
    if (!existsSync(companyPath) || !existsSync(contactPath)) return;

    const [{ companyPrinciples }, { projectBriefItems }] = await Promise.all([
      import(companyPath),
      import(contactPath),
    ]);

    expect(companyPrinciples).toHaveLength(4);
    expect(projectBriefItems).toHaveLength(4);
  });
});
