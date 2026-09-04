import React from 'react';
import { EditorialHero } from '../components/public/EditorialHero';
import { BrandStorySection } from '../components/public/BrandStorySection';
import { TeaStoryCollection } from '../components/public/TeaStoryCollection';
import { RegistrationAndContact } from '../components/public/RegistrationAndContact';

interface HomePageProps {
  onOpenInquiry: (teaSlug?: string) => void;
  isDraftPreview?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  return (
    <div className="space-y-0 animate-fade-in">
      {/* 01 — FULL SCREEN HERO */}
      <EditorialHero onOpenInquiry={() => onOpenInquiry()} isDraftPreview={isDraftPreview} />

      {/* 02 — BRAND STORY */}
      <BrandStorySection isDraftPreview={isDraftPreview} />

      {/* 04 — TEA CATALOGUE */}
      <TeaStoryCollection onOpenInquiry={onOpenInquiry} isDraftPreview={isDraftPreview} />

      {/* 05 — HEAD OFFICE & WHATSAPP ENQUIRY */}
      <RegistrationAndContact isDraftPreview={isDraftPreview} />
    </div>
  );
};
