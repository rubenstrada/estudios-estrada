import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

import * as serviceContent from "../../src/content/services";

type EventVideoService = {
  title: string;
  href: string;
  categories: Array<{
    title: string;
    description: string;
    imageAlt: string;
    mediaStatus: string;
  }>;
};

const eventVideoService = (
  "eventVideoService" in serviceContent
    ? (serviceContent as Record<string, unknown>).eventVideoService
    : undefined
) as EventVideoService | undefined;

const expectedCategories = [
  "Bodas y celebraciones",
  "Eventos corporativos e institucionales",
  "Producciones especiales",
  "Fotografía y video en una misma cobertura",
];

describe("events and video content", () => {
  test("provides the approved events page and complete company offer", () => {
    expect(
      existsSync(
        resolve(import.meta.dirname, "../../src/pages/eventos-y-video.astro"),
      ),
      "the events route should exist",
    ).toBe(true);
    expect(
      eventVideoService,
      "eventVideoService should be defined",
    ).toBeDefined();
    if (!eventVideoService) return;

    expect(eventVideoService.title).toBe(
      "Eventos sociales y producciones especiales.",
    );
    expect(eventVideoService.href).toBe("/eventos-y-video");
    expect(
      eventVideoService.categories.map((category) => category.title),
    ).toEqual(expectedCategories);
  });

  test("describes each event service as a professional company offering", () => {
    expect(
      eventVideoService,
      "eventVideoService should be defined",
    ).toBeDefined();
    if (!eventVideoService) return;

    for (const category of eventVideoService.categories) {
      expect(category.description.trim().length).toBeGreaterThan(55);
      expect(category.imageAlt.trim().length).toBeGreaterThan(20);
      expect(category.mediaStatus).toBe("placeholder");
    }
  });
});
