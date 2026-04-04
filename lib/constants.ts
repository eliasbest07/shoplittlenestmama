import type {
  NavLink,
  Product,
  BlogPostMeta,
  ValueCard,
  TrustCounter,
  SocialFeedItem,
  FooterColumn,
} from "./types";
import affiliateProducts from "@/data/affiliate-products.json";

export const SITE_URL = "https://littlenestmama.com";
export const SITE_NAME = "LittleNestMama";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/#hero" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/products" },
];

export const TRUST_COUNTERS: TrustCounter[] = [
  {
    number: "2,500+",
    target: 2500,
    suffix: "+",
    label: "Products Reviewed",
    icon: "search",
    iconColor: "#A8B5A0",
  },
  {
    number: "100%",
    target: 100,
    suffix: "%",
    label: "Honest Reviews",
    icon: "shield",
    iconColor: "#A8B5A0",
  },
  {
    number: "4.8/5",
    target: 4.8,
    suffix: "/5",
    label: "Average Rating",
    icon: "star",
    iconColor: "#D4A574",
  },
];

export const TICKER_ITEMS = [
  "Pediatrician Recommended",
  "Dermatologist Tested",
  "Organic Certified",
  "Hypoallergenic",
  "Water-Based",
  "Chemical-Free",
  "Mama Approved",
  "Nest Approved",
  "Sensitive Skin Safe",
  "Award Winning",
];

interface AffiliateProductSource {
  asin: string;
  title: string;
  image: string;
  descriptionBullets?: string[];
  suggestion?: string;
  affiliateLink: string;
  status: string;
}

function normalizeSuggestionCategory(suggestion?: string) {
  switch (suggestion) {
    case "baby wipes":
      return "Skin Care";
    case "baby monitor":
      return "Monitoring";
    case "baby registry search":
      return "Registry";
    case "baby gate":
      return "Safety";
    case "baby essentials":
    default:
      return "Baby Essentials";
  }
}

function cleanBullet(bullet: string) {
  return bullet
    .replace(/\s+/g, " ")
    .replace(/\u201c|\u201d/g, '"')
    .trim();
}

function buildExcerpt(product: AffiliateProductSource) {
  const firstUsefulBullet = product.descriptionBullets
    ?.map(cleanBullet)
    .find((bullet) => bullet.length > 24 && bullet.length < 220);

  return firstUsefulBullet ?? `Affiliate product from the ${product.suggestion ?? "baby"} catalog.`;
}

function buildHighlights(product: AffiliateProductSource) {
  return (product.descriptionBullets ?? [])
    .map(cleanBullet)
    .filter((bullet) => bullet.length > 12 && bullet.length < 180)
    .filter((bullet) => bullet.toLowerCase() !== "nullify")
    .slice(0, 3);
}

function buildRelatedBlogSlugs(product: AffiliateProductSource) {
  switch (product.suggestion) {
    case "baby wipes":
      return [
        "guide-baby-sensitive-skin",
        "water-based-vs-regular-baby-wipes",
      ];
    case "baby monitor":
      return ["gentle-sleep-guide-baby-0-12-months"];
    case "baby essentials":
      return ["guide-baby-sensitive-skin"];
    default:
      return [];
  }
}

export const PRODUCTS: Product[] = (affiliateProducts as AffiliateProductSource[])
  .filter((product) => product.status === "done" && product.affiliateLink && product.image)
  .map((product) => ({
    id: product.asin,
    image: product.image,
    imageAlt: product.title,
    badge: "Affiliate Pick",
    category: normalizeSuggestionCategory(product.suggestion),
    name: product.title,
    link: product.affiliateLink,
    excerpt: buildExcerpt(product),
    highlights: buildHighlights(product),
    relatedBlogSlugs: buildRelatedBlogSlugs(product),
    relatedPins: [
      {
        title: `Pinterest material for ${product.asin}`,
        href: "#",
      },
    ],
  }));

export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 6);

export function getAllProducts() {
  return PRODUCTS;
}

export function getProductById(id: string) {
  return PRODUCTS.find((product) => product.id === id) ?? null;
}

