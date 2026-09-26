import type { ContactChannel, SiteConfig } from "../content/types";

export interface PublicSiteEnvironment {
  PUBLIC_SITE_URL?: string;
  PUBLIC_WHATSAPP_NUMBER?: string;
  PUBLIC_PHONE?: string;
  PUBLIC_EMAIL?: string;
  PUBLIC_INSTAGRAM_URL?: string;
  PUBLIC_FACEBOOK_URL?: string;
  PUBLIC_SERVICE_AREA?: string;
}

function optional(value: string | undefined): string | undefined {
  const normalized = value?.trim();
  return normalized ? normalized : undefined;
}

export function createSiteConfig(env: PublicSiteEnvironment): SiteConfig {
  const siteUrl = optional(env.PUBLIC_SITE_URL);
  const whatsappNumber = optional(env.PUBLIC_WHATSAPP_NUMBER);
  const phone = optional(env.PUBLIC_PHONE);
  const email = optional(env.PUBLIC_EMAIL);
  const instagramUrl = optional(env.PUBLIC_INSTAGRAM_URL);
  const facebookUrl = optional(env.PUBLIC_FACEBOOK_URL);
  const serviceArea = optional(env.PUBLIC_SERVICE_AREA);
  const contactChannels: ContactChannel[] = [];

  if (whatsappNumber) {
    contactChannels.push({
      kind: "whatsapp",
      label: "WhatsApp",
      value: whatsappNumber,
      href: `https://wa.me/${whatsappNumber.replace(/\D/g, "")}`,
    });
  }

  if (phone) {
    contactChannels.push({
      kind: "phone",
      label: "Teléfono",
      value: phone,
      href: `tel:${phone}`,
    });
  }

  if (email) {
    contactChannels.push({
      kind: "email",
      label: "Correo",
      value: email,
      href: `mailto:${email}`,
    });
  }

  if (instagramUrl) {
    contactChannels.push({
      kind: "instagram",
      label: "Instagram",
      value: "Instagram",
      href: instagramUrl,
    });
  }

  if (facebookUrl) {
    contactChannels.push({
      kind: "facebook",
      label: "Facebook",
      value: "Facebook",
      href: facebookUrl,
    });
  }

  return {
    name: "Estudios Estrada",
    description:
      "Fotografía profesional y producción audiovisual para personas, eventos y empresas.",
    siteUrl,
    whatsappNumber,
    phone,
    email,
    instagramUrl,
    facebookUrl,
    serviceArea,
    contactChannels,
  };
}
