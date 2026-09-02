import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { TeaStoryItem } from '../../types/cms';
import { Coffee, Globe, Plus, Trash2, Sparkles, MapPin, Eye, EyeOff } from 'lucide-react';

export const TeaStoriesManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const teaStories = draftState.teaStories || [];

  const [activeLang, setActiveLang] = useState<'en' | 'mr'>('en');
  const [selectedTeaId, setSelectedTeaId] = useState<string>(teaStories[0]?.id || '');

  const activeTea = teaStories.find(t => t.id === selectedTeaId) || teaStories[0];

  const updateActiveTea = (field: string, val: any) => {
    if (!activeTea) return;
    const updated = teaStories.map(t => {
      if (t.id !== activeTea.id) return t;
      if (typeof val === 'object' && !Array.isArray(val)) {
        return {
          ...t,
          [field]: {
            ...(t as any)[field],
            ...val
          }
        };
      }
      return { ...t, [field]: val };
    });

    updateDraft(prev => ({ ...prev, teaStories: updated }));
  };

  const addTeaStory = () => {
    const newId = `tea_${Date.now()}`;
    const newStory: TeaStoryItem = {
      id: newId,
      slug: `new-tea-blend-${Date.now()}`,
      name: { en: 'New Artisan Tea Blend', mr: 'नवीन चहा प्रकार' },
      tagline: { en: 'Crafted with royal spices', mr: 'शाही मसाल्यांचा मेळ' },
      category: 'gud',
      categoryName: { en: 'Jaggery Heritage Series', mr: 'गुळ चहा वारसा मालिका' },
      shortDescription: { en: 'A short overview of the blend', mr: 'चहाचा संक्षिप्त परिचय' },
      editorialStory: { en: 'Detailed editorial story about the heritage and flavor profile...', mr: 'सविस्तर कथा आणि माहिती...' },
      tastingNotes: [
        { en: 'Malty caramel', mr: 'कॅरॅमल गोडवा' },
        { en: 'Aromatic cardamom', mr: 'सुगंधी वेलची' }
      ],
      ingredients: [
        { en: 'Assam CTC Tea Leaves', mr: 'आसाम चहा पाने' },
        { en: 'Pure Cane Jaggery', mr: 'शुद्ध देशी गूळ' }
      ],
      origin: { en: 'Assam & Maharashtra', mr: 'आसाम आणि महाराष्ट्र' },
      servingRitual: { en: 'Simmer 3 minutes in milk and water', mr: 'दूध व पाण्यात ३ मिनिटे उकळा' },
      imageSlotId: 'STORY_IMAGE_PRIMARY',
      displayOrder: teaStories.length + 1,
      isFeatured: false,
      isVisible: true
    };

    updateDraft(prev => ({ ...prev, teaStories: [...prev.teaStories, newStory] }));
    setSelectedTeaId(newId);
  };

  const removeTeaStory = (id: string) => {
    const filtered = teaStories.filter(t => t.id !== id);
    updateDraft(prev => ({ ...prev, teaStories: filtered }));
    if (selectedTeaId === id && filtered.length > 0) {
      setSelectedTeaId(filtered[0].id);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-lataamber-600 mb-1">
            <Coffee className="w-4 h-4" />
            <span>Editorial Tea Stories</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-serif">
            Tea Collection & Stories Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your sovereign tea blends, tasting notes, and origins. (Pure storytelling — zero commerce or pricing).
          </p>
        </div>

        {/* Bilingual Editor Switcher & Add Button */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-2xl border border-slate-200">
            <button
              type="button"
              onClick={() => setActiveLang('en')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                activeLang === 'en' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setActiveLang('mr')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                activeLang === 'mr' ? 'bg-amber-500 text-slate-950 font-bold shadow-sm' : 'text-slate-500'
              }`}
            >
              मराठी
            </button>
          </div>

          <button
            type="button"
            onClick={addTeaStory}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Tea Blend</span>
          </button>
        </div>
      </div>

      {/* Main Master-Detail Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sidebar: List of Tea Stories */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block px-2 mb-2">
            Signature Blends ({teaStories.length})
          </span>

          {teaStories.map(tea => (
            <button
              key={tea.id}
              type="button"
              onClick={() => setSelectedTeaId(tea.id)}
              className={`w-full text-left p-3.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                activeTea?.id === tea.id
                  ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/80'
              }`}
            >
              <div className="space-y-0.5 truncate pr-2">
                <span className="block truncate font-serif text-sm">
                  {tea.name[activeLang] || tea.name.en}
                </span>
                <span className={`text-[10px] uppercase tracking-wider block opacity-75 font-sans font-medium`}>
                  {tea.categoryName[activeLang] || tea.categoryName.en}
                </span>
              </div>
              <span className="text-[10px] font-mono shrink-0">
                {tea.isVisible ? '● Live' : '○ Hidden'}
              </span>
            </button>
          ))}
        </div>

        {/* Right Detail Pane: Active Tea Story Fields */}
        {activeTea && (
          <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold font-serif text-slate-900">
                  Editing: {activeTea.name[activeLang] || activeTea.name.en}
                </h3>
                <span className="text-xs text-slate-500 font-mono">Slug: /{activeTea.slug}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => updateActiveTea('isVisible', !activeTea.isVisible)}
                  className={`p-2 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                    activeTea.isVisible
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                >
                  {activeTea.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span>{activeTea.isVisible ? 'Visible' : 'Hidden'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => removeTeaStory(activeTea.id)}
                  className="p-2 text-slate-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                  title="Delete Tea Story"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Tea Name (EN)</label>
    <input type="text" value={activeTea.name.en || ''} onChange={e => updateActiveTea('name', { en: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900" />
  </div>
  <div className="mt-3">
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Tea Name (MR)</label>
    <input type="text" value={activeTea.name.mr || ''} onChange={e => updateActiveTea('name', { mr: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-900" />
  </div>
              </div>

              <div>
                <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Tagline (EN)</label>
    <input type="text" value={activeTea.tagline.en || ''} onChange={e => updateActiveTea('tagline', { en: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm" />
  </div>
  <div className="mt-3">
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Tagline (MR)</label>
    <input type="text" value={activeTea.tagline.mr || ''} onChange={e => updateActiveTea('tagline', { mr: e.target.value })} className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm" />
  </div>
              </div>
            </div>

            <div>
              <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Short Description (EN)</label>
    <textarea rows={2} value={activeTea.shortDescription.en || ''} onChange={e => updateActiveTea('shortDescription', { en: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed" />
  </div>
  <div className="mt-3">
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Short Description (MR)</label>
    <textarea rows={2} value={activeTea.shortDescription.mr || ''} onChange={e => updateActiveTea('shortDescription', { mr: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed" />
  </div>
            </div>

            <div>
              <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Editorial Story Narrative (EN)</label>
    <textarea rows={4} value={activeTea.editorialStory.en || ''} onChange={e => updateActiveTea('editorialStory', { en: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed" />
  </div>
  <div className="mt-3">
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Editorial Story Narrative (MR)</label>
    <textarea rows={4} value={activeTea.editorialStory.mr || ''} onChange={e => updateActiveTea('editorialStory', { mr: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs leading-relaxed" />
  </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div>
                <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Origin & Harvest (EN)</label>
    <input type="text" value={activeTea.origin.en || ''} onChange={e => updateActiveTea('origin', { en: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs" />
  </div>
  <div className="mt-3">
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Origin & Harvest (MR)</label>
    <input type="text" value={activeTea.origin.mr || ''} onChange={e => updateActiveTea('origin', { mr: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs" />
  </div>
              </div>

              <div>
                <div>
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Serving Ritual (EN)</label>
    <input type="text" value={activeTea.servingRitual.en || ''} onChange={e => updateActiveTea('servingRitual', { en: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs" />
  </div>
  <div className="mt-3">
    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Serving Ritual (MR)</label>
    <input type="text" value={activeTea.servingRitual.mr || ''} onChange={e => updateActiveTea('servingRitual', { mr: e.target.value })} className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs" />
  </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
