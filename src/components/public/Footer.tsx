import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Phone, Mail, MapPin, ChevronUp, ShieldCheck } from 'lucide-react';

interface FooterProps {
  isDraftPreview?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const footer = state.content.footer;
  const contact = state.contact;
  const logoData = resolveSlotImage(state.brand.lightLogoSlotId || 'BRAND_LOGO_LIGHT', false, isDraftPreview);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = contact.socials;

  return (
    <footer className="bg-[#0c1a0d] text-slate-300 border-t border-latagreen-800/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid (3 Columns, Quick Navigation removed as requested) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="h-12 flex items-center">
              {logoData.url ? (
                <img src={logoData.url} alt={logoData.alt} className="h-10 w-auto" />
              ) : (
                <span className="font-rajwada font-bold text-3xl text-white tracking-wider">
                  Lata<span className="text-lataamber-400 font-sans text-sm ml-1 font-semibold">TEAMIX</span>
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
              {footer.aboutText}
            </p>
            <div className="text-xs text-amber-300 font-royal font-semibold">
              Natural Sweetness • Traditional Goodness
            </div>
          </div>

          {/* Contact Details & Official Statutory Details */}
          <div className="space-y-3 text-xs sm:text-sm font-sans">
            <h4 className="font-rajwada font-bold text-lg text-white uppercase tracking-widest mb-3">
              Contact & Compliance
            </h4>

            {contact.phone1 ? (
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-lataamber-400 shrink-0" />
                <a href={`tel:${contact.phone1}`} className="hover:text-white transition-colors">{contact.phone1}</a>
              </div>
            ) : null}

            {contact.email ? (
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-lataamber-400 shrink-0" />
                <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors break-all">{contact.email}</a>
              </div>
            ) : null}

            {contact.address ? (
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="w-4 h-4 text-lataamber-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400 leading-relaxed">{contact.address}</span>
              </div>
            ) : null}

            {contact.registration.fssai ? (
              <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>FSSAI Lic: {contact.registration.fssai}</span>
              </div>
            ) : null}
          </div>

          {/* Legal & Social Handles */}
          <div className="space-y-4 font-sans">
            <h4 className="font-rajwada font-bold text-lg text-white uppercase tracking-widest mb-3">
              Legal & Community
            </h4>
            <div className="flex flex-col space-y-2 text-xs uppercase tracking-wider">
              {footer.legalLinks.map((link, idx) => (
                <a key={idx} href={link.url} className="hover:text-lataamber-400 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="text-[11px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                Follow LataTea
              </div>
              <div className="flex items-center gap-2.5">
                {socials.instagram && (
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-lataamber-500 hover:text-white transition-colors" title="Instagram">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                )}
                {socials.facebook && (
                  <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-lataamber-500 hover:text-white transition-colors" title="Facebook">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.592 0 9 1.583 9 4.615V8z"/></svg>
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-lataamber-500 hover:text-white transition-colors" title="LinkedIn">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
                  </a>
                )}
                {socials.youtube && (
                  <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-lataamber-500 hover:text-white transition-colors" title="YouTube">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                )}
                {socials.twitter && (
                  <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-white/10 hover:bg-lataamber-500 hover:text-white transition-colors" title="X / Twitter">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-sans">
          <div>
            {footer.copyrightText}
            {contact.companyName && <span className="ml-2 font-medium text-slate-400">| {contact.companyName}</span>}
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors group"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
};
