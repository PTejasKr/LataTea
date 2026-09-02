import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../../router/Router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { InquiryModal } from './InquiryModal';

// Pages
import { HomePage } from '../../pages/HomePage';
import { AboutPage } from '../../pages/AboutPage';
import { OurStoryPage } from '../../pages/OurStoryPage';
import { ProductsPage } from '../../pages/ProductsPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import { ContactPage } from '../../pages/ContactPage';

interface PublicWebsiteProps {
  isDraftPreview?: boolean;
}

export const PublicWebsite: React.FC<PublicWebsiteProps> = ({ isDraftPreview = false }) => {
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

    // 2. Story & Heritage
    if (path === '/about') {
      return <AboutPage />;
    }
    if (path === '/our-story' || path === '/story' || path === '/heritage') {
      return <OurStoryPage />;
    }

    // 3. Tea Collection & Stories
    if (path === '/products' || path === '/tea' || path === '/collection') {
      return <ProductsPage onOpenInquiry={handleOpenInquiry} />;
    }
    if (path.startsWith('/products/') || path.startsWith('/tea/')) {
      const slug = path.replace(/^\/(products|tea)\//, '');
      return <ProductDetailPage slug={slug} onOpenInquiry={handleOpenInquiry} />;
    }

    // 4. Contact & Inquiries
    if (path === '/contact' || path === '/samples' || path === '/inquiries') {
      return <ContactPage />;
    }

    // 5. Legal & Statutory
    if (path === '/privacy' || path === '/terms') {
      return (
        <div className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-8 sm:p-12 rounded-3xl border border-amber-200 shadow-xl space-y-6">
            <h1 className="font-rajwada text-3xl sm:text-4xl font-bold text-[#1E3F20]">
              {path === '/privacy' ? 'Privacy Policy & Data Protection' : 'Terms & Conditions of Commercial Engagement'}
            </h1>
            <div className="h-0.5 w-16 bg-lataamber-500" />
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              Purple Bean Agro Industries Private Limited operates under strict compliance with Indian food safety laws (FSSAI Lic: 11525996000709), fair trade, and corporate data confidentiality.
            </p>
            <p className="text-xs text-slate-500 font-sans">
              Registered Office: Office 12, Business Avenue, Aundh, Pune, Maharashtra 411012. For official correspondence, email info@latatea.com.
            </p>
          </div>
        </div>
      );
    }

    // Default fallback to HomePage
    return <HomePage onOpenInquiry={handleOpenInquiry} isDraftPreview={isDraftPreview} />;
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1A2416] flex flex-col font-sans selection:bg-lataamber-500 selection:text-white">
      {/* Editorial Sticky Navigation */}
      <Navbar onOpenInquiry={handleOpenInquiry} isDraftPreview={isDraftPreview} />

      {/* Main Page Body */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Corporate Compliance Minimal Footer */}
      <Footer />

      {/* Sample & Quote Inquiry Modal (No cart or checkout!) */}
      <InquiryModal
        isOpen={inquiryOpen}
        onClose={() => setInquiryOpen(false)}
        defaultProduct={selectedProductForInquiry}
      />
    </div>
  );
};
