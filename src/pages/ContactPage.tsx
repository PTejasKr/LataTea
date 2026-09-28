import React, { useState } from 'react';
import { useCMS } from '../context/CMSContext';
import { Mail, Phone, Send, CheckCircle2, Building2, MessageCircle, Sparkles } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { publishedState, language, t } = useCMS();
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

  const whatsappNumber = contact.whatsapp?.replace(/[^0-9]/g, '') || '917666953873';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%20Lata%20Private%20Limited%2C%20I%20would%20like%20to%20inquire%20about%20your%20tea%20products%20and%20request%20samples.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Commercial Inquiry Submitted:', formData);
    setFormSubmitted(true);
  };

  return (
    <div className="bg-brand-background text-brand-primary min-h-screen font-sans">
      
      {/* Contact Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-[#0A2318] text-white text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <span className="text-pub-small font-sans font-semibold tracking-widest text-brand-accent uppercase block mb-2">
            {language === 'mr' ? 'थेट संपर्क' : 'DIRECT COMMERCIAL CHANNELS'}
          </span>
          <h1 className="font-rajwada text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            {t('Distributor & Wholesale Enquiries')}
          </h1>
          <p className="mt-2.5 text-sm sm:text-base text-slate-200 max-w-xl mx-auto leading-relaxed">
            {t('Direct supply chain solutions for corporate pantries, hotels, and FMCG distributors across India.')}
          </p>
        </div>
      </section>

      {/* Inquiry Form & Direct Contact Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-brand-surface rounded-2xl p-6 sm:p-10 shadow-sm border border-brand-border">
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
                <div>
                  <h3 className="font-rajwada text-2xl font-bold text-brand-primary-dark mb-1">
                    Request Commercial Proposal & Samples
                  </h3>
                  <p className="text-xs text-brand-text-muted font-sans">
                    Fill out the form below and our team will get back to you promptly.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-brand-primary uppercase mb-1">{t('Your Name')} *</label>
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
                    <label className="block text-xs font-bold text-brand-primary uppercase mb-1">{t('Company / Establishment')}</label>
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
                    <label className="block text-xs font-bold text-brand-primary uppercase mb-1">{t('Phone / WhatsApp')} *</label>
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
                    <label className="block text-xs font-bold text-brand-primary uppercase mb-1">{t('Email Address')}</label>
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
                  <label className="block text-xs font-bold text-brand-primary uppercase mb-1">{t('Business Sector')}</label>
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
                  <label className="block text-xs font-bold text-brand-primary uppercase mb-1">{t('Requirements & Message')}</label>
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
                  className="w-full py-3.5 rounded-xl text-pub-btn uppercase tracking-wider bg-brand-accent hover:bg-brand-accent-hover text-white font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Sample & Pricing Request</span>
                </button>
              </form>
            )}
          </div>

          {/* Quick Info Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Corporate Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0A2318] text-white shadow-md space-y-6 border border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-brand-accent shrink-0">
                  <Building2 className="w-5 h-5 text-brand-accent" />
                </div>
                <div>
                  <span className="text-[11px] font-sans font-bold text-brand-accent uppercase tracking-widest block">
                    {t('Head Office')}
                  </span>
                  <h3 className="font-rajwada text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {contact.companyName || 'Lata Private Limited'}
                  </h3>
                </div>
              </div>
              
              <div className="space-y-4 text-sm font-sans pt-2 border-t border-white/10">
                
                {/* Official Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {t('Email:')}
                    </span>
                    <a 
                      href={`mailto:${contact.email || 'info@latatea.com'}`}
                      className="text-white hover:text-brand-accent font-semibold transition-colors break-all"
                    >
                      {contact.email || 'info@latatea.com'}
                    </a>
                  </div>
                </div>

                {/* Direct Phone Numbers */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-brand-accent shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-brand-accent" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      {t('Direct Phone:')}
                    </span>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-white">
                      <a href="tel:+917666953873" className="hover:text-brand-accent transition-colors">+91 7666953873</a>
                      <span className="text-white/40">•</span>
                      <a href="tel:+918483067383" className="hover:text-brand-accent transition-colors">+91 8483067383</a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Direct WhatsApp CTA Button */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{language === 'mr' ? 'व्हॉट्सॲपवर संपर्क साधा' : 'Connect on WhatsApp'}</span>
                </a>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                  <span>{language === 'mr' ? 'त्वरित प्रतिसाद उपलब्ध' : 'Direct corporate desk support'}</span>
                </div>
              </div>
            </div>

            {/* Timings / Fast Response Box */}
            <div className="p-6 rounded-2xl bg-brand-surface border border-brand-border text-brand-primary space-y-2">
              <h4 className="font-rajwada font-bold text-base text-brand-primary">
                {language === 'mr' ? 'व्यावसायिक चौकशी वेळ' : 'Business Inquiry Hours'}
              </h4>
              <p className="text-xs text-brand-text-muted font-sans leading-relaxed">
                {language === 'mr' 
                  ? 'सोमवार ते शनिवार: सकाळी ९:०० ते संध्याकाळी ७:००. सर्व व्यापारी व घाऊक चौकशींना २४ तासांच्या आत प्रतिसाद दिला जातो.'
                  : 'Monday to Saturday: 9:00 AM – 7:00 PM IST. Dedicated commercial managers respond to all business queries within 24 hours.'}
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
