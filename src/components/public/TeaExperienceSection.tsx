import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface TeaExperienceSectionProps {
  isDraftPreview?: boolean;
}

export const TeaExperienceSection: React.FC<TeaExperienceSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const exp = state.content.experience;

  const teaVisual = resolveSlotImage(exp.imageSlotId || 'STORY_IMAGE_PRIMARY', false, isDraftPreview);

  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#142615] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-black/50 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>{t(exp.tagline)}</span>
          </div>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-bold text-amber-50 tracking-tight leading-tight">
            {t(exp.heading)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans font-light leading-relaxed">
            {t(exp.subheading)}
          </p>
        </div>

        {/* Sensory Chronicle Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <p className="text-lg sm:text-xl font-serif text-amber-200/90 leading-relaxed font-light">
              {t(exp.sensoryDescription)}
            </p>

            <div className="space-y-4 pt-4">
              {(exp.ritualSteps || []).map((step, idx) => (
                <div 
                  key={idx} 
                  className="p-5 rounded-2xl bg-black/40 border border-amber-400/20 hover:border-amber-400/40 transition-colors"
                >
                  <span className="font-rajwada text-lg font-bold text-amber-300 block mb-1">
                    0{idx + 1}. {t(step.title)}
                  </span>
                  <span className="text-xs sm:text-sm text-slate-300 font-sans font-light leading-relaxed block">
                    {t(step.note)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden aspect-square shadow-2xl border-2 border-amber-400/30">
              <img
                src={teaVisual.url}
                alt={teaVisual.alt}
                style={teaVisual.style}
                className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          </div>

        </div>

      </div>
    </section>
  );
};
