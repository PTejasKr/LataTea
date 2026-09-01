import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  ShieldCheck, 
  FileText, 
  CreditCard,
  CheckCircle2
} from 'lucide-react';

interface RegistrationAndContactProps {
  isDraftPreview?: boolean;
}

export const RegistrationAndContact: React.FC<RegistrationAndContactProps> = ({ isDraftPreview = false }) => {
  const { publishedState, draftState } = useCMS();
  const state = isDraftPreview ? draftState : publishedState;
  const contact = state.contact;

  const hasAnyContact = Boolean(
    contact.companyName ||
    contact.address ||
    contact.email ||
    contact.phone1 ||
    contact.phone2 ||
    contact.phone3 ||
    contact.whatsapp ||
    contact.website ||
    contact.registration.fssai ||
    contact.registration.iec ||
    contact.registration.gst ||
    contact.payment.accountName ||
    contact.payment.bankName
  );

  if (!hasAnyContact) {
    return null;
  }

  return (
    <section id="contact" className="py-24 bg-[#FAF6EE] relative border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-lataamber-600 mb-2 block font-sans">
            STATUTORY & CORPORATE DETAILS
          </span>
          <h2 className="font-rajwada text-3xl sm:text-4xl md:text-5xl font-black text-[#1E3F20] tracking-tight">
            Official Registration & Contact
          </h2>
          <div className="flex items-center justify-center gap-2 my-4">
            <div className="h-0.5 w-12 bg-lataamber-500" />
            <div className="w-2 h-2 rounded-full bg-lataamber-500" />
            <div className="h-0.5 w-12 bg-lataamber-500" />
          </div>
          <p className="text-base sm:text-lg text-slate-700 font-sans">
            Verified corporate credentials, food safety registration, and official communication channels.
          </p>
        </div>

        {/* 3 Main Informational Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Corporate HQ & Contact Channels */}
          {(contact.companyName || contact.address || contact.email || contact.phone1) && (
            <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-md space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-latagreen-50 flex items-center justify-center text-[#1E3F20] border border-latagreen-200">
                  <Building2 className="w-6 h-6 text-[#1E3F20]" />
                </div>
                
                <h3 className="font-rajwada font-bold text-2xl text-[#1E3F20]">
                  Corporate Office
                </h3>

                {contact.companyName && (
                  <div className="font-sans font-bold text-sm text-slate-800">
                    {contact.companyName}
                  </div>
                )}

                {contact.address && (
                  <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-sans">
                    <MapPin className="w-4 h-4 text-lataamber-600 shrink-0 mt-0.5" />
                    <span>{contact.address}</span>
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-center gap-3 text-xs sm:text-sm font-sans">
                    <Mail className="w-4 h-4 text-lataamber-600 shrink-0" />
                    <a href={`mailto:${contact.email}`} className="text-slate-800 hover:text-lataamber-600 font-semibold break-all">
                      {contact.email}
                    </a>
                  </div>
                )}

                {(contact.phone1 || contact.phone2 || contact.phone3) && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs sm:text-sm font-sans">
                    <div className="text-[11px] uppercase font-bold text-slate-400">Direct Inquiries:</div>
                    {contact.phone1 && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-lataleaf-600 shrink-0" />
                        <a href={`tel:${contact.phone1}`} className="text-slate-800 hover:text-lataamber-600 font-medium">{contact.phone1}</a>
                      </div>
                    )}
                    {contact.phone2 && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-lataleaf-600 shrink-0" />
                        <a href={`tel:${contact.phone2}`} className="text-slate-800 hover:text-lataamber-600 font-medium">{contact.phone2}</a>
                      </div>
                    )}
                    {contact.phone3 && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-lataleaf-600 shrink-0" />
                        <a href={`tel:${contact.phone3}`} className="text-slate-800 hover:text-lataamber-600 font-medium">{contact.phone3}</a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {contact.website && (
                <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-lataamber-700 font-sans">
                  <Globe className="w-4 h-4" />
                  <a href={contact.website} target="_blank" rel="noreferrer" className="hover:underline">
                    {contact.website}
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Card 2: Legal & Statutory Registrations */}
          {(contact.registration.fssai || contact.registration.iec || contact.registration.gst) && (
            <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-md space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-lataamber-50 flex items-center justify-center text-lataamber-600 border border-lataamber-200">
                  <ShieldCheck className="w-6 h-6 text-lataamber-600" />
                </div>
                
                <h3 className="font-rajwada font-bold text-2xl text-[#1E3F20]">
                  Certifications & Compliance
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Manufactured under strict ISO & FSSAI food hygiene parameters.
                </p>

                <div className="space-y-4 pt-2 font-sans">
                  {contact.registration.fssai && (
                    <div className="p-3.5 rounded-xl bg-latacream-100 border border-amber-200/60">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">FSSAI License No.</span>
                      <span className="font-mono font-bold text-sm text-[#1E3F20] tracking-wider">{contact.registration.fssai}</span>
                    </div>
                  )}

                  {contact.registration.gst && (
                    <div className="p-3.5 rounded-xl bg-latacream-100 border border-amber-200/60">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">GST Identification No. (GSTIN)</span>
                      <span className="font-mono font-bold text-sm text-[#1E3F20] tracking-wider">{contact.registration.gst}</span>
                    </div>
                  )}

                  {contact.registration.iec && (
                    <div className="p-3.5 rounded-xl bg-latacream-100 border border-amber-200/60">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">Importer-Exporter Code (IEC)</span>
                      <span className="font-mono font-bold text-sm text-[#1E3F20] tracking-wider">{contact.registration.iec}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 font-sans">
                <CheckCircle2 className="w-4 h-4" />
                <span>Verified Government Registration</span>
              </div>
            </div>
          )}

          {/* Card 3: Banking & Commercial Settlement */}
          {(contact.payment.accountName || contact.payment.bankName) && (
            <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-md space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-lataleaf-50 flex items-center justify-center text-lataleaf-600 border border-lataleaf-200">
                  <CreditCard className="w-6 h-6 text-lataleaf-600" />
                </div>
                
                <h3 className="font-rajwada font-bold text-2xl text-[#1E3F20]">
                  Commercial Banking
                </h3>
                <p className="text-xs text-slate-500 font-sans">
                  Official account for RTGS / NEFT commercial wholesale transactions.
                </p>

                <div className="space-y-3 pt-2 text-xs font-sans">
                  {contact.payment.accountName && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Beneficiary Name</span>
                      <span className="font-semibold text-slate-800">{contact.payment.accountName}</span>
                    </div>
                  )}

                  {contact.payment.bankName && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Bank Name</span>
                      <span className="font-semibold text-slate-800">{contact.payment.bankName}</span>
                    </div>
                  )}

                  {contact.payment.accountNumber && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">Current Account Number</span>
                      <span className="font-mono font-bold text-slate-900">{contact.payment.accountNumber}</span>
                    </div>
                  )}

                  {contact.payment.ifscCode && (
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-bold">IFSC Code</span>
                      <span className="font-mono font-bold text-slate-900">{contact.payment.ifscCode}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-latacream-200 text-[11px] text-slate-600 font-sans">
                Please attach payment screenshot when submitting quotation confirmations.
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
