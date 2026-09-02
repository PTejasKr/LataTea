import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface BrandStorySectionProps {
  isDraftPreview?: boolean;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const story = state.content.story;

  const bowlImage = resolveSlotImage(story.imageSlotId || 'STORY_IMAGE_PRIMARY', false, isDraftPreview);

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#FAF6EE] text-[#1A2416]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Visual Showcase: Antique Copper Bowl */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-amber-900/10 aspect-[4/3] bg-white">
              <img
                src={bowlImage.url}
                alt={bowlImage.alt}
                style={bowlImage.style}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-bold tracking-[0.2em] text-amber-700 uppercase font-sans">
              {t(story.tagline)}
            </span>

            <h2 className="font-rajwada text-2xl sm:text-4xl font-bold text-[#1E3F20] leading-tight">
              {t(story.heading)}
            </h2>

            <p className="text-sm sm:text-base text-slate-800 font-serif leading-relaxed">
              {t(story.introduction)}
            </p>

            <div className="space-y-3 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
              {(story.paragraphs || []).map((p, idx) => (
                <p key={idx}>{t(p)}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-amber-900/10">
              <p className="font-rajwada text-base sm:text-lg text-amber-900 font-semibold italic">
                {t(story.quote)}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
