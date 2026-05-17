/**
 * Single source of truth for all landing copy.
 * Spanish-only (matches the brand and original Angular site).
 */

export const home = {
  hero: {
    eyebrow: "Trazabilidad e Innovación",
    title: "Software para",
    titleHighlight: "Transformación Digital",
    subtitle:
      "Construimos soluciones tecnológicas a medida que impulsan el crecimiento de tu empresa. Combinamos análisis estratégico, diseño de producto e ingeniería para generar impacto real.",
    primaryCta: { label: "Cuéntanos tu necesidad", href: "#contacto" },
    secondaryCta: { label: "Ver productos", href: "#productos" },
    metrics: [
      { value: "20+", label: "Empresas atendidas" },
      { value: "10K+", label: "Usuarios activos" },
      { value: "4.7", label: "Satisfacción" },
    ],
  },
  about: {
    eyebrow: "Quiénes somos",
    title: "Somos una Empresa de Transformación Digital",
    description:
      "Nos especializamos en la construcción de soluciones tecnológicas a medida para generar impacto de negocio. En CODFY, combinamos trazabilidad e innovación para crear software que impulsa el crecimiento de tu empresa.",
    pillars: [
      {
        icon: "Search",
        title: "Análisis y Diseño",
        description:
          "Estudiamos tus procesos y necesidades para diseñar la solución perfecta para tu negocio.",
      },
      {
        icon: "Code2",
        title: "Desarrollo a Medida",
        description:
          "Creamos software personalizado utilizando las tecnologías más adecuadas para tu proyecto.",
      },
      {
        icon: "Rocket",
        title: "Implementación y Capacitación",
        description:
          "Implementamos la solución y capacitamos a tu equipo para aprovechar al máximo el software.",
      },
    ],
  },
  products: {
    eyebrow: "Nuestros productos",
    title: "Productos Estrella",
    description:
      "Soluciones SaaS especializadas para diferentes industrias, diseñadas para optimizar procesos y aumentar la productividad.",
    items: [
      {
        slug: "notamaestro",
        brand: "notamaestro" as const,
        name: "NotaMaestro",
        tagline: "Gestión escolar end-to-end",
        description:
          "Software educativo completo para la gestión de notas, asistencias, boletines digitales y comunicación con padres.",
        features: [
          "Gestión de calificaciones",
          "Control de asistencia",
          "Comunicación con padres",
          "Reportes académicos",
        ],
        cta: "Conocer más",
        href: "/notamaestro",
      },
      {
        slug: "ampirux",
        brand: "ampirux" as const,
        name: "Ampirux",
        tagline: "Operación integral para barberías",
        description:
          "Sistema integral para barberías que gestiona citas, inventario, ventas y métricas desde una sola plataforma.",
        features: [
          "Agenda de citas",
          "Control de inventario",
          "Gestión de ventas",
          "Fidelización de clientes",
        ],
        cta: "Conocer más",
        href: "/ampirux",
      },
      {
        slug: "toolveris",
        brand: "codfy" as const,
        name: "Toolveris",
        tagline: "Punto de venta para ferreterías",
        description:
          "Software especializado para ferreterías que optimiza la gestión del negocio, inventario y ventas.",
        features: [
          "Inventario detallado",
          "Punto de venta",
          "Gestión de proveedores",
          "Reportes de ventas",
        ],
        cta: "Próximamente",
        href: "#contacto",
      },
    ],
  },
  custom: {
    eyebrow: "Desarrollo a medida",
    title: "Construimos tu software desde cero",
    description:
      "Creamos soluciones tecnológicas personalizadas que se adaptan perfectamente a las necesidades específicas de tu negocio. Un proceso probado, de la idea al producto.",
    steps: [
      {
        number: "01",
        title: "Análisis",
        description:
          "Entendemos tu negocio y definimos los requerimientos específicos en sesiones colaborativas.",
      },
      {
        number: "02",
        title: "Diseño",
        description:
          "Creamos la arquitectura y diseñamos la experiencia de usuario con prototipos navegables.",
      },
      {
        number: "03",
        title: "Desarrollo",
        description:
          "Construimos tu solución con las mejores prácticas, code review y entregas iterativas.",
      },
      {
        number: "04",
        title: "Implementación",
        description:
          "Desplegamos la solución, capacitamos a tu equipo y acompañamos la adopción.",
      },
    ],
    cta: { label: "Solicita una consulta", href: "#contacto" },
  },
  contact: {
    eyebrow: "Hablemos",
    title: "Contáctanos",
    description:
      "Estamos listos para ayudarte a transformar tu negocio con nuestras soluciones tecnológicas. Cuéntanos tu necesidad y te respondemos en menos de 24 horas.",
    subjects: [
      { value: "notamaestro", label: "NotaMaestro" },
      { value: "ampirux", label: "Ampirux" },
      { value: "toolveris", label: "Toolveris" },
      { value: "desarrollo", label: "Desarrollo a medida" },
      { value: "otro", label: "Otro" },
    ],
  },
} as const;

