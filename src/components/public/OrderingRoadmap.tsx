import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  MessageSquareText, 
  Coffee, 
  CheckSquare, 
  FlaskConical, 
  PackageCheck, 
  Truck, 
  MapPinHouse 
} from 'lucide-react';

export const OrderingRoadmap: React.FC = () => {
  const { language } = useCMS();

  const steps = [
    {
      id: 1,
      icon: <MessageSquareText className="w-6 h-6" />,
      titleEn: 'Enquiry & Consultation',
      titleMr: 'चौकशी आणि सल्ला',
      descEn: 'Connect with our team to discuss your tea requirements.',
      descMr: 'तुमच्या चहाच्या गरजांवर चर्चा करण्यासाठी आमच्या टीमशी संपर्क साधा.'
    },
    {
      id: 2,
      icon: <Coffee className="w-6 h-6" />,
      titleEn: 'Sample Tasting',
      titleMr: 'नमुना चाचणी',
      descEn: 'Receive and evaluate our premium tea samples.',
      descMr: 'आमचे प्रीमियम चहाचे नमुने प्राप्त करा आणि तपासा.'
    },
    {
      id: 3,
      icon: <CheckSquare className="w-6 h-6" />,
      titleEn: 'Order Confirmation',
      titleMr: 'ऑर्डर निश्चिती',
      descEn: 'Finalize your blend and place the formal order.',
      descMr: 'तुमचे मिश्रण निश्चित करा आणि अधिकृत ऑर्डर द्या.'
    },
    {
      id: 4,
      icon: <FlaskConical className="w-6 h-6" />,
      titleEn: 'Quality Testing & Blending',
      titleMr: 'गुणवत्ता चाचणी आणि मिश्रण',
      descEn: 'Fresh blending under strict quality control.',
      descMr: 'कठोर गुणवत्ता नियंत्रणाखाली ताजे मिश्रण.'
    },
    {
      id: 5,
      icon: <PackageCheck className="w-6 h-6" />,
      titleEn: 'Custom Packaging',
      titleMr: 'कस्टम पॅकेजिंग',
      descEn: 'Secure packaging to preserve aroma and freshness.',
      descMr: 'सुगंध आणि ताजेपणा टिकवण्यासाठी सुरक्षित पॅकेजिंग.'
    },
    {
      id: 6,
      icon: <Truck className="w-6 h-6" />,
      titleEn: 'Dispatch & Logistics',
      titleMr: 'पाठवणी आणि लॉजिस्टिक',
      descEn: 'Careful loading and transit through reliable partners.',
      descMr: 'विश्वसनीय भागीदारांद्वारे काळजीपूर्वक लोडिंग आणि पारवहन.'
    },
    {
      id: 7,
      icon: <MapPinHouse className="w-6 h-6" />,
      titleEn: 'Doorstep Delivery',
      titleMr: 'घरपोच वितरण',
      descEn: 'Timely delivery straight to your business location.',
      descMr: 'तुमच्या व्यावसायिक ठिकाणी वेळेवर वितरण.'
    }
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#F89E22] uppercase block mb-2">
            {language === 'mr' ? 'प्रक्रिया' : 'The Process'}
          </span>
          <h2 className="font-rajwada text-3xl sm:text-4xl font-bold text-[#1B4332] tracking-tight">
            {language === 'mr' ? 'ऑर्डर ते डिलिव्हरी' : 'From Order to Delivery'}
          </h2>
          <div className="mt-4 w-16 h-1 bg-[#F89E22] mx-auto rounded-full"></div>
          <p className="mt-4 text-sm sm:text-base text-[#5A6B5C] font-sans">
            {language === 'mr' 
              ? 'आमची पारदर्शक आणि कार्यक्षम 7-टप्प्यांची प्रक्रिया अनुभवून पहा.'
              : 'Experience our transparent and efficient 7-step process designed for bulk buyers and distributors.'}
          </p>
        </div>

        <div className="relative">
          {/* Desktop continuous line connecting steps */}
          <div className="hidden lg:block absolute top-[45px] left-[5%] right-[5%] h-0.5 bg-[#E2ECE3] -z-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 lg:gap-4">
            {steps.map((step, idx) => (
              <div key={step.id} className="relative flex flex-col items-center text-center group">
                
                {/* Number & Icon Container */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-[#F8FAF8] shadow-sm flex items-center justify-center text-[#1B4332] group-hover:border-[#F89E22] group-hover:text-[#F89E22] transition-colors duration-300 relative z-10">
                    {step.icon}
                  </div>
                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#F89E22] text-white flex items-center justify-center font-bold text-sm shadow-md z-20">
                    {step.id}
                  </div>
                </div>

                <h3 className="font-rajwada font-bold text-base text-[#1B4332] mb-2 px-2">
                  {language === 'mr' ? step.titleMr : step.titleEn}
                </h3>
                <p className="text-xs text-[#5A6B5C] font-sans px-2">
                  {language === 'mr' ? step.descMr : step.descEn}
                </p>

                {/* Mobile/Tablet connecting line */}
                {idx !== steps.length - 1 && (
                  <div className="block lg:hidden w-0.5 h-8 bg-[#E2ECE3] my-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lata Teamix Crest Banner */}
        <div className="mt-20 bg-[#1B4332] rounded-2xl overflow-hidden shadow-lg relative">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
          <div className="relative p-8 sm:p-12 text-center flex flex-col items-center">
            <h3 className="font-rajwada text-2xl sm:text-3xl font-bold text-white mb-4">
              {language === 'mr' ? 'लता टीमिक्स सह भागीदारी करा' : 'Partner with Lata Teamix'}
            </h3>
            <p className="text-[#F8FAF8] text-sm sm:text-base font-sans max-w-2xl mx-auto mb-8 opacity-90">
              {language === 'mr' 
                ? 'उत्कृष्ट गुणवत्ता आणि अतुलनीय चव मिळवण्यासाठी आजच संपर्क साधा.'
                : 'Contact us today for premium quality blends and unmatched taste that your customers will love.'}
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-[#F89E22] bg-[#F89E22] text-white font-bold rounded-lg text-sm hover:bg-transparent hover:text-[#F89E22] transition-colors uppercase tracking-widest"
            >
              {language === 'mr' ? 'आता चौकशी करा' : 'Inquire Now'}
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
