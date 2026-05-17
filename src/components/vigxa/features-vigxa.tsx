"use client";

import { motion } from "framer-motion";
import {
  Building2,
  ClipboardCheck,
  FileBadge2,
  FileCheck2,
  FileSpreadsheet,
  Globe2,
  HardHat,
  LayoutDashboard,
  MessageSquareText,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { vigxa } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  ClipboardCheck,
  FileBadge2,
  FileCheck2,
  FileSpreadsheet,
  Globe2,
  HardHat,
  LayoutDashboard,
  MessageSquareText,
  Receipt,
  ShieldCheck,
  TrendingUp,
  Users,
  Wrench,
};

export function FeaturesVigxa() {
  return (
    <section id="modulos" className="relative py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-vigxa-light">
            {vigxa.features.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {vigxa.features.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {vigxa.features.description}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-16 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {vigxa.features.items.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <motion.div
                key={f.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-vigxa/40 hover:bg-white/[0.06] hover:shadow-glow-vigxa"
              >
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-vigxa/70 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-vigxa to-vigxa-dark text-[#1a1306] shadow-lg shadow-vigxa/30 transition-transform duration-300 group-hover:rotate-6">
                  {Icon && <Icon className="h-5 w-5" strokeWidth={2.4} />}
                </div>
                <h3 className="font-display text-base font-bold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{f.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
