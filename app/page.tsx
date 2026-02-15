import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import TrustBar from "@/components/sections/TrustBar";
import About from "@/components/sections/About";
import ProductCarousel from "@/components/sections/ProductCarousel";
import BlogGrid from "@/components/sections/BlogGrid";
import Values from "@/components/sections/Values";
import Newsletter from "@/components/sections/Newsletter";
import SocialFeed from "@/components/sections/SocialFeed";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <About />
        <ProductCarousel />
        <BlogGrid />
        <Values />
        <Newsletter />
        <SocialFeed />
      </main>
      <Footer />
    </>
  );
}
