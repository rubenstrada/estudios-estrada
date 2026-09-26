import type { PageSeo, RoutePath } from "./types";

export const pageSeo = {
  "/": {
    title: "Estudios Estrada | Fotografía y producción audiovisual",
    description:
      "Servicios profesionales de fotografía, cobertura de eventos y producción de video para personas, empresas y marcas.",
  },
  "/fotografia-profesional": {
    title: "Fotografía profesional | Estudios Estrada",
    description:
      "Retratos, fotografía corporativa, producto y sesiones profesionales en estudio o locación.",
  },
  "/eventos-y-video": {
    title: "Eventos sociales y producciones especiales | Estudios Estrada",
    description:
      "Fotografía, grabación y producción audiovisual para eventos sociales, empresariales, institucionales y proyectos especiales.",
  },
  "/quienes-somos": {
    title: "Quiénes somos | Estudios Estrada",
    description:
      "Conoce el enfoque, el proceso y las capacidades de Estudios Estrada para proyectos fotográficos y audiovisuales.",
  },
  "/contacto": {
    title: "Contacto | Estudios Estrada",
    description:
      "Cuéntanos qué necesitas y consulta la disponibilidad de Estudios Estrada para tu sesión, evento o producción.",
  },
} as const satisfies Record<RoutePath, PageSeo>;
