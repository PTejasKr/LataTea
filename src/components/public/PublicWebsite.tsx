import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../../router/Router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { InquiryModal } from './InquiryModal';
import { CartDrawer } from './CartDrawer';
import { CheckoutModal } from './CheckoutModal';

// Pages
import { HomePage } from '../../pages/HomePage';
import { AboutPage } from '../../pages/AboutPage';
import { OurStoryPage } from '../../pages/OurStoryPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { SolutionDetailPage } from '../../pages/SolutionDetailPage';
import { PreparationPage } from '../../pages/PreparationPage';
import { ContactPage } from '../../pages/ContactPage';
import { TrackPage } from '../../pages/TrackPage';

interface PublicWebsiteProps {
  isDraftPreview?: boolean;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const { path } = useRouter();

  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [selectedProductForInquiry, setSelectedProductForInquiry] = useState<string | undefined>(undefined);

  const handleOpenInquiry = (productName?: string) => {
    setSelectedProductForInquiry(productName);
    setInquiryOpen(true);
  };

  const renderActivePage = () => {
    // 1. Home
    if (path === '/' || path === '') {
      return <HomePage onOpenInquiry={handleOpenInquiry} isDraftPreview={isDraftPreview} />;
    }

    // 2. About & Story
    if (path === '/about') {
      return <AboutPage />;
    }
    if (path === '/our-story') {
      return <OurStoryPage />;
    }

    // 3. Category & Product Routes
    if (path === '/products/gud-tea') {
      return <ProductsPage initialCategory="gud" onOpenInquiry={handleOpenInquiry} />;
    }
    if (path === '/products/sugar-tea') {
      return <ProductsPage initialCategory="sugar" onOpenInquiry={handleOpenInquiry} />;
    }
    if (path === '/products/premixes') {
      return <ProductsPage initialCategory="vending" onOpenInquiry={handleOpenInquiry} />;
    }
    if (path === '/products') {
      return <ProductsPage initialCategory="all" onOpenInquiry={handleOpenInquiry} />;
    }
    if (path.startsWith('/products/')) {
      const slug = path.replace('/products/', '');
      return <ProductDetailPage slug={slug} onOpenInquiry={handleOpenInquiry} />;
    }

    // 4. Solutions Routes
    if (path.startsWith('/solutions/')) {
      const slug = path.replace('/solutions/', '');
      return <SolutionDetailPage slug={slug} onOpenInquiry={handleOpenInquiry} />;
    }
    if (path === '/solutions') {
      return <SolutionDetailPage slug="corporate" onOpenInquiry={handleOpenInquiry} />;
    }

    // 5. Preparation & Roadmap
    if (path === '/preparation') {
      return <PreparationPage onOpenInquiry={() => handleOpenInquiry()} />;
    }

    // 6. Track Consignment
    if (path === '/track') {
      return <TrackPage onOpenInquiry={() => handleOpenInquiry()} />;
    }

    // 7. Contact & Samples
    if (path === '/contact') {
      return <ContactPage />;
    }

    // Default fallback to HomePage
    return <HomePage onOpenInquiry={handleOpenInquiry} isDraftPreview={isDraftPreview} />;
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A2416] flex flex-col font-sans selection:bg-lataamber-500 selection:text-white">
      {/* Sticky Primary Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} isDraftPreview={isDraftPreview} />

      {/* Main Page Body */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Corporate Compliance Footer */}
      <Footer isDraftPreview={isDraftPreview} />

      {/* Interactive Cart Drawer */}
      <CartDrawer />

      {/* Checkout Modal */}
      <CheckoutModal />

      {/* Sample & Quote Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultProduct={selectedProductForInquiry}
      />
    </div>
  );
};
