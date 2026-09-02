import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Link } from '../router/Router';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';
import { HeritageSection } from '../components/public/HeritageSection';
import { BrandStorySection } from '../components/public/BrandStorySection';

export const OurStoryPage: React.FC = () => {
  const { publishedState, t, language } = useCMS();
  const story = publishedState.content.story;

  return (
    <div className="pt-24 pb-20 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Story Hero Header */}
      <section className="relative py-24 bg-[#142615] text-white overflow-hidden text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'आमचा वारसा' : 'OUR HERITAGE & STORY'}</span>
          </div>
          <h1 className="font-rajwada text-4xl sm:text-6xl md:text-7xl font-black text-amber-100 tracking-tight leading-tight">
            {t(story.heading)}
          </h1>
          <p className="mt-6 text-base sm:text-xl text-slate-200 font-light max-w-2xl mx-auto font-sans leading-relaxed">
            {t(story.subheading)}
          </p>
        </div>
      </section>

      {/* Brand Story Editorial */}
      <BrandStorySection />

      {/* Heritage Chronology */}
      <HeritageSection />

    </div>
  );
};
