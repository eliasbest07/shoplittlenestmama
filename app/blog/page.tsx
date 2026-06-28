import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdSenseScript from "@/components/ads/AdSenseScript";
import BlogCard from "@/components/ui/BlogCard";
import SectionHeader from "@/components/ui/SectionHeader";
import StaggerContainer from "@/components/animations/StaggerContainer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories, tips, and honest truths about baby care — because informed mamas raise happy babies.",
};

export default function BlogListingPage() {
  const posts = getAllPosts();

  return (
    <>
      <AdSenseScript />
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding">
          <div className="container-content">
            <SectionHeader
              caption="the nest journal"
              title="Stories, Tips & Honest Truths"
              subtitle="Real talk about baby care — because informed mamas raise happy babies."
            />

            <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  featured={post.featured}
                />
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
