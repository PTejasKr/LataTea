import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ProductCategoryItem } from '../../types/cms';
import { Plus, Trash2, ArrowUp, ArrowDown, Eye, EyeOff, FolderTree } from 'lucide-react';

export const CategoriesManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const categories = draftState.categories || [
    { id: 'cat_all', slug: 'all', name: { en: 'All Teas', mr: 'सर्व चहा' }, order: 1, isVisible: true },
    { id: 'cat_gud', slug: 'gud', name: { en: 'Jaggery Blends', mr: 'गूळ चहा' }, order: 2, isVisible: true },
    { id: 'cat_sugar', slug: 'sugar', name: { en: 'Basundi Series', mr: 'बासुंदी चहा' }, order: 3, isVisible: true },
    { id: 'cat_premixes', slug: 'premixes', name: { en: 'Premixes', mr: 'प्रीमिक्स' }, order: 4, isVisible: true }
  ];

  const [newCatEn, setNewCatEn] = useState('');
  const [newCatMr, setNewCatMr] = useState('');

  const saveCategories = (updated: ProductCategoryItem[]) => {
    updateDraft(prev => ({ ...prev, categories: updated }));
  };

  const handleAddCategory = () => {
    if (!newCatEn.trim()) return;
    const slug = newCatEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newCat: ProductCategoryItem = {
      id: `cat_${Date.now()}`,
      slug,
      name: {
        en: newCatEn.trim(),
        mr: newCatMr.trim() || newCatEn.trim()
      },
      order: categories.length + 1,
      isVisible: true
    };
    saveCategories([...categories, newCat]);
    setNewCatEn('');
    setNewCatMr('');
  };

  const handleUpdateName = (id: string, field: 'en' | 'mr', val: string) => {
    const updated = categories.map(cat => {
      if (cat.id === id) {
        return {
          ...cat,
          name: {
            ...cat.name,
            [field]: val
          }
        };
      }
      return cat;
    });
    saveCategories(updated);
  };

  const handleToggleVisibility = (id: string) => {
    const updated = categories.map(cat => 
      cat.id === id ? { ...cat, isVisible: !cat.isVisible } : cat
    );
    saveCategories(updated);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= categories.length) return;
    const cloned = [...categories];
    const temp = cloned[index];
    cloned[index] = cloned[targetIdx];
    cloned[targetIdx] = temp;
    // update orders
    cloned.forEach((c, idx) => c.order = idx + 1);
    saveCategories(cloned);
  };

  const handleDelete = (id: string) => {
    if (id === 'cat_all') return; // protect default
    saveCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-[#2E7D32]" />
            <span>Product Categories</span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage catalogue categories, Marathi translations, ordering, and visibility.
          </p>
        </div>
      </div>

      {/* Add New Category */}
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-end gap-3">
        <div className="flex-1 w-full space-y-1">
          <label className="text-[11px] font-bold text-slate-700 uppercase">Category Name (English)</label>
          <input
            type="text"
            value={newCatEn}
            onChange={(e) => setNewCatEn(e.target.value)}
            placeholder="e.g. Kadak Chai"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
          />
        </div>
        <div className="flex-1 w-full space-y-1">
          <label className="text-[11px] font-bold text-slate-700 uppercase">Marathi Name (मराठी)</label>
          <input
            type="text"
            value={newCatMr}
            onChange={(e) => setNewCatMr(e.target.value)}
            placeholder="उदा. कडक चहा"
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
          />
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          disabled={!newCatEn.trim()}
          className="px-4 py-2 rounded-lg bg-[#2E7D32] hover:bg-[#1B4332] text-white text-xs font-bold uppercase transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
        {categories.map((cat, idx) => (
          <div key={cat.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <span className="w-6 text-center font-mono text-xs text-slate-400 font-bold">
                {idx + 1}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={cat.name.en}
                  onChange={(e) => handleUpdateName(cat.id, 'en', e.target.value)}
                  className="px-2.5 py-1 text-xs font-semibold rounded border border-slate-200 bg-white"
                />
                <input
                  type="text"
                  value={cat.name.mr}
                  onChange={(e) => handleUpdateName(cat.id, 'mr', e.target.value)}
                  placeholder="मराठी नाव"
                  className="px-2.5 py-1 text-xs rounded border border-slate-200 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-center">
              <button
                type="button"
                onClick={() => handleToggleVisibility(cat.id)}
                className={`p-1.5 rounded text-xs transition-colors cursor-pointer ${
                  cat.isVisible ? 'text-[#2E7D32] hover:bg-[#EBF5EC]' : 'text-slate-400 hover:bg-slate-100'
                }`}
                title={cat.isVisible ? 'Visible' : 'Hidden'}
              >
                {cat.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-1.5 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === categories.length - 1}
                className="p-1.5 rounded text-slate-500 hover:bg-slate-100 disabled:opacity-30 cursor-pointer"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              {cat.id !== 'cat_all' && (
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id)}
                  className="p-1.5 rounded text-red-600 hover:bg-red-50 cursor-pointer"
                  title="Delete Category"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
