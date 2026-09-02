import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { MapPin, Phone, MessageCircle } from 'lucide-react';

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
    <section id="contact" className="py-14 sm:py-20 bg-brand-background relative border-t border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-xl mb-10">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-1">
            {t('GET IN TOUCH')}
          </span>
          <h2 className="font-rajwada text-2xl sm:text-3xl font-bold text-brand-primary tracking-tight">
            {t('Business Inquiries')}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-brand-text-muted font-sans">
            {t('Head office and direct communication channels.')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-5 max-w-lg">
          
          {/* Card: Head Office */}
          <div className="bg-brand-surface rounded-xl p-5 sm:p-6 border border-brand-border shadow-sm flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-9 h-9 rounded-lg bg-brand-accent-pale flex items-center justify-center text-brand-accent">
                <MapPin className="w-5 h-5 text-brand-accent" />
              </div>

              <h3 className="font-rajwada font-bold text-lg text-brand-primary">
                {t('Head Office')}
              </h3>
              
              <div className="pt-2 border-t border-brand-border space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t('Address:')}
                </span>
                <p className="text-xs text-brand-text-muted font-sans leading-relaxed font-medium">
                  <strong className="text-brand-primary block mb-0.5">{contact.companyName || 'Purple Bean Agro Industries Pvt Ltd'}</strong>
                  {contact.address || 'Office 12, Business Avenue, Aundh, Pune, Maharashtra 411012'}
                </p>
              </div>

              <div className="pt-2 border-t border-brand-border space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t('Email:')}
                </span>
                <a href={`mailto:${contact.email || 'info@latatea.com'}`} className="text-brand-primary hover:text-brand-accent font-medium text-xs">
                  {contact.email || 'info@latatea.com'}
                </a>
              </div>

              <div className="pt-2 border-t border-brand-border space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {t('Direct Phone:')}
                </span>
                <div className="flex items-center gap-2 text-xs font-medium text-brand-primary">
                  <Phone className="w-3 h-3 text-brand-accent" />
                  <a href="tel:+917666953873" className="hover:text-brand-accent">+91 7666953873</a>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-brand-primary">
                  <Phone className="w-3 h-3 text-brand-accent" />
                  <a href="tel:+918483067383" className="hover:text-brand-accent">+91 8483067383</a>
                </div>
              </div>
            </div>

            {/* 1-Click WhatsApp Button */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-lg bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>{t('1-Click WhatsApp Chat')}</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
