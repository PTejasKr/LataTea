import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ContactInfo } from '../../types/cms';
import { BROCHURE_CONTACT_PRESET } from '../../data/defaultContent';
import { Phone, Building2, MapPin, Mail, Globe, Sparkles, Trash2, CheckCircle2 } from 'lucide-react';

export const ContactManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const contact = draftState.contact;

  const handleChange = (field: keyof ContactInfo, val: string) => {
    updateDraft(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: val
      }
    }));
  };

  const handleSocialChange = (key: keyof ContactInfo['socials'], val: string) => {
    updateDraft(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        socials: {
          ...prev.contact.socials,
          [key]: val
        }
      }
    }));
  };

  const handleRegChange = (key: keyof ContactInfo['registration'], val: string) => {
    updateDraft(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        registration: {
          ...prev.contact.registration,
          [key]: val
        }
      }
    }));
  };

  const handlePaymentChange = (key: keyof ContactInfo['payment'], val: string) => {
    updateDraft(prev => ({
      ...prev,
      contact: {
        ...prev.contact,
        payment: {
          ...prev.contact.payment,
          [key]: val
        }
      }
    }));
  };

  const handleLoadBrochurePreset = () => {
    updateDraft(prev => ({
      ...prev,
      contact: JSON.parse(JSON.stringify(BROCHURE_CONTACT_PRESET))
    }));
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all contact, registration, and banking fields? (They will be hidden on public site)')) {
      updateDraft(prev => ({
        ...prev,
        contact: {
          companyName: '',
          address: '',
          email: '',
          phone1: '',
          phone2: '',
          phone3: '',
          whatsapp: '',
          website: '',
          googleMapsUrl: '',
          socials: { instagram: '', facebook: '', linkedin: '', youtube: '', twitter: '' },
          registration: { fssai: '', iec: '', gst: '' },
          payment: { accountName: '', bankName: '', accountNumber: '', ifscCode: '' }
        }
      }));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-700">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Phone className="w-5 h-5 text-amber-400" />
            <span>Contact, Company & Registration Manager</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Empty fields are cleanly hidden on the public site. Fill details here to publish live.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleLoadBrochurePreset}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold uppercase tracking-wider text-xs flex items-center gap-1.5 shadow-md"
          >
            <Sparkles className="w-4 h-4" />
            <span>Load Brochure Preset</span>
          </button>

          <button
            onClick={handleClearAll}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-300 text-xs font-semibold flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Fields</span>
          </button>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Core Contact Channels */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>General Contact & Location</span>
          </h3>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. Purple Bean Agro Industries Private Limited"
              value={contact.companyName}
              onChange={e => handleChange('companyName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
              Registered Office Address
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Office 12, Business Avenue, Aundh, Pune, Maharashtra 411012"
              value={contact.address}
              onChange={e => handleChange('address', e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                placeholder="info@latatea.com"
                value={contact.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs focus:ring-1 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                WhatsApp Hotline
              </label>
              <input
                type="text"
                placeholder="+91 7666953873"
                value={contact.whatsapp}
                onChange={e => handleChange('whatsapp', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs focus:ring-1 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Phone 1
              </label>
              <input
                type="text"
                placeholder="+91 7666953873"
                value={contact.phone1}
                onChange={e => handleChange('phone1', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Phone 2
              </label>
              <input
                type="text"
                placeholder="+91 8483067383"
                value={contact.phone2}
                onChange={e => handleChange('phone2', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Phone 3
              </label>
              <input
                type="text"
                placeholder="+91 9595333976"
                value={contact.phone3}
                onChange={e => handleChange('phone3', e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Social Media Handles */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-sky-400" />
            <span>Social Media Channels</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                placeholder="https://instagram.com/latatea"
                value={contact.socials.instagram || ''}
                onChange={e => handleSocialChange('instagram', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Facebook URL
              </label>
              <input
                type="text"
                placeholder="https://facebook.com/latatea"
                value={contact.socials.facebook || ''}
                onChange={e => handleSocialChange('facebook', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                LinkedIn Company Page
              </label>
              <input
                type="text"
                placeholder="https://linkedin.com/company/latatea"
                value={contact.socials.linkedin || ''}
                onChange={e => handleSocialChange('linkedin', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                YouTube Channel
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/@latatea"
                value={contact.socials.youtube || ''}
                onChange={e => handleSocialChange('youtube', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              />
            </div>
          </div>
        </div>

        {/* Card 3: Statutory Registration Details (FSSAI, IEC, GST) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Statutory Registrations (PDF Page 8)</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                FSSAI License Number
              </label>
              <input
                type="text"
                placeholder="e.g. 11525996000709"
                value={contact.registration.fssai || ''}
                onChange={e => handleRegChange('fssai', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                IEC (Import Export Code)
              </label>
              <input
                type="text"
                placeholder="e.g. AAPCP3820M"
                value={contact.registration.iec || ''}
                onChange={e => handleRegChange('iec', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                GST Number
              </label>
              <input
                type="text"
                placeholder="e.g. 27AAPCP3820M1ZX"
                value={contact.registration.gst || ''}
                onChange={e => handleRegChange('gst', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-xs"
              />
            </div>
          </div>
        </div>

        {/* Card 4: Payment Details */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg space-y-4 text-xs">
          <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-amber-400" />
            <span>Bank & Payment Details (Brochure Page 6)</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Beneficiary Account Name
              </label>
              <input
                type="text"
                placeholder="Purple Bean Agro Industries Private Limited"
                value={contact.payment.accountName || ''}
                onChange={e => handlePaymentChange('accountName', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                Bank Name
              </label>
              <input
                type="text"
                placeholder="IDFC First Bank"
                value={contact.payment.bankName || ''}
                onChange={e => handlePaymentChange('bankName', e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-sans text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="10227953860"
                  value={contact.payment.accountNumber || ''}
                  onChange={e => handlePaymentChange('accountNumber', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-xs"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-300 mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  placeholder="IDFB0041438"
                  value={contact.payment.ifscCode || ''}
                  onChange={e => handlePaymentChange('ifscCode', e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-white font-mono text-xs"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
