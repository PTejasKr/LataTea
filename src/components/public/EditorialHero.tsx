import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

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
    <section className="relative min-h-[92vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#142615] text-white">
      {/* Editorial Panoramic Photography with subtle dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg.url}
          alt={bg.alt}
          style={bg.style}
          className="w-full h-full object-cover scale-105 animate-fade-in filter brightness-[0.75] contrast-[1.05]"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#142615] via-[#142615]/50 to-[#142615]/75" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 text-center flex flex-col items-center">
        
        {/* Subtle Category Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-amber-400/40 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-6 backdrop-blur-sm animate-fade-in">
          <TeaLeafIcon className="w-3.5 h-3.5" />
          <span>{t(hero.tagline)}</span>
        </div>

        {/* Large Statement Headline (Display Serif / Devanagari) */}
        <h1 className="font-rajwada text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-amber-50 leading-[1.15] max-w-4xl text-balance">
          {t(hero.headline)}
        </h1>

        {/* Golden Editorial Divider */}
        <div className="flex items-center justify-center gap-3 my-6 sm:my-8">
          <div className="h-px w-12 sm:w-20 bg-amber-400/60" />
          <div className="w-2 h-2 rotate-45 bg-amber-400" />
          <div className="h-px w-12 sm:w-20 bg-amber-400/60" />
        </div>

        {/* Subheadline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-200/90 max-w-2xl font-sans font-light leading-relaxed text-balance">
          {t(hero.subheadline)}
        </p>

        {/* Restrained CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-10">
          <a
            href={hero.primaryCtaLink || '#story'}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl transition-all hover:scale-102 flex items-center justify-center gap-2"
          >
            <span>{t(hero.primaryCtaText)}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={hero.secondaryCtaLink || '#tea'}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-black/40 hover:bg-black/60 border border-amber-400/40 hover:border-amber-300 text-amber-200 text-xs font-bold uppercase tracking-widest transition-all backdrop-blur-sm"
          >
            <span>{t(hero.secondaryCtaText)}</span>
          </a>
        </div>

        {/* Subtle Scroll Hint */}
        <div className="mt-16 sm:mt-24 flex flex-col items-center gap-2 text-amber-300/60 text-[11px] font-sans tracking-widest uppercase">
          <span>{language === 'mr' ? 'खाली स्क्रोल करा' : 'Scroll to explore'}</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </div>

      </div>
    </section>
  );
};
