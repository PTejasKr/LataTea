import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface WhyLataSectionProps {
  isDraftPreview?: boolean;
}

export const WhyLataSection: React.FC<WhyLataSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const why = state.content.whyLata;

  return (
    <section className="py-16 sm:py-20 bg-[#FAF6EE] text-[#1A2416] border-t border-amber-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-amber-700 uppercase block mb-2">
            {t(why.tagline)}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-4xl font-bold text-[#1E3F20] tracking-tight">
            {t(why.heading)}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            {t(why.subheading)}
          </p>
        </div>

        {/* 4 Clean Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(why.pillars || []).map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-amber-900/10 shadow-sm flex flex-col justify-between space-y-3"
            >
              <div>
                {pillar.metric && (
                  <span className="font-mono text-xs font-bold text-amber-700 block mb-1">
                    {pillar.metric}
                  </span>
                )}

                <h3 className="font-rajwada text-base font-bold text-[#1E3F20] mb-2">
                  {t(pillar.title)}
                </h3>

                <p className="text-xs text-slate-600 font-sans leading-relaxed">
                  {t(pillar.description)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
