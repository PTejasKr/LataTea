import React, { useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { OrderingRoadmap } from '../components/public/OrderingRoadmap';
import { RegistrationAndContact } from '../components/public/RegistrationAndContact';
import { RecipeMethodsSection } from '../components/public/RecipeMethodsSection';

export const ProcessPage: React.FC = () => {
  const { language } = useCMS();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Process Header */}
      <div className="pt-24 sm:pt-32 pb-14 sm:pb-20 bg-[#0A2318] text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-rajwada font-bold text-white mb-3 tracking-tight leading-tight">
            {language === 'mr' ? 'आमची प्रक्रिया' : 'Our Process'}
          </h1>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            {language === 'mr' ? 'अस्सल पारंपारिक पाककृतींपासून ते सुरळीत B2B वितरण मॉडेलपर्यंत.' : 'From authentic heritage recipes to a seamless B2B distribution model.'}
          </p>
        </div>
      </div>

      <RecipeMethodsSection />
      <OrderingRoadmap />
      <RegistrationAndContact />
    </div>
  );
};
