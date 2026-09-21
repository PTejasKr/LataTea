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
      title: { en: '100% Cane Jaggery', mr: '१००% नैसर्गिक गूळ' },
      desc: { en: 'Sweetened with unrefined jaggery. No white sugar or synthetic syrup.', mr: 'केवळ नैसर्गिक गूळ. पांढरी साखर किंवा सिरप नाही.' }
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-[#F89E22]" />,
      title: { en: 'Non-Curdling Guarantee', mr: 'दूध न फाटण्याची हमी' },
      desc: { en: 'Balanced formulation lets you boil directly in fresh milk.', mr: 'थेट दुधात उकळण्यासाठी संतुलित मिश्रण.' }
    },
    {
      icon: <Award className="w-5 h-5 text-[#F89E22]" />,
      title: { en: 'Certified Production', mr: 'प्रमाणित उत्पादन' },
      desc: { en: 'Blended and packed under FSSAI & ISO 22000 in Pune.', mr: 'पुण्यातील नोंदणीकृत युनिटमध्ये स्वच्छता मानकांसह पॅकिंग.' }
    },
    {
      icon: <Clock className="w-5 h-5 text-[#F89E22]" />,
      title: { en: '3-Minute Preparation', mr: '३ मिनिटांत तयार' },
      desc: { en: 'Quick boiling ritual for homes, offices, and cafés.', mr: 'घरे आणि कार्यालयांसाठी जलद आणि खात्रीशीर पद्धत.' }
    }
  ];

  return (
    <section className="py-14 sm:py-18 bg-white text-[#1A291B] border-t border-[#E2ECE3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <span className="text-pub-small font-sans font-semibold tracking-widest text-[#F89E22] uppercase block mb-1">
            {t('WHY LATA TEAMIX')}
          </span>
          <h2 className="font-rajwada text-pub-section font-bold text-[#1B4332] tracking-tight">
            {t('Why Business & Families Choose Us')}
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



