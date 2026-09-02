import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaLeafIcon } from '../common/TeaLeafIcon';
import { Sparkles, Check } from 'lucide-react';

interface CraftSectionProps {
  isDraftPreview?: boolean;
}

export const CraftSection: React.FC<CraftSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const craft = state.content.craft;

  return (
    <section id="craft" className="py-24 sm:py-32 bg-[#FAF6EE] text-[#1A2416] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-lataamber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <TeaLeafIcon className="w-3.5 h-3.5 text-lataleaf-600" />
            <span>{t(craft.tagline)}</span>
          </div>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3F20] tracking-tight">
            {t(craft.heading)}
          </h2>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-0.5 w-12 bg-lataamber-500" />
            <div className="w-2 h-2 rotate-45 bg-lataamber-500" />
            <div className="h-0.5 w-12 bg-lataamber-500" />
          </div>
          <p className="text-base sm:text-lg text-slate-700 font-sans font-light leading-relaxed">
            {t(craft.subheading)}
          </p>
        </div>

        {/* 5-Stage Editorial Sequence */}
        <div className="space-y-12 sm:space-y-16">
          {(craft.stages || []).map((stage, idx) => {
            const stageImage = resolveSlotImage(stage.imageSlotId, false, isDraftPreview);
            const isEven = idx % 2 === 1;

            return (
              <div
                key={stage.stageNumber}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center p-8 sm:p-12 rounded-3xl bg-white border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Visual Frame */}
                <div className={`lg:col-span-6 relative ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="rounded-2xl overflow-hidden aspect-[16/10] shadow-lg border border-amber-100">
                    <img
                      src={stageImage.url}
                      alt={stageImage.alt}
                      style={stageImage.style}
                      className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-[#162D18]/90 text-amber-300 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold border border-amber-400/30">
                    {t(stage.tagline)}
                  </div>
                </div>

                {/* Narrative Detail */}
                <div className={`lg:col-span-6 space-y-4 ${isEven ? 'lg:order-1' : ''}`}>
                  <span className="text-xs font-bold uppercase tracking-widest text-lataamber-600 block font-sans">
                    STAGE 0{stage.stageNumber} OF 05
                  </span>
                  
                  <h3 className="font-rajwada text-2xl sm:text-3xl font-bold text-[#1E3F20] leading-tight">
                    {t(stage.title)}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-700 font-sans font-light leading-relaxed">
                    {t(stage.description)}
                  </p>

                  {/* Bullet Highlights */}
                  {stage.keyDetails && stage.keyDetails.length > 0 && (
                    <div className="pt-4 border-t border-amber-100 flex flex-wrap gap-4">
                      {stage.keyDetails.map((detail, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs font-semibold text-slate-800 bg-[#FAF6EE] px-3 py-1.5 rounded-xl border border-amber-200/60">
                          <Check className="w-3.5 h-3.5 text-lataleaf-600" />
                          <span>{t(detail)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
