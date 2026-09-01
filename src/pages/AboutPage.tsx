import React from 'react';
import { useCMS } from '../context/CMSContext';
import { useRouter, Link } from '../router/Router';
import { ShieldCheck, Award, Leaf, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';

export const AboutPage: React.FC = () => {
  const { publishedState } = useCMS();
  const contact = publishedState.contact;

  return (
    <div className="pt-28 pb-20 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Page Hero Header */}
      <section className="relative py-20 bg-[#162E18] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <img
            src="/assets/images/hero_tea_panoramic.png"
            alt="Lata Tea Heritage"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>ABOUT LATA TEA</span>
          </div>
          <h1 className="font-rajwada text-4xl sm:text-6xl font-black text-amber-100 tracking-tight leading-tight">
            Pioneering the Future of Indian Tea & Basundi Premixes
          </h1>
          <p className="mt-6 text-base sm:text-xl text-slate-200 font-light max-w-3xl mx-auto font-sans leading-relaxed">
            Manufactured with pride by Purple Bean Agro Industries Private Limited in Pune, Maharashtra.
          </p>
        </div>
      </section>

      {/* Corporate Purpose & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-lataamber-600 font-sans">
              OUR MISSION & PURPOSE
            </span>
            <h2 className="font-rajwada text-3xl sm:text-4xl font-black text-[#1E3F20] leading-tight">
              To Deliver Unadulterated, Royal Chai in Every Cup
            </h2>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans font-light">
              LataTea was established to solve a pressing consumer need: giving tea lovers, restaurants, and corporate workplaces instant access to the wholesome goodness of slow-cooked Indian jaggery tea without hours of laborious preparation or milk curdling issues.
            </p>
            <p className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans font-light">
              By combining artisanal culinary wisdom with state-of-the-art climate-controlled cleanroom manufacturing, we ensure that every single sachet, pouch, and vending carton delivers uniform perfection.
            </p>

            <div className="pt-4 border-t border-amber-900/10 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-sm">
                <div className="text-2xl font-black font-rajwada text-[#1E3F20]">500+</div>
                <div className="text-xs text-slate-600 mt-1 font-sans">Corporate & Retail Partners</div>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-amber-100 shadow-sm">
                <div className="text-2xl font-black font-rajwada text-[#1E3F20]">100%</div>
                <div className="text-xs text-slate-600 mt-1 font-sans">Pure Organic Jaggery Range</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-square">
              <img
                src="/assets/images/royal_tea_bowl.jpg"
                alt="Master Ground Tea and Spices"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Manufacturing & Cleanroom Standards */}
      <section className="py-20 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-lataleaf-600 font-sans">
              HYGIENE & INFRASTRUCTURE
            </span>
            <h2 className="font-rajwada text-3xl sm:text-4xl font-black text-[#1E3F20] mt-2">
              ISO & FSSAI Certified Cleanroom Formulation
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#FAF6EE] border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3.5 rounded-2xl bg-lataleaf-500/20 text-lataleaf-600 w-fit mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-royal text-lg font-bold text-[#1E3F20] mb-2">
                Climate-Controlled Cleanroom
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Formulated under HEPA-filtered cleanroom conditions with temperature and relative humidity precision to preserve natural essential oils.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF6EE] border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3.5 rounded-2xl bg-lataamber-500/20 text-lataamber-600 w-fit mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-royal text-lg font-bold text-[#1E3F20] mb-2">
                Nitrogen-Flushed Barrier Foil
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                Multi-layer food-grade aluminum barrier pouches protect against oxygen and moisture, delivering 12-month ambient freshness with zero preservatives.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#FAF6EE] border border-amber-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="p-3.5 rounded-2xl bg-blue-500/20 text-blue-600 w-fit mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="font-royal text-lg font-bold text-[#1E3F20] mb-2">
                Ethical Direct Sourcing
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                We partner with certified organic jaggery cane crushers and high-elevation Assam tea gardens, ensuring fair compensation and environmental stewardship.
              </p>
            </div>
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-[#1E3F20] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-royal text-xl font-bold text-amber-300">
                Experience LataTea for Your Enterprise
              </h4>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 font-sans">
                Request a comprehensive trial sample kit for your office pantry, restaurant, or hotel.
              </p>
            </div>
            <Link
              to="/contact"
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-xl hover:scale-105 transition-all shrink-0"
            >
              Contact Corporate Sales
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
