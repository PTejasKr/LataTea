import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight, ShieldCheck, Clock, Award, ShoppingBag, Truck } from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface HeroProps {
  onOpenInquiry: (productName?: string) => void;
  isDraftPreview?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const hero = state.content.hero;
  
  const heroBg = resolveSlotImage('HOME_HERO_PRIMARY', false, isDraftPreview);
  const heroImgUrl = heroBg.url || '/assets/images/hero_tea_panoramic.png';

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#1A1108]">
      {/* High-Resolution Heritage Hero Photograph - Clearly Visible */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImgUrl}
          alt="Lata Tea Panoramic Spices and Royal Bowl"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-center scale-100"
        />
        {/* Soft Warm Radial Vignette to keep photograph clear while enhancing text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/75" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        
        {/* Royal Rajwada Golden Crest Pill with Leaf */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 shadow-2xl animate-fade-in">
          <TeaLeafIcon className="w-4 h-4" />
          <span>{hero.tagline || 'AUTHENTIC TASTE • CONSISTENT QUALITY • INSTANT CONVENIENCE'}</span>
        </div>

        {/* Grand Rajwada Headline */}
        <h1 className="font-rajwada text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[1.08] text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)] max-w-5xl mx-auto">
          {hero.headline}
        </h1>

        {/* Royal Ornate Gold Divider */}
        <div className="flex items-center justify-center gap-3 my-6">
          <div className="h-0.5 w-24 bg-gradient-to-r from-transparent to-amber-400" />
          <div className="w-3.5 h-3.5 rotate-45 bg-amber-400 border border-white shadow-md" />
          <div className="h-0.5 w-24 bg-gradient-to-l from-transparent to-amber-400" />
        </div>

        {/* Subheadline */}
        <p className="font-sans text-lg sm:text-2xl font-light text-amber-50 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {hero.subheadline}
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-2xl hover:scale-105 transition-all duration-200"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{hero.ctaPrimaryText || 'Explore Products & Buy'}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#track-order"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest bg-black/60 hover:bg-black/80 text-amber-300 backdrop-blur-md border border-amber-400/50 hover:border-amber-400 shadow-xl hover:scale-105 transition-all duration-200"
          >
            <Truck className="w-4 h-4 text-lataamber-400" />
            <span>Track Consignment</span>
          </a>
        </div>

        {/* Floating Pillars Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-400/30 text-left flex items-center gap-3.5 hover:bg-black/70 transition-colors shadow-xl">
            <div className="p-2.5 rounded-xl bg-lataamber-500/20 text-lataamber-400 border border-lataamber-500/40">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider font-royal">Pure Indian Jaggery</div>
              <div className="text-xs text-slate-200 font-light font-sans">Organic Gud & Royal Spices</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-400/30 text-left flex items-center gap-3.5 hover:bg-black/70 transition-colors shadow-xl">
            <div className="p-2.5 rounded-xl bg-lataleaf-500/20 text-lataleaf-400 border border-lataleaf-500/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider font-royal">Hygienic Cleanroom</div>
              <div className="text-xs text-slate-200 font-light font-sans">ISO & FSSAI Certified Formulation</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-amber-400/30 text-left flex items-center gap-3.5 hover:bg-black/70 transition-colors shadow-xl">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300 uppercase tracking-wider font-royal">Instant Convenience</div>
              <div className="text-xs text-slate-200 font-light font-sans">Velvety Chai Ready in 2-3 Mins</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
