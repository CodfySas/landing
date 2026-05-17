"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { Scissors } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  progress: MotionValue<number>;
};

type ScissorSpec = {
  id: string;
  x: string;
  y: string;
  size: number;
  rotate: number;
  /** 0..1 — how much it drifts (parallax depth). */
  depth: number;
  /** color override */
  color: string;
  /** opacity */
  opacity: number;
  /** spin direction */
  spin: 1 | -1;
};

const SCISSORS: ScissorSpec[] = [
  { id: "s1", x: "5%", y: "12%", size: 64, rotate: -15, depth: 0.7, color: "#ffd700", opacity: 0.28, spin: 1 },
  { id: "s2", x: "88%", y: "8%", size: 84, rotate: 28, depth: 0.9, color: "#9d4eda", opacity: 0.22, spin: -1 },
  { id: "s3", x: "78%", y: "78%", size: 96, rotate: -8, depth: 1.0, color: "#ffd700", opacity: 0.18, spin: 1 },
  { id: "s4", x: "10%", y: "70%", size: 52, rotate: 22, depth: 0.5, color: "#c39bff", opacity: 0.32, spin: -1 },
  { id: "s5", x: "92%", y: "45%", size: 44, rotate: -32, depth: 0.4, color: "#ffd700", opacity: 0.35, spin: 1 },
  { id: "s6", x: "3%", y: "44%", size: 38, rotate: 14, depth: 0.35, color: "#c39bff", opacity: 0.30, spin: 1 },
  { id: "s7", x: "45%", y: "8%", size: 30, rotate: 45, depth: 0.25, color: "#ffd700", opacity: 0.40, spin: -1 },
  { id: "s8", x: "52%", y: "92%", size: 36, rotate: -20, depth: 0.3, color: "#9d4eda", opacity: 0.30, spin: 1 },
  { id: "s9", x: "23%", y: "30%", size: 26, rotate: 60, depth: 0.2, color: "#ffd700", opacity: 0.45, spin: -1 },
  { id: "s10", x: "70%", y: "30%", size: 28, rotate: -45, depth: 0.22, color: "#c39bff", opacity: 0.35, spin: 1 },
  { id: "s11", x: "30%", y: "82%", size: 22, rotate: 18, depth: 0.18, color: "#ffd700", opacity: 0.48, spin: -1 },
  { id: "s12", x: "63%", y: "60%", size: 24, rotate: -10, depth: 0.2, color: "#c39bff", opacity: 0.38, spin: 1 },
];

const SPARKLES = Array.from({ length: 18 }, (_, i) => ({
  id: `sp${i}`,
  x: `${(i * 37) % 100}%`,
  y: `${(i * 53 + 7) % 100}%`,
  size: 2 + ((i * 7) % 4),
  delay: (i * 0.4) % 3,
  duration: 2.4 + ((i * 0.3) % 1.6),
}));

export function ScissorsScene({ progress }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d0322]">
      {/* Radial glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(157,78,218,0.22), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 80%, rgba(255,215,0,0.10), transparent 60%)",
        }}
      />
      {/* Subtle grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,215,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Scissors */}
      {SCISSORS.map((s) => (
        <ScissorItem key={s.id} spec={s} progress={progress} />
      ))}
      {/* Sparkles */}
      {SPARKLES.map((sp) => (
        <Sparkle key={sp.id} spec={sp} />
      ))}
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(13,3,34,0.6) 100%)",
        }}
      />
    </div>
  );
}

function ScissorItem({ spec, progress }: { spec: ScissorSpec; progress: MotionValue<number> }) {
  const reduced = usePrefersReducedMotion();
  const drift = useTransform(progress, [0, 1], [0, -180 * spec.depth]);
  const driftX = useTransform(progress, [0, 1], [0, 25 * spec.depth * spec.spin]);
  const rotation = useTransform(progress, [0, 1], [spec.rotate, spec.rotate + 35 * spec.spin]);
  const fade = useTransform(progress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
  const scaleVal = useTransform(progress, [0, 0.15, 1], [0.7, 1, 1.1]);

  return (
    <motion.div
      aria-hidden
      className="absolute"
      style={{
        left: spec.x,
        top: spec.y,
        x: reduced ? 0 : driftX,
        y: reduced ? 0 : drift,
        rotate: reduced ? spec.rotate : rotation,
        opacity: reduced ? spec.opacity : fade,
        scale: reduced ? 1 : scaleVal,
        color: spec.color,
        filter: `drop-shadow(0 4px 18px ${spec.color}55)`,
      }}
    >
      <Scissors
        style={{ width: spec.size, height: spec.size, opacity: spec.opacity * 1.5 }}
        strokeWidth={1.4}
      />
    </motion.div>
  );
}

function Sparkle({
  spec,
}: {
  spec: { x: string; y: string; size: number; delay: number; duration: number };
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <span
        aria-hidden
        className="absolute rounded-full bg-ampirux-gold/40"
        style={{
          left: spec.x,
          top: spec.y,
          width: spec.size,
          height: spec.size,
          boxShadow: `0 0 ${spec.size * 4}px ${spec.size}px rgba(255,215,0,0.3)`,
        }}
      />
    );
  }
  return (
    <motion.span
      aria-hidden
      className="absolute rounded-full bg-ampirux-gold"
      style={{
        left: spec.x,
        top: spec.y,
        width: spec.size,
        height: spec.size,
        boxShadow: `0 0 ${spec.size * 4}px ${spec.size}px rgba(255,215,0,0.4)`,
      }}
      animate={{ opacity: [0.1, 1, 0.1], scale: [0.6, 1.3, 0.6] }}
      transition={{
        duration: spec.duration,
        delay: spec.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
