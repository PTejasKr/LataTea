import React from 'react';


interface BrandTickerProps {
  items?: string[];
}

export const BrandTicker: React.FC<BrandTickerProps> = ({
  items = [
    '100% PURE ORGANIC JAGGERY (GUD)',
    'ASSAM CTC MASTER TEA BLEND',
    'ROYAL MALABAR WHOLE SPICES',
    'INSTANT 3-MINUTE CONVENIENCE',
    'TRADITIONAL BASUNDI FLAVOUR',
    'HYGIENIC ISO & FSSAI CERTIFIED',
    'IDEAL FOR RETAIL, HORECA & VENDING'
  ]
}) => {
  return (
    <div className="w-full bg-[#142615] border-y border-amber-500/30 py-3.5 overflow-hidden relative shadow-inner">
      <div className="flex w-max animate-marquee gap-8 items-center text-pub-body font-bold uppercase tracking-widest text-amber-300 font-sans">
        {/* Double array for infinite seamless looping */}
        {[...items, ...items, ...items].map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


