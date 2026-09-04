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
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between pb-4 border-b border-[#222]">
        <div>
          <h2 className="text-cms-section text-white flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-white" />
            <span>Product Categories</span>
          </h2>
          <p className="text-cms-small text-neutral-400 mt-1">
            Manage catalogue categories, Marathi translations, ordering, and visibility.
          </p>
        </div>
      </div>

      {/* Add New Category */}
      <div className="p-5 rounded-sm bg-[#111111] border border-[#222] flex flex-col sm:flex-row items-end gap-3">
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-cms-small font-bold text-neutral-300 uppercase">Category Name (English)</label>
          <input
            type="text"
            value={newCatEn}
            onChange={(e) => setNewCatEn(e.target.value)}
            placeholder="e.g. Kadak Chai"
            className="w-full px-3 py-2 text-cms-small rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
          />
        </div>
        <div className="flex-1 w-full space-y-1.5">
          <label className="text-cms-small font-bold text-neutral-300 uppercase">Marathi Name (मराठी)</label>
          <input
            type="text"
            value={newCatMr}
            onChange={(e) => setNewCatMr(e.target.value)}
            placeholder="उदा. कडक चहा"
            className="w-full px-3 py-2 text-cms-small rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          disabled={!newCatEn.trim()}
          className="px-5 py-2.5 rounded-sm bg-white hover:bg-neutral-200 text-black text-cms-btn uppercase font-bold transition-colors disabled:opacity-50 cursor-pointer flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-[#111111] rounded-sm border border-[#222] divide-y divide-[#222] overflow-hidden">
        {categories.map((cat, idx) => (
          <div key={cat.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#161616] transition-colors">
            <div className="flex items-center gap-3 flex-1">
              <span className="w-6 text-center font-mono text-cms-small text-neutral-500 font-bold shrink-0">
                {idx + 1}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
                <input
                  type="text"
                  value={cat.name.en}
                  onChange={(e) => handleUpdateName(cat.id, 'en', e.target.value)}
                  className="px-3 py-1.5 text-cms-btn rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                />
                <input
                  type="text"
                  value={cat.name.mr}
                  onChange={(e) => handleUpdateName(cat.id, 'mr', e.target.value)}
                  placeholder="मराठी नाव"
                  className="px-3 py-1.5 text-cms-small rounded-sm border border-[#333] bg-[#0a0a0a] text-white placeholder:text-neutral-600 focus:border-white focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
              <button
                type="button"
                onClick={() => handleToggleVisibility(cat.id)}
                className={`p-2 rounded-sm text-cms-small transition-colors cursor-pointer ${
                  cat.isVisible ? 'text-white bg-[#0a0a0a] border border-[#333]' : 'text-neutral-500 hover:text-neutral-300'
                }`}
                title={cat.isVisible ? 'Visible' : 'Hidden'}
              >
                {cat.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => handleMove(idx, 'up')}
                disabled={idx === 0}
                className="p-2 rounded-sm text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Move Up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => handleMove(idx, 'down')}
                disabled={idx === categories.length - 1}
                className="p-2 rounded-sm text-neutral-400 hover:text-white disabled:opacity-30 cursor-pointer"
                title="Move Down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>

              {cat.id !== 'cat_all' && (
                <button
                  type="button"
                  onClick={() => handleDelete(cat.id)}
                  className="p-2 rounded-sm text-red-400 hover:text-red-300 hover:bg-red-950/40 cursor-pointer transition-colors"
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




