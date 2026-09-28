import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Building2, Phone, Mail, MessageCircle, Sparkles } from 'lucide-react';

interface RegistrationAndContactProps {
  isDraftPreview?: boolean;
}

export const RegistrationAndContact: React.FC<RegistrationAndContactProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, language, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const contact = state.contact;

  const whatsappNumber = contact.whatsapp?.replace(/[^0-9]/g, '') || '917666953873';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20LataTea%2C%20I%20would%20like%20to%20inquire%20about%20your%20tea%20products%20and%20request%20samples.`;

  return (
    <section id="contact" className="py-16 sm:py-24 bg-brand-surface relative border-t border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-pub-small font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-2">
            {language === 'mr' ? 'थेट संपर्क' : 'COMMERCIAL & DISTRIBUTION'}
          </span>
          <h2 className="font-rajwada text-pub-section font-bold text-brand-primary tracking-tight">
            {t('Business Inquiries')}
          </h2>
          <div className="mt-3 w-14 h-1 bg-brand-accent mx-auto rounded-full"></div>
          <p className="mt-3 text-pub-body text-brand-text-muted font-sans">
            {language === 'mr'
              ? 'घाऊक वितरण, सॅम्पल किट आणि व्यावसायिक पुरवठ्यासाठी आमच्याशी थेट संपर्क साधा.'
              : 'Direct corporate channels for wholesale distribution, sample tasting kits, and enterprise supply.'}
          </p>
        </div>

        {/* Unified Responsive Card */}
        <div className="bg-brand-background rounded-2xl p-6 sm:p-10 border border-brand-border shadow-md">
          
          {/* Company Title Header */}
          <div className="flex items-center gap-3.5 pb-6 border-b border-brand-border">
            <div className="w-12 h-12 rounded-xl bg-brand-accent-pale flex items-center justify-center text-brand-accent shrink-0">
              <Building2 className="w-6 h-6 text-brand-accent" />
            </div>
            <div>
              <span className="text-[11px] font-sans font-bold text-brand-accent uppercase tracking-widest block">
                {t('Head Office')}
              </span>
              <h3 className="font-rajwada font-bold text-xl sm:text-2xl text-brand-primary tracking-tight">
                {contact.companyName || 'Lata Private Limited'}
              </h3>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6 border-b border-brand-border">
            
            {/* Email Contact */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                <Mail className="w-5 h-5 text-brand-accent" />
              </div>
              <div className="space-y-1">
                <span className="text-pub-small font-bold text-slate-400 uppercase tracking-wider block">
                  {t('Email:')}
                </span>
                <a
                  href={`mailto:${contact.email || 'info@latatea.com'}`}
                  className="text-brand-primary hover:text-brand-accent font-semibold text-sm sm:text-base transition-colors break-all"
                >
                  {contact.email || 'info@latatea.com'}
                </a>
              </div>
            </div>

            {/* Direct Phone Numbers */}
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-brand-surface border border-brand-border flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                <Phone className="w-5 h-5 text-brand-accent" />
              </div>
              <div className="space-y-1">
                <span className="text-pub-small font-bold text-slate-400 uppercase tracking-wider block">
                  {t('Direct Phone:')}
                </span>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base font-semibold text-brand-primary">
                  <a href="tel:+917666953873" className="hover:text-brand-accent transition-colors">+91 7666953873</a>
                  <span className="text-slate-300 hidden sm:inline">•</span>
                  <a href="tel:+918483067383" className="hover:text-brand-accent transition-colors">+91 8483067383</a>
                </div>
              </div>
            </div>

          </div>

          {/* Action Row: WhatsApp + Prompt */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-sans text-brand-text-muted text-center sm:text-left">
              <Sparkles className="w-4 h-4 text-brand-accent shrink-0" />
              <span>{language === 'mr' ? 'व्हॉट्सॲपवर त्वरित प्रतिसाद उपलब्ध' : 'Instant response available via WhatsApp'}</span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-accent to-[#e68310] hover:from-brand-accent-hover hover:to-brand-accent text-white font-bold text-xs uppercase tracking-widest shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>{t('1-Click WhatsApp Chat')}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
