import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { NavigationItem } from '../../types/cms';
import { Menu, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Link as LinkIcon, Globe } from 'lucide-react';

export const NavManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const navigation = draftState.navigation;

  const [activeLang, setActiveLang] = useState<'en' | 'mr'>('en');
  const [newLabelEn, setNewLabelEn] = useState('');
  const [newLabelMr, setNewLabelMr] = useState('');
  const [newUrl, setNewUrl] = useState('#');
  const [newIsExternal, setNewIsExternal] = useState(false);
  const [newIsButton, setNewIsButton] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabelEn.trim()) return;

    const newItem: NavigationItem = {
      id: `nav_${Date.now()}`,
      label: {
        en: newLabelEn.trim(),
        mr: newLabelMr.trim() || newLabelEn.trim()
      },
      url: newUrl,
      isExternal: newIsExternal,
      isButton: newIsButton,
      isEnabled: true,
      order: navigation.length + 1
    };

    updateDraft(prev => ({
      ...prev,
      navigation: [...prev.navigation, newItem]
    }));

    setNewLabelEn('');
    setNewLabelMr('');
    setNewUrl('#');
    setNewIsExternal(false);
    setNewIsButton(false);
  };

  const handleUpdateItem = (id: string, updates: Partial<NavigationItem>) => {
    updateDraft(prev => ({
      ...prev,
      navigation: prev.navigation.map(item => (item.id === id ? { ...item, ...updates } : item))
    }));
  };

  const handleUpdateLabel = (id: string, text: string) => {
    updateDraft(prev => ({
      ...prev,
      navigation: prev.navigation.map(item => {
        if (item.id !== id) return item;
        return {
          ...item,
          label: {
            ...item.label,
            [activeLang]: text
          }
        };
      })
    }));
  };

  const handleDeleteItem = (id: string) => {
    updateDraft(prev => ({
      ...prev,
      navigation: prev.navigation.filter(item => item.id !== id)
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= navigation.length) return;

    const items = [...navigation];
    const temp = items[index];
    items[index] = items[targetIndex];
    items[targetIndex] = temp;

    const reordered = items.map((item, idx) => ({ ...item, order: idx + 1 }));

    updateDraft(prev => ({
      ...prev,
      navigation: reordered
    }));
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#222]">
        <div>
          <div className="flex items-center gap-2 text-cms-btn uppercase tracking-widest text-white mb-1">
            <Menu className="w-4 h-4" />
            <span>HEADER & FOOTER LINKS</span>
          </div>
          <h1 className="text-cms-section font-bold font-serif text-white">
            Navigation Manager
          </h1>
          <p className="text-cms-body text-neutral-400 mt-1">
            Reorder, add, or toggle visibility of navigation links in English and Marathi.
          </p>
        </div>

        {/* Bilingual Editor Switcher */}
        <div className="flex items-center gap-1 p-1 bg-[#111111] rounded-sm border border-[#222]">
          <button
            type="button"
            onClick={() => setActiveLang('en')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-cms-btn uppercase transition-all ${
              activeLang === 'en' ? 'bg-white text-black font-bold' : 'text-neutral-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>EN</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveLang('mr')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-cms-btn uppercase transition-all ${
              activeLang === 'mr' ? 'bg-white text-black font-bold' : 'text-neutral-400'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>मराठी</span>
          </button>
        </div>
      </div>

      {/* Add New Link Card */}
      <form onSubmit={handleAddItem} className="p-6 rounded-sm bg-[#0a0a0a] border border-slate-800 space-y-4">
        <h3 className="text-cms-btn uppercase tracking-wider text-neutral-300 flex items-center gap-2">
          <Plus className="w-4 h-4 text-white" />
          <span>Add New Navigation Item</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-cms-small font-bold uppercase tracking-wider text-neutral-400 mb-1">
              English Label
            </label>
            <input
              type="text"
              placeholder="e.g. THE CRAFT"
              value={newLabelEn}
              onChange={e => setNewLabelEn(e.target.value)}
              className="w-full px-3 py-2 rounded-sm bg-[#111111] border border-[#222] text-white text-cms-btn focus:outline-none focus:border-[#333]"
            />
          </div>

          <div>
            <label className="block text-cms-small font-bold uppercase tracking-wider text-neutral-400 mb-1">
              मराठी (Marathi) Label
            </label>
            <input
              type="text"
              placeholder="उदा. निर्मिती कला"
              value={newLabelMr}
              onChange={e => setNewLabelMr(e.target.value)}
              className="w-full px-3 py-2 rounded-sm bg-[#111111] border border-[#222] text-white text-cms-btn focus:outline-none focus:border-[#333]"
            />
          </div>

          <div>
            <label className="block text-cms-small font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Destination URL
            </label>
            <input
              type="text"
              placeholder="e.g. /craft"
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              className="w-full px-3 py-2 rounded-sm bg-[#111111] border border-[#222] text-white text-cms-small font-mono focus:outline-none focus:border-[#333]"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-4 py-2 rounded-sm text-cms-btn uppercase tracking-wider bg-white text-black hover:bg-neutral-200 flex items-center gap-1.5 transition-all "
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add to Navigation</span>
          </button>
        </div>
      </form>

      {/* Existing Navigation Links List */}
      <div className="space-y-3">
        <h3 className="text-cms-btn uppercase tracking-wider text-neutral-300">
          Active Navigation Links ({navigation.length})
        </h3>

        {navigation.map((item, idx) => (
          <div
            key={item.id}
            className={`p-4 rounded-sm border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              item.isEnabled
                ? 'bg-[#0a0a0a] border-slate-800'
                : 'bg-[#0a0a0a]/40 border-slate-800/40 opacity-60'
            }`}
          >
            <div className="flex items-center gap-3 flex-1">
              <span className="w-6 h-6 rounded-sm bg-[#111111] text-neutral-400 font-mono font-bold text-cms-small flex items-center justify-center shrink-0">
                {idx + 1}
              </span>

              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={item.label[activeLang] || ''}
                  onChange={e => handleUpdateLabel(item.id, e.target.value)}
                  className="px-3 py-1.5 rounded-sm bg-[#111111] border border-[#222] text-white font-bold text-cms-small focus:ring-1 focus:ring-[#333] uppercase"
                />

                <div className="flex items-center gap-2">
                  <LinkIcon className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                  <input
                    type="text"
                    value={item.url}
                    onChange={e => handleUpdateItem(item.id, { url: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-sm bg-[#111111] border border-[#222] text-neutral-300 font-mono text-cms-small focus:ring-1 focus:ring-[#333]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 rounded-sm text-neutral-400 hover:text-white disabled:opacity-30"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === navigation.length - 1}
                className="p-1.5 rounded-sm text-neutral-400 hover:text-white disabled:opacity-30"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleUpdateItem(item.id, { isEnabled: !item.isEnabled })}
                className="p-1.5 rounded-sm text-neutral-400 hover:text-white"
                title={item.isEnabled ? 'Hide Link' : 'Show Link'}
              >
                {item.isEnabled ? <Eye className="w-4 h-4 text-neutral-300" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleDeleteItem(item.id)}
                className="p-1.5 text-neutral-400 hover:text-neutral-400 hover:text-white"
                title="Delete Link"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};




