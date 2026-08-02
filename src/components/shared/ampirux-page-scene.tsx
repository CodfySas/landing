"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useWebGLSupport } from "@/hooks/use-webgl-support";

const AmpiruxScene3D = dynamic(
  () => import("@/components/three/ampirux-scene-3d").then((m) => m.AmpiruxScene3D),
  { ssr: false }
);

/**
 * Persistent background scene for Ampirux: a real Three.js scene with golden
 * scissors that travel and snip across the page as you scroll, surrounded by
 * floating barber props. Falls back to the legacy SVG/CSS scene when WebGL
 * is unavailable. Fixed positioning so the scene extends hero → footer.
 */
export function AmpiruxPageScene() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const webgl = useWebGLSupport();

  const progressRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <BackdropWashes progress={scrollYProgress} />

      {webgl ? (
        <AmpiruxScene3D progressRef={progressRef} reduced={reduced} />
      ) : webgl === false ? (
        <>
          {/* Legacy scene — WebGL unavailable */}
          <HeroScissors progress={scrollYProgress} reduced={reduced} />
          <FloatingTools progress={scrollYProgress} reduced={reduced} />
          <Sparkles />
        </>
      ) : null}

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,215,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(13,3,34,0.55) 100%)",
        }}
      />
    </div>
  );
}

function BackdropWashes({ progress }: { progress: MotionValue<number> }) {
  const x1 = useTransform(progress, [0, 1], ["10%", "70%"]);
  const x2 = useTransform(progress, [0, 1], ["80%", "20%"]);
  return (
    <>
      <motion.div
        style={{ left: x1, top: "10%" }}
        className="absolute h-[36rem] w-[36rem] rounded-full bg-ampirux/20 blur-[120px]"
      />
      <motion.div
        style={{ left: x2, top: "55%" }}
        className="absolute h-[40rem] w-[40rem] rounded-full bg-ampirux-light/15 blur-[140px]"
      />
      <motion.div
        style={{
          left: useTransform(progress, [0, 1], ["45%", "55%"]),
          top: "80%",
        }}
        className="absolute h-[28rem] w-[28rem] rounded-full bg-ampirux-gold/15 blur-[120px]"
      />
    </>
  );
}

function HeroScissors({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  // Side-to-side travel with multiple stops
  const x = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    ["12%", "62%", "8%", "65%", "20%"]
  );
  const y = useTransform(
    progress,
    [0, 0.25, 0.5, 0.75, 1],
    ["18vh", "30vh", "22vh", "35vh", "25vh"]
  );
  const rotate = useTransform(
    progress,
    [0, 0.5, 1],
    [-15, 35, -8]
  );
  const scale = useTransform(progress, [0, 0.5, 1], [1, 1.1, 0.95]);

  return (
    <motion.div
      style={
        reduced
          ? { left: "12%", top: "20vh", rotate: -15 }
          : { left: x, top: y, rotate, scale }
      }
      className="absolute"
    >
      <ScissorsSvg size={460} opacity={0.18} />
    </motion.div>
  );
}

