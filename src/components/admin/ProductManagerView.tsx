import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ProductItem, ProductCategory, PackSizePrice } from '../../types/cms';
import { 
  ShoppingBag, 
  Plus, 
  Edit3, 
  Trash2, 
  Star, 
  Eye, 
  EyeOff, 
  Save, 
  X, 
  IndianRupee, 
  Layers,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export const ProductManagerView: React.FC = () => {
  const { draftState, updateDraft, resolveSlotImage } = useCMS();
  const products = draftState.products;

  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const availableSlots = Object.values(draftState.mediaSlots).filter(s => s.category === 'products' || s.category === 'brand');

  const handleOpenEdit = (prod: ProductItem) => {
    setEditingProduct(JSON.parse(JSON.stringify(prod)));
    setIsCreatingNew(false);
  };

  const handleOpenCreate = () => {
    const newProd: ProductItem = {
      id: `prod_${Date.now()}`,
      slug: `tea-blend-${Date.now().toString().slice(-4)}`,
      name: '',
      category: 'gud',
      categoryName: 'Gud Tea Range',
      shortDescription: '',
      fullDescription: '',
      imageSlotId: 'ABOUT_IMAGE_PRIMARY',
      packSizes: [
        { size: '16g Sachet', price: 15, inStock: true },
        { size: '160g Pouch', price: 135, inStock: true },
        { size: '1kg Pack', price: 780, inStock: true }
      ],
      applications: ['Offices', 'HoReCa', 'Retail Stores'],
      displayOrder: products.length + 1,
      isFeatured: false,
      isVisible: true,
      badgeText: 'New Blend'
    };
    setEditingProduct(newProd);
    setIsCreatingNew(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name.trim()) return;

    // sync category name and slug
    const categoryNameMap: Record<ProductCategory, string> = {
      gud: 'Gud Tea Range',
      sugar: 'Sugar Tea Range',
      vending: 'Vending Machine Premix'
    };
    const finalSlug = editingProduct.slug && editingProduct.slug.trim()
      ? editingProduct.slug.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-')
      : editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const finalProduct: ProductItem = {
      ...editingProduct,
      slug: finalSlug,
      categoryName: categoryNameMap[editingProduct.category] || 'Specialty Tea'
    };

    updateDraft(prev => {
      const exists = prev.products.some(p => p.id === finalProduct.id);
      if (exists) {
        return {
          ...prev,
          products: prev.products.map(p => (p.id === finalProduct.id ? finalProduct : p))
        };
      } else {
        return {
          ...prev,
          products: [...prev.products, finalProduct]
        };
      }
    });

    setEditingProduct(null);
    setIsCreatingNew(false);
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      updateDraft(prev => ({
        ...prev,
        products: prev.products.filter(p => p.id !== id)
      }));
    }
  };

  const handleToggleVisibility = (id: string) => {
    updateDraft(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, isVisible: !p.isVisible } : p))
    }));
  };

  const handleToggleFeatured = (id: string) => {
    updateDraft(prev => ({
      ...prev,
      products: prev.products.map(p => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const target = direction === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= products.length) return;

    const list = [...products];
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;

    const reordered = list.map((item, idx) => ({ ...item, displayOrder: idx + 1 }));
    updateDraft(prev => ({
      ...prev,
      products: reordered
    }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <span>Product & Pricing Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage catalog items, multi-tier pack sizes, dynamic unit pricing, and assigned media slots.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 shadow-md self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Products Table & Grid */}
      <div className="p-6 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-700/60">
          <span>Active Catalog ({products.length} Products)</span>
          <span>Brochure Standard Rates (INR)</span>
        </div>

        <div className="space-y-3">
          {products.map((prod, idx) => {
            const imgData = resolveSlotImage(prod.imageSlotId || 'PRODUCT_GUD_BASUNDI', false, true);

            return (
              <div
                key={prod.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  prod.isVisible
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-900/30 border-slate-800/40 opacity-50'
                }`}
              >
                {/* Product Info & Visual */}
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                    {imgData.url ? (
                      <img src={imgData.url} alt={prod.name} className="h-full w-full object-contain p-1" />
                    ) : (
                      <ShoppingBag className="w-6 h-6 text-slate-500" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{prod.name}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700 uppercase">
                        {prod.categoryName}
                      </span>
                      {prod.isFeatured && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-1 max-w-lg">
                      {prod.shortDescription}
                    </p>
                  </div>
                </div>

                {/* Pack Sizes & Prices Summary */}
                <div className="flex items-center gap-2 flex-wrap">
                  {prod.packSizes.map((pack, pIdx) => (
                    <div key={pIdx} className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs">
                      <span className="text-slate-400 text-[10px] block">{pack.size}</span>
                      <span className="font-bold text-emerald-400">₹{pack.price.toFixed(2).replace(/\.00$/, '')}</span>
                    </div>
                  ))}
                </div>

                {/* Actions & Controls */}
                <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-800">
                  <button
                    onClick={() => handleToggleFeatured(prod.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      prod.isFeatured ? 'text-amber-400 bg-amber-500/10' : 'text-slate-500 hover:bg-slate-800'
                    }`}
                    title="Toggle Featured"
                  >
                    <Star className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleToggleVisibility(prod.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      prod.isVisible ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:bg-slate-800'
                    }`}
                    title={prod.isVisible ? 'Visible' : 'Hidden'}
                  >
                    {prod.isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>

                  <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
                    <button
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={idx === products.length - 1}
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenEdit(prod)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors"
                    title="Edit Product"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(prod.id)}
                    className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                    title="Delete Product"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit / Create Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#1E293B] border border-slate-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700 mb-6">
              <h3 className="font-bold text-lg text-white">
                {isCreatingNew ? 'Create New Product' : `Edit Product: ${editingProduct.name}`}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingProduct.category}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-sm"
                  >
                    <option value="gud">Gud Tea Range (गुळ टी)</option>
                    <option value="sugar">Sugar Tea Range (साखर टी)</option>
                    <option value="vending">Vending Premix Range (व्हेंडिंग)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Short Description (Card Summary)
                </label>
                <textarea
                  rows={2}
                  value={editingProduct.shortDescription}
                  onChange={e => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Bound Media Slot (Image Visual)
                  </label>
                  <select
                    value={editingProduct.imageSlotId}
                    onChange={e => setEditingProduct({ ...editingProduct, imageSlotId: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
                  >
                    {availableSlots.map(slot => (
                      <option key={slot.slotKey} value={slot.slotKey}>
                        {slot.label} ({slot.slotKey})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Card Badge Text (e.g. Natural Jaggery)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.badgeText || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, badgeText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
                  />
                </div>
              </div>

              {/* Pack Sizes & Multi-Tier Pricing (PDF Spec 3) */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-amber-400">
                    Pack Sizes & Brochure Pricing Table
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingProduct({
                        ...editingProduct,
                        packSizes: [...editingProduct.packSizes, { size: 'Custom Pack', price: 50, inStock: true }]
                      });
                    }}
                    className="text-[11px] font-bold text-emerald-400 hover:underline"
                  >
                    + Add Pack Variant
                  </button>
                </div>

                <div className="space-y-2">
                  {editingProduct.packSizes.map((pack, pIdx) => (
                    <div key={pIdx} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-5">
                        <input
                          type="text"
                          value={pack.size}
                          onChange={e => {
                            const copy = [...editingProduct.packSizes];
                            copy[pIdx] = { ...copy[pIdx], size: e.target.value };
                            setEditingProduct({ ...editingProduct, packSizes: copy });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white text-xs"
                        />
                      </div>
                      <div className="col-span-4 flex items-center gap-1">
                        <span className="text-slate-400 text-xs">₹</span>
                        <input
                          type="number"
                          step="0.05"
                          value={pack.price}
                          onChange={e => {
                            const copy = [...editingProduct.packSizes];
                            copy[pIdx] = { ...copy[pIdx], price: parseFloat(e.target.value) || 0 };
                            setEditingProduct({ ...editingProduct, packSizes: copy });
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-slate-800 border border-slate-700 text-white font-mono text-xs"
                        />
                      </div>
                      <div className="col-span-3 flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            const copy = [...editingProduct.packSizes];
                            copy[pIdx] = { ...copy[pIdx], inStock: !copy[pIdx].inStock };
                            setEditingProduct({ ...editingProduct, packSizes: copy });
                          }}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            pack.inStock ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                          }`}
                        >
                          {pack.inStock ? 'In Stock' : 'Out'}
                        </button>
                        {editingProduct.packSizes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              const copy = editingProduct.packSizes.filter((_, i) => i !== pIdx);
                              setEditingProduct({ ...editingProduct, packSizes: copy });
                            }}
                            className="p-1 text-slate-500 hover:text-rose-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-700">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
