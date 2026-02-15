"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

interface SectionHeaderProps {
  caption: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeader({
  caption,
  title,
  subtitle,
  light,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mb-12 text-center"
    >
      <motion.p
        variants={fadeUp}
        className={`mb-3 font-caveat text-2xl ${
          light ? "text-warm" : "text-warm"
        }`}
      >
        {caption}
      </motion.p>
      <motion.h2
        variants={fadeUp}
        className={`font-playfair text-[32px] font-semibold leading-[1.2] md:text-[48px] ${
          light ? "text-cream" : "text-earth"
        }`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={fadeUp}
          className={`mx-auto mt-4 max-w-2xl text-base md:text-lg ${
            light ? "text-cream/80" : "text-earth/70"
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
