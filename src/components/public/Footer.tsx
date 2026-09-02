import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaLeafIcon } from '../common/TeaLeafIcon';
import { Link } from '../../router/Router';

export const Footer: React.FC = () => {
  const { publishedState, language, setLanguage, t } = useCMS();
  const footer = publishedState.content.footer;
  const contact = publishedState.contact;

  return (
    <footer className="bg-[#0E1A0F] text-slate-300 pt-20 pb-12 border-t border-amber-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center p-1 shadow-md">
                <TeaLeafIcon className="w-full h-full text-[#142615]" />
              </div>
              <span className="font-rajwada text-2xl font-bold tracking-wider text-white group-hover:text-amber-300 transition-colors">
                LATA TEA
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 font-sans font-light leading-relaxed max-w-md">
              {t(footer.aboutText)}
            </p>

            {/* Language Switcher in Footer */}
            <div className="pt-2 flex items-center gap-3 text-xs">
              <span className="text-slate-500 uppercase tracking-wider font-semibold">Language:</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  language === 'en'
                    ? 'border-amber-400 text-amber-300 font-bold bg-amber-400/10'
                    : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-3 py-1 rounded-lg border transition-all ${
                  language === 'mr'
                    ? 'border-amber-400 text-amber-300 font-bold bg-amber-400/10'
                    : 'border-white/10 text-slate-400 hover:text-white'
                }`}
              >
                मराठी (Marathi)
              </button>
            </div>
          </div>

          {/* Editorial Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-rajwada text-sm font-bold uppercase tracking-widest text-amber-400">
              {language === 'mr' ? 'अन्वेषण' : 'Explore'}
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              <li>
                <Link to="/story" className="text-slate-400 hover:text-amber-300 transition-colors">
                  {language === 'mr' ? 'आमची गाथा' : 'Our Story'}
                </Link>
              </li>
              <li>
                <Link to="/heritage" className="text-slate-400 hover:text-amber-300 transition-colors">
                  {language === 'mr' ? 'वारसा आणि परंपरा' : 'Heritage & Harvest'}
                </Link>
              </li>
              <li>
                <Link to="/craft" className="text-slate-400 hover:text-amber-300 transition-colors">
                  {language === 'mr' ? 'निर्मितीचे ५ टप्पे' : 'The 5 Craft Stages'}
                </Link>
              </li>
              <li>
                <Link to="/tea" className="text-slate-400 hover:text-amber-300 transition-colors">
                  {language === 'mr' ? 'चहा संग्रह' : 'Tea Story Collection'}
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-slate-400 hover:text-amber-300 transition-colors">
                  {language === 'mr' ? 'बासुंदी चहा अनुभूती' : 'The Basundi Experience'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-amber-300 transition-colors">
                  {language === 'mr' ? 'व्यावसायिक चौकशी' : 'Enterprise & Sample Inquiries'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Headquarters */}
          <div className="lg:col-span-4 space-y-3 text-xs font-sans">
            <h4 className="font-rajwada text-sm font-bold uppercase tracking-widest text-amber-400">
              {language === 'mr' ? 'कॉर्पोरेट कार्यालय' : 'Corporate Office'}
            </h4>
            
            <p className="text-slate-400 leading-relaxed font-light">
              <strong className="text-white block font-semibold">{contact.companyName}</strong>
              {contact.address}
            </p>

            <div className="space-y-1 text-slate-400 pt-1">
              <div>Email: <a href={`mailto:${contact.email}`} className="text-amber-300 hover:underline">{contact.email}</a></div>
              <div>Phone: <span className="text-white">{contact.phone1}</span> • <span className="text-white">{contact.phone2}</span></div>
            </div>

            <div className="pt-2 font-mono text-[11px] text-slate-500">
              FSSAI: {contact.registration.fssai} | GST: {contact.registration.gst}
            </div>
          </div>

        </div>

        {/* Bottom Statutory Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-slate-500">
          <div>{t(footer.copyrightText)}</div>

          <div className="flex items-center gap-6">
            {(footer.legalLinks || []).map((link, idx) => (
              <Link key={idx} to={link.url} className="hover:text-slate-300 transition-colors">
                {t(link.label)}
              </Link>
            ))}
            <Link to="/cms" className="text-slate-600 hover:text-amber-400 transition-colors">
              CMS Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
