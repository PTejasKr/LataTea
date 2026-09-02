import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { Search, Globe, Share2, Sparkles } from 'lucide-react';

export const SeoManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const seo = draftState.seo;

  const [activeLang, setActiveLang] = useState<'en' | 'mr'>('en');

  const handleChange = (field: 'seoTitle' | 'metaDescription' | 'ogTitle' | 'ogDescription', val: string) => {
    updateDraft(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: {
          ...prev.seo[field],
          [activeLang]: val
        }
      }
    }));
  };

  const handleStaticChange = (field: 'canonicalUrl' | 'robots', val: string) => {
    updateDraft(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: val
      }
    }));
  };

  const currentTitle = seo.seoTitle[activeLang] || '';
  const currentDesc = seo.metaDescription[activeLang] || '';

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-700/80">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-1">
            <Search className="w-4 h-4" />
            <span>METADATA & SOCIAL SHARING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
            SEO & Open Graph Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Configure Google search appearance, bilingual meta tags, and social cards in English and Marathi.
          </p>
        </div>

        {/* Bilingual Editor Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-2xl border border-slate-700">
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
              activeLang === 'en' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('mr')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
              activeLang === 'mr' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>मराठी</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Search Engine Settings Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-400" />
            <span>Search Metadata Tags ({activeLang.toUpperCase()})</span>
          </h3>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold uppercase tracking-wider text-slate-300">
                SEO Meta Title
              </label>
              <span className="text-[10px] text-slate-400 font-mono">{currentTitle.length} / 60 chars</span>
            </div>
            <input
              type="text"
              value={currentTitle}
              onChange={e => handleChange('seoTitle', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold uppercase tracking-wider text-slate-300">
                Meta Description
              </label>
              <span className="text-[10px] text-slate-400 font-mono">{currentDesc.length} / 160 chars</span>
            </div>
            <textarea
              rows={3}
              value={currentDesc}
              onChange={e => handleChange('metaDescription', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Canonical URL
              </label>
              <input
                type="text"
                value={seo.canonicalUrl}
                onChange={e => handleStaticChange('canonicalUrl', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Robots Directives
              </label>
              <select
                value={seo.robots}
                onChange={e => handleStaticChange('robots', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              >
                <option value="index, follow">index, follow (Default / Searchable)</option>
                <option value="noindex, follow">noindex, follow</option>
                <option value="noindex, nofollow">noindex, nofollow (Staging / Hidden)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Live Google Search Card Preview */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Google SERP Preview ({activeLang.toUpperCase()})</span>
            </span>

            <div className="p-4 rounded-2xl bg-white text-slate-900 shadow-sm space-y-1.5 font-sans">
              <div className="text-[11px] text-slate-500 truncate flex items-center gap-1 font-mono">
                <Globe className="w-3 h-3 text-slate-400" />
                <span>{seo.canonicalUrl || 'https://latatea.com'}</span>
              </div>
              <div className="text-base text-blue-800 font-medium hover:underline cursor-pointer line-clamp-1">
                {currentTitle || 'LataTea — Authentic Indian Jaggery Chai'}
              </div>
              <div className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {currentDesc || 'Discover LataTea: Velvety spiced Basundi Chai crafted with 100% natural organic jaggery.'}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
