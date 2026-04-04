"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import ParallaxWrapper from "@/components/animations/ParallaxWrapper";
import StaggerContainer from "@/components/animations/StaggerContainer";

export default function Newsletter() {
  return (
    <section id="newsletter" className="relative overflow-hidden py-20 md:py-32">
      {/* Parallax background */}
      <ParallaxWrapper speed={0.4} className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/generated/newsletter-reading-nook.svg"
          alt=""
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </ParallaxWrapper>

      {/* Overlay */}
      <div className="absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(31,35,51,0.68),rgba(31,35,51,0.56))]" />

      <StaggerContainer className="container-content relative z-10 text-center" viewportAmount={0.3}>
        <motion.p variants={fadeUp} className="eyebrow mb-3 text-cream/85">
          join the nest
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-playfair text-[32px] font-bold text-cream md:text-[48px]"
        >
          Get Honest Picks Delivered to Your Inbox
        </motion.h2>

        <motion.p variants={fadeUp} className="mx-auto mt-4 max-w-xl text-base text-cream/80">
          Weekly curated recommendations, exclusive tips, and the truth about
          baby products. No spam. Just a mama helping mamas.
        </motion.p>

        <motion.form
          variants={fadeUp}
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-[1.75rem] border border-white/15 bg-white/10 p-3 backdrop-blur-md sm:flex-row"
        >
          <input
            type="email"
            placeholder="youremail@example.com"
            className="flex-1 rounded-full border border-cream/25 bg-white/10 px-6 py-4 text-base text-cream placeholder:text-cream/50 transition-all focus:border-warm focus:bg-white/20 focus:outline-none"
            required
          />
          <button
            type="submit"
            className="rounded-full bg-warm px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-warm-hover"
          >
            Subscribe
          </button>
        </motion.form>

        <motion.p variants={fadeUp} className="mt-4 text-sm text-cream/50">
          Join 1,200+ mamas in the nest. Unsubscribe anytime.
        </motion.p>
      </StaggerContainer>
    </section>
  );
}
