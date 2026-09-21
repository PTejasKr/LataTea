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
  const { publishedState, language, t } = useCMS();
  const steps = publishedState.processSteps || [];

  if (steps.length === 0) return null;

  return (
    <section id="process" className="py-16 sm:py-24 bg-brand-surface relative border-t border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-pub-small font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-2">
            {t('The Process')}
          </span>
          <h2 className="font-rajwada text-pub-section font-bold text-brand-primary tracking-tight">
            {t('From Order to Delivery')}
          </h2>
          <div className="mt-4 w-16 h-1 bg-brand-accent mx-auto rounded-full"></div>
          <p className="mt-4 text-pub-body text-brand-text-muted font-sans">
            {t('Experience our transparent and efficient 7-step process designed for bulk buyers and distributors.')}
          </p>
        </div>

        <div className="relative">
          {/* Desktop continuous line connecting steps */}
          <div className="hidden lg:block absolute top-[45px] left-[5%] right-[5%] h-0.5 bg-brand-border -z-10"></div>
          
          
          {/* DESKTOP HORIZONTAL LAYOUT */}
          <div className="hidden md:grid grid-cols-7 gap-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-brand-surface border-4 border-brand-background shadow-sm flex items-center justify-center text-brand-primary group-hover:border-brand-accent group-hover:text-brand-accent transition-colors duration-300 relative z-10">
                    {ICON_MAP[step.id] || <CircleDot className="w-6 h-6" />}
                  </div>
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
              </div>
            ))}
          </div>

          {/* MOBILE SNAKE / ZIG-ZAG LAYOUT */}
          <div className="md:hidden w-full max-w-[320px] mx-auto flex flex-col pt-4 pb-8">
            
            {/* 01 */}
            <div className="w-32 mx-auto z-10 bg-brand-surface relative group">
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand-surface border-2 border-brand-accent shadow-sm flex items-center justify-center text-brand-accent">
                  {ICON_MAP[1] || <CircleDot className="w-5 h-5" />}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs shadow-md">1</div>
              </div>
              <h3 className="font-rajwada font-bold text-sm text-brand-primary text-center leading-tight mb-1 break-words">{language === 'mr' ? steps[0]?.titleMr : steps[0]?.titleEn}</h3>
              <p className="text-pub-small text-brand-text-muted font-sans text-center leading-tight break-words">{language === 'mr' ? steps[0]?.descMr : steps[0]?.descEn}</p>
            </div>

            {/* 1 to 2 */}
            <div className="border-r-2 border-b-2 border-brand-accent rounded-br-xl -mt-4 -mb-3 z-0 transition-all" style={{ width: 'calc(50% - 64px)', marginLeft: '64px', height: '48px' }} />

            {/* 02 */}
            <div className="w-32 mr-auto z-10 bg-brand-surface relative group">
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand-surface border-2 border-brand-accent shadow-sm flex items-center justify-center text-brand-accent">
                  {ICON_MAP[2] || <CircleDot className="w-5 h-5" />}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs shadow-md">2</div>
              </div>
              <h3 className="font-rajwada font-bold text-sm text-brand-primary text-center leading-tight mb-1 break-words">{language === 'mr' ? steps[1]?.titleMr : steps[1]?.titleEn}</h3>
              <p className="text-pub-small text-brand-text-muted font-sans text-center leading-tight break-words">{language === 'mr' ? steps[1]?.descMr : steps[1]?.descEn}</p>
            </div>

            {/* 2 to 3 */}
            <div className="border-l-2 border-b-2 border-brand-accent rounded-bl-xl -mt-4 -mb-3 z-0 transition-all" style={{ width: 'calc(100% - 128px)', marginLeft: '64px', height: '48px' }} />

            {/* 03 */}
            <div className="w-32 ml-auto z-10 bg-brand-surface relative group">
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand-surface border-2 border-brand-accent shadow-sm flex items-center justify-center text-brand-accent">
                  {ICON_MAP[3] || <CircleDot className="w-5 h-5" />}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs shadow-md">3</div>
              </div>
              <h3 className="font-rajwada font-bold text-sm text-brand-primary text-center leading-tight mb-1 break-words">{language === 'mr' ? steps[2]?.titleMr : steps[2]?.titleEn}</h3>
              <p className="text-pub-small text-brand-text-muted font-sans text-center leading-tight break-words">{language === 'mr' ? steps[2]?.descMr : steps[2]?.descEn}</p>
            </div>

            {/* 3 to 4 */}
            <div className="border-r-2 border-b-2 border-brand-accent rounded-br-xl -mt-4 -mb-3 z-0 transition-all" style={{ width: 'calc(100% - 128px)', marginLeft: '64px', height: '48px' }} />

            {/* 04 */}
            <div className="w-32 mr-auto z-10 bg-brand-surface relative group">
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand-surface border-2 border-brand-accent shadow-sm flex items-center justify-center text-brand-accent">
                  {ICON_MAP[4] || <CircleDot className="w-5 h-5" />}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs shadow-md">4</div>
              </div>
              <h3 className="font-rajwada font-bold text-sm text-brand-primary text-center leading-tight mb-1 break-words">{language === 'mr' ? steps[3]?.titleMr : steps[3]?.titleEn}</h3>
              <p className="text-pub-small text-brand-text-muted font-sans text-center leading-tight break-words">{language === 'mr' ? steps[3]?.descMr : steps[3]?.descEn}</p>
            </div>

            {/* 4 to 5 */}
            <div className="border-l-2 border-b-2 border-brand-accent rounded-bl-xl -mt-4 -mb-3 z-0 transition-all" style={{ width: 'calc(100% - 128px)', marginLeft: '64px', height: '48px' }} />

            {/* 05 */}
            <div className="w-32 ml-auto z-10 bg-brand-surface relative group">
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand-surface border-2 border-brand-accent shadow-sm flex items-center justify-center text-brand-accent">
                  {ICON_MAP[5] || <CircleDot className="w-5 h-5" />}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs shadow-md">5</div>
              </div>
              <h3 className="font-rajwada font-bold text-sm text-brand-primary text-center leading-tight mb-1 break-words">{language === 'mr' ? steps[4]?.titleMr : steps[4]?.titleEn}</h3>
              <p className="text-pub-small text-brand-text-muted font-sans text-center leading-tight break-words">{language === 'mr' ? steps[4]?.descMr : steps[4]?.descEn}</p>
            </div>

            {/* 5 to 6 */}
            <div className="border-r-2 border-b-2 border-brand-accent rounded-br-xl -mt-4 -mb-3 z-0 transition-all" style={{ width: 'calc(100% - 128px)', marginLeft: '64px', height: '48px' }} />

            {/* 06 */}
            <div className="w-32 mr-auto z-10 bg-brand-surface relative group">
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand-surface border-2 border-brand-accent shadow-sm flex items-center justify-center text-brand-accent">
                  {ICON_MAP[6] || <CircleDot className="w-5 h-5" />}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs shadow-md">6</div>
              </div>
              <h3 className="font-rajwada font-bold text-sm text-brand-primary text-center leading-tight mb-1 break-words">{language === 'mr' ? steps[5]?.titleMr : steps[5]?.titleEn}</h3>
              <p className="text-pub-small text-brand-text-muted font-sans text-center leading-tight break-words">{language === 'mr' ? steps[5]?.descMr : steps[5]?.descEn}</p>
            </div>

            {/* 6 to 7 */}
            <div className="border-l-2 border-b-2 border-brand-accent rounded-bl-xl -mt-4 -mb-3 z-0 transition-all" style={{ width: 'calc(50% - 64px)', marginLeft: '64px', height: '48px' }} />

            {/* 07 */}
            <div className="w-32 mx-auto z-10 bg-brand-surface relative group">
              <div className="relative mb-3 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-brand-surface border-2 border-brand-accent shadow-sm flex items-center justify-center text-brand-accent">
                  {ICON_MAP[7] || <CircleDot className="w-5 h-5" />}
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-brand-accent text-white flex items-center justify-center font-bold text-xs shadow-md">7</div>
              </div>
              <h3 className="font-rajwada font-bold text-sm text-brand-primary text-center leading-tight mb-1 break-words">{language === 'mr' ? steps[6]?.titleMr : steps[6]?.titleEn}</h3>
              <p className="text-pub-small text-brand-text-muted font-sans text-center leading-tight break-words">{language === 'mr' ? steps[6]?.descMr : steps[6]?.descEn}</p>
            </div>

          </div>

        </div>

        {/* Banner */}
        <div className="mt-20 bg-brand-primary-dark rounded-xl overflow-hidden shadow-lg relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative p-8 sm:p-12 text-center flex flex-col items-center">
            <h3 className="font-rajwada text-pub-section font-bold text-white mb-4">
              {t('Partner with Lata Teamix')}
            </h3>
            <p className="text-slate-200 text-pub-body font-sans max-w-2xl mx-auto mb-8 opacity-90">
              {t('Contact us today for premium quality blends and unmatched taste that your customers will love.')}
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-brand-accent bg-brand-accent text-white font-bold rounded-lg text-sm hover:bg-brand-accent-hover hover:border-brand-accent-hover transition-colors uppercase tracking-widest"
            >
              {t('Inquire Now')}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};



