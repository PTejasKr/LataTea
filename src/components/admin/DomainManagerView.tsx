import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { DomainItem, DomainStatus, DomainType, DNSRecord } from '../../types/cms';
import { domainService, SUPPORTED_PROVIDERS } from '../../services/domainService';
import { 
  Globe, 
  Plus, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Copy, 
  Check, 
  ExternalLink, 
  Trash2, 
  Star, 
  RefreshCw, 
  ArrowRight,
  Server,
  Layers,
  HelpCircle,
  X,
  Lock
} from 'lucide-react';

export const DomainManagerView: React.FC = () => {
  const { draftState, updateDraft } = useCMS();
  const domains = draftState.domains || [];

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [inspectDomain, setInspectDomain] = useState<DomainItem | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<string | null>(null);
  const [activeGuideTab, setActiveGuideTab] = useState<'godaddy' | 'hostinger' | 'cloudflare' | 'custom'>('godaddy');

  // Form State
  const [newHostname, setNewHostname] = useState('');
  const [newType, setNewType] = useState<DomainType>('secondary');
  const [newRegistrar, setNewRegistrar] = useState('GoDaddy');
  const [newHosting, setNewHosting] = useState('Hostinger');
  const [formError, setFormError] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validation = domainService.isValidHostname(newHostname);
    if (!validation.valid) {
      setFormError(validation.error || 'Invalid domain format.');
      return;
    }

    const cleanHost = newHostname.trim().toLowerCase();
    if (domains.some(d => d.hostname.toLowerCase() === cleanHost)) {
      setFormError('This domain is already added to the list.');
      return;
    }

    const newDomain = domainService.createDomain(cleanHost, newType, newRegistrar, newHosting);

    updateDraft(prev => {
      let updatedDomains = [...(prev.domains || [])];
      if (newType === 'primary') {
        updatedDomains = updatedDomains.map(d => ({
          ...d,
          isPrimary: false,
          type: (d.type === 'primary' ? 'secondary' : d.type) as DomainType
        }));
      }
      return {
        ...prev,
        domains: [...updatedDomains, newDomain],
        seo: {
          ...prev.seo,
          canonicalUrl: newType === 'primary' ? `https://${cleanHost}` : prev.seo.canonicalUrl
        }
      };
    });

    setNewHostname('');
    setIsAddModalOpen(false);
    setInspectDomain(newDomain);
  };

  const handleSetPrimary = (id: string) => {
    updateDraft(prev => {
      const target = prev.domains.find(d => d.id === id);
      if (!target) return prev;

      const updated = prev.domains.map(d => ({
        ...d,
        isPrimary: d.id === id,
        type: d.id === id ? ('primary' as DomainType) : d.type === 'primary' ? ('secondary' as DomainType) : d.type
      }));

      return {
        ...prev,
        domains: updated,
        seo: {
          ...prev.seo,
          canonicalUrl: `https://${target.hostname}`
        }
      };
    });
  };

  const handleDeleteDomain = (id: string, hostname: string) => {
    if (domains.length <= 1) {
      alert('You must have at least one domain configured for the website.');
      return;
    }
    if (window.confirm(`Are you sure you want to remove ${hostname}? Routing and DNS configuration for this domain will be removed.`)) {
      updateDraft(prev => {
        const remaining = prev.domains.filter(d => d.id !== id);
        // If we deleted the primary, assign the first remaining as primary
        if (!remaining.some(d => d.isPrimary) && remaining.length > 0) {
          remaining[0].isPrimary = true;
          remaining[0].type = 'primary';
        }
        return {
          ...prev,
          domains: remaining
        };
      });
      if (inspectDomain?.id === id) {
        setInspectDomain(null);
      }
    }
  };

  const handleVerify = async (domain: DomainItem) => {
    setIsVerifying(domain.id);
    try {
      const result = await domainService.verifyDomain(domain);
      updateDraft(prev => ({
        ...prev,
        domains: prev.domains.map(d => 
          d.id === domain.id 
            ? { 
                ...d, 
                status: result.status, 
                sslStatus: result.sslStatus, 
                dnsRecords: result.records,
                lastVerifiedAt: new Date().toISOString()
              } 
            : d
        )
      }));
      if (inspectDomain && inspectDomain.id === domain.id) {
        setInspectDomain(prev => prev ? { ...prev, status: result.status, sslStatus: result.sslStatus } : null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsVerifying(null);
    }
  };

  const primaryDomain = domains.find(d => d.isPrimary) || domains[0];

  const getStatusBadge = (status: DomainStatus) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-cms-small font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ACTIVE
          </span>
        );
      case 'DNS_CONFIGURATION_REQUIRED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-cms-small font-bold bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            DNS SETUP NEEDED
          </span>
        );
      case 'VERIFYING':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-cms-small font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            VERIFYING
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-cms-small font-bold bg-slate-700 text-slate-300">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-slate-100">
      
      {/* Top Banner & Overview */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#1E293B] via-[#0F172A] to-[#1E3F20]/30 border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-cms-btn uppercase tracking-wider mb-3">
              <Globe className="w-3.5 h-3.5" />
              <span>Multi-Provider Domain & Host Engine</span>
            </div>
            <h2 className="text-cms-section font-black text-white font-rajwada">
              Domain Management & /cms Access
            </h2>
            <p className="mt-1 text-cms-body text-slate-300 max-w-2xl font-sans font-light">
              Connect custom domains from <span className="font-semibold text-amber-300">GoDaddy</span>, <span className="font-semibold text-emerald-300">Hostinger</span>, Cloudflare, or any registrar. The website and <code className="px-1.5 py-0.5 rounded bg-black/40 text-amber-300 font-mono text-cms-small">/cms</code> portal dynamically route to any configured domain.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="shrink-0 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-cms-small uppercase tracking-wider flex items-center gap-2 shadow-xl hover:scale-102 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Domain</span>
          </button>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-slate-700/60">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-cms-btn text-slate-400">Primary Canonical Domain</div>
            <div className="text-base font-bold text-white mt-1 flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{primaryDomain ? primaryDomain.hostname : 'latatea.com'}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-cms-btn text-slate-400">CMS Gateway Route</div>
            <div className="text-base font-mono font-bold text-emerald-400 mt-1 flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>https://{primaryDomain ? primaryDomain.hostname : 'latatea.com'}/cms</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="text-cms-btn text-slate-400">Architecture Compatibility</div>
            <div className="text-cms-btn text-slate-200 mt-1">
              GoDaddy Registrar ➔ Hostinger Hosting (Ready)
            </div>
          </div>
        </div>
      </div>

      {/* Domain List Table */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-cms-body font-bold text-slate-200 uppercase tracking-wider">
            Configured Domains ({domains.length})
          </h3>
          <span className="text-cms-small text-slate-400 font-light">
            Click &apos;DNS Setup&apos; to view DNS records or point new domains
          </span>
        </div>

        <div className="divide-y divide-slate-800/80">
          {domains.map((dom) => (
            <div 
              key={dom.id}
              className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:bg-slate-800/40 transition-colors"
            >
              {/* Domain Main Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-cms-card text-white font-mono">{dom.hostname}</span>
                  
                  {dom.isPrimary ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-cms-small font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                      <Star className="w-3 h-3 fill-amber-300" /> PRIMARY
                    </span>
                  ) : dom.type === 'redirect' ? (
                    <span className="px-2.5 py-0.5 rounded-full text-cms-small font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
                      REDIRECT ➔ {primaryDomain?.hostname}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-cms-small font-bold bg-slate-700 text-slate-300">
                      SECONDARY
                    </span>
                  )}

                  {getStatusBadge(dom.status)}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-cms-small text-slate-400 font-sans">
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                    SSL: <strong className="text-slate-200">{dom.sslStatus}</strong>
                  </span>
                  <span>•</span>
                  <span>Registrar: <strong className="text-slate-200">{dom.registrar || 'GoDaddy'}</strong></span>
                  <span>•</span>
                  <span>Target Host: <strong className="text-slate-200">{dom.hostingProvider || 'Hostinger'}</strong></span>
                  {dom.lastVerifiedAt && (
                    <>
                      <span>•</span>
                      <span>Verified: {new Date(dom.lastVerifiedAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>

              {/* Actions Button Group */}
              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => setInspectDomain(dom)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 text-cms-small font-bold transition-all flex items-center gap-1.5"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>DNS Setup</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVerify(dom)}
                  disabled={isVerifying === dom.id}
                  className="px-4 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/80 text-emerald-300 border border-emerald-500/30 text-cms-small font-bold transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isVerifying === dom.id ? 'animate-spin' : ''}`} />
                  <span>{isVerifying === dom.id ? 'Checking...' : 'Verify DNS'}</span>
                </button>

                {!dom.isPrimary && (
                  <button
                    type="button"
                    onClick={() => handleSetPrimary(dom.id)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-cms-btn transition-all hover:text-white"
                  >
                    Make Primary
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDeleteDomain(dom.id, dom.hostname)}
                  className="p-2 rounded-xl hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                  title="Remove domain"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DNS Setup & Verification Inspector Modal */}
      {inspectDomain && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 relative my-8">
            
            <button
              type="button"
              onClick={() => setInspectDomain(null)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-cms-btn uppercase mb-2">
                <Globe className="w-3.5 h-3.5" />
                DNS Instructions & Propagation
              </div>
              <h3 className="text-cms-page text-white font-mono">
                {inspectDomain.hostname}
              </h3>
              <p className="text-cms-small text-slate-300 mt-1">
                Add these DNS records in your domain registrar (e.g. GoDaddy or Hostinger) to connect your custom domain to the website.
              </p>
            </div>

            {/* DNS Records Table */}
            <div className="space-y-3">
              <div className="text-cms-small font-bold text-slate-400 uppercase tracking-wider">
                Required DNS Records:
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-cms-small">
                  <thead className="bg-slate-900 text-slate-400 uppercase text-cms-small tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="p-3">Type</th>
                      <th className="p-3">Name / Host</th>
                      <th className="p-3">Points To / Value</th>
                      <th className="p-3">TTL</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80 font-mono">
                    {inspectDomain.dnsRecords.map((rec, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="p-3 font-bold text-amber-400">{rec.type}</td>
                        <td className="p-3 text-white">{rec.name}</td>
                        <td className="p-3 text-slate-300 break-all">{rec.value}</td>
                        <td className="p-3 text-slate-400">{rec.ttl || '3600'}</td>
                        <td className="p-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleCopy(rec.value, `dns_${idx}`)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-cms-small font-sans font-bold flex items-center gap-1 ml-auto"
                          >
                            {copiedKey === `dns_${idx}` ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy Value</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Registrar Setup Guides Tabs */}
            <div className="space-y-3 pt-2">
              <div className="text-cms-small font-bold text-slate-400 uppercase tracking-wider">
                Step-by-Step Setup Guide:
              </div>

              <div className="flex gap-2 border-b border-slate-800 pb-2">
                {(['godaddy', 'hostinger', 'cloudflare', 'custom'] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveGuideTab(tab)}
                    className={`px-3.5 py-1.5 rounded-xl text-cms-small font-bold capitalize transition-all ${
                      activeGuideTab === tab 
                        ? 'bg-amber-500 text-slate-950 shadow-md' 
                        : 'bg-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {SUPPORTED_PROVIDERS[tab].name}
                  </button>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <ol className="list-decimal list-inside space-y-1.5 text-cms-small text-slate-300 font-sans">
                  {SUPPORTED_PROVIDERS[activeGuideTab].recommendedInstructions.map((inst, i) => (
                    <li key={i} className="leading-relaxed">{inst}</li>
                  ))}
                </ol>

                <div className="pt-2 text-cms-small text-amber-300/80 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>
                    Need help? Visit the official{' '}
                    <a 
                      href={SUPPORTED_PROVIDERS[activeGuideTab].docsUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="underline font-bold text-amber-300 hover:text-white"
                    >
                      {SUPPORTED_PROVIDERS[activeGuideTab].name} DNS Documentation
                    </a>
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => setInspectDomain(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cms-small font-bold text-slate-300"
              >
                Close
              </button>

              <button
                type="button"
                onClick={() => handleVerify(inspectDomain)}
                disabled={isVerifying === inspectDomain.id}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-cms-btn uppercase tracking-wider flex items-center gap-2 shadow-lg cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isVerifying === inspectDomain.id ? 'animate-spin' : ''}`} />
                <span>{isVerifying === inspectDomain.id ? 'Verifying...' : 'Verify Connection Now'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Add Domain Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 relative">
            
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-cms-btn uppercase mb-2">
                <Plus className="w-3.5 h-3.5" />
                Connect New Domain
              </div>
              <h3 className="text-cms-page text-white font-rajwada">
                Add Custom Domain
              </h3>
              <p className="text-cms-small text-slate-300 mt-1">
                Enter your domain to generate DNS settings and enable dynamic <code className="text-amber-300 font-mono">/cms</code> routing.
              </p>
            </div>

            {formError && (
              <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-cms-small flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleAddDomain} className="space-y-4">
              <div>
                <label className="block text-cms-small font-bold text-slate-300 uppercase mb-1.5">
                  Domain Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. latatea.com or brand.latatea.com"
                  value={newHostname}
                  onChange={e => setNewHostname(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white font-mono text-cms-body focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cms-small font-bold text-slate-300 uppercase mb-1.5">
                    Domain Type
                  </label>
                  <select
                    value={newType}
                    onChange={e => setNewType(e.target.value as DomainType)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-cms-small focus:border-amber-400 focus:outline-none"
                  >
                    <option value="primary">Primary (Main Website & Canonical)</option>
                    <option value="secondary">Secondary (Direct Alias)</option>
                    <option value="redirect">Redirect to Primary</option>
                  </select>
                </div>

                <div>
                  <label className="block text-cms-small font-bold text-slate-300 uppercase mb-1.5">
                    Registrar
                  </label>
                  <select
                    value={newRegistrar}
                    onChange={e => setNewRegistrar(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-cms-small focus:border-amber-400 focus:outline-none"
                  >
                    <option value="GoDaddy">GoDaddy</option>
                    <option value="Hostinger">Hostinger</option>
                    <option value="Namecheap">Namecheap</option>
                    <option value="Cloudflare">Cloudflare</option>
                    <option value="Other">Other Registrar</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-cms-small font-bold text-slate-300 uppercase mb-1.5">
                  Hosting Target
                </label>
                <select
                  value={newHosting}
                  onChange={e => setNewHosting(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white text-cms-small focus:border-amber-400 focus:outline-none"
                >
                  <option value="Hostinger">Hostinger Cloud / Web Hosting</option>
                  <option value="Cloudflare">Cloudflare Pages / CDN</option>
                  <option value="GitHub Pages">GitHub Pages / Static</option>
                  <option value="Vercel">Vercel Edge</option>
                  <option value="Custom">Custom VPS / Server</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cms-small font-bold text-slate-300"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-cms-small uppercase tracking-wider shadow-lg transition-all cursor-pointer"
                >
                  Save & Get DNS Records
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};





