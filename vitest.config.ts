/// <reference types="vitest/config" />

import { getViteConfig } from "astro/config";

export default getViteConfig({
  test: {
    include: ["tests/{smoke,unit}/**/*.test.ts"],
    passWithNoTests: false,
  },
});
