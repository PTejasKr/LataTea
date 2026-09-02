import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  MessageCircle 
} from 'lucide-react';

interface RegistrationAndContactProps {
  isDraftPreview?: boolean;
}

export const RegistrationAndContact: React.FC<RegistrationAndContactProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, language } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const contact = state.contact;

  const whatsappNumber = contact.whatsapp?.replace(/[^0-9]/g, '') || '917666953873';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20LataTea%2C%20I%20would%20like%20to%20inquire%20about%20your%20tea%20products%20and%20request%20samples.`;

  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#F8FAF8] relative border-t border-[#E2ECE3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="max-w-xl mb-10 text-center">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#F89E22] uppercase block mb-1">
            {language === 'mr' ? 'संपर्क' : 'GET IN TOUCH'}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-[#1B4332] tracking-tight">
            {language === 'mr' ? 'संपर्क' : 'Contact Us'}
          </h2>
          <p className="mt-2 text-sm text-[#5A6B5C] font-sans">
            {language === 'mr'
              ? 'आमच्याशी थेट संपर्क साधा.'
              : 'Reach out to our Head Office for inquiries, orders, and support.'}
          </p>
        </div>

        {/* 1 Clean White Card Centered */}
        <div className="w-full max-w-md">
          {/* Card 1: Head Office */}
          <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#E2ECE3] shadow-xs flex flex-col space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-[#FFF5E6] flex items-center justify-center text-[#F89E22]">
                <Building2 className="w-6 h-6 text-[#F89E22]" />
              </div>
              
              <h3 className="font-rajwada font-bold text-xl text-[#1B4332]">
                {language === 'mr' ? 'मुख्य कार्यालय' : 'Head Office'}
              </h3>

              <div className="font-sans font-semibold text-sm text-[#1A291B]">
                {contact.companyName || 'Purple Bean Agro Industries Private Limited'}
              </div>

              <div className="flex items-start gap-3 text-sm text-[#5A6B5C] font-sans">
                <MapPin className="w-4 h-4 text-[#F89E22] shrink-0 mt-0.5" />
                <span>{contact.address || 'Office 12, Business Avenue, Aundh, Pune, Maharashtra 411012'}</span>
              </div>

              <div className="flex items-center gap-3 text-sm font-sans">
                <Mail className="w-4 h-4 text-[#F89E22] shrink-0" />
                <a href={`mailto:${contact.email || 'info@latatea.com'}`} className="text-[#1A291B] hover:text-[#F89E22] font-medium transition-colors">
                  {contact.email || 'info@latatea.com'}
                </a>
              </div>

              <div className="pt-4 border-t border-[#E2ECE3] space-y-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'mr' ? 'थेट फोन संपर्क:' : 'Direct Phone:'}
                </span>
                <div className="flex items-center gap-3 text-sm font-medium text-[#1A291B]">
                  <Phone className="w-4 h-4 text-[#F89E22]" />
                  <a href="tel:+917666953873" className="hover:text-[#F89E22] transition-colors">+91 7666953873</a>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium text-[#1A291B]">
                  <Phone className="w-4 h-4 text-[#F89E22]" />
                  <a href="tel:+918483067383" className="hover:text-[#F89E22] transition-colors">+91 8483067383</a>
                </div>
              </div>
            </div>

            {/* 1-Click WhatsApp Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>{language === 'mr' ? 'व्हॉट्सॲप चॅट' : '1-Click WhatsApp Chat'}</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

