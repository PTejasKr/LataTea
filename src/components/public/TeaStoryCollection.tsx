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
  const teas = (state.teaStories || []).filter(t => t.isVisible);

  const [activeCategory, setActiveCategory] = useState<'all' | 'gud' | 'sugar' | 'premixes'>('all');

  const filteredTeas = activeCategory === 'all' 
    ? teas 
    : teas.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'all', label: { en: 'All Teas', mr: 'सर्व चहा' } },
    { id: 'gud', label: { en: 'Jaggery Blends', mr: 'गूळ चहा' } },
    { id: 'sugar', label: { en: 'Basundi Series', mr: 'बासुंदी मालिका' } },
    { id: 'premixes', label: { en: 'Premixes', mr: 'प्रीमिक्स' } }
  ];

  return (
    <section id="tea" className="py-16 sm:py-24 bg-[#FAF6EE] text-[#1A2416]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-amber-700 uppercase block mb-2">
              {language === 'mr' ? 'चहा संग्रह' : 'TEA BLENDS'}
            </span>
            <h2 className="font-rajwada text-2xl sm:text-4xl font-bold text-[#1E3F20] tracking-tight">
              {language === 'mr' ? 'स्वाक्षरी चहा प्रकार' : 'Signature Blends'}
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#1E3F20] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {t(cat.label)}
              </button>
            ))}
          </div>
        </div>

        {/* 2-Column Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTeas.map((tea) => {
            const teaImage = resolveSlotImage(tea.imageSlotId || 'STORY_IMAGE_PRIMARY', false, isDraftPreview);

            return (
              <div
                key={tea.id}
                className="bg-white rounded-2xl border border-amber-900/10 p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden aspect-[16/10] bg-amber-50 border border-amber-100">
                    <img
                      src={teaImage.url}
                      alt={teaImage.alt}
                      style={teaImage.style}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 block mb-1">
                      {t(tea.categoryName)}
                    </span>
                    <h3 className="font-rajwada text-xl sm:text-2xl font-bold text-[#1E3F20]">
                      {t(tea.name)}
                    </h3>
                    <p className="text-xs text-slate-500 font-sans mt-0.5">
                      {t(tea.tagline)}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
                    {t(tea.shortDescription)}
                  </p>

                  {/* Tasting Notes */}
                  {tea.tastingNotes && tea.tastingNotes.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {tea.tastingNotes.map((note, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-[#FAF6EE] text-slate-700 border border-amber-200/60"
                        >
                          {t(note)}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/tea/${tea.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1E3F20] hover:text-amber-700 transition-colors"
                  >
                    <span>{language === 'mr' ? 'तपशील' : 'View Blend'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => onOpenInquiry?.(tea.name.en)}
                    className="px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-slate-900 text-xs font-semibold cursor-pointer"
                  >
                    {language === 'mr' ? 'नमुना मागवा' : 'Request Sample'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
