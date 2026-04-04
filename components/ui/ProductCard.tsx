"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import StarRating from "./StarRating";
import CategoryPill from "./CategoryPill";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#ead8c4] bg-parchment shadow-card transition-shadow hover:shadow-card-hover"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`} className="block h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.imageAlt}
            className="h-full w-full object-cover transition-transform duration-400 hover:scale-105"
            loading="lazy"
          />
        </Link>
        <span className="absolute right-3 top-3 rounded-full bg-sage px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">
          {product.badge}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <CategoryPill label={product.category} />
        <Link href={`/products/${product.id}`} className="mt-2">
          <h4 className="line-clamp-2 font-inter text-base font-semibold text-earth">
            {product.name}
          </h4>
        </Link>
        {typeof product.rating === "number" ? (
          <StarRating rating={product.rating} className="mt-2" />
        ) : null}
        {product.price ? (
          <p className="mt-2 text-lg font-bold text-earth">{product.price}</p>
        ) : null}
        {product.review ? (
          <p className="mt-1 text-sm italic text-mist">
            &ldquo;{product.review}&rdquo;
          </p>
        ) : (
          <p className="mt-3 text-sm leading-relaxed text-mist">
            {product.excerpt ??
              "A practical newborn care set selected from the affiliate catalog."}
          </p>
        )}
        <Link
          href={`/products/${product.id}`}
          className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-sage transition-colors hover:text-sage-hover"
        >
          View details &rarr;
        </Link>
      </div>
    </motion.article>
  );
}
