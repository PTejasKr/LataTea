import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowDown } from 'lucide-react';
import { Link } from '../../router/Router';

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
    <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-brand-primary-dark text-white">
      {/* Background Image with slow scale animation */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={bg.url}
          alt={bg.alt}
          style={bg.style}
          className="w-full h-full object-cover filter brightness-[0.6] contrast-[1.1] animate-slow-scale origin-center"
          loading="eager"
          decoding="async"
        />
        {/* Subtle gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/60" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center animate-fade-in-up">
        <span className="text-xs font-sans font-bold tracking-[0.3em] text-brand-accent uppercase mb-4 opacity-90">
          {t(hero.tagline)}
        </span>

        <h1 className="font-rajwada text-fluid-5xl font-bold tracking-tight text-white leading-[1.1] drop-shadow-lg mb-6">
          {t(hero.headline)}
        </h1>

        <p className="mt-4 text-fluid-lg text-slate-200 max-w-2xl font-sans font-medium leading-relaxed drop-shadow-md">
          {t(hero.subheadline)}
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <Link
            to="/products"
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-brand-accent hover:bg-brand-accent-hover text-white text-sm font-bold uppercase tracking-wider transition-all shadow-md inline-flex items-center justify-center gap-2"
          >
            <span>{t('Explore Tea Catalogue')}</span>
          </Link>
          <a
            href="#story"
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-transparent border-2 border-white hover:bg-white hover:text-brand-primary text-white text-sm font-bold uppercase tracking-wider transition-all inline-flex items-center justify-center gap-2"
          >
            <span>{t('Our Story')}</span>
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
