"use client";

import { motion } from "framer-motion";
import {
  Check,
  Globe,
  Lock,
  Megaphone,
  PiggyBank,
  Timer,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { notamaestro } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Timer,
  TrendingUp,
  Megaphone,
  Lock,
  Globe,
  PiggyBank,
};

export function BenefitsNM() {
  return (
    <section className="relative py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-notamaestro-light">
            Beneficios
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {notamaestro.benefits.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {notamaestro.benefits.description}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-16 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {notamaestro.benefits.items.map((b) => {
            const Icon = iconMap[b.icon];
            return (
              <motion.div
                key={b.title}
                variants={staggerItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl p-7 backdrop-blur transition-all",
                  b.featured
                    ? "bg-gradient-to-br from-notamaestro to-notamaestro-dark text-white shadow-2xl shadow-notamaestro/40 lg:scale-[1.02]"
                    : "border border-white/10 bg-white/[0.03] text-white hover:border-notamaestro/40 hover:bg-white/[0.05]"
                )}
              >
                <div
                  className={cn(
                    "mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:rotate-6",
                    b.featured
                      ? "bg-white/15 text-white ring-1 ring-white/30"
                      : "bg-notamaestro/15 text-notamaestro-light ring-1 ring-notamaestro/30"
                  )}
                >
                  {Icon && <Icon className="h-7 w-7" />}
                </div>
                <h3 className="font-display text-xl font-bold">{b.title}</h3>
                <p className={cn("mt-3 text-sm leading-relaxed", b.featured ? "text-white/85" : "text-white/65")}>
                  {b.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {b.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className={cn(
                        "flex items-start gap-2 text-sm",
                        b.featured ? "text-white/90" : "text-white/75"
                      )}
                    >
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          b.featured ? "text-white" : "text-notamaestro-light"
                        )}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        <Reveal delay={0.2} className="mx-auto mt-20 max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-notamaestro via-notamaestro-dark to-[#5c3008] p-10 text-center text-white shadow-2xl shadow-notamaestro/30">
            <div className="absolute inset-0 opacity-20">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3), transparent 40%)",
                }}
              />
            </div>
            <div className="relative">
              <h3 className="font-display text-2xl font-bold sm:text-3xl md:text-4xl text-balance">
                {notamaestro.cta.title}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-white/85 text-balance">
                {notamaestro.cta.description}
              </p>
              <div className="mx-auto mt-8 grid max-w-md grid-cols-3 gap-4 border-t border-white/20 pt-6">
                {notamaestro.cta.stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-bold md:text-3xl">{s.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-white/70 md:text-xs">
                      {s.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
