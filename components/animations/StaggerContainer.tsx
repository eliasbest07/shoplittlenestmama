"use client";

import { motion } from "framer-motion";
import { staggerContainer } from "@/lib/animations";
import type { ReactNode } from "react";

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  viewportAmount?: number;
  delay?: number;
}

export default function StaggerContainer({
  children,
  className,
  viewportAmount = 0.2,
  delay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={{
        ...staggerContainer,
        visible: {
          transition: {
            staggerChildren: 0.15,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
