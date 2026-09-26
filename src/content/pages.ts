import type { PageSeo, RoutePath } from "./types";

export const pageSeo = {
  "/": {
    title: "Estudios Estrada | Fotografía y video profesional",
    description:
      "Sesiones de fotografía, producción de video y cobertura audiovisual para personas, marcas y eventos.",
  },
  "/fotografia-profesional": {
    title: "Fotografía profesional | Estudios Estrada",
    description:
      "Sesiones profesionales, retratos, fotografía corporativa y de producto en estudio o locación.",
  },
  "/eventos-y-video": {
    title: "Cobertura de eventos y video | Estudios Estrada",
    description:
      "Fotografía y video profesional para bodas, celebraciones, eventos corporativos y producciones especiales.",
  },
  "/quienes-somos": {
    title: "Equipo de fotografía y video | Estudios Estrada",
    description:
      "Conoce al equipo y el proceso de Estudios Estrada para sesiones de fotografía, eventos y producciones audiovisuales.",
  },
  "/contacto": {
    title: "Contacto | Estudios Estrada",
    description:
      "Consulta disponibilidad para tu sesión de fotografía, cobertura de evento o producción de video con Estudios Estrada.",
  },
} as const satisfies Record<RoutePath, PageSeo>;
