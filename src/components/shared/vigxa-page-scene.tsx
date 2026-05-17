"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Persistent background scene for Vigxa: a 3D blueprint tower of stacked
 * translucent cubes that rotates around its Y axis at a constant slow speed
 * (independent of scroll). Horizontal position is driven by the scroll
 * progress of the `#modulos` section (not the whole page) so the tower
 * alignment never drifts as other sections (features, compliance, pricing)
 * change height. Inside the modulos section it alternates left/right with
 * each of the 6 steps (text-right ↔ tower-left, text-left ↔ tower-right).
 */
export function VigxaPageScene() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress: globalProgress } = useScroll();

  // Local progress: 0 before #modulos, 1 after it. Goes 0→1 during the
  // section's sticky-pin range. We compute it manually because we need to
  // attach to an element discovered at runtime (the modulos section).
  const modulosProgress = useMotionValue(0);

  // 0–6 — number of "floors" of the tower currently constructed. The Cube
  // and RoofMast components read this to fade/scaleY their geometry in.
  //   level 0 = foundation cube (always on)
  //   level 1..4 = upper cubes
  //   level 5 = roof antenna mast
  // Outside the modulos section the tower is fully built (=6). On approach
  // to modulos it "deconstructs" down to 1 floor, then rebuilds floor-by-
  // floor across the 6 scrollytelling steps (one floor per step, antenna
  // appearing during the final Boardroom step).
  const buildLevel = useMotionValue(6);

  useEffect(() => {
    let frame = 0;
    const tick = () => {
      // Target the inner pin-track div (id="modulos-track"), NOT the outer
      // #modulos section. The pin track is what `ScrollyStep` uses for its
      // own progress, so by attaching here we get the SAME 0–1 range — step
      // centers land exactly at (i + 0.5) / 6, no matter the viewport.
      const el = document.getElementById("modulos-track");
      if (!el) {
        modulosProgress.set(0);
        buildLevel.set(6);
        return;
      }
      const rect = el.getBoundingClientRect();
      const top = rect.top + window.scrollY;
      const height = rect.height;
      const vh = window.innerHeight;
      const start = top;
      const end = top + height - vh;
      if (end <= start) {
        modulosProgress.set(0);
        buildLevel.set(6);
        return;
      }
      const y = window.scrollY;
      const p = (y - start) / (end - start);
      modulosProgress.set(Math.max(0, Math.min(1, p)));

      // Build progression — see comment on `buildLevel` above.
      //
      // Step centers inside modulos sit at (i+0.5)/6 → 0.083, 0.250, 0.417,
      // 0.583, 0.750, 0.917. We want:
      //   step 1 (Planeación)        → buildLevel = 1
      //   step 2 (Ejecución)         → buildLevel = 2
      //   step 3 (Finanzas y DIAN)   → buildLevel = 3
      //   step 4 (Nómina y SG-SST)   → buildLevel = 4
      //   step 5 (Portal externo)    → buildLevel = 5
      //   step 6 (Boardroom)         → buildLevel = 6 (antenna in)
      const STEP_FIRST = 0.5 / 6; // 0.0833…
      const STEP_LAST = 5.5 / 6; // 0.9166…
      const DECONSTRUCT_VH = 0.9; // last ~0.9 vh of hero used to morph 6→1
      const deconstructStart = start - vh * DECONSTRUCT_VH;
      if (y < deconstructStart) {
        buildLevel.set(6);
      } else if (y < start) {
        // Hero → modulos entry: smoothly tear down 6 → 1
        const t = (y - deconstructStart) / (start - deconstructStart);
        buildLevel.set(6 - 5 * t);
      } else if (y <= end) {
        // Inside modulos: linearly map step centers 0.0833 → 0.9166 to
        // buildLevel 1 → 6. Outside that inner band, clamp to the edges so
        // the section's beginning sits firmly at 1 and the tail at 6.
        const t = Math.max(0, Math.min(1, (p - STEP_FIRST) / (STEP_LAST - STEP_FIRST)));
        buildLevel.set(1 + 5 * t);
      } else {
        buildLevel.set(6);
      }
    };
    const schedule = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [modulosProgress, buildLevel]);

  // Horizontal position — anchored to modulos progress so it's stable across
  // viewport heights. Step centers at (i+0.5)/6 = 0.083, 0.250, 0.417,
  // 0.583, 0.750, 0.917. Aligns alternate L/R, opposite the step text.
  //
  // align array in content.ts: [right, left, right, left, right, left]
  // tower goes opposite:        [LEFT, RIGHT, LEFT, RIGHT, LEFT, RIGHT]
  const towerX = useTransform(
    modulosProgress,
    [0, 0.001, 0.083, 0.250, 0.417, 0.583, 0.750, 0.917, 0.999, 1],
    [
      "65vw", // before modulos (hero): tower right of hero copy
      "62vw",
      "15vw", // step 1 — LEFT (text-right)
      "72vw", // step 2 — RIGHT (text-left)
      "13vw", // step 3 — LEFT
      "74vw", // step 4 — RIGHT
      "13vw", // step 5 — LEFT
      "70vw", // step 6 — RIGHT
      "50vw", // end of modulos
      "50vw", // after modulos: centered behind features/compliance/pricing
    ]
  );

  // Vertical drift — gentle bob, viewport-relative.
  const towerY = useTransform(
    globalProgress,
    [0, 0.25, 0.5, 0.75, 1],
    ["48vh", "50vh", "50vh", "52vh", "50vh"]
  );

  // Scale — shrink the tower once we're past the modulos section so it
  // doesn't fight the features/pricing copy. Uses global progress because
  // the breakpoints don't need to be precise.
  const towerScale = useTransform(
    globalProgress,
    [0, 0.16, 0.62, 0.72, 1],
    [0.9, 0.95, 0.95, 0.7, 0.6]
  );

  // Opacity — gently fade in the dense post-scrolly sections.
  const towerOpacity = useTransform(
    globalProgress,
    [0, 0.62, 0.72, 0.95, 1],
    [1, 1, 0.5, 0.35, 0.3]
  );

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <BackdropWashes progress={globalProgress} />

      {/* Blueprint grid backdrop — very faint */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,158,11,0.55) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.55) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 50%, black 40%, transparent 90%)",
        }}
      />

      {/* The 3D tower — fixed perspective container, position scroll-driven */}
      <motion.div
        style={
          reduced
            ? { left: "50vw", top: "50vh", x: "-50%", y: "-50%" }
            : {
                left: towerX,
                top: towerY,
                x: "-50%",
                y: "-50%",
                scale: towerScale,
                opacity: towerOpacity,
              }
        }
        className="absolute"
      >
        {/* Perspective wrapper */}
        <div
          style={{
            perspective: "2200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* X-axis tilt wrapper (static) so the rotation reads as 3D */}
          <div
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateX(-14deg)",
            }}
          >
            {/* Floating wrapper — small Y bobble */}
            <div className="vigxa-tower-float" style={{ transformStyle: "preserve-3d" }}>
              {/* Y-axis continuous spin */}
              <div
                className="vigxa-tower-spin"
                style={{
                  transformStyle: "preserve-3d",
                  transformOrigin: "50% 50%",
                }}
              >
                <VigxaTower buildLevel={reduced ? undefined : buildLevel} />
              </div>
            </div>
          </div>
        </div>

        {/* Soft ground glow under the tower — does not rotate */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full -translate-x-1/2 -translate-y-1/2"
          style={{
            width: 420,
            height: 80,
            background:
              "radial-gradient(ellipse 50% 50% at 50% 50%, rgba(245,158,11,0.45), rgba(245,158,11,0) 70%)",
            filter: "blur(18px)",
          }}
        />
      </motion.div>

      {/* Floating blueprint bits */}
      <FloatingBlueprints progress={globalProgress} reduced={reduced} />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 35%, rgba(8,6,18,0.7) 100%)",
        }}
      />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* The tower itself — five stacked translucent cubes (largest = base) */
