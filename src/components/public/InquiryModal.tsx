import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { X, CheckCircle2, Send } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProduct?: string | null;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({ isOpen, onClose, defaultProduct }) => {
  const { publishedState, t } = useCMS();
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(defaultProduct || 'Gud Basundi Tea');
  const [packRequirement, setPackRequirement] = useState('Sample Box (All Varieties)');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      // simulate submission
    }, 500);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setName('');
    setEmail('');
    setPhone('');
    setBusinessName('');
    setNotes('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg mx-auto bg-brand-surface rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="bg-brand-primary text-white p-5 sm:p-6 relative shrink-0">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          
          
          <h3 className="font-serif font-bold text-2xl text-white">
            Request LataTea Samples
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Experience our authentic jaggery basundi blend and vending premixes.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-brand-primary">
                Inquiry Received!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Thank you <strong className="text-slate-800">{name || 'valued partner'}</strong>. Our commercial team has recorded your request for <strong className="text-slate-800">{selectedProduct}</strong> and will connect with you within 2 business hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="px-8 py-3 rounded-full bg-brand-primary text-white text-pub-btn uppercase tracking-wider hover:bg-brand-accent transition-all"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Business / Hotel / Office
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grand Vista Hotels"
                    value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent font-sans text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent font-sans text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Interested Product Range
                </label>
                <select
                  value={selectedProduct}
                  onChange={e => setSelectedProduct(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent font-sans text-sm"
                >
                  {(publishedState.teaStories || []).map(p => (
                    <option key={p.id} value={p.name.en}>
                      {p.name.en} ({p.categoryName.en})
                    </option>
                  ))}
                  <option value="Complete Range Sample Pack">Complete Range Sample Box (All Flavors)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Expected Monthly Volume / Requirement
                </label>
                <select
                  value={packRequirement}
                  onChange={e => setPackRequirement(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent font-sans text-sm"
                >
                  <option value="Sample Box (All Varieties)">Initial Sample Box (Test Batch)</option>
                  <option value="50kg - 200kg / month">50kg â€“ 200kg / month (Office / Cafe)</option>
                  <option value="200kg - 1000kg / month">200kg â€“ 1000kg / month (Hotel / Vending Fleet)</option>
                  <option value="1 Ton+ / month">1 Ton+ Commercial Bulk / Retail Distribution</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Delivery Location / Special Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Delivery to Pune / Mumbai branch"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-brand-border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:border-brand-accent font-sans text-sm"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Sample Request</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};




