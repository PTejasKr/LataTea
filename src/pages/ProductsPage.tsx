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
    <div className="pt-20 bg-[#F8FAF8] text-[#1A291B] min-h-screen">
      
      {/* Header Banner */}
      <section className="py-14 bg-[#1B4332] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-pub-small font-sans font-semibold tracking-widest text-[#A5D6A7] uppercase block mb-1">
            {t('PRODUCT CATALOGUE')}
          </span>
          <h1 className="font-rajwada text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {t('Explore All Lata Teamixs')}
          </h1>
          <p className="mt-2 text-pub-body text-slate-200 font-sans max-w-xl mx-auto">
            {t('Pure jaggery chai blends, basundi tea, and instant 3-in-1 premixes.')}
          </p>
        </div>
      </section>

      {/* Catalogue Grid */}
      <TeaStoryCollection onOpenInquiry={onOpenInquiry} />

    </div>
  );
};


