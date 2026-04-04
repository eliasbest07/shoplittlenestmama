"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import type { BlogPostMeta } from "@/lib/types";
import CategoryPill from "./CategoryPill";

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export default function BlogCard({ post, featured }: BlogCardProps) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className={`group overflow-hidden rounded-[1.75rem] border border-[#ead8c4] bg-parchment shadow-card transition-shadow hover:shadow-card-hover ${
        featured ? "md:row-span-2" : ""
      }`}
    >
      <Link href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div className="aspect-[16/10] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            alt={post.imageAlt}
            className="h-full w-full object-cover transition-transform duration-400 group-hover:scale-108"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3">
            <CategoryPill
              label={post.category}
              className="group-hover:bg-sage group-hover:text-white"
            />
            <span className="text-xs text-mist">{post.date}</span>
          </div>

          <h3 className="mt-3 line-clamp-2 font-playfair text-xl font-semibold text-earth md:text-2xl">
            {post.title}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-mist">
            {post.excerpt}
          </p>

          <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-sage transition-transform group-hover:translate-x-1">
            Read More &rarr;
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
