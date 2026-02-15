"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ValueCard from "@/components/ui/ValueCard";
import StaggerContainer from "@/components/animations/StaggerContainer";
import { VALUE_CARDS } from "@/lib/constants";

export default function Values() {
  return (
    <section id="values" className="section-padding bg-sage-soft">
      <div className="container-content">
        <SectionHeader
          caption="why trust us"
          title="Our Values"
          subtitle="What guides every recommendation we make."
        />

        {/* Desktop: 3x2 grid, Mobile: horizontal snap-scroll */}
        <div className="hidden md:block">
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {VALUE_CARDS.map((card) => (
              <ValueCard key={card.title} card={card} />
            ))}
          </StaggerContainer>
        </div>

        {/* Mobile horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {VALUE_CARDS.map((card) => (
            <div key={card.title} className="min-w-[280px] snap-center">
              <ValueCard card={card} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
