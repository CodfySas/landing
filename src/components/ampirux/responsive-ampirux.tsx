"use client";

import { motion } from "framer-motion";
import { Check, Smartphone, Tablet, Monitor } from "lucide-react";
import { ampirux } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";

export function ResponsiveAmpirux() {
  return (
    <section className="relative bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Copy */}
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-ampirux">
              {ampirux.responsive.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-codfy-ink text-balance sm:text-4xl md:text-5xl">
              {ampirux.responsive.title}
            </h2>
            <p className="mt-5 text-base text-balance text-neutral-600 md:text-lg">
              {ampirux.responsive.description}
            </p>

            <ul className="mt-8 space-y-3">
              {ampirux.responsive.features.map((f) => (
                <li key={f} className="flex items-center gap-3 text-neutral-700">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ampirux/15 text-ampirux-dark">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Device mockups */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="relative h-[28rem]"
          >
            {/* Desktop */}
            <motion.div
              variants={staggerItem}
              className="absolute left-0 top-8 w-full max-w-md"
            >
              <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-codfy-ink shadow-xl">
                <div className="flex items-center gap-1 border-b border-white/10 bg-white/5 px-3 py-2">
                  <span className="h-2 w-2 rounded-full bg-red-400" />
                  <span className="h-2 w-2 rounded-full bg-yellow-400" />
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                </div>
                <div className="space-y-2 p-4">
                  <div className="h-3 w-1/2 rounded bg-white/10" />
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-10 rounded bg-ampirux/30" />
                    <div className="h-10 rounded bg-ampirux/20" />
                    <div className="h-10 rounded bg-ampirux/25" />
                  </div>
                  <div className="h-14 rounded bg-white/5" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-neutral-500">
                <Monitor className="h-4 w-4" />
                Desktop
              </div>
            </motion.div>

            {/* Tablet */}
            <motion.div
              variants={staggerItem}
              className="absolute right-8 top-0 w-44"
            >
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-codfy-ink p-2 shadow-xl">
                <div className="space-y-2 rounded-lg bg-codfy-ink p-3 ring-1 ring-white/5">
                  <div className="h-2 w-2/3 rounded bg-white/10" />
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="h-8 rounded bg-ampirux/30" />
                    <div className="h-8 rounded bg-ampirux/20" />
                  </div>
                  <div className="h-10 rounded bg-white/5" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-neutral-500">
                <Tablet className="h-4 w-4" />
                Tablet
              </div>
            </motion.div>

            {/* Mobile */}
            <motion.div
              variants={staggerItem}
              className="absolute right-0 bottom-0 w-28"
            >
              <div className="relative overflow-hidden rounded-2xl border-2 border-neutral-200 bg-codfy-ink p-1.5 shadow-2xl">
                <div className="space-y-1.5 rounded-xl bg-codfy-ink p-2 ring-1 ring-white/5">
                  <div className="h-1.5 w-1/2 rounded bg-white/10" />
                  <div className="h-6 rounded bg-ampirux/30" />
                  <div className="h-6 rounded bg-ampirux/20" />
                  <div className="h-8 rounded bg-white/5" />
                </div>
              </div>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-medium text-neutral-500">
                <Smartphone className="h-3.5 w-3.5" />
                Mobile
              </div>
            </motion.div>

            {/* Decorative glow */}
            <div className="absolute -inset-8 -z-10 rounded-full bg-gradient-to-tr from-ampirux/10 via-ampirux-gold/10 to-transparent blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
