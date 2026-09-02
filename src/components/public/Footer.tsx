import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { BrandLogo } from '../common/BrandLogo';
import { Link } from '../../router/Router';

export const Footer: React.FC = () => {
  const { publishedState, language, setLanguage, t } = useCMS();
  const footer = publishedState.content.footer;
  const contact = publishedState.contact;

  return (
    <footer className="bg-brand-primary-dark text-slate-300 pt-14 pb-10 border-t border-brand-border/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-brand-border/20">
          
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-5 space-y-3">
            <Link to="/" className="inline-block">
              <BrandLogo className="h-10 sm:h-12 w-auto" />
            </Link>

            <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-sm">
              {language === 'en' 
                ? 'Lata Teamix is manufactured by Purple Bean Agro Industries Private Limited in Pune, Maharashtra. Natural jaggery tea and basundi premixes.' 
                : 'पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड, पुणे. नैसर्गिक गूळ चहा आणि बासुंदी प्रीमिक्स.'}
            </p>

            {/* Language Switcher in Footer */}
            <div className="pt-2 flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Language:</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                  language === 'en'
                    ? 'bg-brand-accent text-white font-bold'
                    : 'bg-brand-primary text-slate-300 hover:text-white border border-brand-border/30'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                  language === 'mr'
                    ? 'bg-brand-accent text-white font-bold'
                    : 'bg-brand-primary text-slate-300 hover:text-white border border-brand-border/30'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-rajwada text-sm font-bold uppercase tracking-wider text-brand-accent">
              {t('Navigation')}
            </h4>
            <ul className="space-y-1.5 text-xs font-sans">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                  {t('Home')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                  {t('Our Story')}
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-slate-300 hover:text-white transition-colors">
                  {t('Process')}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-300 hover:text-white transition-colors">
                  {t('Tea Catalogue')}
                </Link>
              </li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                  {t('Contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Head Office */}
          <div className="lg:col-span-4 space-y-2 text-xs font-sans">
            <h4 className="font-rajwada text-sm font-bold uppercase tracking-wider text-brand-accent">
              {t('Head Office')}
            </h4>
            
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-white block font-semibold">{contact.companyName}</strong>
              {contact.address}
            </p>

            <div className="space-y-1 text-slate-300 pt-1">
              <div>Email: <a href={`mailto:${contact.email}`} className="text-brand-accent hover:underline">{contact.email}</a></div>
              <div>Phone: <span className="text-white">{contact.phone1}</span> | <span className="text-white">{contact.phone2}</span></div>
            </div>

            
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-slate-400">
          <div>
            {language === 'en' 
              ? '© 2026 Purple Bean Agro Industries Private Limited. All rights reserved.' 
              : '© २०२६ पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड. सर्व हक्क राखीव.'}
          </div>

          <div className="flex items-center gap-5">
            <Link to="/privacy" className="hover:text-white transition-colors">
              {t('Privacy Policy')}
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              {t('Terms of Service')}
            </Link>
            <Link to="/cms" className="text-slate-500 hover:text-brand-accent transition-colors">
              CMS Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
