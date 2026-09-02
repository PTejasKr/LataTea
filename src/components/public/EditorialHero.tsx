import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowDown } from 'lucide-react';

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
    <section className="relative min-h-[45vh] sm:min-h-[55vh] flex items-center justify-center overflow-hidden bg-[#1B4332] text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg.url}
          alt={bg.alt}
          style={bg.style}
          className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.05]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332] via-[#1B4332]/40 to-[#1B4332]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center flex flex-col items-center">
        <span className="text-[10px] font-sans font-semibold tracking-[0.25em] text-[#A5D6A7] uppercase mb-2">
          {t(hero.tagline)}
        </span>

        <h1 className="font-rajwada text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
          {t(hero.headline)}
        </h1>

        <p className="mt-2 text-xs sm:text-sm text-slate-100 max-w-lg font-sans font-normal leading-relaxed">
          {t(hero.subheadline)}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <a
            href="#tea"
            className="px-5 py-2 rounded-md bg-[#4CAF50] hover:bg-[#43A047] text-white text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shadow-sm"
          >
            <span>{language === 'mr' ? 'सर्व उत्पादने पहा' : 'View Products'}</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
