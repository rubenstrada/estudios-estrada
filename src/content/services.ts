import type { ServiceSummary } from "./types";

export const services = [
  {
    id: "fotografia",
    eyebrow: "Imagen con intención",
    title: "Fotografía profesional",
    description:
      "Creamos fotografías cuidadas para personas, familias, equipos, productos y marcas, en estudio o locación.",
    href: "/fotografia-profesional",
  },
  {
    id: "eventos",
    eyebrow: "Presencia y atención",
    title: "Cobertura de eventos",
    description:
      "Documentamos celebraciones y encuentros profesionales con una cobertura fotográfica planeada para cada ocasión.",
    href: "/eventos-y-video",
  },
  {
    id: "video",
    eyebrow: "Historias en movimiento",
    title: "Producción de video",
    description:
      "Grabamos y editamos piezas audiovisuales para conservar un evento, comunicar una idea o presentar una organización.",
    href: "/eventos-y-video",
  },
] as const satisfies readonly ServiceSummary[];
