export interface AvailabilityInquiry {
  name?: string;
  service?: "fotografia" | "evento-video" | "otro";
  eventDate?: string;
  message?: string;
}

const serviceLabels: Record<
  NonNullable<AvailabilityInquiry["service"]>,
  string
> = {
  fotografia: "Fotografía profesional",
  "evento-video": "Eventos y video",
  otro: "Otro servicio",
};

export function buildAvailabilityMessage(inquiry: AvailabilityInquiry): string {
  const lines = [
    "Hola, quisiera consultar disponibilidad con Estudios Estrada.",
  ];
  const name = inquiry.name?.trim();
  const eventDate = inquiry.eventDate?.trim();
  const message = inquiry.message?.trim();

  if (name) lines.push(`Nombre: ${name}`);
  if (inquiry.service)
    lines.push(`Servicio: ${serviceLabels[inquiry.service]}`);
  if (eventDate) lines.push(`Fecha: ${eventDate}`);
  if (message) lines.push("Detalles:", message);

  return lines.join("\n");
}

export function buildWhatsAppUrl(
  phoneE164: string,
  inquiry: AvailabilityInquiry,
): string | null {
  const normalizedPhone = phoneE164.trim().replace(/[\s().-]/g, "");
  if (!/^\+[1-9]\d{7,14}$/.test(normalizedPhone)) return null;

  const url = new URL(`https://wa.me/${normalizedPhone.slice(1)}`);
  url.searchParams.set("text", buildAvailabilityMessage(inquiry));
  return url.toString();
}
