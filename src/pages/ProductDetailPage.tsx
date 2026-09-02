import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Link } from '../router/Router';
import { 
  Check, 
  MapPin, 
  Clock, 
  Sparkles, 
  ArrowLeft, 
  MessageCircle,
  Droplets,
  ShieldCheck
} from 'lucide-react';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';

interface ProductDetailPageProps {
  slug: string;
  onOpenInquiry: (productName?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onOpenInquiry }) => {
  const { publishedState, resolveSlotImage, t, language } = useCMS();

  const tea = (publishedState.teaStories || []).find(p => p.slug === slug) || (publishedState.teaStories || [])[0];

  if (!tea) {
    return (
      <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Tea Story Not Found</h2>
        <Link to="/tea" className="mt-4 inline-block text-amber-600 font-bold">
          ← Return to Tea Stories
        </Link>
      </div>
    );
  }

  const teaImage = resolveSlotImage(tea.imageSlotId || 'STORY_IMAGE_PRIMARY');
  const whatsappUrl = `https://wa.me/917666953873?text=Hi%20LataTea%2C%20I%20am%20reading%20about%20${encodeURIComponent(tea.name.en)}%20and%20would%20like%20to%20request%20samples.`;

  return (
    <div className="pt-28 pb-24 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/tea"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'mr' ? 'सर्व चहा संग्रह' : 'Back to Tea Collection'}</span>
          </Link>
        </div>

        {/* Main Editorial Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Visual Showcase */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-amber-50">
              <img
                src={teaImage.url}
                alt={teaImage.alt}
                style={teaImage.style}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {tea.badgeText && (
              <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-md">
                {t(tea.badgeText)}
              </div>
            )}
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-lataamber-600 block font-sans">
                {t(tea.categoryName)}
              </span>
              <h1 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E3F20] leading-tight">
                {t(tea.name)}
              </h1>
              <p className="text-sm sm:text-base text-slate-500 font-sans italic">
                {t(tea.tagline)}
              </p>
            </div>

            <p className="text-base text-slate-700 font-sans font-light leading-relaxed">
              {t(tea.editorialStory)}
            </p>

            {/* Tasting Profile Notes */}
            {tea.tastingNotes && tea.tastingNotes.length > 0 && (
              <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-sm space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#1E3F20] block">
                  {language === 'mr' ? 'चवीची वैशिष्ट्ये (Tasting Notes):' : 'Aromatics & Tasting Profile:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {tea.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FAF6EE] text-[#1E3F20] border border-amber-200"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>{t(note)}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients & Origin */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-amber-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>{language === 'mr' ? 'उगम' : 'Origin & Harvest'}</span>
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  {t(tea.origin)}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-amber-200/80 space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500">
                  <Droplets className="w-3.5 h-3.5 text-lataleaf-600" />
                  <span>{language === 'mr' ? 'तयारीची पद्धत' : 'Simmering Ritual'}</span>
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  {t(tea.servingRitual)}
                </div>
              </div>
            </div>

            {/* Ingredients List */}
            {tea.ingredients && tea.ingredients.length > 0 && (
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-2">
                  {language === 'mr' ? 'साहित्य (Ingredients):' : 'Pure Ingredients:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {tea.ingredients.map((ing, idx) => (
                    <span key={idx} className="text-xs font-medium bg-amber-500/10 text-amber-950 px-3 py-1 rounded-lg border border-amber-300/40">
                      {t(ing)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Inquiries Action Block (Zero e-commerce/checkout!) */}
            <div className="pt-6 border-t border-amber-900/10 flex flex-col sm:flex-row items-center gap-4">
              <button
                type="button"
                onClick={() => onOpenInquiry(tea.name.en)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all cursor-pointer"
              >
                {language === 'mr' ? 'नमुना किट मागवा' : 'Request Enterprise Sample Kit'}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{language === 'mr' ? 'व्हॉट्सॲपवर संपर्क' : 'WhatsApp Inquiry'}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-sans pt-2">
              <ShieldCheck className="w-4 h-4 text-lataleaf-600" />
              <span>Certified ISO 22000 & FSSAI Cleanroom Blending • Purple Bean Agro Industries Pvt Ltd</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
