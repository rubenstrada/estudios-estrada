import { fileURLToPath } from "node:url";

const provisionalHosts = new Set([
  "example.com",
  "www.example.com",
  "localhost",
  "127.0.0.1",
]);

function isValidProductionUrl(value) {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      !provisionalHosts.has(url.hostname.toLowerCase())
    );
  } catch {
    return false;
  }
}

export function validateProductionConfig(env) {
  const errors = [];
  const siteUrl = env.PUBLIC_SITE_URL?.trim();
  const whatsappNumber = env.PUBLIC_WHATSAPP_NUMBER?.trim();

  if (!siteUrl) {
    errors.push("PUBLIC_SITE_URL es obligatorio.");
  } else if (!isValidProductionUrl(siteUrl)) {
    errors.push("PUBLIC_SITE_URL debe ser una URL HTTPS real, no provisional.");
  }

  if (!whatsappNumber) {
    errors.push("PUBLIC_WHATSAPP_NUMBER es obligatorio.");
  } else if (!/^\+[1-9]\d{7,14}$/.test(whatsappNumber)) {
    errors.push(
      "PUBLIC_WHATSAPP_NUMBER debe usar formato E.164, por ejemplo +5218112345678.",
    );
  }

  if (env.PUBLIC_MEDIA_APPROVED?.toLowerCase() !== "true") {
    errors.push("PUBLIC_MEDIA_APPROVED debe ser true antes de publicar.");
  }

  if (env.PUBLIC_PRIVACY_NOTICE_APPROVED?.toLowerCase() !== "true") {
    errors.push(
      "PUBLIC_PRIVACY_NOTICE_APPROVED debe ser true antes de publicar.",
    );
  }

  return errors;
}

const isDirectExecution = process.argv[1]
  ? fileURLToPath(import.meta.url) === process.argv[1]
  : false;

if (isDirectExecution) {
  const errors = validateProductionConfig(process.env);

  if (errors.length > 0) {
    console.error("La configuración de producción no está lista:");
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
  } else {
    console.log("La configuración de producción está completa.");
  }
}