export const notamaestro = {
  hero: {
    eyebrow: "Para instituciones educativas",
    title: "Transforma la gestión educativa con",
    titleHighlight: "NotaMaestro",
    subtitle:
      "La plataforma integral que revoluciona la administración escolar. Gestiona notas, asistencias, boletines y mucho más desde una sola aplicación web.",
    primaryCta: { label: "Acceder", external: true },
    secondaryCta: { label: "Ver Demo", external: true },
    stats: [
      { label: "Web Responsive", value: "100%" },
      { label: "Disponibilidad", value: "24/7" },
      { label: "Datos Protegidos", value: "SSL" },
    ],
  },
  mainFeatures: [
    {
      icon: "ClipboardList",
      title: "Gestión de Notas",
      description:
        "Sistema completo para el registro, cálculo y seguimiento de calificaciones estudiantiles.",
      highlights: ["Cálculo automático", "Histórico completo", "Múltiples períodos"],
    },
    {
      icon: "FileText",
      title: "Boletines Digitales",
      description:
        "Generación automática de boletines personalizados con diseño profesional.",
      highlights: ["Descarga PDF", "Diseño personalizable", "Envío automático"],
    },
    {
      icon: "UserCheck",
      title: "Control de Asistencia",
      description:
        "Registro digital de asistencia con reportes detallados y alertas automáticas.",
      highlights: ["Registro rápido", "Reportes automáticos", "Notificaciones"],
    },
  ],
  teacherFeatures: {
    title: "Herramientas para docentes",
    description: "Todo lo que un docente necesita para enseñar con tecnología.",
    items: [
      { icon: "Calendar", title: "Planeaciones Académicas", description: "Organiza y gestiona tus planeaciones de clase de manera digital y estructurada." },
      { icon: "Network", title: "Mallas Curriculares", description: "Administra el currículo académico con herramientas de seguimiento y evaluación." },
      { icon: "CheckSquare", title: "Calificación Online", description: "Evalúa talleres y exámenes directamente desde la plataforma con corrección automática." },
      { icon: "MessageSquare", title: "Foro Interactivo", description: "Facilita la comunicación entre estudiantes, docentes y padres de familia." },
    ],
  },
  adminFeatures: {
    title: "Para administradores",
    description: "Visibilidad y control total de la operación de tu institución.",
    items: [
      { icon: "Clock", title: "Horarios Académicos", description: "Crea y gestiona horarios de clases con asignación automática de recursos." },
      { icon: "BarChart3", title: "Informes Personalizados", description: "Genera reportes detallados adaptados a las necesidades específicas de tu institución." },
      { icon: "Download", title: "Exportación de Datos", description: "Exporta cualquier información a Excel o PDF para análisis externos." },
      { icon: "LineChart", title: "Métricas y Gráficas", description: "Visualiza el rendimiento académico con gráficas interactivas y métricas clave." },
    ],
  },
  techFeatures: {
    title: "Tecnología confiable",
    description: "Una plataforma robusta diseñada para escalar contigo.",
    items: [
      { icon: "Smartphone", title: "Totalmente Responsive", description: "Funciona perfectamente en todos los dispositivos y tamaños de pantalla." },
      { icon: "Cloud", title: "En la Nube", description: "Acceso desde cualquier lugar con conexión a internet, sin instalaciones." },
      { icon: "Shield", title: "Seguridad Avanzada", description: "Protección de datos con encriptación y copias de seguridad automáticas." },
      { icon: "RefreshCw", title: "Actualizaciones Automáticas", description: "Siempre tendrás la última versión sin interrupciones en el servicio." },
    ],
  },
  benefits: {
    title: "Los beneficios que tu institución merece",
    description:
      "Más que software, una transformación real para la gestión académica y administrativa.",
    items: [
      {
        icon: "Timer",
        title: "Ahorro de Tiempo",
        description: "Automatiza procesos que antes tomaban horas, ahora los realizas en minutos.",
        bullets: ["Generación automática de boletines", "Cálculo automático de promedios", "Reportes instantáneos", "Notificaciones automáticas"],
        featured: false,
      },
      {
        icon: "TrendingUp",
        title: "Mejora del Rendimiento",
        description: "Obtén insights valiosos sobre el desempeño académico de tu institución.",
        bullets: ["Métricas en tiempo real", "Análisis de tendencias", "Identificación de áreas de mejora", "Seguimiento de objetivos"],
        featured: true,
      },
      {
        icon: "Megaphone",
        title: "Mejor Comunicación",
        description: "Mantén a toda la comunidad educativa conectada y bien informada.",
        bullets: ["Foros interactivos", "Notificaciones en tiempo real", "Comunicación directa", "Retroalimentación continua"],
        featured: false,
      },
      {
        icon: "Lock",
        title: "Seguridad Garantizada",
        description: "Protege la información sensible con los más altos estándares de seguridad.",
        bullets: ["Encriptación de datos", "Copias de seguridad automáticas", "Control de acceso por roles", "Cumplimiento normativo"],
        featured: false,
      },
      {
        icon: "Globe",
        title: "Acceso Universal",
        description: "Funciona perfectamente en cualquier dispositivo, en cualquier momento.",
        bullets: ["Responsive design", "Aplicación web optimizada", "Sin instalaciones necesarias", "Compatibilidad total"],
        featured: false,
      },
      {
        icon: "PiggyBank",
        title: "Reducción de Costos",
        description: "Elimina gastos en papel, impresiones y sistemas separados.",
        bullets: ["Sin costos de impresión", "Reducción de papelería", "Un solo sistema integral", "ROI comprobado"],
        featured: false,
      },
    ],
  },
  cta: {
    title: "¿Listo para revolucionar tu gestión educativa?",
    description:
      "Únete a las instituciones que ya confían en NotaMaestro para optimizar sus procesos académicos.",
    stats: [
      { value: "20+", label: "Instituciones" },
      { value: "10K+", label: "Estudiantes" },
      { value: "4.7/5", label: "Satisfacción" },
    ],
  },
} as const;

