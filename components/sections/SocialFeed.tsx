"use client";

import { motion } from "framer-motion";
import { scaleUp } from "@/lib/animations";
import SectionHeader from "@/components/ui/SectionHeader";
import StaggerContainer from "@/components/animations/StaggerContainer";
import { PinterestIcon } from "@/components/ui/Icons";
import { SOCIAL_FEED } from "@/lib/constants";

export default function SocialFeed() {
  return (
    <section id="social" className="section-padding bg-white">
      <div className="container-content">
        <SectionHeader
          caption="follow the nest"
          title="See What's New on Pinterest"
        />

        <StaggerContainer
          className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6"
          viewportAmount={0.2}
        >
          {SOCIAL_FEED.map((item, i) => (
            <motion.a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={scaleUp}
              className="group relative aspect-square overflow-hidden rounded-xl"
              aria-label={item.alt}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-deep-nest/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <PinterestIcon className="text-white" size={32} />
              </div>
            </motion.a>
          ))}
        </StaggerContainer>

        <div className="mt-10 text-center">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Follow @LittleNestMama on Pinterest
          </a>
        </div>
      </div>
    </section>
  );
}
