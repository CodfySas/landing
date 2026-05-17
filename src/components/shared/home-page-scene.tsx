"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * Persistent background scene for Home: a network of nodes that drift
 * autonomously, with connecting lines drawn between nearby nodes. The
 * whole network pans/pulses with scroll progress. Canvas-based for
 * 60fps performance with many nodes.
 */
export function HomePageScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const progressRef = useRef(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let rafId: number | null = null;

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

    // Initialize nodes
    type Node = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      hue: number;
    };

    const NODE_COUNT = 64;
    const CONNECT_DIST = 180;
    const nodes: Node[] = [];
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: rand(0, 1920),
        y: rand(0, 1080),
        vx: rand(-0.15, 0.15),
        vy: rand(-0.12, 0.12),
        r: rand(1.4, 2.8),
        hue: rand(195, 280), // blue → purple range
      });
    }

    let lastTime = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(40, now - lastTime);
      lastTime = now;
      const progress = progressRef.current; // 0..1

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Background radial wash drifts slowly and autonomously — same speed
      // regardless of scroll. Long Lissajous-style cycle so it never feels frantic.
      const tSec = now / 1000;
      const washX = width * (0.5 + Math.sin(tSec / 90) * 0.28);
      const washY = height * (0.5 + Math.cos(tSec / 130) * 0.22);
      const wash = ctx.createRadialGradient(
        washX,
        washY,
        20,
        washX,
        washY,
        Math.max(width, height) * 0.7
      );
      wash.addColorStop(0, "rgba(66,156,216,0.18)");
      wash.addColorStop(0.5, "rgba(123,44,191,0.06)");
      wash.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      // Scroll-driven offset (parallax) — network pans slightly with scroll
      const offsetX = (progress - 0.5) * 60;
      const offsetY = progress * 80;

      // Update nodes
      const motionSpeed = reduced ? 0 : 1;
      for (const n of nodes) {
        n.x += n.vx * dt * 0.06 * motionSpeed;
        n.y += n.vy * dt * 0.06 * motionSpeed;
        // Wrap around
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ax = a.x + offsetX;
        const ay = a.y + offsetY;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const bx = b.x + offsetX;
          const by = b.y + offsetY;
          const dx = ax - bx;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT_DIST) {
            const alpha = (1 - dist / CONNECT_DIST) * 0.35;
            ctx.strokeStyle = `rgba(106, 181, 227, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();
          }
        }
      }

      // Draw nodes with glow
      for (const n of nodes) {
        const nx = n.x + offsetX;
        const ny = n.y + offsetY;
        const pulse = 0.7 + Math.sin(now * 0.0015 + n.x * 0.01) * 0.3;
        const radius = n.r * pulse;
        // Glow
        const glow = ctx.createRadialGradient(nx, ny, 0, nx, ny, radius * 5);
        glow.addColorStop(0, `hsla(${n.hue}, 75%, 65%, 0.5)`);
        glow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(nx, ny, radius * 5, 0, Math.PI * 2);
        ctx.fill();
        // Core
        ctx.fillStyle = `hsla(${n.hue}, 80%, 75%, 0.9)`;
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Traveling pulse — autonomous slow cycle, completely independent of scroll.
      // Full network traversal takes ~40 minutes so the motion feels meditative.
      const PULSE_CYCLE_SEC = 600;
      const pulseT = (tSec / PULSE_CYCLE_SEC) % 1;
      const totalSteps = nodes.length;
      const pulseI = Math.floor(pulseT * totalSteps) % totalSteps;
      const nextI = (pulseI + 1) % totalSteps;
      const pulseFrac = (pulseT * totalSteps) % 1;
      const pa = nodes[pulseI];
      const pb = nodes[nextI];
      if (pa && pb) {
        const px = pa.x + (pb.x - pa.x) * pulseFrac + offsetX;
        const py = pa.y + (pb.y - pa.y) * pulseFrac + offsetY;
        const pulseGlow = ctx.createRadialGradient(px, py, 0, px, py, 60);
        pulseGlow.addColorStop(0, "rgba(255,255,255,0.85)");
        pulseGlow.addColorStop(0.3, "rgba(106,181,227,0.4)");
        pulseGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = pulseGlow;
        ctx.beginPath();
        ctx.arc(px, py, 60, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduced || nodes.length === 0) {
        rafId = requestAnimationFrame(draw);
      }
    };

    rafId = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [reduced]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(8,7,22,0.55) 100%)",
        }}
      />
    </div>
  );
}
