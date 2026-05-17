"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import type { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

type RevealProps = PropsWithChildren<{
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "header" | "footer" | "ul" | "li";
  variants?: Variants;
  amount?: number;
}> &
  Omit<HTMLMotionProps<"div">, "variants">;

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variants,
  amount = 0.3,
  ...rest
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;
  const v = variants ?? defaultVariants;
  return (
    <MotionTag
      className={cn(className)}
      variants={v}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
