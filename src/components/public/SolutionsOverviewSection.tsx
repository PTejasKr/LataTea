import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { useRouter, Link } from '../../router/Router';
import { 
  Building2, 
  Hotel, 
  Utensils, 
  Coffee, 
  Store, 
  Cpu, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface SolutionsOverviewSectionProps {
  onOpenInquiry?: (productName?: string) => void;
}

export const SolutionsOverviewSection: React.FC<SolutionsOverviewSectionProps> = ({ onOpenInquiry }) => {
  const { publishedState } = useCMS();
  const solutions = (publishedState.solutions || []).filter(s => s.isEnabled);

  const iconMap: Record<string, React.ReactNode> = {
    corporate: <Building2 className="w-6 h-6 text-lataamber-500" />,
    hotels: <Hotel className="w-6 h-6 text-lataleaf-500" />,
    restaurants: <Utensils className="w-6 h-6 text-lataamber-500" />,
    cafes: <Coffee className="w-6 h-6 text-lataleaf-500" />,
    retail: <Store className="w-6 h-6 text-lataamber-500" />,
    vending: <Cpu className="w-6 h-6 text-lataleaf-500" />
  };

  return (
    <section className="py-24 bg-[#142615] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>COMMERCIAL & B2B TAILORED SOLUTIONS</span>
          </div>
          <h2 className="font-rajwada text-3xl sm:text-5xl font-black text-amber-100 tracking-tight">
            Engineered for High-Volume Excellence
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans font-light">
            Whether you operate a 500-room luxury hotel, an IT park pantry, or a regional supermarket chain, LataTea delivers unmatched consistency and profitability.
          </p>
        </div>

        {/* 6 Industry Solution Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map(sol => (
            <div
              key={sol.id}
              className="p-8 rounded-3xl bg-black/40 border border-amber-400/20 hover:border-amber-400/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 shadow-2xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-amber-400/30 group-hover:bg-amber-500/20 transition-colors">
                    {iconMap[sol.slug] || <Building2 className="w-6 h-6 text-amber-400" />}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-lataleaf-500/20 text-lataleaf-300 border border-lataleaf-500/40">
                    {sol.tagline.split(' ')[0]}
                  </span>
                </div>

                <h3 className="font-royal font-bold text-xl text-amber-200 mb-2 group-hover:text-amber-300 transition-colors">
                  {sol.title}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans font-light mb-6">
                  {sol.subtitle}
                </p>

                <div className="space-y-2 mb-6 border-t border-white/10 pt-4">
                  {sol.benefits.slice(0, 2).map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-amber-100 font-medium">
                      <ShieldCheck className="w-3.5 h-3.5 text-lataleaf-400 shrink-0" />
                      <span>{b.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-amber-400/20 flex items-center justify-between">
                <Link
                  to={`/solutions/${sol.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-white uppercase tracking-wider transition-colors"
                >
                  <span>Explore Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  type="button"
                  onClick={() => onOpenInquiry && onOpenInquiry(sol.title)}
                  className="text-xs text-slate-300 hover:text-amber-300 underline underline-offset-4"
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
