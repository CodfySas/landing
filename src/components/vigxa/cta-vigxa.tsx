"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/shared/button-link";
import { EXTERNAL } from "@/lib/constants";
import { vigxa } from "@/lib/content";

export function CtaVigxa() {
  return (
    <section className="relative py-24 text-white md:py-32">
      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-[2rem] border border-vigxa/30 bg-gradient-to-br from-[#1a1306] via-[#15110a] to-[#0c0a05] p-10 shadow-2xl md:p-14"
        >
          {/* glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-vigxa/30 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -left-16 bottom-0 h-60 w-60 rounded-full bg-vigxa-dark/40 blur-3xl"
          />
          {/* blueprint grid */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,158,11,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.6) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              maskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 80%)",
            }}
          />

          <div className="relative">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-vigxa-light">
              {vigxa.cta.eyebrow}
            </span>
            <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
              {vigxa.cta.title}
            </h2>
            <p className="mt-5 max-w-2xl text-base text-balance text-white/70 md:text-lg">
              {vigxa.cta.description}
            </p>

            <ul className="mt-7 grid gap-2.5 sm:grid-cols-3">
              {vigxa.cta.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-sm text-white/80"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-vigxa" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink
                href={EXTERNAL.vigxa}
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                variant="primary"
                className="group !bg-vigxa !text-[#1a1306] hover:!bg-vigxa-light shadow-glow-vigxa"
              >
                {vigxa.cta.primary.label}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </ButtonLink>
              <ButtonLink href={vigxa.cta.secondary.href} size="lg" variant="outline">
                <MessageCircle className="h-4 w-4" />
                {vigxa.cta.secondary.label}
              </ButtonLink>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
