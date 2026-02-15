import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "@/lib/mdx-remote";
import { getAllSlugs, getPostBySlug, getAllPosts } from "@/lib/blog";
import BlogPostLayout from "@/components/blog/BlogPostLayout";
import { SITE_URL } from "@/lib/constants";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.meta.title,
    description: post.meta.metaDescription,
    keywords: post.meta.keywords,
    openGraph: {
      title: post.meta.title,
      description: post.meta.metaDescription,
      type: "article",
      publishedTime: post.meta.date,
      images: [{ url: post.meta.image }],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.meta.title,
    description: post.meta.metaDescription,
    image: post.meta.image,
    datePublished: post.meta.date,
    author: {
      "@type": "Person",
      name: "LittleNestMama",
    },
    publisher: {
      "@type": "Organization",
      name: "LittleNestMama",
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPostLayout meta={post.meta} relatedPosts={relatedPosts}>
        <MDXRemote source={post.content} />
      </BlogPostLayout>
    </>
  );
}
