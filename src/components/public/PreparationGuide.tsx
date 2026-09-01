import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Droplets, Milk, Sparkles } from 'lucide-react';

interface PreparationGuideProps {
  isDraftPreview?: boolean;
}

export const PreparationGuide: React.FC<PreparationGuideProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const prep = state.content.preparation;

  const stepList = [
    { num: 1, title: 'Boil 400 ml of water.', image: '/assets/images/royal_tea_panoramic.png' },
    { num: 2, title: 'Add 400 ml of milk.', image: '/assets/images/royal_tea_bowl.jpg' },
    { num: 3, title: 'Add 160g of tea mix.', image: '/assets/images/royal_tea_bowl.jpg' },
    { num: 4, title: 'Stir well.', image: '/assets/images/royal_tea_panoramic.png' },
    { num: 5, title: 'Boil for 2 to 3 minutes.', image: '/assets/images/royal_tea_bowl.jpg' },
    { num: 6, title: 'Pour into a cup and serve hot.', image: '/assets/images/royal_tea_panoramic.png' },
  ];

  return (
    <section id="preparation" className="py-20 bg-[#FAF6EE] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="font-rajwada text-3xl sm:text-5xl font-black text-[#1E3F20] tracking-tight">
            Perfect Preparation Guide
          </h2>
          <div className="flex items-center justify-center gap-2 my-3">
            <div className="h-0.5 w-12 bg-lataamber-500" />
            <div className="w-2 h-2 rounded-full bg-lataamber-500" />
            <div className="h-0.5 w-12 bg-lataamber-500" />
          </div>
        </div>

        {/* Top Dark Pill: 160g Tea Mix */}
        <div className="text-center mb-6">
          <div className="inline-block px-10 py-2.5 rounded-full bg-[#2A1810] text-amber-200 font-rajwada font-bold text-lg sm:text-xl shadow-lg border border-amber-500/30">
            160g Tea Mix
          </div>
        </div>

        {/* Minimalist Authentic Brochure Card */}
        <div className="bg-[#FFFDF7] rounded-[32px] p-6 sm:p-10 border-2 border-amber-300 shadow-xl space-y-8">
          
          {/* Ingredients Row */}
          <div className="p-4 sm:p-6 rounded-2xl bg-[#FAF6EE] border border-amber-200 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 rounded-full bg-[#1E3F20] text-white text-xs font-bold uppercase tracking-wider font-sans">
                INGREDIENTS
              </span>
            </div>

            {/* 3 Ingredients items */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="flex items-center justify-center sm:flex-col gap-3 sm:gap-1 p-2">
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center border border-sky-200">
                  <Droplets className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1E3F20] font-sans">400 ml</div>
                  <div className="text-xs text-slate-500 font-sans">Water</div>
                </div>
              </div>

              <div className="flex items-center justify-center sm:flex-col gap-3 sm:gap-1 p-2 border-y sm:border-y-0 sm:border-x border-amber-200">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200">
                  <Milk className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1E3F20] font-sans">400 ml</div>
                  <div className="text-xs text-slate-500 font-sans">Milk</div>
                </div>
              </div>

              <div className="flex items-center justify-center sm:flex-col gap-3 sm:gap-1 p-2">
                <div className="w-12 h-12 rounded-xl bg-lataleaf-100 text-lataleaf-700 flex items-center justify-center border border-lataleaf-200">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[#1E3F20] font-sans">160g</div>
                  <div className="text-xs text-slate-500 font-sans">Tea Mix</div>
                </div>
              </div>
            </div>

            {/* Lata Pouch Visual */}
            <div className="w-24 h-24 rounded-2xl bg-white p-1 border border-amber-200 shadow-sm flex items-center justify-center shrink-0">
              <img src="/assets/images/royal_tea_bowl.jpg" alt="Lata Tea Pouch" className="max-h-full max-w-full object-cover rounded-xl" />
            </div>
          </div>

          {/* Steps Row */}
          <div>
            <div className="mb-4">
              <span className="px-4 py-1.5 rounded-full bg-[#1E3F20] text-white text-xs font-bold uppercase tracking-wider font-sans">
                STEPS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {stepList.map(step => (
                <div key={step.num} className="flex flex-col items-center text-center space-y-2 group">
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-md border-2 border-amber-200 group-hover:border-amber-400 transition-colors">
                    <img src={step.image} alt={`Step ${step.num}`} className="w-full h-full object-cover" />
                    <span className="absolute top-2 left-2 w-7 h-7 rounded-full bg-[#1E3F20] text-amber-300 font-bold text-xs flex items-center justify-center shadow-md border border-amber-300 font-sans">
                      {step.num}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 leading-tight font-sans">
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Pill: Tea Mix – Chai For Every Moment! */}
        <div className="text-center mt-8">
          <div className="inline-block px-12 py-3 rounded-full bg-[#2A1810] text-amber-200 font-rajwada font-bold text-lg sm:text-xl shadow-xl border border-amber-500/30">
            Tea Mix – Chai For Every Moment!
          </div>
        </div>

      </div>
    </section>
  );
};
