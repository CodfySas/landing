"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu } from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

const LIGHT_HERO_ROUTES = new Set(["/notamaestro"]);

export function Navbar() {
  const pathname = usePathname();
  const isLightHero = LIGHT_HERO_ROUTES.has(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 30);
  });

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Theme variables — avoid all-side borders (glass-dark adds them); use bottom-only
  const headerBg = isLightHero
    ? scrolled
      ? "bg-white/85 backdrop-blur-xl shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)]"
      : "bg-white/40 backdrop-blur-md"
    : scrolled
      ? "bg-codfy-ink/70 backdrop-blur-xl shadow-[0_4px_20px_-8px_rgba(0,0,0,0.5)]"
      : "bg-transparent";

  const linkClasses = isLightHero
    ? "rounded-md px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-900/5 hover:text-codfy-ink"
    : "rounded-md px-3 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white";

  const triggerClasses = isLightHero
    ? "inline-flex h-10 w-10 items-center justify-center rounded-md text-codfy-ink hover:bg-neutral-900/5 lg:hidden"
    : "inline-flex h-10 w-10 items-center justify-center rounded-md text-white hover:bg-white/10 lg:hidden";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={cn("fixed inset-x-0 top-0 z-40 transition-all duration-300", headerBg)}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group" aria-label={SITE.name}>
          <Image
            src="/assets/logo.png"
            alt={SITE.name}
            width={120}
            height={40}
            priority
            className="h-8 w-auto transition-transform group-hover:scale-105 md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={linkClasses}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex">
          <ButtonLink
            href="/#contacto"
            size="default"
            variant={isLightHero ? "notamaestro" : "primary"}
          >
            Empezar ahora
          </ButtonLink>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className={triggerClasses} aria-label="Abrir menú">
            <Menu className="h-6 w-6" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-sm border-l border-white/10 bg-codfy-ink p-0 text-white sm:max-w-md"
          >
            <SheetHeader className="border-b border-white/10 px-6 py-4">
              <SheetTitle className="flex items-center justify-between text-white">
                <Image
                  src="/assets/logo.png"
                  alt={SITE.name}
                  width={100}
                  height={32}
                  className="h-8 w-auto"
                />
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 p-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <ButtonLink
                href="/#contacto"
                size="default"
                className="mt-4 w-full"
                onClick={() => setOpen(false)}
              >
                Empezar ahora
              </ButtonLink>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
