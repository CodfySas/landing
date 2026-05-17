"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, GraduationCap, Sparkles, Users, BookOpen, BarChart3 } from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { EXTERNAL } from "@/lib/constants";
import { notamaestro } from "@/lib/content";

export function HeroNM() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#fff7eb] via-white to-[#fff7eb] pt-32 pb-20 md:pb-32">
      {/* Decorative shapes */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-notamaestro/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 h-[28rem] w-[28rem] rounded-full bg-notamaestro-light/20 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-10 top-40 h-32 w-32 rounded-full bg-notamaestro/30 blur-2xl"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left column - copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full bg-notamaestro/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-notamaestro-dark ring-1 ring-notamaestro/20"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {notamaestro.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-codfy-ink sm:text-5xl md:text-6xl"
            >
              {notamaestro.hero.title}{" "}
              <span className="bg-gradient-to-br from-notamaestro to-notamaestro-dark bg-clip-text text-transparent">
                {notamaestro.hero.titleHighlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-base text-balance text-neutral-600 md:text-lg"
            >
              {notamaestro.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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
                variant="white"
                className="border border-neutral-200 !text-codfy-ink"
              >
                <Play className="h-4 w-4 fill-current" />
                {notamaestro.hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-notamaestro/15 pt-8"
            >
              {notamaestro.hero.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-notamaestro-dark md:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column - dashboard mock */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative"
          >
            <div className="relative mx-auto max-w-xl">
              {/* Glow */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-notamaestro/30 via-notamaestro-light/20 to-transparent blur-2xl" />

              {/* Dashboard frame */}
              <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center gap-2 border-b border-neutral-100 bg-neutral-50 px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <div className="ml-4 flex items-center gap-2 rounded-md bg-white px-3 py-1 text-xs text-neutral-500 ring-1 ring-neutral-200">
                    <GraduationCap className="h-3.5 w-3.5 text-notamaestro" />
                    notamaestro.com
                  </div>
                </div>

                {/* Body */}
                <div className="space-y-4 p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Dashboard
                      </div>
                      <div className="font-display text-lg font-bold text-codfy-ink">
                        Resumen Académico
                      </div>
                    </div>
                    <div className="rounded-lg bg-notamaestro/10 px-2 py-1 text-xs font-medium text-notamaestro-dark">
                      Bimestre 2
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-notamaestro/8 to-notamaestro/4 p-3">
                      <Users className="h-4 w-4 text-notamaestro" />
                      <div className="mt-2 text-xl font-bold text-codfy-ink">847</div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                        Estudiantes
                      </div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-notamaestro/8 to-notamaestro/4 p-3">
                      <BookOpen className="h-4 w-4 text-notamaestro" />
                      <div className="mt-2 text-xl font-bold text-codfy-ink">32</div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                        Cursos
                      </div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-notamaestro/8 to-notamaestro/4 p-3">
                      <BarChart3 className="h-4 w-4 text-notamaestro" />
                      <div className="mt-2 text-xl font-bold text-codfy-ink">4.2</div>
                      <div className="text-[10px] uppercase tracking-wider text-neutral-500">
                        Promedio
                      </div>
                    </div>
                  </div>

                  {/* Chart placeholder */}
                  <div className="rounded-xl bg-neutral-50 p-4">
                    <div className="mb-3 flex items-center justify-between text-xs">
                      <span className="font-medium text-neutral-700">Rendimiento por grado</span>
                      <span className="text-notamaestro-dark">↑ 12.4%</span>
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
                className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-neutral-200"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100 text-green-700">
                  ✓
                </div>
                <div>
                  <div className="text-xs font-semibold text-codfy-ink">Asistencia</div>
                  <div className="text-[10px] text-neutral-500">98% hoy</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, type: "spring" }}
                className="absolute -top-4 -right-4 flex items-center gap-2 rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-neutral-200"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-notamaestro/10 text-notamaestro-dark">
                  <BookOpen className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-codfy-ink">3 boletines</div>
                  <div className="text-[10px] text-neutral-500">listos para enviar</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
