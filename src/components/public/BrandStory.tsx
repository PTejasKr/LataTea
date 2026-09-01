import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Leaf, 
  Award, 
  Clock, 
  Store, 
  Cpu, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

const iconMap: Record<string, React.ReactNode> = {
  Leaf: <Leaf className="w-6 h-6 text-lataleaf-500" />,
  Award: <Award className="w-6 h-6 text-lataamber-500" />,
  Clock: <Clock className="w-6 h-6 text-lataleaf-500" />,
  Store: <Store className="w-6 h-6 text-lataamber-500" />,
  Cpu: <Cpu className="w-6 h-6 text-lataleaf-500" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6 text-lataamber-500" />
};

interface BrandStoryProps {
  isDraftPreview?: boolean;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const about = state.content.about;
  const aboutImg = resolveSlotImage('ABOUT_IMAGE_PRIMARY', false, isDraftPreview);
  const imgUrl = aboutImg.url || '/assets/images/royal_tea_bowl.jpg';

  return (
    <section id="about" className="py-24 bg-[#FAF6EE] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold uppercase tracking-widest text-lataamber-600 mb-2 font-sans">
            <TeaLeafIcon className="w-4 h-4" />
            <span>{about.tagline || 'WHY CHOOSE LATA?'}</span>
          </span>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3F20] tracking-tight">
            {about.heading}
          </h2>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-0.5 w-12 bg-lataamber-500" />
            <div className="w-2 h-2 rounded-full bg-lataamber-500" />
            <div className="h-0.5 w-12 bg-lataamber-500" />
          </div>
          <p className="text-base sm:text-lg text-slate-700 font-normal leading-relaxed font-sans">
            {about.subheading}
          </p>
        </div>

        {/* 2-Column Story + Visual Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            {about.storyParagraphs.map((para, idx) => (
              <p key={idx} className="text-slate-700 text-base sm:text-lg leading-relaxed font-sans">
                {para}
              </p>
            ))}

            <div className="pt-4 border-t border-amber-900/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#1E3F20] font-royal">
                  <CheckCircle2 className="w-5 h-5 text-lataamber-500 shrink-0" />
                  <span>100% Traditional Jaggery Taste</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#1E3F20] font-royal">
                  <CheckCircle2 className="w-5 h-5 text-lataamber-500 shrink-0" />
                  <span>Zero Preservative Blends</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#1E3F20] font-royal">
                  <CheckCircle2 className="w-5 h-5 text-lataamber-500 shrink-0" />
                  <span>Fast Soluble Hot Dispense</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm font-bold text-[#1E3F20] font-royal">
                  <CheckCircle2 className="w-5 h-5 text-lataamber-500 shrink-0" />
                  <span>FSSAI Certified Facilities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Copper Bowl Image Card */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#1E3F20] group">
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={imgUrl}
                  alt={aboutImg.alt || 'Antique carved copper bowl with spoon pouring master tea blend'}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/royal_tea_bowl.jpg';
                  }}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#163018] via-[#163018]/85 to-transparent p-6 text-white">
                <div className="font-rajwada font-bold text-2xl text-amber-300">
                  Chai For Every Moment!
                </div>
                <p className="text-xs text-slate-200 mt-1 font-sans">
                  Crafted for chai connoisseurs who cherish the warmth of traditional home-brewed basundi chai.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Key Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {about.highlights.map(item => (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-white shadow-md hover:shadow-xl border border-amber-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-latagreen-50 flex items-center justify-center mb-4 border border-latagreen-100">
                {iconMap[item.icon] || <Award className="w-6 h-6 text-lataamber-500" />}
              </div>
              <h3 className="font-royal font-bold text-lg text-[#1E3F20] mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
