import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { OrderingRoadmap } from '../components/public/OrderingRoadmap';
import { RegistrationAndContact } from '../components/public/RegistrationAndContact';
import { RecipeMethodsSection } from '../components/public/RecipeMethodsSection';
import { HelpfulVideosSection } from '../components/public/HelpfulVideosSection';

export const ProcessPage: React.FC = () => {
  const { language } = useCMS();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in pt-16 md:pt-20">
      {/* Process Header */}
      <div className="py-16 sm:py-24 bg-[#0a2318] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <span className="text-pub-small font-sans font-semibold tracking-widest text-brand-accent uppercase mb-3 block">
            {language === 'mr' ? 'लता टीमिक्स कार्यपद्धती' : 'HOW LATA TEAMIX WORKS'}
          </span>
          <h1 className="text-pub-hero font-rajwada font-bold text-white mb-4">
            {language === 'mr' ? 'आमची प्रक्रिया' : 'Our Process'}
          </h1>
          <p className="text-pub-body text-slate-200 max-w-2xl mx-auto">
            {language === 'mr' ? 'अस्सल पारंपारिक पाककृतींपासून ते सुरळीत B2B वितरण मॉडेलपर्यंत.' : 'From authentic heritage recipes to a seamless B2B distribution model.'}
          </p>
        </div>
      </div>

      <RecipeMethodsSection />
      <HelpfulVideosSection />
      <OrderingRoadmap />
      <RegistrationAndContact />
    </div>
  );
};
