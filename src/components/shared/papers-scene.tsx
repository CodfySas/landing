"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";
import { BookOpen, Check, FileText, GraduationCap } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  progress: MotionValue<number>;
};

type PaperKind = "boletin" | "asistencia" | "planeacion" | "nota";

type PaperSpec = {
  id: string;
  x: string;
  y: string;
  width: number;
  rotate: number;
  /** 0..1 — parallax depth */
  depth: number;
  opacity: number;
  kind: PaperKind;
};

const PAPERS: PaperSpec[] = [
  { id: "p1", x: "4%", y: "12%", width: 200, rotate: -8, depth: 0.7, opacity: 0.55, kind: "boletin" },
  { id: "p2", x: "78%", y: "8%", width: 180, rotate: 6, depth: 0.8, opacity: 0.5, kind: "asistencia" },
  { id: "p3", x: "82%", y: "62%", width: 220, rotate: -4, depth: 1.0, opacity: 0.42, kind: "planeacion" },
  { id: "p4", x: "8%", y: "65%", width: 170, rotate: 10, depth: 0.55, opacity: 0.5, kind: "nota" },
  { id: "p5", x: "60%", y: "80%", width: 150, rotate: -12, depth: 0.45, opacity: 0.45, kind: "boletin" },
  { id: "p6", x: "32%", y: "82%", width: 140, rotate: 4, depth: 0.35, opacity: 0.45, kind: "asistencia" },
  { id: "p7", x: "50%", y: "3%", width: 130, rotate: -2, depth: 0.3, opacity: 0.4, kind: "planeacion" },
];

const MOTES = Array.from({ length: 22 }, (_, i) => ({
  id: `m${i}`,
  x: `${(i * 41) % 100}%`,
  y: `${(i * 67 + 11) % 100}%`,
  size: 2 + ((i * 5) % 3),
  delay: (i * 0.3) % 2.5,
  duration: 3 + ((i * 0.4) % 2),
}));

export function PapersScene({ progress }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#160c02]">
      {/* Warm radial glow */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(231,134,23,0.20), transparent 60%), radial-gradient(ellipse 60% 50% at 15% 80%, rgba(244,164,66,0.10), transparent 60%)",
        }}
      />
      {/* Warm grid */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,164,66,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(244,164,66,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Papers */}
      {PAPERS.map((p) => (
        <PaperItem key={p.id} spec={p} progress={progress} />
      ))}
      {/* Warm motes (like sun dust) */}
      {MOTES.map((m) => (
        <Mote key={m.id} spec={m} />
      ))}
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(22,12,2,0.65) 100%)",
        }}
      />
    </div>
  );
}

function PaperItem({ spec, progress }: { spec: PaperSpec; progress: MotionValue<number> }) {
  const reduced = usePrefersReducedMotion();
  const drift = useTransform(progress, [0, 1], [0, -200 * spec.depth]);
  const driftX = useTransform(progress, [0, 1], [0, 30 * spec.depth * (spec.rotate > 0 ? 1 : -1)]);
  const rotation = useTransform(progress, [0, 1], [spec.rotate, spec.rotate + 6 * spec.depth]);
  const fade = useTransform(progress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div
      aria-hidden
      className="absolute"
      style={{
        left: spec.x,
        top: spec.y,
        width: spec.width,
        x: reduced ? 0 : driftX,
        y: reduced ? 0 : drift,
        rotate: reduced ? spec.rotate : rotation,
        opacity: reduced ? spec.opacity : fade,
      }}
    >
      <PaperCard kind={spec.kind} opacity={spec.opacity} />
    </motion.div>
  );
}

function PaperCard({ kind, opacity }: { kind: PaperKind; opacity: number }) {
  const base =
    "relative rounded-xl border border-white/15 bg-white/[0.06] p-3 shadow-2xl backdrop-blur-sm";
  const tint = `rgba(255, 234, 200, ${opacity * 0.95})`;
  switch (kind) {
    case "boletin":
      return (
        <div className={base} style={{ color: tint }}>
          <div className="mb-2 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider">
              <FileText className="h-3 w-3" />
              Boletín
            </span>
            <span className="text-[10px]">Bim 2</span>
          </div>
          <div className="space-y-1.5">
            <Row label="Matemáticas" value="9.2" />
            <Row label="Lengua" value="8.7" />
            <Row label="Ciencias" value="9.5" />
          </div>
          <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-1.5">
            <span className="text-[10px]">Promedio</span>
            <span className="font-display text-sm font-bold">9.1</span>
          </div>
        </div>
      );
    case "asistencia":
      return (
        <div className={base} style={{ color: tint }}>
          <div className="mb-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider">
            <Check className="h-3 w-3" />
            Asistencia
          </div>
          <div className="space-y-1.5">
            {[
              { name: "Sofía R.", ok: true },
              { name: "Juan P.", ok: true },
              { name: "Ana M.", ok: false },
              { name: "Luis G.", ok: true },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between text-[10px]">
                <span>{s.name}</span>
                <span
                  className={`inline-flex h-3 w-3 items-center justify-center rounded-full ${
                    s.ok ? "bg-notamaestro-light" : "bg-white/10"
                  }`}
                >
                  {s.ok && <Check className="h-2 w-2 text-[#160c02]" strokeWidth={4} />}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    case "planeacion":
      return (
        <div className={base} style={{ color: tint }}>
          <div className="mb-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider">
            <BookOpen className="h-3 w-3" />
            Planeación · Sem 4
          </div>
          <div className="space-y-1.5 text-[10px]">
            <div className="flex items-start gap-1.5">
              <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-notamaestro-light" />
              Tema: Fracciones
            </div>
            <div className="flex items-start gap-1.5">
              <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-notamaestro-light" />
              Lectura: Cap. 3
            </div>
            <div className="flex items-start gap-1.5">
              <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-notamaestro-light" />
              Taller en clase
            </div>
          </div>
        </div>
      );
    case "nota":
      return (
        <div className={base} style={{ color: tint }}>
          <div className="mb-2 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider">
            <GraduationCap className="h-3 w-3" />
            Calificación
          </div>
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px]">Sofía Ramírez</div>
              <div className="text-[10px] opacity-70">Matemáticas · Examen</div>
            </div>
            <div className="text-right">
              <div className="font-display text-2xl font-bold">9.4</div>
              <div className="text-[9px] opacity-70">/10</div>
            </div>
          </div>
        </div>
      );
  }
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <span>{label}</span>
      <span className="font-mono font-semibold">{value}</span>
    </div>
  );
}

function Mote({
  spec,
}: {
  spec: { x: string; y: string; size: number; delay: number; duration: number };
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    return (
      <span
        aria-hidden
        className="absolute rounded-full bg-notamaestro-light/45"
        style={{
          left: spec.x,
          top: spec.y,
          width: spec.size,
          height: spec.size,
          boxShadow: `0 0 ${spec.size * 4}px ${spec.size}px rgba(244,164,66,0.3)`,
        }}
      />
    );
  }
  return (
    <motion.span
      aria-hidden
      className="absolute rounded-full bg-notamaestro-light"
      style={{
        left: spec.x,
        top: spec.y,
        width: spec.size,
        height: spec.size,
        boxShadow: `0 0 ${spec.size * 4}px ${spec.size}px rgba(244,164,66,0.4)`,
      }}
      animate={{
        opacity: [0.15, 0.9, 0.15],
        y: [0, -12, 0],
        scale: [0.7, 1.2, 0.7],
      }}
      transition={{
        duration: spec.duration,
        delay: spec.delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
