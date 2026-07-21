import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FoundationHero } from "@/components/foundation/FoundationHero";
import {
  MissionBand,
  ProgramPillarsSection,
  WhereWeWorkPreview,
  TransparencyBand,
  FinalCTASection,
} from "@/components/foundation/HomeSections";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <FoundationHero />
        <MissionBand />
        <ProgramPillarsSection />
        <WhereWeWorkPreview />
        <TransparencyBand />
        <LegalSeparationStrip />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
