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
        return 'w-full h-full rounded-xl border border-slate-700 shadow-2xl';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col font-sans">
      {/* Top Preview Control Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 px-6 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
          <h2 className="text-sm font-bold text-white tracking-wider font-serif">
            Live Draft Preview Canvas
          </h2>
          <span className="text-[11px] font-mono text-slate-400 px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700">
            Unpublished Edits
          </span>
        </div>

        {/* Device Switcher & Language Switcher */}
        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="flex items-center p-0.5 rounded-xl bg-slate-800 border border-slate-700 text-xs">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'mr' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
              }`}
            >
              मराठी
            </button>
          </div>

          {/* Device Toggles */}
          <div className="flex items-center bg-slate-800 p-1 rounded-xl border border-slate-700 gap-1">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`p-1.5 rounded-lg transition-colors ${
                previewDevice === 'desktop' ? 'bg-slate-700 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop View"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('tablet')}
              className={`p-1.5 rounded-lg transition-colors ${
                previewDevice === 'tablet' ? 'bg-slate-700 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet View (iPad)"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`p-1.5 rounded-lg transition-colors ${
                previewDevice === 'mobile' ? 'bg-slate-700 text-amber-300' : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile View (iPhone)"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
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
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5"
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
            className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
              hasDraftChanges
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Publish Draft</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
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
