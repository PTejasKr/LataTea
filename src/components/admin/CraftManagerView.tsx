import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CraftStageItem } from '../../types/cms';
import { Sliders, Sparkles, Globe, Plus, Trash2 } from 'lucide-react';

export const CraftManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const craft = draftState.content.craft;

  const [activeLang, setActiveLang] = useState<'en' | 'mr'>('en');

  const updateCraftHeader = (field: 'tagline' | 'heading' | 'subheading' | 'introduction', val: string) => {
    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        craft: {
          ...prev.content.craft,
          [field]: {
            ...prev.content.craft[field],
            [activeLang]: val
          }
        }
      }
    }));
  };

  const updateStage = (idx: number, field: 'title' | 'tagline' | 'description', val: string) => {
    const updatedStages = [...craft.stages];
    updatedStages[idx] = {
      ...updatedStages[idx],
      [field]: {
        ...updatedStages[idx][field],
        [activeLang]: val
      }
    };

    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        craft: {
          ...prev.content.craft,
          stages: updatedStages
        }
      }
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lataamber-600 mb-1">
            <Sliders className="w-4 h-4" />
            <span>Process & Craftsmanship</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            The Craft / 5-Stage Process Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage the sequential stages (Source, Select, Blend, Prepare, Experience) in English and Marathi.
          </p>
        </div>

        {/* Bilingual Editor Switcher */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200 self-start">
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeLang === 'en'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>English (Default)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('mr')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              activeLang === 'mr'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>मराठी (Marathi)</span>
          </button>
        </div>
      </div>

      {/* Section Header Controls */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Craft Overview & Headline</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Tagline ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={craft.tagline[activeLang] || ''}
              onChange={e => updateCraftHeader('tagline', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Section Heading ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={craft.heading[activeLang] || ''}
              onChange={e => updateCraftHeader('heading', e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900 focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
            Subheading ({activeLang.toUpperCase()})
          </label>
          <textarea
            rows={2}
            value={craft.subheading[activeLang] || ''}
            onChange={e => updateCraftHeader('subheading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
          />
        </div>
      </div>

      {/* 5 Stages Sequential Cards */}
      <div className="space-y-6">
        <h2 className="text-lg font-bold text-slate-900 font-serif">
          Sequential Craft Stages (01 to 05)
        </h2>

        {(craft.stages || []).map((stage, idx) => (
          <div
            key={stage.stageNumber}
            className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs font-mono">
                  0{stage.stageNumber}
                </span>
                <span className="text-sm font-bold text-slate-800 font-serif">
                  Stage 0{stage.stageNumber}: {stage.title[activeLang] || stage.title.en}
                </span>
              </div>
              <span className="text-xs font-mono uppercase bg-slate-100 px-3 py-1 rounded-full text-slate-600 border border-slate-200">
                Editing: {activeLang.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Tagline Label ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={stage.tagline[activeLang] || ''}
                  onChange={e => updateStage(idx, 'tagline', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Stage Title ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={stage.title[activeLang] || ''}
                  onChange={e => updateStage(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Narrative Story ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={3}
                value={stage.description[activeLang] || ''}
                onChange={e => updateStage(idx, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
