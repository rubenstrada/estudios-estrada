import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import sharp from "sharp";
import { beforeAll, describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "../..");
const astroCli = resolve(root, "node_modules/astro/bin/astro.mjs");

beforeAll(() => {
  execFileSync(process.execPath, [astroCli, "build"], {
    cwd: root,
    env: { ...process.env, CI: "1" },
    stdio: "pipe",
  });
});

describe("theme-aware favicon", () => {
  test("builds one favicon declaration for each system color scheme", () => {
    const html = readFileSync(resolve(root, "dist/index.html"), "utf8");
    const iconLinks = html.match(/<link\b[^>]*\brel="icon"[^>]*>/g) ?? [];

    expect(iconLinks).toHaveLength(2);
    expect(iconLinks).toEqual(
      expect.arrayContaining([
        expect.stringMatching(
          /href="\/favicon-light\.png\?v=2"[^>]*media="\(prefers-color-scheme: light\)"/,
        ),
        expect.stringMatching(
          /href="\/favicon-dark\.png\?v=2"[^>]*media="\(prefers-color-scheme: dark\)"/,
        ),
      ]),
    );
  });

  test("ships transparent PNG variants with matching logo geometry", async () => {
    const paths = [
      resolve(root, "public/favicon-light.png"),
      resolve(root, "public/favicon-dark.png"),
    ];

    for (const path of paths) {
      expect(existsSync(path), `${path} should exist`).toBe(true);
    }

    if (paths.some((path) => !existsSync(path))) return;

    const metadata = await Promise.all(
      paths.map((path) => sharp(path).metadata()),
    );
    expect(metadata).toEqual([
      expect.objectContaining({
        format: "png",
        width: 1254,
        height: 1254,
        hasAlpha: true,
      }),
      expect.objectContaining({
        format: "png",
        width: 1254,
        height: 1254,
        hasAlpha: true,
      }),
    ]);

    const masks = await Promise.all(
      paths.map(async (path) => {
        const { data, info } = await sharp(path)
          .ensureAlpha()
          .resize(128, 128, { fit: "fill" })
          .raw()
          .toBuffer({ resolveWithObject: true });

        const mask: boolean[] = [];
        for (let index = 3; index < data.length; index += info.channels) {
          mask.push(data[index] > 16);
        }
        return mask;
      }),
    );

    for (const mask of masks) {
      let minX = 128;
      let minY = 128;
      let maxX = -1;
      let maxY = -1;

      for (let index = 0; index < mask.length; index += 1) {
        if (!mask[index]) continue;

        const x = index % 128;
        const y = Math.floor(index / 128);
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }

      expect((maxX - minX + 1) / 128).toBeGreaterThan(0.84);
      expect((maxY - minY + 1) / 128).toBeGreaterThan(0.9);
    }

    let intersection = 0;
    let union = 0;
    for (let index = 0; index < masks[0].length; index += 1) {
      if (masks[0][index] && masks[1][index]) intersection += 1;
      if (masks[0][index] || masks[1][index]) union += 1;
    }

    expect(intersection / union).toBeGreaterThan(0.99);
  });
});
