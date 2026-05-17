"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

type Props = {
  /** Scroll progress 0..1 driving the "scrub" of the code reveal. If undefined, plays autonomously. */
  progress?: MotionValue<number> | number;
  /** Hue palette name. */
  palette?: "codfy" | "ampirux" | "notamaestro";
  className?: string;
};

const PALETTES: Record<
  NonNullable<Props["palette"]>,
  {
    bg: string;
    fg: string;
    dim: string;
    keyword: string;
    string: string;
    number: string;
    comment: string;
    accent: string;
    gutter: string;
    glow: string;
  }
> = {
  codfy: {
    bg: "#080716",
    fg: "#e6efff",
    dim: "#5b6479",
    keyword: "#6ab5e3",
    string: "#9d4eda",
    number: "#ffb547",
    comment: "#3e4660",
    accent: "#429cd8",
    gutter: "#11122a",
    glow: "rgba(66,156,216,0.18)",
  },
  ampirux: {
    bg: "#0d0322",
    fg: "#ece4ff",
    dim: "#665b8a",
    keyword: "#c39bff",
    string: "#ffd700",
    number: "#ff9be0",
    comment: "#3c2e57",
    accent: "#9d4eda",
    gutter: "#170a32",
    glow: "rgba(157,78,218,0.20)",
  },
  notamaestro: {
    bg: "#160c02",
    fg: "#fff3e0",
    dim: "#7a5b3d",
    keyword: "#f4a442",
    string: "#ffd28a",
    number: "#ff8a3d",
    comment: "#4a3520",
    accent: "#e78617",
    gutter: "#1f1408",
    glow: "rgba(231,134,23,0.18)",
  },
};

type Token = { text: string; color: keyof (typeof PALETTES)["codfy"] };

const LINES: Token[][] = [
  [{ text: "// CODFY · construyendo software a medida", color: "comment" }],
  [
    { text: "import ", color: "keyword" },
    { text: "{ Innovation, Trust } ", color: "fg" },
    { text: "from ", color: "keyword" },
    { text: "'@codfy/core'", color: "string" },
    { text: ";", color: "fg" },
  ],
  [
    { text: "import ", color: "keyword" },
    { text: "{ NotaMaestro, Ampirux, Toolveris } ", color: "fg" },
    { text: "from ", color: "keyword" },
    { text: "'@codfy/products'", color: "string" },
    { text: ";", color: "fg" },
  ],
  [{ text: "", color: "fg" }],
  [
    { text: "export ", color: "keyword" },
    { text: "function ", color: "keyword" },
    { text: "Codfy", color: "accent" },
    { text: "() {", color: "fg" },
  ],
  [
    { text: "  ", color: "fg" },
    { text: "const ", color: "keyword" },
    { text: "mission ", color: "fg" },
    { text: "= ", color: "keyword" },
    { text: "'Trazabilidad e Innovacion'", color: "string" },
    { text: ";", color: "fg" },
  ],
  [
    { text: "  ", color: "fg" },
    { text: "const ", color: "keyword" },
    { text: "clients ", color: "fg" },
    { text: "= ", color: "keyword" },
    { text: "20", color: "number" },
    { text: ";", color: "fg" },
    { text: "  // empresas confiando en CODFY", color: "comment" },
  ],
  [
    { text: "  ", color: "fg" },
    { text: "const ", color: "keyword" },
    { text: "users ", color: "fg" },
    { text: "= ", color: "keyword" },
    { text: "10_000", color: "number" },
    { text: ";", color: "fg" },
    { text: "       // usuarios activos", color: "comment" },
  ],
  [{ text: "", color: "fg" }],
  [
    { text: "  ", color: "fg" },
    { text: "return ", color: "keyword" },
    { text: "build", color: "accent" },
    { text: "({", color: "fg" },
  ],
  [
    { text: "    products", color: "fg" },
    { text: ": [NotaMaestro, Ampirux, Toolveris],", color: "fg" },
  ],
  [
    { text: "    process", color: "fg" },
    { text: ": [", color: "fg" },
    { text: "'Analisis'", color: "string" },
    { text: ", ", color: "fg" },
    { text: "'Diseno'", color: "string" },
    { text: ", ", color: "fg" },
    { text: "'Desarrollo'", color: "string" },
    { text: ", ", color: "fg" },
    { text: "'Implementacion'", color: "string" },
    { text: "],", color: "fg" },
  ],
  [
    { text: "    values", color: "fg" },
    { text: ": { ", color: "fg" },
    { text: "innovation", color: "keyword" },
    { text: ": ", color: "fg" },
    { text: "true", color: "number" },
    { text: ", ", color: "fg" },
    { text: "trust", color: "keyword" },
    { text: ": ", color: "fg" },
    { text: "true", color: "number" },
    { text: " },", color: "fg" },
  ],
  [
    { text: "    satisfaction", color: "fg" },
    { text: ": ", color: "fg" },
    { text: "4.7", color: "number" },
    { text: ",", color: "fg" },
  ],
  [{ text: "  });", color: "fg" }],
  [{ text: "}", color: "fg" }],
  [{ text: "", color: "fg" }],
  [{ text: "// > deploy --target=transformacion-digital", color: "comment" }],
  [
    { text: "// ", color: "comment" },
    { text: "OK", color: "accent" },
    { text: " build successful in 1.42s", color: "comment" },
  ],
];

