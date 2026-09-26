import type { ServiceDetail, ServiceSummary } from "./types";

export const services = [
  {
    id: "fotografia",
    eyebrow: "Sesiones y producción",
    title: "Fotografía profesional",
    description:
      "Realizamos retratos, fotografía corporativa y de producto en estudio o locación, con dirección profesional y entregas definidas.",
    href: "/fotografia-profesional",
  },
  {
    id: "eventos",
    eyebrow: "Cobertura profesional",
    title: "Cobertura de eventos",
    description:
      "Cubrimos bodas, celebraciones y eventos corporativos con fotografía, video o ambos servicios.",
    href: "/eventos-y-video",
  },
  {
    id: "video",
    eyebrow: "Producción audiovisual",
    title: "Producción de video",
    description:
      "Producimos y editamos videos para eventos, marcas, organizaciones y proyectos especiales, desde la planeación hasta la entrega.",
    href: "/eventos-y-video",
  },
] as const satisfies readonly ServiceSummary[];

export const photographyService = {
  id: "fotografia",
  eyebrow: "Fotografía profesional",
  title: "Sesiones de fotografía para personas, marcas y productos.",
  description:
    "Sesiones profesionales para personas, familias, equipos, productos y marcas, en estudio o locación.",
  href: "/fotografia-profesional",
  introduction:
    "Realizamos sesiones en estudio o locación. Antes de fotografiar definimos el uso, el estilo, las personas, el horario y las entregas para producir las imágenes que necesitas.",
  categories: [
    {
      id: "retratos-personales",
      title: "Retratos personales, familiares y de grupo",
      description:
        "Dirigimos la sesión para que cada persona se sienta cómoda y reciba retratos naturales, cuidados y listos para imprimir o compartir.",
      imageAlt:
        "Retrato profesional de personas o familia realizado por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "retratos-corporativos",
      title: "Retratos profesionales y corporativos",
      description:
        "Creamos imágenes consistentes para perfiles, equipos, sitios web y comunicación institucional, de acuerdo con la identidad de cada organización.",
      imageAlt:
        "Retrato corporativo con iluminación profesional realizado por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "estudio-locacion",
      title: "Sesiones en estudio o locación",
      description:
        "Trabajamos en el espacio que mejor funcione para el resultado buscado y preparamos iluminación, encuadres y tiempos antes de la sesión.",
      imageAlt:
        "Sesión fotográfica profesional en estudio o locación preparada por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "producto-marca",
      title: "Fotografía de producto y marca",
      description:
        "Producimos fotografías para catálogos, redes, campañas y sitios web con una dirección visual alineada a la comunicación de la marca.",
      imageAlt:
        "Fotografía de producto y marca con dirección visual de Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "sesiones-medida",
      title: "Sesiones a la medida",
      description:
        "Diseñamos una sesión específica cuando el proyecto requiere una locación, dinámica, equipo o formato de entrega diferente.",
      imageAlt:
        "Producción fotográfica personalizada planeada por Estudios Estrada",
      mediaStatus: "placeholder",
    },
  ],
} as const satisfies ServiceDetail;

export const eventVideoService = {
  id: "eventos",
  eyebrow: "Eventos y video",
  title: "Cobertura profesional para eventos y producciones.",
  description:
    "Documentamos eventos con fotografía profesional, grabación de video y una producción coordinada de principio a fin.",
  href: "/eventos-y-video",
  introduction:
    "Cubrimos eventos con fotografía, video o ambos servicios. Antes de la fecha definimos horarios, momentos prioritarios, necesidades técnicas y entregas para coordinar la producción completa.",
  categories: [
    {
      id: "bodas-celebraciones",
      title: "Bodas y celebraciones",
      description:
        "Realizamos fotografía y video para bodas, aniversarios, graduaciones, cumpleaños y reuniones familiares, desde los preparativos hasta los momentos principales.",
      imageAlt:
        "Cobertura profesional de una boda o celebración realizada por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "corporativos-institucionales",
      title: "Eventos corporativos e institucionales",
      description:
        "Cubrimos conferencias, inauguraciones, encuentros empresariales, ceremonias y actividades institucionales con materiales listos para comunicación interna, prensa o redes.",
      imageAlt:
        "Cobertura fotográfica y audiovisual de un evento corporativo por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "producciones-especiales",
      title: "Producciones especiales",
      description:
        "Planeamos presentaciones, espectáculos y proyectos culturales que requieren iluminación, sonido, horarios o entregas audiovisuales específicas.",
      imageAlt:
        "Producción audiovisual especial planeada y realizada por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "fotografia-video",
      title: "Fotografía y video en una misma cobertura",
      description:
        "Coordinamos fotógrafos y videógrafos bajo un mismo plan para entregar imágenes consistentes, videos editados y versiones listas para publicar.",
      imageAlt:
        "Equipo de fotografía y video de Estudios Estrada trabajando en un evento",
      mediaStatus: "placeholder",
    },
  ],
} as const satisfies ServiceDetail;

export const serviceProcess = [
  {
    title: "Definimos tu sesión",
    description:
      "Acordamos el objetivo, el uso de las imágenes y el tipo de entrega.",
  },
  {
    title: "Preparamos la producción",
    description:
      "Definimos estilo, locación, horario, participantes, iluminación y equipo.",
  },
  {
    title: "Realizamos las fotografías",
    description:
      "Dirigimos la sesión y cuidamos a las personas, la luz y los detalles importantes.",
  },
  {
    title: "Editamos y entregamos",
    description:
      "Seleccionamos, editamos y preparamos los archivos acordados para su entrega.",
  },
] as const;

export const eventVideoProcess = [
  {
    title: "Definimos la cobertura",
    description:
      "Definimos el tipo de evento, los momentos esenciales y el uso final de las fotografías o el video.",
  },
  {
    title: "Preparamos la logística",
    description:
      "Coordinamos horarios, espacios, iluminación, audio y responsables antes del evento.",
  },
  {
    title: "Cubrimos el evento",
    description:
      "Seguimos el programa y nos coordinamos para registrar los momentos y participantes prioritarios.",
  },
  {
    title: "Editamos y entregamos",
    description:
      "Seleccionamos y editamos fotografías y video en los formatos y tiempos acordados.",
  },
] as const;
