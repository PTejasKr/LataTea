import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight } from 'lucide-react';

interface EditorialHeroProps {
  onOpenInquiry?: () => void;
  isDraftPreview?: boolean;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const hero = state.content.hero;

  const bg = resolveSlotImage('HOME_HERO_PRIMARY', false, isDraftPreview);

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#142615] text-white">
      {/* Background Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg.url}
          alt={bg.alt}
          style={bg.style}
          className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.05]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#142615] via-[#142615]/40 to-[#142615]/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center flex flex-col items-center">
        
        <span className="text-[11px] font-sans font-semibold tracking-[0.25em] text-amber-400 uppercase mb-4">
          {t(hero.tagline)}
        </span>

        <h1 className="font-rajwada text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight max-w-3xl">
          {t(hero.headline)}
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-200 max-w-xl font-sans font-light leading-relaxed">
          {t(hero.subheadline)}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
          <a
            href={hero.primaryCtaLink || '#tea'}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
          >
            <span>{t(hero.primaryCtaText)}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={hero.secondaryCtaLink || '#story'}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-all border border-white/20"
          >
            <span>{t(hero.secondaryCtaText)}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
