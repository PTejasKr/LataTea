import React from 'react';
import { useCMS } from '../context/CMSContext';
import { TeaStoryCollection } from '../components/public/TeaStoryCollection';

interface ProductsPageProps {
  initialCategory?: string;
  onOpenInquiry: (productName?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenInquiry }) => {
  const { language, t } = useCMS();

  return (
    <div className="bg-[#F8FAF8] text-[#1A291B] min-h-screen">
      
      {/* Header Banner */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-[#0A2318] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] sm:text-xs font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-2">
            {t('PRODUCT CATALOGUE')}
          </span>
          <h1 className="font-rajwada text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {t('Explore All Lata Teamixs')}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-200 font-sans max-w-xl mx-auto leading-relaxed">
            {t('Pure jaggery chai blends, basundi tea, and instant 3-in-1 premixes.')}
          </p>
        </div>
      </section>

      {/* Catalogue Grid */}
      <TeaStoryCollection onOpenInquiry={onOpenInquiry} />

    </div>
  );
};


