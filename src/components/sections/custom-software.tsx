"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useTransform } from "framer-motion";
import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  Cpu,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { home } from "@/lib/content";
import { StickyScroll } from "@/components/shared/sticky-scrollytelling";
import { cn } from "@/lib/utils";

const stepIcons: LucideIcon[] = [ClipboardCheck, Compass, Cpu, Rocket];

export function CustomSoftware() {
  const steps = home.custom.steps;

  return (
    <section id="desarrollo" className="relative text-white">

      <StickyScroll stepCount={steps.length} scrollHeightVh={steps.length * 70 + 30}>
        {({ progress, activeIndex }) => (
          <ProcessSticky progress={progress} activeIndex={activeIndex} steps={steps} />
        )}
      </StickyScroll>

      <div className="py-12 text-center">
        <ButtonLink href={home.custom.cta.href} size="lg" className="group">
          {home.custom.cta.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </ButtonLink>
      </div>
    </section>
  );
}

function ProcessSticky({
  progress,
  activeIndex,
  steps,
}: {
  progress: import("framer-motion").MotionValue<number>;
  activeIndex: import("framer-motion").MotionValue<number>;
  steps: typeof home.custom.steps;
}) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(activeIndex, "change", (v) => setActive(v));

  const trackWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-codfy-light">
          {home.custom.eyebrow}
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
          {home.custom.title}
        </h2>
        <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
          {home.custom.description}
        </p>
      </div>

      {/* Horizontal timeline (desktop) */}
      <div className="mt-14 hidden md:block">
        <div className="relative">
          <div className="absolute inset-x-0 top-7 h-[2px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ width: trackWidth }}
              className="h-full origin-left bg-gradient-to-r from-codfy via-codfy-light to-white/0"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {steps.map((s, i) => {
              const Icon = stepIcons[i];
              const isActive = i <= active;
              return (
                <div key={s.number} className="flex flex-col items-center text-center">
                  <motion.div
                    animate={{
                      scale: isActive ? 1 : 0.92,
                    }}
                    className={cn(
                      "relative z-10 mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full ring-2 transition-all duration-500",
                      isActive
                        ? "bg-gradient-to-br from-codfy to-codfy-dark text-white ring-codfy shadow-glow-codfy"
                        : "bg-codfy-ink text-white/40 ring-white/10"
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  <span className="text-xs font-mono font-semibold text-codfy-light/80">
                    PASO {s.number}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active step detail panel */}
        <div className="relative mt-12 min-h-[14rem]">
          {steps.map((s, i) => (
            <motion.article
              key={s.number}
              initial={false}
              animate={{
                opacity: i === active ? 1 : 0,
                y: i === active ? 0 : 20,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 mx-auto max-w-3xl rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-10"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
                  {s.title}
                </h3>
                <div className="text-right">
                  <div className="font-display text-5xl font-bold text-codfy/40">{s.number}</div>
                </div>
              </div>
              <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
                {s.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Vertical timeline (mobile) */}
      <div className="mt-12 md:hidden">
        <div className="relative pl-12">
          <div className="absolute left-[1.45rem] top-0 h-full w-[2px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              style={{ height: trackWidth }}
              className="origin-top bg-gradient-to-b from-codfy via-codfy-light to-white/0"
            />
          </div>
          <ul className="space-y-8">
            {steps.map((s, i) => {
              const Icon = stepIcons[i];
              const isActive = i <= active;
              return (
                <li key={s.number} className="relative">
                  <div
                    className={cn(
                      "absolute -left-12 top-1 inline-flex h-11 w-11 items-center justify-center rounded-full ring-2 transition-all duration-500",
                      isActive
                        ? "bg-gradient-to-br from-codfy to-codfy-dark text-white ring-codfy shadow-glow-codfy"
                        : "bg-codfy-ink text-white/40 ring-white/10"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-codfy-light/80">
                    PASO {s.number}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{s.description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
