import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MilestoneItem } from '../../types/cms';
import { BookOpen, Sparkles, Plus, Trash2, Globe } from 'lucide-react';

export const StoryManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const story = draftState.content.story;
  const heritage = draftState.content.heritage;

  const [activeLang, setActiveLang] = useState<'en' | 'mr'>('en');

  const updateStory = (field: string, value: any) => {
    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        story: {
          ...prev.content.story,
          [field]: typeof value === 'object' && !Array.isArray(value)
            ? { ...(prev.content.story as any)[field], ...value }
            : value
        }
      }
    }));
  };

  const updateHeritage = (field: string, value: any) => {
    updateDraft(prev => ({
      ...prev,
      content: {
        ...prev.content,
        heritage: {
          ...prev.content.heritage,
          [field]: typeof value === 'object' && !Array.isArray(value)
            ? { ...(prev.content.heritage as any)[field], ...value }
            : value
        }
      }
    }));
  };

  const updateMilestone = (idx: number, field: 'title' | 'description' | 'year', val: string) => {
    const updated = [...heritage.milestones];
    if (field === 'year') {
      updated[idx] = { ...updated[idx], year: val };
    } else {
      updated[idx] = {
        ...updated[idx],
        [field]: {
          ...updated[idx][field],
          [activeLang]: val
        }
      };
    }
    updateHeritage('milestones', updated);
  };

  const addMilestone = () => {
    const newM: MilestoneItem = {
      year: 'Phase',
      title: { en: 'New Milestone', mr: 'नवीन टप्पा' },
      description: { en: 'Milestone description', mr: 'टप्प्याचे वर्णन' }
    };
    updateHeritage('milestones', [...heritage.milestones, newM]);
  };

  const removeMilestone = (idx: number) => {
    updateHeritage('milestones', heritage.milestones.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header with Language Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lataamber-600 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Storytelling Content Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            Story & Heritage Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage the editorial narrative, origins, and historical milestones in English and Marathi.
          </p>
        </div>

        {/* Bilingual Editor Tab Switcher */}
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

      {/* Part 1: The Brand Story */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Section 02 — The Brand Story</span>
          <span className="ml-auto text-xs font-mono uppercase bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-200">
            Editing in: {activeLang === 'en' ? 'English' : 'मराठी'}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Category Tagline ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={story.tagline[activeLang] || ''}
              onChange={e => updateStory('tagline', { [activeLang]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Headline ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={story.heading[activeLang] || ''}
              onChange={e => updateStory('heading', { [activeLang]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Subheading Narrative ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={2}
              value={story.subheading[activeLang] || ''}
              onChange={e => updateStory('subheading', { [activeLang]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Introduction Paragraph ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={3}
              value={story.introduction[activeLang] || ''}
              onChange={e => updateStory('introduction', { [activeLang]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Pull Quote ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={2}
              value={story.quote[activeLang] || ''}
              onChange={e => updateStory('quote', { [activeLang]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none italic text-amber-900 bg-amber-50/50"
            />
          </div>
        </div>
      </div>

      {/* Part 2: Heritage & Milestones */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-lataleaf-600" />
            <span>Section 03 — Heritage & Milestones</span>
          </h2>

          <button
            type="button"
            onClick={addMilestone}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Milestone</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Heritage Headline ({activeLang.toUpperCase()})
            </label>
            <input
              type="text"
              value={heritage.heading[activeLang] || ''}
              onChange={e => updateHeritage('heading', { [activeLang]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none font-semibold text-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Heritage Subheading ({activeLang.toUpperCase()})
            </label>
            <textarea
              rows={2}
              value={heritage.subheading[activeLang] || ''}
              onChange={e => updateHeritage('subheading', { [activeLang]: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Milestones List */}
        <div className="space-y-4 pt-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 block">
            Milestones Timeline
          </span>

          {(heritage.milestones || []).map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="w-1/3">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Label / Year
                  </label>
                  <input
                    type="text"
                    value={m.year}
                    onChange={e => updateMilestone(idx, 'year', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                  />
                </div>

                <div className="w-2/3">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Title ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={m.title[activeLang] || ''}
                    onChange={e => updateMilestone(idx, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold bg-white"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeMilestone(idx)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors mt-4"
                  title="Remove milestone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Narrative Description ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={m.description[activeLang] || ''}
                  onChange={e => updateMilestone(idx, 'description', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white leading-relaxed"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
