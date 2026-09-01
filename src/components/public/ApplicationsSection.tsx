import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Building2, 
  Hotel, 
  UtensilsCrossed, 
  Coffee, 
  ShoppingBag, 
  Zap, 
  ArrowRight 
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Building2: <Building2 className="w-6 h-6 text-lataleaf-500" />,
  Hotel: <Hotel className="w-6 h-6 text-lataamber-500" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6 text-lataleaf-500" />,
  Coffee: <Coffee className="w-6 h-6 text-lataamber-500" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6 text-lataleaf-500" />,
  Zap: <Zap className="w-6 h-6 text-lataamber-500" />
};

interface ApplicationsSectionProps {
  onOpenInquiry: (appName?: string) => void;
  isDraftPreview?: boolean;
}

export const ApplicationsSection: React.FC<ApplicationsSectionProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  const { publishedState, draftState } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const apps = state.content.applications;

  return (
    <section id="applications" className="py-24 bg-[#FAF6EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-lataamber-600 mb-2 block font-sans">
            {apps.tagline || 'VERSATILE HOSPITALITY & RETAIL SOLUTIONS'}
          </span>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3F20] tracking-tight">
            {apps.heading || 'DESIGNED FOR EVERY SETTING'}
          </h2>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-0.5 w-12 bg-lataamber-500" />
            <div className="w-2 h-2 rounded-full bg-lataamber-500" />
            <div className="h-0.5 w-12 bg-lataamber-500" />
          </div>
          <p className="text-base sm:text-lg text-slate-700 font-sans">
            {apps.subheading || 'Whether for corporate tea breaks, luxury hotel dining, or convenient on-the-go vending.'}
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apps.items.map(item => (
            <div
              key={item.id}
              className="group bg-white rounded-3xl p-8 border border-amber-200/80 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-latacream-200 flex items-center justify-center mb-6 border border-amber-200 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[item.icon] || <Building2 className="w-6 h-6 text-lataamber-500" />}
                </div>
                <h3 className="font-rajwada font-bold text-2xl text-[#1E3F20] mb-3 group-hover:text-lataamber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between font-sans">
                <button
                  onClick={() => onOpenInquiry(item.title)}
                  className="text-xs font-bold uppercase tracking-wider text-lataamber-600 hover:text-lataamber-700 flex items-center gap-1 group-hover:translate-x-1 transition-all"
                >
                  <span>Explore Solution</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
