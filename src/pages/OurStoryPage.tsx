import React from 'react';
import { useCMS } from '../context/CMSContext';
import { HeritageSection } from '../components/public/HeritageSection';
import { BrandStorySection } from '../components/public/BrandStorySection';

export const OurStoryPage: React.FC = () => {
  const { publishedState, t, language } = useCMS();
  const story = publishedState.content.story;

  return (
    <div className="pt-20 bg-[#F8FAF8] text-[#1A291B] min-h-screen">
      
      {/* Story Hero Header */}
      <section className="py-14 bg-[#1B4332] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#A5D6A7] uppercase block mb-1">
            {language === 'mr' ? 'आमची गोष्ट' : 'OUR STORY'}
          </span>
          <h1 className="font-rajwada text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t(story.heading)}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-sans max-w-xl mx-auto">
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