export const BLOG_POSTS_SUMMARY: BlogPostMeta[] = [
  {
    title:
      "The Complete Guide to Understanding Your Baby's Sensitive Skin",
    slug: "guide-baby-sensitive-skin",
    excerpt:
      "Your baby's skin is 30% thinner than yours. Here's everything you need to know about protecting it.",
    category: "Baby Skin",
    date: "February 12, 2026",
    readTime: "9 min read",
    image: "/images/generated/blog-sensitive-skin.svg",
    imageAlt:
      "Close-up of baby's hand gently holding parent's finger in warm natural light",
    featured: true,
    metaDescription:
      "Learn why baby skin is 30% thinner than adults, what ingredients to avoid, and how to choose the gentlest products.",
    keywords: [
      "baby sensitive skin",
      "baby skin care",
      "newborn skin",
    ],
  },
  {
    title:
      "Water-Based vs Regular Baby Wipes: What Science Actually Says",
    slug: "water-based-vs-regular-baby-wipes",
    excerpt:
      "We compared ingredients, tested 8 brands, and talked to dermatologists to find the truth.",
    category: "Product Guide",
    date: "February 13, 2026",
    readTime: "8 min read",
    image: "/images/generated/blog-wipes-comparison.svg",
    imageAlt:
      "Overhead view of multiple baby wipe brands arranged on a light marble surface",
    metaDescription:
      "An honest comparison of water-based and regular baby wipes — ingredients, cost per wipe, skin impact, and what pediatricians recommend.",
    keywords: [
      "water based baby wipes",
      "best baby wipes",
      "baby wipes comparison",
    ],
  },
  {
    title:
      "Baby-Led Weaning: A Month-by-Month Starter Guide for New Moms",
    slug: "baby-led-weaning-month-by-month-guide",
    excerpt:
      "From first tastes at 6 months to self-feeding at 12 months — your complete timeline.",
    category: "Nutrition",
    date: "February 14, 2026",
    readTime: "10 min read",
    image: "/images/generated/blog-blw-guide.svg",
    imageAlt:
      "Baby sitting in high chair with colorful food on tray",
    metaDescription:
      "A month-by-month guide to baby-led weaning from 6 to 12 months, with food ideas, safety tips, and what to expect.",
    keywords: [
      "baby led weaning",
      "BLW guide",
      "baby first foods",
    ],
  },
  {
    title:
      "Which Fabrics Are Actually Safe for Newborn Skin? A Textile Guide",
    slug: "safe-fabrics-newborn-skin-textile-guide",
    excerpt:
      "Cotton, bamboo, organic blends — not all 'soft' fabrics are created equal.",
    category: "Clothing",
    date: "February 14, 2026",
    readTime: "7 min read",
    image: "/images/generated/blog-safe-fabrics.svg",
    imageAlt:
      "Organized nursery closet with neatly folded baby clothes in neutral tones",
    metaDescription:
      "A guide to the safest fabrics for newborn and baby clothing — cotton, bamboo, organic blends, and what to avoid.",
    keywords: [
      "safe fabrics baby",
      "newborn clothing",
      "organic baby clothes",
    ],
  },
  {
    title:
      "The Gentle Sleep Guide: Science-Backed Tips for Baby Sleep (0\u201312 Months)",
    slug: "gentle-sleep-guide-baby-0-12-months",
    excerpt:
      "No cry-it-out here. Evidence-based strategies that actually work for the whole family.",
    category: "Sleep",
    date: "February 15, 2026",
    readTime: "11 min read",
    image: "/images/generated/blog-sleep-guide.svg",
    imageAlt:
      "Calm nursery at twilight with warm nightlight glowing softly",
    featured: true,
    metaDescription:
      "Evidence-based gentle sleep strategies for babies 0-12 months. No cry-it-out methods — just science and compassion.",
    keywords: [
      "baby sleep guide",
      "gentle sleep training",
      "baby sleep tips",
    ],
  },
];

export const VALUE_CARDS: ValueCard[] = [
  {
    icon: "shield-heart",
    title: "We Check Every Label",
    description:
      "If it's not safe for our baby, we won't recommend it for yours. Every product passes our ingredient screening before it earns the Nest Approved seal.",
  },
  {
    icon: "book-open",
    title: "The Good AND the Bad",
    description:
      "No paid scripts. No hidden sponsorships. We tell you what works and what doesn't — because your trust matters more than any commission.",
  },
  {
    icon: "compass-heart",
    title: "From Mama to Mama",
    description:
      "Every recommendation comes from the heart of a real mother. Not a marketing team. Not an algorithm. A mama who gets it.",
  },
  {
    icon: "nest",
    title: "You're Not Alone",
    description:
      "Motherhood can feel lonely. This nest is where mamas support each other — sharing wins, struggles, and the products that actually work.",
  },
  {
    icon: "hands",
    title: "Zero Judgment Zone",
    description:
      "Every mama knows what's best for her nest. We're here to inform, not to impose. Your choices, your pace, your way.",
  },
  {
    icon: "price-heart",
    title: "Quality at Every Budget",
    description:
      "The best doesn't always mean the most expensive. We find trusted products for every family, because every baby deserves the best.",
  },
];

export const SOCIAL_FEED: SocialFeedItem[] = [
  {
    image: "/nestmama/unnamed.jpg",
    alt: "Sunlit nursery with wooden crib, framed botanical art, and neutral textiles",
    link: "#",
  },
  {
    image: "/nestmama/2.jpg",
    alt: "Nursery shelves styled with muslin cloths, a baby bottle, and wooden toys",
    link: "#",
  },
  {
    image: "/nestmama/3.jpg",
    alt: "Curated nursery corner with soft lighting and natural wood accents",
    link: "#",
  },
  {
    image: "/nestmama/4.jpg",
    alt: "Neutral baby essentials arranged with textured fabrics and warm tones",
    link: "#",
  },
  {
    image: "/nestmama/5.jpg",
    alt: "Soft nursery styling details with cozy blankets and minimalist decor",
    link: "#",
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/#hero" },
      { label: "About", href: "/#about" },
      { label: "Blog", href: "/blog" },
      { label: "Shop", href: "/products" },
      { label: "Values", href: "/#values" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "Products", href: "/products" },
      { label: "FAQ", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Use", href: "#" },
      { label: "Affiliate Disclosure", href: "#" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Pinterest", href: "#" },
      { label: "Email", href: "mailto:hello@littlenestmama.com" },
    ],
  },
];
