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
  imageLocal?: string;
  descriptionBullets?: string[];
  suggestion?: string;
  affiliateLink: string;
  status: string;
  relatedPins?: PinterestPinSource[];
}

interface PinterestPinSource {
  title: string;
  href: string;
  note?: string;
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

function buildFallbackPinCopy(product: AffiliateProductSource) {
  const highlights = buildHighlights(product);
  const baseTitle = product.title.split(",")[0]?.trim() || product.title;

  return [
    {
      title: `${baseTitle} Overview`,
      href: "#",
      note: highlights[0] ?? `Supporting Pinterest content for ${product.asin}.`,
    },
  ];
}

function buildRelatedPins(product: AffiliateProductSource) {
  if (product.relatedPins && product.relatedPins.length > 0) {
    return product.relatedPins;
  }

  return buildFallbackPinCopy(product);
}

const generatedCoverAsins = new Set([
    "B073XVXQ6R", "B001PYQWXY", "B08V8RWP3W", "B0DPR78B37", "B0CLGCN5ZS",
    "B07N1JP56L", "B08GJJ4JWG", "B0BW2X99SC", "B0FF39ZB6V", "B0BXBBDR3R",
    "1648766595", "B07MBW6JNL", "B07SVHLGV8", "B0DR55SVHB", "B0C6Y89H47",
    "B0CWLHKQNT", "B07YXN58SK", "0593523571", "B0CYZNBB14", "B0BJ13K7FR",
    "B0D65F9NS7", "B0DRG5NWJG", "B0CF1WF832", "B0DSP23G39", "B07MPCCDM7",
    "B0F5WXJJQD", "B0CJCLHSXV", "B0GF6R7BRG", "B0GFDQGWLV", "B0BVXQQNBB",
    "B0746RGRL3", "B08QRT84WJ", "B0DSPHJLC9", "B09LRK8WLJ", "B0DHYH23PK",
    "B07Q9CTTLT", "B0D6LKSBM1", "B0D4B466R6", "B0B45XD7Q4", "B0FH6Q7T6B",
    "B0CZNY9QK6", "B00M0DWQYI", "B0CGWJ87QM", "B0DT4D8C8J", "B0F1T9762D",
    "1680524232", "B0FM7CXSDS", "B07H53W5WP", "B0872YT3KD", "B0FTSL4FXJ",
    "B0DQNPSCD3", "B075G6XMSF", "B0C9JRM5WX", "0544938097", "B0G48HDC44",
    "B07HPFTV69", "B079V67BFW", "B001OC5UNA", "B08QRL9YMY", "B07H1NLW4K",
    "B0FWKDRPL2", "B07KGL6L56", "B095L52T3Z", "B0D4LVK289", "1728223431",
    "B000G6BZJI", "B004HM368U", "0694014222", "B0914D1RQL", "B095XD61JX",
    "B0DMW9GTGT", "B0B66QNW35", "B0FQHGWDRN", "B0G5Z5MS36", "B0009STDJW",
    "B0866S3D82", "B01EIG6A4Q", "B001OC5UMQ", "B07WCV632L", "B07H53Y33R",
    "B00AO084CW", "B00H8MSBY0", "B0D1R5S52V", "B0F8T5231B", "B0F49G8KYV",
    "B07FSLSL1K", "B0CKW4B982", "B0CD42KQ3K", "B0CGRB23YM", "B08GFCX964",
    "B0B3SCY69X", "B0CYCDTZ6G", "B0FGJ49MYP", "B0779Z53SD", "B0B21ZM7LJ",
    "B01HG7E5R8", "B0BZYJWCMS", "B0BTDRL37K", "B0DCTCB7K8", "B07DGPGR56",
    "0451469828", "B0CDQ2KVJD", "B0BN2ZH72J", "B0B6CPQWW5", "B0BJ6YM9JX",
    "B0CF4QLG92", "B0DZJ49F6M", "B0002JETOM", "B08PDPK1JS", "B00JEV5UI8",
    "B08X1YQ2N9", "B0G5SWL84L", "B08QRKY3NJ", "B09GM8JZM9", "B0FFGYZZBT",
    "B0FGHLKZG5", "B0FDSC6XL6", "B09YKWCPSP", "B0DRVMWT9S", "B0GD8VN5WX",
    "B07H4V7M4C", "B09F36M2T5", "B0065ADP4C", "B0BLP58XZD", "B0D78PWJ4W",
    "B0BYDKKLWC", "B07MB5RY9N", "B0FVDR1XNC", "B0DT6ZPT5X", "B0DP2C2VWB",
    "B0CZDYF95R", "B0DQPGBNDP", "B0DKHCWJ5G", "0593750179", "B076KQHGC9",
    "B08SZLRC67", "B0CNSCVGPH", "B0CDQ1XH6W", "B0CL9SJ88Z", "B000A796WG",
    "B07SCL613T", "1680524771", "B00BBXEJ1Q", "B0DHZDZ1LQ", "B0F891S3KK",
    "B0GC95XM1H", "B0DSMHJ2FF", "1536210633", "B0B1S7BTJF", "B09MWJDC6C",
    "B0FPCY9C1H", "B07XMFVN95", "B0D2W5VW9V", "B098X8WS7Y", "B0DX78K8ZZ",
    "B0B316NPZ6", "B0CJXC7YTC", "B01BTUNHSQ", "B0CRYTJGZF", "B0DT25FYJZ",
    "B01NASH63G",
]);

function resolveOriginalProductImage(product: AffiliateProductSource) {
  if (product.imageLocal) {
    // imageLocal includes "images/" prefix (e.g. "images/baby-xxx.jpg")
    // IMAGES_ROOT in the API route already points to <cwd>/images, so strip it
    const filename = product.imageLocal.replace(/^images\//, "");
    return `/api/product-images/${filename}`;
  }

  return product.image;
}

function resolveProductImage(product: AffiliateProductSource) {
  if (generatedCoverAsins.has(product.asin)) {
    return `/api/product-images/product-covers/${product.asin}.jpg`;
  }

  return resolveOriginalProductImage(product);
}

export const PRODUCTS: Product[] = (affiliateProducts as AffiliateProductSource[])
  .filter((product) => product.status === "done" && product.affiliateLink && product.image)
  .map((product) => ({
    id: product.asin,
    image: resolveProductImage(product),
    originalImage: resolveOriginalProductImage(product),
    imageAlt: product.title,
    badge: "Affiliate Pick",
    category: normalizeSuggestionCategory(product.suggestion),
    name: product.title,
    link: product.affiliateLink,
    excerpt: buildExcerpt(product),
    highlights: buildHighlights(product),
    relatedBlogSlugs: buildRelatedBlogSlugs(product),
    relatedPins: buildRelatedPins(product),
  }));

export const FEATURED_PRODUCTS = PRODUCTS.slice(0, 6);

export function getAllProducts() {
  return PRODUCTS;
}

export function getFeaturedProducts() {
  return FEATURED_PRODUCTS;
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
