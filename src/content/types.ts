export type RoutePath =
  | "/"
  | "/fotografia-profesional"
  | "/eventos-y-video"
  | "/quienes-somos"
  | "/contacto";

export interface NavigationItem {
  label: string;
  href: RoutePath;
}

export interface ContactChannel {
  kind: "whatsapp" | "phone" | "email" | "instagram" | "facebook";
  label: string;
  value: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  siteUrl?: string;
  whatsappNumber?: string;
  phone?: string;
  email?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  serviceArea?: string;
  contactChannels: readonly ContactChannel[];
}

export interface ServiceSummary {
  id: "fotografia" | "eventos" | "video";
  eyebrow: string;
  title: string;
  description: string;
  href: RoutePath;
}

export interface ServiceDetail extends ServiceSummary {
  introduction: string;
  categories: readonly ServiceCategoryContent[];
}

export interface ServiceCategoryContent {
  id: string;
  title: string;
  description: string;
  imageAlt: string;
  mediaStatus: "placeholder" | "approved";
}

export interface PageSeo {
  title: string;
  description: string;
}

export interface CompanyPrinciple {
  title: string;
  description: string;
}

export interface MediaItem {
  id: string;
  kicker: string;
  title: string;
  href: RoutePath;
}
