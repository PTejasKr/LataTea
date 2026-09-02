import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaStoryItem } from '../../types/cms';
import { TeaLeafIcon } from '../common/TeaLeafIcon';
import { ArrowRight, MapPin, Sparkles, Droplets } from 'lucide-react';
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
    { id: 'all', label: { en: 'All Stories', mr: 'सर्व संग्रह' } },
    { id: 'gud', label: { en: 'Jaggery Heritage', mr: 'गुळ चहा वारसा' } },
    { id: 'sugar', label: { en: 'Royal Basundi', mr: 'शाही बासुंदी' } },
    { id: 'premixes', label: { en: 'Instant Premixes', mr: 'इन्स्टंट प्रीमिक्स' } }
  ];

  return (
    <section id="tea" className="py-24 sm:py-32 bg-[#FAF6EE] text-[#1A2416] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-lataamber-600 uppercase mb-3 font-sans">
            <TeaLeafIcon className="w-3.5 h-3.5 text-lataleaf-600" />
            <span>{language === 'mr' ? 'अस्सल चहा संग्रह' : 'THE TEA COLLECTION'}</span>
          </div>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3F20] tracking-tight">
            {language === 'mr' ? 'प्रत्येक पानात एक वेगळी कहाणी' : 'Every Blend Tells a Sovereign Story'}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-700 font-sans font-light leading-relaxed">
            {language === 'mr' 
              ? 'आसामची अस्सल चहाची पाने आणि पश्चिम भारतातील सेंद्रिय गुळाचा सुसंवाद.'
              : 'Discover our artisan collection crafted for connoisseurs, boutique hotels, and mindful tea ceremonies.'}
          </p>
        </div>

        {/* Category Discovery Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 mb-14 border-b border-amber-900/10 pb-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#1E3F20] text-white shadow-md'
                  : 'bg-white/80 hover:bg-white text-slate-700 border border-amber-200/80'
              }`}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>

        {/* Editorial Product Stories — Large Compositions */}
        <div className="space-y-16">
          {filteredTeas.map((tea, idx) => {
            const teaImage = resolveSlotImage(tea.imageSlotId || 'STORY_IMAGE_PRIMARY', false, isDraftPreview);
            const isEven = idx % 2 === 1;

            return (
              <div
                key={tea.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center p-8 sm:p-14 rounded-3xl bg-white border border-amber-200/70 shadow-lg hover:shadow-2xl transition-all duration-500`}
              >
                {/* Visual Imagery */}
                <div className={`lg:col-span-5 relative ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-md border border-amber-100 bg-amber-50">
                    <img
                      src={teaImage.url}
                      alt={teaImage.alt}
                      style={teaImage.style}
                      className="w-full h-full object-cover transform hover:scale-104 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>

                  {tea.badgeText && (
                    <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest shadow-md">
                      {t(tea.badgeText)}
                    </div>
                  )}
                </div>

                {/* Editorial Narrative */}
                <div className={`lg:col-span-7 space-y-5 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-widest text-lataamber-600 block font-sans">
                      {t(tea.categoryName)}
                    </span>
                    <h3 className="font-rajwada text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1E3F20] leading-tight">
                      {t(tea.name)}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 font-sans italic">
                      {t(tea.tagline)}
                    </p>
                  </div>

                  <p className="text-sm sm:text-base text-slate-700 font-sans font-light leading-relaxed">
                    {t(tea.editorialStory)}
                  </p>

                  {/* Tasting Notes */}
                  {tea.tastingNotes && tea.tastingNotes.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 block">
                        {language === 'mr' ? 'चवीची वैशिष्ट्ये:' : 'Tasting Notes:'}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {tea.tastingNotes.map((note, nIdx) => (
                          <span
                            key={nIdx}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF6EE] text-[#1E3F20] border border-amber-200/80"
                          >
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>{t(note)}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Origin & Serving Ritual */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-amber-100 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-lataamber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-800 font-semibold">{language === 'mr' ? 'उगम' : 'Origin'}</strong>
                        <span>{t(tea.origin)}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Droplets className="w-4 h-4 text-lataleaf-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-slate-800 font-semibold">{language === 'mr' ? 'कृती' : 'Serving Ritual'}</strong>
                        <span>{t(tea.servingRitual)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Link (NO shopping/cart CTAs) */}
                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      to={`/tea/${tea.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1E3F20] hover:text-lataamber-600 group transition-colors"
                    >
                      <span>{language === 'mr' ? 'पूर्ण कथा वाचा' : 'Explore Story'}</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onOpenInquiry?.(tea.slug)}
                      className="px-5 py-2.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-300 text-slate-900 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {language === 'mr' ? 'व्यावसायिक सॅम्पल मागवा' : 'Request Tasting Sample'}
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
