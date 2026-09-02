import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface BrandStorySectionProps {
  isDraftPreview?: boolean;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const story = state.content.story;

  const bowlImage = resolveSlotImage(story.imageSlotId || 'STORY_IMAGE_PRIMARY', false, isDraftPreview);

  return (
    <section id="story" className="py-24 sm:py-32 bg-[#FAF6EE] text-[#1A2416] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-lataamber-600 uppercase mb-3 font-sans">
            <TeaLeafIcon className="w-3.5 h-3.5 text-lataleaf-600" />
            <span>{t(story.tagline)}</span>
          </div>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3F20] tracking-tight leading-tight">
            {t(story.heading)}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 font-sans font-light leading-relaxed">
            {t(story.subheading)}
          </p>
        </div>

        {/* Editorial Split Grid: Visual on Left, Narrative on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase: Antique Copper Bowl with Spoon */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src={bowlImage.url}
                alt={bowlImage.alt}
                style={bowlImage.style}
                className="w-full h-full object-cover transform hover:scale-103 transition-transform duration-700"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              
              {/* Subtle caption tag */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-amber-200/60 shadow-lg text-xs font-sans text-slate-800">
                <span className="font-bold text-[#1E3F20] block">
                  Master Spiced Jaggery Formulation
                </span>
                <span className="text-slate-600 text-[11px] font-light">
                  Carved copper vessel honoring Maharashtra festive Basundi tradition.
                </span>
              </div>
            </div>

            {/* Decorative background aura */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-amber-400/10 -z-10 blur-3xl pointer-events-none" />
          </div>

          {/* Editorial Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-lg sm:text-xl font-serif text-[#1E3F20] font-medium leading-relaxed">
              {t(story.introduction)}
            </p>

            <div className="space-y-4 text-sm sm:text-base text-slate-700 font-sans font-light leading-relaxed">
              {(story.paragraphs || []).map((p, idx) => (
                <p key={idx}>{t(p)}</p>
              ))}
            </div>

            {/* Pull Quote */}
            <div className="pt-6 border-t border-amber-900/15">
              <blockquote className="font-rajwada text-xl sm:text-2xl text-lataamber-700 font-semibold italic leading-snug">
                {t(story.quote)}
              </blockquote>
              <div className="mt-2 text-xs font-sans font-bold uppercase tracking-widest text-slate-500">
                — LataTea Master Tea Artisans
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
