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
    <section id="nosotros" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-codfy/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-codfy">
            {home.about.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-codfy-ink text-balance sm:text-4xl md:text-5xl">
            {home.about.title}
          </h2>
          <p className="mt-5 text-base text-balance text-neutral-600 md:text-lg">
            {home.about.description}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3"
        >
          {home.about.pillars.map((pillar) => {
            const Icon = iconMap[pillar.icon];
            return (
              <motion.div
                key={pillar.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:border-codfy/30 hover:shadow-lg hover:shadow-codfy/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-codfy/0 via-codfy/0 to-codfy/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative">
                  <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-codfy to-codfy-dark text-white shadow-lg shadow-codfy/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    {Icon && <Icon className="h-7 w-7" strokeWidth={2} />}
                  </div>
                  <h3 className="font-display text-xl font-bold text-codfy-ink">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
