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
        slug: "vigxa",
        brand: "vigxa" as const,
        name: "Vigxa",
        tagline: "Gestión 360° para constructoras",
        description:
          "Plataforma end-to-end para constructoras colombianas: proyectos, presupuestos, actas, SST, nómina, facturación electrónica DIAN y portal de interventoría — todo en un solo lugar.",
        features: [
          "Presupuestos con APU y AIU",
          "Actas parciales y bitácora",
          "SG-SST y portal externo",
          "Facturación electrónica DIAN",
        ],
        cta: "Conocer más",
        href: "/vigxa",
      },
      {
        slug: "ampirux",
        brand: "ampirux" as const,
        name: "Ampirux",
        tagline: "IA por voz para barberías",
        description:
          "Sistema integral para barberías que gestiona citas, ventas, inventario y nómina — con asistente de IA por voz que registra todo en segundos.",
        features: [
          "Asistente IA por voz",
          "Agenda y reservas online",
          "Facturación y nómina",
          "Métricas en tiempo real",
        ],
        cta: "Conocer más",
        href: "/ampirux",
      },
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
      { value: "vigxa", label: "Vigxa" },
      { value: "ampirux", label: "Ampirux" },
      { value: "notamaestro", label: "NotaMaestro" },
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
    eyebrow: "Barbería + IA por voz",
    title: "El software con IA para tu",
    titleHighlight: "Barbería",
    subtitle:
      "Dictá una venta, una cita o un gasto — Ampirux lo registra en segundos. Agenda, facturación, nómina y métricas en una sola plataforma, con asistente de voz exclusivo de la industria.",
    primaryCta: { label: "Probar 6 días gratis", external: true },
    secondaryCta: { label: "Ver Demo", external: true },
    trialNote: "Trial Pro completo — sin tarjeta de crédito.",
    stats: [
      { value: "20+", label: "Barberías Activas" },
      { value: "300", label: "Usos IA / mes en Starter" },
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
      "Una suite completa diseñada por barberos, para barberos. Operación, IA y reportes en un solo lugar.",
    items: [
      { icon: "Mic", title: "Asistente IA por voz", description: "Dictá \"corte clásico para Carlos a las 4\" y Ampirux crea la cita. También registra ventas, gastos y servicios desde voz o texto. Exclusivo del sector." },
      { icon: "CalendarCheck", title: "Agenda y reservas online", description: "Calendario interactivo, recordatorios automáticos por WhatsApp y un link público para que tus clientes reserven sin escribirte." },
      { icon: "Scissors", title: "Servicios e historia clínica", description: "Cataloga servicios con duración y precio. En Pro: historia clínica del cliente con fotos y procedimientos." },
      { icon: "ShoppingCart", title: "Productos, ventas y caja", description: "Catálogo de productos, ventas mixtas (servicio + producto), control de inventario y cierre de caja al final del día." },
      { icon: "Wallet", title: "Nómina, comisiones y préstamos", description: "Liquidación de nómina, cálculo automático de comisiones por barbero, préstamos a empleados y certificados laborales." },
      { icon: "BarChart", title: "Reportes y Google Calendar", description: "Métricas de ventas, gastos y servicios top. En Pro: sincronización con Google Calendar y exportación a Excel." },
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
    title: "El plan correcto para cada barbería",
    description:
      "Empieza con 6 días Pro gratis. Sin tarjeta de crédito, sin permanencia.",
    plans: [
      {
        name: "Básico",
        price: "49.900",
        period: "/mes",
        description: "Lo esencial para arrancar.",
        features: [
          "1 usuario",
          "Agenda y reservas online",
          "Clientes y servicios",
          "Ventas y caja",
          "Soporte por email",
        ],
        featured: false,
      },
      {
        name: "Starter",
        price: "139.900",
        period: "/mes",
        description: "El más popular — IA por voz incluida.",
        features: [
          "Hasta 5 usuarios",
          "Todo lo del Básico",
          "Productos e inventario",
          "Nómina, asistencia y préstamos",
          "Promociones y certificados",
          "Asistente IA por voz · 300 usos/mes",
        ],
        featured: true,
      },
      {
        name: "Pro",
        price: "239.900",
        period: "/mes",
        description: "Operación profesional sin límites.",
        features: [
          "Usuarios ilimitados",
          "Todo lo del Starter",
          "Historia clínica con fotos",
          "Sincronización Google Calendar",
          "Exportación a Excel",
          "Asistente IA por voz ilimitado",
        ],
        featured: false,
      },
    ],
    trialBanner: {
      label: "Prueba 6 días gratis",
      text: "Trial Pro con acceso completo, sin tarjeta de crédito. Cancela cuando quieras.",
    },
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

export const vigxa = {
  hero: {
    eyebrow: "Para constructoras colombianas",
    title: "La plataforma 360° para tu",
    titleHighlight: "constructora",
    subtitle:
      "Proyectos, presupuestos, actas, SG-SST, nómina y facturación electrónica DIAN. Una sola plataforma desde la cotización hasta el cierre y la garantía.",
    primaryCta: { label: "Empezar prueba gratis", external: true },
    secondaryCta: { label: "Ver Demo", external: true },
    trialNote: "15 días con acceso PRO completo. Sin tarjeta de crédito.",
    stats: [
      { value: "157", label: "Funcionalidades" },
      { value: "36", label: "Módulos integrados" },
      { value: "15", label: "Días de prueba" },
    ],
  },
  // Scrolly modules — each one is a step in the scroll. The 3D object lives on
  // the opposite side of the text (right/left alternating).
  scrolly: {
    eyebrow: "Cómo funciona",
    title: "Una obra. Una plataforma. Cero hojas de cálculo.",
    description:
      "Cada módulo conversa con el siguiente. Lo que cotizas se convierte en presupuesto, lo que ejecutas se factura, lo que firmas queda registrado.",
    steps: [
      {
        id: "planning",
        eyebrow: "01 · Planeación",
        align: "right" as const, // text on right when 3D is on left
        title: "Cotiza, presupuesta y arranca con APU",
        description:
          "Construye cotizaciones con tus servicios y plantillas, conviértelas en presupuesto con capítulos, actividades y Análisis de Precios Unitarios (APU). Configura AIU, importa desde Excel y genera el cronograma automático.",
        bullets: [
          "Cotizaciones con plantillas reutilizables",
          "Presupuesto jerárquico capítulos → APU",
          "AIU configurable por proyecto",
          "Cronograma generado del presupuesto",
        ],
      },
      {
        id: "execution",
        eyebrow: "02 · Ejecución",
        align: "left" as const, // text on left when 3D is on right
        title: "Avanza la obra desde un solo tablero",
        description:
          "Bitácora diaria con clima integrado, fotos georreferenciadas, RFIs, change orders, punch list y submittals. Tu equipo en obra registra, tu equipo en oficina aprueba.",
        bullets: [
          "Bitácora con clima y fotos",
          "Change Orders y RFIs trazables",
          "Punch List y Submittals",
          "Permisos de trabajo y SG-SST",
        ],
      },
      {
        id: "finance",
        eyebrow: "03 · Finanzas y DIAN",
        align: "right" as const,
        title: "Actas, facturación electrónica y cartera",
        description:
          "Actas parciales firmables, facturación electrónica DIAN (resoluciones, notas crédito, PDF y XML), retenciones, pólizas, anticipos amortizables y flujo de caja por proyecto.",
        bullets: [
          "Facturación electrónica DIAN integrada",
          "Actas parciales y notas crédito",
          "Pólizas y anticipos amortizables",
          "Flujo de caja por obra",
        ],
      },
      {
        id: "people",
        eyebrow: "04 · Nómina y SG-SST",
        align: "left" as const,
        title: "Empleados, SST y compliance",
        description:
          "Nómina individual o masiva con liquidación, parafiscales y firma digital. SG-SST completo: inspecciones, incidentes, EPP, charlas, capacitaciones y permisos en altura.",
        bullets: [
          "Nómina masiva con liquidación",
          "Inspecciones e incidentes SG-SST",
          "Capacitaciones y charlas toolbox",
          "Permisos en altura y EPP",
        ],
      },
      {
        id: "portal",
        eyebrow: "05 · Portal externo",
        align: "right" as const,
        title: "Interventoría, clientes y proveedores en línea",
        description:
          "Comparte un portal moderno con interventores, clientes y proveedores: dashboard de obra, actas, bitácora, documentos, fotos, materiales, RFIs y mensajería — sin sumarlos a tu plan.",
        bullets: [
          "Portal V2 para interventoría y clientes",
          "Portal de proveedores y licitaciones",
          "Mensajería y aprobaciones",
          "Habeas Data Ley 1581 de 2012",
        ],
      },
      {
        id: "boardroom",
        eyebrow: "06 · Boardroom",
        align: "left" as const,
        title: "Vista ejecutiva del portafolio completo",
        description:
          "KPIs de hasta 500 proyectos en una pantalla: presupuesto vs. ejecutado, ingresos, gastos, top-by-exposure, alertas de sobre-presupuesto y EVM. Una sola vista para el comité directivo.",
        bullets: [
          "Hasta 500 proyectos en vista única",
          "Earned Value Management (EVM)",
          "Alertas de sobre-presupuesto",
          "Integraciones Siigo, Alegra, World Office",
        ],
      },
    ],
  },
  features: {
    eyebrow: "Todo en un solo lugar",
    title: "36 módulos integrados, listos para tu obra",
    description:
      "Diseñado con constructoras colombianas. Cada feature pensada para reemplazar Excel + WhatsApp + 4 sistemas separados.",
    items: [
      { icon: "LayoutDashboard", title: "Tablero de proyecto", description: "Kanban de actividades, cronograma Gantt y dashboard EVM por obra." },
      { icon: "FileSpreadsheet", title: "Presupuesto y APU", description: "Capítulos, actividades, Análisis de Precios Unitarios e import/export Excel." },
      { icon: "FileCheck2", title: "Actas parciales", description: "Generación, firma y conversión directa a factura electrónica." },
      { icon: "Receipt", title: "Facturación DIAN", description: "Resoluciones, notas crédito, PDF/XML — integración con Yabi y Siigo." },
      { icon: "HardHat", title: "SG-SST completo", description: "Inspecciones, incidentes, EPP, charlas, capacitaciones y permisos en altura." },
      { icon: "Users", title: "Nómina y RRHH", description: "Liquidación masiva, parafiscales, certificados y firma digital." },
      { icon: "Wrench", title: "Compras y materiales", description: "Órdenes de compra, recepción, inventario y aprobaciones (submittals)." },
      { icon: "ShieldCheck", title: "Pólizas y anticipos", description: "Pólizas con alertas de vencimiento, anticipos amortizables y retenciones." },
      { icon: "MessageSquareText", title: "RFIs y comunicación", description: "RFIs, change orders, mensajería interna y notificaciones en tiempo real." },
      { icon: "ClipboardCheck", title: "Punch list y cierre", description: "Pendientes con responsable, fecha y foto. Cierre de obra con garantías." },
      { icon: "Globe2", title: "Portal externo V2", description: "Cliente, interventoría, proveedores. 16+ pantallas read-write fuera de tu plan." },
      { icon: "TrendingUp", title: "Boardroom ejecutivo", description: "Portfolio de hasta 500 proyectos con KPIs y alertas para el comité directivo." },
    ],
  },
  compliance: {
    eyebrow: "Hecho para Colombia",
    title: "Cumple con la regulación que importa",
    description:
      "Vigxa entiende cómo se construye y se factura en Colombia. La parte legal y fiscal viene de fábrica.",
    items: [
      { icon: "FileBadge2", title: "Facturación electrónica DIAN", description: "Resoluciones, ambiente de pruebas y producción, notas crédito, PDF + XML firmados." },
      { icon: "ShieldCheck", title: "SG-SST conforme a Resolución 0312", description: "Inspecciones, incidentes, capacitaciones, EPP y reportes listos para auditoría." },
      { icon: "Building2", title: "Nómina con parafiscales", description: "Liquidación, salud, pensión, ARL, cesantías, primas y certificados laborales." },
      { icon: "Lock", title: "Habeas Data Ley 1581 de 2012", description: "Consentimientos, exportación de datos personales y solicitudes de eliminación." },
      { icon: "Plug", title: "Integraciones contables", description: "Siigo, Alegra y World Office para conciliación automática con tu contador." },
      { icon: "CreditCard", title: "Pagos Wompi en COP", description: "Cobro con PSE, tarjeta, Bancolombia y Nequi — proporcional al upgrade." },
    ],
  },
  pricing: {
    eyebrow: "Planes y precios",
    title: "Crece desde una obra hasta un portafolio",
    description:
      "Empieza con 15 días Pro gratis. Sin tarjeta, sin compromiso de permanencia. Cambia de plan cuando crezcas — solo pagas la diferencia proporcional.",
    plans: [
      {
        name: "Starter",
        price: "149.000",
        period: "/mes",
        description: "Para constructoras pequeñas y contratistas (1–3 obras).",
        limits: "3 usuarios · 15 empleados · 5 proyectos activos",
        features: [
          "Hasta 5 proyectos activos",
          "Hasta 30 cotizaciones/mes",
          "Nómina individual",
          "SG-SST básico (inspecciones e incidentes)",
          "Bitácora de obra digital",
          "Plantilla PDF clásica",
          "Soporte por email",
        ],
        featured: false,
      },
      {
        name: "Business",
        price: "399.000",
        period: "/mes",
        description: "Para constructoras medianas con interventoría y SST.",
        limits: "10 usuarios · empleados y proyectos ilimitados",
        features: [
          "Todo lo del Starter",
          "Cotizaciones y proyectos ilimitados",
          "Nómina masiva con liquidación",
          "Todas las plantillas PDF + firma digital",
          "Integración Gmail y envío de emails",
          "Roles avanzados y exportación Excel",
          "SG-SST completo + portal de interventoría",
          "Control de horas y materiales",
          "Submittals, garantías y closeout",
          "Soporte prioritario",
        ],
        featured: true,
      },
      {
        name: "Enterprise",
        price: "1.200.000",
        period: "/mes",
        description: "Para grupos constructores y portafolios grandes.",
        limits: "Usuarios ilimitados · Boardroom 500 proyectos",
        features: [
          "Todo lo del Business",
          "Usuarios ilimitados",
          "API REST y webhooks",
          "Formularios personalizados",
          "Automatización de flujos",
          "Single Sign-On (SSO)",
          "Onboarding personalizado",
          "Soporte dedicado",
        ],
        featured: false,
      },
    ],
    trialBanner: {
      label: "Prueba 15 días gratis",
      text: "Acceso Pro completo durante 15 días. Sin tarjeta de crédito.",
    },
  },
  cta: {
    eyebrow: "Empieza hoy",
    title: "Construye tu próxima obra desde Vigxa",
    description:
      "Únete a las constructoras que cambiaron Excel + WhatsApp + 4 sistemas por una sola plataforma diseñada para Colombia.",
    primary: { label: "Empezar prueba gratis", external: true },
    secondary: { label: "Hablar con ventas", href: "/#contacto" },
    bullets: [
      "Migración asistida sin costo",
      "15 días Pro sin tarjeta de crédito",
      "Cancela cuando quieras — sin permanencia",
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
        "**Servicios:** Cualquier software, aplicación o servicio ofrecido por CODFY, incluyendo Vigxa, Ampirux y NotaMaestro.",
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
