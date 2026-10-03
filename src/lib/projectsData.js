// Real project data sourced from the user's portfolio JSON.
// Visuals use abstract 3D renders (on-brand) since the original screenshots
// are not hosted in this app; titles, descriptions, stack and URLs are real.
const ABSTRACT_IMAGES = [
  '/images/proyectos/sistema.png',
  '/images/proyectos/entregax.png',
  '/images/proyectos/jpmetalmecanica.png',
  '/images/proyectos/notarionet.png',
  '/images/proyectos/raiya.png',
  '/images/proyectos/minikin.png',
  '/images/proyectos/rnr.png'
];

// Split a description sentence into honest feature bullets (real clauses).
const toFeatures = (desc) =>
  desc
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);

export const PROJECTS = [
  {
    id: "01",
    slug: "sistema-entregax",
    name: "Sistema EntregaX",
    tag: "Logística · Full-stack",
    url: "https://sistemaentregax.com/",
    desc: "Sistema de gestión para empresa de envíos internacionales desde China a México. Desarrollado en React.js para el frontend y CodeIgniter 4 para el backend, incluye panel administrativo, seguimiento de paquetes y optimización de procesos logísticos, además de sistema de roles y permisos por usuario.",
    longDesc:
      "Sistema de gestión para empresa de envíos internacionales desde China a México. Desarrollado en React.js para el frontend y CodeIgniter 4 para el backend, incluye panel administrativo, seguimiento de paquetes y optimización de procesos logísticos, además de sistema de roles y permisos por usuario.",
    img: ABSTRACT_IMAGES[0],
    stack: ["React", "CodeIgniter 4", "PHP"],
    features: toFeatures(
      "Sistema de gestión para empresa de envíos internacionales desde China a México. Desarrollado en React.js para el frontend y CodeIgniter 4 para el backend. Incluye panel administrativo, seguimiento de paquetes y optimización de procesos logísticos. Sistema de roles y permisos por usuario."
    ),
    gallery: [ABSTRACT_IMAGES[0], ABSTRACT_IMAGES[1], ABSTRACT_IMAGES[2]],
  },
  {
    id: "02",
    slug: "entregax",
    name: "EntregaX",
    tag: "Logística · Institucional",
    url: "https://entregaxpaqueteria.com/",
    desc: "Sitio para una empresa de envíos internacionales desde China a México. Desarrollado con CodeIgniter 4 con Bootstrap y jQuery.",
    longDesc:
      "Sitio para una empresa de envíos internacionales desde China a México. Desarrollado con CodeIgniter 4 con Bootstrap y jQuery.",
    img: ABSTRACT_IMAGES[1],
    stack: ["CodeIgniter 4", "Bootstrap", "jQuery"],
    features: toFeatures(
      "Sitio para una empresa de envíos internacionales desde China a México. Desarrollado con CodeIgniter 4, Bootstrap y jQuery."
    ),
    gallery: [ABSTRACT_IMAGES[1], ABSTRACT_IMAGES[0], ABSTRACT_IMAGES[2]],
  },
  {
    id: "03",
    slug: "jp-metalmecanica",
    name: "JP Metalmecánica",
    tag: "Industrial · Institucional",
    url: "https://jpmetalmecanica.com/",
    desc: "Sitio para una empresa dedicada a piezas metalúrgicas para el sector privado. Construido con CodeIgniter 4, Bootstrap, jQuery y animaciones en CSS/JS.",
    longDesc:
      "Sitio para una empresa dedicada a piezas metalúrgicas para el sector privado. Construido con CodeIgniter 4, Bootstrap, jQuery y animaciones en CSS/JS.",
    img: ABSTRACT_IMAGES[2],
    stack: ["CodeIgniter 4", "Bootstrap", "jQuery", "CSS/JS"],
    features: toFeatures(
      "Sitio para una empresa dedicada a piezas metalúrgicas para el sector privado. Construido con CodeIgniter 4, Bootstrap y jQuery. Animaciones en CSS y JS."
    ),
    gallery: [ABSTRACT_IMAGES[2], ABSTRACT_IMAGES[0], ABSTRACT_IMAGES[1]],
  },
  {
    id: "04",
    slug: "notarionet",
    name: "Notarionet",
    tag: "Legal · SaaS",
    url: "https://notarionet.com/",
    desc: "Plataforma que facilita la firma de contratos y documentos legales en línea. Implementado con Vue.js y Laravel.",
    longDesc:
      "Plataforma que facilita la firma de contratos y documentos legales en línea. Implementado con Vue.js y Laravel.",
    img: ABSTRACT_IMAGES[3],
    stack: ["Vue", "Laravel", "PHP"],
    features: toFeatures(
      "Plataforma que facilita la firma de contratos y documentos legales en línea. Implementado con Vue.js y Laravel."
    ),
    gallery: [ABSTRACT_IMAGES[3], ABSTRACT_IMAGES[2], ABSTRACT_IMAGES[1]],
  },
  {
    id: "05",
    slug: "raiya",
    name: "Raiya",
    tag: "Industrial · Web",
    url: "https://raiya.mx/",
    desc: "Sitio para renta y venta de montacargas en México. Desarrollado con Codeigniter 4 y Tailwind CSS, con enfoque en experiencia de usuario y rendimiento.",
    longDesc:
      "Sitio para renta y venta de montacargas en México. Desarrollado con Codeigniter 4 y Tailwind CSS, con enfoque en experiencia de usuario y rendimiento.",
    img: ABSTRACT_IMAGES[4],
    stack: ["CodeIgniter 4", "Tailwind"],
    features: toFeatures(
      "Sitio para renta y venta de montacargas en México. Desarrollado con Codeigniter 4 y Tailwind CSS. Enfoque en experiencia de usuario y rendimiento."
    ),
    gallery: [ABSTRACT_IMAGES[4], ABSTRACT_IMAGES[2], ABSTRACT_IMAGES[0]],
  },
  {
    id: "06",
    slug: "minikin",
    name: "Minikin",
    tag: "Retail · E-commerce",
    url: "https://minikin.com.mx/",
    desc: "E-commerce de mobiliario infantil con diseño moderno y funcional. Construido con WooCommerce sobre WordPress.",
    longDesc:
      "E-commerce de mobiliario infantil con diseño moderno y funcional. Construido con WooCommerce sobre WordPress.",
    img: ABSTRACT_IMAGES[5],
    stack: ["WooCommerce", "WordPress"],
    features: toFeatures(
      "E-commerce de mobiliario infantil con diseño moderno y funcional. Construido con WooCommerce sobre WordPress."
    ),
    gallery: [ABSTRACT_IMAGES[5], ABSTRACT_IMAGES[1], ABSTRACT_IMAGES[0]],
  },
  {
    id: "07",
    slug: "rnr-refrigeracion",
    name: "RNR Refrigeración",
    tag: "Retail · E-commerce",
    url: "https://rnr-refrigeracion.com/",
    desc: "E-commerce para empresa de venta y mantenimiento de equipos de refrigeración. Desarrollado con WooCommerce sobre WordPress, con personalizaciones para catálogo y proceso de compra, además de creación de plugins personalizados.",
    longDesc:
      "E-commerce para empresa de venta y mantenimiento de equipos de refrigeración. Desarrollado con WooCommerce sobre WordPress, con personalizaciones para catálogo y proceso de compra, además de creación de plugins personalizados.",
    img: ABSTRACT_IMAGES[6],
    stack: ["WooCommerce", "WordPress"],
    features: toFeatures(
      "E-commerce para empresa de venta y mantenimiento de equipos de refrigeración. Desarrollado con WooCommerce sobre WordPress. Personalizaciones para catálogo y proceso de compra. Creación de plugins personalizados."
    ),
    gallery: [ABSTRACT_IMAGES[6], ABSTRACT_IMAGES[1], ABSTRACT_IMAGES[2]],
  },
];

export const getProjectBySlug = (slug) => PROJECTS.find((p) => p.slug === slug);