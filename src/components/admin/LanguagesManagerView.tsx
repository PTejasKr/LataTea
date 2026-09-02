import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Globe, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { cmsStore } from '../../services/cmsStore';

export const LanguagesManagerView: React.FC = () => {
  const { draftState, updateDraft, language, setLanguage } = useCMS();
  const completeness = cmsStore.calculateCompleteness(draftState);

  const marathiMissing = [];
  if (!draftState.content.hero.headline.mr) marathiMissing.push('Hero Headline');
  if (!draftState.content.story.heading.mr) marathiMissing.push('Story Heading');
  if (!draftState.content.heritage.heading.mr) marathiMissing.push('Heritage Heading');
  if (!draftState.content.craft.heading.mr) marathiMissing.push('Craft Heading');
  if (!draftState.content.experience.heading.mr) marathiMissing.push('Experience Heading');

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lataamber-600 mb-1">
          <Globe className="w-4 h-4" />
          <span>Localization & Multilingual Settings</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
          Languages Management (English & Marathi)
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Monitor translation coverage, configure default language settings, and preview language behavior.
        </p>
      </div>

      {/* Language Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* English (Primary) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                EN
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">English</h3>
                <span className="text-[11px] text-slate-500 font-medium">Default Master Language</span>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              100% Complete
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full w-full" />
          </div>

          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            All primary storytelling chapters, craft stages, tea descriptions, and statutory legal statements are authored in English.
          </p>
        </div>

        {/* Marathi (Regional Sovereignty) */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
                MR
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900 font-serif">मराठी (Marathi)</h3>
                <span className="text-[11px] text-slate-500 font-medium">Native Maharashtra Heritage</span>
              </div>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              {completeness.languageScore}% Complete
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full rounded-full transition-all duration-500" 
              style={{ width: `${completeness.languageScore}%` }} 
            />
          </div>

          <p className="text-xs text-slate-600 font-sans leading-relaxed">
            Culturally authentic Devanagari typography with Rozha One, Noto Serif Devanagari, and Mukta font stacks.
          </p>
        </div>

      </div>

      {/* Switcher Preview & Quick Test */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-900 font-serif flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Active Public Session Language</span>
        </h3>
        <p className="text-xs text-slate-500">
          Click below to switch the preview language immediately across all public preview pages.
        </p>

        <div className="inline-flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              language === 'en'
                ? 'bg-white text-slate-900 shadow-md border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            English (EN)
          </button>
          <button
            type="button"
            onClick={() => setLanguage('mr')}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              language === 'mr'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            मराठी (MR)
          </button>
        </div>
      </div>

      {/* Missing Translation Warnings */}
      {marathiMissing.length > 0 && (
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 text-amber-900 space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>Missing Marathi Translations</span>
          </div>
          <p className="text-xs">
            The following fields are currently falling back to English:
          </p>
          <ul className="list-disc pl-5 text-xs space-y-1">
            {marathiMissing.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
