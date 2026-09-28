import React, { useState, Suspense, lazy } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useRouter } from '../../router/Router';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { InquiryModal } from './InquiryModal';

// Keep HomePage in primary bundle for instantaneous first paint
import { HomePage } from '../../pages/HomePage';

// Lazy-load sub-routes on demand to keep initial bundle ultra-lean on slow 3G/4G
const AboutPage = lazy(() => import('../../pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProductsPage = lazy(() => import('../../pages/ProductsPage').then(m => ({ default: m.ProductsPage })));
const ProductDetailPage = lazy(() => import('../../pages/ProductDetailPage').then(m => ({ default: m.ProductDetailPage })));
const ContactPage = lazy(() => import('../../pages/ContactPage').then(m => ({ default: m.ContactPage })));
const ProcessPage = lazy(() => import('../../pages/ProcessPage').then(m => ({ default: m.ProcessPage })));

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

    // 2. About Us
    if (path === '/about' || path === '/our-story' || path === '/story' || path === '/heritage') {
      return <AboutPage />;
    }

    // 2.5 Process
    if (path === '/process') {
      return <ProcessPage />;
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
        <div className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#E2ECE3] shadow-xs space-y-4">
            <h1 className="font-rajwada text-pub-section font-bold text-[#1B4332]">
              {path === '/privacy' ? 'Privacy Policy & Data Protection' : 'Terms & Conditions'}
            </h1>
            <div className="h-0.5 w-12 bg-[#2E7D32]" />
            <p className="text-sm text-slate-700 leading-relaxed font-sans">
              We operate under strict compliance with Indian food safety laws (FSSAI Lic: 11525996000709), fair trade, and corporate data confidentiality.
            </p>
            <p className="text-xs text-slate-500 font-sans">
              Lata Private Limited. For official correspondence, email info@latatea.com.
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
        <Suspense fallback={
          <div className="min-h-[40vh] flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border-2 border-brand-accent border-t-transparent animate-spin" />
          </div>
        }>
          {renderActivePage()}
        </Suspense>
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