function FloatingTools({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const specs: ToolSpec[] = [
    // Combs traveling counter to the main scissors
    {
      kind: "comb",
      baseX: 78,
      baseY: 14,
      driftX: [78, 18, 75, 12],
      driftY: [14, 25, 18, 30],
      rot: [10, -25, 15, -30],
      size: 220,
      opacity: 0.22,
    },
    {
      kind: "comb",
      baseX: 18,
      baseY: 60,
      driftX: [18, 72, 22, 78],
      driftY: [60, 70, 65, 60],
      rot: [-12, 20, -8, 28],
      size: 180,
      opacity: 0.18,
    },
    // Razors
    {
      kind: "razor",
      baseX: 70,
      baseY: 78,
      driftX: [70, 15, 65, 18],
      driftY: [78, 70, 75, 80],
      rot: [25, -10, 40, -22],
      size: 200,
      opacity: 0.2,
    },
    {
      kind: "razor",
      baseX: 8,
      baseY: 28,
      driftX: [8, 60, 12, 55],
      driftY: [28, 22, 30, 28],
      rot: [-30, 20, -15, 35],
      size: 160,
      opacity: 0.18,
    },
    // Smaller scissors (background ones)
    {
      kind: "scissor",
      baseX: 88,
      baseY: 45,
      driftX: [88, 32, 85, 38],
      driftY: [45, 50, 55, 48],
      rot: [40, -20, 30, -10],
      size: 160,
      opacity: 0.14,
    },
    {
      kind: "scissor",
      baseX: 25,
      baseY: 86,
      driftX: [25, 78, 28, 72],
      driftY: [86, 80, 90, 82],
      rot: [-15, 22, -28, 15],
      size: 140,
      opacity: 0.16,
    },
    // Bottles / mirror / brush — small accents
    {
      kind: "bottle",
      baseX: 5,
      baseY: 18,
      driftX: [5, 50, 8, 45],
      driftY: [18, 12, 22, 15],
      rot: [-5, 10, -8, 5],
      size: 90,
      opacity: 0.2,
    },
    {
      kind: "bottle",
      baseX: 92,
      baseY: 65,
      driftX: [92, 38, 88, 35],
      driftY: [65, 72, 70, 75],
      rot: [8, -5, 12, -8],
      size: 78,
      opacity: 0.22,
    },
    {
      kind: "brush",
      baseX: 50,
      baseY: 8,
      driftX: [50, 12, 55, 18],
      driftY: [8, 14, 12, 18],
      rot: [-20, 25, -15, 30],
      size: 130,
      opacity: 0.2,
    },
    {
      kind: "brush",
      baseX: 60,
      baseY: 92,
      driftX: [60, 28, 65, 22],
      driftY: [92, 88, 90, 86],
      rot: [15, -10, 25, -5],
      size: 110,
      opacity: 0.18,
    },
  ];
  return (
    <>
      {specs.map((spec, i) => (
        <FloatingItem key={i} spec={spec} progress={progress} reduced={reduced} />
      ))}
    </>
  );
}

type ToolKind = "scissor" | "comb" | "razor" | "bottle" | "brush";
type ToolSpec = {
  kind: ToolKind;
  baseX: number;
  baseY: number;
  /** 4 values 0% scroll → 33% → 66% → 100% (creates random-feeling travel) */
  driftX: [number, number, number, number];
  driftY: [number, number, number, number];
  rot: [number, number, number, number];
  size: number;
  opacity: number;
};

function FloatingItem({
  spec,
  progress,
  reduced,
}: {
  spec: ToolSpec;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const x = useTransform(
    progress,
    [0, 0.33, 0.66, 1],
    spec.driftX.map((v) => `${v}%`)
  );
  const y = useTransform(
    progress,
    [0, 0.33, 0.66, 1],
    spec.driftY.map((v) => `${v}vh`)
  );
  const rotate = useTransform(progress, [0, 0.33, 0.66, 1], spec.rot);

  return (
    <motion.div
      style={
        reduced
          ? {
              left: `${spec.baseX}%`,
              top: `${spec.baseY}vh`,
              rotate: spec.rot[0],
            }
          : { left: x, top: y, rotate }
      }
      className="absolute"
    >
      <ToolSvg kind={spec.kind} size={spec.size} opacity={spec.opacity} />
    </motion.div>
  );
}

function Sparkles() {
  const dots = Array.from({ length: 24 }, (_, i) => ({
    x: `${(i * 41) % 100}%`,
    y: `${(i * 71 + 3) % 100}vh`,
    size: 2 + ((i * 5) % 4),
    duration: 2.5 + ((i * 0.3) % 2),
    delay: (i * 0.27) % 3,
  }));
  return (
    <>
      {dots.map((d, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-ampirux-gold"
          style={{
            left: d.x,
            top: d.y,
            width: d.size,
            height: d.size,
            boxShadow: `0 0 ${d.size * 4}px ${d.size}px rgba(255,215,0,0.35)`,
          }}
          animate={{ opacity: [0.1, 0.9, 0.1], scale: [0.6, 1.3, 0.6] }}
          transition={{
            duration: d.duration,
            delay: d.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
}

function ToolSvg({
  kind,
  size,
  opacity,
}: {
  kind: ToolKind;
  size: number;
  opacity: number;
}) {
  switch (kind) {
    case "scissor":
      return <ScissorsSvg size={size} opacity={opacity} />;
    case "comb":
      return <CombSvg size={size} opacity={opacity} />;
    case "razor":
      return <RazorSvg size={size} opacity={opacity} />;
    case "bottle":
      return <BottleSvg size={size} opacity={opacity} />;
    case "brush":
      return <BrushSvg size={size} opacity={opacity} />;
  }
}

function ScissorsSvg({ size, opacity }: { size: number; opacity: number }) {
  // Stylized open scissors — silvery blades + gold handles
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={{ opacity }}
      fill="none"
    >
      <defs>
        <linearGradient id={`blade-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e7e9f0" />
          <stop offset="50%" stopColor="#c39bff" />
          <stop offset="100%" stopColor="#9d4eda" />
        </linearGradient>
        <linearGradient id={`handle-${size}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd700" />
          <stop offset="100%" stopColor="#c19a00" />
        </linearGradient>
      </defs>
      {/* Top blade */}
      <path
        d="M100,100 L170,30 L185,40 L110,108 Z"
        fill={`url(#blade-${size})`}
      />
      {/* Bottom blade */}
      <path
        d="M100,100 L170,170 L185,160 L110,92 Z"
        fill={`url(#blade-${size})`}
      />
      {/* Top handle ring */}
      <circle cx="60" cy="50" r="22" stroke={`url(#handle-${size})`} strokeWidth="10" fill="none" />
      {/* Bottom handle ring */}
      <circle cx="60" cy="150" r="22" stroke={`url(#handle-${size})`} strokeWidth="10" fill="none" />
      {/* Arms */}
      <path d="M80,62 L98,98" stroke="#7b2cbf" strokeWidth="8" strokeLinecap="round" />
      <path d="M80,138 L98,102" stroke="#7b2cbf" strokeWidth="8" strokeLinecap="round" />
      {/* Pivot */}
      <circle cx="100" cy="100" r="6" fill="#ffd700" />
      <circle cx="100" cy="100" r="3" fill="#7b2cbf" />
    </svg>
  );
}

function CombSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      viewBox="0 0 240 60"
      width={size}
      height={(size * 60) / 240}
      style={{ opacity }}
      fill="none"
    >
      <defs>
        <linearGradient id={`comb-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9d4eda" />
          <stop offset="100%" stopColor="#5a1a99" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="228" height="22" rx="4" fill={`url(#comb-${size})`} />
      {Array.from({ length: 30 }).map((_, i) => (
        <rect
          key={i}
          x={10 + i * 7.4}
          y="28"
          width={i % 4 === 0 ? 2 : 1.5}
          height={i % 4 === 0 ? 28 : 22}
          fill={`url(#comb-${size})`}
        />
      ))}
      <circle cx="216" cy="17" r="3" fill="#ffd700" />
    </svg>
  );
}

function RazorSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      viewBox="0 0 200 80"
      width={size}
      height={(size * 80) / 200}
      style={{ opacity }}
      fill="none"
    >
      <defs>
        <linearGradient id={`razor-handle-${size}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3a1456" />
          <stop offset="100%" stopColor="#7b2cbf" />
        </linearGradient>
        <linearGradient id={`razor-blade-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e7e9f0" />
          <stop offset="100%" stopColor="#c39bff" />
        </linearGradient>
      </defs>
      {/* Handle */}
      <rect x="6" y="28" width="120" height="20" rx="6" fill={`url(#razor-handle-${size})`} />
      {/* Connector */}
      <rect x="126" y="32" width="16" height="12" fill="#5a1a99" />
      {/* Head */}
      <rect x="142" y="20" width="52" height="36" rx="4" fill={`url(#razor-blade-${size})`} />
      <line x1="146" y1="38" x2="190" y2="38" stroke="#7b2cbf" strokeWidth="1.5" />
      <line x1="146" y1="44" x2="190" y2="44" stroke="#7b2cbf" strokeWidth="1.5" />
      <line x1="146" y1="32" x2="190" y2="32" stroke="#7b2cbf" strokeWidth="1.5" />
      {/* Gold accent */}
      <circle cx="40" cy="38" r="4" fill="#ffd700" />
    </svg>
  );
}

function BottleSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      viewBox="0 0 80 140"
      width={(size * 80) / 140}
      height={size}
      style={{ opacity }}
      fill="none"
    >
      <defs>
        <linearGradient id={`bottle-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9d4eda" />
          <stop offset="50%" stopColor="#7b2cbf" />
          <stop offset="100%" stopColor="#5a1a99" />
        </linearGradient>
      </defs>
      {/* Cap */}
      <rect x="28" y="4" width="24" height="14" rx="2" fill="#ffd700" />
      {/* Neck */}
      <rect x="32" y="18" width="16" height="12" fill="#5a1a99" />
      {/* Body */}
      <path
        d="M20,30 L60,30 L66,46 L66,128 C66,134 60,138 56,138 L24,138 C20,138 14,134 14,128 L14,46 Z"
        fill={`url(#bottle-${size})`}
      />
      {/* Label */}
      <rect x="22" y="64" width="36" height="36" rx="2" fill="rgba(255,234,200,0.4)" />
      <line x1="26" y1="76" x2="54" y2="76" stroke="#5a1a99" strokeWidth="1" />
      <line x1="26" y1="84" x2="50" y2="84" stroke="#5a1a99" strokeWidth="1" />
      <line x1="26" y1="92" x2="52" y2="92" stroke="#5a1a99" strokeWidth="1" />
    </svg>
  );
}

function BrushSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      viewBox="0 0 120 200"
      width={(size * 120) / 200}
      height={size}
      style={{ opacity }}
      fill="none"
    >
      <defs>
        <linearGradient id={`brush-handle-${size}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7b2cbf" />
          <stop offset="100%" stopColor="#3a1456" />
        </linearGradient>
      </defs>
      {/* Handle */}
      <rect x="48" y="80" width="24" height="120" rx="6" fill={`url(#brush-handle-${size})`} />
      {/* Bristles cap */}
      <ellipse cx="60" cy="76" rx="44" ry="14" fill="#5a1a99" />
      {/* Bristles */}
      <path
        d="M20,72 Q60,12 100,72 Q60,40 20,72 Z"
        fill="#2a0d4a"
      />
      {Array.from({ length: 16 }).map((_, i) => (
        <line
          key={i}
          x1={22 + i * 5}
          y1={70 - Math.abs(i - 8) * 4}
          x2={22 + i * 5}
          y2="20"
          stroke="#1a062e"
          strokeWidth="1"
        />
      ))}
      {/* Gold band */}
      <rect x="44" y="76" width="32" height="6" fill="#ffd700" />
    </svg>
  );
}
