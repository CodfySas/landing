"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { ScrubHero } from "@/components/shared/scrub-hero";
import { home } from "@/lib/content";

export function HeroHome() {
  return (
    <ScrubHero
      palette="codfy"
      scrollHeightVh={160}
    >
      {({ parallaxY, scaleHero }) => (
        <motion.div
          style={{ y: parallaxY, scale: scaleHero }}
          className="relative mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8"
        >
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/75 backdrop-blur-md"
          >
            {home.hero.eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[2.2rem] font-bold leading-[1.05] tracking-tight text-white text-balance sm:text-5xl md:text-6xl xl:text-[5rem]"
          >
            {home.hero.title}
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-br from-white via-codfy-light to-codfy bg-clip-text text-transparent">
                {home.hero.titleHighlight}
              </span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left rounded-full bg-gradient-to-r from-codfy via-codfy-light to-transparent"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mx-auto mt-7 max-w-2xl text-base text-balance text-white/65 md:text-lg"
          >
            {home.hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
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
            className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6 border-t border-white/10 pt-6 sm:gap-12"
          >
            {home.hero.metrics.map((m) => (
              <div key={m.label} className="text-center">
                <div className="bg-gradient-to-br from-white to-white/70 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                  {m.value}
                </div>
                <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45 md:text-xs">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.6 }}
            className="mt-8 flex flex-col items-center gap-2 text-white/45 md:mt-12"
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex"
            >
              <ArrowDown className="h-4 w-4" />
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </ScrubHero>
  );
}