function lineLength(line: Token[]): number {
  return line.reduce((acc, t) => acc + t.text.length, 0);
}

const TOTAL_CHARS = LINES.reduce((acc, l) => acc + lineLength(l) + 1, 0);

function isMotionValue<T>(v: unknown): v is MotionValue<T> {
  return typeof v === "object" && v !== null && "get" in v && typeof (v as { get: unknown }).get === "function";
}

export function CodeCanvas({ progress, palette = "codfy", className }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = PALETTES[palette];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let rafId: number | null = null;
    let autoStart: number | null = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const getProgress = (now: number): number => {
      if (progress === undefined) {
        if (autoStart === null) autoStart = now;
        if (reducedMotion) return 1;
        const elapsed = (now - autoStart) / 1000;
        return Math.min(1, (elapsed / 12) % 1.2);
      }
      if (typeof progress === "number") return reducedMotion ? 1 : progress;
      return reducedMotion ? 1 : progress.get();
    };

    const draw = (now: number) => {
      const p = getProgress(now);
      const fontSize = Math.max(11, Math.min(16, Math.floor(width / 70)));
      const lineHeight = Math.floor(fontSize * 1.55);
      const padY = Math.max(18, Math.floor(height * 0.06));
      const gutterW = Math.max(34, fontSize * 2.6);

      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(
        width * 0.78,
        height * 0.22,
        20,
        width * 0.78,
        height * 0.22,
        Math.max(width, height) * 0.7
      );
      glow.addColorStop(0, colors.glow);
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px ui-monospace, "JetBrains Mono", "Fira Code", Menlo, monospace`;
      ctx.textBaseline = "top";

      const revealed = p * TOTAL_CHARS;
      let charBudget = revealed;

      const visibleLineCount = Math.floor((height - padY * 2) / lineHeight);
      const offsetLines = Math.max(0, LINES.length - visibleLineCount);
      const scrollLines = offsetLines * Math.min(1, Math.max(0, p));
      const startY = padY - scrollLines * lineHeight;

      ctx.fillStyle = colors.gutter;
      ctx.fillRect(0, 0, gutterW - 8, height);

      let cursorDrawn = false;

      for (let i = 0; i < LINES.length; i++) {
        const line = LINES[i];
        const y = startY + i * lineHeight;
        if (y < -lineHeight || y > height) {
          charBudget -= lineLength(line) + 1;
          continue;
        }

        ctx.fillStyle = colors.dim;
        ctx.font = `${fontSize - 1}px ui-monospace, "JetBrains Mono", "Fira Code", monospace`;
        const lineNum = String(i + 1).padStart(2, " ");
        ctx.fillText(lineNum, 10, y + 1);

        let x = gutterW;
        ctx.font = `${fontSize}px ui-monospace, "JetBrains Mono", "Fira Code", monospace`;

        for (const token of line) {
          if (charBudget <= 0) break;
          const visibleChars = Math.min(token.text.length, Math.max(0, Math.floor(charBudget)));
          if (visibleChars === 0) break;
          const text = token.text.slice(0, visibleChars);
          ctx.fillStyle = colors[token.color];
          ctx.fillText(text, x, y);
          x += ctx.measureText(text).width;
          charBudget -= visibleChars;
          if (visibleChars < token.text.length) {
            const blink = Math.floor(now / 480) % 2 === 0;
            if (blink) {
              ctx.fillStyle = colors.accent;
              ctx.fillRect(x + 1, y + 2, 2, fontSize);
            }
            cursorDrawn = true;
            break;
          }
        }

        charBudget -= 1;
        if (charBudget < 0) break;
      }

      const fade = ctx.createLinearGradient(0, height - 60, 0, height);
      fade.addColorStop(0, "rgba(0,0,0,0)");
      fade.addColorStop(1, colors.bg);
      ctx.fillStyle = fade;
      ctx.fillRect(0, height - 60, width, 60);

      const topFade = ctx.createLinearGradient(0, 0, 0, 60);
      topFade.addColorStop(0, colors.bg);
      topFade.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = topFade;
      ctx.fillRect(0, 0, width, 60);

      if (!reducedMotion) {
        rafId = requestAnimationFrame(draw);
      } else if (!cursorDrawn) {
        // reduced motion: only draw once
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [palette, reducedMotion, progress]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      role="presentation"
    />
  );
}
