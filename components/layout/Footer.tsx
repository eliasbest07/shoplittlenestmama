"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeIn, fadeUp } from "@/lib/animations";
import StaggerContainer from "@/components/animations/StaggerContainer";
import { FOOTER_COLUMNS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-deep-nest">
      <StaggerContainer className="container-content py-16" viewportAmount={0.1}>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand column */}
          <motion.div variants={fadeIn}>
            <Link
              href="/"
              className="font-playfair text-xl font-bold text-cream"
            >
              LittleNestMama
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-cream/80">
              Honest picks for your nest. Built by a mama who checks every
              label.
            </p>
          </motion.div>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <motion.div key={col.title} variants={fadeIn}>
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-[2px] text-cream">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("#") || link.href.startsWith("mailto:") ? (
                      <a
                        href={link.href}
                        className="group inline-flex items-center text-sm text-cream/60 transition-all duration-200 hover:text-warm hover:translate-x-1"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="group inline-flex items-center text-sm text-cream/60 transition-all duration-200 hover:text-warm hover:translate-x-1"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          variants={fadeUp}
          className="mt-12 border-t border-warm/20 pt-8"
        >
          <p className="text-center text-[13px] leading-relaxed text-cream/50">
            Affiliate Disclosure: LittleNestMama is a participant in the Amazon
            Services LLC Associates Program. When you purchase through our
            links, we may earn a small commission at no extra cost to you. We
            only recommend products we genuinely trust.
          </p>
          <p className="mt-4 text-center text-xs text-cream/40">
            &copy; 2026 LittleNestMama. All rights reserved. Made with love.
          </p>
        </motion.div>
      </StaggerContainer>
    </footer>
  );
}
