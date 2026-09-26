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

  test("declares the static output Cloudflare Workers must deploy", () => {
    const wranglerPath = resolve(root, "wrangler.json");
    expect(existsSync(wranglerPath), "wrangler.json should exist").toBe(true);

    if (!existsSync(wranglerPath)) return;

    const wrangler = readJson("wrangler.json") as {
      name?: string;
      compatibility_date?: string;
      assets?: { directory?: string };
    };

    expect(wrangler.name).toBe("estudios-estrada");
    expect(wrangler.compatibility_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(wrangler.assets?.directory).toBe("./dist");
  });

  test("pins a compatible Node runtime and local Wrangler command", () => {
    const packageJson = readJson("package.json") as {
      engines?: { node?: string };
      scripts?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };

    expect(readFileSync(resolve(root, ".nvmrc"), "utf8").trim()).toBe(
      "22.13.0",
    );
    expect(packageJson.engines?.node).toBe(">=22.13.0");
    expect(packageJson.scripts?.deploy).toBe("wrangler deploy");
    expect(packageJson.devDependencies?.wrangler).toBeTruthy();
  });
});
