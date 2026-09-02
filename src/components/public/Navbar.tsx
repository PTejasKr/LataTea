import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useRouter, Link } from '../../router/Router';
import { TeaLeafIcon } from '../common/TeaLeafIcon';
import { Menu as MenuIcon, X, Globe } from 'lucide-react';

interface NavbarProps {
  onOpenInquiry?: (teaSlug?: string) => void;
  isDraftPreview?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  const { publishedState, draftState, language, setLanguage, t } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const { path } = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = (state.navigation || []).filter(item => item.isEnabled);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#142615]/95 backdrop-blur-md py-3 shadow-lg border-b border-amber-500/20'
          : 'bg-gradient-to-b from-[#142615]/90 via-[#142615]/60 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity — Editorial & Timeless */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center p-1.5 shadow-md group-hover:scale-105 transition-transform">
              <TeaLeafIcon className="w-full h-full text-[#142615]" />
            </div>
            <div className="flex flex-col">
              <span className="font-rajwada text-2xl font-bold tracking-wider text-amber-100 group-hover:text-amber-300 transition-colors">
                LATA TEA
              </span>
              <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-amber-400/80 -mt-1 font-semibold">
                {language === 'mr' ? 'अस्सल बासुंदी चहा' : 'Royal Basundi Chai'}
              </span>
            </div>
          </Link>

          {/* Desktop Editorial Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map(item => {
              const isActive = path === item.url;
              return (
                <Link
                  key={item.id}
                  to={item.url}
                  className={`text-xs font-semibold tracking-wider uppercase transition-colors relative py-1 ${
                    isActive
                      ? 'text-amber-300 font-bold'
                      : 'text-slate-200 hover:text-amber-300'
                  }`}
                >
                  {t(item.label)}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Block: Language Switcher & Enquiry CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Language Switcher (EN | मराठी) */}
            <div className="flex items-center p-0.5 rounded-full bg-black/40 border border-amber-400/30 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'mr'
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-300 hover:text-white'
                }`}
                title="मराठीत पहा"
              >
                मराठी
              </button>
            </div>

            {/* Enterprise Sample Request Button */}
            <button
              type="button"
              onClick={() => onOpenInquiry?.()}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md hover:shadow-lg transition-all hover:scale-102"
            >
              <span>{language === 'mr' ? 'नमुना चहा मागवा' : 'Request Samples'}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-black/40 text-amber-200 hover:text-white border border-amber-500/30 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#142615] border-t border-amber-500/20 px-6 py-6 shadow-2xl animate-fade-in space-y-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map(item => (
              <Link
                key={item.id}
                to={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold tracking-wide uppercase text-slate-200 hover:text-amber-300 py-1.5 border-b border-white/5 flex items-center justify-between"
              >
                <span>{t(item.label)}</span>
                <span className="text-xs text-amber-400/60">→</span>
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-amber-500/20 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry?.();
              }}
              className="w-full py-3 rounded-xl text-center text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md"
            >
              {language === 'mr' ? 'नमुना चहा मागवा' : 'Request Enterprise Samples'}
            </button>

            <div className="text-[11px] text-slate-400 text-center font-sans">
              Purple Bean Agro Industries Pvt Ltd • Pune, Maharashtra
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
