"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import type { BlogPostMeta } from "@/lib/types";
import CategoryPill from "@/components/ui/CategoryPill";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

interface BlogPostLayoutProps {
  meta: BlogPostMeta;
  children: React.ReactNode;
  relatedPosts?: BlogPostMeta[];
}

export default function BlogPostLayout({
  meta,
  children,
  relatedPosts,
}: BlogPostLayoutProps) {
  return (
    <>
      <Navbar />
      <article className="pt-[72px]">
        {/* Hero */}
        <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={meta.image}
            alt={meta.imageAlt}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-nest/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="container-content -mt-24 relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
            className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-card md:p-12"
          >
            <motion.div variants={fadeUp}>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <CategoryPill label={meta.category} />
                <span className="text-sm text-earth/50">{meta.date}</span>
                <span className="text-sm text-earth/50">{meta.readTime}</span>
              </div>

              <h1 className="font-playfair text-[32px] font-bold leading-tight text-earth md:text-[48px]">
                {meta.title}
              </h1>
            </motion.div>

            <motion.div variants={fadeUp} className="prose-custom mt-10">
              {children}
            </motion.div>
          </motion.div>
        </div>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <section className="container-content py-16">
            <h2 className="mb-8 text-center font-playfair text-[32px] font-semibold text-earth">
              Keep Reading
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-5">
                    <CategoryPill label={post.category} />
                    <h3 className="mt-2 line-clamp-2 font-playfair text-lg font-semibold text-earth">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>
      <Footer />
    </>
  );
}
