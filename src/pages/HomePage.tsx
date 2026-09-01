import React from 'react';
import { Hero } from '../components/public/Hero';
import { BrandTicker } from '../components/common/BrandTicker';
import { PromiseSection } from '../components/public/PromiseSection';
import { BrandStory } from '../components/public/BrandStory';
import { ProductWorldsSection } from '../components/public/ProductWorldsSection';
import { ProductCatalog } from '../components/public/ProductCatalog';
import { SolutionsOverviewSection } from '../components/public/SolutionsOverviewSection';
import { PreparationGuide } from '../components/public/PreparationGuide';
import { StoryTeaserSection } from '../components/public/StoryTeaserSection';
import { OrderTrackingSection } from '../components/public/OrderTrackingSection';
import { CtaSection } from '../components/public/CtaSection';

interface HomePageProps {
  onOpenInquiry: (productName?: string) => void;
  isDraftPreview?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  return (
    <div className="space-y-0 animate-fade-in">
      {/* 01 — Hero (3-Minute Proposition & Panoramic Visual) */}
      <Hero onOpenInquiry={onOpenInquiry} isDraftPreview={isDraftPreview} />

      {/* Brand Marquee Ticker */}
      <BrandTicker />

      {/* 02 — The Lata Promise */}
      <PromiseSection isDraftPreview={isDraftPreview} />

      {/* 03 — Why Choose Lata */}
      <BrandStory isDraftPreview={isDraftPreview} />

      {/* 04 — Product Worlds */}
      <ProductWorldsSection />

      {/* 05 — Signature Products Spotlight */}
      <ProductCatalog onOpenInquiry={onOpenInquiry} isDraftPreview={isDraftPreview} />

      {/* 06 — Business Solutions Overview */}
      <SolutionsOverviewSection onOpenInquiry={onOpenInquiry} />

      {/* 07 — 3-Minute Preparation */}
      <PreparationGuide isDraftPreview={isDraftPreview} />

      {/* 08 — Our Story Teaser */}
      <StoryTeaserSection />

      {/* 09 — Universal Order Tracking Portal */}
      <OrderTrackingSection />

      {/* 10 — Conversion & Sample Request Banner */}
      <CtaSection onOpenInquiry={() => onOpenInquiry()} isDraftPreview={isDraftPreview} />
    </div>
  );
};
