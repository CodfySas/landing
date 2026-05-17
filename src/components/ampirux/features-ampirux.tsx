"use client";

import { motion } from "framer-motion";
import {
  BarChart,
  CalendarCheck,
  FileSpreadsheet,
  Mic,
  Package,
  Scissors,
  ShoppingCart,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { ampirux } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";

const iconMap: Record<string, LucideIcon> = {
  Mic,
  CalendarCheck,
  Scissors,
  ShoppingCart,
  Package,
  Wallet,
  BarChart,
  FileSpreadsheet,
};

export function FeaturesAmpirux() {
  return (
    <section className="relative py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ampirux-gold">
            Funcionalidades
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {ampirux.features.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {ampirux.features.description}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ampirux.features.items.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <motion.div
                key={f.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md transition-all hover:border-ampirux/40 hover:bg-white/[0.06] hover:shadow-glow-ampirux"
              >
                <div className="absolute -top-px left-7 right-7 h-1 rounded-full bg-gradient-to-r from-ampirux to-ampirux-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ampirux to-ampirux-dark text-white shadow-lg shadow-ampirux/30 transition-transform duration-300 group-hover:rotate-6">
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <h3 className="font-display text-lg font-bold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{f.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