/* ----------------------------------------------------------------- */

type CubeSpec = {
  w: number;
  d: number; // depth
  h: number;
  y: number; // vertical offset of cube center (0 = base level center)
  tint: string;
  windows: { rows: number; cols: number };
};

function VigxaTower({ buildLevel }: { buildLevel?: MotionValue<number> }) {
  // Stacked from base (large, positive y = down on screen) to roof (small,
  // negative y = up). All cubes use SQUARE plan (D = W) so the building's
  // silhouette stays consistent at any rotation angle — with W ≠ D the
  // corners of adjacent levels didn't line up and the building visually
  // split into "two towers" at ~45° rotation.
  const cubes: CubeSpec[] = [
    { w: 190, d: 190, h: 84, y: 60, tint: "rgba(245,158,11,0.28)", windows: { rows: 2, cols: 5 } },
    { w: 168, d: 168, h: 92, y: -28, tint: "rgba(251,191,36,0.30)", windows: { rows: 3, cols: 4 } },
    { w: 145, d: 145, h: 100, y: -120, tint: "rgba(252,211,77,0.32)", windows: { rows: 3, cols: 3 } },
    { w: 118, d: 118, h: 92, y: -212, tint: "rgba(245,158,11,0.34)", windows: { rows: 3, cols: 3 } },
    { w: 92, d: 92, h: 75, y: -296, tint: "rgba(251,191,36,0.38)", windows: { rows: 2, cols: 2 } },
  ];

  // Geometric center of the stack = mean of (top of highest cube + antenna)
  // and (bottom of lowest cube + slab). Then shift the whole stack so the
  // center sits at y=0 (= the parent motion.div's anchor).
  const topY = Math.min(...cubes.map((c) => c.y - c.h / 2)) - 60;
  const botY = Math.max(...cubes.map((c) => c.y + c.h / 2)) + 10;
  const shift = -(topY + botY) / 2;
  const specs = cubes.map((c) => ({ ...c, y: c.y + shift }));
  const antennaY = -296 + shift - 50;
  const slabY = 60 + shift + 50;

  return (
    <div style={{ transformStyle: "preserve-3d", position: "relative" }}>
      {specs.map((s, i) => (
        <Cube key={i} spec={s} level={i} buildLevel={buildLevel} />
      ))}
      <RoofMast y={antennaY} buildLevel={buildLevel} />
      <Slab y={slabY} width={228} depth={228} />
    </div>
  );
}

