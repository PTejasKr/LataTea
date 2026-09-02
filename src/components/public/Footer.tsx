import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaLeafIcon } from '../common/TeaLeafIcon';
import { Link } from '../../router/Router';

export const Footer: React.FC = () => {
  const { publishedState, language, setLanguage, t } = useCMS();
  const footer = publishedState.content.footer;
  const contact = publishedState.contact;

  return (
    <footer className="bg-[#133023] text-slate-300 pt-14 pb-10 border-t border-[#2D6A4F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-[#2D6A4F]/60">
          
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-5 space-y-3">
            <Link to="/" className="flex items-center gap-2.5 inline-flex">
              <div className="w-8 h-8 rounded-lg bg-[#4CAF50] flex items-center justify-center p-1.5 shadow-xs">
                <TeaLeafIcon className="w-full h-full text-white" />
              </div>
              <span className="font-rajwada text-xl font-bold tracking-wider text-white">
                LATA TEA
              </span>
            </Link>

            <p className="text-xs text-slate-300 font-sans leading-relaxed max-w-sm">
              {t(footer.aboutText)}
            </p>

            {/* Language Switcher in Footer */}
            <div className="pt-2 flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">Language:</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                  language === 'en'
                    ? 'bg-[#4CAF50] text-white font-bold'
                    : 'bg-[#1B4332] text-slate-300 hover:text-white border border-[#2D6A4F]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-0.5 rounded text-xs transition-colors ${
                  language === 'mr'
                    ? 'bg-[#4CAF50] text-white font-bold'
                    : 'bg-[#1B4332] text-slate-300 hover:text-white border border-[#2D6A4F]'
                }`}
              >
                मराठी
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-2">
            <h4 className="font-rajwada text-sm font-bold uppercase tracking-wider text-[#A5D6A7]">
              {language === 'mr' ? 'दुवे' : 'Navigation'}
            </h4>
            <ul className="space-y-1.5 text-xs font-sans">
              <li>
                <Link to="/" className="text-slate-300 hover:text-white transition-colors">
                  {language === 'mr' ? 'मुख्य पृष्ठ' : 'Home'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                  {language === 'mr' ? 'आमच्याबद्दल' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-300 hover:text-white transition-colors">
                  {language === 'mr' ? 'उत्पादने' : 'Product List'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                  {language === 'mr' ? 'संपर्क' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Office */}
          <div className="lg:col-span-4 space-y-2 text-xs font-sans">
            <h4 className="font-rajwada text-sm font-bold uppercase tracking-wider text-[#A5D6A7]">
              {language === 'mr' ? 'नोंदणीकृत कार्यालय' : 'Registered Office'}
            </h4>
            
            <p className="text-slate-300 leading-relaxed">
              <strong className="text-white block font-semibold">{contact.companyName}</strong>
              {contact.address}
            </p>

            <div className="space-y-1 text-slate-300 pt-1">
              <div>Email: <a href={`mailto:${contact.email}`} className="text-[#A5D6A7] hover:underline">{contact.email}</a></div>
              <div>Phone: <span className="text-white">{contact.phone1}</span> • <span className="text-white">{contact.phone2}</span></div>
            </div>

            <div className="pt-1 font-mono text-[11px] text-slate-400">
              FSSAI: {contact.registration.fssai} | GST: {contact.registration.gst}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans text-slate-400">
          <div>{t(footer.copyrightText)}</div>

          <div className="flex items-center gap-5">
            {(footer.legalLinks || []).map((link, idx) => (
              <Link key={idx} to={link.url} className="hover:text-white transition-colors">
                {t(link.label)}
              </Link>
            ))}
            <Link to="/cms" className="text-slate-500 hover:text-[#A5D6A7] transition-colors">
              CMS Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