export const ampirux = {
  hero: {
    eyebrow: "Para barberías modernas",
    title: "El Software Definitivo para tu",
    titleHighlight: "Barbería",
    subtitle:
      "Gestiona citas, inventario, ventas y métricas de tu barbería desde una sola plataforma. Optimiza tu negocio y aumenta tus ganancias con nuestra solución integral.",
    primaryCta: { label: "Iniciar Ahora", external: true },
    secondaryCta: { label: "Ver Demo", external: true },
    stats: [
      { value: "20+", label: "Barberías Activas" },
      { value: "95%", label: "Satisfacción" },
      { value: "24/7", label: "Soporte" },
    ],
    dashboardMock: {
      title: "Dashboard",
      sales: { label: "Ventas del Día", value: "$630.450", delta: "+12.4%" },
      expenses: { label: "Gastos", value: "$140.000", delta: "-3.1%" },
      top: { label: "Top Servicio", value: "Corte Clásico", count: "48 hoy" },
    },
  },
  features: {
    title: "¿Por qué elegir Ampirux?",
    description:
      "Una suite completa diseñada por barberos, para barberos. Todo lo que necesitas en un solo lugar.",
    items: [
      { icon: "CalendarCheck", title: "Agendamiento de Citas", description: "Sistema intuitivo para gestionar citas, recordatorios automáticos y calendario interactivo para optimizar tu agenda diaria." },
      { icon: "Scissors", title: "Gestión de Servicios", description: "Cataloga todos los servicios de tu barbería con precios, duración y descripción detallada para una mejor organización." },
      { icon: "ShoppingCart", title: "Productos en Venta", description: "Administra tu catálogo de productos, controla stock y realiza ventas directamente desde la plataforma." },
      { icon: "Package", title: "Control de Inventario", description: "Mantén un registro preciso de tu inventario con alertas de stock bajo y control de proveedores." },
      { icon: "BarChart", title: "Reportes y Métricas", description: "Visualiza el rendimiento de tu negocio con gráficos detallados y métricas de ventas, gastos y ganancias." },
      { icon: "FileSpreadsheet", title: "Exportación Excel/PDF", description: "Exporta todos tus reportes y datos a Excel o PDF para análisis externos y respaldos importantes." },
    ],
  },
  dashboard: {
    eyebrow: "Dashboard inteligente",
    title: "Toda la información que necesitas, en un solo vistazo",
    description:
      "Accede a toda la información importante de tu barbería desde un solo lugar. Visualiza ventas del día, gastos, top de servicios y métricas clave para tomar decisiones informadas.",
    features: [
      { icon: "DollarSign", title: "Ventas en Tiempo Real", description: "Monitorea tus ingresos diarios y semanales con actualizaciones instantáneas." },
      { icon: "TrendingUp", title: "Análisis de Tendencias", description: "Identifica patrones de consumo y servicios más demandados." },
      { icon: "Target", title: "Métricas Personalizadas", description: "Configura los indicadores que más importan para tu negocio." },
    ],
  },
  pricing: {
    eyebrow: "Planes y precios",
    title: "Un plan para cada tamaño de barbería",
    description:
      "Empieza con lo que necesitas y escala cuando crezcas. Todos los planes incluyen soporte 24/7.",
    plans: [
      {
        name: "Básico",
        price: "49.900",
        period: "/mes",
        description: "Para barberías que están empezando.",
        features: [
          "50 facturas por día",
          "Sin facturación electrónica",
          "Integración WhatsApp",
          "Sin configuración de empleados",
          "Agendamiento por WhatsApp",
        ],
        featured: false,
      },
      {
        name: "Starter",
        price: "99.900",
        period: "/mes",
        description: "Para barberías en crecimiento.",
        features: [
          "100 facturas por día",
          "Sin facturación electrónica",
          "Hasta 3 empleados",
          "Cálculo de comisiones",
          "Reportes básicos",
        ],
        featured: false,
      },
      {
        name: "Plus",
        price: "239.900",
        period: "/mes",
        description: "Para barberías establecidas.",
        features: [
          "Facturación electrónica",
          "150 facturas por día",
          "Hasta 10 empleados",
          "Cálculo y liquidación de nómina",
          "Reportes avanzados",
        ],
        featured: false,
      },
      {
        name: "Pro",
        price: "449.900",
        period: "/mes",
        description: "Para operaciones profesionales.",
        features: [
          "Facturación electrónica ilimitada",
          "Sin límites de empleados",
          "Gestión de usuarios y roles",
          "Sistema de promociones inteligentes",
          "Reportes ejecutivos",
        ],
        featured: true,
      },
      {
        name: "Enterprise",
        price: "619.900",
        period: "/mes",
        description: "Para cadenas y franquicias.",
        features: [
          "Facturas ilimitadas",
          "Facturación electrónica ilimitada",
          "Múltiples sucursales",
          "Catálogo digital para clientes",
          "Bitácora del sistema",
        ],
        featured: false,
      },
    ],
  },
  responsive: {
    eyebrow: "Multi-dispositivo",
    title: "Adaptable a Cualquier Dispositivo",
    description:
      "Accede a Ampirux desde cualquier lugar y dispositivo. Nuestra plataforma está optimizada para brindar la mejor experiencia en desktop, tablet y móvil.",
    features: [
      "Diseño Responsive nativo",
      "Misma funcionalidad en todos los dispositivos",
      "Sincronización en tiempo real",
      "Sin necesidad de instalar nada",
    ],
  },
  cta: {
    title: "¿Listo para Transformar tu Barbería?",
    description:
      "Únete a las barberías que ya confían en Ampirux para gestionar su negocio. Comienza hoy mismo y ve la diferencia en tu productividad y ganancias.",
    features: [
      "Configuración en 5 minutos",
      "Soporte 24/7",
      "Sin compromiso de permanencia",
    ],
    stats: [
      { value: "+45%", label: "Incremento en Ventas" },
      { value: "-60%", label: "Menos Tiempo Administrativo" },
      { value: "95%", label: "Satisfacción del Cliente" },
    ],
  },
} as const;

