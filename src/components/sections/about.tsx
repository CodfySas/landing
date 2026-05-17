"use client";

import { motion } from "framer-motion";
import { Search, Code2, Rocket, type LucideIcon } from "lucide-react";
import { home } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";

const iconMap: Record<string, LucideIcon> = {
  Search,
  Code2,
  Rocket,
};

export function About() {
  return (
    <section
      id="nosotros"
      className="relative py-24 text-white md:py-32"
    >

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-codfy-light">
            {home.about.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {home.about.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {home.about.description}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3"
        >
          {/* Connecting line between pillars (desktop) */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-12 right-12 top-12 hidden h-px bg-gradient-to-r from-codfy/0 via-codfy/40 to-codfy/0 md:block"
          />
          {home.about.pillars.map((pillar, i) => {
            const Icon = iconMap[pillar.icon];
            return (
              <motion.div
                key={pillar.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-md transition-all duration-300 hover:border-codfy/40 hover:bg-white/[0.06] hover:shadow-glow-codfy"
              >
                <div className="absolute -top-px left-8 right-8 h-1 rounded-full bg-gradient-to-r from-codfy via-codfy-light to-codfy/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-2 text-xs font-mono font-semibold text-codfy-light/80">
                    0{i + 1} / 0{home.about.pillars.length}
                  </div>
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-codfy to-codfy-dark text-white shadow-glow-codfy transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {Icon && <Icon className="h-7 w-7" strokeWidth={2} />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{pillar.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{pillar.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
