import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { TeaLeafIcon } from '../common/TeaLeafIcon';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQty, 
    removeFromCart, 
    cartSubtotal, 
    cartTotalCount,
    setIsCheckoutOpen 
  } = useCMS();

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500;
  const progressToFreeShip = Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShip = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const handleQtyInputChange = (itemId: string, rawVal: string) => {
    if (rawVal === '') {
      updateCartQty(itemId, 1);
      return;
    }
    const parsed = parseInt(rawVal, 10);
    if (!isNaN(parsed) && parsed > 0) {
      updateCartQty(itemId, parsed);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FAF6EE] text-[#1A2416] shadow-2xl flex flex-col justify-between border-l border-amber-300 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-6 bg-[#1E3F20] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-rajwada font-bold text-2xl text-white">
                  Your Chai Cart
                </h3>
                <div className="text-xs text-amber-300 font-sans flex items-center gap-1">
                  <TeaLeafIcon className="w-3.5 h-3.5" />
                  <span>{cartTotalCount} {cartTotalCount === 1 ? 'pack' : 'packs'} selected • Synced</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="p-4 bg-amber-500/10 border-b border-amber-200 text-xs font-sans">
            <div className="flex items-center justify-between font-bold text-[#1E3F20] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-lataamber-600" />
                {remainingForFreeShip > 0
                  ? `Add ₹${remainingForFreeShip.toFixed(0)} more for FREE Express Delivery`
                  : '🎉 Qualified for FREE Express Delivery!'}
              </span>
              <span>{progressToFreeShip}%</span>
            </div>
            <div className="w-full bg-amber-200/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-latagreen-700 to-lataamber-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShip}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-latacream-300 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 text-slate-400" />
                </div>
                <h4 className="font-rajwada font-bold text-2xl text-[#1E3F20]">
                  Your cart is empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto font-sans">
                  Explore our royal Gud Basundi, Sugar Basundi, and instant vending tea premixes to add fresh packs.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-8 py-3 rounded-full bg-[#1E3F20] text-amber-300 font-bold uppercase tracking-wider text-xs shadow-md font-sans"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div
                  key={item.id}
                  className="p-4 rounded-3xl bg-white border border-amber-200 shadow-sm flex items-center gap-4 transition-all"
                >
                  {/* Thumbnail with guaranteed image fallback */}
                  <div className="w-16 h-16 rounded-2xl bg-latacream-100 border border-amber-200 overflow-hidden flex items-center justify-center p-1 shrink-0">
                    <img 
                      src={item.imageUrl || '/assets/images/royal_tea_bowl.jpg'} 
                      alt={item.name} 
                      onError={(e) => {
                        e.currentTarget.src = '/assets/images/royal_tea_bowl.jpg';
                      }}
                      className="w-full h-full object-cover rounded-xl" 
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-lataleaf-600 font-sans">
                      {item.categoryName}
                    </div>
                    <h5 className="font-rajwada font-bold text-base text-[#1E3F20] truncate">
                      {item.name}
                    </h5>
                    <div className="text-xs text-slate-500 mt-0.5 font-sans">
                      Pack: <span className="font-semibold text-slate-800">{item.packSize}</span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="font-black text-[#1E3F20] text-base font-sans">
                        ₹{(item.unitPrice * item.quantity).toFixed(2).replace(/\.00$/, '')}
                      </div>

                      {/* Direct Keyboard Editable Quantity Input */}
                      <div className="flex items-center bg-latacream-200 rounded-xl border border-amber-300 shadow-inner overflow-hidden">
                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, item.quantity - 1)}
                          className="px-2.5 py-1.5 text-slate-700 hover:bg-amber-200 transition-colors"
                          title="Decrease Quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>

                        {/* Direct Number Input */}
                        <input
                          type="number"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          min="1"
                          max="9999"
                          value={item.quantity}
                          onChange={(e) => handleQtyInputChange(item.id, e.target.value)}
                          className="w-12 text-center bg-white py-1 font-bold text-xs text-[#1E3F20] border-x border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-500 font-sans"
                        />

                        <button
                          type="button"
                          onClick={() => updateCartQty(item.id, item.quantity + 1)}
                          className="px-2.5 py-1.5 text-slate-700 hover:bg-amber-200 transition-colors"
                          title="Increase Quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cart.length > 0 && (
            <div className="p-6 bg-white border-t border-amber-200 space-y-4 shadow-2xl">
              <div className="space-y-1.5 text-xs font-sans">
                <div className="flex items-center justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900 font-mono">₹{cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>GST (5% Food Grade):</span>
                  <span className="font-bold text-slate-900 font-mono">₹{(cartSubtotal * 0.05).toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Delivery:</span>
                  <span className="font-bold text-emerald-600">
                    {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : '₹40.00'}
                  </span>
                </div>
                <div className="pt-2 border-t border-amber-100 flex items-center justify-between text-base font-black text-[#1E3F20]">
                  <span>Total Amount:</span>
                  <span className="font-mono text-xl text-[#1E3F20]">
                    ₹{(cartSubtotal + (cartSubtotal * 0.05) + (cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 40)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-4 rounded-full bg-lataamber-500 hover:bg-lataamber-600 text-white font-bold uppercase tracking-wider text-xs shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 font-sans"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 font-sans">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Encrypted Checkout • Synced Across Devices</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
