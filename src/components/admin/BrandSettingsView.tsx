import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Palette, RefreshCw, Check } from 'lucide-react';

export const BrandSettingsView: React.FC = () => {
  const { draftState, updateDraft, resolveSlotImage } = useCMS();
  const brand = draftState.brand;

  const handleColorChange = (key: keyof typeof brand, val: string) => {
    updateDraft(prev => ({
      ...prev,
      brand: {
        ...prev.brand,
        [key]: val
      }
    }));
  };

  const handleResetBrochureColors = () => {
    updateDraft(prev => ({
      ...prev,
      brand: {
        ...prev.brand,
        primaryColor: '#1E3F20',
        secondaryColor: '#8DB843',
        accentColor: '#E58A1F',
        backgroundColor: '#FAF6EE',
        textColor: '#1A2416'
      }
    }));
  };

  const logoPrimary = resolveSlotImage(brand.logoSlotId || 'BRAND_LOGO_PRIMARY', false, true);
  const logoLight = resolveSlotImage(brand.lightLogoSlotId || 'BRAND_LOGO_LIGHT', false, true);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#222]">
        <div>
          <h2 className="text-cms-section text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-white" />
            <span>Brand Styling & Design System</span>
          </h2>
          <p className="text-cms-small text-neutral-400 mt-1">
            Global color coding, logo bindings, and typography variables derived from the LataTea brochure.
          </p>
        </div>

        <button
          onClick={handleResetBrochureColors}
          className="px-4 py-2 rounded-sm bg-[#111111] hover:bg-[#222222] text-neutral-300 text-cms-btn flex items-center gap-1.5 self-start"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Restore Brochure Colors</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Color Palette Controls */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-[#222]  space-y-5">
          <h3 className="text-cms-body font-bold text-white mb-2 flex items-center gap-2">
            
            <span>Brand Palette (Brochure Spec)</span>
          </h3>

          <div className="space-y-4 text-cms-small">
            {/* Primary Green */}
            <div className="p-4 rounded-sm bg-[#0a0a0a] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Primary Brand Green</div>
                <div className="text-cms-small text-neutral-400">Main header, banners, deep brand identity</div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={brand.primaryColor}
                  onChange={e => handleColorChange('primaryColor', e.target.value)}
                  className="w-9 h-9 rounded-sm border border-[#222] bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={brand.primaryColor}
                  onChange={e => handleColorChange('primaryColor', e.target.value)}
                  className="w-24 px-2.5 py-1.5 rounded-sm bg-[#111111] border border-[#222] font-mono text-white text-cms-small uppercase"
                />
              </div>
            </div>

            {/* Accent Ochre/Marigold */}
            <div className="p-4 rounded-sm bg-[#0a0a0a] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Accent Gold / Marigold</div>
                <div className="text-cms-small text-neutral-400">Teamix pill badge, CTA buttons, highlights</div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={brand.accentColor}
                  onChange={e => handleColorChange('accentColor', e.target.value)}
                  className="w-9 h-9 rounded-sm border border-[#222] bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={brand.accentColor}
                  onChange={e => handleColorChange('accentColor', e.target.value)}
                  className="w-24 px-2.5 py-1.5 rounded-sm bg-[#111111] border border-[#222] font-mono text-white text-cms-small uppercase"
                />
              </div>
            </div>

            {/* Secondary Leaf Green */}
            <div className="p-4 rounded-sm bg-[#0a0a0a] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Secondary Leaf Green</div>
                <div className="text-cms-small text-neutral-400">Sprout leaves, badges, positive status</div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={brand.secondaryColor}
                  onChange={e => handleColorChange('secondaryColor', e.target.value)}
                  className="w-9 h-9 rounded-sm border border-[#222] bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={brand.secondaryColor}
                  onChange={e => handleColorChange('secondaryColor', e.target.value)}
                  className="w-24 px-2.5 py-1.5 rounded-sm bg-[#111111] border border-[#222] font-mono text-white text-cms-small uppercase"
                />
              </div>
            </div>

            {/* Background Cream */}
            <div className="p-4 rounded-sm bg-[#0a0a0a] border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Background Warm Cream</div>
                <div className="text-cms-small text-neutral-400">Body backdrop, card containers</div>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={brand.backgroundColor}
                  onChange={e => handleColorChange('backgroundColor', e.target.value)}
                  className="w-9 h-9 rounded-sm border border-[#222] bg-transparent cursor-pointer"
                />
                <input
                  type="text"
                  value={brand.backgroundColor}
                  onChange={e => handleColorChange('backgroundColor', e.target.value)}
                  className="w-24 px-2.5 py-1.5 rounded-sm bg-[#111111] border border-[#222] font-mono text-white text-cms-small uppercase"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Logo Slots & Typography */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-[#222]  space-y-5">
          <h3 className="text-cms-body font-bold text-white mb-2">Logo & Typography Bindings</h3>

          <div className="space-y-4 text-cms-small">
            {/* Primary Logo */}
            <div className="p-4 rounded-sm bg-[#0a0a0a] border border-slate-800 space-y-2">
              <div className="font-bold text-white">Primary Crest Logo</div>
              <div className="h-20 w-full rounded-sm bg-latagreen-800 flex items-center justify-center p-2">
                {logoPrimary.url ? (
                  <img src={logoPrimary.url} alt="Logo" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-neutral-400 text-cms-small">No Logo</span>
                )}
              </div>
            </div>

            {/* Light Logo */}
            <div className="p-4 rounded-sm bg-[#0a0a0a] border border-slate-800 space-y-2">
              <div className="font-bold text-white">Light Monochrome / Footer Logo</div>
              <div className="h-20 w-full rounded-sm bg-slate-950 flex items-center justify-center p-2">
                {logoLight.url ? (
                  <img src={logoLight.url} alt="Logo Light" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-neutral-400 text-cms-small">No Light Logo</span>
                )}
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-2 pt-2">
              <label className="block font-bold text-neutral-300 uppercase tracking-wider text-cms-small">
                Heading Font Family
              </label>
              <input
                type="text"
                value={brand.fontHeading}
                onChange={e => handleColorChange('fontHeading', e.target.value)}
                className="w-full px-3 py-2 rounded-sm bg-[#0a0a0a] border border-[#222] text-white font-mono text-cms-small"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};


