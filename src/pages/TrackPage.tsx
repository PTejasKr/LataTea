import React from 'react';
import { OrderTrackingSection } from '../components/public/OrderTrackingSection';
import { OrderingRoadmap } from '../components/public/OrderingRoadmap';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';

export const TrackPage: React.FC<{ onOpenInquiry: () => void }> = ({ onOpenInquiry }) => {
  return (
    <div className="pt-28 pb-20 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Hero Header */}
      <section className="relative py-16 bg-[#162D18] text-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>REAL-TIME DISPATCH LOGISTICS</span>
          </div>
          <h1 className="font-rajwada text-3xl sm:text-5xl font-black text-amber-100 tracking-tight">
            Universal Consignment Tracking Portal
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 font-light font-sans max-w-2xl mx-auto">
            Track your wholesale cartons, retail pouches, and sample kit shipments across India.
          </p>
        </div>
      </section>

      {/* Real-time Consignment Search & Status Tracker */}
      <OrderTrackingSection />

      {/* 7-Step Fulfillment Process */}
      <OrderingRoadmap onOpenInquiry={onOpenInquiry} />

    </div>
  );
};
