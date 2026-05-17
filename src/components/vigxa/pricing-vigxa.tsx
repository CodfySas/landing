"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Star } from "lucide-react";
import { vigxa } from "@/lib/content";
import { EXTERNAL } from "@/lib/constants";
import { ButtonLink } from "@/components/shared/button-link";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";
import { cn } from "@/lib/utils";

export function PricingVigxa() {
  return (
    <section id="planes" className="relative py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-vigxa-light">
            {vigxa.pricing.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {vigxa.pricing.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {vigxa.pricing.description}
          </p>
        </Reveal>

        {/* Trial banner */}
        <Reveal delay={0.1} className="mx-auto mt-10 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-vigxa/30 bg-gradient-to-r from-vigxa/15 via-vigxa/5 to-vigxa/15 px-5 py-3.5">
          <Sparkles className="h-4 w-4 shrink-0 text-vigxa" />
          <p className="text-sm text-white/85">
            <span className="font-semibold text-vigxa-light">
              {vigxa.pricing.trialBanner.label}.
            </span>{" "}
            <span className="text-white/70">{vigxa.pricing.trialBanner.text}</span>
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-12 grid max-w-6xl gap-6 sm:gap-5 md:grid-cols-3"
        >
          {vigxa.pricing.plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className={cn(
                "relative flex flex-col rounded-3xl p-7 backdrop-blur",
                plan.featured
                  ? "border-2 border-vigxa bg-gradient-to-br from-vigxa/15 to-vigxa-dark/15 shadow-2xl shadow-vigxa/20 md:scale-[1.04] md:-translate-y-2"
                  : "border border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.05]"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-vigxa px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1a1306]">
                  <Star className="h-3 w-3 fill-current" />
                  Recomendado
                </div>
              )}

              <div>
                <h3
                  className={cn(
                    "font-display text-xl font-bold",
                    plan.featured ? "text-vigxa-light" : "text-white"
                  )}
                >
                  {plan.name}
                </h3>
                <p className="mt-1.5 text-sm text-white/65">{plan.description}</p>
              </div>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="text-sm text-white/50">$</span>
                <span className="font-display text-4xl font-bold text-white tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm text-white/50">{plan.period}</span>
              </div>
              <div className="mt-1 text-[11px] font-medium uppercase tracking-wider text-white/40">
                {plan.limits}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/85">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        plan.featured ? "text-vigxa" : "text-vigxa-light"
                      )}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <ButtonLink
                href={EXTERNAL.vigxa}
                target="_blank"
                rel="noopener noreferrer"
                size="default"
                variant={plan.featured ? "primary" : "outline"}
                className={cn(
                  "mt-7 w-full",
                  plan.featured && "!bg-vigxa !text-[#1a1306] hover:!bg-vigxa-light"
                )}
              >
                Elegir {plan.name}
              </ButtonLink>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.25} className="mt-10 text-center text-xs text-white/45">
          Precios en COP/mes. Sin compromiso de permanencia · Cancela cuando quieras · Pagos Wompi
          (PSE, tarjeta, Bancolombia, Nequi).
        </Reveal>
      </div>
    </section>
  );
}
