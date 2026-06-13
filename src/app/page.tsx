import React from "react";
import Hero from "@/components/blocks/Hero";
import ServicesOverview from "@/components/blocks/ServicesOverview";
import KitBuilderPreview from "@/components/blocks/KitBuilderPreview";
import Industries from "@/components/blocks/Industries";
import Stats from "@/components/blocks/Stats";
import FeaturedProjects from "@/components/blocks/FeaturedProjects";
import CTA from "@/components/blocks/CTA";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-x-hidden pt-20">
      <Hero />
      <ServicesOverview />
      <KitBuilderPreview />
      <Industries />
      <Stats />
      <FeaturedProjects />
      <CTA />
    </div>
  );
}
