import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPostMeta } from "./types";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

export function getAllPosts(): BlogPostMeta[] {
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOG_DIR, filename);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(source);
    const stats = readingTime(content);

    return {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      category: data.category,
      date: data.date,
      readTime: stats.text,
      image: data.image,
      imageAlt: data.imageAlt,
      featured: data.featured ?? false,
      metaDescription: data.metaDescription,
      keywords: data.keywords ?? [],
    } as BlogPostMeta;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostBySlug(slug: string) {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const source = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(source);
  const stats = readingTime(content);

  return {
    meta: {
      title: data.title,
      slug,
      excerpt: data.excerpt,
      category: data.category,
      date: data.date,
      readTime: stats.text,
      image: data.image,
      imageAlt: data.imageAlt,
      featured: data.featured ?? false,
      metaDescription: data.metaDescription,
      keywords: data.keywords ?? [],
    } as BlogPostMeta,
    content,
  };
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
