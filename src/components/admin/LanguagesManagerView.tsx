import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Globe, CheckCircle2, AlertTriangle } from 'lucide-react';
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
      <div className="pb-6 border-b border-[#222]">
        <div className="inline-flex items-center gap-2 text-cms-btn uppercase tracking-widest text-white mb-1">
          <Globe className="w-4 h-4 text-white" />
          <span>Localization & Multilingual Settings</span>
        </div>
        <h1 className="text-cms-section font-bold text-white font-serif">
          Languages Management (English & Marathi)
        </h1>
        <p className="text-cms-body text-neutral-400 mt-1">
          Monitor translation coverage, configure default language settings, and preview language behavior.
        </p>
      </div>

      {/* Language Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* English (Primary) */}
        <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-sm bg-white text-black font-bold flex items-center justify-center text-cms-small font-mono">
                EN
              </span>
              <div>
                <h3 className="text-base font-bold text-white font-serif">English</h3>
                <span className="text-cms-small text-neutral-400 font-medium">Default Master Language</span>
              </div>
            </div>
            <span className="text-cms-btn uppercase tracking-wider text-white bg-[#0a0a0a] px-3 py-1 rounded-sm border border-[#333] font-bold">
              100% Complete
            </span>
          </div>

          <div className="w-full bg-[#222] h-2.5 rounded-sm overflow-hidden">
            <div className="bg-white h-full rounded-sm w-full" />
          </div>

          <p className="text-cms-small text-neutral-300 font-sans leading-relaxed">
            All primary storytelling chapters, craft stages, tea descriptions, and statutory legal statements are authored in English.
          </p>
        </div>

        {/* Marathi (Regional Sovereignty) */}
        <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-sm bg-white text-black font-bold flex items-center justify-center text-cms-small font-mono">
                MR
              </span>
              <div>
                <h3 className="text-base font-bold text-white font-serif">मराठी (Marathi)</h3>
                <span className="text-cms-small text-neutral-400 font-medium">Native Maharashtra Heritage</span>
              </div>
            </div>
            <span className="text-cms-btn uppercase tracking-wider text-white bg-[#0a0a0a] px-3 py-1 rounded-sm border border-[#333] font-bold">
              {completeness.languageScore}% Complete
            </span>
          </div>

          <div className="w-full bg-[#222] h-2.5 rounded-sm overflow-hidden">
            <div 
              className="bg-white h-full rounded-sm transition-all duration-500" 
              style={{ width: `${completeness.languageScore}%` }} 
            />
          </div>

          <p className="text-cms-small text-neutral-300 font-sans leading-relaxed">
            Culturally authentic Devanagari typography with Rozha One, Noto Serif Devanagari, and Mukta font stacks.
          </p>
        </div>

      </div>

      {/* Switcher Preview & Quick Test */}
      <div className="bg-[#111111] rounded-sm p-6 sm:p-8 border border-[#222] space-y-4">
        <h3 className="text-base font-bold text-white font-serif flex items-center gap-2">
          <span>Active Public Session Language</span>
        </h3>
        <p className="text-cms-small text-neutral-400">
          Click below to switch the preview language immediately across all public preview pages.
        </p>

        <div className="inline-flex items-center gap-2 p-1.5 bg-[#0a0a0a] rounded-sm border border-[#333]">
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-5 py-2.5 rounded-sm text-cms-btn uppercase tracking-wider transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            English (EN)
          </button>
          <button
            type="button"
            onClick={() => setLanguage('mr')}
            className={`px-5 py-2.5 rounded-sm text-cms-btn uppercase tracking-wider transition-all cursor-pointer ${
              language === 'mr'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            मराठी (MR)
          </button>
        </div>
      </div>

      {/* Missing Translation Warnings */}
      {marathiMissing.length > 0 && (
        <div className="bg-[#111111] rounded-sm p-6 border border-[#333] text-white space-y-2">
          <div className="flex items-center gap-2 font-bold text-cms-body">
            <AlertTriangle className="w-4 h-4 text-white" />
            <span>Missing Marathi Translations</span>
          </div>
          <p className="text-cms-small text-neutral-400">
            The following fields are currently falling back to English:
          </p>
          <ul className="list-disc pl-5 text-cms-small space-y-1 text-neutral-300">
            {marathiMissing.map((m, idx) => (
              <li key={idx}>{m}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};




