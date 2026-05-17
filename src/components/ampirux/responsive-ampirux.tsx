"use client";

import { motion } from "framer-motion";
import { Check, Smartphone, Tablet, Monitor } from "lucide-react";
import { ampirux } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";

export function ResponsiveAmpirux() {
  return (
    <section className="relative py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ampirux-gold">
              {ampirux.responsive.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
              {ampirux.responsive.title}
            </h2>
            <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
              {ampirux.responsive.description}
            </p>

            <ul className="mt-8 space-y-3">
              {ampirux.responsive.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-white/80">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ampirux-gold/15 text-ampirux-gold ring-1 ring-ampirux-gold/30">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative h-[28rem]"
          >
            <motion.div variants={staggerItem} className="absolute left-0 top-8 w-full max-w-md">
              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0b021a] shadow-2xl">
                <div className="flex items-center gap-1 border-b border-white/10 bg-white/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="space-y-2 p-4">
                  <div className="h-3 w-1/2 rounded bg-white/10" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 rounded bg-ampirux/35" />
                    <div className="h-10 rounded bg-ampirux/25" />
                    <div className="h-10 rounded bg-ampirux/30" />
                  </div>
                  <div className="h-14 rounded bg-white/5" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-white/55">
                <Monitor className="h-4 w-4" />
                Desktop
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="absolute right-8 top-0 w-44">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b021a] p-2 shadow-2xl">
                <div className="space-y-2 rounded-lg bg-[#0b021a] p-3 ring-1 ring-white/5">
                  <div className="h-2 w-2/3 rounded bg-white/10" />
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="h-8 rounded bg-ampirux/35" />
                    <div className="h-8 rounded bg-ampirux/25" />
                  </div>
                  <div className="h-10 rounded bg-white/5" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-white/55">
                <Tablet className="h-4 w-4" />
                Tablet
              </div>
            </motion.div>

            <motion.div variants={staggerItem} className="absolute right-0 bottom-0 w-28">
              <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 bg-[#0b021a] p-1.5 shadow-2xl">
                <div className="space-y-1.5 rounded-xl bg-[#0b021a] p-2 ring-1 ring-white/5">
                  <div className="h-1.5 w-1/2 rounded bg-white/10" />
                  <div className="h-6 rounded bg-ampirux/35" />
                  <div className="h-6 rounded bg-ampirux/25" />
                  <div className="h-8 rounded bg-white/5" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-white/55">
                <Smartphone className="h-3.5 w-3.5" />
                Mobile
              </div>
            </motion.div>

            <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-tr from-ampirux/15 via-ampirux-gold/10 to-transparent blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
