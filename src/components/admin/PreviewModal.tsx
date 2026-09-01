import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Navbar } from '../public/Navbar';
import { Hero } from '../public/Hero';
import { BrandTicker } from '../common/BrandTicker';
import { BrandStory } from '../public/BrandStory';
import { ProductCatalog } from '../public/ProductCatalog';
import { ApplicationsSection } from '../public/ApplicationsSection';
import { PreparationGuide } from '../public/PreparationGuide';
import { OrderingRoadmap } from '../public/OrderingRoadmap';
import { OrderTrackingSection } from '../public/OrderTrackingSection';
import { RegistrationAndContact } from '../public/RegistrationAndContact';
import { CtaSection } from '../public/CtaSection';
import { Footer } from '../public/Footer';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  X, 
  UploadCloud, 
  RefreshCw,
  RotateCcw
} from 'lucide-react';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPublish: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  onOpenPublish
}) => {
  const { 
    draftState, 
    previewDevice, 
    setPreviewDevice, 
    hasDraftChanges,
    discardDraft 
  } = useCMS();

  const [refreshKey, setRefreshKey] = useState(0);

  if (!isOpen) return null;

  const getContainerWidthClass = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'w-[375px] h-[720px] rounded-[40px] border-[12px] border-slate-800 shadow-2xl';
      case 'tablet':
        return 'w-[768px] h-[860px] rounded-[32px] border-[10px] border-slate-800 shadow-2xl';
      case 'desktop':
      default:
        return 'w-full h-full rounded-xl border border-slate-700 shadow-2xl';
    }
  };

  const sections = [...draftState.sections]
    .filter(s => s.isEnabled)
    .sort((a, b) => a.order - b.order);

  const renderSectionByKey = (key: string) => {
    switch (key) {
      case 'hero':
        return (
          <React.Fragment key="hero-preview-group">
            <Hero onOpenInquiry={() => {}} isDraftPreview={true} />
            <BrandTicker />
          </React.Fragment>
        );
      case 'about':
        return <BrandStory key="about" isDraftPreview={true} />;
      case 'products':
        return <ProductCatalog key="products" onOpenInquiry={() => {}} isDraftPreview={true} />;
      case 'applications':
        return <ApplicationsSection key="applications" onOpenInquiry={() => {}} isDraftPreview={true} />;
      case 'preparation':
        return <PreparationGuide key="preparation" isDraftPreview={true} />;
      case 'ordering':
        return <OrderingRoadmap key="ordering" onOpenInquiry={() => {}} isDraftPreview={true} />;
      case 'track':
        return <OrderTrackingSection key="track" />;
      case 'cta':
        return <CtaSection key="cta" onOpenInquiry={() => {}} isDraftPreview={true} />;
      case 'contact':
        return <RegistrationAndContact key="contact" isDraftPreview={true} />;
      case 'footer':
        return <Footer key="footer" isDraftPreview={true} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col font-sans">
      {/* Top Preview Control Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-white flex items-center gap-2">
            <span>Multi-Device Draft Simulator</span>
            {hasDraftChanges && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Draft Mode
              </span>
            )}
          </span>
        </div>

        {/* Viewport Selectors */}
        <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setPreviewDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              previewDevice === 'desktop'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </button>

          <button
            onClick={() => setPreviewDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              previewDevice === 'tablet'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Tablet</span>
          </button>

          <button
            onClick={() => setPreviewDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              previewDevice === 'mobile'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setRefreshKey(k => k + 1)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Reload Preview"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {hasDraftChanges && (
            <button
              onClick={() => {
                if (window.confirm('Discard draft modifications?')) {
                  discardDraft();
                  onClose();
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-semibold border border-rose-500/30 transition-colors flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard</span>
            </button>
          )}

          <button
            onClick={() => {
              onClose();
              onOpenPublish();
            }}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Frame Container */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-950">
        <div
          key={refreshKey}
          className={`${getContainerWidthClass()} bg-[#FAF6EE] text-[#1A2416] overflow-y-auto relative transition-all duration-300`}
        >
          {/* Mock Preview Content */}
          <div className="min-h-full flex flex-col pointer-events-auto">
            <Navbar onOpenInquiry={() => {}} isDraftPreview={true} />
            <div className="flex-grow">
              {sections.map(section => renderSectionByKey(section.key))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
