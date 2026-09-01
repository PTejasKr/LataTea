import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { cmsStore } from '../../services/cmsStore';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ShoppingBag, 
  Image as ImageIcon, 
  Sparkles, 
  ArrowRight, 
  UploadCloud, 
  Eye, 
  Clock, 
  Activity,
  Crosshair,
  Type
} from 'lucide-react';
import { AdminTab } from './AdminLayout';

interface DashboardViewProps {
  onSelectTab: (tab: AdminTab) => void;
  onOpenPublishModal: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onSelectTab, onOpenPublishModal }) => {
  const { draftState, hasDraftChanges, setShowPreviewModal } = useCMS();
  
  const completeness = cmsStore.calculateCompleteness(draftState);
  const issues = cmsStore.validateState(draftState);
  const errors = issues.filter(i => i.type === 'error');
  const warnings = issues.filter(i => i.type === 'warning');

  const activeProducts = draftState.products.filter(p => p.isVisible).length;
  const totalSlots = Object.keys(draftState.mediaSlots).length;
  const activeMedia = draftState.mediaLibrary.length;

  const lastPublishedFormatted = draftState.lastPublishedAt 
    ? new Date(draftState.lastPublishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
    : 'Not published yet';

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      {/* Top Banner Card (PDF Spec 14) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-amber-400" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-amber-400 uppercase mb-2">
              <Activity className="w-4 h-4" />
              <span>LATATEA WEBSITE STATUS</span>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Public Website
              </h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                hasDraftChanges 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                <span className={`w-2 h-2 rounded-full ${hasDraftChanges ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                {hasDraftChanges ? 'Draft Modifications Pending' : 'Live & Published'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-xl">
              All website text, navigation links, products, media slots, and brand settings are managed independently through this administrative interface.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setShowPreviewModal(true)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold uppercase tracking-wider border border-slate-600 transition-all flex items-center gap-2 shadow-md"
            >
              <Eye className="w-4 h-4 text-sky-400" />
              <span>Preview Website</span>
            </button>

            <button
              onClick={onOpenPublishModal}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <UploadCloud className="w-4 h-4" />
              <span>Publish Changes</span>
            </button>
          </div>
        </div>

        {/* Progress Gauges Grid (PDF Spec 14) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/60">
          
          {/* Content Completeness */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Content Completeness</span>
              <span className="text-xs font-bold text-amber-400">{completeness.contentScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-amber-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${completeness.contentScore}%` }} 
              />
            </div>
          </div>

          {/* Media Slots Completeness */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-400">Media Completeness</span>
              <span className="text-xs font-bold text-lataleaf-400">{completeness.mediaScore}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-lataleaf-500 to-lataleaf-400 h-full rounded-full transition-all duration-500" 
                style={{ width: `${completeness.mediaScore}%` }} 
              />
            </div>
          </div>

          {/* Active Products Count */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400">Active Products</div>
              <div className="text-xl font-bold text-white mt-0.5">{activeProducts} Catalog Items</div>
            </div>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>

          {/* Last Published Timestamp */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-400">Last Published</div>
              <div className="text-xs font-bold text-slate-200 mt-1 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{lastPublishedFormatted}</span>
              </div>
            </div>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

        </div>
      </div>

      {/* Quick Access Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Image Position Editor */}
        <div 
          onClick={() => onSelectTab('image-position')}
          className="p-6 rounded-3xl bg-[#1E293B] border border-slate-700/80 hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
            <Crosshair className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition-colors flex items-center justify-between">
            <span>Image Position Editor</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Click-to-set focal coordinates (X, Y), object-fit, and multi-device viewport crop simulators for all {totalSlots} named media slots.
          </p>
        </div>

        {/* Card 2: Website Text */}
        <div 
          onClick={() => onSelectTab('text')}
          className="p-6 rounded-3xl bg-[#1E293B] border border-slate-700/80 hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-slate-950 transition-all">
            <Type className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white group-hover:text-sky-400 transition-colors flex items-center justify-between">
            <span>Website Text & Copy</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Manage headlines, subheadlines, quality pillars, 6-step brewing recipe, and 7-step ordering roadmap.
          </p>
        </div>

        {/* Card 3: Products & Pricing */}
        <div 
          onClick={() => onSelectTab('products')}
          className="p-6 rounded-3xl bg-[#1E293B] border border-slate-700/80 hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors flex items-center justify-between">
            <span>Products & Pricing</span>
            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </h3>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            Configure pack sizes (16g, 160g, 1kg), brochure rates (₹3.5 - ₹180), descriptions, and visibility.
          </p>
        </div>

      </div>

      {/* Pre-Publish Checklist & System Health */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#1E293B] border border-slate-700/80 shadow-lg">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/60">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>System Verification & Validation Rules</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Automated safety checks prior to live site publication.
            </p>
          </div>
          <div className="text-xs font-semibold text-slate-400">
            {errors.length === 0 ? (
              <span className="text-emerald-400">All Critical Checks Passing</span>
            ) : (
              <span className="text-rose-400">{errors.length} Critical Issue(s)</span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Hero & Navigation Integrity</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Hero headlines defined and {draftState.navigation.filter(n => n.isEnabled).length} active menu links configured.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Brochure Pricing Matrix</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {draftState.products.length} products mapped with valid tiered pricing (16g, 160g, 1kg).
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Named Media Slots</div>
              <div className="text-xs text-slate-400 mt-0.5">
                {totalSlots} media slots mapped with coordinates and object-fit rules.
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-3">
            <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Decoupled Architecture</div>
              <div className="text-xs text-slate-400 mt-0.5">
                Public website strictly consumes published snapshot; zero unverified drafts exposed.
              </div>
            </div>
          </div>
        </div>

        {/* Warning messages list if any */}
        {warnings.length > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Recommended Optimization Notices ({warnings.length})</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-300">
              {warnings.map(w => (
                <li key={w.id} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span><strong>{w.category}:</strong> {w.message}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
