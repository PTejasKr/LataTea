import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { SeoConfig } from '../../types/cms';
import { Search, Globe, Share2, Sparkles } from 'lucide-react';

export const SeoManagerView: React.FC = () => {
  const { draftState, updateDraft, resolveSlotImage } = useCMS();
  const seo = draftState.seo;

  const handleChange = (key: keyof SeoConfig, val: string) => {
    updateDraft(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [key]: val
      }
    }));
  };

  const ogImage = resolveSlotImage(seo.ogImageSlotId || 'HOME_HERO_PRIMARY', false, true);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="pb-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-400" />
          <span>Search Engine Optimization & Social Graph</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Configure metadata tags, search index directives, and social share cards (Open Graph).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Search Engine Settings Form */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Search Metadata Tags</span>
          </h3>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold uppercase tracking-wider text-slate-300">
                SEO Meta Title
              </label>
              <span className="text-[10px] text-slate-400 font-mono">{seo.seoTitle.length} / 60 chars</span>
            </div>
            <input
              type="text"
              value={seo.seoTitle}
              onChange={e => handleChange('seoTitle', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold uppercase tracking-wider text-slate-300">
                Meta Description
              </label>
              <span className="text-[10px] text-slate-400 font-mono">{seo.metaDescription.length} / 160 chars</span>
            </div>
            <textarea
              rows={3}
              value={seo.metaDescription}
              onChange={e => handleChange('metaDescription', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                value={seo.canonicalUrl}
                onChange={e => handleChange('canonicalUrl', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Robots Directives
              </label>
              <select
                value={seo.robots}
                onChange={e => handleChange('robots', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              >
                <option value="index, follow">index, follow (Default / Searchable)</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="noindex, nofollow">noindex, nofollow (Staging / Hidden)</option>
              </select>
            </div>
          </div>

          {/* Google SERP Preview Card */}
          <div className="mt-4 p-4 rounded-2xl bg-white text-slate-900 shadow-inner">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Google SERP Snippet Preview</span>
            <div className="text-xs text-blue-700 hover:underline font-medium truncate">
              {seo.canonicalUrl || 'https://latatea.com'}
            </div>
            <div className="text-base font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-1">
              {seo.seoTitle || 'LataTea'}
            </div>
            <div className="text-xs text-slate-600 line-clamp-2 mt-1">
              {seo.metaDescription || 'No description configured.'}
            </div>
          </div>
        </div>

        {/* Open Graph Social Card Preview */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-sky-400" />
            <span>Social Share Card (Open Graph)</span>
          </h3>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
              OG Social Title
            </label>
            <input
              type="text"
              value={seo.ogTitle}
              onChange={e => handleChange('ogTitle', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
              OG Social Description
            </label>
            <textarea
              rows={2}
              value={seo.ogDescription}
              onChange={e => handleChange('ogDescription', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
            />
          </div>

          {/* Social Card Preview */}
          <div className="rounded-2xl overflow-hidden border border-slate-700 bg-slate-950 shadow-md">
            <div className="aspect-[1.91/1] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
              {ogImage.url ? (
                <img src={ogImage.url} alt="OG Banner" className="w-full h-full object-cover" />
              ) : (
                <div className="text-slate-500 text-xs">No OG Image</div>
              )}
            </div>
            <div className="p-4 bg-slate-900">
              <span className="text-[10px] text-slate-400 uppercase font-mono">latatea.com</span>
              <h4 className="font-bold text-white text-sm mt-0.5 truncate">{seo.ogTitle || 'LataTea Brand'}</h4>
              <p className="text-xs text-slate-400 line-clamp-2 mt-1">{seo.ogDescription || 'Authentic Taste & Quality'}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
