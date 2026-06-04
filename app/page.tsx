import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import CategoriesSection from "@/components/CategoriesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060E18]">
      <HeroSection />
      <MissionSection />
      <CategoriesSection />
      <HowItWorksSection />
      <GallerySection />
      <ContactSection />
      <Footer />
    </main>
  );
}
