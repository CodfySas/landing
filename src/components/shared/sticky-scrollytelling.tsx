"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type StickyState = {
  progress: MotionValue<number>;
  /** Index of the currently active step (0..stepCount-1). */
  activeIndex: MotionValue<number>;
};

type StickyScrollProps = {
  stepCount: number;
  /** Total scrollable height in viewport units (default: stepCount * 100). */
  scrollHeightVh?: number;
  className?: string;
  pinClassName?: string;
  children: (state: StickyState) => ReactNode;
};

export function StickyScroll({
  stepCount,
  scrollHeightVh,
  className,
  pinClassName,
  children,
}: StickyScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const height = scrollHeightVh ?? stepCount * 100;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const activeIndex = useTransform(scrollYProgress, (v) =>
    Math.min(stepCount - 1, Math.max(0, Math.floor(v * stepCount)))
  );

  return (
    <section
      ref={ref}
      className={cn("relative", className)}
      style={{ height: `${height}vh` }}
    >
      <div
        className={cn(
          "sticky top-0 flex h-[100svh] w-full items-center overflow-hidden",
          pinClassName
        )}
      >
        {children({ progress, activeIndex })}
      </div>
    </section>
  );
}

/**
 * Horizontal scrollytelling: a flex strip translated by scroll progress.
 * Inside this component, render the panels you want side-by-side.
 */
type HorizontalScrollProps = {
  panelCount: number;
  /** Total scrollable height (default: panelCount * 100vh). */
  scrollHeightVh?: number;
  className?: string;
  pinClassName?: string;
  /** Children receives the strip and progress. */
  children: (state: {
    progress: MotionValue<number>;
    translateX: MotionValue<string>;
  }) => ReactNode;
};

export function HorizontalScroll({
  panelCount,
  scrollHeightVh,
  className,
  pinClassName,
  children,
}: HorizontalScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const height = scrollHeightVh ?? panelCount * 90;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  // Translate from 0% to -((panelCount-1)/panelCount * 100)% so the last panel ends flush.
  const endPct = -((panelCount - 1) / panelCount) * 100;
  const translateX = useTransform(scrollYProgress, [0, 1], ["0%", `${endPct}%`]);

  return (
    <section
      ref={ref}
      className={cn("relative", className)}
      style={{ height: `${height}vh` }}
    >
      <div
        className={cn(
          "sticky top-0 flex h-[100svh] w-full items-center overflow-hidden",
          pinClassName
        )}
      >
        <motion.div
          style={{ x: translateX, width: `${panelCount * 100}%` }}
          className="flex h-full"
        >
          {children({ progress, translateX })}
        </motion.div>
      </div>
    </section>
  );
}
