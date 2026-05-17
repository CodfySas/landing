"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Play,
  GraduationCap,
  Sparkles,
  Users,
  BookOpen,
  BarChart3,
} from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { ScrubHero } from "@/components/shared/scrub-hero";
import { EXTERNAL } from "@/lib/constants";
import { notamaestro } from "@/lib/content";

export function HeroNM() {
  return (
    <ScrubHero
      palette="notamaestro"
      scrollHeightVh={180}
    >
      {({ parallaxY, scaleHero }) => (
        <motion.div
          style={{ y: parallaxY, scale: scaleHero }}
          className="relative mx-auto grid w-full max-w-7xl gap-8 px-4 sm:px-6 xl:grid-cols-2 xl:items-center xl:gap-16 lg:px-8"
        >
          {/* Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-notamaestro/40 bg-notamaestro/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-notamaestro-light"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {notamaestro.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[2.1rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[3.8rem] 2xl:text-[4.4rem]"
            >
              {notamaestro.hero.title}{" "}
              <span className="bg-gradient-to-br from-notamaestro-light via-notamaestro to-notamaestro-light bg-clip-text text-transparent">
                {notamaestro.hero.titleHighlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-xl text-base text-balance text-white/70 md:text-lg"
            >
              {notamaestro.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink
                href={EXTERNAL.notamaestro}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="notamaestro"
                className="group"
              >
                {notamaestro.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href={EXTERNAL.notamaestroDemo}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="outline"
              >
                <Play className="h-4 w-4 fill-current" />
                {notamaestro.hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="mt-10 grid grid-cols-3 gap-6 border-t border-white/10 pt-7"
            >
              {notamaestro.hero.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-notamaestro-light md:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45 md:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Dashboard mock */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-xl">
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-notamaestro/40 via-notamaestro-light/25 to-transparent blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#160c02]/80 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <div className="ml-4 flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-xs text-white/60 ring-1 ring-white/10">
                    <GraduationCap className="h-3.5 w-3.5 text-notamaestro-light" />
                    notamaestro.com
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        Dashboard
                      </div>
                      <div className="font-display text-lg font-bold text-white">
                        Resumen Académico
                      </div>
                    </div>
                    <div className="rounded-lg bg-notamaestro/15 px-2 py-1 text-xs font-medium text-notamaestro-light ring-1 ring-notamaestro/30">
                      Bimestre 2
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { Icon: Users, value: "847", label: "Estudiantes" },
                      { Icon: BookOpen, value: "32", label: "Cursos" },
                      { Icon: BarChart3, value: "4.2", label: "Promedio" },
                    ].map(({ Icon, value, label }) => (
                      <div
                        key={label}
                        className="rounded-xl border border-white/5 bg-gradient-to-br from-notamaestro/15 to-transparent p-3"
                      >
                        <Icon className="h-4 w-4 text-notamaestro-light" />
                        <div className="mt-2 text-xl font-bold text-white">{value}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/55">
                          {label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-white/5 bg-white/[0.03] p-4">
                    <div className="mb-3 flex items-center justify-between text-xs">
                      <span className="font-medium text-white/80">Rendimiento por grado</span>
                      <span className="text-notamaestro-light">↑ 12.4%</span>
                    </div>
                    <div className="flex h-24 items-end gap-2">
                      {[55, 70, 45, 80, 65, 90, 75].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                          className="flex-1 rounded-t bg-gradient-to-t from-notamaestro to-notamaestro-light"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
                className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/20 text-green-300">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">Asistencia</div>
                  <div className="text-[10px] text-white/55">98% hoy</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-4 -right-4 flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 shadow-2xl backdrop-blur-xl"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-notamaestro/20 text-notamaestro-light">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-white">3 boletines</div>
                  <div className="text-[10px] text-white/55">listos para enviar</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </ScrubHero>
  );
}

