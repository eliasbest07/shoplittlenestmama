"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface WipeRevealProps {
  children: ReactNode;
  className?: string;
}

export default function WipeReveal({ children, className }: WipeRevealProps) {
  return (
    <motion.div
      className={`relative overflow-hidden ${className ?? ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {children}
      <motion.div
        className="absolute inset-0 z-10 bg-sage"
        variants={{
          hidden: { x: "0%" },
          visible: {
            x: "-100%",
            transition: {
              duration: 1,
              ease: [0.77, 0, 0.175, 1],
            },
          },
        }}
      />
    </motion.div>
  );
}
