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
import { DeliveryModelSection } from "@/components/foundation/DeliveryModelSection";
import {
  ResourcefulnessEcosystemSection,
  ImplementationPartnerSection,
} from "@/components/foundation/PitchSections";
import { HomeStorySection } from "@/components/foundation/HomeStorySection";
import { LegalSeparationStrip } from "@/components/foundation/LegalSeparationStrip";

import { Seo } from "@/components/Seo";
import { foundation } from "@/config/foundation";

const Index = () => {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: foundation.legalName,
    alternateName: "AlikoHub Foundation",
    url: "/",
    description: foundation.mission,
    areaServed: foundation.primaryLocations,
    email: foundation.contactEmail,
    knowsAbout: [
      "Education",
      "Workforce Development",
      "Public Health",
      "Water Sanitation and Hygiene",
      "Clean Energy",
      "Community Resilience",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: foundation.legalName,
    url: "/",
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${foundation.legalName} — Resourcefulness into lasting opportunity`}
        description={foundation.mission}
        path="/"
        jsonLd={[orgSchema, websiteSchema]}
      />
      <Navbar />
      <main>
        <FoundationHero />
        <MissionBand />
        <ResourcefulnessEcosystemSection />
        <ScaleOfTheGapSection />
        <SystemicBarriersSection />
        <CurrentApproachesGapSection />
        <SystemicSolutionsBand />
        <SolutionPositioningSection />
        <SevenPrioritiesSection />
        <DeliveryModelSection />
        <OperationalizingFlowSection />
        <ImplementationPartnerSection />
        <WhyDifferentSection />
        <ProgramPillarsSection />
        <WhereWeWorkPreview />
        <PartnershipModelComparisonSection />
        <WhyPartnershipSection />
        <TransparencyBand />
        <LegalSeparationStrip />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
