import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { RegistrationAndContact } from '../components/public/RegistrationAndContact';
import { TeaLeafIcon } from '../components/common/TeaLeafIcon';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { publishedState } = useCMS();
  const contact = publishedState.contact;

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    sector: 'Corporate Office',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-[#FAF6EE] text-[#1A2416] animate-fade-in min-h-screen">
      
      {/* Hero Header */}
      <section className="relative py-16 bg-[#162D18] text-white text-center overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/40 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3">
            <TeaLeafIcon className="w-3.5 h-3.5" />
            <span>CONNECT WITH LATA TEA</span>
          </div>
          <h1 className="font-rajwada text-3xl sm:text-5xl font-black text-amber-100 tracking-tight">
            Corporate Sales & Sample Inquiries
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-200 font-light font-sans max-w-2xl mx-auto">
            Get in touch for wholesale distributor pricing, trial sample kits, or custom white-label formulations.
          </p>
        </div>
      </section>

      {/* Inquiry Form & Direct Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-amber-100">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-latagreen-100 text-lataleaf-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-rajwada text-2xl font-bold text-[#1E3F20]">
                  Inquiry Received Successfully
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto font-sans">
                  Our regional B2B consultant will contact you within 24 hours with your customized commercial proposal and sample kit dispatch details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-rajwada text-2xl font-bold text-[#1E3F20] mb-2">
                  Request Commercial Proposal & Samples
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3F20] text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Establishment</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Grand Heritage Banquets"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3F20] text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3F20] text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3F20] text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Business Sector</label>
                  <select
                    value={formData.sector}
                    onChange={e => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3F20] text-sm focus:outline-none bg-white"
                  >
                    <option>Corporate Office / IT Park</option>
                    <option>Hotel / Banquet Hall</option>
                    <option>Restaurant / QSR Franchise</option>
                    <option>Café / Tea Bar</option>
                    <option>Retail Supermarket / Distributor</option>
                    <option>Vending Machine Operator</option>
                    <option>Other / Personal Purchase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Requirements & Delivery Address</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us your monthly cup volume or desired trial samples..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#1E3F20] text-sm focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-lataamber-500 hover:bg-lataamber-600 text-white shadow-xl hover:scale-102 transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Sample & Pricing Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-[#1E3F20] text-white shadow-xl space-y-6">
              <h3 className="font-rajwada text-2xl font-bold text-amber-300">
                Corporate Headquarters
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm font-sans font-light">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-lataamber-400 shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-lataleaf-400 shrink-0" />
                  <span>{contact.phone1} | {contact.phone2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-lataamber-400 shrink-0" />
                  <span>{contact.email}</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-amber-100 shadow-md">
              <h4 className="font-royal text-base font-bold text-[#1E3F20] mb-2">
                FSSAI & Regulatory Compliance
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                FSSAI License: <span className="font-mono font-bold text-slate-800">{contact.registration.fssai}</span><br />
                GSTIN: <span className="font-mono font-bold text-slate-800">{contact.registration.gst}</span><br />
                IEC: <span className="font-mono font-bold text-slate-800">{contact.registration.iec}</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Statutory & Official Banking Details */}
      <RegistrationAndContact />

    </div>
  );
};
