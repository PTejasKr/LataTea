import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Link } from '../router/Router';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';
import { Sparkles, Heart, Compass, CheckCircle2 } from 'lucide-react';

export const OurStoryPage: React.FC = () => {
  const { publishedState } = useCMS();
  const story = publishedState.content.ourStory;

  return (
    <div className="pt-28 pb-20 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Story Hero Header */}
      <section className="relative py-24 bg-[#142615] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-35">
          <img
            src="/assets/images/hero_tea_panoramic.png"
            alt="Heritage Tea Harvest"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>THE HERITAGE OF LATA TEA</span>
          </div>
          <h1 className="font-rajwada text-4xl sm:text-6xl md:text-7xl font-black text-amber-100 tracking-tight leading-tight">
            {story.heroTitle || 'From the Spice Gardens to the Royal Cup'}
          </h1>
          <p className="mt-6 text-base sm:text-xl text-slate-200 font-light max-w-2xl mx-auto font-sans leading-relaxed">
            {story.heroSubtitle}
          </p>
        </div>
      </section>

      {/* Chapters of the Story */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Chapter 1: The Origins */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-lataamber-600 font-sans">
              CHAPTER 01 • THE GENESIS
            </span>
            <h2 className="font-rajwada text-3xl font-bold text-[#1E3F20]">
              The Sacred Ritual of Basundi Chai
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans font-light">
              {story.origins}
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3">
              <img
                src="/assets/images/royal_tea_bowl.jpg"
                alt="Carved Bowl with Spices"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Chapter 2: The Philosophy of Purity */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 order-2 md:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-4/3">
              <img
                src="/assets/images/hero_tea_panoramic.png"
                alt="Tea Leaves and Cardamom"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7 order-1 md:order-2 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-lataleaf-600 font-sans">
              CHAPTER 02 • UNCOMPROMISED PURITY
            </span>
            <h2 className="font-rajwada text-3xl font-bold text-[#1E3F20]">
              The Jaggery (Gud) Revolution
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans font-light">
              {story.philosophy}
            </p>
          </div>
        </div>

        {/* Chapter 3: Master Tea Craftsmanship */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#1A331C] text-white shadow-2xl border border-amber-400/30">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <TeaLeafIcon className="w-3.5 h-3.5" />
              <span>THE CRAFT</span>
            </div>
            <h2 className="font-rajwada text-3xl sm:text-4xl font-bold text-amber-100">
              Assam Harvest & Malabar Spices
            </h2>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans font-light">
              {story.craftAndSpices}
            </p>
            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-sans font-light">
              {story.modernStandards}
            </p>

            <div className="pt-6">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-xl hover:scale-105 transition-all"
              >
                <span>Taste Our Master Blends</span>
              </Link>
            </div>
          </div>
        </div>

      </section>

    </div>
  );
};
