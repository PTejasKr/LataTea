import React from 'react';
import { useRouter, Link } from '../../router/Router';
import { ArrowRight, Sparkles, Cpu, CheckCircle2 } from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

export const ProductWorldsSection: React.FC = () => {
  const { navigate } = useRouter();

  return (
    <section className="py-24 bg-[#FAF6EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-latagreen-100 text-[#1E3F20] text-xs font-bold uppercase tracking-widest mb-3 border border-latagreen-200">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>DISCOVER OUR 3 PRODUCT WORLDS</span>
          </div>
          <h2 className="font-rajwada text-3xl sm:text-5xl font-black text-[#1E3F20] tracking-tight">
            Crafted for Every Palate & Commercial Environment
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 font-sans">
            From wholesome unrefined jaggery chai to luxurious wedding basundi and high-speed automatic vending premixes.
          </p>
        </div>

        {/* 3 Large Editorial World Compositions */}
        <div className="space-y-12">
          
          {/* World 1: Gud Tea Range */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-[#173119] to-[#1E3F20] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-amber-400/30 overflow-hidden relative">
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-lataleaf-500/20 text-lataleaf-300 border border-lataleaf-500/40 text-xs font-bold uppercase tracking-wider">
                <TeaLeafIcon className="w-3.5 h-3.5" />
                <span>100% Organic Desi Jaggery</span>
              </div>
              <h3 className="font-rajwada text-3xl sm:text-4xl font-black text-amber-200 leading-tight">
                Gud Tea Range — The Wholesome Caramel Nectar
              </h3>
              <p className="text-slate-200 font-light text-base sm:text-lg leading-relaxed font-sans">
                Sweetened purely with micro-granulated organic jaggery. Delivers a deep, comforting caramel warmth with zero refined sugar and a proprietary non-acidic formulation that never curdles boiling milk.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-100">
                  <CheckCircle2 className="w-4 h-4 text-lataleaf-400 shrink-0" />
                  <span>Rich in Natural Minerals & Iron</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-100">
                  <CheckCircle2 className="w-4 h-4 text-lataleaf-400 shrink-0" />
                  <span>Basundi & Sunthi Ginger Infusions</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/products/gud-tea"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-xl hover:scale-105 transition-all"
                >
                  <span>Explore Gud Range</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 aspect-video lg:aspect-square">
                <img
                  src="/assets/images/royal_tea_bowl.jpg"
                  alt="Gud Basundi Tea with Spices in Carved Bowl"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-black border border-amber-400/40">
                  16g • 160g • 1kg
                </div>
              </div>
            </div>
          </div>

          {/* World 2: Sugar Tea Range */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-[#241709] to-[#3a250e] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-amber-400/30 overflow-hidden relative">
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 aspect-video lg:aspect-square">
                <img
                  src="/assets/images/hero_tea_panoramic.png"
                  alt="Sugar Basundi Royal Spices and Brass Glass"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-amber-300 text-xs font-black border border-amber-400/40">
                  Royal Hospitality
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Royal Maharashtrian Heritage</span>
              </div>
              <h3 className="font-rajwada text-3xl sm:text-4xl font-black text-amber-200 leading-tight">
                Sugar Tea Range — Creamy Royal Basundi & Kadak Spices
              </h3>
              <p className="text-slate-200 font-light text-base sm:text-lg leading-relaxed font-sans">
                Captures the decadent slow-simmered richness of festive Rabdi and Basundi, accented with fragrant Malabar green cardamom and royal saffron notes for celebratory occasions.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-100">
                  <CheckCircle2 className="w-4 h-4 text-lataamber-400 shrink-0" />
                  <span>Slow-Thickened Milk Mouthfeel</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-100">
                  <CheckCircle2 className="w-4 h-4 text-lataamber-400 shrink-0" />
                  <span>Kadak 5-Spice Bouquet</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/products/sugar-tea"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-xl hover:scale-105 transition-all"
                >
                  <span>Explore Sugar Range</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* World 3: Vending Premixes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-gradient-to-r from-[#11241a] to-[#163325] rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-amber-400/30 overflow-hidden relative">
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/40 text-xs font-bold uppercase tracking-wider">
                <Cpu className="w-3.5 h-3.5" />
                <span>3-in-1 Instant Vending Automation</span>
              </div>
              <h3 className="font-rajwada text-3xl sm:text-4xl font-black text-amber-200 leading-tight">
                Vending Premixes — 10-Second High-Volume Flow
              </h3>
              <p className="text-slate-200 font-light text-base sm:text-lg leading-relaxed font-sans">
                Engineered specifically for corporate pantries, transit hubs, and vending route operators. Free-flowing anti-caking granules dispense a velvety, steaming cup in seconds with zero nozzle blockages.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-amber-100">
                  <CheckCircle2 className="w-4 h-4 text-lataleaf-400 shrink-0" />
                  <span>70–80 Cups Yield Per Kilogram</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-lataleaf-400">
                  <CheckCircle2 className="w-4 h-4 text-lataleaf-400 shrink-0" />
                  <span>Zero Mixing Bowl Clog Guarantee</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/products/premixes"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-xl hover:scale-105 transition-all"
                >
                  <span>Explore Vending Range</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-400/40 aspect-video lg:aspect-square bg-black/40">
                <img
                  src="/assets/images/royal_tea_bowl.jpg"
                  alt="Vending Machine Premix Granules"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-amber-400/30 text-xs text-amber-300 font-bold text-center">
                  1kg Commercial Packs & 10kg Master Cartons
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
