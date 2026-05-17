"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";
import { ampirux } from "@/lib/content";
import { EXTERNAL } from "@/lib/constants";
import { ButtonLink } from "@/components/shared/button-link";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";
import { cn } from "@/lib/utils";

export function PricingAmpirux() {
  return (
    <section className="relative py-24 text-white md:py-32">

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ampirux-gold">
            {ampirux.pricing.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {ampirux.pricing.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {ampirux.pricing.description}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mx-auto mt-16 grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-5"
        >
          {ampirux.pricing.plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={staggerItem}
              className={cn(
                "relative flex flex-col rounded-2xl p-6 backdrop-blur",
                plan.featured
                  ? "border-2 border-ampirux-gold bg-gradient-to-br from-ampirux-gold/15 to-ampirux/10 shadow-2xl shadow-ampirux-gold/20 lg:scale-[1.05] lg:-translate-y-2"
                  : "border border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-ampirux-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-codfy-ink">
                  <Star className="h-3 w-3 fill-current" />
                  Recomendado
                </div>
              )}
              <div>
                <h3 className={cn("font-display text-lg font-bold", plan.featured ? "text-ampirux-gold" : "text-white")}>
                  {plan.name}
                </h3>
                <p className="mt-1 text-xs text-white/60">{plan.description}</p>
              </div>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-xs text-white/50">$</span>
                <span className="font-display text-3xl font-bold text-white">{plan.price}</span>
                <span className="text-xs text-white/50">{plan.period}</span>
              </div>
              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-white/80">
                    <Check
                      className={cn(
                        "mt-0.5 h-3.5 w-3.5 shrink-0",
                        plan.featured ? "text-ampirux-gold" : "text-ampirux-light"
                      )}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={EXTERNAL.ampirux}
                target="_blank"
                rel="noopener noreferrer"
                size="default"
                variant={plan.featured ? "ampirux" : "outline"}
                className={cn(
                  "mt-6 w-full",
                  plan.featured && "!bg-ampirux-gold !text-codfy-ink hover:!bg-ampirux-gold/90"
                )}
              >
                Elegir {plan.name}
              </ButtonLink>
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.3} className="mt-10 text-center text-xs text-white/50">
          Precios en COP. Sin compromiso de permanencia. Cancela cuando quieras.
        </Reveal>
      </div>
    </section>
  );
}
