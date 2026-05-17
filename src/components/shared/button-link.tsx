"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "ampirux" | "notamaestro" | "white";
type Size = "default" | "sm" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-codfy text-white hover:bg-codfy-dark shadow-glow-codfy focus-visible:ring-2 focus-visible:ring-codfy/60",
  outline:
    "border border-white/15 bg-white/5 text-white backdrop-blur hover:bg-white/10",
  ghost: "text-white hover:bg-white/10",
  ampirux:
    "bg-ampirux text-white hover:bg-ampirux-dark shadow-glow-ampirux focus-visible:ring-2 focus-visible:ring-ampirux/60",
  notamaestro:
    "bg-notamaestro text-white hover:bg-notamaestro-dark shadow-glow-notamaestro focus-visible:ring-2 focus-visible:ring-notamaestro/60",
  white:
    "bg-white text-codfy-ink hover:bg-white/90 shadow-lg",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  default: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

export function ButtonLink({
  variant = "primary",
  size = "default",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold whitespace-nowrap transition-all outline-none disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {children}
    </Link>
  );
}
