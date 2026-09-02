import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useRouter, Link } from '../../router/Router';
import { TeaLeafIcon } from '../common/TeaLeafIcon';
import { Menu as MenuIcon, X } from 'lucide-react';

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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: { en: 'Home', mr: 'मुख्य पृष्ठ' }, url: '/' },
    { label: { en: 'Our Story', mr: 'आमची कथा' }, url: '/about' },
    { label: { en: 'Process', mr: 'प्रक्रिया' }, url: '/process' },
    { label: { en: 'Tea Catalogue', mr: 'चहा कॅटलॉग' }, url: '/products' },
    { label: { en: 'Contact', mr: 'संपर्क' }, url: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-brand-surface shadow-sm py-3 border-b border-brand-border'
          : 'bg-brand-surface/95 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-2.5"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-accent flex items-center justify-center p-1.5 text-white">
              <TeaLeafIcon className="w-full h-full text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-rajwada text-xl font-bold tracking-wider text-brand-primary-dark">
                LATA TEA
              </span>
              <span className="text-[9px] font-sans uppercase tracking-[0.2em] text-brand-text-muted -mt-1">
                {language === 'mr' ? 'अस्सल गूळ चहा' : 'Pure Jaggery Chai'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((item, idx) => {
              const isActive = path === item.url || (path === '' && item.url === '/');
              return (
                <Link
                  key={idx}
                  to={item.url}
                  className={`text-xs font-medium tracking-wide uppercase transition-colors py-1 ${
                    isActive
                      ? 'text-brand-accent font-bold border-b-2 border-brand-accent'
                      : 'text-brand-text-muted hover:text-brand-primary'
                  }`}
                >
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Language & Sample Request */}
          <div className="flex items-center gap-3">
            
            {/* Language Switcher (EN | मराठी) */}
            <div className="inline-flex items-center p-0.5 rounded-md bg-brand-background border border-brand-border text-xs">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  language === 'en'
                    ? 'bg-brand-accent text-white font-bold'
                    : 'text-brand-text-muted hover:text-brand-primary'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  language === 'mr'
                    ? 'bg-brand-accent text-white font-bold'
                    : 'text-brand-text-muted hover:text-brand-primary'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Request Samples CTA */}
            <button
              type="button"
              onClick={() => onOpenInquiry?.()}
              className="hidden sm:inline-flex items-center px-4 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider bg-brand-accent hover:bg-brand-accent-hover text-white transition-colors"
            >
              {language === 'mr' ? 'नमुना मागवा' : 'Request Samples'}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md bg-brand-background text-brand-primary border border-brand-border"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-brand-surface border-t border-brand-border px-5 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                to={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-brand-text-muted hover:text-brand-primary py-1.5 border-b border-brand-border"
              >
                {t(item.label)}
              </Link>
            ))}
          </nav>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry?.();
              }}
              className="w-full py-2 rounded-md bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold uppercase tracking-wider text-center"
            >
              {language === 'mr' ? 'नमुना मागवा' : 'Request Samples'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
