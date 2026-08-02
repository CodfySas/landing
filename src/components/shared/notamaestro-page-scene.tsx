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

const NotaMaestroScene3D = dynamic(
  () =>
    import("@/components/three/notamaestro-scene-3d").then(
      (m) => m.NotaMaestroScene3D
    ),
  { ssr: false }
);

/**
 * Persistent background scene for NotaMaestro: a Three.js open book that
 * travels through the page (right → center → left → right) with a graduation
 * cap, pencils and paper sheets floating around it. Falls back to the legacy
 * SVG scene when WebGL is unavailable. Fixed positioning hero → footer.
 */
export function NotaMaestroPageScene() {
  const reduced = usePrefersReducedMotion();
  const webgl = useWebGLSupport();
  const { scrollYProgress } = useScroll();

  const progressRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  // Book travels across the page in 4 stops (alternating sides)
  // 0 → left (10%), 0.33 → right (62%), 0.66 → left (12%), 1 → right (58%)
  const bookX = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["8%", "62%", "12%", "58%"]
  );
  const bookY = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    ["20vh", "35vh", "25vh", "30vh"]
  );
  const bookRotate = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    [-8, 6, -4, 10]
  );
  const bookScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1.1, 0.95]
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Ambient gradient washes that drift slowly */}
      <BackdropWashes progress={scrollYProgress} />

      {webgl ? (
        <NotaMaestroScene3D progressRef={progressRef} reduced={reduced} />
      ) : webgl === false ? (
        <>
          {/* Legacy scene — WebGL unavailable */}
          <motion.div
            style={
              reduced
                ? { left: "10%", top: "25vh" }
                : { left: bookX, top: bookY, rotate: bookRotate, scale: bookScale }
            }
            className="absolute"
          >
            <BookSvg size={420} opacity={0.16} />
          </motion.div>
          <SecondaryBook progress={scrollYProgress} reduced={reduced} />
          <FloatingAccents progress={scrollYProgress} reduced={reduced} />
        </>
      ) : null}

      {/* Subtle warm grain over everything */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,164,66,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(244,164,66,0.5) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 40%, rgba(22,12,2,0.55) 100%)",
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
        style={{ left: x1, top: "12%" }}
        className="absolute h-[36rem] w-[36rem] rounded-full bg-notamaestro/15 blur-[120px]"
      />
      <motion.div
        style={{ left: x2, top: "55%" }}
        className="absolute h-[40rem] w-[40rem] rounded-full bg-notamaestro-light/12 blur-[140px]"
      />
    </>
  );
}

