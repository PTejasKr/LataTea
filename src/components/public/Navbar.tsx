import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useRouter, Link } from '../../router/Router';
import { BrandLogo } from '../common/BrandLogo';
import { Menu as MenuIcon, X, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

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
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [path]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Home', url: '/' },
    { label: 'Our Story', url: '/about' },
    { label: 'Process', url: '/process' },
    { label: 'Tea Catalogue', url: '/products' },
    { label: 'Contact', url: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#061911]/95 backdrop-blur-md shadow-xl py-2.5 sm:py-3 border-b border-white/10' 
            : 'bg-[#081e15]/90 backdrop-blur-sm py-3.5 sm:py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Brand Identity / Logo */}
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center group transition-transform duration-200 active:scale-95"
            >
              <BrandLogo className="h-9 sm:h-11 w-auto transition-all" />
            </Link>

            {/* Desktop Navigation Menu (PC) */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((item, idx) => {
                const isActive = path === item.url || (path === '' && item.url === '/');
                return (
                  <Link
                    key={idx}
                    to={item.url}
                    className={`text-xs uppercase tracking-widest font-semibold py-1.5 transition-all duration-200 relative group/link ${
                      isActive
                        ? 'text-brand-accent font-bold'
                        : 'text-white/85 hover:text-white'
                    }`}
                  >
                    <span>{t(item.label)}</span>
                    {isActive ? (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-accent rounded-full shadow-xs animate-fade-in" />
                    ) : (
                      <span className="absolute -bottom-1 left-1/2 right-1/2 h-0.5 bg-brand-accent rounded-full transition-all duration-300 opacity-0 group-hover/link:left-0 group-hover/link:right-0 group-hover/link:opacity-100" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Language & Sample Request CTA */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              
              {/* Bilingual Segmented Toggle (EN | मराठी) */}
              <div className="inline-flex items-center p-0.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-xs text-xs shadow-inner">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-brand-accent text-white shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('mr')}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider transition-all cursor-pointer ${
                    language === 'mr'
                      ? 'bg-brand-accent text-white shadow-xs'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  मराठी
                </button>
              </div>

              {/* Request Samples Button (Desktop) */}
              <button
                type="button"
                onClick={() => onOpenInquiry?.()}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-brand-accent to-[#e68310] hover:from-brand-accent-hover hover:to-brand-accent text-white shadow-md hover:shadow-brand-accent/20 transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('Request Samples')}</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors cursor-pointer min-w-[38px] min-h-[38px] flex items-center justify-center"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer & Backdrop */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-out Sheet Panel */}
          <div className="relative z-10 w-full bg-[#081e15] border-t border-white/15 shadow-2xl rounded-t-2xl p-5 sm:p-6 space-y-5 max-h-[85vh] overflow-y-auto">
            
            {/* Sheet Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <BrandLogo className="h-8 w-auto" />
                <span className="text-xs font-mono uppercase tracking-widest text-brand-accent font-bold">Lata Teamix</span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full bg-white/10 text-white/80 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col divide-y divide-white/10">
              {navLinks.map((item, idx) => {
                const isActive = path === item.url || (path === '' && item.url === '/');
                return (
                  <Link
                    key={idx}
                    to={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between py-3.5 text-sm font-semibold tracking-wider uppercase transition-colors ${
                      isActive ? 'text-brand-accent font-bold' : 'text-white/90 hover:text-white'
                    }`}
                  >
                    <span>{t(item.label)}</span>
                    <ArrowRight className={`w-4 h-4 transition-transform ${isActive ? 'text-brand-accent translate-x-1' : 'text-white/40'}`} />
                  </Link>
                );
              })}
            </nav>

            {/* Actions Bottom Bar */}
            <div className="pt-3 border-t border-white/10 space-y-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry?.();
                }}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-brand-accent to-[#e68310] text-white text-xs font-bold uppercase tracking-wider text-center shadow-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t('Request Samples')}</span>
              </button>

              <a
                href={`https://wa.me/${publishedState.contact.whatsapp?.replace(/[^0-9]/g, '') || '917666953873'}?text=Hi%20LataTea%2C%20I%20would%20like%20to%20inquire%20about%20your%20tea%20products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white/90 text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 border border-white/15 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>{t('1-Click WhatsApp Chat')}</span>
              </a>
            </div>

          </div>
        </div>
      )}
    </>
  );
};


