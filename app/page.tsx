import { Fragment } from "react";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import About from "@/components/sections/About";
import BlogGrid from "@/components/sections/BlogGrid";
import Values from "@/components/sections/Values";
import Newsletter from "@/components/sections/Newsletter";
import SocialFeed from "@/components/sections/SocialFeed";
import Footer from "@/components/layout/Footer";
import { getAllProducts } from "@/lib/constants";
import AdSenseFlashPanel from "@/components/ads/AdSenseFlashPanel";
import AdSenseScript from "@/components/ads/AdSenseScript";
import AdUnit from "@/components/ads/AdUnit";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import StaggerContainer from "@/components/animations/StaggerContainer";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <>
      <AdSenseScript />
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <AdSenseFlashPanel />
        <About />
        <section className="px-5 pb-4 md:pb-8">
          <div className="container-content">
            <AdUnit placement="home-feature" />
          </div>
        </section>
        <section id="products" className="section-padding">
          <div className="container-content">
            <SectionHeader
              caption="shop the catalog"
              title="Affiliate Product Library"
              subtitle={`All ${products.length} products from data/affiliate-products.json are loaded here on the home page.`}
            />

            <StaggerContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product, index) => (
                <Fragment key={product.id}>
                  {index === 8 ? (
                    <AdUnit
                      key="home-catalog-ad"
                      placement="home-catalog"
                      variant="native"
                      className="md:col-span-2"
                    />
                  ) : null}
                  <ProductCard product={product} />
                </Fragment>
              ))}
            </StaggerContainer>
          </div>
        </section>
        <BlogGrid />
        <section className="px-5 py-4 md:py-8">
          <div className="container-content">
            <AdUnit placement="home-journal" />
          </div>
        </section>
        <Values />
        <Newsletter />
        <SocialFeed />
      </main>
      <Footer />
    </>
  );
}
