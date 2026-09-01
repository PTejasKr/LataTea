import React, { useState } from 'react';
import { orderStore, OrderRecord } from '../../services/orderStore';
import { 
  Search, 
  Truck, 
  Package, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  AlertCircle, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const OrderTrackingSection: React.FC = () => {
  const [query, setQuery] = useState('LT-8842');
  const [searchResult, setSearchResult] = useState<OrderRecord | null>(() => orderStore.findOrder('LT-8842'));
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const result = orderStore.findOrder(query);
    setSearchResult(result);
    setSearched(true);
  };

  const handleQuickTry = (id: string) => {
    setQuery(id);
    const result = orderStore.findOrder(id);
    setSearchResult(result);
    setSearched(true);
  };

  return (
    <section id="track-order" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-lataamber-600 mb-2 block font-sans">
            LIVE CONSIGNMENT TRACKING
          </span>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3F20] tracking-tight">
            Universal Order Tracking
          </h2>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-0.5 w-12 bg-lataamber-500" />
            <div className="w-2 h-2 rounded-full bg-lataamber-500" />
            <div className="h-0.5 w-12 bg-lataamber-500" />
          </div>
          <p className="text-base sm:text-lg text-slate-600 font-sans">
            Enter your Order ID (e.g. <strong className="text-slate-800">LT-8842</strong>), courier AWB, or registered phone number to track your tea consignment in real time.
          </p>
        </div>

        {/* Tracking Search Input Box */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative flex items-center shadow-xl rounded-full bg-[#FAF6EE] border-2 border-amber-300 p-2">
            <div className="pl-4 text-slate-400">
              <Search className="w-5 h-5 text-lataamber-600" />
            </div>
            <input
              type="text"
              placeholder="Enter Order ID (e.g. LT-8842) or Phone number..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full bg-transparent px-4 py-2.5 text-sm font-sans font-semibold text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-full bg-[#1E3F20] hover:bg-[#142915] text-amber-300 font-bold uppercase tracking-wider text-xs shadow-md transition-all shrink-0 flex items-center gap-1.5"
            >
              <span>Track Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Try Chips */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-500 flex-wrap">
            <span>Try sample tracking numbers:</span>
            <button
              type="button"
              onClick={() => handleQuickTry('LT-8842')}
              className="px-3 py-1 rounded-lg bg-latacream-300 text-[#1E3F20] font-bold font-mono hover:bg-latacream-400 transition-colors"
            >
              LT-8842 (In Transit)
            </button>
            <button
              type="button"
              onClick={() => handleQuickTry('LT-1092')}
              className="px-3 py-1 rounded-lg bg-latacream-300 text-[#1E3F20] font-bold font-mono hover:bg-latacream-400 transition-colors"
            >
              LT-1092 (Delivered)
            </button>
          </div>
        </div>

        {/* Tracking Results Card */}
        {searched && searchResult && (
          <div className="max-w-4xl mx-auto bg-[#FAF6EE] border border-amber-200/80 rounded-3xl p-6 sm:p-10 shadow-xl space-y-8 animate-in fade-in duration-300">
            
            {/* Shipment Overview Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-amber-200">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-2xl text-[#1E3F20] tracking-wide">
                    {searchResult.orderId}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    searchResult.status === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                  }`}>
                    ● {searchResult.status}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  Recipient: <strong className="text-slate-900">{searchResult.customerName}</strong> ({searchResult.city}, {searchResult.pincode})
                </div>
              </div>

              <div className="text-left sm:text-right text-xs">
                <div className="text-slate-500">Estimated Delivery:</div>
                <div className="font-bold text-base text-[#1E3F20] font-sans">
                  {searchResult.estimatedDelivery}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Courier: <span className="font-semibold text-slate-700">{searchResult.courierName}</span> ({searchResult.trackingNumber})
                </div>
              </div>
            </div>

            {/* Shipment Progress Timeline Bar */}
            <div className="space-y-6">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#1E3F20] flex items-center gap-2">
                <Truck className="w-4 h-4 text-lataamber-600" />
                <span>Live Transit Timeline & Checkpoints</span>
              </h4>

              <div className="space-y-4">
                {searchResult.trackingSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 relative">
                    {/* Step Indicator Dot */}
                    <div className="flex flex-col items-center shrink-0 mt-0.5">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shadow-md ${
                        step.done
                          ? 'bg-[#1E3F20] text-amber-300 ring-4 ring-amber-200'
                          : 'bg-slate-200 text-slate-400 border border-slate-300'
                      }`}>
                        {step.done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock className="w-3.5 h-3.5" />}
                      </div>
                      {idx < searchResult.trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-10 ${step.done ? 'bg-[#1E3F20]' : 'bg-slate-200'}`} />
                      )}
                    </div>

                    {/* Step Details */}
                    <div className="flex-1 pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <span className={`text-sm font-bold ${step.done ? 'text-slate-900' : 'text-slate-400'}`}>
                          {step.step}
                        </span>
                        <span className="font-mono text-xs text-slate-500">
                          {step.timestamp}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-lataamber-600 shrink-0" />
                        <span>{step.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consignment Items */}
            <div className="pt-6 border-t border-amber-200">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-3">
                Items in Consignment ({searchResult.items.length})
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResult.items.map(item => (
                  <div key={item.id} className="p-3 rounded-2xl bg-white border border-amber-100 flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-contain rounded-lg p-1 bg-latacream-100" />
                    <div>
                      <div className="font-bold text-xs text-[#1E3F20]">{item.name}</div>
                      <div className="text-[11px] text-slate-500">{item.packSize} • Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {searched && !searchResult && (
          <div className="max-w-md mx-auto text-center p-8 bg-[#FAF6EE] border border-amber-200 rounded-3xl space-y-3">
            <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
            <h4 className="font-serif font-bold text-lg text-slate-900">
              No matching consignment found
            </h4>
            <p className="text-xs text-slate-500">
              Please double check your Order ID (e.g. <strong className="text-slate-800">LT-8842</strong>) or phone number and try again.
            </p>
          </div>
        )}

      </div>
    </section>
  );
};
