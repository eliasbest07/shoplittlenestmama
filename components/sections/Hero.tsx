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
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-28 md:pt-32"
    >
      <div className="absolute left-[-10%] top-20 h-72 w-72 rounded-full bg-warm/12 blur-3xl" />
      <div className="absolute right-[-8%] top-10 h-80 w-80 rounded-full bg-blush/70 blur-3xl" />
      <div className="absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-sage/10 blur-3xl" />

      <ParallaxWrapper speed={0.35} className="absolute inset-0 z-0 opacity-20">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/generated/hero-nursery.svg"
            alt="Warm nursery scene with natural light"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </ParallaxWrapper>

      <motion.div
        initial="hidden"
        animate="visible"
        className="container-content relative z-10"
      >
        <div className="panel-surface relative overflow-hidden px-6 py-8 md:px-10 md:py-12">
          <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-gradient-to-l from-white/35 to-transparent md:block" />

          <div className="relative grid items-center gap-10 md:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]">
            <div className="max-w-2xl">
              <motion.p variants={fadeUpVariant(0.2)} className="eyebrow mb-4">
                LittleNestMama editorial picks
              </motion.p>

              <motion.h1
                variants={fadeUpVariant(0.45)}
                className="font-playfair text-[46px] font-bold leading-[0.94] text-earth md:text-[76px]"
              >
                Every Small Choice Is a Big Act of Love
              </motion.h1>

              <motion.p
                variants={fadeUpVariant(0.7)}
                className="mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg"
              >
                Honest reviews, gentle recommendations, and trusted picks for your
                baby, shaped with the same calm, premium warmth as a modern nursery.
              </motion.p>

              <motion.div
                variants={fadeUpVariant(0.95)}
                className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center"
              >
                <a href="#products" className="btn-cta w-full sm:w-auto">
                  Explore Our Picks
                </a>
                <a href="/blog" className="btn-secondary w-full sm:w-auto">
                  Read the Journal
                </a>
              </motion.div>

              <motion.a
                variants={fadeUpVariant(1.2)}
                href="#trust"
                className="mt-8 inline-flex items-center gap-3 text-sm font-medium text-sage hover:text-sage-hover"
              >
                <ChevronDownIcon size={18} className="animate-bounce-gentle" />
                Discover the collection
              </motion.a>
            </div>

            <motion.div
              variants={fadeUpVariant(0.8)}
              className="panel-muted relative mx-auto w-full max-w-[420px] overflow-hidden p-3"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,229,225,0.55),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.55),rgba(248,240,228,0.7))]" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/generated/hero-nursery.svg"
                alt="Warm nursery scene with natural light"
                className="relative h-full w-full rounded-[1.5rem] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
