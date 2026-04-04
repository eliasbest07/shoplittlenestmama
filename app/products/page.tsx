import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ui/ProductCard";
import SectionHeader from "@/components/ui/SectionHeader";
import StaggerContainer from "@/components/animations/StaggerContainer";
import { getAllProducts } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse the complete LittleNestMama affiliate product catalog, with product detail pages and direct referral links.",
};

export default function ProductsListingPage() {
  const products = getAllProducts();

  return (
    <>
      <Navbar />
      <main className="pt-[72px]">
        <section className="section-padding">
          <div className="container-content">
            <SectionHeader
              caption="shop the catalog"
              title="Affiliate Product Library"
              subtitle={`All ${products.length} products from the imported catalog, each with its own internal detail page before the external Amazon link.`}
            />

            <StaggerContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </StaggerContainer>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
