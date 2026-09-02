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
    <section id="heritage" className="py-16 sm:py-20 bg-[#162D18] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-amber-400 uppercase block mb-2">
            {t(heritage.tagline)}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-4xl font-bold text-white tracking-tight">
            {t(heritage.heading)}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
            {t(heritage.subheading)}
          </p>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(heritage.milestones || []).map((m, idx) => (
            <div
              key={idx}
              className="bg-black/30 rounded-2xl p-6 border border-white/10 flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="font-mono text-xs text-amber-400 uppercase tracking-wider block mb-2">
                  {m.year}
                </span>
                <h3 className="font-rajwada text-lg font-bold text-white mb-2">
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
