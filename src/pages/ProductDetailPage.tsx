import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { useRouter, Link } from '../router/Router';
import { ProductItem } from '../types/cms';
import { 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Leaf, 
  Clock, 
  Sparkles, 
  ArrowLeft, 
  Mail, 
  Truck,
  CheckCircle2
} from 'lucide-react';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';

interface ProductDetailPageProps {
  slug: string;
  onOpenInquiry: (productName?: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, onOpenInquiry }) => {
  const { publishedState, addToCart, setIsCartOpen } = useCMS();
  const { navigate } = useRouter();

  const product = publishedState.products.find(p => p.slug === slug) || publishedState.products[0];
  const [selectedPackIdx, setSelectedPackIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    return (
      <div className="pt-36 pb-20 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-800">Product Not Found</h2>
        <Link to="/products" className="mt-4 inline-block text-amber-600 font-bold">
          ← Return to Products Catalogue
        </Link>
      </div>
    );
  }

  const currentPack = product.packSizes[selectedPackIdx] || product.packSizes[0];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      categoryName: product.categoryName,
      packSize: currentPack.size,
      unitPrice: currentPack.price,
      quantity: Math.max(1, quantity),
      imageUrl: '/assets/images/royal_tea_bowl.jpg'
    });

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    setIsCartOpen(true);
  };

  return (
    <div className="pt-28 pb-24 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-amber-700">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-amber-700">Products</Link>
          <span>/</span>
          <span className="text-[#1E3F20] font-bold">{product.name}</span>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Product Visuals */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#1E3F20] aspect-square">
              <img
                src="/assets/images/royal_tea_bowl.jpg"
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badgeText && (
                <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-lataamber-500 text-white text-xs font-black uppercase tracking-wider shadow-xl">
                  {product.badgeText}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl overflow-hidden border-2 border-amber-400 aspect-video bg-black/20 cursor-pointer">
                <img src="/assets/images/royal_tea_bowl.jpg" alt="View 1" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-black/20 cursor-pointer opacity-75 hover:opacity-100 transition-opacity">
                <img src="/assets/images/hero_tea_panoramic.png" alt="View 2" className="w-full h-full object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-black/20 cursor-pointer opacity-75 hover:opacity-100 transition-opacity">
                <img src="/assets/images/royal_tea_bowl.jpg" alt="View 3" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right Column: Product Information & Purchase Actions */}
          <div className="lg:col-span-6 space-y-6">
            
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-latagreen-100 text-[#1E3F20] text-xs font-bold uppercase tracking-wider mb-2">
                <TeaLeafIcon className="w-3.5 h-3.5" />
                <span>{product.categoryName}</span>
              </div>
              <h1 className="font-rajwada text-3xl sm:text-4xl font-black text-[#1E3F20] leading-tight">
                {product.name}
              </h1>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-rajwada text-4xl font-black text-[#1E3F20]">
                ₹{currentPack.price}
              </span>
              <span className="text-xs text-slate-500 font-sans">
                (Inclusive of all taxes & 5% Food GST)
              </span>
            </div>

            <p className="text-slate-700 text-base leading-relaxed font-sans font-light">
              {product.fullDescription}
            </p>

            {/* Pack Size Switcher */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Select Pack Size:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.packSizes.map((pack, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedPackIdx(idx)}
                    className={`p-3 rounded-2xl text-left border-2 transition-all ${
                      selectedPackIdx === idx
                        ? 'border-[#1E3F20] bg-latagreen-50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#1E3F20]">{pack.size}</div>
                    <div className="text-xs font-black text-lataamber-600 mt-0.5">₹{pack.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Add to Cart */}
            <div className="pt-4 border-t border-amber-900/10 space-y-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                
                {/* Direct Keypad Quantity Box */}
                <div className="flex items-center border-2 border-slate-300 rounded-full bg-white px-2 py-1 shadow-inner w-fit">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 text-center text-sm font-black text-[#1E3F20] focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Primary Add to Cart Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-grow inline-flex items-center justify-center gap-2 py-4 px-8 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 transition-all ${
                    isAdded ? 'bg-lataleaf-500' : 'bg-lataamber-500 hover:bg-lataamber-600'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (₹{currentPack.price * quantity})</span>
                    </>
                  )}
                </button>
              </div>

              {/* B2B Sample Quote Button */}
              <button
                type="button"
                onClick={() => onOpenInquiry(product.name)}
                className="w-full py-3.5 rounded-full text-xs font-bold uppercase tracking-wider border-2 border-[#1E3F20] text-[#1E3F20] hover:bg-[#1E3F20] hover:text-amber-300 transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>Request B2B Wholesale / Sample Quote</span>
              </button>
            </div>

            {/* Product Key Highlights */}
            {product.features && (
              <div className="pt-6 border-t border-amber-900/10 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Formulation Features:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-lataleaf-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div className="pt-4 border-t border-amber-900/10">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-1">
                  Ingredients:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {product.ingredients.join(' • ')}
                </p>
              </div>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
