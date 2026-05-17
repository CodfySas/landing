"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { home } from "@/lib/content";

const orbs = [
  { x: "8%", y: "15%", size: 380, color: "#429cd8", duration: 22, delay: 0 },
  { x: "75%", y: "20%", size: 320, color: "#7b2cbf", duration: 26, delay: 2 },
  { x: "55%", y: "75%", size: 420, color: "#e78617", duration: 28, delay: 4 },
];

export function HeroHome() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-codfy-ink pt-28"
    >
      {/* Animated orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {orbs.map((orb, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-25 blur-[100px]"
            style={{
              left: orb.x,
              top: orb.y,
              width: orb.size,
              height: orb.size,
              background: orb.color,
            }}
            animate={{
              x: [0, 60, -40, 0],
              y: [0, -50, 30, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{
              duration: orb.duration,
              delay: orb.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-white/70 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-codfy" />
            {home.hero.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-balance text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            {home.hero.title}
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-br from-codfy via-codfy-light to-white bg-clip-text text-transparent">
                {home.hero.titleHighlight}
              </span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-1 origin-left rounded-full bg-gradient-to-r from-codfy to-transparent"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-7 max-w-2xl text-base text-balance text-white/65 md:text-lg"
          >
            {home.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
          >
            <ButtonLink href={home.hero.primaryCta.href} size="lg" className="group">
              {home.hero.primaryCta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href={home.hero.secondaryCta.href} size="lg" variant="outline">
              {home.hero.secondaryCta.label}
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mt-16 grid grid-cols-3 gap-6 border-t border-white/10 pt-8 sm:gap-12"
          >
            {home.hero.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/50">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Fade to next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-codfy-ink/90" />
    </section>
  );
}
