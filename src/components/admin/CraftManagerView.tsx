import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CraftStageItem } from '../../types/cms';
import { Sliders, Globe, Plus, Trash2 } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <div className="inline-flex items-center gap-2 text-cms-btn uppercase tracking-widest text-white mb-1">
            <Sliders className="w-4 h-4 text-white" />
            <span>Process & Craftsmanship</span>
          </div>
          <h1 className="text-cms-section font-bold text-white font-serif">
            The Craft / 5-Stage Process Editor
          </h1>
          <p className="text-cms-body text-neutral-400 mt-1">
            Manage the sequential stages (Source, Select, Blend, Prepare, Experience) in English and Marathi.
          </p>
        </div>

        {/* Bilingual Editor Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#111111] rounded-sm border border-[#222] self-start">
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-sm text-cms-btn uppercase tracking-wider transition-all cursor-pointer ${
              activeLang === 'en'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>English (Default)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('mr')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-sm text-cms-btn uppercase tracking-wider transition-all cursor-pointer ${
              activeLang === 'mr'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>मराठी (Marathi)</span>
          </button>
        </div>
      </div>

      {/* Section Header Controls */}
      <div className="bg-[#111111] rounded-sm p-6 sm:p-8 border border-[#222] space-y-5">
        <h2 className="text-cms-card text-white font-serif flex items-center gap-2 pb-3 border-b border-[#222]">
          <span>Craft Overview & Headline</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-cms-btn uppercase tracking-wider text-neutral-300 mb-1.5 font-bold">
              Tagline ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={craft.tagline[activeLang] || ''}
              onChange={e => updateCraftHeader('tagline', e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-cms-btn uppercase tracking-wider text-neutral-300 mb-1.5 font-bold">
              Section Heading ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={craft.heading[activeLang] || ''}
              onChange={e => updateCraftHeader('heading', e.target.value)}
              className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body font-semibold focus:border-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-cms-btn uppercase tracking-wider text-neutral-300 mb-1.5 font-bold">
            Subheading ({activeLang.toUpperCase()})
          </label>
          <textarea
            rows={2}
            value={craft.subheading[activeLang] || ''}
            onChange={e => updateCraftHeader('subheading', e.target.value)}
            className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none"
          />
        </div>
      </div>

      {/* 5 Stages Sequential Cards */}
      <div className="space-y-6">
        <h2 className="text-cms-card text-white font-serif">
          Sequential Craft Stages (01 to 05)
        </h2>

        {(craft.stages || []).map((stage, idx) => (
          <div
            key={stage.stageNumber}
            className="bg-[#111111] rounded-sm p-6 sm:p-8 border border-[#222] space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#222]">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-sm bg-white text-black font-bold flex items-center justify-center text-cms-small font-mono">
                  0{stage.stageNumber}
                </span>
                <span className="text-cms-body font-bold text-white font-serif">
                  Stage 0{stage.stageNumber}: {stage.title[activeLang] || stage.title.en}
                </span>
              </div>
              <span className="text-cms-small font-mono uppercase bg-[#0a0a0a] px-3 py-1 rounded-sm text-neutral-300 border border-[#333]">
                Editing: {activeLang.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-cms-small font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Tagline Label ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={stage.tagline[activeLang] || ''}
                  onChange={e => updateStage(idx, 'tagline', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-small font-mono focus:border-white focus:outline-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-cms-small font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Stage Title ({activeLang.toUpperCase()})
                </label>
                <input
                  type="text"
                  value={stage.title[activeLang] || ''}
                  onChange={e => updateStage(idx, 'title', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-btn focus:border-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-cms-small font-bold uppercase tracking-wider text-neutral-400 mb-1">
                Narrative Story ({activeLang.toUpperCase()})
              </label>
              <textarea
                rows={3}
                value={stage.description[activeLang] || ''}
                onChange={e => updateStage(idx, 'description', e.target.value)}
                className="w-full px-3 py-2 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-small leading-relaxed focus:border-white focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




