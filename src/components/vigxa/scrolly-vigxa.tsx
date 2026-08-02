"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check } from "lucide-react";
import { vigxa } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * The scrollytelling track. The 3D tower lives in the page-level scene and is
 * positioned independently by global scroll progress; here we render the
 * content steps pinned in sticky containers, with each step's text aligned
 * to the side OPPOSITE the tower (so tower-left ↔ text-right).
 */
export function ScrollyVigxa() {
  const steps = vigxa.scrolly.steps;
  const ref = useRef<HTMLDivElement>(null);

  // One viewport per step + a buffer top/bottom = (steps + 0.6) * 100vh.
  const SCROLL_HEIGHT_VH = steps.length * 100 + 60;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="modulos"
      className="relative"
    >
      {/* Intro band */}
      <div className="relative px-4 pt-24 pb-6 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-3xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-vigxa-light">
            {vigxa.scrolly.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {vigxa.scrolly.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {vigxa.scrolly.description}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/35">
            <span className="inline-block h-px w-8 bg-vigxa/40" />
            Scroll para explorar
            <span className="inline-block h-px w-8 bg-vigxa/40" />
          </p>
        </motion.div>
      </div>

      {/* Sticky scrollytelling track. The id is read by VigxaPageScene so it
          can drive the 3D tower's X position from the same progress that
          drives the step fades — keeps the tower in lockstep with the
          active step at any viewport height. */}
      <div
        ref={ref}
        id="modulos-track"
        style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
        className="relative"
      >
        <div className="sticky top-0 flex h-[100svh] w-full items-center overflow-hidden">
          {steps.map((step, i) => (
            <ScrollyStep
              key={step.id}
              step={step}
              index={i}
              total={steps.length}
              progress={scrollYProgress}
            />
          ))}

          {/* Step indicator rail (left side) */}
          <StepRail count={steps.length} progress={scrollYProgress} />
        </div>
      </div>
    </section>
  );
}

function ScrollyStep({
  step,
  index,
  total,
  progress,
}: {
  step: (typeof vigxa.scrolly.steps)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each step takes 1/total of the scroll. Add a small overlap so transitions
  // feel continuous. Explicit lambda so the clamping is deterministic
  // (relying on useTransform's auto-clamp left a window where multiple
  // steps were rendering with opacity 1 simultaneously).
  const slot = 1 / total;
  const start = index * slot;
  const end = (index + 1) * slot;
  const fadeIn = start - slot * 0.12;
  const hold1 = start + slot * 0.18;
  const hold2 = end - slot * 0.18;
  const fadeOut = end + slot * 0.12;

  const opacity = useTransform(progress, (v) => {
    if (v <= fadeIn) return 0;
    if (v < hold1) return (v - fadeIn) / (hold1 - fadeIn);
    if (v <= hold2) return 1;
    if (v < fadeOut) return 1 - (v - hold2) / (fadeOut - hold2);
    return 0;
  });
  const yShift = useTransform(progress, (v) => {
    if (v <= fadeIn) return 40;
    if (v < hold1) return 40 - (40 * (v - fadeIn)) / (hold1 - fadeIn);
    if (v <= hold2) return 0;
    if (v < fadeOut) return -40 * ((v - hold2) / (fadeOut - hold2));
    return -40;
  });

  // align "right" → text right / tower LEFT. align "left" → text left /
  // tower RIGHT. align "center" → tower CENTER with text split both sides.
  const align = step.align as "left" | "right" | "center";

  if (align === "center") {
    return (
      <motion.div
        style={{ opacity, y: yShift }}
        className="pointer-events-none absolute inset-0 mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8"
      >
        {/* Left card: eyebrow + title + description */}
        <div className="pointer-events-auto relative w-full max-w-md">
          <StepCard>
            <StepHeading step={step} index={index} total={total} />
            <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
              {step.description}
            </p>
          </StepCard>
        </div>

        {/* Empty middle — the 3D tower lives here */}
        <div className="hidden min-w-[26vw] flex-1 lg:block" />

        {/* Right card: bullets */}
        <div className="pointer-events-auto relative hidden w-full max-w-md lg:block">
          <StepCard>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-vigxa-light/80">
              Incluye
            </span>
            <ul className="mt-4 grid gap-2.5">
              {step.bullets.map((b) => (
                <StepBullet key={b} text={b} />
              ))}
            </ul>
          </StepCard>
        </div>
      </motion.div>
    );
  }

  const isTextRight = align === "right";

  return (
    <motion.div
      style={{ opacity, y: yShift }}
      className={cn(
        "pointer-events-none absolute inset-0 mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8",
        isTextRight ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "pointer-events-auto relative w-full max-w-xl",
          isTextRight ? "ml-auto text-left" : "mr-auto text-left"
        )}
      >
        <StepCard>
          <StepHeading step={step} index={index} total={total} />
          <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
            {step.description}
          </p>

          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
            {step.bullets.map((b) => (
              <StepBullet key={b} text={b} />
            ))}
          </ul>

          {/* Arrow pointer toward the tower */}
          <div
            className={cn(
              "pointer-events-none absolute top-1/2 hidden -translate-y-1/2 lg:block",
              isTextRight ? "-left-10" : "-right-10"
            )}
          >
            <ArrowToTower flip={!isTextRight} />
          </div>
        </StepCard>
      </div>
    </motion.div>
  );
}

function StepCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-visible rounded-3xl border border-vigxa/25 bg-[#0c0a05]/55 p-7 shadow-2xl backdrop-blur-xl md:p-9">
      {/* accent bar */}
      <div className="absolute -top-px left-9 right-9 h-1 rounded-full bg-gradient-to-r from-vigxa via-vigxa-light to-vigxa/0" />
      {children}
    </div>
  );
}

function StepHeading({
  step,
  index,
  total,
}: {
  step: (typeof vigxa.scrolly.steps)[number];
  index: number;
  total: number;
}) {
  return (
    <>
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.3em] text-vigxa-light/80">
          {step.eyebrow}
        </span>
        <span className="text-white/30">·</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-white sm:text-3xl md:text-[2.2rem]">
        {step.title}
      </h3>
    </>
  );
}

