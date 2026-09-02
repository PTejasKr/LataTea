import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';

interface EditorialHeroProps {
  onOpenInquiry?: () => void;
  isDraftPreview?: boolean;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({ 
  onOpenInquiry,
  isDraftPreview = false 
}) => {
  const { publishedState, draftState, resolveSlotImage, t, language } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const hero = state.content.hero;

  const bg = resolveSlotImage('HOME_HERO_PRIMARY', false, isDraftPreview);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#0C1A0D] text-white">
      {/* Live Full-Screen Atmospheric Background Photo (Optimized for Phones & PC) */}
      <div className="absolute inset-0 z-0">
        <img
          src={bg.url || '/assets/images/hero_tea_panoramic.png'}
          alt={bg.alt || 'Lata Tea Royal Basundi Chai'}
          style={bg.style}
          className="w-full h-full object-cover object-center sm:object-[center_35%] filter brightness-[0.55] contrast-[1.08] transition-opacity duration-700"
          loading="eager"
          decoding="async"
        />
        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C1A0D] via-[#0C1A0D]/50 to-[#0C1A0D]/75" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0C1A0D]/30 to-[#0C1A0D]/80" />
      </div>

      {/* Main Content Hero */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-36 text-center flex flex-col items-center">
        
        {/* Accent Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1B4332]/80 border border-[#F89E22]/40 backdrop-blur-xs mb-5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-[#F89E22]" />
          <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-wider text-[#F89E22] uppercase">
            {language === 'mr' 
              ? 'अस्सल चव • पारंपारिक वारसा • ३ मिनिटांत तयार'
              : 'Assam CTC • Kolhapur Jaggery • Ready in 3 Min'}
          </span>
        </div>

        {/* Majestic Royal Headline */}
        <h1 className="font-rajwada text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.18] max-w-4xl drop-shadow-md">
          {language === 'mr' 
            ? 'जिथे राजेशाही भारतीय परंपरा आणि अस्सल गुळाची कला एकत्र येते'
            : (t(hero.headline) || 'Where Royal Indian Tradition Meets Pure Jaggery Craft')}
        </h1>

        {/* Descriptive Subtitle */}
        <p className="mt-4 text-xs sm:text-base md:text-lg text-slate-200/90 max-w-2xl font-sans font-normal leading-relaxed drop-shadow-xs">
          {language === 'mr'
            ? 'लता टी: आसामच्या उत्कृष्ट बागांतील पाने आणि १००% नैसर्गिक सेंद्रिय गुळाने तयार केलेला मखमली बासुंदी चहा. अवघ्या ३ मिनिटांत अनुभवा राजेशाही आस्वाद.'
            : (t(hero.subheadline) || 'Lata Tea blends the strength of upper Assam CTC harvest with purest unadulterated Kolhapur cane jaggery. Boil without curdling in just 3 minutes.')}
        </p>

        {/* Interactive Action Buttons with Sole Accent #F89E22 */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
          <a
            href="#tea"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#F89E22] hover:bg-[#E08A15] text-[#0C1A0D] text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-200 inline-flex items-center justify-center gap-2 shadow-xl hover:scale-103 cursor-pointer"
          >
            <span>{language === 'mr' ? 'आमची चहा जाणून घ्या' : 'Explore Tea Catalogue'}</span>
            <ArrowRight className="w-4 h-4 text-[#0C1A0D]" />
          </a>

          <a
            href="#process"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 text-xs sm:text-sm font-bold uppercase tracking-wider backdrop-blur-xs transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{language === 'mr' ? 'ऑर्डर प्रक्रिया पहा' : 'Ordering Process'}</span>
          </a>
        </div>

        {/* Scroll Down Cue */}
        <a
          href="#tea"
          className="mt-14 inline-flex flex-col items-center gap-1 text-slate-300 hover:text-[#F89E22] transition-colors group cursor-pointer"
        >
          <span className="text-[10px] uppercase font-sans tracking-widest text-slate-300/80 group-hover:text-[#F89E22]">
            {language === 'mr' ? 'खाली स्क्रोल करा' : 'Scroll Down'}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#F89E22]" />
        </a>

      </div>
    </section>
  );
};
