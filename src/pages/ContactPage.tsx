import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react';
import { RegistrationAndContact } from '../components/public/RegistrationAndContact';

export const ContactPage: React.FC = () => {
  const { publishedState } = useCMS();
  const contact = publishedState.contact;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    sector: 'Head Office / IT Park',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Commercial Inquiry Submitted:', formData);
    setFormSubmitted(true);
  };

  return (
    <div className="pt-20 bg-brand-background text-brand-primary min-h-screen font-sans">
      
      {/* Contact Hero */}
      <section className="py-14 bg-brand-primary-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-[11px] font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-1">
            PARTNER WITH US
          </span>
          <h1 className="font-rajwada text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Distributor & Wholesale Enquiries
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-200 max-w-xl mx-auto">
            Direct supply chain solutions for corporate pantries, hotels, and FMCG distributors across India.
          </p>
        </div>
      </section>

      {/* Inquiry Form & Direct Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-brand-surface rounded-xl p-8 sm:p-10 shadow-sm border border-brand-border">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-accent-pale text-brand-accent flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-rajwada text-2xl font-bold text-brand-primary-dark">
                  Inquiry Received Successfully
                </h3>
                <p className="text-sm text-brand-text-muted max-w-md mx-auto font-sans">
                  Our regional B2B consultant will contact you within 24 hours with your customized commercial proposal and sample kit dispatch details.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-rajwada text-2xl font-bold text-brand-primary-dark mb-2">
                  Request Commercial Proposal & Samples
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-primary uppercase mb-1">Your Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-accent text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-primary uppercase mb-1">Company / Establishment</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Grand Heritage Banquets"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-accent text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-brand-primary uppercase mb-1">Phone / WhatsApp *</label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-accent text-sm focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-primary uppercase mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@company.com"
                      className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-accent text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-primary uppercase mb-1">Business Sector</label>
                  <select
                    value={formData.sector}
                    onChange={e => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-accent text-sm focus:outline-none bg-white"
                  >
                    <option>Head Office / IT Park</option>
                    <option>Hotel / Banquet Hall</option>
                    <option>Restaurant / QSR Franchise</option>
                    <option>Café / Tea Bar</option>
                    <option>Retail Supermarket / Distributor</option>
                    <option>Vending Machine Operator</option>
                    <option>Other / Personal Purchase</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-primary uppercase mb-1">Requirements & Delivery Address</label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us your monthly cup volume or desired trial samples..."
                    className="w-full px-4 py-3 rounded-xl border border-brand-border focus:border-brand-accent text-sm focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-brand-accent hover:bg-brand-accent-hover text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Sample & Pricing Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-xl bg-brand-primary-dark text-white shadow-xs space-y-5 border border-brand-border/20">
              <h3 className="font-rajwada text-xl font-bold text-white">
                Head Office
              </h3>
              
              <div className="space-y-3 text-xs sm:text-sm font-sans">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-brand-accent shrink-0 mt-0.5" />
                  <span>{contact.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-brand-accent shrink-0" />
                  <span>{contact.phone1} | {contact.phone2}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-brand-accent shrink-0" />
                  <span>{contact.email}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Head Office Full Details */}
      <RegistrationAndContact />

    </div>
  );
};
