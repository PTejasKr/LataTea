import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { CraftStageItem } from '../../types/cms';
import { Sliders, Globe, Plus, Trash2 } from 'lucide-react';
import { ImageSlotPicker } from './ImageSlotPicker';

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
    <div className="space-y-6 sm:space-y-8 animate-fade-in max-w-5xl w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#222]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-neutral-400 mb-1">
            <Sliders className="w-4 h-4 text-white" />
            <span>Process & Craftsmanship</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white font-serif">
            The Craft / 5-Stage Process Editor
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Manage the sequential stages (Source, Select, Blend, Prepare, Experience) in English and Marathi.
          </p>
        </div>

        {/* Bilingual Editor Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#111111] rounded-sm border border-[#222] self-start">
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-sm text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeLang === 'en'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>English</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('mr')}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-sm text-xs uppercase tracking-wider transition-all cursor-pointer ${
              activeLang === 'mr'
                ? 'bg-white text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>मराठी</span>
          </button>
        </div>
      </div>

      {/* Section Header Controls */}
      <div className="bg-[#111111] rounded-sm p-4 sm:p-6 lg:p-8 border border-[#222] space-y-4 sm:space-y-5">
        <h2 className="text-base sm:text-lg text-white font-serif flex items-center gap-2 pb-3 border-b border-[#222]">
          <span>Craft Overview & Headline</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5 font-bold">
              Tagline ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={craft.tagline[activeLang] || ''}
              onChange={e => updateCraftHeader('tagline', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-xs focus:border-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5 font-bold">
              Section Heading ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={craft.heading[activeLang] || ''}
              onChange={e => updateCraftHeader('heading', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-xs font-semibold focus:border-white focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-neutral-300 mb-1.5 font-bold">
            Subheading ({activeLang.toUpperCase()})
          </label>
          <textarea
            rows={2}
            value={craft.subheading[activeLang] || ''}
            onChange={e => updateCraftHeader('subheading', e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-xs focus:border-white focus:outline-none"
          />
        </div>
      </div>

      {/* 5 Stages Sequential Cards */}
      <div className="space-y-4 sm:space-y-6">
        <h2 className="text-base sm:text-lg text-white font-serif">
          Sequential Craft Stages (01 to 05)
        </h2>

        {(craft.stages || []).map((stage, idx) => {
          const slotKey = `CRAFT_STAGE_${stage.stageNumber}`;
          return (
            <div
              key={stage.stageNumber}
              className="bg-[#111111] rounded-sm p-4 sm:p-6 lg:p-8 border border-[#222] space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[#222]">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-white text-black font-bold flex items-center justify-center text-xs font-mono">
                    0{stage.stageNumber}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-white font-serif">
                    Stage 0{stage.stageNumber}: {stage.title[activeLang] || stage.title.en}
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-[#0a0a0a] px-2.5 py-0.5 rounded-sm text-neutral-300 border border-[#333]">
                  {activeLang.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Tagline Label ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={stage.tagline[activeLang] || ''}
                    onChange={e => updateStage(idx, 'tagline', e.target.value)}
                    className="w-full px-3 py-2 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-xs font-mono focus:border-white focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                    Stage Title ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={stage.title[activeLang] || ''}
                    onChange={e => updateStage(idx, 'title', e.target.value)}
                    className="w-full px-3 py-2 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-xs focus:border-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
                  Narrative Story ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={stage.description[activeLang] || ''}
                  onChange={e => updateStage(idx, 'description', e.target.value)}
                  className="w-full px-3 py-2 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-xs leading-relaxed focus:border-white focus:outline-none"
                />
              </div>

              {/* Stage Imagery Slot */}
              <div className="pt-2">
                <ImageSlotPicker
                  slotKey={slotKey}
                  label={`Stage 0${stage.stageNumber} Visual Image`}
                  helperText={`Displayed on the live Craft section for Stage 0${stage.stageNumber}.`}
                  compact={true}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};




