"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { EXTERNAL } from "@/lib/constants";
import { ampirux } from "@/lib/content";
import { Reveal } from "@/components/shared/motion-section";

export function CtaAmpirux() {
  return (
    <section className="relative py-24 md:py-32">

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-ampirux-gold/30 bg-ampirux-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-ampirux-gold">
            <Sparkles className="h-3.5 w-3.5" />
            Empieza hoy mismo
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.1] tracking-tight text-white text-balance sm:text-5xl md:text-6xl">
            {ampirux.cta.title}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base text-balance text-white/70 md:text-lg">
            {ampirux.cta.description}
          </p>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/80">
            {ampirux.cta.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ampirux-gold text-codfy-ink">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {f}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink
              href={EXTERNAL.ampirux}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="ampirux"
              className="group !bg-ampirux-gold !text-codfy-ink hover:!bg-ampirux-gold/90"
            >
              Iniciar Ahora
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="/#contacto" size="lg" variant="outline">
              Hablar con ventas
            </ButtonLink>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-20 grid grid-cols-3 gap-4 border-t border-white/10 pt-10">
          {ampirux.cta.stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="bg-gradient-to-br from-ampirux-gold to-ampirux-light bg-clip-text font-display text-3xl font-bold text-transparent sm:text-4xl md:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs font-medium uppercase tracking-wider text-white/50 md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
