import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeAll, describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "../..");
const revealPath = resolve(root, "src/components/motion/Reveal.astro");
const filmRailPath = resolve(root, "src/components/motion/FilmRail.astro");
let container: AstroContainer;
type AstroComponent = Parameters<AstroContainer["renderToString"]>[0];
let Reveal: AstroComponent;
let FilmRail: AstroComponent;

beforeAll(async () => {
  expect(existsSync(revealPath), "Reveal.astro should exist").toBe(true);
  expect(existsSync(filmRailPath), "FilmRail.astro should exist").toBe(true);
  if (!existsSync(revealPath) || !existsSync(filmRailPath)) return;

  container = await AstroContainer.create();
  Reveal = (await import(revealPath)).default;
  FilmRail = (await import(filmRailPath)).default;
});

describe("accessible motion markup", () => {
  test("renders essential reveal content visibly before JavaScript enhancement", async () => {
    const html = await container.renderToString(Reveal, {
      slots: { default: "<p>Contenido esencial</p>" },
      props: { as: "section", delay: 80, distance: "small" },
    });

    expect(html).toContain("Contenido esencial");
    expect(html).toContain("data-reveal");
    expect(html).not.toContain('aria-hidden="true"');
    expect(html).not.toContain('style="opacity:0');
  });

  test("marks only duplicated film frames as decorative", async () => {
    const html = await container.renderToString(FilmRail, {
      props: {
        label: "Servicios de Estudios Estrada",
        items: [
          {
            id: "foto",
            kicker: "01",
            title: "Fotografía profesional",
            href: "/fotografia-profesional",
          },
          {
            id: "eventos",
            kicker: "02",
            title: "Cobertura de eventos",
            href: "/eventos-y-video",
          },
          {
            id: "video",
            kicker: "03",
            title: "Producción de video",
            href: "/eventos-y-video",
          },
        ],
      },
    });

    expect(html).toContain('aria-label="Servicios de Estudios Estrada"');
    expect(html.match(/class="film-frame" aria-hidden="true"/g)).toHaveLength(
      3,
    );
    expect(html.match(/Fotografía profesional/g)).toHaveLength(2);
    expect(html.match(/<a /g)).toHaveLength(3);
    expect(html).toContain('href="/fotografia-profesional"');
    expect(html.match(/href="\/eventos-y-video"/g)).toHaveLength(2);
    expect(html).not.toContain("<img");
    expect(html).not.toContain("<button");
  });
});
