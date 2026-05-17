"use client";

import { motion } from "framer-motion";
import {
  DollarSign,
  Target,
  TrendingUp,
  Calendar,
  Users,
  type LucideIcon,
} from "lucide-react";
import { ampirux } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";

const iconMap: Record<string, LucideIcon> = {
  DollarSign,
  TrendingUp,
  Target,
};

export function DashboardAmpirux() {
  return (
    <section className="relative py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ampirux-gold">
            {ampirux.dashboard.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {ampirux.dashboard.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {ampirux.dashboard.description}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-16 max-w-6xl">
          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-ampirux/25 via-ampirux-light/20 to-ampirux-gold/15 blur-3xl" />

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#120534] shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-4 flex max-w-md flex-1 items-center gap-2 rounded-md bg-white/5 px-3 py-1.5 text-xs text-white/60 ring-1 ring-white/10">
                  <span className="text-ampirux-gold">●</span>
                  app.ampirux.com/dashboard
                </div>
              </div>

              <div className="grid gap-px bg-white/5 md:grid-cols-[220px_1fr]">
                <div className="bg-[#0d0322] p-4 text-white">
                  <div className="mb-6 flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-ampirux to-ampirux-dark">
                      <span className="text-sm font-bold">A</span>
                    </div>
                    <span className="font-display font-bold">Ampirux</span>
                  </div>
                  <nav className="space-y-1">
                    {[
                      { label: "Dashboard", active: true },
                      { label: "Agenda", active: false },
                      { label: "Ventas", active: false },
                      { label: "Inventario", active: false },
                      { label: "Clientes", active: false },
                      { label: "Reportes", active: false },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                          item.active
                            ? "bg-ampirux/25 text-white ring-1 ring-ampirux/40"
                            : "text-white/55"
                        }`}
                      >
                        {item.label}
                      </div>
                    ))}
                  </nav>
                </div>

                <div className="bg-[#0d0322] p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        Resumen
                      </div>
                      <h3 className="font-display text-xl font-bold text-white">
                        Buenos días, Carlos
                      </h3>
                    </div>
                    <div className="hidden items-center gap-2 sm:flex">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ampirux/15 text-ampirux-gold">
                        <Users className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      {
                        icon: DollarSign,
                        label: "Ventas hoy",
                        value: "$630.450",
                        delta: "+12.4%",
                        color: "text-ampirux-gold",
                      },
                      {
                        icon: Calendar,
                        label: "Citas hoy",
                        value: "48",
                        delta: "+5",
                        color: "text-ampirux-light",
                      },
                      {
                        icon: TrendingUp,
                        label: "Crecimiento",
                        value: "+18%",
                        delta: "vs. ayer",
                        color: "text-green-400",
                      },
                    ].map((c, i) => (
                      <motion.div
                        key={c.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="rounded-xl border border-white/5 bg-gradient-to-br from-ampirux/10 to-transparent p-4"
                      >
                        <c.icon className={`h-4 w-4 ${c.color}`} />
                        <div className="mt-2 text-xs uppercase tracking-wider text-white/50">
                          {c.label}
                        </div>
                        <div className="mt-1 font-display text-xl font-bold text-white">
                          {c.value}
                        </div>
                        <div className={`mt-1 text-[11px] font-medium ${c.color}`}>{c.delta}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
                        Ventas últimos 7 días
                      </span>
                      <span className="text-xs font-medium text-ampirux-gold">$3.847.200</span>
                    </div>
                    <div className="flex h-32 items-end gap-2">
                      {[55, 70, 60, 85, 50, 95, 80].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          whileInView={{ height: `${h}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                          className="relative flex-1 rounded-t-lg bg-gradient-to-t from-ampirux to-ampirux-light"
                        >
                          <div className="absolute inset-x-0 -top-1 mx-auto h-1 w-full rounded-full bg-ampirux-gold opacity-60" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3"
        >
          {ampirux.dashboard.features.map((f) => {
            const Icon = iconMap[f.icon];
            return (
              <motion.div
                key={f.title}
                variants={staggerItem}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-ampirux/15 text-ampirux-gold ring-1 ring-ampirux/30">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <h3 className="font-display text-base font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{f.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
