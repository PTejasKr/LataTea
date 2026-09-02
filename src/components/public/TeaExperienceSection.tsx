import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface TeaExperienceSectionProps {
  isDraftPreview?: boolean;
}

export const TeaExperienceSection: React.FC<TeaExperienceSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const exp = state.content.experience;

  return (
    <section id="experience" className="py-14 sm:py-16 bg-[#142615] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <span className="text-[10px] font-sans font-semibold tracking-[0.25em] text-amber-400 uppercase">
          {t(exp.tagline)}
        </span>

        <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-white max-w-xl mx-auto leading-tight">
          {t(exp.heading)}
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 font-sans max-w-lg mx-auto leading-relaxed">
          {t(exp.sensoryDescription)}
        </p>

        {/* 3 Simple sensory pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left max-w-3xl mx-auto">
          {(exp.ritualSteps || []).map((step, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-xs font-bold text-amber-300 uppercase block font-serif">
                {t(step.title)}
              </span>
              <span className="text-xs text-slate-300 font-sans block leading-relaxed">
                {t(step.note)}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
