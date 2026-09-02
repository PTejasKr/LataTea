import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useRouter, Link } from '../../router/Router';
import { BrandLogo } from '../common/BrandLogo';
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
    { label: 'Home', url: '/' },
    { label: 'Our Story', url: '/about' },
    { label: 'Process', url: '/process' },
    { label: 'Tea Catalogue', url: '/products' },
    { label: 'Contact', url: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled ? 'bg-[#0a2318] shadow-md py-3 border-b border-[#0a2318]/20' : 'bg-[#0a2318]/95 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Identity */}
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center"
          >
            <BrandLogo className="h-10 sm:h-12 w-auto" />
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
                      : 'text-white/80 hover:text-white'
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
            <div className="inline-flex items-center p-0.5 rounded-md bg-white/10 border border-white/20 text-xs">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
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
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                  language === 'mr'
                    ? 'bg-brand-accent text-white shadow-xs'
                    : 'text-white/70 hover:text-white'
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
              {t('Request Samples')}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-md bg-transparent text-white border border-white/20"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a2318] border-t border-white/10 px-5 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((item, idx) => (
              <Link
                key={idx}
                to={item.url}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-white/80 hover:text-white py-1.5 border-b border-white/10"
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
              {t('Request Samples')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
