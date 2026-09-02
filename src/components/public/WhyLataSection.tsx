import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ShieldCheck, Leaf, Award, Clock } from 'lucide-react';

interface WhyLataSectionProps {
  isDraftPreview?: boolean;
}

export const WhyLataSection: React.FC<WhyLataSectionProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, t, language } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const why = state.content.whyLata;

  const points = [
    {
      icon: <Leaf className="w-5 h-5 text-[#F89E22]" />,
      title: { en: '100% Cane Jaggery', mr: 'à¥§à¥¦à¥¦% à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‚à¤³' },
      desc: { en: 'Sweetened with unrefined jaggery. No white sugar or synthetic syrup.', mr: 'à¤•à¥‡à¤µà¤³ à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‚à¤³. à¤ªà¤¾à¤‚à¤¢à¤°à¥€ à¤¸à¤¾à¤–à¤° à¤•à¤¿à¤‚à¤µà¤¾ à¤¸à¤¿à¤°à¤ª à¤¨à¤¾à¤¹à¥€.' }
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#F89E22]" />,
      title: { en: 'Non-Curdling Guarantee', mr: 'à¤¦à¥‚à¤§ à¤¨ à¤«à¤¾à¤Ÿà¤£à¥à¤¯à¤¾à¤šà¥€ à¤¹à¤®à¥€' },
      desc: { en: 'Balanced formulation lets you boil directly in fresh milk.', mr: 'à¤¥à¥‡à¤Ÿ à¤¦à¥à¤§à¤¾à¤¤ à¤‰à¤•à¤³à¤£à¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤¸à¤‚à¤¤à¥à¤²à¤¿à¤¤ à¤®à¤¿à¤¶à¥à¤°à¤£.' }
    },
    {
      icon: <Award className="w-5 h-5 text-[#F89E22]" />,
      title: { en: 'Certified Production', mr: 'à¤ªà¥à¤°à¤®à¤¾à¤£à¤¿à¤¤ à¤‰à¤¤à¥à¤ªà¤¾à¤¦à¤¨' },
      desc: { en: 'Blended and packed under FSSAI & ISO 22000 in Pune.', mr: 'à¤ªà¥à¤£à¥à¤¯à¤¾à¤¤à¥€à¤² à¤¨à¥‹à¤‚à¤¦à¤£à¥€à¤•à¥ƒà¤¤ à¤¯à¥à¤¨à¤¿à¤Ÿà¤®à¤§à¥à¤¯à¥‡ à¤¸à¥à¤µà¤šà¥à¤›à¤¤à¤¾ à¤®à¤¾à¤¨à¤•à¤¾à¤‚à¤¸à¤¹ à¤ªà¥…à¤•à¤¿à¤‚à¤—.' }
    },
    {
      icon: <Clock className="w-5 h-5 text-[#F89E22]" />,
      title: { en: '3-Minute Preparation', mr: 'à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚à¤¤ à¤¤à¤¯à¤¾à¤°' },
      desc: { en: 'Quick boiling ritual for homes, offices, and cafÃ©s.', mr: 'à¤˜à¤°à¥‡ à¤†à¤£à¤¿ à¤•à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯à¤¾à¤‚à¤¸à¤¾à¤ à¥€ à¤œà¤²à¤¦ à¤†à¤£à¤¿ à¤–à¤¾à¤¤à¥à¤°à¥€à¤¶à¥€à¤° à¤ªà¤¦à¥à¤§à¤¤.' }
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-white text-[#1A291B] border-t border-[#E2ECE3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#F89E22] uppercase block mb-1">
            {language === 'mr' ? 'à¤µà¤¿à¤¶à¥à¤µà¤¾à¤¸à¤¾à¤°à¥à¤¹à¤¤à¤¾' : 'WHY LATA TEA'}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-[#1B4332] tracking-tight">
            {language === 'mr' ? 'à¤†à¤®à¤šà¥€ à¤—à¥à¤£à¤µà¤¤à¥à¤¤à¤¾ à¤®à¤¾à¤¨à¤•à¥‡' : 'Why Business & Families Choose Us'}
          </h2>
        </div>

        {/* 4 Clean Visual Points */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className="bg-[#F8FAF8] rounded-xl p-5 border border-[#E2ECE3] space-y-2.5"
            >
              <div className="w-9 h-9 rounded-lg bg-[#EBF5EC] flex items-center justify-center">
                {pt.icon}
              </div>

              <h3 className="font-rajwada text-base font-bold text-[#1B4332]">
                {t(pt.title)}
              </h3>

              <p className="text-xs text-[#5A6B5C] font-sans leading-relaxed">
                {t(pt.desc)}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

