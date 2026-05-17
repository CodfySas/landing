"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, GraduationCap, Scissors, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { home } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";
import { cn } from "@/lib/utils";

const brandStyles = {
  notamaestro: {
    icon: GraduationCap,
    accent: "from-notamaestro to-notamaestro-dark",
    glow: "shadow-glow-notamaestro",
    badge: "bg-notamaestro/15 text-notamaestro border-notamaestro/30",
    ring: "hover:ring-notamaestro/40",
    text: "text-notamaestro",
  },
  ampirux: {
    icon: Scissors,
    accent: "from-ampirux to-ampirux-dark",
    glow: "shadow-glow-ampirux",
    badge: "bg-ampirux/15 text-ampirux border-ampirux/30",
    ring: "hover:ring-ampirux/40",
    text: "text-ampirux",
  },
  codfy: {
    icon: Wrench,
    accent: "from-codfy to-codfy-dark",
    glow: "shadow-glow-codfy",
    badge: "bg-codfy/15 text-codfy-dark border-codfy/30",
    ring: "hover:ring-codfy/40",
    text: "text-codfy-dark",
  },
} as const;

export function Products() {
  return (
    <section
      id="productos"
      className="relative overflow-hidden bg-gradient-to-b from-neutral-50 to-white py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-codfy">
            {home.products.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-codfy-ink text-balance sm:text-4xl md:text-5xl">
            {home.products.title}
          </h2>
          <p className="mt-5 text-base text-balance text-neutral-600 md:text-lg">
            {home.products.description}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {home.products.items.map((item) => {
            const styles = brandStyles[item.brand];
            const Icon = styles.icon;
            const isComingSoon = item.cta === "Próximamente";
            return (
              <motion.div
                key={item.slug}
                variants={staggerItem}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={cn(
                  "group relative flex flex-col overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-neutral-200 transition-all duration-300",
                  styles.ring,
                  `hover:${styles.glow}`,
                  "hover:ring-2"
                )}
              >
                <div
                  className={cn(
                    "absolute -top-px left-8 right-8 h-1 rounded-full bg-gradient-to-r",
                    styles.accent
                  )}
                />
                <div className="absolute right-6 top-6">
                  {isComingSoon && (
                    <Badge variant="outline" className={cn("border", styles.badge)}>
                      Pronto
                    </Badge>
                  )}
                </div>
                <div
                  className={cn(
                    "mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
                    styles.accent
                  )}
                >
                  <Icon className="h-7 w-7" strokeWidth={2} />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="font-display text-2xl font-bold text-codfy-ink">{item.name}</h3>
                  <p className={cn("text-sm font-medium", styles.text)}>{item.tagline}</p>
                  <p className="pt-1 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                </div>
                <ul className="mt-6 space-y-2">
                  {item.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-700">
                      <Check className={cn("mt-0.5 h-4 w-4 shrink-0", styles.text)} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href={item.href}
                  className={cn(
                    "mt-8 inline-flex items-center gap-1.5 text-sm font-semibold transition-all group/link",
                    styles.text,
                    isComingSoon && "pointer-events-none opacity-60"
                  )}
                >
                  {item.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
