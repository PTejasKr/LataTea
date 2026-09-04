import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Navbar } from '../public/Navbar';
import { EditorialHero } from '../public/EditorialHero';
import { TeaStoryCollection } from '../public/TeaStoryCollection';
import { WhyLataSection } from '../public/WhyLataSection';
import { RegistrationAndContact } from '../public/RegistrationAndContact';
import { Footer } from '../public/Footer';
import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  X, 
  UploadCloud, 
  RefreshCw,
  RotateCcw,
  Globe
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
    previewDevice, 
    setPreviewDevice, 
    hasDraftChanges,
    discardDraft,
    language,
    setLanguage 
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
        return 'w-full h-full rounded-sm border border-[#222] shadow-2xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col font-sans">
      {/* Top Preview Control Bar */}
      <header className="h-16 bg-[#0a0a0a] border-b border-slate-800 px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-sm bg-white text-black animate-pulse" />
          <h2 className="text-cms-body font-bold text-white tracking-wider font-serif">
            Live Draft Preview Canvas
          </h2>
          <span className="text-cms-small font-mono text-neutral-400 px-2.5 py-0.5 rounded-sm bg-[#111111] border border-[#222]">
            Unpublished Edits
          </span>
        </div>

        {/* Device Switcher & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center p-0.5 rounded-sm bg-[#111111] border border-[#222] text-cms-small">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-sm transition-all ${
                language === 'en' ? 'bg-white text-black font-bold' : 'text-neutral-400'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 rounded-sm transition-all ${
                language === 'mr' ? 'bg-white text-black font-bold' : 'text-neutral-400'
              }`}
            >
              मराठी
            </button>
          </div>

          {/* Device Toggles */}
          <div className="flex items-center bg-[#111111] p-1 rounded-sm border border-[#222] gap-1">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-sm transition-colors ${
                previewDevice === 'desktop' ? 'bg-[#222222] text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('tablet')}
              className={`p-1.5 rounded-sm transition-colors ${
                previewDevice === 'tablet' ? 'bg-[#222222] text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Tablet View (iPad)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-sm transition-colors ${
                previewDevice === 'mobile' ? 'bg-[#222222] text-white' : 'text-neutral-400 hover:text-white'
              }`}
              title="Mobile View (iPhone)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="p-2 rounded-sm bg-[#111111] hover:bg-[#222222] text-neutral-400 hover:text-white border border-[#222] transition-colors"
            title="Force Re-render Canvas"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {hasDraftChanges && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Discard draft and exit preview?')) {
                  discardDraft();
                  onClose();
                }
              }}
              className="px-3 py-1.5 rounded-sm text-cms-btn bg-neutral-800 text-white/20 text-white border border-[#333] flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Discard</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPublish();
            }}
            disabled={!hasDraftChanges}
            className={`px-4 py-1.5 rounded-sm text-cms-small font-bold flex items-center gap-1.5 ${
              hasDraftChanges
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-[#222222] text-neutral-400 cursor-not-allowed'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Publish Draft</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-sm text-neutral-400 hover:text-white hover:bg-[#111111] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Sandbox Frame */}
      <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-950">
        <div
          key={refreshKey}
          className={`${getContainerWidthClass()} bg-[#FAF6EE] text-[#1A2416] overflow-y-auto relative transition-all duration-300 select-none`}
        >
          {/* Mock Public Top Navigation */}
          <Navbar isDraftPreview={true} />

          {/* Streamlined Homepage Canvas */}
          <div className="space-y-0">
            <EditorialHero isDraftPreview={true} />
            <TeaStoryCollection isDraftPreview={true} />
            <WhyLataSection isDraftPreview={true} />
            <RegistrationAndContact isDraftPreview={true} />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};


