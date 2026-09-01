import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { orderStore, OrderRecord } from '../../services/orderStore';
import { 
  X, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight, 
  Copy, 
  Check, 
  PackageCheck,
  Building2,
  Phone,
  QrCode,
  Lock
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    cartSubtotal, 
    clearCart 
  } = useCMS();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Pune');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('411012');
  const [paymentMethod, setPaymentMethod] = useState('Direct Bank Transfer (RTGS / NEFT / IMPS)');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<OrderRecord | null>(null);
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedId, setCopiedId] = useState(false);

  if (!isCheckoutOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 500;
  const shipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 40;
  const gst = cartSubtotal * 0.05;
  const grandTotal = cartSubtotal + shipping + gst;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const order = orderStore.createOrder({
        customerName: name,
        email,
        phone,
        address,
        city,
        pincode,
        items: cart,
        subtotal: cartSubtotal,
        gst,
        shipping,
        total: grandTotal,
        paymentMethod
      });

      setPlacedOrder(order);
      clearCart();
      setIsProcessing(false);
    }, 600);
  };

  const handleCopyBank = () => {
    const text = `Payment Details:
Account Name: Purple Bean Agro Industries Private Limited
Bank Name: IDFC First Bank
Account Number: 10227953860
IFSC Code: IDFB0041438
FSSAI No: 11525996000709
GST No: 27AAPCP3820M1ZX`;
    navigator.clipboard.writeText(text);
    setCopiedBank(true);
    setTimeout(() => setCopiedBank(false), 2000);
  };

  const handleCopyOrderId = () => {
    if (!placedOrder) return;
    navigator.clipboard.writeText(placedOrder.orderId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleClose = () => {
    setPlacedOrder(null);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF6EE] text-[#1A2416] border-2 border-amber-300 rounded-[32px] w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl overflow-hidden font-sans">
        
        {/* Header */}
        <div className="bg-[#1E3F20] text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-rajwada font-bold text-2xl text-white">
                {placedOrder ? 'Order Confirmed!' : 'Secure Express Checkout'}
              </h3>
              <p className="text-xs text-slate-300">
                {placedOrder ? 'Consignment booked successfully.' : 'Complete dispatch & payment details for immediate dispatch.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 text-slate-300 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {placedOrder ? (
            /* Order Placed Success View */
            <div className="text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
                <PackageCheck className="w-12 h-12" />
              </div>

              <div className="space-y-1">
                <h4 className="font-rajwada font-black text-3xl sm:text-4xl text-[#1E3F20]">
                  Thank You, {placedOrder.customerName}!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Your order for fresh royal LataTea has been booked. Please complete settlement using the official payment gateway below.
                </p>
              </div>

              {/* Order ID & Tracking Banner */}
              <div className="p-5 rounded-2xl bg-white border border-amber-200 shadow-sm max-w-md mx-auto space-y-3 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-amber-100">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Your Live Tracking ID</span>
                    <div className="font-mono font-bold text-xl text-[#1E3F20]">{placedOrder.orderId}</div>
                  </div>
                  <button
                    onClick={handleCopyOrderId}
                    className="px-3 py-1.5 rounded-lg bg-latacream-200 hover:bg-latacream-300 text-slate-700 text-xs font-bold flex items-center gap-1.5"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId ? 'Copied' : 'Copy ID'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Estimated Delivery:</span>
                    <span className="font-bold text-slate-800">{placedOrder.estimatedDelivery}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Courier Partner:</span>
                    <span className="font-bold text-slate-800">{placedOrder.courierName}</span>
                  </div>
                </div>
              </div>

              {/* Official Payment Details Card from Brochure */}
              <div className="rounded-3xl bg-[#E58A1F] text-[#1E3F20] p-6 text-left shadow-xl border-2 border-amber-400 space-y-4">
                <div className="flex items-center justify-between border-b border-black/10 pb-3">
                  <h5 className="font-rajwada font-black text-2xl text-slate-950">
                    Official Payment & Banking Gateway
                  </h5>
                  <button
                    onClick={handleCopyBank}
                    className="px-3 py-1.5 rounded-xl bg-[#1E3F20] text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-black transition-colors"
                  >
                    {copiedBank ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedBank ? 'Bank Info Copied' : 'Copy Bank Info'}</span>
                  </button>
                </div>

                {/* Exact Brochure Info from Image 3 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                  <div className="space-y-1.5 bg-black/10 p-3.5 rounded-2xl">
                    <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Payment Details</div>
                    <div><strong>Account Name:</strong> Purple Bean Agro Industries Private Limited</div>
                    <div><strong>Bank Name:</strong> IDFC First Bank</div>
                    <div><strong>Account Number:</strong> <span className="font-mono font-bold">10227953860</span></div>
                    <div><strong>IFSC Code:</strong> <span className="font-mono font-bold">IDFB0041438</span></div>
                  </div>

                  <div className="space-y-1.5 bg-black/10 p-3.5 rounded-2xl">
                    <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Registration & Trust Details</div>
                    <div><strong>FSSAI No:</strong> 11525996000709</div>
                    <div><strong>IEC No:</strong> AAPCP3820M</div>
                    <div><strong>GST No:</strong> 27AAPCP3820M1ZX</div>
                    <div><strong>Helpline:</strong> +91 7666953873 | +91 8483067383</div>
                  </div>
                </div>

                <div className="text-[11px] text-slate-900 italic pt-1">
                  * Please share transaction reference screenshot on WhatsApp (+91 7666953873) with your Order ID ({placedOrder.orderId}) for instant priority dispatch!
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
                <a
                  href="#track-order"
                  onClick={handleClose}
                  className="w-full sm:w-auto px-9 py-3.5 rounded-full bg-[#1E3F20] hover:bg-[#142915] text-amber-300 font-bold uppercase tracking-wider text-xs shadow-lg transition-all text-center"
                >
                  Track This Consignment Live
                </a>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-latacream-300 hover:bg-latacream-400 text-slate-800 font-bold uppercase tracking-wider text-xs transition-all"
                >
                  Back to Website
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form & Integrated Gateway Info */
            <form onSubmit={handlePlaceOrder} className="space-y-6 text-xs">
              
              {/* Form Inputs */}
              <div className="space-y-4">
                <h4 className="font-rajwada font-bold text-xl text-[#1E3F20] flex items-center gap-2">
                  <span>1. Consignment Dispatch Address</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name / Company Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Joshi"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white font-sans text-sm focus:ring-2 focus:ring-lataamber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white font-sans text-sm focus:ring-2 focus:ring-lataamber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="vikram@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white font-sans text-sm focus:ring-2 focus:ring-lataamber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">City / District *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white font-sans text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Complete Street / Commercial Address *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Office / Hotel / Apartment name, Street, Landmark"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-amber-300 bg-white font-sans text-xs focus:ring-2 focus:ring-lataamber-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">State *</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={e => setState(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-sans text-xs"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Postal Pincode *</label>
                    <input
                      type="text"
                      required
                      value={pincode}
                      onChange={e => setPincode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 bg-white font-sans text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Gateway Information Box from Image 3 */}
              <div className="rounded-3xl bg-[#E58A1F] text-[#1E3F20] p-6 shadow-md border-2 border-amber-400 space-y-3">
                <div className="flex items-center justify-between border-b border-black/10 pb-2">
                  <h5 className="font-rajwada font-black text-xl text-slate-950 flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Official Payment & Banking Gateway</span>
                  </h5>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1E3F20] text-amber-300 px-2.5 py-1 rounded-full">
                    Verified Food Safety
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-black/10 p-3 rounded-xl space-y-1">
                    <div className="font-bold text-slate-950">Bank Account Details</div>
                    <div><strong>Account Name:</strong> Purple Bean Agro Industries Private Limited</div>
                    <div><strong>Bank:</strong> IDFC First Bank</div>
                    <div><strong>A/C No:</strong> <span className="font-mono font-bold">10227953860</span></div>
                    <div><strong>IFSC:</strong> <span className="font-mono font-bold">IDFB0041438</span></div>
                  </div>

                  <div className="bg-black/10 p-3 rounded-xl space-y-1">
                    <div className="font-bold text-slate-950">Statutory Registrations</div>
                    <div><strong>FSSAI No:</strong> 11525996000709</div>
                    <div><strong>IEC No:</strong> AAPCP3820M</div>
                    <div><strong>GST No:</strong> 27AAPCP3820M1ZX</div>
                    <div><strong>Direct Support:</strong> +91 7666953873</div>
                  </div>
                </div>
              </div>

              {/* Payment Mode Selector */}
              <div className="space-y-2 pt-2">
                <label className="block font-bold text-slate-800">Select Preferred Mode:</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Direct Bank Transfer (RTGS / NEFT / IMPS)',
                    'UPI / GPay / PhonePe / Paytm',
                    'Credit / Debit Card Online',
                    'Cash on Delivery / Institutional Credit'
                  ].map(m => (
                    <label
                      key={m}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center gap-2 transition-all ${
                        paymentMethod === m
                          ? 'bg-[#1E3F20] text-white border-[#1E3F20] shadow-sm'
                          : 'bg-white text-slate-700 border-amber-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paym"
                        checked={paymentMethod === m}
                        onChange={() => setPaymentMethod(m)}
                        className="accent-amber-500"
                      />
                      <span className="font-semibold text-xs">{m}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Order Total & Submit */}
              <div className="p-5 rounded-2xl bg-white border border-amber-300 flex items-center justify-between text-xs font-bold shadow-sm">
                <div>
                  <span className="text-slate-500 block text-[10px]">Payable Order Total:</span>
                  <span className="font-black text-2xl text-[#1E3F20] font-sans">
                    ₹{grandTotal.toFixed(2)}
                  </span>
                  <span className="text-[10px] text-slate-500 font-normal ml-1">
                    (incl. 5% GST & Shipping)
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-9 py-4 rounded-full bg-lataamber-500 hover:bg-lataamber-600 text-white font-bold uppercase tracking-wider text-xs shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 flex items-center gap-2 font-sans"
                >
                  <span>{isProcessing ? 'Processing Order...' : 'Confirm & Place Order'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
