import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ProductCategory } from '../../types/cms';
import { ShoppingBag, Check, ChevronRight } from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

interface ProductCatalogProps {
  onOpenInquiry: (productName?: string) => void;
  isDraftPreview?: boolean;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ onOpenInquiry, isDraftPreview = false }) => {
  const { publishedState, draftState, resolveSlotImage, addToCart } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('gud');
  const [selectedPackIndex, setSelectedPackIndex] = useState<Record<string, number>>({});
  const [addedItemKey, setAddedItemKey] = useState<string | null>(null);

  const visibleProducts = state.products
    .filter(p => p.isVisible && p.category === selectedCategory)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const categories: { id: ProductCategory; name: string; subtitle: string; badge: string }[] = [
    {
      id: 'gud',
      name: 'Gud Tea Range',
      subtitle: 'Natural Sweetness. Traditional Goodness. (गुळ टी)',
      badge: 'Natural Jaggery'
    },
    {
      id: 'sugar',
      name: 'Sugar Tea Range',
      subtitle: 'Classic Taste Loved by Millions (साखर टी)',
      badge: 'Classic Chai'
    },
    {
      id: 'vending',
      name: 'Vending Premixes',
      subtitle: 'Instant Dispense for Offices & HoReCa (व्हेंडिंग मशीन)',
      badge: 'Machine Ready'
    }
  ];

  const handlePackChange = (productId: string, packIdx: number) => {
    setSelectedPackIndex(prev => ({
      ...prev,
      [productId]: packIdx
    }));
  };

  const handleAddToCart = (product: typeof visibleProducts[0]) => {
    const currentPackIdx = selectedPackIndex[product.id] ?? 0;
    const currentPack = product.packSizes[currentPackIdx] || product.packSizes[0];
    const imgData = resolveSlotImage(product.imageSlotId || 'ABOUT_IMAGE_PRIMARY', false, isDraftPreview);

    addToCart({
      productId: product.id,
      name: product.name,
      categoryName: product.categoryName,
      packSize: currentPack.size,
      unitPrice: currentPack.price,
      quantity: 1,
      imageUrl: imgData.url || '/assets/images/royal_tea_bowl.jpg'
    });

    const key = `${product.id}_${currentPack.size}`;
    setAddedItemKey(key);
    setTimeout(() => setAddedItemKey(null), 1800);
  };

  return (
    <section id="products" className="pt-0 pb-24 bg-white relative">
      
      {/* Authentic Brochure Scalloped Arch Banner Heading */}
      <div className="w-full bg-[#E58A1F] relative overflow-hidden pt-6 pb-12 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Scalloped Forest Green Arch Card */}
          <div className="relative mx-auto bg-[#1E3F20] text-white rounded-[40px] px-6 sm:px-12 py-10 text-center shadow-2xl border-4 border-amber-300/40">
            <div className="absolute top-0 left-0 w-8 h-8 rounded-br-3xl bg-[#E58A1F]" />
            <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-3xl bg-[#E58A1F]" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-8 h-8 rotate-45 bg-[#1E3F20] border-b-4 border-r-4 border-amber-300/40" />

            <h2 className="font-rajwada text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-tight">
              Explore Our Complete Range
            </h2>

            {/* Oval Pill: Tea for Every Taste */}
            <div className="mt-4 inline-block">
              <div className="px-8 py-2 rounded-full border-2 border-white/60 text-amber-200 font-royal font-bold text-sm sm:text-base tracking-widest uppercase backdrop-blur-sm bg-white/5 flex items-center justify-center gap-2">
                <TeaLeafIcon className="w-4 h-4" />
                <span>Tea for Every Taste</span>
              </div>
            </div>
          </div>

          {/* 3 Royal Range Header Tabs */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            {categories.map(cat => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`py-3.5 px-6 rounded-2xl font-rajwada font-bold text-xl sm:text-2xl transition-all duration-200 shadow-md ${
                    isActive
                      ? 'bg-[#1E3F20] text-amber-300 ring-4 ring-white/60 scale-105 shadow-xl'
                      : 'bg-white/20 hover:bg-white/30 text-white hover:text-amber-100 backdrop-blur-sm'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
        
        {/* Active Range Sub-banner */}
        <div className="bg-[#FAF6EE] text-[#1E3F20] rounded-3xl p-6 sm:p-8 mb-12 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-200">
          <div>
            <div className="text-xs uppercase tracking-widest text-lataamber-600 font-bold mb-1 font-sans flex items-center gap-1.5">
              <TeaLeafIcon className="w-3.5 h-3.5" />
              <span>Currently Selected Range</span>
            </div>
            <h3 className="font-rajwada text-2xl sm:text-3xl font-bold text-[#1E3F20]">
              {categories.find(c => c.id === selectedCategory)?.name}
            </h3>
            <p className="text-sm text-slate-600 mt-1 font-sans">
              {categories.find(c => c.id === selectedCategory)?.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold bg-white px-5 py-2.5 rounded-2xl border border-amber-300 text-slate-800 shrink-0 font-sans shadow-sm">
            <span>Pack Sizes: 14g/16g Sachet • 140g/160g Pack • 1kg Commercial</span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {visibleProducts.map(product => {
            const currentPackIdx = selectedPackIndex[product.id] ?? 0;
            const currentPack = product.packSizes[currentPackIdx] || product.packSizes[0] || { size: 'Pack', price: 0 };
            const isAdded = addedItemKey === `${product.id}_${currentPack.size}`;

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-white rounded-3xl overflow-hidden border border-amber-200/80 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5"
              >
                {/* Visual Packaging Area */}
                <div className="relative p-6 bg-gradient-to-b from-[#FAF6EE] to-white flex items-center justify-center">
                  {product.badgeText && (
                    <span className="absolute top-4 left-4 z-10 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-lataamber-500 text-white shadow-sm font-sans flex items-center gap-1">
                      <TeaLeafIcon className="w-3 h-3 brightness-200" />
                      <span>{product.badgeText}</span>
                    </span>
                  )}
                  {product.isFeatured && (
                    <span className="absolute top-4 right-4 z-10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-[#1E3F20] text-amber-300 shadow-sm font-royal">
                      Popular
                    </span>
                  )}

                  <div className="h-56 w-full flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/assets/images/royal_tea_bowl.jpg"
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/royal_tea_bowl.jpg';
                      }}
                      className="max-h-full max-w-full object-cover rounded-2xl shadow-md border border-amber-200/60"
                    />
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 pt-2 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-lataleaf-600 mb-1 font-sans">
                      {product.categoryName}
                    </div>
                    <h4 className="font-rajwada font-bold text-xl text-[#1E3F20] group-hover:text-lataamber-600 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed font-sans">
                      {product.shortDescription}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 font-sans">
                    {/* Size Selector */}
                    <div className="mb-3">
                      <div className="text-[11px] font-semibold text-slate-500 mb-1.5 flex items-center justify-between">
                        <span>Select Size:</span>
                        <span className="text-[10px] text-lataamber-600 font-bold">Brochure Rate</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {product.packSizes.map((pack, idx) => {
                          const isSelected = idx === currentPackIdx;
                          return (
                            <button
                              key={idx}
                              onClick={() => handlePackChange(product.id, idx)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                isSelected
                                  ? 'bg-[#1E3F20] text-amber-300 shadow-sm font-bold'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                              }`}
                            >
                              {pack.size.replace(' Sachet', '').replace(' Pack', '').replace(' Bag', '')}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price and Add to Cart Action */}
                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                          {currentPack.size}
                        </div>
                        <div className="text-2xl font-black text-[#1E3F20] font-sans flex items-baseline">
                          <span>₹{currentPack.price.toFixed(2).replace(/\.00$/, '')}</span>
                          <span className="text-[10px] text-slate-500 font-normal ml-1">/ unit</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleAddToCart(product)}
                        className={`p-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md ${
                          isAdded
                            ? 'bg-emerald-600 text-white'
                            : 'bg-lataamber-500 hover:bg-lataamber-600 text-white hover:scale-105'
                        }`}
                        title="Add to Cart"
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Wholesale Box */}
        <div className="mt-16 p-8 rounded-3xl bg-[#FAF6EE] border border-amber-300 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-left">
              <h4 className="font-rajwada font-bold text-2xl text-[#1E3F20]">
                Institutional & Commercial Bulk Supply
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl font-sans">
                Supplying 1kg commercial packs and master cartons for corporate pantries, hotel chains, and retail distributors across India.
              </p>
            </div>
            <button
              onClick={() => onOpenInquiry()}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#1E3F20] text-amber-300 hover:bg-[#142915] transition-all shadow-md shrink-0 flex items-center gap-2 font-sans"
            >
              <span>Get Wholesale Price List</span>
              <ChevronRight className="w-4 h-4 text-lataamber-400" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
