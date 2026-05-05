import Hero from "@/components/Hero";
import MarketSection from "@/components/MarketSection";
import SpeakersSection from "@/components/SpeakersSection";
import ThemesSection from "@/components/ThemesSection";
import HappeningsSection from "@/components/HappeningsSection";
import SponsorsSection from "@/components/SponsorsSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { fetchSpeakers } from "@/lib/speakers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const speakers = await fetchSpeakers();
  const homeSpeakers = speakers.slice(0, 8);

  return (
    <main>
      <Hero />
      <AboutSection />
      <SpeakersSection speakers={homeSpeakers} />
      <MarketSection />
      <ThemesSection />
      <HappeningsSection />
      <SponsorsSection />
      <TestimonialsSection />
    </main>
  );
}
