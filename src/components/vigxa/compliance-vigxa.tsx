"use client";

import { motion } from "framer-motion";
import {
  Building2,
  CreditCard,
  FileBadge2,
  Lock,
  Plug,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { vigxa } from "@/lib/content";
import { Reveal, staggerContainer, staggerItem } from "@/components/shared/motion-section";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  CreditCard,
  FileBadge2,
  Lock,
  Plug,
  ShieldCheck,
};

export function ComplianceVigxa() {
  return (
    <section id="compliance" className="relative py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-vigxa-light">
            {vigxa.compliance.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {vigxa.compliance.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {vigxa.compliance.description}
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mx-auto mt-14 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {vigxa.compliance.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.title}
                variants={staggerItem}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-vigxa/15 bg-gradient-to-br from-[#1a1306]/60 to-[#0c0a05]/70 p-6 backdrop-blur-md transition-all hover:border-vigxa/40"
              >
                <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-vigxa/40 bg-vigxa/10 text-vigxa-light">
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display text-base font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
