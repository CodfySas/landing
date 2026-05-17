"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

type ChildState = {
  progress: MotionValue<number>;
  fadeIn: MotionValue<number>;
  fadeOut: MotionValue<number>;
  parallaxY: MotionValue<number>;
  scaleHero: MotionValue<number>;
};

type Props = {
  palette?: "codfy" | "ampirux" | "notamaestro";
  /** Multiplier of the viewport for the sticky-scroll container. 2 = 2x viewport. */
  scrollHeightVh?: number;
  /** Decorative overlay rendered above the scene (orbs/grid). */
  backdrop?: ReactNode;
  /** Optional scroll-driven scene rendered as the pinned canvas. */
  scene?: (progress: MotionValue<number>) => ReactNode;
  /** Foreground content. Receives motion values for parallax. */
  children: (state: ChildState) => ReactNode;
  className?: string;
};

export function ScrubHero({
  palette = "codfy",
  scrollHeightVh = 220,
  backdrop,
  scene,
  children,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const fadeIn = useTransform(scrollYProgress, [0, 0.18], [0, 1]);
  const fadeOut = useTransform(scrollYProgress, [0.72, 1], [1, 0]);
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const scaleHero = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <section
      ref={ref}
      className={cn("relative", className)}
      style={{ height: `${scrollHeightVh}vh` }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        {scene?.(progress)}
        {backdrop}
        <motion.div
          style={{ opacity: fadeOut }}
          className="absolute inset-0 z-10 flex items-start justify-center overflow-hidden px-2 pt-24 pb-4 md:pt-28 md:pb-8 [@media(min-height:920px)]:items-center"
        >
          {children({ progress, fadeIn, fadeOut, parallaxY, scaleHero })}
        </motion.div>
      </div>
    </section>
  );
}
