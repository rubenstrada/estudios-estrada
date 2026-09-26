import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, test } from "vitest";

const root = resolve(import.meta.dirname, "../..");
const validatorPath = resolve(root, "scripts/validate-production-config.mjs");

async function loadValidator(): Promise<
  (env: Record<string, string | undefined>) => string[]
> {
  expect(existsSync(validatorPath), "production validator should exist").toBe(
    true,
  );
  if (!existsSync(validatorPath)) return () => ["validator missing"];

  const { validateProductionConfig } = await import(validatorPath);
  return validateProductionConfig;
}

const validEnvironment = {
  PUBLIC_SITE_URL: "https://estudiosestrada.mx",
  PUBLIC_WHATSAPP_NUMBER: "+5218112345678",
  PUBLIC_MEDIA_APPROVED: "true",
  PUBLIC_PRIVACY_NOTICE_APPROVED: "true",
};

describe("production configuration gate", () => {
  test("reports every required value when configuration is empty", async () => {
    const validate = await loadValidator();
    const errors = validate({});

    expect(errors).toEqual([
      "PUBLIC_SITE_URL es obligatorio.",
      "PUBLIC_WHATSAPP_NUMBER es obligatorio.",
      "PUBLIC_MEDIA_APPROVED debe ser true antes de publicar.",
      "PUBLIC_PRIVACY_NOTICE_APPROVED debe ser true antes de publicar.",
    ]);
  });

  test.each(["not-a-url", "http://estudiosestrada.mx", "https://example.com"])(
    "rejects the unsafe or provisional site URL %s",
    async (siteUrl) => {
      const validate = await loadValidator();
      const errors = validate({
        ...validEnvironment,
        PUBLIC_SITE_URL: siteUrl,
      });

      expect(errors.some((error) => error.startsWith("PUBLIC_SITE_URL"))).toBe(
        true,
      );
    },
  );

  test.each([
    "8112345678",
    "+52 81 1234 5678",
    "+1234567",
    "+1234567890123456",
  ])("rejects malformed E.164 WhatsApp number %s", async (number) => {
    const validate = await loadValidator();
    const errors = validate({
      ...validEnvironment,
      PUBLIC_WHATSAPP_NUMBER: number,
    });

    expect(errors).toContain(
      "PUBLIC_WHATSAPP_NUMBER debe usar formato E.164, por ejemplo +5218112345678.",
    );
  });

  test("rejects placeholder media and an unapproved privacy notice", async () => {
    const validate = await loadValidator();
    const errors = validate({
      ...validEnvironment,
      PUBLIC_MEDIA_APPROVED: "false",
      PUBLIC_PRIVACY_NOTICE_APPROVED: "false",
    });

    expect(errors).toEqual([
      "PUBLIC_MEDIA_APPROVED debe ser true antes de publicar.",
      "PUBLIC_PRIVACY_NOTICE_APPROVED debe ser true antes de publicar.",
    ]);
  });

  test("accepts a complete verified production configuration", async () => {
    const validate = await loadValidator();
    expect(validate(validEnvironment)).toEqual([]);
  });
});
