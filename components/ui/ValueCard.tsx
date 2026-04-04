"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import type { ValueCard as ValueCardType } from "@/lib/types";
import {
  ShieldHeartIcon,
  BookOpenIcon,
  CompassHeartIcon,
  NestIcon,
  HandsIcon,
  PriceHeartIcon,
} from "@/components/ui/Icons";

const iconMap: Record<string, React.ReactNode> = {
  "shield-heart": <ShieldHeartIcon className="text-sage" />,
  "book-open": <BookOpenIcon className="text-sage" />,
  "compass-heart": <CompassHeartIcon className="text-sage" />,
  nest: <NestIcon className="text-sage" />,
  hands: <HandsIcon className="text-sage" />,
  "price-heart": <PriceHeartIcon className="text-sage" />,
};

interface ValueCardProps {
  card: ValueCardType;
}

export default function ValueCard({ card }: ValueCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -6 }}
      className="group flex flex-col items-center rounded-[1.75rem] border border-[#ead8c4] bg-parchment p-8 text-center transition-all duration-300 hover:border-sage/35 hover:shadow-card-hover md:p-10"
    >
      <div className="transition-transform duration-300 group-hover:rotate-[10deg]">
        {iconMap[card.icon]}
      </div>
      <h4 className="mt-4 font-inter text-lg font-semibold text-earth md:text-xl">
        {card.title}
      </h4>
      <p className="mt-3 text-sm leading-relaxed text-mist">
        {card.description}
      </p>
    </motion.div>
  );
}
