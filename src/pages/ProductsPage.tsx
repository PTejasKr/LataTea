import React from 'react';
import { useCMS } from '../context/CMSContext';
import { TeaStoryCollection } from '../components/public/TeaStoryCollection';

interface ProductsPageProps {
  initialCategory?: string;
  onOpenInquiry: (productName?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenInquiry }) => {
  const { language } = useCMS();

  return (
    <div className="pt-20 bg-[#F8FAF8] text-[#1A291B] min-h-screen">
      
      {/* Header Banner */}
      <section className="py-14 bg-[#1B4332] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#A5D6A7] uppercase block mb-1">
            {language === 'mr' ? 'उत्पादन कॅटलॉग' : 'PRODUCT CATALOGUE'}
          </span>
          <h1 className="font-rajwada text-3xl sm:text-5xl font-bold text-white tracking-tight">
            {language === 'mr' ? 'लता टी चहा प्रकार' : 'Explore All Lata Teas'}
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-200 font-sans max-w-xl mx-auto">
            {language === 'mr'
              ? 'नैसर्गिक गूळ चहा, बासुंदी चहा आणि इन्स्टंट प्रीमिक्स.'
              : 'Pure jaggery chai blends, basundi tea, and instant 3-in-1 premixes.'}
          </p>
        </div>
      </section>

      {/* Catalogue Grid */}
      <TeaStoryCollection onOpenInquiry={onOpenInquiry} />

    </div>
  );
};
