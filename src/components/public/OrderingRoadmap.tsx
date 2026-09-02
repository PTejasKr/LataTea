import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  MessageSquareText, 
  Coffee, 
  CheckSquare, 
  Settings, 
  PackageCheck, 
  Truck, 
  MapPinHouse,
  CircleDot
} from 'lucide-react';

const ICON_MAP: Record<number, React.ReactNode> = {
  1: <MessageSquareText className="w-6 h-6" />,
  2: <Coffee className="w-6 h-6" />,
  3: <CheckSquare className="w-6 h-6" />,
  4: <Settings className="w-6 h-6" />,
  5: <PackageCheck className="w-6 h-6" />,
  6: <Truck className="w-6 h-6" />,
  7: <MapPinHouse className="w-6 h-6" />
};

export const OrderingRoadmap: React.FC = () => {
  const { publishedState, language } = useCMS();
  const steps = publishedState.processSteps || [];

  if (steps.length === 0) return null;

  return (
    <section id="process" className="py-16 sm:py-24 bg-brand-surface relative border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-2">
            {language === 'mr' ? 'प्रक्रिया' : 'The Process'}
          </span>
          <h2 className="font-rajwada text-3xl sm:text-4xl font-bold text-brand-primary tracking-tight">
            {language === 'mr' ? 'ऑर्डर ते वितरण' : 'From Order to Delivery'}
          </h2>
          <div className="mt-4 w-16 h-1 bg-brand-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-brand-text-muted font-sans">
            {language === 'mr' 
              ? 'घाऊक खरेदीदार आणि वितरकांसाठी डिझाइन केलेली आमची पारदर्शक ७-टप्पे प्रक्रिया.'
              : 'Experience our transparent and efficient 7-step process designed for bulk buyers and distributors.'}
          </p>
        </div>

        <div className="relative">
          {/* Desktop continuous line connecting steps */}
          <div className="hidden lg:block absolute top-[45px] left-[5%] right-[5%] h-0.5 bg-brand-border -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 lg:gap-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                
                {/* Number & Icon Container */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-brand-surface border-4 border-brand-background shadow-sm flex items-center justify-center text-brand-primary group-hover:border-brand-accent group-hover:text-brand-accent transition-colors duration-300 relative z-10">
                    {ICON_MAP[step.id] || <CircleDot className="w-6 h-6" />}
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-sm shadow-md z-20">
                    {step.id}
                  </div>
                </div>

                <h3 className="font-rajwada font-bold text-base text-brand-primary mb-2 px-2">
                  {language === 'mr' ? step.titleMr : step.titleEn}
                </h3>
                <p className="text-xs text-brand-text-muted font-sans px-2">
                  {language === 'mr' ? step.descMr : step.descEn}
                </p>

                {/* Mobile/Tablet connecting line */}
                {idx !== steps.length - 1 && (
                  <div className="block lg:hidden w-0.5 h-8 bg-brand-border my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Banner */}
        <div className="mt-20 bg-brand-primary-dark rounded-xl overflow-hidden shadow-lg relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative p-8 sm:p-12 text-center flex flex-col items-center">
            <h3 className="font-rajwada text-2xl sm:text-3xl font-bold text-white mb-4">
              {language === 'mr' ? 'लता टीमिक्स सोबत भागीदारी करा' : 'Partner with Lata Tea'}
            </h3>
            <p className="text-slate-200 text-sm sm:text-base font-sans max-w-2xl mx-auto mb-8 opacity-90">
              {language === 'mr' 
                ? 'उत्कृष्ट दर्जाच्या उत्पादनांसाठी आजच आमच्याशी संपर्क साधा.'
                : 'Contact us today for premium quality blends and unmatched taste that your customers will love.'}
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-brand-accent bg-brand-accent text-white font-bold rounded-lg text-sm hover:bg-brand-accent-hover hover:border-brand-accent-hover transition-colors uppercase tracking-widest"
            >
              {language === 'mr' ? 'चौकशी करा' : 'Inquire Now'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
