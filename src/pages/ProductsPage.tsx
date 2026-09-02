import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Link } from '../router/Router';
import { TeaStoryCollection } from '../components/public/TeaStoryCollection';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';

interface ProductsPageProps {
  initialCategory?: string;
  onOpenInquiry: (productName?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenInquiry }) => {
  const { t, language } = useCMS();

  return (
    <div className="pt-24 pb-20 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Editorial Header */}
      <section className="relative py-20 bg-[#162D18] text-white overflow-hidden text-center">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'अस्सल चहा संग्रह' : 'EDITORIAL TEA COLLECTION'}</span>
          </div>
          <h1 className="font-rajwada text-4xl sm:text-6xl font-black text-amber-100 tracking-tight leading-tight">
            {language === 'mr' ? 'राजेशाही परंपरा, शुद्ध चव' : 'Royal Tradition, Pure Taste'}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-300 font-sans font-light max-w-2xl mx-auto leading-relaxed">
            {language === 'mr'
              ? 'आसामच्या चहाच्या पानांपासून ते पश्चिम महाराष्ट्रातील सेंद्रिय गुळापर्यंतचा आमचा संग्रह.'
              : 'Explore each blend crafted with pure jaggery, whole Malabar spices, and authentic Assam CTC leaves.'}
          </p>
        </div>
      </section>

      {/* Main Editorial Story Collection */}
      <TeaStoryCollection onOpenInquiry={onOpenInquiry} />

    </div>
  );
};
