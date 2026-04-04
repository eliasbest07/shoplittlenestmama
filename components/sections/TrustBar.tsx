"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import StaggerContainer from "@/components/animations/StaggerContainer";
import CounterAnimation from "@/components/animations/CounterAnimation";
import { TRUST_COUNTERS, TICKER_ITEMS } from "@/lib/constants";
import { SearchIcon, ShieldIcon, StarIcon } from "@/components/ui/Icons";

const iconMap: Record<string, React.ReactNode> = {
  search: <SearchIcon className="text-sage" />,
  shield: <ShieldIcon className="text-sage" />,
  star: <StarIcon className="text-warm" />,
};

export default function TrustBar() {
  return (
    <section id="trust" className="py-16">
      {/* Counters */}
      <StaggerContainer
        className="container-content panel-surface grid grid-cols-2 gap-8 px-6 py-10 md:grid-cols-3 md:px-10"
        viewportAmount={0.5}
      >
        {TRUST_COUNTERS.map((counter, i) => (
          <motion.div
            key={counter.label}
            variants={fadeUp}
            className={`flex flex-col items-center text-center ${
              i === 2 ? "col-span-2 md:col-span-1" : ""
            }`}
          >
            <div className="mb-3">{iconMap[counter.icon]}</div>
            <CounterAnimation
              target={counter.target}
              suffix={counter.suffix}
              className="font-playfair text-[48px] font-bold text-earth"
            />
            <p className="mt-1 text-sm text-mist">{counter.label}</p>
          </motion.div>
        ))}
      </StaggerContainer>

      {/* Marquee ticker */}
      <div className="container-content mt-10 overflow-hidden">
        <div className="group flex animate-marquee items-center hover:[animation-play-state:paused]">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="mx-6 whitespace-nowrap text-sm font-medium uppercase tracking-[2px] text-sage/80"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
