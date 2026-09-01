import React, { useState, useEffect, useRef } from 'react';
import { useCMS } from '../../context/CMSContext';
import { useRouter, Link } from '../../router/Router';
import { 
  Menu, 
  X, 
  ChevronDown, 
  ShoppingBag, 
  Truck, 
  Building2, 
  Hotel, 
  Utensils, 
  Coffee, 
  Store, 
  Cpu, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface NavbarProps {
  onOpenInquiry: (productName?: string) => void;
  isDraftPreview?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, cart, setIsCartOpen } = useCMS();
  const { path, navigate } = useRouter();
  const state = isDraftPreview ? draftState : publishedState;
  const brand = state.brand;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const prodDropdownRef = useRef<HTMLDivElement>(null);
  const solDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (prodDropdownRef.current && !prodDropdownRef.current.contains(e.target as Node)) {
        setProductsDropdownOpen(false);
      }
      if (solDropdownRef.current && !solDropdownRef.current.contains(e.target as Node)) {
        setSolutionsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalCartCount = (cart || []).reduce((sum: number, item) => sum + item.quantity, 0);
  const logo = resolveSlotImage(brand.logoSlotId || 'BRAND_LOGO_PRIMARY', false, isDraftPreview);

  const solutionIcons: Record<string, React.ReactNode> = {
    corporate: <Building2 className="w-4 h-4 text-lataamber-500" />,
    hotels: <Hotel className="w-4 h-4 text-lataleaf-500" />,
    restaurants: <Utensils className="w-4 h-4 text-lataamber-500" />,
    cafes: <Coffee className="w-4 h-4 text-lataleaf-500" />,
    retail: <Store className="w-4 h-4 text-lataamber-500" />,
    vending: <Cpu className="w-4 h-4 text-lataleaf-500" />
  };

  const isActive = (targetPath: string) => {
    if (targetPath === '/' && path === '/') return true;
    if (targetPath !== '/' && path.startsWith(targetPath)) return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#122314]/95 backdrop-blur-md border-b border-amber-500/30 py-2.5 shadow-2xl'
          : 'bg-gradient-to-b from-[#0e1a10]/95 via-[#0e1a10]/80 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo Crest */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="h-12 w-28 sm:h-14 sm:w-32 transition-transform duration-300 group-hover:scale-105">
              <img
                src={logo.url || '/assets/images/tea_leaf_icon.png'}
                alt={logo.alt || 'Lata Tea Crest'}
                className="h-full w-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Primary Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            
            <Link
              to="/about"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors ${
                isActive('/about') ? 'text-amber-300 bg-white/10' : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              About
            </Link>

            {/* Products Dropdown / Mega Menu */}
            <div className="relative" ref={prodDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setProductsDropdownOpen(!productsDropdownOpen);
                  setSolutionsDropdownOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors ${
                  isActive('/products') ? 'text-amber-300 bg-white/10' : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                <span>Products</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productsDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {productsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-[#162D18] border border-amber-500/40 rounded-2xl p-3 shadow-2xl animate-fade-in backdrop-blur-xl z-50">
                  <div className="text-[10px] font-bold text-amber-400/80 uppercase tracking-widest px-3 py-1 mb-1">
                    Product Ranges
                  </div>
                  
                  <Link
                    to="/products/gud-tea"
                    onClick={() => setProductsDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
                      <TeaLeafIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1.5">
                        <span>Gud Tea Range</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-lataleaf-500/30 text-lataleaf-300">Organic</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-light mt-0.5">
                        Pure jaggery sweetened Basundi & Ginger blends.
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/sugar-tea"
                    onClick={() => setProductsDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1.5">
                        <span>Sugar Tea Range</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/30 text-amber-300">Royal</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-light mt-0.5">
                        Royal Basundi Chai & Kadak 5-Spice blends.
                      </div>
                    </div>
                  </Link>

                  <Link
                    to="/products/premixes"
                    onClick={() => setProductsDropdownOpen(false)}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-lataleaf-500/20 text-lataleaf-400 group-hover:bg-lataleaf-500 group-hover:text-white transition-colors shrink-0">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1.5">
                        <span>Vending Premixes</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300">3-in-1</span>
                      </div>
                      <div className="text-[11px] text-slate-300 font-light mt-0.5">
                        Free-flowing 10-second machine dispenser premixes.
                      </div>
                    </div>
                  </Link>

                  <div className="mt-2 pt-2 border-t border-amber-500/20">
                    <Link
                      to="/products"
                      onClick={() => setProductsDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                    >
                      <span>Explore Complete Catalogue</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Solutions Dropdown / Mega Menu */}
            <div className="relative" ref={solDropdownRef}>
              <button
                type="button"
                onClick={() => {
                  setSolutionsDropdownOpen(!solutionsDropdownOpen);
                  setProductsDropdownOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors ${
                  isActive('/solutions') ? 'text-amber-300 bg-white/10' : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                <span>Solutions</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180 text-amber-400' : ''}`} />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-96 bg-[#162D18] border border-amber-500/40 rounded-2xl p-3 shadow-2xl animate-fade-in backdrop-blur-xl z-50">
                  <div className="text-[10px] font-bold text-amber-400/80 uppercase tracking-widest px-3 py-1 mb-1">
                    B2B & HoReCa Sectors
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {(state.solutions || []).filter(s => s.isEnabled).map(sol => (
                      <Link
                        key={sol.id}
                        to={`/solutions/${sol.slug}`}
                        onClick={() => setSolutionsDropdownOpen(false)}
                        className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-white/10 transition-colors group"
                      >
                        <div className="p-1.5 rounded-lg bg-black/40 border border-amber-500/20 group-hover:border-amber-400 shrink-0">
                          {solutionIcons[sol.slug] || <Building2 className="w-3.5 h-3.5 text-amber-400" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover:text-amber-300">
                            {sol.title.split('&')[0].trim()}
                          </div>
                          <div className="text-[10px] text-slate-300 font-light truncate max-w-[110px]">
                            {sol.tagline.toLowerCase()}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-amber-500/20">
                    <Link
                      to="/solutions"
                      onClick={() => setSolutionsDropdownOpen(false)}
                      className="flex items-center justify-between px-3 py-1.5 text-xs font-bold text-amber-300 hover:text-white transition-colors"
                    >
                      <span>All Industry Applications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/preparation"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors ${
                isActive('/preparation') ? 'text-amber-300 bg-white/10' : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              Preparation
            </Link>

            <Link
              to="/our-story"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors ${
                isActive('/our-story') ? 'text-amber-300 bg-white/10' : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              Our Story
            </Link>

            <Link
              to="/contact"
              className={`px-3 py-2 rounded-lg text-xs xl:text-sm font-semibold tracking-wider uppercase transition-colors ${
                isActive('/contact') ? 'text-amber-300 bg-white/10' : 'text-slate-200 hover:text-amber-300 hover:bg-white/5'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Live Consignment Tracking Button */}
            <Link
              to="/track"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold tracking-wider uppercase text-amber-300 bg-black/40 hover:bg-black/60 border border-amber-400/40 hover:border-amber-400 transition-all shadow-md"
              title="Track your order consignment"
            >
              <Truck className="w-3.5 h-3.5 text-lataamber-400" />
              <span>Track Order</span>
            </Link>

            {/* Chai Cart Drawer Trigger */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-amber-400/30 hover:border-amber-400 transition-all shadow-md focus:outline-none"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-lataamber-500 text-white text-[11px] font-black flex items-center justify-center shadow-lg animate-scale-up">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Primary Get Samples CTA */}
            <button
              type="button"
              onClick={() => onOpenInquiry()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase bg-gradient-to-r from-lataamber-500 to-amber-600 hover:from-lataamber-600 hover:to-amber-700 text-white shadow-xl hover:shadow-amber-500/20 hover:scale-105 transition-all duration-200"
            >
              <TeaLeafIcon className="w-3.5 h-3.5" />
              <span>Get Samples</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-full bg-white/10 text-amber-300 border border-amber-400/30"
              aria-label="Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-lataamber-500 text-white text-[10px] font-black flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-black/50 text-white border border-amber-400/30 hover:text-amber-300 focus:outline-none"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Responsive Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#122314]/98 border-b border-amber-500/30 backdrop-blur-2xl px-5 py-6 max-h-[85vh] overflow-y-auto shadow-2xl animate-fade-in text-white space-y-4">
          
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-100 hover:bg-white/10 hover:text-amber-300"
            >
              Home
            </Link>
            
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-100 hover:bg-white/10 hover:text-amber-300"
            >
              About
            </Link>

            <div className="py-2 border-y border-amber-500/20 my-2">
              <div className="px-4 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                Products
              </div>
              <Link
                to="/products/gud-tea"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-2 text-sm text-slate-200 hover:text-amber-300"
              >
                • Gud Tea Range (Organic Jaggery)
              </Link>
              <Link
                to="/products/sugar-tea"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-2 text-sm text-slate-200 hover:text-amber-300"
              >
                • Sugar Tea Range (Royal Basundi)
              </Link>
              <Link
                to="/products/premixes"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-2 text-sm text-slate-200 hover:text-amber-300"
              >
                • Vending Premixes (3-in-1)
              </Link>
              <Link
                to="/products"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-6 py-2 text-sm font-bold text-amber-300"
              >
                • Explore All Products →
              </Link>
            </div>

            <div className="py-2 border-b border-amber-500/20 mb-2">
              <div className="px-4 text-xs font-bold text-amber-400 uppercase tracking-widest mb-2">
                Industry Solutions
              </div>
              {(state.solutions || []).map(sol => (
                <Link
                  key={sol.id}
                  to={`/solutions/${sol.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-6 py-1.5 text-xs text-slate-200 hover:text-amber-300"
                >
                  • {sol.title}
                </Link>
              ))}
            </div>

            <Link
              to="/preparation"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-100 hover:bg-white/10 hover:text-amber-300"
            >
              Preparation Guide
            </Link>

            <Link
              to="/our-story"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-100 hover:bg-white/10 hover:text-amber-300"
            >
              Our Story
            </Link>

            <Link
              to="/track"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-amber-300 hover:bg-white/10"
            >
              Track Consignment
            </Link>

            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider text-slate-100 hover:bg-white/10 hover:text-amber-300"
            >
              Contact & Inquiry
            </Link>
          </div>

          <div className="pt-3 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              className="w-full py-3 rounded-xl text-xs font-bold uppercase tracking-widest bg-lataamber-500 text-white flex items-center justify-center gap-2 shadow-lg"
            >
              <TeaLeafIcon className="w-4 h-4" />
              <span>Get Free Samples</span>
            </button>
          </div>

        </div>
      )}
    </header>
  );
};
