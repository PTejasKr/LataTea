import React from 'react';
import { useCMS } from '../context/CMSContext';
import { Link } from '../router/Router';
import { 
  ArrowLeft, 
  MessageCircle,
  Clock,
  MapPin,
  CheckCircle,
  FileText
} from 'lucide-react';

interface ProductDetailPageProps {
  slug: string;
  onOpenInquiry: (productName?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onOpenInquiry }) => {
  const { publishedState, resolveSlotImage, t, language } = useCMS();

  const tea = (publishedState.teaStories || []).find(p => p.slug === slug) || (publishedState.teaStories || [])[0];

  if (!tea) {
    return (
      <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-xl font-bold text-[#1B4332]">Product Not Found</h2>
        <Link to="/tea" className="mt-3 inline-block text-[#F89E22] font-semibold text-xs">
          â† Back to Catalogue
        </Link>
      </div>
    );
  }

  const teaImage = resolveSlotImage(tea.imageSlotId || 'STORY_IMAGE_PRIMARY');
  const whatsappUrl = `https://wa.me/917666953873?text=Hi%20LataTea%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(tea.name.en)}%20for%20my%20business.`;

  return (
    <div className="pt-24 pb-20 bg-[#F8FAF8] text-[#1A291B] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/tea"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#5A6B5C] hover:text-[#F89E22] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'à¤¸à¤°à¥à¤µ à¤‰à¤¤à¥à¤ªà¤¾à¤¦à¤¨à¥‡' : 'Back to Catalogue'}</span>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start">
          
          {/* 1. PRODUCT IMAGE */}
          <div className="md:col-span-5">
            <div className="rounded-xl overflow-hidden border border-[#E2ECE3] bg-white aspect-square shadow-xs">
              <img
                src={teaImage.url}
                alt={teaImage.alt}
                style={teaImage.style}
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 space-y-4">
            
            {/* Header: Product Name & Short Descriptor */}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#F89E22] font-semibold block mb-1">
                {t(tea.categoryName)}
              </span>
              <h1 className="font-rajwada text-2xl sm:text-3xl font-bold text-[#1B4332]">
                {t(tea.name)}
              </h1>
              <p className="text-xs sm:text-sm text-[#5A6B5C] mt-0.5">
                {t(tea.tagline)}
              </p>
            </div>

            {/* About this blend (Very short paragraph) */}
            <div className="p-4 rounded-xl bg-white border border-[#E2ECE3] space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">
                {language === 'mr' ? 'à¤‰à¤¤à¥à¤ªà¤¾à¤¦à¤¨à¤¾à¤¬à¤¦à¥à¤¦à¤²' : 'About This Blend'}
              </h2>
              <p className="text-xs sm:text-sm text-[#1A291B] font-sans leading-relaxed">
                {t(tea.editorialStory)}
              </p>
            </div>

            {/* Key Characteristics (Bullet Points) */}
            {tea.tastingNotes && tea.tastingNotes.length > 0 && (
              <div className="p-4 rounded-xl bg-white border border-[#E2ECE3] space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B4332]">
                  {language === 'mr' ? 'à¤®à¥à¤–à¥à¤¯ à¤µà¥ˆà¤¶à¤¿à¤·à¥à¤Ÿà¥à¤¯à¥‡' : 'Key Characteristics'}
                </h3>
                <ul className="space-y-1 text-xs text-[#1A291B]">
                  {tea.tastingNotes.map((note, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-[#F89E22] shrink-0" />
                      <span>{t(note)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* How it is used (Visual / concise info) */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-white border border-[#E2ECE3] space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#F89E22]">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'à¤¤à¤¯à¤¾à¤°à¥€' : 'Preparation'}</span>
                </div>
                <p className="text-xs text-[#1A291B]">
                  {t(tea.servingRitual)}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-white border border-[#E2ECE3] space-y-0.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#F89E22]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{language === 'mr' ? 'à¤‰à¤—à¤®' : 'Origin'}</span>
                </div>
                <p className="text-xs text-[#1A291B]">
                  {t(tea.origin)}
                </p>
              </div>
            </div>

            {/* Actions: Enquire / Request Information (No Cart / No Buy Now) */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-2.5">
              <button
                type="button"
                onClick={() => onOpenInquiry(tea.name.en)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#F89E22] hover:bg-[#1B4332] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                {language === 'mr' ? 'à¤µà¥à¤¯à¤¾à¤µà¤¸à¤¾à¤¯à¤¿à¤• à¤šà¥Œà¤•à¤¶à¥€ / à¤¨à¤®à¥à¤¨à¤¾ à¤®à¤¾à¤—à¤µà¤¾' : 'Request Samples / Enquire'}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{language === 'mr' ? 'à¤µà¥à¤¹à¥‰à¤Ÿà¥à¤¸à¥²à¤ª à¤šà¥Œà¤•à¤¶à¥€' : 'WhatsApp Inquiry'}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

