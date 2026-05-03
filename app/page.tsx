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
import ProductCard from "@/components/ui/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import StaggerContainer from "@/components/animations/StaggerContainer";

export default function HomePage() {
  const products = getAllProducts();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <section id="products" className="section-padding">
          <div className="container-content">
            <SectionHeader
              caption="shop the catalog"
              title="Affiliate Product Library"
              subtitle={`All ${products.length} products from data/affiliate-products.json are loaded here on the home page.`}
            />

            <StaggerContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </StaggerContainer>
          </div>
        </section>
        <BlogGrid />
        <Values />
        <Newsletter />
        <SocialFeed />
      </main>
      <Footer />
    </>
  );
}