function StepBullet({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.025] p-2.5 text-xs text-white/85 sm:text-sm">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-vigxa" />
      <span>{text}</span>
    </li>
  );
}

function ArrowToTower({ flip }: { flip: boolean }) {
  return (
    <svg
      width="56"
      height="22"
      viewBox="0 0 56 22"
      fill="none"
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
    >
      <line
        x1="4"
        y1="11"
        x2="48"
        y2="11"
        stroke="rgba(245,158,11,0.5)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <path
        d="M44 5 L52 11 L44 17"
        stroke="rgba(245,158,11,0.7)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="4" cy="11" r="2.5" fill="rgba(245,158,11,0.85)" />
    </svg>
  );
}

function StepRail({
  count,
  progress,
}: {
  count: number;
  progress: MotionValue<number>;
}) {
  return (
    <div className="pointer-events-none absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 lg:flex">
      <div className="flex flex-col items-center gap-3">
        {Array.from({ length: count }).map((_, i) => (
          <RailDot key={i} index={i} count={count} progress={progress} />
        ))}
      </div>
    </div>
  );
}

function RailDot({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const slot = 1 / count;
  const center = index * slot + slot / 2;
  const scale = useTransform(progress, (v) =>
    Math.abs(v - center) < slot / 2 ? 1.5 : 1
  );
  const opacity = useTransform(progress, (v) =>
    Math.abs(v - center) < slot / 2 ? 1 : 0.4
  );

  return (
    <motion.span
      style={{ scale, opacity }}
      className="h-2.5 w-2.5 rounded-full bg-vigxa"
    />
  );
}
