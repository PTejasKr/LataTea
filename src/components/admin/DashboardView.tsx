import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { cmsStore } from '../../services/cmsStore';
import { 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Coffee, 
  Image as ImageIcon, 
  Sparkles, 
  ArrowRight, 
  UploadCloud, 
  Eye, 
  Clock, 
  Activity,
  Sliders,
  Globe,
  Network
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

  const teaStoriesCount = (draftState.teaStories || []).length;
  const activeMedia = (draftState.mediaLibrary || []).length;
  const primaryDomain = (draftState.domains || []).find(d => d.isPrimary) || draftState.domains[0];

  const lastPublishedFormatted = draftState.lastPublishedAt 
    ? new Date(draftState.lastPublishedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric' })
    : 'Not published yet';

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Banner Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-slate-700/80 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64 text-amber-400" />
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-amber-400 uppercase mb-2">
              <Activity className="w-4 h-4" />
              <span>EDITORIAL STORYTELLING PLATFORM</span>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                Lata Tea Sovereign Platform
              </h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                hasDraftChanges 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              }`}>
                <span className={`w-2 h-2 rounded-full ${hasDraftChanges ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                {hasDraftChanges ? 'Draft Edits Pending' : 'Live & Published'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 mt-2 font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Last Published: {lastPublishedFormatted}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Active Domain: {primaryDomain?.hostname || 'latatea.com'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-amber-300" />
              <span>Live Preview</span>
            </button>

            <button
              type="button"
              onClick={onOpenPublishModal}
              disabled={!hasDraftChanges}
              className={`px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
                hasDraftChanges
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20 scale-102'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>{hasDraftChanges ? 'Publish Changes' : 'Published'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Metric 1: Story Completeness */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Editorial Completeness</span>
            <BookOpen className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-serif">
            {completeness.overall}%
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full" style={{ width: `${completeness.overall}%` }} />
          </div>
          <span className="text-[11px] text-slate-500 block font-medium">
            Story, Heritage & Craft stages verified
          </span>
        </div>

        {/* Metric 2: Marathi Translation Coverage */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">मराठी Localization</span>
            <Globe className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-serif">
            {completeness.languageScore}%
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${completeness.languageScore}%` }} />
          </div>
          <span className="text-[11px] text-slate-500 block font-medium">
            Devanagari typography synchronized
          </span>
        </div>

        {/* Metric 3: Tea Stories */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Tea Blend Stories</span>
            <Coffee className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-serif">
            {teaStoriesCount}
          </div>
          <div className="text-xs text-slate-500 font-medium">
            Pure editorial storytelling (no cart)
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('tea-stories')}
            className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Manage stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Metric 4: Domain & Infrastructure */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase tracking-wider">Domain Network</span>
            <Network className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-lg font-bold text-slate-900 truncate font-mono">
            {primaryDomain?.hostname || 'latatea.com'}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>DNS & SSL Active</span>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('domains')}
            className="text-xs text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Domain Manager</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Quick Access Editorial Cards */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <h3 className="text-lg font-bold text-slate-900 font-serif">
          Quick Story Editing Modules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => onSelectTab('story')}
            className="p-5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/40 text-left transition-all group cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 font-serif">Story & Heritage</h4>
            <p className="text-xs text-slate-500 mt-1">Origins, founding convictions, and milestone timeline.</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('craft')}
            className="p-5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/40 text-left transition-all group cursor-pointer"
          >
            <Sliders className="w-5 h-5 text-lataleaf-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 font-serif">The Craft (5 Stages)</h4>
            <p className="text-xs text-slate-500 mt-1">Source, Select, Blend, Prepare, Experience stages.</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('tea-stories')}
            className="p-5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/40 text-left transition-all group cursor-pointer"
          >
            <Coffee className="w-5 h-5 text-amber-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 font-serif">Tea Stories</h4>
            <p className="text-xs text-slate-500 mt-1">Tasting notes, origins, and non-commerce stories.</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('languages')}
            className="p-5 rounded-xl border border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/40 text-left transition-all group cursor-pointer"
          >
            <Globe className="w-5 h-5 text-emerald-600 mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-sm text-slate-900 font-serif">Languages (EN & MR)</h4>
            <p className="text-xs text-slate-500 mt-1">Audit and update English and Marathi texts.</p>
          </button>
        </div>
      </div>
    </div>
  );
};
