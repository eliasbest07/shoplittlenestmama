"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export default function ParallaxWrapper({
  children,
  speed = 0.5,
  className,
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
