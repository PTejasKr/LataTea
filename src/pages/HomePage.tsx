import React from 'react';
import { EditorialHero } from '../components/public/EditorialHero';
import { BrandStorySection } from '../components/public/BrandStorySection';
import { HeritageSection } from '../components/public/HeritageSection';
import { CraftSection } from '../components/public/CraftSection';
import { TeaStoryCollection } from '../components/public/TeaStoryCollection';
import { TeaExperienceSection } from '../components/public/TeaExperienceSection';
import { WhyLataSection } from '../components/public/WhyLataSection';
import { BrandStatementSection } from '../components/public/BrandStatementSection';
import { RegistrationAndContact } from '../components/public/RegistrationAndContact';

interface HomePageProps {
  onOpenInquiry: (teaSlug?: string) => void;
  isDraftPreview?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  return (
    <div className="space-y-0 animate-fade-in">
      {/* 01 — HERO */}
      <EditorialHero onOpenInquiry={() => onOpenInquiry()} isDraftPreview={isDraftPreview} />

      {/* 02 — THE STORY */}
      <BrandStorySection isDraftPreview={isDraftPreview} />

      {/* 03 — HERITAGE */}
      <HeritageSection isDraftPreview={isDraftPreview} />

      {/* 04 — THE CRAFT (5 Stages: Source, Select, Blend, Prepare, Experience) */}
      <CraftSection isDraftPreview={isDraftPreview} />

      {/* 05 — TEA STORIES (Editorial Collection) */}
      <TeaStoryCollection onOpenInquiry={onOpenInquiry} isDraftPreview={isDraftPreview} />

      {/* 06 — THE EXPERIENCE */}
      <TeaExperienceSection isDraftPreview={isDraftPreview} />

      {/* 08 — WHY LATA TEA */}
      <WhyLataSection isDraftPreview={isDraftPreview} />

      {/* 09 — CONTACT & STATUTORY VERIFICATION */}
      <RegistrationAndContact isDraftPreview={isDraftPreview} />

      {/* 10 — FINAL BRAND STATEMENT */}
      <BrandStatementSection isDraftPreview={isDraftPreview} />
    </div>
  );
};
