import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaLeafIcon } from '../common/TeaLeafIcon';
import { Leaf, ShieldCheck, Award, Clock } from 'lucide-react';

interface WhyLataSectionProps {
  isDraftPreview?: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf className="w-6 h-6 text-lataleaf-600" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-lataamber-600" />,
  Award: <Award className="w-6 h-6 text-lataleaf-600" />,
  Clock: <Clock className="w-6 h-6 text-lataamber-600" />
};

export const WhyLataSection: React.FC<WhyLataSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const why = state.content.whyLata;

  return (
    <section className="py-24 sm:py-32 bg-[#FAF6EE] text-[#1A2416] relative border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/10 border border-amber-600/20 text-lataamber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <TeaLeafIcon className="w-3.5 h-3.5 text-lataleaf-600" />
            <span>{t(why.tagline)}</span>
          </div>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3F20] tracking-tight">
            {t(why.heading)}
          </h2>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-0.5 w-12 bg-lataamber-500" />
            <div className="w-2 h-2 rotate-45 bg-lataamber-500" />
            <div className="h-0.5 w-12 bg-lataamber-500" />
          </div>
          <p className="text-base sm:text-lg text-slate-700 font-sans font-light leading-relaxed">
            {t(why.subheading)}
          </p>
        </div>

        {/* 4 Clean Verified Differentiators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(why.pillars || []).map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] border border-amber-200 flex items-center justify-center mb-6">
                  {iconMap[pillar.icon || 'Leaf'] || <Leaf className="w-6 h-6 text-lataleaf-600" />}
                </div>

                {pillar.metric && (
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-lataamber-600 block mb-2">
                    {pillar.metric}
                  </span>
                )}

                <h3 className="font-rajwada text-xl font-bold text-[#1E3F20] mb-3 leading-snug">
                  {t(pillar.title)}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 font-sans font-light leading-relaxed">
                  {t(pillar.description)}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                <span>VERIFIED STANDARD</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
