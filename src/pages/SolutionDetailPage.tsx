import React from 'react';
import { useCMS } from '../context/CMSContext';
import { useRouter, Link } from '../router/Router';
import { 
  Building2, 
  Hotel, 
  Utensils, 
  Coffee, 
  Store, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  TrendingUp,
  Clock,
  Mail,
  ShoppingBag
} from 'lucide-react';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';

interface SolutionDetailPageProps {
  slug: string;
  onOpenInquiry: (productName?: string) => void;
}

export const SolutionDetailPage: React.FC<SolutionDetailPageProps> = ({ slug, onOpenInquiry }) => {
  const { publishedState } = useCMS();
  const solution = publishedState.solutions.find(s => s.slug === slug) || publishedState.solutions[0];

  if (!solution) {
    return (
      <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Solution Not Found</h2>
        <Link to="/" className="mt-4 inline-block text-amber-600 font-bold">
          ← Return to Home
        </Link>
      </div>
    );
  }

  const recommendedProducts = publishedState.products.filter(p => 
    solution.recommendedProductIds.includes(p.id)
  );

  return (
    <div className="pt-28 pb-24 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Solution Hero Banner */}
      <section className="relative py-20 bg-[#142615] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="/assets/images/hero_tea_panoramic.png"
            alt={solution.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>{solution.tagline}</span>
          </div>

          <h1 className="font-rajwada text-3xl sm:text-5xl md:text-6xl font-black text-amber-100 tracking-tight leading-tight">
            {solution.title}
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-200 font-light max-w-3xl mx-auto font-sans leading-relaxed">
            {solution.subtitle}
          </p>

          <div className="mt-8 inline-flex items-center gap-3">
            <button
              type="button"
              onClick={() => onOpenInquiry(solution.title)}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-xl hover:scale-105 transition-all"
            >
              Request Free Enterprise Sample Kit
            </button>
          </div>
        </div>
      </section>

      {/* Target Audience & Challenge vs Solution */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Industry Problem */}
          <div className="p-8 rounded-3xl bg-white border border-red-100 shadow-lg">
            <span className="text-xs font-black uppercase tracking-wider text-red-700 block mb-2 font-sans">
              THE COMMERCIAL CHALLENGE
            </span>
            <h3 className="font-royal text-xl font-bold text-slate-800 mb-4">
              Traditional Limitations
            </h3>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-sans font-light">
              {solution.problemStatement}
            </p>
          </div>

          {/* The Lata Solution */}
          <div className="p-8 rounded-3xl bg-[#1E3F20] text-white border border-amber-400/30 shadow-xl">
            <span className="text-xs font-black uppercase tracking-wider text-amber-300 block mb-2 font-sans">
              THE LATA TEA ADVANTAGE
            </span>
            <h3 className="font-royal text-xl font-bold text-amber-100 mb-4">
              Engineered Consistency & Profitability
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-sans font-light">
              {solution.lataSolution}
            </p>
          </div>

        </div>
      </section>

      {/* Key Benefits Grid */}
      <section className="py-16 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-lataamber-600 font-sans">
              KEY ADVANTAGES
            </span>
            <h2 className="font-rajwada text-3xl font-bold text-[#1E3F20] mt-1">
              Why Leaders in {solution.title.split('&')[0].trim()} Choose Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solution.benefits.map((benefit, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#FAF6EE] border border-amber-200/60 shadow-sm">
                <div className="p-3 rounded-xl bg-latagreen-100 text-[#1E3F20] w-fit mb-4">
                  <CheckCircle2 className="w-5 h-5 text-lataamber-500" />
                </div>
                <h4 className="font-royal text-base font-bold text-[#1E3F20] mb-2">
                  {benefit.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products Showcase */}
      {recommendedProducts.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-lataleaf-600 font-sans">
              RECOMMENDED FORMULATIONS
            </span>
            <h2 className="font-rajwada text-3xl font-bold text-[#1E3F20] mt-1">
              Prime Blends for {solution.title.split('&')[0].trim()}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedProducts.map(prod => (
              <div key={prod.id} className="bg-white rounded-3xl overflow-hidden shadow-md border border-amber-100 p-6 flex flex-col justify-between">
                <div>
                  <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-[#1E3F20]">
                    <img src="/assets/images/royal_tea_bowl.jpg" alt={prod.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="font-rajwada text-xl font-bold text-[#1E3F20] mb-1">
                    {prod.name}
                  </h4>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 font-sans">
                    {prod.shortDescription}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <Link
                    to={`/products/${prod.slug}`}
                    className="text-xs font-bold text-lataamber-600 hover:text-lataamber-700 flex items-center gap-1 uppercase"
                  >
                    <span>View Blend</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onOpenInquiry(prod.name)}
                    className="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E3F20] text-amber-300 hover:bg-black transition-colors"
                  >
                    Sample Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Application Steps */}
      <section className="py-20 bg-[#162D18] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 font-sans">
              EASY DEPLOYMENT
            </span>
            <h2 className="font-rajwada text-3xl font-bold text-amber-100 mt-1">
              Standard Operating Procedure
            </h2>
          </div>

          <div className="space-y-4">
            {solution.applicationSteps.map((step, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-black/40 border border-amber-400/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-lataamber-500 text-white font-black text-sm flex items-center justify-center shrink-0">
                  {step.stepNumber}
                </div>
                <div>
                  <h4 className="font-royal text-base font-bold text-amber-200">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans mt-1 font-light">
                    {step.instruction}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => onOpenInquiry(solution.title)}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-2xl hover:scale-105 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Connect with Solution Consultant</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
