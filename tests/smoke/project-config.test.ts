import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "../..");

function readJson(path: string): Record<string, unknown> {
  return JSON.parse(readFileSync(resolve(root, path), "utf8")) as Record<
    string,
    unknown
  >;
}

describe("project configuration", () => {
  test("exposes every command used by local development and CI", () => {
    const packageJson = readJson("package.json");
    const scripts = packageJson.scripts as Record<string, string>;

    expect(Object.keys(scripts)).toEqual(
      expect.arrayContaining([
        "dev",
        "build",
        "check",
        "lint",
        "format:check",
        "test:unit",
        "test:e2e",
      ]),
    );
  });

  test("uses a static Astro build with sitemap and Tailwind integrations", async () => {
    const configPath = resolve(root, "astro.config.mjs");
    expect(existsSync(configPath), "astro.config.mjs should exist").toBe(true);

    if (!existsSync(configPath)) return;

    const { default: config } = (await import(configPath)) as {
      default: {
        output?: string;
        integrations?: unknown[];
        vite?: { plugins?: unknown[] };
      };
    };

    expect(config.output).toBe("static");
    expect(config.integrations).toHaveLength(1);
    expect(config.vite?.plugins).toHaveLength(1);
  });

  test("enables Astro strict TypeScript rules", () => {
    const tsconfigPath = resolve(root, "tsconfig.json");
    expect(existsSync(tsconfigPath), "tsconfig.json should exist").toBe(true);

    if (!existsSync(tsconfigPath)) return;

    expect(readJson("tsconfig.json").extends).toBe("astro/tsconfigs/strict");
  });
});
