export const SITE = {
  name: "CODFY",
  legalName: "CODFY S.A.S.",
  tagline: "Trazabilidad e Innovación",
  description:
    "Software para la transformación digital de empresas. Desarrollo a medida, soluciones SaaS para barberías y educación.",
  url: "https://codfysas.com",
  ogImage: "/og-image.png",
} as const;

export const CONTACT = {
  address: "Cra 21 # 18 - 2, Piso 1. Baranoa, Atlántico",
  phone: "+57 300 313 9837",
  phoneRaw: "3003139837",
  email: "ventas@codfysas.com",
} as const;

export const SOCIALS = {
  facebook: "https://www.facebook.com/61558057554191/",
  tiktok: "https://www.tiktok.com/@codfysas",
  instagram: "https://www.instagram.com/codfy_sas/",
  whatsapp: "https://wa.me/3003139837",
} as const;

export const EXTERNAL = {
  formspree: "https://formspree.io/f/mblyovyw",
  notamaestro: "https://notamaestro.com",
  notamaestroDemo: "https://www.youtube.com/watch?v=9jVZbGGrVNM",
  ampirux: "https://ampirux.com",
  ampiruxDemo: "https://www.youtube.com/watch?v=9jVZbGGrVNM",
} as const;

export const NAV_LINKS = [
  { href: "/#inicio", label: "Inicio" },
  { href: "/#nosotros", label: "Nosotros" },
  { href: "/#productos", label: "Productos" },
  { href: "/#desarrollo", label: "Desarrollo a Medida" },
  { href: "/#contacto", label: "Contáctanos" },
] as const;

export const FOOTER_LINKS = {
  products: [
    { label: "NotaMaestro", href: "/notamaestro" },
    { label: "Ampirux", href: "/ampirux" },
    { label: "Toolveris", href: "/#productos" },
  ],
  company: [
    { label: "Nosotros", href: "/#nosotros" },
    { label: "Desarrollo a Medida", href: "/#desarrollo" },
    { label: "Contacto", href: "/#contacto" },
    { label: "Términos y Condiciones", href: "/terminos" },
  ],
} as const;
