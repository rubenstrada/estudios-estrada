import type { CompanyPrinciple, MediaItem } from "./types";

export const filmRailItems = [
  {
    id: "retratos",
    kicker: "01",
    title: "Retratos",
    href: "/fotografia-profesional",
  },
  {
    id: "eventos",
    kicker: "02",
    title: "Eventos",
    href: "/eventos-y-video",
  },
  {
    id: "empresas",
    kicker: "03",
    title: "Empresas",
    href: "/fotografia-profesional",
  },
  {
    id: "producto",
    kicker: "04",
    title: "Producto",
    href: "/fotografia-profesional",
  },
  {
    id: "video",
    kicker: "05",
    title: "Video",
    href: "/eventos-y-video",
  },
] as const satisfies readonly MediaItem[];

export const reasons = [
  {
    title: "Definimos el servicio",
    description:
      "Acordamos el objetivo, la fecha, la ubicación y las entregas que necesitas.",
  },
  {
    title: "Preparamos la producción",
    description:
      "Organizamos horarios, equipo, iluminación y responsables antes de comenzar.",
  },
  {
    title: "Realizamos la sesión o cobertura",
    description:
      "Trabajamos con dirección profesional y atención a las prioridades acordadas.",
  },
  {
    title: "Editamos y entregamos",
    description:
      "Seleccionamos y preparamos el material en los formatos y tiempos definidos.",
  },
] as const satisfies readonly CompanyPrinciple[];
