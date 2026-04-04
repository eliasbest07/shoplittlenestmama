import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BlogCard from "@/components/ui/BlogCard";
import CategoryPill from "@/components/ui/CategoryPill";
import { SITE_NAME, SITE_URL, getAllProducts, getProductById } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) return {};

  return {
    title: product.name,
    description: product.excerpt ?? `Product details for ${product.name}`,
    openGraph: {
      title: product.name,
      description: product.excerpt ?? `Product details for ${product.name}`,
      type: "article",
      images: [{ url: product.image }],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((post) =>
    product.relatedBlogSlugs?.includes(post.slug)
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.excerpt,
    image: product.image,
    category: product.category,
    brand: SITE_NAME,
    url: `${SITE_URL}/products/${product.id}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding">
          <div className="container-content">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="panel-surface overflow-hidden p-4">
                <div className="relative aspect-square overflow-hidden rounded-[1.75rem]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="panel-surface flex flex-col justify-center p-8 md:p-10">
                <CategoryPill label={product.category} />
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.24em] text-sage">
                  product detail
                </p>
                <h1 className="mt-3 font-playfair text-[34px] font-semibold leading-tight text-earth md:text-[52px]">
                  {product.name}
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-mist md:text-lg">
                  {product.excerpt ??
                    "This product now has its own editorial detail page so you can attach supporting content before sending readers to the affiliate link."}
                </p>

                {product.highlights && product.highlights.length > 0 ? (
                  <div className="mt-8">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-earth">
                      Why it stands out
                    </h2>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-mist md:text-base">
                      {product.highlights.map((highlight) => (
                        <li key={highlight} className="rounded-2xl border border-[#ead8c4] bg-white/60 px-4 py-3">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Shop affiliate link
                  </a>
                  <Link href="/#products" className="btn-secondary">
                    Back to products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding pt-0">
          <div className="container-content grid gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div className="panel-muted p-8 md:p-10">
              <p className="eyebrow">editorial hub</p>
              <h2 className="mt-3 font-playfair text-[30px] font-semibold leading-tight text-earth md:text-[42px]">
                Content you can attach to this product
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">
                This section is intended for your product-specific material: Pinterest pins, short buying notes, comparison blurbs, or an embedded workflow that supports this item before the reader clicks out.
              </p>

              {product.relatedPins && product.relatedPins.length > 0 ? (
                <div className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-earth">
                    Pins
                  </h3>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {product.relatedPins.map((pin) => (
                      <a
                        key={pin.title}
                        href={pin.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[1.5rem] border border-[#ead8c4] bg-white/70 p-5 text-sm text-earth shadow-card transition-shadow hover:shadow-card-hover"
                      >
                        {pin.title}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="panel-muted p-8 md:p-10">
              <p className="eyebrow">linked stories</p>
              <h2 className="mt-3 font-playfair text-[30px] font-semibold leading-tight text-earth md:text-[42px]">
                Blog material for this article
              </h2>
              {relatedPosts.length > 0 ? (
                <div className="mt-6 grid gap-6">
                  {relatedPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-base leading-relaxed text-mist">
                  No blog posts are linked yet. Add slugs in `relatedBlogSlugs` for this product when you want supporting articles to appear here.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
