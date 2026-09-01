import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaLeafIcon } from '../common/TeaLeafIcon';
import { Award, ShieldCheck, Clock } from 'lucide-react';

interface PromiseSectionProps {
  isDraftPreview?: boolean;
}

export const PromiseSection: React.FC<PromiseSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const promise = state.content.promise || {
    tagline: 'THE LATA PROMISE',
    heading: 'Heritage Flavor Meets Modern Scientific Consistency',
    subheading: 'We reimagined traditional Indian chai brewing to solve every problem of uneven sweetness, curdling milk, and lengthy boiling times.',
    pillars: [
      { title: '100% Pure Organic Jaggery', description: 'Natural unrefined desi gud with zero chemical bleach, high iron content, and guaranteed non-curdling formula.', metric: '100% Desi Gud' },
      { title: 'Assam Master Harvest', description: 'Selective orthodox & CTC black tea leaves sourced directly from high-elevation Assam estates for robust liquor.', metric: 'Grade-A Leaves' },
      { title: '3-Minute Ready Convenience', description: 'Pre-blended precision measures save 70% preparation time across home kitchens and busy commercial pantries.', metric: 'Under 3 Mins' }
    ]
  };

  const icons = [
    <TeaLeafIcon key="1" className="w-6 h-6 text-lataleaf-500" />,
    <Award key="2" className="w-6 h-6 text-lataamber-500" />,
    <Clock key="3" className="w-6 h-6 text-lataleaf-500" />
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#142615] to-[#1a331c] text-white relative overflow-hidden border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>{promise.tagline}</span>
          </div>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-black text-amber-100 tracking-tight leading-tight">
            {promise.heading}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-light leading-relaxed font-sans">
            {promise.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {promise.pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-black/40 border border-amber-400/20 hover:border-amber-400/50 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 shadow-xl group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3.5 rounded-2xl bg-white/10 border border-amber-400/30 group-hover:scale-110 transition-transform">
                  {icons[idx % icons.length]}
                </div>
                {pillar.metric && (
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-lataamber-500/20 text-amber-300 border border-lataamber-500/40">
                    {pillar.metric}
                  </span>
                )}
              </div>
              <h3 className="font-royal text-xl font-bold text-amber-200 mb-3">
                {pillar.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans font-light">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
