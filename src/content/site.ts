import { createSiteConfig } from "../lib/config";
import type { NavigationItem } from "./types";

export const navigation = [
  { label: "Inicio", href: "/" },
  { label: "Fotografía profesional", href: "/fotografia-profesional" },
  { label: "Eventos y video", href: "/eventos-y-video" },
  { label: "Quiénes somos", href: "/quienes-somos" },
  { label: "Contacto", href: "/contacto" },
] as const satisfies readonly NavigationItem[];

export const siteConfig = createSiteConfig(import.meta.env);