function Cube({
  spec,
  level,
  buildLevel,
}: {
  spec: CubeSpec;
  level: number;
  buildLevel?: MotionValue<number>;
}) {
  const { w, d, h, y, tint, windows } = spec;
  const halfW = w / 2;
  const halfD = d / 2;
  const halfH = h / 2;

  const edgeColor = `rgba(245,158,11,${0.7 + level * 0.04})`;
  const innerGrid =
    `linear-gradient(rgba(245,158,11,0.22) 1px, transparent 1px), ` +
    `linear-gradient(90deg, rgba(245,158,11,0.22) 1px, transparent 1px)`;
  // Solid-ish background + subtle gradient overlay + grid so adjacent
  // visible faces blend into a single building silhouette instead of
  // splitting into two ghostly columns at ~45° rotation.
  const baseFace = `
    linear-gradient(135deg, ${tint}, rgba(120,60,8,0.45) 100%),
    ${innerGrid}
  `;

  // Per-floor build progress: 0 = not yet erected, 1 = fully built.
  // `buildLevel - level` gives the smooth ramp for this specific floor.
  // The foundation (level 0) is effectively always at 1 since the scene
  // never lets buildLevel drop below 1.
  const fallback = useMotionValue(1);
  const source = buildLevel ?? fallback;
  const appear = useTransform(source, (b) => {
    const v = b - level;
    return Math.max(0, Math.min(1, v));
  });
  // Keep a tiny floor so scaleY=0 doesn't collapse the 3D faces to a degenerate
  // matrix (which Safari/Chromium occasionally render with z-fighting flicker).
  const scaleY = useTransform(appear, (a) => Math.max(0.0001, a));

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width: w,
        height: h,
        marginLeft: -halfW,
        marginTop: -halfH,
        transform: `translate3d(0, ${y}px, 0)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          transformStyle: "preserve-3d",
          transformOrigin: "50% 100% 0",
          scaleY,
          opacity: appear,
        }}
      >
        {/* Front */}
        <CubeFace
          w={w}
          h={h}
          edgeColor={edgeColor}
          bg={baseFace}
          windows={windows}
          transform={`translateZ(${halfD}px)`}
        />
        {/* Back */}
        <CubeFace
          w={w}
          h={h}
          edgeColor={edgeColor}
          bg={baseFace}
          windows={windows}
          transform={`rotateY(180deg) translateZ(${halfD}px)`}
        />
        {/* Right */}
        <CubeFace
          w={d}
          h={h}
          edgeColor={edgeColor}
          bg={baseFace}
          windows={{ rows: windows.rows, cols: Math.max(2, Math.round((windows.cols * d) / w)) }}
          transform={`translateX(${halfW - d / 2}px) rotateY(90deg) translateZ(${halfW - d / 2 + d / 2}px)`}
        />
        {/* Left */}
        <CubeFace
          w={d}
          h={h}
          edgeColor={edgeColor}
          bg={baseFace}
          windows={{ rows: windows.rows, cols: Math.max(2, Math.round((windows.cols * d) / w)) }}
          transform={`translateX(${-halfW + d / 2}px) rotateY(-90deg) translateZ(${halfW - d / 2 + d / 2}px)`}
        />
        {/* Top */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: w,
            height: d,
            marginTop: -(d - h) / 2,
            background: `linear-gradient(135deg, rgba(245,158,11,0.18), rgba(245,158,11,0.04))`,
            border: `1px solid ${edgeColor}`,
            boxShadow: `inset 0 0 30px rgba(245,158,11,0.18)`,
            transform: `rotateX(90deg) translateZ(${halfH}px)`,
            backfaceVisibility: "hidden",
          }}
        />
        {/* Bottom */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: w,
            height: d,
            marginTop: -(d - h) / 2,
            background: `linear-gradient(135deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15))`,
            border: `1px solid ${edgeColor}`,
            transform: `rotateX(-90deg) translateZ(${halfH}px)`,
            backfaceVisibility: "hidden",
          }}
        />
      </motion.div>
    </div>
  );
}

function CubeFace({
  w,
  h,
  edgeColor,
  bg,
  windows,
  transform,
}: {
  w: number;
  h: number;
  edgeColor: string;
  bg: string;
  windows: { rows: number; cols: number };
  transform: string;
}) {
  // Windows are a grid of small luminous rectangles
  const winRows = Math.max(1, windows.rows);
  const winCols = Math.max(1, windows.cols);
  const winW = w * 0.6;
  const winH = h * 0.65;
  const cellW = winW / winCols;
  const cellH = winH / winRows;

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: w,
        height: h,
        background: bg,
        backgroundSize: `${Math.max(12, w / 10)}px ${Math.max(12, h / 8)}px, ${Math.max(12, w / 10)}px ${Math.max(12, h / 8)}px, 100% 100%`,
        border: `1px solid ${edgeColor}`,
        boxShadow: `inset 0 0 40px rgba(245,158,11,0.14), 0 0 30px rgba(245,158,11,0.05)`,
        transform,
        backfaceVisibility: "hidden",
        backdropFilter: "blur(2px)",
      }}
    >
      {/* Windows */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: winW,
          height: winH,
          transform: "translate(-50%, -50%)",
        }}
      >
        {Array.from({ length: winRows }).map((_, r) =>
          Array.from({ length: winCols }).map((_, c) => {
            // pseudo-random lit state based on indices so it's stable across re-renders
            const lit = ((r * 13 + c * 7) % 5) < 2;
            return (
              <div
                key={`${r}-${c}`}
                style={{
                  position: "absolute",
                  left: c * cellW + cellW * 0.18,
                  top: r * cellH + cellH * 0.18,
                  width: cellW * 0.64,
                  height: cellH * 0.64,
                  background: lit
                    ? "linear-gradient(180deg, rgba(255,221,128,0.85), rgba(245,158,11,0.55))"
                    : "rgba(20,18,12,0.4)",
                  boxShadow: lit ? "0 0 8px rgba(255,200,80,0.65)" : "none",
                  borderRadius: 1.5,
                }}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function RoofMast({
  y,
  buildLevel,
}: {
  y: number;
  buildLevel?: MotionValue<number>;
}) {
  // The antenna is the final piece — appears as buildLevel crosses 5 → 6
  // (i.e. during the Boardroom step).
  const fallback = useMotionValue(1);
  const source = buildLevel ?? fallback;
  const appear = useTransform(source, (b) => Math.max(0, Math.min(1, b - 5)));
  const scaleY = useTransform(appear, (a) => Math.max(0.0001, a));

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: `translate(-50%, -50%) translate3d(0, ${y}px, 0)`,
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          transformOrigin: "50% 100%",
          scaleY,
          opacity: appear,
        }}
      >
        {/* Mast */}
        <div
          style={{
            width: 4,
            height: 70,
            margin: "0 auto",
            background:
              "linear-gradient(180deg, rgba(255,200,80,0.95), rgba(245,158,11,0.35))",
            boxShadow: "0 0 12px rgba(255,200,80,0.6)",
          }}
        />
        {/* Beacon */}
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: -6,
            width: 14,
            height: 14,
            marginLeft: -7,
            borderRadius: "50%",
            background: "radial-gradient(circle, #ffd97a 0%, #f59e0b 60%, transparent 100%)",
            boxShadow: "0 0 24px rgba(255,217,122,0.9)",
            animation: "pulse-glow 1.6s ease-in-out infinite",
          }}
        />
      </motion.div>
    </div>
  );
}

function Slab({ y, width, depth }: { y: number; width: number; depth: number }) {
  // A thin foundation slab at the base
  const h = 10;
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        width,
        height: h,
        marginLeft: -width / 2,
        marginTop: -h / 2,
        transform: `translate3d(0, ${y}px, 0)`,
        transformStyle: "preserve-3d",
        background:
          "linear-gradient(180deg, rgba(245,158,11,0.35), rgba(120,60,8,0.45))",
        border: "1px solid rgba(245,158,11,0.65)",
        boxShadow:
          "0 0 30px rgba(245,158,11,0.3), inset 0 0 20px rgba(0,0,0,0.4)",
      }}
    >
      {/* slab depth illusion (a darker plane behind) */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width,
          height: depth,
          transform: "rotateX(90deg) translateZ(0)",
          transformOrigin: "top",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.7))",
          borderTop: "1px solid rgba(245,158,11,0.4)",
        }}
      />
    </div>
  );
}

/* ----------------------------------------------------------------- */
/* Backdrop washes and floating blueprint accents                    */
/* ----------------------------------------------------------------- */

function BackdropWashes({ progress }: { progress: MotionValue<number> }) {
  const x1 = useTransform(progress, [0, 1], ["10%", "75%"]);
  const x2 = useTransform(progress, [0, 1], ["80%", "15%"]);
  return (
    <>
      <motion.div
        style={{ left: x1, top: "8%" }}
        className="absolute h-[40rem] w-[40rem] rounded-full bg-vigxa/15 blur-[140px]"
      />
      <motion.div
        style={{ left: x2, top: "60%" }}
        className="absolute h-[44rem] w-[44rem] rounded-full bg-vigxa-light/10 blur-[160px]"
      />
      <motion.div
        style={{
          left: useTransform(progress, [0, 1], ["45%", "55%"]),
          top: "85%",
        }}
        className="absolute h-[30rem] w-[30rem] rounded-full bg-vigxa-dark/20 blur-[120px]"
      />
    </>
  );
}

type AccentSpec = {
  kind: "ruler" | "wrench" | "blueprint" | "dot";
  baseX: number;
  baseY: number;
  driftX: [number, number, number, number];
  driftY: [number, number, number, number];
  rot: [number, number, number, number];
  size: number;
  opacity: number;
};

function FloatingBlueprints({
  progress,
  reduced,
}: {
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const specs: AccentSpec[] = [
    {
      kind: "blueprint",
      baseX: 12,
      baseY: 25,
      driftX: [12, 70, 14, 65],
      driftY: [25, 20, 30, 22],
      rot: [-8, 12, -15, 10],
      size: 130,
      opacity: 0.16,
    },
    {
      kind: "ruler",
      baseX: 85,
      baseY: 22,
      driftX: [85, 18, 80, 22],
      driftY: [22, 28, 25, 32],
      rot: [12, -20, 18, -10],
      size: 180,
      opacity: 0.2,
    },
    {
      kind: "wrench",
      baseX: 78,
      baseY: 70,
      driftX: [78, 12, 72, 18],
      driftY: [70, 75, 78, 72],
      rot: [-15, 25, -8, 30],
      size: 110,
      opacity: 0.18,
    },
    {
      kind: "blueprint",
      baseX: 8,
      baseY: 78,
      driftX: [8, 65, 12, 70],
      driftY: [78, 72, 75, 80],
      rot: [10, -18, 22, -12],
      size: 100,
      opacity: 0.14,
    },
    { kind: "dot", baseX: 25, baseY: 12, driftX: [25, 70, 30, 75], driftY: [12, 18, 15, 20], rot: [0, 0, 0, 0], size: 8, opacity: 0.5 },
    { kind: "dot", baseX: 90, baseY: 45, driftX: [90, 30, 85, 35], driftY: [45, 50, 48, 52], rot: [0, 0, 0, 0], size: 12, opacity: 0.45 },
    { kind: "dot", baseX: 50, baseY: 92, driftX: [50, 30, 60, 35], driftY: [92, 88, 90, 86], rot: [0, 0, 0, 0], size: 10, opacity: 0.4 },
  ];
  return (
    <>
      {specs.map((spec, i) => (
        <FloatingAccent key={i} spec={spec} progress={progress} reduced={reduced} />
      ))}
    </>
  );
}

function FloatingAccent({
  spec,
  progress,
  reduced,
}: {
  spec: AccentSpec;
  progress: MotionValue<number>;
  reduced: boolean;
}) {
  const x = useTransform(progress, [0, 0.33, 0.66, 1], spec.driftX.map((v) => `${v}%`));
  const y = useTransform(progress, [0, 0.33, 0.66, 1], spec.driftY.map((v) => `${v}vh`));
  const rotate = useTransform(progress, [0, 0.33, 0.66, 1], spec.rot);

  return (
    <motion.div
      style={
        reduced
          ? { left: `${spec.baseX}%`, top: `${spec.baseY}vh`, rotate: spec.rot[0] }
          : { left: x, top: y, rotate }
      }
      className="absolute"
    >
      {spec.kind === "blueprint" && <BlueprintSvg size={spec.size} opacity={spec.opacity} />}
      {spec.kind === "ruler" && <RulerSvg size={spec.size} opacity={spec.opacity} />}
      {spec.kind === "wrench" && <WrenchSvg size={spec.size} opacity={spec.opacity} />}
      {spec.kind === "dot" && (
        <span
          style={{
            width: spec.size,
            height: spec.size,
            background: "rgba(245,158,11,0.55)",
            boxShadow: `0 0 ${spec.size * 4}px ${spec.size}px rgba(245,158,11,0.35)`,
          }}
          className="inline-block rounded-full"
        />
      )}
    </motion.div>
  );
}

function BlueprintSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg
      viewBox="0 0 160 200"
      width={(size * 160) / 200}
      height={size}
      style={{ opacity }}
      fill="none"
    >
      <rect x="4" y="4" width="152" height="192" rx="3" fill="rgba(30,18,4,0.55)" stroke="rgba(245,158,11,0.65)" />
      {/* Title bar */}
      <rect x="4" y="4" width="152" height="22" fill="rgba(245,158,11,0.18)" stroke="rgba(245,158,11,0.4)" />
      <text x="12" y="20" fill="rgba(255,221,150,0.85)" fontSize="11" fontFamily="monospace" fontWeight="bold">
        VGX-01 Plano
      </text>
      {/* Floor plan: outer rectangle with rooms */}
      <rect x="20" y="40" width="120" height="140" stroke="rgba(245,158,11,0.85)" strokeWidth="2" />
      <line x1="20" y1="110" x2="140" y2="110" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" />
      <line x1="80" y1="40" x2="80" y2="110" stroke="rgba(245,158,11,0.7)" strokeWidth="1.5" />
      <line x1="55" y1="110" x2="55" y2="180" stroke="rgba(245,158,11,0.55)" strokeWidth="1" />
      {/* Door arc */}
      <path d="M 100 110 A 14 14 0 0 1 100 124" stroke="rgba(245,158,11,0.65)" strokeWidth="1" fill="none" />
      {/* Stairs */}
      <g stroke="rgba(245,158,11,0.55)" strokeWidth="1">
        <line x1="22" y1="120" x2="52" y2="120" />
        <line x1="22" y1="128" x2="52" y2="128" />
        <line x1="22" y1="136" x2="52" y2="136" />
        <line x1="22" y1="144" x2="52" y2="144" />
        <line x1="22" y1="152" x2="52" y2="152" />
        <line x1="22" y1="160" x2="52" y2="160" />
        <line x1="22" y1="168" x2="52" y2="168" />
      </g>
      {/* Dimension marks */}
      <line x1="20" y1="190" x2="80" y2="190" stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" />
      <line x1="80" y1="186" x2="80" y2="194" stroke="rgba(245,158,11,0.6)" strokeWidth="0.8" />
      <text x="42" y="200" fill="rgba(255,221,150,0.7)" fontSize="8" fontFamily="monospace">5.40m</text>
    </svg>
  );
}

function RulerSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg viewBox="0 0 280 30" width={size} height={(size * 30) / 280} style={{ opacity }} fill="none">
      <rect x="0" y="6" width="280" height="18" fill="rgba(245,158,11,0.25)" stroke="rgba(245,158,11,0.7)" />
      {Array.from({ length: 28 }).map((_, i) => (
        <line
          key={i}
          x1={i * 10}
          y1={6}
          x2={i * 10}
          y2={i % 5 === 0 ? 22 : 14}
          stroke="rgba(255,221,150,0.85)"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

function WrenchSvg({ size, opacity }: { size: number; opacity: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} style={{ opacity }} fill="none">
      <defs>
        <linearGradient id="wrenchGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fcd34d" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>
      </defs>
      <path
        d="M22 22 L48 48 Q56 56 64 48 L96 80 Q104 88 96 96 L88 104 Q80 112 72 104 L40 72 Q32 64 24 72 L18 78 Q10 70 18 62 L42 38 Q34 30 22 22 Z"
        fill="url(#wrenchGrad)"
        stroke="rgba(245,158,11,0.85)"
        strokeWidth="1.2"
      />
    </svg>
  );
}
