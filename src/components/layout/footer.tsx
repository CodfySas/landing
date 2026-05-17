import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";
import { SITE, CONTACT, SOCIALS, FOOTER_LINKS } from "@/lib/constants";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/shared/brand-icons";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-codfy-ink text-white/80">
      <div className="absolute inset-0 gradient-mesh-codfy opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="space-y-5 lg:col-span-1">
            <Link href="/" className="inline-block">
              <Image src="/assets/logo.png" alt={SITE.name} width={140} height={48} className="h-10 w-auto" />
            </Link>
            <p className="text-sm text-white/60 max-w-xs">
              Software para la transformación digital. Trazabilidad e innovación al servicio de tu negocio.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={SOCIALS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:bg-codfy hover:text-white"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIALS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:bg-codfy hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIALS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:bg-codfy hover:text-white"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIALS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70 transition-all hover:bg-codfy hover:text-white"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Productos</h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.products.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Empresa</h4>
            <ul className="space-y-3 text-sm">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/60 transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-codfy" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-codfy" />
                <a href={`tel:${CONTACT.phoneRaw}`} className="transition-colors hover:text-white">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-codfy" />
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Todos los derechos reservados.
          </p>
          <Link href="/terminos" className="transition-colors hover:text-white/80">
            Términos y Condiciones
          </Link>
        </div>
      </div>
    </footer>
  );
}
