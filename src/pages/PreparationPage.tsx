import React from 'react';
import { PreparationGuide } from '../components/public/PreparationGuide';
import { OrderingRoadmap } from '../components/public/OrderingRoadmap';
import { Link } from '../router/Router';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';

export const PreparationPage: React.FC<{ onOpenInquiry: () => void }> = ({ onOpenInquiry }) => {
  return (
    <div className="pt-28 pb-20 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Hero Header */}
      <section className="relative py-16 bg-[#162D18] text-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>BREWING PERFECTION</span>
          </div>
          <h1 className="font-rajwada text-3xl sm:text-5xl font-black text-amber-100 tracking-tight">
            How to Brew Velvet Basundi Chai
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 font-light font-sans max-w-2xl mx-auto">
            From single-sachet morning mugs to high-volume commercial samovars.
          </p>
        </div>
      </section>

      {/* 6-Step Visual Recipe & Measurements */}
      <PreparationGuide />

      {/* Ordering & Delivery Roadmap */}
      <OrderingRoadmap onOpenInquiry={onOpenInquiry} />

    </div>
  );
};
