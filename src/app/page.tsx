import Hero from "@/components/Hero";
import MarketSection from "@/components/MarketSection";
import SpeakersSection from "@/components/SpeakersSection";
import ThemesSection from "@/components/ThemesSection";
import HappeningsSection from "@/components/HappeningsSection";
import SponsorsSection from "@/components/SponsorsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
export default function Home() {
  return (
    <main>
      <Hero />
      <AboutSection />
      <SpeakersSection />
      <MarketSection />
      <ThemesSection />
      <HappeningsSection />
      <SponsorsSection />
      <TestimonialsSection />
    </main>
  );
}
