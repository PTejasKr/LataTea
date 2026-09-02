import React from 'react';
import { EditorialHero } from '../components/public/EditorialHero';
import { TeaStoryCollection } from '../components/public/TeaStoryCollection';
import { WhyLataSection } from '../components/public/WhyLataSection';
import { OrderingRoadmap } from '../components/public/OrderingRoadmap';
import { RegistrationAndContact } from '../components/public/RegistrationAndContact';

interface HomePageProps {
  onOpenInquiry: (teaSlug?: string) => void;
  isDraftPreview?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  return (
    <div className="space-y-0 animate-fade-in">
      {/* 01 — COMPACT HERO */}
      <EditorialHero onOpenInquiry={() => onOpenInquiry()} isDraftPreview={isDraftPreview} />

      {/* 02 — 4-BLOCK MYNTRA-STYLE PRODUCT LISTING (Zero excessive scrolling!) */}
      <TeaStoryCollection onOpenInquiry={onOpenInquiry} isDraftPreview={isDraftPreview} />

      {/* 03 — WHY LATA TEA (Compact 4-point visual standards) */}
      <WhyLataSection isDraftPreview={isDraftPreview} />

      {/* 04 — ORDER TO DELIVERY PROCESS */}
      <OrderingRoadmap />

      {/* 05 — DIRECT STATUTORY & WHATSAPP ENQUIRY */}
      <RegistrationAndContact isDraftPreview={isDraftPreview} />
    </div>
  );
};
