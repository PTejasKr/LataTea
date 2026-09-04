import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MilestoneItem } from '../../types/cms';
import { BookOpen, Plus, Trash2, Globe } from 'lucide-react';

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <div className="inline-flex items-center gap-2 text-cms-btn uppercase tracking-widest text-neutral-400 mb-1">
            <BookOpen className="w-4 h-4 text-white" />
            <span>Storytelling Content Engine</span>
          </div>
          <h1 className="text-cms-section font-bold text-white font-serif">
            Story & Heritage Editor
          </h1>
          <p className="text-cms-body text-neutral-400 mt-1">
            Manage the editorial narrative, origins, and historical milestones in English and Marathi.
          </p>
        </div>

        {/* Bilingual Editor Tab Switcher */}
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

      {/* Part 1: The Brand Story */}
      <div className="bg-[#111111] rounded-sm p-6 sm:p-8 border border-[#222] space-y-6">
        <h2 className="text-cms-card text-white font-serif flex items-center gap-2 pb-3 border-b border-[#222]">
          <span>Section 02 — The Brand Story</span>
          <span className="ml-auto text-cms-small font-mono uppercase bg-[#0a0a0a] text-neutral-300 px-2.5 py-0.5 rounded-sm border border-[#333]">
            Editing in: {activeLang === 'en' ? 'English' : 'मराठी'}
          </span>
        </h2>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <div>
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Category Tagline (EN)</label>
              <input
                type="text"
                value={story.tagline.en || ''}
                onChange={e => updateStory('tagline', { en: e.target.value })}
                placeholder="Category tagline in English..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none"
              />
            </div>
            <div className="mt-3">
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Category Tagline (MR)</label>
              <input
                type="text"
                value={story.tagline.mr || ''}
                onChange={e => updateStory('tagline', { mr: e.target.value })}
                placeholder="मराठीत टॅगलाईन..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div>
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Headline (EN)</label>
              <input
                type="text"
                value={story.heading.en || ''}
                onChange={e => updateStory('heading', { en: e.target.value })}
                placeholder="Headline in English..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none font-semibold"
              />
            </div>
            <div className="mt-3">
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Headline (MR)</label>
              <input
                type="text"
                value={story.heading.mr || ''}
                onChange={e => updateStory('heading', { mr: e.target.value })}
                placeholder="मराठीत मुख्य मथळा..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none font-semibold"
              />
            </div>
          </div>

          <div>
            <div>
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Subheading Narrative (EN)</label>
              <textarea
                rows={2}
                value={story.subheading.en || ''}
                onChange={e => updateStory('subheading', { en: e.target.value })}
                placeholder="Subheading in English..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none leading-relaxed"
              />
            </div>
            <div className="mt-3">
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Subheading Narrative (MR)</label>
              <textarea
                rows={2}
                value={story.subheading.mr || ''}
                onChange={e => updateStory('subheading', { mr: e.target.value })}
                placeholder="मराठीत उप-मथळा..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          <div>
            <div>
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Introduction Paragraph (EN)</label>
              <textarea
                rows={3}
                value={story.introduction.en || ''}
                onChange={e => updateStory('introduction', { en: e.target.value })}
                placeholder="Introduction paragraph in English..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none leading-relaxed"
              />
            </div>
            <div className="mt-3">
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Introduction Paragraph (MR)</label>
              <textarea
                rows={3}
                value={story.introduction.mr || ''}
                onChange={e => updateStory('introduction', { mr: e.target.value })}
                placeholder="मराठीत परिचय परिच्छेद..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          <div>
            <div>
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Pull Quote (EN)</label>
              <textarea
                rows={2}
                value={story.quote.en || ''}
                onChange={e => updateStory('quote', { en: e.target.value })}
                placeholder="Pull quote in English..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none italic"
              />
            </div>
            <div className="mt-3">
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Pull Quote (MR)</label>
              <textarea
                rows={2}
                value={story.quote.mr || ''}
                onChange={e => updateStory('quote', { mr: e.target.value })}
                placeholder="मराठीत अवतरण..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none italic"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Heritage & Milestones */}
      <div className="bg-[#111111] rounded-sm p-6 sm:p-8 border border-[#222] space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#222]">
          <h2 className="text-cms-card text-white font-serif flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-white" />
            <span>Section 03 — Heritage & Milestones</span>
          </h2>

          <button
            type="button"
            onClick={addMilestone}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-cms-btn uppercase tracking-wider bg-white text-black font-bold hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Milestone</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5">
          <div>
            <div>
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Heritage Headline (EN)</label>
              <input
                type="text"
                value={heritage.heading.en || ''}
                onChange={e => updateHeritage('heading', { en: e.target.value })}
                placeholder="Heritage headline in English..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none font-semibold"
              />
            </div>
            <div className="mt-3">
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Heritage Headline (MR)</label>
              <input
                type="text"
                value={heritage.heading.mr || ''}
                onChange={e => updateHeritage('heading', { mr: e.target.value })}
                placeholder="मराठीत वारसा मथळा..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none font-semibold"
              />
            </div>
          </div>

          <div>
            <div>
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Heritage Subheading (EN)</label>
              <textarea
                rows={2}
                value={heritage.subheading.en || ''}
                onChange={e => updateHeritage('subheading', { en: e.target.value })}
                placeholder="Heritage subheading in English..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none leading-relaxed"
              />
            </div>
            <div className="mt-3">
              <label className="block text-cms-btn uppercase tracking-wider text-neutral-400 mb-1">Heritage Subheading (MR)</label>
              <textarea
                rows={2}
                value={heritage.subheading.mr || ''}
                onChange={e => updateHeritage('subheading', { mr: e.target.value })}
                placeholder="मराठीत वारसा उप-मथळा..."
                className="w-full px-4 py-2.5 rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 text-cms-body focus:border-white focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Milestones List */}
        <div className="space-y-4 pt-4 border-t border-[#222]">
          <span className="text-cms-btn uppercase tracking-wider text-neutral-300 font-bold block">
            Milestones Timeline
          </span>

          {(heritage.milestones || []).map((m, idx) => (
            <div key={idx} className="p-4 rounded-sm border border-[#333] bg-[#0a0a0a] space-y-3">
              <div className="flex items-center justify-between gap-4">
                <div className="w-1/3">
                  <label className="block text-cms-small font-bold uppercase text-neutral-400 mb-1">
                    Label / Year
                  </label>
                  <input
                    type="text"
                    value={m.year}
                    onChange={e => updateMilestone(idx, 'year', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-sm border border-[#333] bg-[#111111] text-white text-cms-small font-bold focus:border-white focus:outline-none"
                  />
                </div>

                <div className="w-2/3">
                  <label className="block text-cms-small font-bold uppercase text-neutral-400 mb-1">
                    Title ({activeLang.toUpperCase()})
                  </label>
                  <input
                    type="text"
                    value={m.title[activeLang] || ''}
                    onChange={e => updateMilestone(idx, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 rounded-sm border border-[#333] bg-[#111111] text-white text-cms-btn focus:border-white focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeMilestone(idx)}
                  className="p-2 text-neutral-400 hover:text-red-400 rounded-sm hover:bg-red-950/40 transition-colors mt-4 cursor-pointer"
                  title="Remove milestone"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <label className="block text-cms-small font-bold uppercase text-neutral-400 mb-1">
                  Narrative Description ({activeLang.toUpperCase()})
                </label>
                <textarea
                  rows={2}
                  value={m.description[activeLang] || ''}
                  onChange={e => updateMilestone(idx, 'description', e.target.value)}
                  className="w-full px-3 py-1.5 rounded-sm border border-[#333] bg-[#111111] text-white text-cms-small leading-relaxed focus:border-white focus:outline-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};




