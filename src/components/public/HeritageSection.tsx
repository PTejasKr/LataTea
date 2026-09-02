import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface HeritageSectionProps {
  isDraftPreview?: boolean;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const heritage = state.content.heritage;

  const bgImage = resolveSlotImage(heritage.imageSlotId || 'HERITAGE_IMAGE', false, isDraftPreview);

  return (
    <section id="heritage" className="py-24 sm:py-32 bg-[#162D18] text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          src={bgImage.url}
          alt={bgImage.alt}
          style={bgImage.style}
          className="w-full h-full object-cover filter grayscale"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#162D18] via-[#162D18]/90 to-[#162D18]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/40 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>{t(heritage.tagline)}</span>
          </div>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50 tracking-tight">
            {t(heritage.heading)}
          </h2>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-0.5 w-12 bg-amber-400" />
            <div className="w-2 h-2 rotate-45 bg-amber-400" />
            <div className="h-0.5 w-12 bg-amber-400" />
          </div>
          <p className="text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            {t(heritage.subheading)}
          </p>
        </div>

        {/* Typographic Milestone Cards (CCL-Style Large Numbers & Spacing) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {(heritage.milestones || []).map((m, idx) => (
            <div
              key={idx}
              className="bg-black/40 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-amber-400/20 hover:border-amber-400/50 transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="font-rajwada text-4xl sm:text-5xl font-bold text-amber-400/90 tracking-wider mb-4">
                  {m.year}
                </div>
                <h3 className="font-rajwada text-2xl font-bold text-white mb-3">
                  {t(m.title)}
                </h3>
                <p className="text-sm text-slate-300 font-sans font-light leading-relaxed">
                  {t(m.description)}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-amber-300/80 font-mono">
                <span>STAGE 0{idx + 1}</span>
                <span>•</span>
                <span>AUTHENTIC HERITAGE</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
