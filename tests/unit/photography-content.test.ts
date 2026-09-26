import { describe, expect, test } from "vitest";

import * as serviceContent from "../../src/content/services";

type PhotographyService = {
  href: string;
  categories: Array<{
    title: string;
    description: string;
    imageAlt: string;
    mediaStatus: string;
  }>;
};

const photographyService = (
  "photographyService" in serviceContent
    ? (serviceContent as Record<string, unknown>).photographyService
    : undefined
) as PhotographyService | undefined;

const expectedCategories = [
  "Retratos personales, familiares y de grupo",
  "Retratos profesionales y corporativos",
  "Sesiones en estudio o locación",
  "Fotografía de producto y marca",
  "Sesiones a la medida",
];

describe("professional photography content", () => {
  test("includes every approved photography category", () => {
    expect(
      photographyService,
      "photographyService should be defined",
    ).toBeDefined();
    if (!photographyService) return;

    expect(
      photographyService.categories.map((category) => category.title),
    ).toEqual(expectedCategories);
  });

  test("describes an outcome and required alternative text for every category", () => {
    expect(
      photographyService,
      "photographyService should be defined",
    ).toBeDefined();
    if (!photographyService) return;

    for (const category of photographyService.categories) {
      expect(category.description.trim().length).toBeGreaterThan(55);
      expect(category.imageAlt.trim().length).toBeGreaterThan(20);
      expect(category.mediaStatus).toBe("placeholder");
    }
  });

  test("keeps photography examples inside the service instead of a portfolio route", () => {
    expect(
      photographyService,
      "photographyService should be defined",
    ).toBeDefined();
    if (!photographyService) return;

    expect(photographyService.href).toBe("/fotografia-profesional");
    expect(JSON.stringify(photographyService)).not.toMatch(/\/portafolio/i);
  });
});
