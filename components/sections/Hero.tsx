"use client";

import { motion } from "framer-motion";
import { ChevronDownIcon } from "@/components/ui/Icons";
import ParallaxWrapper from "@/components/animations/ParallaxWrapper";

const fadeUpVariant = (delay: number) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
});

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background with parallax */}
      <ParallaxWrapper speed={0.5} className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://placehold.co/1920x1080/5D4E37/A8B5A0?text=Nursery+Scene"
            alt="Warm nursery scene with natural light"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </ParallaxWrapper>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-deep-nest/50 via-deep-nest/30 to-deep-nest/50" />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-3xl px-5 text-center"
      >
        <motion.p
          variants={fadeUpVariant(0.3)}
          className="mb-4 font-caveat text-2xl text-warm md:text-3xl"
        >
          from our nest to yours
        </motion.p>

        <motion.h1
          variants={fadeUpVariant(0.6)}
          className="font-playfair text-[40px] font-bold leading-[1.1] text-cream md:text-[64px]"
        >
          Every Small Choice Is a Big Act of Love
        </motion.h1>

        <motion.p
          variants={fadeUpVariant(0.9)}
          className="mx-auto mt-6 max-w-xl text-base text-cream/90 md:text-xl"
        >
          Honest reviews, gentle recommendations, and trusted picks for your
          baby — by a mama who checks every label.
        </motion.p>

        <motion.div
          variants={fadeUpVariant(1.2)}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a href="#products" className="btn-cta w-full sm:w-auto">
            Explore Our Picks
          </a>
          <a
            href="/blog"
            className="text-base font-medium text-cream underline underline-offset-4 transition-colors hover:text-warm"
          >
            Read the Blog
          </a>
        </motion.div>

        {/* Scroll chevron */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-16"
        >
          <a href="#trust" aria-label="Scroll down">
            <ChevronDownIcon
              size={32}
              className="mx-auto animate-bounce-gentle text-cream/70"
            />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
