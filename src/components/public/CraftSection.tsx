import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface CraftSectionProps {
  isDraftPreview?: boolean;
}

export const CraftSection: React.FC<CraftSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const craft = state.content.craft;

  return (
    <section id="craft" className="py-16 sm:py-24 bg-[#FAF6EE] text-[#1A2416]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-amber-700 uppercase block mb-2">
            {t(craft.tagline)}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-4xl font-bold text-[#1E3F20] tracking-tight">
            {t(craft.heading)}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            {t(craft.subheading)}
          </p>
        </div>

        {/* 5-Step Process Sequence */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {(craft.stages || []).map((stage) => {
            const stageImage = resolveSlotImage(stage.imageSlotId, false, isDraftPreview);

            return (
              <div
                key={stage.stageNumber}
                className="bg-white rounded-2xl p-5 border border-amber-900/10 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="rounded-xl overflow-hidden aspect-[4/3] bg-amber-50 mb-3 border border-amber-100">
                    <img
                      src={stageImage.url}
                      alt={stageImage.alt}
                      style={stageImage.style}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <span className="text-[10px] font-mono text-amber-700 font-bold uppercase block mb-1">
                    {t(stage.tagline)}
                  </span>
                  
                  <h3 className="font-rajwada text-base font-bold text-[#1E3F20] leading-snug mb-2">
                    {t(stage.title)}
                  </h3>

                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    {t(stage.description)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
