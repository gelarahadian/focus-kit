import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navigation from "@/components/landing/Navigation";
import Pricing from "@/components/landing/Pricing";

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Features />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
