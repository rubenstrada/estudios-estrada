import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "../..");

const expectedAssets = [
  { file: "logo-dark-amber.png", width: 1254, height: 1254 },
  { file: "logo-dark.png", width: 1536, height: 1024 },
  { file: "logo-gold.png", width: 1312, height: 1199 },
] as const;

function readPngHeader(path: string) {
  const buffer = readFileSync(path);
  return {
    signature: buffer.subarray(1, 4).toString("ascii"),
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
    colorType: buffer.readUInt8(25),
  };
}

describe("brand assets", () => {
  test.each(expectedAssets)(
    "preserves $file at its original dimensions",
    (asset) => {
      const path = resolve(root, "src/assets/brand", asset.file);
      expect(existsSync(path), `${asset.file} should exist`).toBe(true);
      if (!existsSync(path)) return;

      const header = readPngHeader(path);
      expect(header.signature).toBe("PNG");
      expect(header.width).toBe(asset.width);
      expect(header.height).toBe(asset.height);
      expect(header.width).toBeGreaterThanOrEqual(1200);
      expect(header.height).toBeGreaterThanOrEqual(1000);
    },
  );

  test.each(["logo-dark.png", "logo-gold.png"])(
    "keeps an alpha channel in %s for controlled background treatment",
    (file) => {
      const path = resolve(root, "src/assets/brand", file);
      expect(existsSync(path), `${file} should exist`).toBe(true);
      if (!existsSync(path)) return;

      expect([4, 6]).toContain(readPngHeader(path).colorType);
    },
  );
});
