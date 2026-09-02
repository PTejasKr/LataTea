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
    <section id="story" className="py-14 sm:py-20 bg-brand-background text-brand-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          
          {/* Visual: Antique Copper Bowl / Spices */}
          <div className="md:col-span-5">
            <div className="rounded-xl overflow-hidden shadow-sm border border-brand-border aspect-[4/3] bg-brand-surface">
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

          {/* Narrative: 2-3 short, clear blocks */}
          <div className="md:col-span-7 space-y-3">
            <span className="text-pub-small font-bold tracking-widest text-brand-accent uppercase font-sans">
              {t(story.tagline)}
            </span>

            <h2 className="font-rajwada text-pub-section font-bold text-brand-primary-dark leading-snug">
              {t(story.heading)}
            </h2>

            <p className="text-pub-body text-brand-primary font-medium leading-relaxed">
              {t(story.introduction)}
            </p>

            <div className="space-y-2 text-pub-body text-brand-text-muted font-sans leading-relaxed">
              {(story.paragraphs || []).map((p, idx) => (
                <p key={idx}>{t(p)}</p>
              ))}
            </div>

            <div className="pt-3 border-t border-brand-border">
              <p className="text-pub-body text-brand-accent font-semibold italic">
                {t(story.quote)}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};


