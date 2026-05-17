"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Scissors, Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { EXTERNAL } from "@/lib/constants";
import { ampirux } from "@/lib/content";

export function HeroAmpirux() {
  return (
    <section className="relative isolate overflow-hidden bg-[#0d0322] pt-32 pb-20 md:pb-32">
      {/* Animated purple aurora */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -left-32 top-20 h-[32rem] w-[32rem] rounded-full bg-ampirux/40 blur-[120px]"
          animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0], scale: [1, 1.15, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-32 top-40 h-[28rem] w-[28rem] rounded-full bg-ampirux-light/30 blur-[120px]"
          animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 22, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/3 bottom-0 h-72 w-72 rounded-full bg-ampirux-gold/15 blur-[100px]"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-ampirux-gold/30 bg-ampirux-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ampirux-gold"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {ampirux.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              {ampirux.hero.title}{" "}
              <span className="bg-gradient-to-br from-ampirux-gold via-ampirux-light to-ampirux-gold bg-clip-text text-transparent">
                {ampirux.hero.titleHighlight}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 max-w-xl text-base text-balance text-white/70 md:text-lg"
            >
              {ampirux.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink
                href={EXTERNAL.ampirux}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="ampirux"
                className="group !bg-ampirux-gold !text-codfy-ink hover:!bg-ampirux-gold/90"
              >
                {ampirux.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href={EXTERNAL.ampiruxDemo}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="outline"
              >
                <Play className="h-4 w-4 fill-current" />
                {ampirux.hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8"
            >
              {ampirux.hero.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-ampirux-gold md:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
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
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-tr from-ampirux/50 via-ampirux-light/30 to-ampirux-gold/30 blur-2xl" />

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-codfy-ink shadow-2xl">
                {/* Top bar */}
                <div className="flex items-center gap-2 border-b border-white/5 bg-white/[0.03] px-4 py-3">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-400" />
                  <span className="h-3 w-3 rounded-full bg-green-400" />
                  <div className="ml-4 flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-xs text-white/60 ring-1 ring-white/10">
                    <Scissors className="h-3.5 w-3.5 text-ampirux-gold" />
                    ampirux.com
                  </div>
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/40">
                        {ampirux.hero.dashboardMock.title}
                      </div>
                      <div className="font-display text-lg font-bold text-white">Resumen del Día</div>
                    </div>
                    <div className="rounded-lg bg-ampirux-gold/10 px-2 py-1 text-xs font-medium text-ampirux-gold ring-1 ring-ampirux-gold/30">
                      En vivo
                    </div>
                  </div>

                  {/* Metrics row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-ampirux/15 to-transparent p-4 ring-1 ring-white/5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                        {ampirux.hero.dashboardMock.sales.label}
                      </div>
                      <div className="mt-1 font-display text-xl font-bold text-white">
                        {ampirux.hero.dashboardMock.sales.value}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-green-400">
                        <TrendingUp className="h-3 w-3" />
                        {ampirux.hero.dashboardMock.sales.delta}
                      </div>
                    </div>
                    <div className="rounded-xl bg-gradient-to-br from-red-500/10 to-transparent p-4 ring-1 ring-white/5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                        {ampirux.hero.dashboardMock.expenses.label}
                      </div>
                      <div className="mt-1 font-display text-xl font-bold text-white">
                        {ampirux.hero.dashboardMock.expenses.value}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-red-400">
                        <TrendingDown className="h-3 w-3" />
                        {ampirux.hero.dashboardMock.expenses.delta}
                      </div>
                    </div>
                  </div>

                  {/* Top service */}
                  <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-ampirux-gold/15 to-transparent p-4 ring-1 ring-ampirux-gold/30">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ampirux-gold/20 text-ampirux-gold">
                        <Scissors className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-white/50">
                          {ampirux.hero.dashboardMock.top.label}
                        </div>
                        <div className="font-display text-sm font-bold text-white">
                          {ampirux.hero.dashboardMock.top.value}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-ampirux-gold">
                        {ampirux.hero.dashboardMock.top.count.split(" ")[0]}
                      </div>
                      <div className="text-[10px] text-white/50">
                        {ampirux.hero.dashboardMock.top.count.split(" ").slice(1).join(" ")}
                      </div>
                    </div>
                  </div>

                  {/* Mini chart */}
                  <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-white/5">
                    <div className="mb-3 flex items-center justify-between text-xs">
                      <span className="font-medium text-white/80">Ventas semanales</span>
                      <span className="text-green-400">+18.2%</span>
                    </div>
                    <div className="flex h-20 items-end gap-2">
                      {[40, 55, 35, 70, 50, 80, 95].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.6 + i * 0.05, duration: 0.5 }}
                          className="flex-1 rounded-t bg-gradient-to-t from-ampirux to-ampirux-light"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
