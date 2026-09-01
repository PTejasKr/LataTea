import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { NavigationItem } from '../../types/cms';
import { Menu, Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, Sparkles, ExternalLink, Link as LinkIcon } from 'lucide-react';

export const NavManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const navigation = draftState.navigation;

  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('#');
  const [newIsExternal, setNewIsExternal] = useState(false);
  const [newIsButton, setNewIsButton] = useState(false);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    const newItem: NavigationItem = {
      id: `nav_${Date.now()}`,
      label: newLabel.toUpperCase(),
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

    setNewLabel('');
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

    // re-assign orders
    const reordered = items.map((item, idx) => ({ ...item, order: idx + 1 }));
    updateDraft(prev => ({
      ...prev,
      navigation: reordered
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="pb-4 border-b border-slate-700">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Menu className="w-5 h-5 text-amber-400" />
          <span>Navigation & Menu Manager</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Add, reorder, rename, and toggle menu links and action buttons on the header and mobile drawer.
        </p>
      </div>

      {/* Add New Item Card */}
      <div className="p-6 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>Add New Menu Item</span>
        </h3>

        <form onSubmit={handleAddItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end text-xs">
          <div className="sm:col-span-4">
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
              Menu Label
            </label>
            <input
              type="text"
              required
              placeholder="e.g. RECIPES or DISTRIBUTORS"
              value={newLabel}
              onChange={e => setNewLabel(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none uppercase"
            />
          </div>

          <div className="sm:col-span-4">
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
              Destination URL / Anchor
            </label>
            <input
              type="text"
              required
              placeholder="#section or https://..."
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-xs focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-2 flex flex-col gap-2">
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={newIsButton}
                onChange={e => setNewIsButton(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-amber-500"
              />
              <span className="text-slate-300">CTA Button</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={newIsExternal}
                onChange={e => setNewIsExternal(e.target.checked)}
                className="rounded bg-slate-900 border-slate-700 text-amber-500"
              />
              <span className="text-slate-300">External Tab</span>
            </label>
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-md text-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>
          </div>
        </form>
      </div>

      {/* Navigation Items List */}
      <div className="p-6 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-3">
        <h3 className="text-sm font-bold text-white mb-2">
          Configured Menu Items ({navigation.length})
        </h3>

        <div className="space-y-2">
          {navigation.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                item.isEnabled
                  ? 'bg-slate-900/80 border-slate-800'
                  : 'bg-slate-900/30 border-slate-800/40 opacity-60'
              }`}
            >
              {/* Left Order & Label */}
              <div className="flex items-center gap-3 flex-1">
                <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={item.label}
                    onChange={e => handleUpdateItem(item.id, { label: e.target.value.toUpperCase() })}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-xs focus:ring-1 focus:ring-amber-400 uppercase"
                  />

                  <div className="flex items-center gap-2">
                    <LinkIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <input
                      type="text"
                      value={item.url}
                      onChange={e => handleUpdateItem(item.id, { url: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 font-mono text-xs focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Toggles and Actions */}
              <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                {/* CTA / Button tag */}
                <button
                  type="button"
                  onClick={() => handleUpdateItem(item.id, { isButton: !item.isButton })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold uppercase transition-all flex items-center gap-1 ${
                    item.isButton
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Toggle highlight as pill button"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Button</span>
                </button>

                {/* External toggle */}
                <button
                  type="button"
                  onClick={() => handleUpdateItem(item.id, { isExternal: !item.isExternal })}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all flex items-center gap-1 ${
                    item.isExternal
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                  title="Opens in new tab"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>New Tab</span>
                </button>

                {/* Enable/Disable Toggle */}
                <button
                  type="button"
                  onClick={() => handleUpdateItem(item.id, { isEnabled: !item.isEnabled })}
                  className={`p-1.5 rounded-lg transition-colors ${
                    item.isEnabled ? 'text-emerald-400 hover:bg-emerald-500/20' : 'text-slate-500 hover:bg-slate-800'
                  }`}
                  title={item.isEnabled ? 'Enabled (Visible)' : 'Disabled (Hidden)'}
                >
                  {item.isEnabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>

                {/* Reorder Buttons */}
                <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => handleMove(idx, 'up')}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === navigation.length - 1}
                    onClick={() => handleMove(idx, 'down')}
                    className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
