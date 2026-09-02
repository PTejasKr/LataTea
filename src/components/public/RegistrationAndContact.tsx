import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck, 
  CreditCard,
  CheckCircle2,
  Copy,
  Check,
  MessageCircle
} from 'lucide-react';

interface RegistrationAndContactProps {
  isDraftPreview?: boolean;
}

export const RegistrationAndContact: React.FC<RegistrationAndContactProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, language, t } = useCMS();
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
    <section id="contact" className="py-16 sm:py-20 bg-[#FAF6EE] relative border-t border-amber-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-sans font-semibold tracking-[0.2em] text-amber-700 uppercase block mb-2">
            {language === 'mr' ? 'कायदेशीर तपशील' : 'STATUTORY DETAILS'}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-4xl font-bold text-[#1E3F20] tracking-tight">
            {language === 'mr' ? 'नोंदणी आणि संपर्क' : 'Registration & Contact'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 font-sans leading-relaxed">
            {language === 'mr'
              ? 'प्रमाणित सरकारी परवाने, अन्न सुरक्षा प्रमाणपत्रे आणि अधिकृत संपर्क.'
              : 'Corporate office, food safety licenses, and direct communication channels.'}
          </p>
        </div>

        {/* 3 Clean Statutory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Corporate Office */}
          <div className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF6EE] flex items-center justify-center text-[#1E3F20] border border-amber-200">
                <Building2 className="w-6 h-6 text-[#1E3F20]" />
              </div>
              
              <h3 className="font-rajwada font-bold text-2xl text-[#1E3F20]">
                {language === 'mr' ? 'कॉर्पोरेट कार्यालय' : 'Corporate Office'}
              </h3>

              <div className="font-sans font-bold text-sm text-slate-800">
                {contact.companyName || 'Purple Bean Agro Industries Private Limited'}
              </div>

              <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-sans">
                <MapPin className="w-4 h-4 text-lataamber-600 shrink-0 mt-0.5" />
                <span>{contact.address || 'Office 12, Business Avenue, Aundh, Pune, Maharashtra 411012'}</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm font-sans">
                <Mail className="w-4 h-4 text-lataamber-600 shrink-0" />
                <a href={`mailto:${contact.email || 'info@latatea.com'}`} className="text-slate-800 hover:text-lataamber-600 font-semibold break-all">
                  {contact.email || 'info@latatea.com'}
                </a>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  {language === 'mr' ? 'थेट फोन संपर्क:' : 'Direct Inquiries:'}
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Phone className="w-3.5 h-3.5 text-lataleaf-600" />
                  <a href="tel:+917666953873" className="hover:text-amber-600">+91 7666953873</a>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Phone className="w-3.5 h-3.5 text-lataleaf-600" />
                  <a href="tel:+918483067383" className="hover:text-amber-600">+91 8483067383</a>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                  <Phone className="w-3.5 h-3.5 text-lataleaf-600" />
                  <a href="tel:+919595333976" className="hover:text-amber-600">+91 9595333976</a>
                </div>
              </div>
            </div>

            {/* 1-Click WhatsApp Option & Website */}
            <div className="space-y-3 pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-102"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{language === 'mr' ? '१-क्लिक व्हॉट्सॲप चॅट' : '1-Click WhatsApp Chat'}</span>
              </a>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 justify-center">
                <Globe className="w-3.5 h-3.5 text-slate-400" />
                <a href="https://latatea.com" target="_blank" rel="noreferrer" className="hover:text-amber-600">
                  https://latatea.com
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Certifications & Compliance */}
          <div className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-200">
                <ShieldCheck className="w-6 h-6 text-lataamber-600" />
              </div>

              <h3 className="font-rajwada font-bold text-2xl text-[#1E3F20]">
                {language === 'mr' ? 'प्रमाणपत्रे आणि अनुपालन' : 'Certifications & Compliance'}
              </h3>

              <p className="text-xs text-slate-600 font-sans leading-relaxed font-light">
                {language === 'mr' 
                  ? 'अन्न स्वच्छता आणि सुरक्षेच्या कठोर मानकांनुसार प्रमाणित.'
                  : 'Manufactured under strict ISO & FSSAI food hygiene parameters.'}
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {language === 'mr' ? 'एफएसएसएआय परवाना क्रमांक' : 'FSSAI LICENSE NO.'}
                  </div>
                  <div className="font-mono text-sm font-black text-[#1E3F20] tracking-wider mt-0.5">
                    {contact.registration.fssai || '11525996000709'}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {language === 'mr' ? 'जीएसटी क्रमांक (GSTIN)' : 'GST IDENTIFICATION NO. (GSTIN)'}
                  </div>
                  <div className="font-mono text-sm font-black text-[#1E3F20] tracking-wider mt-0.5">
                    {contact.registration.gst || '27AAPCP3820M1ZX'}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {language === 'mr' ? 'आयात-निर्यात कोड (IEC)' : 'IMPORTER-EXPORTER CODE (IEC)'}
                  </div>
                  <div className="font-mono text-sm font-black text-[#1E3F20] tracking-wider mt-0.5">
                    {contact.registration.iec || 'AAPCP3820M'}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-lataleaf-600 pt-2">
              <CheckCircle2 className="w-4 h-4 text-lataleaf-500" />
              <span>{language === 'mr' ? 'प्रमाणित सरकारी नोंदणी' : 'Verified Government Registration'}</span>
            </div>
          </div>

          {/* Card 3: Commercial Banking */}
          <div className="bg-white rounded-3xl p-8 border border-amber-200/80 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 border border-slate-200">
                <CreditCard className="w-6 h-6 text-slate-700" />
              </div>

              <h3 className="font-rajwada font-bold text-2xl text-[#1E3F20]">
                {language === 'mr' ? 'व्यावसायिक बँक तपशील' : 'Commercial Banking'}
              </h3>

              <p className="text-xs text-slate-600 font-sans leading-relaxed font-light">
                {language === 'mr'
                  ? 'घाऊक आणि संस्थात्मक व्यवहारांसाठी अधिकृत बँक खाते.'
                  : 'Official account for RTGS / NEFT commercial wholesale transactions.'}
              </p>

              <div className="space-y-3 pt-2">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {language === 'mr' ? 'खातेदाराचे नाव' : 'BENEFICIARY NAME'}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {contact.payment.accountName || 'Purple Bean Agro Industries Private Limited'}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {language === 'mr' ? 'बँकेचे नाव' : 'BANK NAME'}
                  </div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">
                    {contact.payment.bankName || 'IDFC First Bank'}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {language === 'mr' ? 'चालू खाते क्रमांक' : 'CURRENT ACCOUNT NUMBER'}
                  </div>
                  <div className="font-mono text-sm font-black text-slate-900 mt-0.5 tracking-wider">
                    {contact.payment.accountNumber || '10227953860'}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    {language === 'mr' ? 'आयएफएससी कोड (IFSC)' : 'IFSC CODE'}
                  </div>
                  <div className="font-mono text-sm font-black text-slate-900 mt-0.5 tracking-wider">
                    {contact.payment.ifscCode || 'IDFB0041438'}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleCopyBank}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-slate-300 transition-all cursor-pointer"
              >
                {copiedBank ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-lataleaf-600" />
                    <span>{language === 'mr' ? 'माहिती कॉपी झाली!' : 'Copied to Clipboard!'}</span>
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
