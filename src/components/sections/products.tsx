"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  Check,
  GraduationCap,
  Scissors,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { home } from "@/lib/content";
import { Reveal } from "@/components/shared/motion-section";
import { cn } from "@/lib/utils";

type Brand = keyof typeof brandStyles;

const brandStyles = {
  notamaestro: {
    icon: GraduationCap,
    accent: "from-notamaestro to-notamaestro-dark",
    badge: "bg-notamaestro/15 text-notamaestro-light border-notamaestro/30",
    text: "text-notamaestro-light",
    bg: "bg-gradient-to-br from-[#1f1408]/80 via-[#160c02]/85 to-[#0d0801]/90",
    border: "border-notamaestro/30",
    accentBar: "bg-gradient-to-r from-notamaestro via-notamaestro-light to-notamaestro/0",
  },
  ampirux: {
    icon: Scissors,
    accent: "from-ampirux to-ampirux-dark",
    badge: "bg-ampirux/15 text-ampirux-light border-ampirux/30",
    text: "text-ampirux-light",
    bg: "bg-gradient-to-br from-[#170a32]/80 via-[#0d0322]/85 to-[#0b021c]/90",
    border: "border-ampirux/30",
    accentBar: "bg-gradient-to-r from-ampirux via-ampirux-light to-ampirux/0",
  },
  codfy: {
    icon: Wrench,
    accent: "from-codfy to-codfy-dark",
    badge: "bg-codfy/15 text-codfy-light border-codfy/30",
    text: "text-codfy-light",
    bg: "bg-gradient-to-br from-[#0f1426]/80 via-[#0a0d1f]/85 to-[#080a18]/90",
    border: "border-codfy/30",
    accentBar: "bg-gradient-to-r from-codfy via-codfy-light to-codfy/0",
  },
} as const;

export function Products() {
  const items = home.products.items;
  const ref = useRef<HTMLDivElement>(null);

  // Total scrollable height: intro band + (panels * 100vh hold + transitions)
  // Use a long section so the sticky pin has space for snap stops
  const PANEL_COUNT = items.length;
  const SCROLL_HEIGHT_VH = PANEL_COUNT * 110; // 110vh per panel for hold + transition

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Snap-stepped translateX: holds each panel for most of its slot, transitions quickly between
  // For 3 panels: holds at 0%, -100%, -200% (each = full panel width)
  // We use a stepped curve: hold-transition-hold-transition-hold
  // input progress: [0, 0.28, 0.38, 0.62, 0.72, 1]
  // output (px translate of strip, in vw units): [0, 0, -100, -100, -200, -200]
  const translateX = useTransform(
    scrollYProgress,
    [0, 0.28, 0.38, 0.62, 0.72, 1],
    ["0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw"]
  );

  // Active panel index (0,1,2) — derived for indicator pills
  const activePanel = useTransform(scrollYProgress, (v): number => {
    if (v < 0.33) return 0;
    if (v < 0.66) return 1;
    return 2;
  });

  return (
    <section id="productos" className="relative">
      {/* Intro band */}
      <div className="relative px-4 pt-20 pb-12 text-center sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-codfy-light">
            {home.products.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-white text-balance sm:text-4xl md:text-5xl">
            {home.products.title}
          </h2>
          <p className="mt-5 text-base text-balance text-white/65 md:text-lg">
            {home.products.description}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-white/35">
            <span className="inline-block h-px w-8 bg-codfy/40" />
            Scroll para explorar
            <span className="inline-block h-px w-8 bg-codfy/40" />
          </p>
        </Reveal>
      </div>

      {/* Horizontal parallax */}
      <div
        ref={ref}
        className="relative"
        style={{ height: `${SCROLL_HEIGHT_VH}vh` }}
      >
        <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
          {/* Strip that translates */}
          <motion.div
            style={{ x: translateX, width: `${PANEL_COUNT * 100}vw` }}
            className="flex h-full"
          >
            {items.map((item, i) => (
              <ProductPanel
                key={item.slug}
                item={item}
                index={i}
                total={PANEL_COUNT}
              />
            ))}
          </motion.div>

          {/* Panel indicator pills (top center) */}
          <div className="pointer-events-none absolute inset-x-0 top-24 z-20 flex justify-center gap-2">
            {items.map((_, i) => (
              <PanelDot key={i} index={i} activePanel={activePanel} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PanelDot({
  index,
  activePanel,
}: {
  index: number;
  activePanel: import("framer-motion").MotionValue<number>;
}) {
  const width = useTransform(activePanel, (a) => (a === index ? 32 : 6));
  const opacity = useTransform(activePanel, (a) => (a === index ? 0.9 : 0.3));
  return (
    <motion.span
      style={{ width, opacity }}
      className="h-1.5 rounded-full bg-white transition-colors"
    />
  );
}

function ProductPanel({
  item,
  index,
  total,
}: {
  item: (typeof home.products.items)[number];
  index: number;
  total: number;
}) {
  const styles = brandStyles[item.brand as Brand];
  const Icon: LucideIcon = styles.icon;
  const isComingSoon = item.cta === "Próximamente";

  return (
    <div
      className={cn("relative h-full shrink-0 overflow-hidden", styles.bg)}
      style={{ width: "100vw" }}
    >
      {/* Watermark number */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-8 top-1/2 -translate-y-1/2 font-display text-[18rem] font-bold leading-none text-white/[0.04] sm:text-[24rem] lg:text-[32rem]"
      >
        0{index + 1}
      </span>

      {/* Centered content */}
      <div className="relative mx-auto flex h-full max-w-5xl items-center px-6 pt-24 pb-12 sm:px-10 lg:px-16">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "relative w-full overflow-hidden rounded-3xl border bg-white/[0.04] p-8 backdrop-blur-xl shadow-2xl sm:p-10",
            styles.border
          )}
        >
          <div className={cn("absolute -top-px left-10 right-10 h-1 rounded-full", styles.accentBar)} />

          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-white/40">
                  Producto 0{index + 1} / 0{total}
                </span>
                {isComingSoon && (
                  <Badge variant="outline" className={cn("border", styles.badge)}>
                    Pronto
                  </Badge>
                )}
              </div>

              <div className="mt-5 flex items-start gap-5">
                <div
                  className={cn(
                    "inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-2xl",
                    styles.accent
                  )}
                >
                  <Icon className="h-8 w-8" strokeWidth={2} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-display text-3xl font-bold text-white sm:text-4xl">
                    {item.name}
                  </h3>
                  <p className={cn("mt-1 text-sm font-medium uppercase tracking-wider", styles.text)}>
                    {item.tagline}
                  </p>
                </div>
              </div>

              <p className="mt-5 text-base leading-relaxed text-white/70">
                {item.description}
              </p>

              <Link
                href={item.href}
                className={cn(
                  "mt-7 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r px-5 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-[1.02]",
                  styles.accent,
                  isComingSoon && "pointer-events-none opacity-60"
                )}
              >
                {item.cta}
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>

            <div>
              <div className="text-[10px] font-mono font-semibold uppercase tracking-[0.25em] text-white/40">
                Lo que incluye
              </div>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {item.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-sm text-white/85"
                  >
                    <Check className={cn("mt-0.5 h-4 w-4 shrink-0", styles.text)} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
