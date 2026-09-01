import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface CtaSectionProps {
  onOpenInquiry: () => void;
  isDraftPreview?: boolean;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const cta = state.content.cta;
  const bgData = resolveSlotImage(cta.backgroundImageSlotId || 'CTA_BACKGROUND', false, isDraftPreview);

  return (
    <section className="py-24 relative overflow-hidden bg-[#163018] text-white">
      {/* Background with Real Heritage Tea Image */}
      <div className="absolute inset-0 z-0">
        {bgData.url ? (
          <img
            src={bgData.url}
            alt={bgData.alt || 'Tea CTA Banner'}
            style={bgData.style}
            className="w-full h-full object-cover opacity-40 scale-105"
          />
        ) : (
          <img
            src="/assets/images/royal_tea_panoramic.png"
            alt="Lata Tea Panoramic"
            className="w-full h-full object-cover opacity-40"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#142915]/95 via-[#163018]/85 to-[#142915]/95" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Pill Tag with Authentic Tea Leaf Icon */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-bold tracking-widest uppercase mb-6 font-sans shadow-lg">
          <TeaLeafIcon className="w-5 h-5" />
          <span>JOIN THE LATA TEA NETWORK</span>
        </div>

        {/* Headline */}
        <h2 className="font-rajwada text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
          {cta.headline}
        </h2>

        {/* Subheadline */}
        <p className="mt-6 text-base sm:text-xl text-slate-200/90 font-light max-w-3xl mx-auto font-sans leading-relaxed">
          {cta.subheadline}
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 font-sans">
          <button
            onClick={onOpenInquiry}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <span>{cta.primaryButtonText || 'Request Sample Box'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#products"
            className="w-full sm:w-auto px-8 py-4 rounded-full text-xs sm:text-sm font-bold uppercase tracking-widest bg-white/10 hover:bg-white/20 text-amber-300 backdrop-blur-md border border-amber-400/40 hover:border-amber-400 shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-lataamber-400" />
            <span>{cta.secondaryButtonText || 'Order Online'}</span>
          </a>
        </div>

        {/* Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-amber-200/90 font-sans">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-lataleaf-400" />
            <span>FSSAI & IEC Registered Manufacturer</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-lataleaf-400" />
            <span>Doorstep Logistics Across India</span>
          </div>
        </div>

      </div>
    </section>
  );
};
