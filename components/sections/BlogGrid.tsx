"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import BlogCard from "@/components/ui/BlogCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import { BLOG_POSTS_SUMMARY } from "@/lib/constants";

export default function BlogGrid() {
  return (
    <section id="blog" className="section-padding">
      <div className="container-content">
        <SectionHeader
          caption="the nest journal"
          title="Stories, Tips & Honest Truths"
          subtitle="Real talk about baby care — because informed mamas raise happy babies."
        />

        <StaggerContainer
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          viewportAmount={0.2}
        >
          {BLOG_POSTS_SUMMARY.map((post) => (
            <BlogCard
              key={post.slug}
              post={post}
              featured={post.featured}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
