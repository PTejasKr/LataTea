import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';
import { useRouter, Link } from '../router/Router';
import { ProductCategory, ProductItem } from '../types/cms';
import { ShoppingBag, Sparkles, Check, ArrowRight, Eye } from 'lucide-react';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';

interface ProductsPageProps {
  initialCategory?: ProductCategory | 'all';
  onOpenInquiry: (productName?: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ initialCategory = 'all', onOpenInquiry }) => {
  const { publishedState, addToCart, setIsCartOpen } = useCMS();
  const { path } = useRouter();
  
  // Determine category from path or prop
  const getCategoryFromPath = (): ProductCategory | 'all' => {
    if (path.includes('gud-tea')) return 'gud';
    if (path.includes('sugar-tea')) return 'sugar';
    if (path.includes('premixes')) return 'vending';
    return initialCategory;
  };

  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>(getCategoryFromPath());
  const [selectedPackSizes, setSelectedPackSizes] = useState<Record<string, number>>({});
  const [addedAnimation, setAddedAnimation] = useState<string | null>(null);

  useEffect(() => {
    setActiveCategory(getCategoryFromPath());
  }, [path]);

  const products = publishedState.products.filter(p => p.isVisible);

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const handlePackChange = (productId: string, packIdx: number) => {
    setSelectedPackSizes(prev => ({ ...prev, [productId]: packIdx }));
  };

  const handleAddToCart = (product: ProductItem) => {
    const packIdx = selectedPackSizes[product.id] || 0;
    const pack = product.packSizes[packIdx] || product.packSizes[0];
    
    addToCart({
      productId: product.id,
      name: product.name,
      categoryName: product.categoryName,
      packSize: pack.size,
      unitPrice: pack.price,
      quantity: 1,
      imageUrl: '/assets/images/royal_tea_bowl.jpg'
    });

    setAddedAnimation(product.id);
    setTimeout(() => setAddedAnimation(null), 1800);
    setIsCartOpen(true);
  };

  return (
    <div className="pt-28 pb-24 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Page Header Banner */}
      <section className="relative py-16 bg-[#173119] text-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>AUTHENTIC MASTER BLENDS</span>
          </div>
          <h1 className="font-rajwada text-3xl sm:text-5xl md:text-6xl font-black text-amber-100 tracking-tight">
            Explore Our Complete Range
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 font-light font-sans max-w-2xl mx-auto">
            Traditional jaggery formulations, royal wedding basundi, and automatic 3-in-1 vending premixes.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'all'
                  ? 'bg-lataamber-500 text-white shadow-xl scale-105'
                  : 'bg-black/40 text-slate-200 hover:bg-black/60 border border-amber-400/30'
              }`}
            >
              All Blends ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('gud')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'gud'
                  ? 'bg-lataleaf-500 text-white shadow-xl scale-105'
                  : 'bg-black/40 text-slate-200 hover:bg-black/60 border border-amber-400/30'
              }`}
            >
              Gud Tea Range (Organic Jaggery)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('sugar')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'sugar'
                  ? 'bg-amber-600 text-white shadow-xl scale-105'
                  : 'bg-black/40 text-slate-200 hover:bg-black/60 border border-amber-400/30'
              }`}
            >
              Sugar Tea Range (Royal Basundi)
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('vending')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                activeCategory === 'vending'
                  ? 'bg-blue-600 text-white shadow-xl scale-105'
                  : 'bg-black/40 text-slate-200 hover:bg-black/60 border border-amber-400/30'
              }`}
            >
              Vending Premixes (3-in-1)
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map(product => {
            const currentPackIdx = selectedPackSizes[product.id] || 0;
            const currentPack = product.packSizes[currentPackIdx] || product.packSizes[0];
            const isJustAdded = addedAnimation === product.id;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-amber-100 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Thumbnail Image Header */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-[#1E3F20]">
                    <img
                      src="/assets/images/royal_tea_bowl.jpg"
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    {product.badgeText && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-lataamber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-lg">
                        {product.badgeText}
                      </div>
                    )}

                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 text-[10px] font-bold border border-amber-400/30">
                      {product.categoryName}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="font-rajwada text-xl sm:text-2xl font-bold text-[#1E3F20] group-hover:text-lataamber-600 transition-colors">
                      <Link to={`/products/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 font-sans line-clamp-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Pack Sizes Selector Buttons */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Select Packaging:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.packSizes.map((pack, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handlePackChange(product.id, idx)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                              currentPackIdx === idx
                                ? 'bg-[#1E3F20] text-amber-300 shadow-sm'
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            {pack.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-6 pt-0 border-t border-slate-100 flex items-center justify-between gap-3 mt-4">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Unit Price</div>
                    <div className="font-rajwada text-2xl font-black text-[#1E3F20]">
                      ₹{currentPack.price}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/products/${product.slug}`}
                      className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`inline-flex items-center gap-1.5 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all shadow-md ${
                        isJustAdded
                          ? 'bg-lataleaf-500'
                          : 'bg-lataamber-500 hover:bg-lataamber-600 hover:scale-105'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
