import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight } from 'lucide-react';

interface EditorialHeroProps {
  onOpenInquiry?: () => void;
  isDraftPreview?: boolean;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, t, language } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const hero = state.content.hero;

  const bg = resolveSlotImage('HOME_HERO_PRIMARY', false, isDraftPreview);

  return (
    <section className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden bg-[#1B4332] text-white">
      {/* Visual Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg.url}
          alt={bg.alt}
          style={bg.style}
          className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.05]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] via-[#1B4332]/40 to-[#1B4332]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center flex flex-col items-center">
        
        <span className="text-xs font-semibold tracking-[0.2em] text-[#A5D6A7] uppercase mb-3">
          {t(hero.tagline)}
        </span>

        <h1 className="font-rajwada text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight max-w-3xl">
          {t(hero.headline)}
        </h1>

        <p className="mt-3 text-sm sm:text-base md:text-lg text-slate-100 max-w-xl font-sans font-normal leading-relaxed">
          {t(hero.subheadline)}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-7">
          <a
            href="#tea"
            className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-[#4CAF50] hover:bg-[#43A047] text-white text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <span>{language === 'mr' ? 'आमचे चहा पहा →' : 'Explore Our Teas →'}</span>
          </a>

          <a
            href="#story"
            className="w-full sm:w-auto px-6 py-2.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition-colors border border-white/30"
          >
            <span>{t(hero.secondaryCtaText)}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
