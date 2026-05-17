"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  ClipboardList,
  Clock,
  Cloud,
  Download,
  FileText,
  LineChart,
  MessageSquare,
  Network,
  RefreshCw,
  Shield,
  Smartphone,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import { notamaestro } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";

const iconMap: Record<string, LucideIcon> = {
  ClipboardList,
  FileText,
  UserCheck,
  Calendar,
  Network,
  CheckSquare,
  MessageSquare,
  Clock,
  BarChart3,
  Download,
  LineChart,
  Smartphone,
  Cloud,
  Shield,
  RefreshCw,
};

export function FeaturesNM() {
  return (
    <section className="relative py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-notamaestro-light">
            Funcionalidades clave
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            Todo lo que tu institución necesita
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            Una plataforma completa para la gestión escolar, diseñada con docentes y administradores.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-16 grid max-w-6xl gap-6 md:grid-cols-3"
        >
          {notamaestro.mainFeatures.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={feature.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-notamaestro/[0.04] p-7 backdrop-blur-md transition-all hover:border-notamaestro/40 hover:shadow-glow-notamaestro"
              >
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-notamaestro to-notamaestro-dark text-white shadow-lg shadow-notamaestro/30 transition-transform duration-300 group-hover:rotate-6">
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <h3 className="font-display text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{feature.description}</p>
                <ul className="mt-5 space-y-1.5">
                  {feature.highlights.map((h) => (
                    <li key={h} className="flex items-center gap-2 text-xs text-white/70">
                      <span className="h-1.5 w-1.5 rounded-full bg-notamaestro-light" />
                      {h}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Subgrids */}
        <div className="mt-28 space-y-24">
          {[notamaestro.teacherFeatures, notamaestro.adminFeatures, notamaestro.techFeatures].map(
            (group, idx) => (
              <div key={group.title}>
                <Reveal className="mx-auto max-w-2xl text-center">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                    {group.title}
                  </h3>
                  <p className="mt-3 text-white/65">{group.description}</p>
                </Reveal>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
                >
                  {group.items.map((item) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <motion.div
                        key={item.title}
                        variants={staggerItem}
                        whileHover={{ y: -4 }}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all hover:border-notamaestro/40 hover:bg-white/[0.05]"
                      >
                        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-notamaestro/15 text-notamaestro-light ring-1 ring-notamaestro/30">
                          {Icon && <Icon className="h-5 w-5" />}
                        </div>
                        <h4 className="font-display text-base font-semibold text-white">
                          {item.title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-white/65">
                          {item.description}
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
                {idx < 2 && (
                  <div className="mx-auto mt-24 h-px max-w-3xl bg-gradient-to-r from-transparent via-notamaestro/30 to-transparent" />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