function SecondaryBook({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const x = useTransform(progress, [0, 0.33, 0.66, 1], ["72%", "10%", "75%", "8%"]);
  const y = useTransform(progress, [0, 1], ["60vh", "20vh"]);
  const rotate = useTransform(progress, [0, 1], [12, -18]);
  return (
    <motion.div
      style={reduced ? { right: "10%", top: "60vh" } : { left: x, top: y, rotate }}
      className="absolute"
    >
      <BookSvg size={220} opacity={0.1} closed />
    </motion.div>
  );
}

function FloatingAccents({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const specs = [
    { kind: "paper" as const, depth: 0.4, baseX: 18, baseY: 70, size: 80, rot: 12 },
    { kind: "paper" as const, depth: 0.6, baseX: 78, baseY: 18, size: 64, rot: -20 },
    { kind: "paper" as const, depth: 0.3, baseX: 50, baseY: 82, size: 70, rot: 5 },
    { kind: "pencil" as const, depth: 0.5, baseX: 35, baseY: 12, size: 90, rot: 35 },
    { kind: "pencil" as const, depth: 0.7, baseX: 88, baseY: 48, size: 110, rot: -45 },
    { kind: "dot" as const, depth: 0.2, baseX: 12, baseY: 40, size: 12, rot: 0 },
    { kind: "dot" as const, depth: 0.8, baseX: 92, baseY: 75, size: 18, rot: 0 },
    { kind: "dot" as const, depth: 0.55, baseX: 60, baseY: 28, size: 10, rot: 0 },
    { kind: "graduation" as const, depth: 0.5, baseX: 82, baseY: 38, size: 70, rot: -15 },
    { kind: "graduation" as const, depth: 0.7, baseX: 20, baseY: 55, size: 96, rot: 8 },
  ];
  return (
    <>
      {specs.map((spec, i) => (
        <FloatingItem key={i} spec={spec} progress={progress} reduced={reduced} />
      ))}
    </>
  );
}

type Spec = {
  kind: "paper" | "pencil" | "dot" | "graduation";
  depth: number;
  baseX: number;
  baseY: number;
  size: number;
  rot: number;
};

function FloatingItem({
  spec,
  progress,
  reduced,
}: {
  spec: Spec;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const dx = (spec.depth - 0.5) * 30;
  const dy = spec.depth * 200;
  const x = useTransform(progress, [0, 1], [`${spec.baseX}%`, `${spec.baseX + dx}%`]);
  const y = useTransform(progress, [0, 1], [`${spec.baseY}vh`, `${spec.baseY - dy / 5}vh`]);
  const rotate = useTransform(progress, [0, 1], [spec.rot, spec.rot + 30 * (spec.depth > 0.5 ? 1 : -1)]);

  return (
    <motion.div
      style={
        reduced
          ? { left: `${spec.baseX}%`, top: `${spec.baseY}vh`, rotate: spec.rot }
          : { left: x, top: y, rotate }
      }
      className="absolute"
    >
      {spec.kind === "paper" && <PaperSvg size={spec.size} opacity={0.18 + spec.depth * 0.18} />}
      {spec.kind === "pencil" && <PencilSvg size={spec.size} opacity={0.2 + spec.depth * 0.2} />}
      {spec.kind === "dot" && (
        <span
          style={{
            width: spec.size,
            height: spec.size,
            background: "rgba(244,164,66,0.4)",
            boxShadow: `0 0 ${spec.size * 4}px ${spec.size}px rgba(244,164,66,0.25)`,
          }}
          className="inline-block rounded-full"
        />
      )}
      {spec.kind === "graduation" && <GraduationSvg size={spec.size} opacity={0.16 + spec.depth * 0.16} />}
    </motion.div>
  );
}

function BookSvg({
  size,
  opacity,
  closed = false,
}: {
  size: number;
  opacity: number;
  closed?: boolean;
}) {
  if (closed) {
    return (
      <svg
        viewBox="0 0 240 280"
        width={size}
        height={(size * 280) / 240}
        style={{ opacity }}
        fill="none"
      >
        <defs>
          <linearGradient id="bookcover" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e78617" />
            <stop offset="100%" stopColor="#a85d0a" />
          </linearGradient>
        </defs>
        <rect x="40" y="20" width="160" height="240" rx="6" fill="url(#bookcover)" />
        <rect x="50" y="32" width="140" height="216" rx="3" fill="none" stroke="rgba(255,224,170,0.4)" strokeWidth="1.5" />
        <text
          x="120"
          y="135"
          textAnchor="middle"
          fill="rgba(255,234,200,0.7)"
          fontSize="20"
          fontFamily="serif"
          fontWeight="bold"
        >
          NotaMaestro
        </text>
        <line x1="60" y1="160" x2="180" y2="160" stroke="rgba(255,234,200,0.3)" strokeWidth="1" />
        <line x1="80" y1="180" x2="160" y2="180" stroke="rgba(255,234,200,0.25)" strokeWidth="1" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 320 240"
      width={size}
      height={(size * 240) / 320}
      style={{ opacity }}
      fill="none"
    >
      <defs>
        <linearGradient id="leftpage" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3d2410" />
          <stop offset="100%" stopColor="#e78617" />
        </linearGradient>
        <linearGradient id="rightpage" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#3d2410" />
          <stop offset="100%" stopColor="#e78617" />
        </linearGradient>
      </defs>
      {/* spine */}
      <rect x="155" y="20" width="10" height="200" rx="2" fill="#2a1808" />
      {/* left page */}
      <path
        d="M160,30 C140,28 60,38 30,46 L30,200 C60,194 140,196 160,210 Z"
        fill="url(#leftpage)"
        opacity="0.55"
      />
      {/* right page */}
      <path
        d="M160,30 C180,28 260,38 290,46 L290,200 C260,194 180,196 160,210 Z"
        fill="url(#rightpage)"
        opacity="0.55"
      />
      {/* text lines left */}
      {[60, 80, 100, 120, 140, 160].map((y) => (
        <line
          key={`l-${y}`}
          x1="42"
          y1={y}
          x2={132 - (y - 60) * 0.2}
          y2={y + 1}
          stroke="rgba(255,234,200,0.45)"
          strokeWidth="2"
        />
      ))}
      {/* text lines right */}
      {[60, 80, 100, 120, 140, 160].map((y) => (
        <line
          key={`r-${y}`}
          x1="188"
          y1={y + 1}
          x2={278 - (y - 60) * 0.2}
          y2={y}
          stroke="rgba(255,234,200,0.45)"
          strokeWidth="2"
        />
      ))}
      {/* page edge highlights */}
      <path
        d="M160,30 L160,210"
        stroke="rgba(255,234,200,0.4)"
        strokeWidth="1"
      />
    </svg>
  );
}

function PaperSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg viewBox="0 0 80 100" width={size} height={(size * 100) / 80} style={{ opacity }} fill="none">
      <rect x="6" y="4" width="68" height="92" rx="4" fill="rgba(255,234,200,0.5)" />
      <rect x="6" y="4" width="68" height="92" rx="4" stroke="rgba(231,134,23,0.4)" strokeWidth="1" />
      <line x1="14" y1="24" x2="66" y2="24" stroke="rgba(231,134,23,0.45)" strokeWidth="1.5" />
      <line x1="14" y1="38" x2="60" y2="38" stroke="rgba(231,134,23,0.35)" strokeWidth="1.2" />
      <line x1="14" y1="50" x2="64" y2="50" stroke="rgba(231,134,23,0.35)" strokeWidth="1.2" />
      <line x1="14" y1="62" x2="56" y2="62" stroke="rgba(231,134,23,0.3)" strokeWidth="1.2" />
      <line x1="14" y1="74" x2="62" y2="74" stroke="rgba(231,134,23,0.3)" strokeWidth="1.2" />
    </svg>
  );
}

function PencilSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      viewBox="0 0 120 28"
      width={size}
      height={(size * 28) / 120}
      style={{ opacity }}
      fill="none"
    >
      <polygon points="0,14 14,4 14,24" fill="#3d2410" />
      <polygon points="14,4 14,24 22,18 22,10" fill="#f4a442" />
      <rect x="22" y="6" width="78" height="16" fill="#e78617" />
      <rect x="22" y="6" width="78" height="16" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
      <rect x="100" y="6" width="10" height="16" fill="#c97a14" />
      <rect x="110" y="6" width="10" height="16" rx="2" fill="#ffd28a" />
    </svg>
  );
}

function GraduationSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg viewBox="0 0 100 80" width={size} height={(size * 80) / 100} style={{ opacity }} fill="none">
      <polygon points="50,8 90,28 50,48 10,28" fill="#e78617" stroke="rgba(255,234,200,0.3)" strokeWidth="1" />
      <path
        d="M22,38 L22,58 C22,62 50,72 50,72 C50,72 78,62 78,58 L78,38"
        fill="none"
        stroke="#e78617"
        strokeWidth="3"
      />
      <line x1="88" y1="28" x2="88" y2="56" stroke="#e78617" strokeWidth="2" />
      <circle cx="88" cy="58" r="3" fill="#ffd28a" />
    </svg>
  );
}
