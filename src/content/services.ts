import type { ServiceDetail, ServiceSummary } from "./types";

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

export const photographyService = {
  id: "fotografia",
  eyebrow: "Fotografía profesional",
  title: "Imágenes pensadas para representar, conservar y comunicar.",
  description:
    "Sesiones profesionales para personas, familias, equipos, productos y marcas, en estudio o locación.",
  href: "/fotografia-profesional",
  introduction:
    "Cada sesión parte de un objetivo concreto. Definimos el estilo, el espacio y el tipo de entrega para producir fotografías coherentes con tu historia o con la identidad de tu organización.",
  categories: [
    {
      id: "retratos-personales",
      title: "Retratos personales, familiares y de grupo",
      description:
        "Creamos retratos con dirección cercana y una estética cuidada para conservar una etapa, celebrar un vínculo o reunir a las personas importantes.",
      imageAlt:
        "Retrato profesional de personas o familia realizado por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "retratos-corporativos",
      title: "Retratos profesionales y corporativos",
      description:
        "Producimos imágenes consistentes para perfiles, equipos y comunicación institucional, considerando el uso final y la personalidad de la organización.",
      imageAlt:
        "Retrato corporativo con iluminación profesional realizado por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "estudio-locacion",
      title: "Sesiones en estudio o locación",
      description:
        "Elegimos el espacio que mejor apoye la intención de las imágenes y planeamos iluminación, encuadres y tiempos antes de la sesión.",
      imageAlt:
        "Sesión fotográfica profesional en estudio o locación preparada por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "producto-marca",
      title: "Fotografía de producto y marca",
      description:
        "Desarrollamos fotografías para presentar productos, procesos y experiencias con una dirección visual alineada a la comunicación de la marca.",
      imageAlt:
        "Fotografía de producto y marca con dirección visual de Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "sesiones-medida",
      title: "Sesiones a la medida",
      description:
        "Cuando el proyecto no cabe en una categoría, diseñamos la sesión a partir del objetivo, la locación, las personas involucradas y las entregas necesarias.",
      imageAlt:
        "Producción fotográfica personalizada planeada por Estudios Estrada",
      mediaStatus: "placeholder",
    },
  ],
} as const satisfies ServiceDetail;

export const eventVideoService = {
  id: "eventos",
  eyebrow: "Fotografía y producción audiovisual",
  title: "Eventos sociales y producciones especiales.",
  description:
    "Documentamos eventos con fotografía profesional, grabación de video y una producción coordinada de principio a fin.",
  href: "/eventos-y-video",
  introduction:
    "Planeamos cada cobertura según el tipo de evento, los momentos importantes y las entregas que necesitas. Nuestro equipo puede encargarse de fotografía, video o una producción conjunta para contar la historia completa.",
  categories: [
    {
      id: "bodas-celebraciones",
      title: "Bodas y celebraciones",
      description:
        "Cubrimos bodas, aniversarios, graduaciones, cumpleaños y reuniones familiares con atención a los momentos espontáneos, los detalles y las personas que hacen especial cada ocasión.",
      imageAlt:
        "Cobertura profesional de una boda o celebración realizada por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "corporativos-institucionales",
      title: "Eventos corporativos e institucionales",
      description:
        "Documentamos conferencias, inauguraciones, encuentros empresariales, ceremonias y actividades institucionales con una imagen coherente y adecuada para su comunicación.",
      imageAlt:
        "Cobertura fotográfica y audiovisual de un evento corporativo por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "producciones-especiales",
      title: "Producciones especiales",
      description:
        "Diseñamos coberturas para presentaciones, espectáculos, proyectos culturales y eventos con necesidades particulares de iluminación, sonido, horarios o entregas.",
      imageAlt:
        "Producción audiovisual especial planeada y realizada por Estudios Estrada",
      mediaStatus: "placeholder",
    },
    {
      id: "fotografia-video",
      title: "Fotografía y video en una misma cobertura",
      description:
        "Coordinamos fotografía, grabación y edición como una sola producción para conservar el evento en imágenes consistentes, piezas audiovisuales y versiones listas para compartir.",
      imageAlt:
        "Equipo de fotografía y video de Estudios Estrada trabajando en un evento",
      mediaStatus: "placeholder",
    },
  ],
} as const satisfies ServiceDetail;

export const serviceProcess = [
  {
    title: "Conversación inicial",
    description:
      "Entendemos el objetivo, el uso de las imágenes y las condiciones del proyecto.",
  },
  {
    title: "Planeación",
    description:
      "Definimos estilo, locación, horario, participantes y entregas antes de producir.",
  },
  {
    title: "Sesión",
    description:
      "Guiamos la captura con atención a las personas, la luz y los detalles importantes.",
  },
  {
    title: "Edición y entrega",
    description:
      "Seleccionamos, editamos y preparamos los archivos acordados para su entrega.",
  },
] as const;

export const eventVideoProcess = [
  {
    title: "Alcance y prioridades",
    description:
      "Definimos el tipo de evento, los momentos esenciales y el uso final de las fotografías o el video.",
  },
  {
    title: "Planeación y logística",
    description:
      "Coordinamos horarios, espacios, iluminación, audio y responsables antes del evento.",
  },
  {
    title: "Cobertura coordinada",
    description:
      "Nuestro equipo trabaja con atención al programa y con la flexibilidad necesaria para registrar lo inesperado.",
  },
  {
    title: "Edición y entrega",
    description:
      "Seleccionamos, editamos y organizamos cada material de acuerdo con las entregas acordadas.",
  },
] as const;
