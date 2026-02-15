"use client";

import { motion } from "framer-motion";
import { slideLeft, slideRight, fadeUp } from "@/lib/animations";
import AnimateOnScroll from "@/components/animations/AnimateOnScroll";
import WipeReveal from "@/components/animations/WipeReveal";

export default function About() {
  return (
    <section id="about" className="section-padding bg-cream">
      <div className="container-content grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Image */}
        <AnimateOnScroll variants={slideLeft} viewportAmount={0.3}>
          <WipeReveal className="rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://placehold.co/800x1000/E8EDE5/5D4E37?text=Nursery+Shelf"
              alt="Styled nursery shelf with baby care products and warm lighting"
              className="h-auto w-full rounded-2xl object-cover"
              loading="lazy"
            />
          </WipeReveal>
        </AnimateOnScroll>

        {/* Text */}
        <AnimateOnScroll variants={slideRight} viewportAmount={0.3}>
          <motion.p
            variants={fadeUp}
            className="mb-3 font-caveat text-2xl text-warm"
          >
            our story
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="font-playfair text-[32px] font-semibold leading-[1.2] text-earth md:text-[48px]"
          >
            Built by a Mama Who Checks Every Label
          </motion.h2>

          <motion.div variants={fadeUp} className="mt-6 space-y-5 text-base leading-relaxed text-earth/80 md:text-lg">
            <p>
              LittleNestMama was born at 3am, on a nursery floor, with a crying
              baby and a phone full of ingredient searches.
            </p>
            <p>
              I couldn&apos;t find a single place that told me the truth about
              what I was putting on my baby&apos;s skin. So I built one.
            </p>
            <p>
              Every product here has passed the toughest test there is: a mama
              who doesn&apos;t take shortcuts.
            </p>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-8 font-caveat text-xl text-earth"
          >
            — With love, LittleNestMama
          </motion.p>

          <motion.div variants={fadeUp}>
            <a href="#values" className="btn-secondary mt-6 inline-block">
              Our Values
            </a>
          </motion.div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
