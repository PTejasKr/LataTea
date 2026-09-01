import React, { useState, useEffect } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Menu, X, Phone, ShoppingBag, ExternalLink } from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface NavbarProps {
  onOpenInquiry: (productName?: string) => void;
  isDraftPreview?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, cartTotalCount, setIsCartOpen } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logoData = resolveSlotImage(state.brand.logoSlotId || 'BRAND_LOGO_PRIMARY', false, isDraftPreview);
  const sortedNavItems = [...state.navigation]
    .filter(item => item.isEnabled)
    .sort((a, b) => a.order - b.order);

  const contact = state.contact;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#1E3F20]/95 backdrop-blur-md shadow-xl py-3 border-b border-amber-500/20'
            : 'bg-gradient-to-b from-[#163018]/95 via-[#1E3F20]/80 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="LataTea Home"
          >
            {logoData.url ? (
              <img
                src={logoData.url}
                alt={logoData.alt}
                style={logoData.style}
                className="h-12 md:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-rajwada font-bold text-2xl md:text-3xl text-white tracking-wider">
                  Lata<span className="text-lataamber-500 font-sans text-lg ml-1 font-semibold">TEAMIX</span>
                </span>
              </div>
            )}
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {sortedNavItems.map(item => {
              if (item.isButton) {
                return (
                  <button
                    key={item.id}
                    onClick={() => onOpenInquiry()}
                    className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-lataamber-500 text-white hover:bg-lataamber-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    <TeaLeafIcon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.url}
                  target={item.isExternal ? '_blank' : undefined}
                  rel={item.isExternal ? 'noopener noreferrer' : undefined}
                  className="px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-slate-100/90 hover:text-lataamber-400 transition-colors duration-150 flex items-center gap-1 font-sans"
                >
                  {item.label}
                  {item.isExternal && <ExternalLink className="w-3 h-3 opacity-60" />}
                </a>
              );
            })}
          </nav>

          {/* Right actions: Phone & Shopping Cart */}
          <div className="flex items-center gap-3 sm:gap-4">
            {contact.phone1 && (
              <a
                href={`tel:${contact.phone1}`}
                className="hidden md:flex items-center gap-1.5 text-xs font-medium text-amber-200 hover:text-white transition-colors font-sans"
                title="Call Us"
              >
                <Phone className="w-3.5 h-3.5 text-lataamber-400" />
                <span>{contact.phone1}</span>
              </a>
            )}

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-2xl bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              title="Open Chai Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="font-bold text-xs hidden sm:inline font-sans">Cart</span>
              {cartTotalCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#1E3F20] text-amber-300 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-amber-400 shadow-sm animate-bounce-subtle">
                  {cartTotalCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors focus:outline-none lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm lg:hidden flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#163018] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 border-l border-white/10">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="font-rajwada font-bold text-xl text-white">
                  Lata<span className="text-lataamber-400 text-sm ml-1 font-sans">TEAMIX</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-gray-300 hover:text-white rounded-md"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {sortedNavItems.map(item => {
                  if (item.isButton) {
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenInquiry();
                        }}
                        className="mt-3 w-full py-3 px-4 rounded-xl text-center font-bold text-sm uppercase tracking-wider bg-lataamber-500 text-white shadow-lg flex items-center justify-center gap-2"
                      >
                        <TeaLeafIcon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </button>
                    );
                  }
                  return (
                    <a
                      key={item.id}
                      href={item.url}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider text-slate-100 hover:bg-white/10 hover:text-lataamber-400 transition-colors font-sans"
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 space-y-3 text-xs font-sans">
              {contact.phone1 && (
                <a href={`tel:${contact.phone1}`} className="flex items-center gap-2 text-amber-200">
                  <Phone className="w-4 h-4 text-lataamber-400" />
                  <span>{contact.phone1}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
