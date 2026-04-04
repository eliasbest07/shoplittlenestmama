"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { scaleUp } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";
import StaggerContainer from "@/components/animations/StaggerContainer";
import { SOCIAL_FEED } from "@/lib/constants";

export default function SocialFeed() {
  const [featuredImage, ...galleryImages] = SOCIAL_FEED;

  return (
    <section id="social" className="section-padding">
      <div className="container-content">
        <SectionHeader
          caption="inside the nest"
          title="A Closer Look at the Little Nest Mama World"
          subtitle="Real nursery-inspired imagery now lives directly on the homepage, using the photo set from public/nestmama."
        />

        <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          {featuredImage ? (
            <motion.div
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="group panel-muted relative min-h-[320px] overflow-hidden rounded-[2rem]"
            >
              <Image
                src={featuredImage.image}
                alt={featuredImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#433126]/85 via-[#433126]/30 to-transparent px-6 pb-6 pt-16 text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/75">
                  featured space
                </p>
                <p className="mt-2 max-w-md font-playfair text-2xl leading-tight">
                  Warm, calm, and grounded nursery details.
                </p>
              </div>
            </motion.div>
          ) : null}

          <StaggerContainer
            className="grid grid-cols-2 gap-4"
            viewportAmount={0.2}
          >
            {galleryImages.map((item, i) => (
              <motion.div
                key={item.image}
                variants={scaleUp}
                className={`group panel-muted relative overflow-hidden rounded-[1.75rem] ${
                  i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
                }`}
                aria-label={item.alt}
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes={i === 0 ? "(max-width: 1024px) 100vw, 40vw" : "(max-width: 1024px) 50vw, 20vw"}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
