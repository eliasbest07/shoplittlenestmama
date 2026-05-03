export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface Product {
  id: string;
  image: string;
  imageAlt: string;
  badge: string;
  category: string;
  name: string;
  rating?: number;
  price?: string;
  review?: string;
  link: string;
  excerpt?: string;
  highlights?: string[];
  relatedBlogSlugs?: string[];
  relatedPins?: {
    title: string;
    href: string;
    note?: string;
  }[];
}

export interface BlogPostMeta {
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
  metaDescription: string;
  keywords: string[];
}

export interface ValueCard {
  icon: string;
  title: string;
  description: string;
}

export interface TrustCounter {
  number: string;
  target: number;
  suffix: string;
  label: string;
  icon: string;
  iconColor: string;
}

export interface SocialFeedItem {
  image: string;
  alt: string;
  link: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
