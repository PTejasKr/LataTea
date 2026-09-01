import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { BrandTicker } from '../common/BrandTicker';
import { BrandStory } from './BrandStory';
import { ProductCatalog } from './ProductCatalog';
import { ApplicationsSection } from './ApplicationsSection';
import { PreparationGuide } from './PreparationGuide';
import { OrderingRoadmap } from './OrderingRoadmap';
import { OrderTrackingSection } from './OrderTrackingSection';
import { RegistrationAndContact } from './RegistrationAndContact';
import { CtaSection } from './CtaSection';
import { Footer } from './Footer';
import { InquiryModal } from './InquiryModal';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';

interface PublicWebsiteProps {
  isDraftPreview?: boolean;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (productName?: string) => {
    setSelectedProductForInquiry(productName);
    setInquiryOpen(true);
  };

  const sections = [...state.sections]
    .filter(s => s.isEnabled)
    .sort((a, b) => a.order - b.order);

  const renderSectionByKey = (key: string) => {
    switch (key) {
      case 'hero':
        return (
          <React.Fragment key="hero-group">
            <Hero onOpenInquiry={handleOpenInquiry} isDraftPreview={isDraftPreview} />
            <BrandTicker />
          </React.Fragment>
        );
      case 'about':
        return <BrandStory key="about" isDraftPreview={isDraftPreview} />;
      case 'products':
        return <ProductCatalog key="products" onOpenInquiry={handleOpenInquiry} isDraftPreview={isDraftPreview} />;
      case 'applications':
        return <ApplicationsSection key="applications" onOpenInquiry={handleOpenInquiry} isDraftPreview={isDraftPreview} />;
      case 'preparation':
        return <PreparationGuide key="preparation" isDraftPreview={isDraftPreview} />;
      case 'ordering':
        return <OrderingRoadmap key="ordering" onOpenInquiry={() => handleOpenInquiry()} isDraftPreview={isDraftPreview} />;
      case 'track':
        return <OrderTrackingSection key="track" />;
      case 'cta':
        return <CtaSection key="cta" onOpenInquiry={() => handleOpenInquiry()} isDraftPreview={isDraftPreview} />;
      case 'contact':
        return <RegistrationAndContact key="contact" isDraftPreview={isDraftPreview} />;
      case 'footer':
        return <Footer key="footer" isDraftPreview={isDraftPreview} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A2416] flex flex-col font-sans selection:bg-lataamber-500 selection:text-white">
      {/* Sticky Navigation Header */}
      <Navbar onOpenInquiry={handleOpenInquiry} isDraftPreview={isDraftPreview} />

      {/* Main Homepage Dynamic Sections */}
      <main className="flex-grow">
        {sections.map(section => renderSectionByKey(section.key))}
      </main>

      {/* Interactive Cart Drawer */}
      <CartDrawer />

      {/* Complete Checkout Modal */}
      <CheckoutModal />

      {/* Wholesale & Sample Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultProduct={selectedProductForInquiry}
      />
    </div>
  );
};