export const terms = {
  title: "Términos y Condiciones",
  lastUpdated: "12 de junio de 2025",
  intro:
    "Bienvenido a CODFY S.A.S. Estos Términos y Condiciones rigen el uso de nuestros sitios web, aplicaciones y servicios. Al acceder o usar nuestros servicios, aceptas estar sujeto a estos términos. Te recomendamos leerlos detenidamente.",
  sections: [
    {
      heading: "1. Definiciones",
      paragraphs: [
        "**Sitio Web:** Se refiere a codfysas.com y a cualquier subdominio operado por CODFY.",
        "**Servicios:** Cualquier software, aplicación o servicio ofrecido por CODFY, incluyendo NotaMaestro, Ampirux y Toolveris.",
        "**Usuario:** Toda persona natural o jurídica que accede o utiliza el Sitio Web o los Servicios.",
        "**Contenido:** Cualquier información, texto, gráfico, foto u otro material que pueda ser visto en el Sitio Web.",
        "**Cuenta:** El registro asociado a un Usuario que le permite acceder a funcionalidades específicas.",
      ],
    },
    {
      heading: "2. Aceptación de los Términos",
      paragraphs: [
        "Al utilizar el Sitio Web o los Servicios, declaras que has leído, entendido y aceptas quedar vinculado por estos Términos. Si no estás de acuerdo, debes abstenerte de usar los Servicios.",
      ],
    },
    {
      heading: "3. Uso Permitido",
      paragraphs: [
        "El Usuario se compromete a utilizar los Servicios únicamente con fines lícitos y de conformidad con estos Términos. Queda prohibido:",
        "- Usar el Servicio para actividades ilegales o fraudulentas.",
        "- Intentar acceder sin autorización a cuentas, servidores o redes asociadas.",
        "- Interferir con el funcionamiento del Servicio o introducir software malicioso.",
        "- Reproducir, duplicar, copiar o revender cualquier parte del Servicio sin autorización escrita.",
      ],
    },
    {
      heading: "4. Registro de Cuenta",
      paragraphs: [
        "Para acceder a ciertas funcionalidades es necesario crear una Cuenta. El Usuario se compromete a proporcionar información veraz, exacta y actualizada, y a mantener la confidencialidad de sus credenciales. CODFY no será responsable de daños derivados del uso no autorizado de la Cuenta.",
      ],
    },
    {
      heading: "5. Contenido del Usuario",
      paragraphs: [
        "El Usuario es el único responsable del contenido que cargue, publique o transmita a través de los Servicios. Al hacerlo, otorga a CODFY una licencia mundial, no exclusiva y libre de regalías para usar, almacenar y procesar dicho contenido con el único propósito de operar y mejorar los Servicios.",
      ],
    },
    {
      heading: "6. Propiedad Intelectual",
      paragraphs: [
        "Todos los derechos de propiedad intelectual sobre el Sitio Web, los Servicios y su contenido (excluyendo el contenido aportado por Usuarios) son propiedad exclusiva de CODFY o de sus licenciantes. Ninguna disposición de estos Términos transfiere al Usuario derecho alguno sobre dicha propiedad.",
      ],
    },
    {
      heading: "7. Limitación de Responsabilidad",
      paragraphs: [
        "En la máxima medida permitida por la ley aplicable, CODFY no será responsable por daños indirectos, incidentales, especiales o consecuentes derivados del uso o la imposibilidad de uso de los Servicios. El Usuario reconoce que los Servicios se proveen \"tal cual\" y \"según disponibilidad\".",
      ],
    },
    {
      heading: "8. Modificaciones",
      paragraphs: [
        "CODFY podrá modificar estos Términos en cualquier momento, publicando la versión actualizada en el Sitio Web. El uso continuado de los Servicios tras dicha publicación constituye aceptación de los Términos modificados.",
      ],
    },
    {
      heading: "9. Ley aplicable y jurisdicción",
      paragraphs: [
        "Estos Términos se rigen por las leyes de la República de Colombia. Cualquier controversia se someterá a la jurisdicción de los jueces y tribunales competentes de Baranoa, Atlántico, salvo disposición legal en contrario.",
      ],
    },
    {
      heading: "10. Contacto",
      paragraphs: [
        "Para cualquier consulta sobre estos Términos, contáctanos en ventas@codfysas.com o en Cra 21 # 18 - 2, Piso 1. Baranoa, Atlántico.",
      ],
    },
  ],
} as const;
