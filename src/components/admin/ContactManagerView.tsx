import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { ContactInfo } from '../../types/cms';
import { BROCHURE_CONTACT_PRESET } from '../../data/defaultContent';
import { Phone, Building2, MapPin, Mail, Globe, Trash2, CheckCircle2 } from 'lucide-react';

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

  const handleLoadBrochurePreset = () => {
    if (window.confirm('This will overwrite all contact fields with the corporate brochure defaults. Continue?')) {
      updateDraft(prev => ({
        ...prev,
        contact: BROCHURE_CONTACT_PRESET
      }));
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all contact and statutory fields?')) {
      updateDraft(prev => ({
        ...prev,
        contact: {
          companyName: '',
          address: '',
          phone1: '',
          phone2: '',
          phone3: '',
          whatsapp: '',
          email: '',
          socials: { instagram: '', facebook: '', linkedin: '', youtube: '' }, website: '', googleMapsUrl: ''
        }
      }));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-cms-card font-bold text-white font-rajwada">
            Contact Details
          </h2>
          <p className="text-cms-body text-neutral-400 mt-1 max-w-2xl">
            Update the Head Office information, phone numbers, and social media handles displayed across the website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLoadBrochurePreset}
            className="px-3.5 py-2 rounded-sm bg-white text-black font-bold uppercase tracking-wider text-cms-small flex items-center gap-1.5 "
          >
            
            <span>Load Brochure Preset</span>
          </button>

          <button
            onClick={handleClearAll}
            className="px-3 py-2 rounded-sm bg-[#111111] hover:bg-neutral-800 text-white/20 text-neutral-400 hover:text-white text-cms-btn flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Fields</span>
          </button>
        </div>
      </div>

      {/* Forms Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Card 1: Core Contact Channels */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-[#222]  space-y-4 text-cms-small">
          <h3 className="text-cms-body font-bold text-white mb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-white" />
            <span>General Contact & Location</span>
          </h3>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. Purple Bean Agro Industries Private Limited"
              value={contact.companyName}
              onChange={e => handleChange('companyName', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small focus:ring-1 focus:ring-[#333]"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
              Head Office Address
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Office 12, Business Avenue, Aundh, Pune, Maharashtra 411012"
              value={contact.address}
              onChange={e => handleChange('address', e.target.value)}
              className="w-full px-3.5 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small focus:ring-1 focus:ring-[#333]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Official Email Address
              </label>
              <input
                type="email"
                placeholder="info@latatea.com"
                value={contact.email}
                onChange={e => handleChange('email', e.target.value)}
                className="w-full px-3.5 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small focus:ring-1 focus:ring-[#333]"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                WhatsApp Hotline
              </label>
              <input
                type="text"
                placeholder="+91 7666953873"
                value={contact.whatsapp}
                onChange={e => handleChange('whatsapp', e.target.value)}
                className="w-full px-3.5 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small focus:ring-1 focus:ring-[#333]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Phone 1
              </label>
              <input
                type="text"
                placeholder="+91 7666953873"
                value={contact.phone1}
                onChange={e => handleChange('phone1', e.target.value)}
                className="w-full px-3 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Phone 2
              </label>
              <input
                type="text"
                placeholder="+91 8483067383"
                value={contact.phone2}
                onChange={e => handleChange('phone2', e.target.value)}
                className="w-full px-3 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small"
              />
            </div>
            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Phone 3
              </label>
              <input
                type="text"
                placeholder="+91 9595333976"
                value={contact.phone3}
                onChange={e => handleChange('phone3', e.target.value)}
                className="w-full px-3 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small"
              />
            </div>
          </div>
        </div>

        {/* Card 2: Social Media Handles */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a0a0a] border border-[#222]  space-y-4 text-cms-small">
          <h3 className="text-cms-body font-bold text-white mb-2 flex items-center gap-2">
            <Globe className="w-4 h-4 text-neutral-300" />
            <span>Social Media Channels</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                placeholder="https://instagram.com/latatea"
                value={contact.socials.instagram || ''}
                onChange={e => handleSocialChange('instagram', e.target.value)}
                className="w-full px-3.5 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                Facebook URL
              </label>
              <input
                type="text"
                placeholder="https://facebook.com/latatea"
                value={contact.socials.facebook || ''}
                onChange={e => handleSocialChange('facebook', e.target.value)}
                className="w-full px-3.5 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                LinkedIn Company Page
              </label>
              <input
                type="text"
                placeholder="https://linkedin.com/company/latatea"
                value={contact.socials.linkedin || ''}
                onChange={e => handleSocialChange('linkedin', e.target.value)}
                className="w-full px-3.5 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small"
              />
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-neutral-300 mb-1">
                YouTube Channel
              </label>
              <input
                type="text"
                placeholder="https://youtube.com/@latatea"
                value={contact.socials.youtube || ''}
                onChange={e => handleSocialChange('youtube', e.target.value)}
                className="w-full px-3.5 py-2 rounded-sm border border-[#222] bg-[#0a0a0a] text-white font-sans text-cms-small"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};



