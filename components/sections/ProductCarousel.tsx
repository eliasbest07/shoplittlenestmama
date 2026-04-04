"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/components/ui/SectionHeader";
import ProductCard from "@/components/ui/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/Icons";
import { FEATURED_PRODUCTS } from "@/lib/constants";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function ProductCarousel() {
  const [current, setCurrent] = useState(0);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [paused, setPaused] = useState(false);

  const visibleCount = isMobile ? 1 : isTablet ? 2 : 4;
  const maxIndex = Math.max(0, FEATURED_PRODUCTS.length - visibleCount);

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  const prev = () => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  };

  // Auto-slide (desktop only)
  useEffect(() => {
    if (isMobile || paused) return;
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isMobile, paused, next]);

  return (
    <section id="products" className="section-padding">
      <div className="container-content">
        <SectionHeader
          caption="mama's picks"
          title="Trusted Products for Your Little One"
          subtitle="A featured selection from the affiliate catalog, with full detail pages and direct Amazon referral links."
        />

        <div
          className="panel-surface relative px-4 py-8 md:px-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute -left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#ead8c4] bg-parchment shadow-card transition-shadow hover:shadow-card-hover md:-left-5"
            aria-label="Previous products"
          >
            <ChevronLeftIcon size={20} className="text-earth" />
          </button>
          <button
            onClick={next}
            className="absolute -right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#ead8c4] bg-parchment shadow-card transition-shadow hover:shadow-card-hover md:-right-5"
            aria-label="Next products"
          >
            <ChevronRightIcon size={20} className="text-earth" />
          </button>

          {/* Carousel track */}
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current}
                initial={{ opacity: 0.5, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0.5, x: -40 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
                }}
              >
                {FEATURED_PRODUCTS.slice(current, current + visibleCount).map(
                  (product) => (
                    <ProductCard key={product.id} product={product} />
                  )
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 w-2.5 rounded-full transition-colors ${
                  i === current ? "bg-warm" : "bg-warm/25"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <a href="/products" className="btn-secondary">
              Browse All Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
