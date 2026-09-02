import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight, Sparkles } from 'lucide-react';
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
    { id: 'all', label: { en: 'All', mr: 'à¤¸à¤°à¥à¤µ' } },
    { id: 'gud', label: { en: 'Jaggery Blends', mr: 'à¤—à¥‚à¤³ à¤šà¤¹à¤¾' } },
    { id: 'sugar', label: { en: 'Basundi', mr: 'à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€' } },
    { id: 'premixes', label: { en: 'Premixes', mr: 'à¤ªà¥à¤°à¥€à¤®à¤¿à¤•à¥à¤¸' } }
  ];

  return (
    <section id="tea" className="py-8 sm:py-12 bg-white text-[#1A291B]">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Compact Catalogue Header & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#E2ECE3]">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#1B4332] font-rajwada">
              {language === 'mr' ? 'à¤šà¤¹à¤¾ à¤‰à¤¤à¥à¤ªà¤¾à¤¦à¤¨à¥‡ (à¥ª à¤ªà¥à¤°à¤•à¤¾à¤°)' : 'Our Teas (4 Blends)'}
            </h2>
            <p className="text-[11px] sm:text-xs text-[#5A6B5C]">
              {language === 'mr' ? 'à¤•à¤®à¥€à¤¤ à¤•à¤®à¥€ à¤¸à¥à¤•à¥à¤°à¥‹à¤²à¤®à¤§à¥à¤¯à¥‡ à¤¸à¤°à¥à¤µ à¤‰à¤¤à¥à¤ªà¤¾à¤¦à¤¨à¥‡ à¤ªà¤¹à¤¾' : 'Browse products with quick details & samples'}
            </p>
          </div>

          {/* Clean Horizontal Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  activeCategory === cat.id
                    ? 'bg-[#F89E22] text-white font-semibold shadow-xs'
                    : 'bg-[#F8FAF8] text-[#5A6B5C] hover:bg-[#EBF5EC] border border-[#E2ECE3]'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Block Product Listing (2x2 on Mobile, 4-in-a-row on Desktop) - Myntra Style */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {filteredTeas.map((tea) => {
            const teaImage = resolveSlotImage(tea.imageSlotId || 'STORY_IMAGE_PRIMARY', false, isDraftPreview);

            return (
              <div
                key={tea.id}
                className="bg-white rounded-lg border border-[#E2ECE3] hover:border-[#F89E22] hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Product Image (Compact 1:1 Aspect Ratio like Myntra) */}
                <Link to={`/tea/${tea.slug}`} className="block relative aspect-square bg-[#F8FAF8] overflow-hidden">
                  <img
                    src={teaImage.url}
                    alt={teaImage.alt}
                    style={teaImage.style}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-200"
                    loading="lazy"
                  />
                  {/* Subtle Category Pill on Image */}
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-white/95 text-[9px] font-bold uppercase text-[#F89E22] shadow-xs">
                    {t(tea.categoryName)}
                  </span>
                </Link>

                {/* Compact Info Block (Title, Brand, 1-Line Info) */}
                <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#F89E22] block">
                      LATA TEA
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-[#1A291B] group-hover:text-[#F89E22] transition-colors truncate mt-0.5">
                      {t(tea.name)}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-[#5A6B5C] truncate mt-0.5">
                      {t(tea.shortDescription)}
                    </p>
                  </div>

                  {/* Compact Actions (View Details & Sample) */}
                  <div className="mt-2.5 pt-2 border-t border-[#F0F4F1] flex items-center justify-between gap-1">
                    <Link
                      to={`/tea/${tea.slug}`}
                      className="text-[11px] font-bold text-[#F89E22] hover:text-[#1B4332] inline-flex items-center gap-0.5"
                    >
                      <span>{language === 'mr' ? 'à¤®à¤¾à¤¹à¤¿à¤¤à¥€' : 'Details'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onOpenInquiry?.(tea.name.en)}
                      className="px-2 py-0.5 rounded bg-[#EBF5EC] hover:bg-[#D7EBD9] text-[10px] font-bold text-[#1B4332] cursor-pointer"
                    >
                      {language === 'mr' ? 'à¤¨à¤®à¥à¤¨à¤¾' : 'Sample'}
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

