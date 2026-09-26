import type { CompanyPrinciple, MediaItem } from "./types";

export const filmRailItems = [
  { id: "retratos", kicker: "01", title: "Retratos" },
  { id: "eventos", kicker: "02", title: "Eventos" },
  { id: "empresas", kicker: "03", title: "Empresas" },
  { id: "producto", kicker: "04", title: "Producto" },
  { id: "video", kicker: "05", title: "Video" },
] as const satisfies readonly MediaItem[];

export const reasons = [
  {
    title: "Planeación adaptada",
    description:
      "Aterrizamos contigo el objetivo, el ritmo y las prioridades antes de comenzar.",
  },
  {
    title: "Producción profesional",
    description:
      "Cuidamos la captura de imagen y sonido de acuerdo con las necesidades del proyecto.",
  },
  {
    title: "Comunicación directa",
    description:
      "Mantenemos una conversación clara para tomar decisiones y resolver detalles a tiempo.",
  },
  {
    title: "Edición cuidadosa",
    description:
      "Seleccionamos y trabajamos cada entrega para conservar coherencia visual y narrativa.",
  },
] as const satisfies readonly CompanyPrinciple[];
