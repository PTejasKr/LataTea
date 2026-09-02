import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  Copy, 
  Check, 
  MessageCircle 
} from 'lucide-react';

interface RegistrationAndContactProps {
  isDraftPreview?: boolean;
}

export const RegistrationAndContact: React.FC<RegistrationAndContactProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, language } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const contact = state.contact;
  const [copiedBank, setCopiedBank] = useState(false);

  const handleCopyBank = () => {
    const text = `Purple Bean Agro Industries Private Limited\nBank: IDFC First Bank\nA/C No: 10227953860\nIFSC: IDFB0041438`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const whatsappNumber = contact.whatsapp?.replace(/[^0-9]/g, '') || '917666953873';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20LataTea%2C%20I%20would%20like%20to%20inquire%20about%20your%20tea%20products%20and%20request%20samples.`;

  return (
    <section id="contact" className="py-14 sm:py-20 bg-[#F8FAF8] relative border-t border-[#E2ECE3]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-[#2E7D32] uppercase block mb-1">
            {language === 'mr' ? 'कायदेशीर तपशील' : 'STATUTORY DETAILS'}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-[#1B4332] tracking-tight">
            {language === 'mr' ? 'नोंदणी आणि संपर्क' : 'Registration & Business Inquiries'}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#5A6B5C] font-sans">
            {language === 'mr'
              ? 'प्रमाणित सरकारी परवाने, अन्न सुरक्षा प्रमाणपत्रे आणि अधिकृत संपर्क.'
              : 'Corporate office, food safety licenses, and direct communication channels.'}
          </p>
        </div>

        {/* 3 Clean White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Corporate Office */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2ECE3] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#EBF5EC] flex items-center justify-center text-[#2E7D32]">
                <Building2 className="w-5 h-5 text-[#2E7D32]" />
              </div>
              
              <h3 className="font-rajwada font-bold text-lg text-[#1B4332]">
                {language === 'mr' ? 'कॉर्पोरेट कार्यालय' : 'Corporate Office'}
              </h3>

              <div className="font-sans font-semibold text-xs text-[#1A291B]">
                {contact.companyName || 'Purple Bean Agro Industries Private Limited'}
              </div>

              <div className="flex items-start gap-2 text-xs text-[#5A6B5C] font-sans">
                <MapPin className="w-3.5 h-3.5 text-[#2E7D32] shrink-0 mt-0.5" />
                <span>{contact.address || 'Office 12, Business Avenue, Aundh, Pune, Maharashtra 411012'}</span>
              </div>

              <div className="flex items-center gap-2 text-xs font-sans">
                <Mail className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                <a href={`mailto:${contact.email || 'info@latatea.com'}`} className="text-[#1A291B] hover:text-[#2E7D32] font-medium">
                  {contact.email || 'info@latatea.com'}
                </a>
              </div>

              <div className="pt-2 border-t border-[#E2ECE3] space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'mr' ? 'थेट फोन संपर्क:' : 'Direct Phone:'}
                </span>
                <div className="flex items-center gap-2 text-xs font-medium text-[#1A291B]">
                  <Phone className="w-3 h-3 text-[#2E7D32]" />
                  <a href="tel:+917666953873" className="hover:text-[#2E7D32]">+91 7666953873</a>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-[#1A291B]">
                  <Phone className="w-3 h-3 text-[#2E7D32]" />
                  <a href="tel:+918483067383" className="hover:text-[#2E7D32]">+91 8483067383</a>
                </div>
              </div>
            </div>

            {/* 1-Click WhatsApp Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{language === 'mr' ? 'व्हॉट्सॲप चॅट' : '1-Click WhatsApp Chat'}</span>
              </a>
            </div>
          </div>

          {/* Card 2: Certifications & Compliance */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2ECE3] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#EBF5EC] flex items-center justify-center text-[#2E7D32]">
                <ShieldCheck className="w-5 h-5 text-[#2E7D32]" />
              </div>

              <h3 className="font-rajwada font-bold text-lg text-[#1B4332]">
                {language === 'mr' ? 'प्रमाणपत्रे आणि अनुपालन' : 'Certifications & Compliance'}
              </h3>

              <p className="text-xs text-[#5A6B5C] font-sans leading-relaxed">
                {language === 'mr' 
                  ? 'अन्न स्वच्छता आणि सुरक्षेच्या मानकांनुसार प्रमाणित.'
                  : 'Manufactured under strict ISO 22000 & FSSAI hygiene parameters.'}
              </p>

              <div className="space-y-2 pt-1">
                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-[#E2ECE3]">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {language === 'mr' ? 'एफएसएसएआय परवाना क्रमांक' : 'FSSAI LICENSE NO.'}
                  </div>
                  <div className="font-mono text-xs font-bold text-[#1B4332] mt-0.5">
                    {contact.registration.fssai || '11525996000709'}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-[#E2ECE3]">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {language === 'mr' ? 'जीएसटी क्रमांक (GSTIN)' : 'GSTIN'}
                  </div>
                  <div className="font-mono text-xs font-bold text-[#1B4332] mt-0.5">
                    {contact.registration.gst || '27AAPCP3820M1ZX'}
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-[#F8FAF8] border border-[#E2ECE3]">
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {language === 'mr' ? 'आयात-निर्यात कोड (IEC)' : 'IEC CODE'}
                  </div>
                  <div className="font-mono text-xs font-bold text-[#1B4332] mt-0.5">
                    {contact.registration.iec || 'AAPCP3820M'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-[#2E7D32]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'प्रमाणित सरकारी नोंदणी' : 'Verified Government Registration'}</span>
            </div>
          </div>

          {/* Card 3: Commercial Banking */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#E2ECE3] shadow-xs flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-[#EBF5EC] flex items-center justify-center text-[#2E7D32]">
                <CreditCard className="w-5 h-5 text-[#2E7D32]" />
              </div>

              <h3 className="font-rajwada font-bold text-lg text-[#1B4332]">
                {language === 'mr' ? 'व्यावसायिक बँक तपशील' : 'Commercial Banking'}
              </h3>

              <p className="text-xs text-[#5A6B5C] font-sans leading-relaxed">
                {language === 'mr'
                  ? 'घाऊक व्यवहारांसाठी अधिकृत बँक खाते.'
                  : 'Official account for commercial and distributor settlement.'}
              </p>

              <div className="space-y-1.5 pt-1 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">BENEFICIARY</span>
                  <span className="font-medium text-[#1A291B]">{contact.payment.accountName || 'Purple Bean Agro Industries Pvt Ltd'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">BANK & A/C</span>
                  <span className="font-mono font-bold text-[#1B4332]">IDFC First Bank • 10227953860</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">IFSC CODE</span>
                  <span className="font-mono font-bold text-[#1B4332]">IDFB0041438</span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={handleCopyBank}
                className="w-full py-2 px-3 rounded-lg bg-[#F8FAF8] hover:bg-[#EBF5EC] text-[#1B4332] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#E2ECE3] transition-colors cursor-pointer"
              >
                {copiedBank ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>{language === 'mr' ? 'कॉपी झाले!' : 'Copied!'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'बँक तपशील कॉपी करा' : 'Copy Bank Details'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
