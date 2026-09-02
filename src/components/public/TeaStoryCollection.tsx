import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ArrowRight } from 'lucide-react';
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
    { id: 'all', label: { en: 'All', mr: 'सर्व' } },
    { id: 'gud', label: { en: 'Jaggery Blends', mr: 'गूळ मिश्रणे' } },
    { id: 'sugar', label: { en: 'Basundi', mr: 'बासुंदी' } },
    { id: 'premixes', label: { en: 'Premixes', mr: 'प्रीमिक्स' } }
  ];

  return (
    <section id="tea" className="py-8 sm:py-12 bg-brand-surface text-brand-primary">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Compact Catalogue Header & Category Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-brand-border">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-brand-primary-dark font-rajwada">
              {language === 'mr' ? 'चहा कॅटलॉग' : 'Tea Catalogue'}
            </h2>
            <p className="text-[11px] sm:text-xs text-brand-text-muted">
              {language === 'mr' ? 'तपशील आणि नमुने पहा' : 'Browse products with quick details & samples'}
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
                    ? 'bg-brand-accent text-white font-semibold shadow-xs'
                    : 'bg-brand-background text-brand-text-muted hover:bg-brand-accent-pale border border-brand-border'
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
                className="bg-brand-surface rounded-lg border border-brand-border hover:border-brand-accent hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                {/* Product Image */}
                <Link to={`/tea/${tea.slug}`} className="block relative aspect-[4/5] bg-brand-background overflow-hidden">
                  <img
                    src={teaImage.url}
                    alt={teaImage.alt}
                    style={teaImage.style}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {/* Subtle Category Pill on Image */}
                  <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-white/95 text-[9px] font-bold uppercase text-brand-accent shadow-xs">
                    {t(tea.categoryName)}
                  </span>
                </Link>

                {/* Compact Info Block */}
                <div className="p-2 sm:p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-brand-text-muted block">
                      LATA TEAMIX
                    </span>
                    <h3 className="font-bold text-xs sm:text-sm text-brand-primary-dark group-hover:text-brand-accent transition-colors truncate mt-0.5">
                      {t(tea.name)}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-brand-text-muted line-clamp-1 mt-0.5">
                      {t(tea.shortDescription)}
                    </p>
                  </div>

                  {/* Compact Actions */}
                  <div className="mt-2.5 pt-2 border-t border-brand-border flex items-center justify-between gap-1">
                    <Link
                      to={`/tea/${tea.slug}`}
                      className="text-[11px] font-bold text-brand-accent hover:text-brand-accent-hover inline-flex items-center gap-0.5"
                    >
                      <span>{language === 'mr' ? 'तपशील' : 'Details'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onOpenInquiry?.(tea.name.en)}
                      className="px-2 py-0.5 rounded bg-brand-background hover:bg-brand-accent-pale text-[10px] font-bold text-brand-primary cursor-pointer border border-brand-border"
                    >
                      {language === 'mr' ? 'नमुना मागवा' : 'Sample'}
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
