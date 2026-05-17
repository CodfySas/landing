"use client";

import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, Compass, Cpu, Rocket } from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { home } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";

const stepIcons = [ClipboardCheck, Compass, Cpu, Rocket];

export function CustomSoftware() {
  return (
    <section
      id="desarrollo"
      className="relative isolate overflow-hidden bg-codfy-ink py-24 text-white md:py-32"
    >
      <div className="absolute inset-0 gradient-mesh-codfy opacity-60" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-codfy-light">
            {home.custom.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {home.custom.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {home.custom.description}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mx-auto mt-16 max-w-6xl"
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {home.custom.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <motion.div
                  key={step.number}
                  variants={staggerItem}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md transition-all hover:border-codfy/40 hover:bg-white/[0.06]"
                >
                  <div className="absolute -right-6 -top-6 text-[120px] font-bold leading-none text-white/[0.04] transition-colors group-hover:text-codfy/15">
                    {step.number}
                  </div>
                  <div className="relative">
                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-codfy/15 text-codfy-light ring-1 ring-codfy/30 transition-all group-hover:bg-codfy/25 group-hover:ring-codfy/50">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <div className="mb-2 text-xs font-mono font-semibold text-codfy-light/80">
                      PASO {step.number}
                    </div>
                    <h3 className="font-display text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <Reveal delay={0.2} className="mt-14 flex justify-center">
          <ButtonLink href={home.custom.cta.href} size="lg" className="group">
            {home.custom.cta.label}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
