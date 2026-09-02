import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight, Coffee, Sparkles, Flame, Check } from 'lucide-react';
import { Link } from '../../router/Router';

interface TeaStoryCollectionProps {
  onOpenInquiry?: (teaSlug?: string) => void;
  isDraftPreview?: boolean;
}

export const TeaStoryCollection: React.FC<TeaStoryCollectionProps> = ({ 
  onOpenInquiry, 
  isDraftPreview = false 
}) => {
  const { publishedState, draftState, resolveSlotImage, t, language } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const teas = (state.teaStories || []).filter(item => item.isVisible);

  const [activeCategory, setActiveCategory] = useState<'all' | 'gud' | 'sugar' | 'premixes'>('all');

  const filteredTeas = activeCategory === 'all' 
    ? teas 
    : teas.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'all', label: { en: 'All Teas', mr: 'सर्व चहा' } },
    { id: 'gud', label: { en: 'Jaggery Blends', mr: 'गूळ चहा' } },
    { id: 'sugar', label: { en: 'Basundi Series', mr: 'बासुंदी चहा' } },
    { id: 'premixes', label: { en: 'Premixes', mr: 'प्रीमिक्स' } }
  ];

  // Helper icon for tea type
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'premixes':
        return <Sparkles className="w-3.5 h-3.5 text-[#2E7D32]" />;
      case 'gud':
        return <Flame className="w-3.5 h-3.5 text-[#2E7D32]" />;
      default:
        return <Coffee className="w-3.5 h-3.5 text-[#2E7D32]" />;
    }
  };

  return (
    <section id="tea" className="py-14 sm:py-20 bg-[#F8FAF8] text-[#1A291B] border-t border-[#E2ECE3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-sans font-semibold tracking-widest text-[#2E7D32] uppercase block mb-1">
              {language === 'mr' ? 'उत्पादन कॅटलॉग' : 'OUR TEAS'}
            </span>
            <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-[#1B4332] tracking-tight">
              {language === 'mr' ? 'सर्व उत्पादने व चहा प्रकार' : 'Product Catalogue'}
            </h2>
          </div>

          {/* Clean Horizontal Category Navigation (Desktop & Mobile Familiar Bar) */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-[#E2ECE3]">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#2E7D32] text-white font-semibold shadow-xs'
                    : 'text-[#5A6B5C] hover:text-[#1A291B] hover:bg-[#F8FAF8]'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>
        </div>

        {/* Familiar Product Catalogue Grid: 2-Column Mobile & 4-Column Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredTeas.map((tea) => {
            const teaImage = resolveSlotImage(tea.imageSlotId || 'STORY_IMAGE_PRIMARY', false, isDraftPreview);

            return (
              <div
                key={tea.id}
                className="bg-white rounded-xl border border-[#E2ECE3] hover:border-[#2E7D32] hover:shadow-sm transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Product Image Box */}
                <Link to={`/tea/${tea.slug}`} className="block relative aspect-[4/3] bg-[#EBF5EC] overflow-hidden">
                  <img
                    src={teaImage.url}
                    alt={teaImage.alt}
                    style={teaImage.style}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Subtle category tag */}
                  <span className="absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/95 text-[10px] font-semibold text-[#1B4332] shadow-xs">
                    {getCategoryIcon(tea.category)}
                    <span>{t(tea.categoryName)}</span>
                  </span>
                </Link>

                {/* Card Content: Concise, Scannable Info */}
                <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-rajwada text-sm sm:text-base font-bold text-[#1B4332] group-hover:text-[#2E7D32] transition-colors line-clamp-1">
                      {t(tea.name)}
                    </h3>
                    
                    <p className="text-[11px] sm:text-xs text-[#5A6B5C] mt-1 line-clamp-2 leading-relaxed">
                      {t(tea.shortDescription)}
                    </p>
                  </div>

                  {/* Clear Actions */}
                  <div className="mt-3.5 pt-3 border-t border-[#E2ECE3] flex items-center justify-between gap-2">
                    <Link
                      to={`/tea/${tea.slug}`}
                      className="text-xs font-semibold text-[#2E7D32] hover:text-[#1B4332] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>{language === 'mr' ? 'तपशील' : 'Details'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onOpenInquiry?.(tea.name.en)}
                      className="px-2.5 py-1 rounded text-[10px] font-semibold text-[#1B4332] bg-[#EBF5EC] hover:bg-[#D7EBD9] transition-colors cursor-pointer"
                    >
                      {language === 'mr' ? 'नमुना' : 'Sample'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
