import React from 'react';
import { useRouter, Link } from '../../router/Router';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

export const StoryTeaserSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#112213] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest">
              <TeaLeafIcon className="w-3.5 h-3.5" />
              <span>THE HERITAGE OF LATA TEA</span>
            </div>

            <h2 className="font-rajwada text-3xl sm:text-5xl font-black text-amber-100 tracking-tight leading-tight">
              Honoring India’s Rich Jaggery Tea Traditions
            </h2>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed font-sans">
              From the lush riverbanks of Assam to the spice bazaars of Malabar, we source uncompromised botanicals to craft an authentic, home-style chai experience for the modern world.
            </p>

            <div className="pt-2">
              <Link
                to="/our-story"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-2xl hover:scale-105 transition-all"
              >
                <span>Read Full Brand Journey</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 aspect-video lg:aspect-4/3">
              <img
                src="/assets/images/hero_tea_panoramic.png"
                alt="Lata Tea Master Spices and Indian Heritage"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-8">
                <div className="text-sm font-royal text-amber-200">
                  "Purity in every grain. Warmth in every cup."
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
