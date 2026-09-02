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
    <section id="craft" className="py-14 sm:py-20 bg-[#F8FAF8] text-[#1A291B]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#F89E22] uppercase block mb-1">
            {t(craft.tagline)}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-[#1B4332] tracking-tight">
            {t(craft.heading)}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#5A6B5C] font-sans">
            {t(craft.subheading)}
          </p>
        </div>

        {/* 5-Step Process Sequence */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-5">
          {(craft.stages || []).map((stage) => {
            const stageImage = resolveSlotImage(stage.imageSlotId, false, isDraftPreview);

            return (
              <div
                key={stage.stageNumber}
                className="bg-white rounded-xl p-4 border border-[#E2ECE3] shadow-xs flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="rounded-lg overflow-hidden aspect-[4/3] bg-[#EBF5EC] mb-2.5">
                    <img
                      src={stageImage.url}
                      alt={stageImage.alt}
                      style={stageImage.style}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <span className="text-[10px] font-mono text-[#F89E22] font-bold uppercase block mb-1">
                    {t(stage.tagline)}
                  </span>
                  
                  <h3 className="font-rajwada text-sm sm:text-base font-bold text-[#1B4332] leading-snug mb-1">
                    {t(stage.title)}
                  </h3>

                  <p className="text-[11px] sm:text-xs text-[#5A6B5C] font-sans leading-relaxed">
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

