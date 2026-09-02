import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface HeritageSectionProps {
  isDraftPreview?: boolean;
}

export const HeritageSection: React.FC<HeritageSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const heritage = state.content.heritage;

  return (
    <section id="heritage" className="py-14 sm:py-18 bg-[#1B4332] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#A5D6A7] uppercase block mb-1">
            {t(heritage.tagline)}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {t(heritage.heading)}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-200 font-sans">
            {t(heritage.subheading)}
          </p>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {(heritage.milestones || []).map((m, idx) => (
            <div
              key={idx}
              className="bg-[#133023] rounded-xl p-5 border border-[#2D6A4F] flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-mono text-[#A5D6A7] font-bold uppercase tracking-wider block mb-1.5">
                  {m.year}
                </span>
                <h3 className="font-rajwada text-base font-bold text-white mb-1.5">
                  {t(m.title)}
                </h3>
                <p className="text-xs text-slate-300 font-sans leading-relaxed">
                  {t(m.description)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
