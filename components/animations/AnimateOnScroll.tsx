"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface AnimateOnScrollProps {
  children: ReactNode;
  variants: Variants;
  className?: string;
  viewportAmount?: number;
  once?: boolean;
}

export default function AnimateOnScroll({
  children,
  variants,
  className,
  viewportAmount = 0.3,
  once = true,
}: AnimateOnScrollProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: viewportAmount }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
