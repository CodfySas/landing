"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { ScrubHero } from "@/components/shared/scrub-hero";
import { EXTERNAL } from "@/lib/constants";
import { vigxa } from "@/lib/content";

export function HeroVigxa() {
  return (
    <ScrubHero palette="codfy" scrollHeightVh={170}>
      {({ parallaxY, scaleHero }) => (
        <motion.div
          style={{ y: parallaxY, scale: scaleHero }}
          className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          {/* Hero copy is left-aligned because the 3D tower sits on the right
              of the viewport during the hero scroll range. */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-vigxa/30 bg-vigxa/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-vigxa-light"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {vigxa.hero.eyebrow}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 font-display text-[2.2rem] font-bold leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl xl:text-[4.2rem] 2xl:text-[4.8rem]"
            >
              {vigxa.hero.title}{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-br from-vigxa-amber via-vigxa-light to-vigxa bg-clip-text text-transparent">
                  {vigxa.hero.titleHighlight}
                </span>
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.9, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-[3px] origin-left rounded-full bg-gradient-to-r from-vigxa via-vigxa-light to-transparent"
                />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-6 max-w-xl text-base text-balance text-white/70 md:text-lg"
            >
              {vigxa.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink
                href={EXTERNAL.vigxa}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="primary"
                className="group !bg-vigxa !text-[#1a1306] hover:!bg-vigxa-light shadow-glow-vigxa"
              >
                {vigxa.hero.primaryCta.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink
                href={EXTERNAL.vigxaDemo}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="outline"
              >
                <Play className="h-4 w-4 fill-current" />
                {vigxa.hero.secondaryCta.label}
              </ButtonLink>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-4 text-xs text-white/45"
            >
              {vigxa.hero.trialNote}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-white/10 pt-6"
            >
              {vigxa.hero.stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-bold text-vigxa-light md:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/50 md:text-xs">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </ScrubHero>
  );
}
