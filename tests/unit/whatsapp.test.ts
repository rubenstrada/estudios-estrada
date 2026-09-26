import { existsSync } from "node:fs";
import { resolve } from "node:path";

import { beforeAll, describe, expect, test } from "vitest";

type WhatsAppModule = typeof import("../../src/lib/whatsapp");
const modulePath = resolve(import.meta.dirname, "../../src/lib/whatsapp.ts");
let whatsapp: WhatsAppModule;

beforeAll(async () => {
  expect(existsSync(modulePath), "src/lib/whatsapp.ts should exist").toBe(true);
  if (existsSync(modulePath)) whatsapp = await import(modulePath);
});

describe("WhatsApp availability inquiries", () => {
  test("builds a useful introductory message from an empty inquiry", () => {
    expect(whatsapp.buildAvailabilityMessage({})).toBe(
      "Hola, quisiera consultar disponibilidad con Estudios Estrada.",
    );
  });

  test("keeps accents, ampersands, date, service, and multiline details readable", () => {
    expect(
      whatsapp.buildAvailabilityMessage({
        name: "María & José",
        service: "evento-video",
        eventDate: "2026-12-15",
        message: "Ceremonia & fiesta\n100 invitados",
      }),
    ).toBe(
      [
        "Hola, quisiera consultar disponibilidad con Estudios Estrada.",
        "Nombre: María & José",
        "Servicio: Eventos y video",
        "Fecha: 2026-12-15",
        "Detalles:",
        "Ceremonia & fiesta\n100 invitados",
      ].join("\n"),
    );
  });

  test("normalizes common phone punctuation before creating the wa.me URL", () => {
    expect(whatsapp.buildWhatsAppUrl("+52 (81) 1234-5678", {})).toBe(
      "https://wa.me/528112345678?text=Hola%2C+quisiera+consultar+disponibilidad+con+Estudios+Estrada.",
    );
  });

  test.each(["", "8112345678", "+1234567", "+1234567890123456", "phone"])(
    "returns null for missing or invalid number %j",
    (number) => {
      expect(whatsapp.buildWhatsAppUrl(number, {})).toBeNull();
    },
  );

  test("encodes inquiry text exactly once", () => {
    const inquiry = {
      name: "José & Ana",
      message: "Foto + video\n¿Está disponible?",
    };
    const url = whatsapp.buildWhatsAppUrl("+5218112345678", inquiry);

    expect(url).not.toBeNull();
    expect(new URL(url!).searchParams.get("text")).toBe(
      whatsapp.buildAvailabilityMessage(inquiry),
    );
    expect(url).not.toContain("%25C3");
  });
});
