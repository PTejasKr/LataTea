import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { cmsStore } from '../../services/cmsStore';
import { 
  CheckCircle2, 
  AlertTriangle, 
  BookOpen, 
  Coffee, 
  Image as ImageIcon, 
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
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E293B] to-[#0F172A] border border-[#222] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-cms-small font-bold tracking-widest text-white uppercase mb-2">
              <Activity className="w-4 h-4" />
              <span>EDITORIAL STORYTELLING PLATFORM</span>
            </div>

            <div className="flex items-center gap-3">
              <h2 className="text-cms-section font-bold font-serif text-white">
                Lata Teamix Sovereign Platform
              </h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-cms-btn uppercase tracking-wider ${
                hasDraftChanges 
                  ? 'bg-white text-black/20 text-white border border-[#333]'
                  : 'bg-white text-black/20 text-white border border-[#333]'
              }`}>
                <span className={`w-2 h-2 rounded-sm ${hasDraftChanges ? 'bg-white text-black' : 'bg-[#111111]'}`} />
                {hasDraftChanges ? 'Draft Edits Pending' : 'Live & Published'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-cms-small text-neutral-400 mt-2 font-mono">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Last Published: {lastPublishedFormatted}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-neutral-300" />
                <span>Active Domain: {primaryDomain?.hostname || 'latatea.com'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="px-5 py-3 rounded-sm bg-white/10 hover:bg-white/15 text-white text-cms-btn uppercase tracking-wider flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
            >
              <Eye className="w-4 h-4 text-white" />
              <span>Live Preview</span>
            </button>

            <button
              type="button"
              onClick={onOpenPublishModal}
              disabled={!hasDraftChanges}
              className={`px-6 py-3 rounded-sm text-cms-btn uppercase tracking-wider flex items-center gap-2  transition-all cursor-pointer ${
                hasDraftChanges
                  ? 'bg-white text-black hover:bg-neutral-200  scale-102'
                  : 'bg-[#222222] text-neutral-400 cursor-not-allowed'
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
        <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-cms-btn uppercase tracking-wider font-bold">Editorial Completeness</span>
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-black text-white font-serif">
            {completeness.overall}%
          </div>
          <div className="w-full bg-[#222] h-2 rounded-sm overflow-hidden">
            <div className="bg-white h-full rounded-sm" style={{ width: `${completeness.overall}%` }} />
          </div>
          <span className="text-cms-small text-neutral-400 block font-medium">
            Story, Heritage & Craft stages verified
          </span>
        </div>

        {/* Metric 2: Marathi Translation Coverage */}
        <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-cms-btn uppercase tracking-wider font-bold">मराठी Localization</span>
            <Globe className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-black text-white font-serif">
            {completeness.languageScore}%
          </div>
          <div className="w-full bg-[#222] h-2 rounded-sm overflow-hidden">
            <div className="bg-white h-full rounded-sm" style={{ width: `${completeness.languageScore}%` }} />
          </div>
          <span className="text-cms-small text-neutral-400 block font-medium">
            Devanagari typography synchronized
          </span>
        </div>

        {/* Metric 3: Tea Stories */}
        <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-cms-btn uppercase tracking-wider font-bold">Tea Blend Stories</span>
            <Coffee className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-black text-white font-serif">
            {teaStoriesCount}
          </div>
          <div className="text-cms-small text-neutral-400 font-medium">
            Pure editorial storytelling (no cart)
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('tea-stories')}
            className="text-cms-small text-white hover:text-neutral-300 font-bold flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Manage stories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Metric 4: Domain & Infrastructure */}
        <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-3">
          <div className="flex items-center justify-between text-neutral-400">
            <span className="text-cms-btn uppercase tracking-wider font-bold">Domain Network</span>
            <Network className="w-4 h-4 text-white" />
          </div>
          <div className="text-cms-card text-white truncate font-mono">
            {primaryDomain?.hostname || 'latatea.com'}
          </div>
          <div className="flex items-center gap-1.5 text-cms-small text-white font-semibold">
            <CheckCircle2 className="w-4 h-4 text-white" />
            <span>DNS & SSL Active</span>
          </div>
          <button
            type="button"
            onClick={() => onSelectTab('domains')}
            className="text-cms-small text-white hover:text-neutral-300 font-bold flex items-center gap-1 cursor-pointer pt-1"
          >
            <span>Domain Manager</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Quick Access Editorial Cards */}
      <div className="bg-[#111111] rounded-sm p-6 sm:p-8 border border-[#222] space-y-6">
        <h3 className="text-cms-card text-white font-serif">
          Quick Story Editing Modules
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => onSelectTab('story')}
            className="p-5 rounded-sm border border-[#222] hover:border-[#444] bg-[#0a0a0a] hover:bg-[#161616] text-left transition-all group cursor-pointer"
          >
            <BookOpen className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-cms-body text-white font-serif">Story & Heritage</h4>
            <p className="text-cms-small text-neutral-400 mt-1">Origins, founding convictions, and milestone timeline.</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('craft')}
            className="p-5 rounded-sm border border-[#222] hover:border-[#444] bg-[#0a0a0a] hover:bg-[#161616] text-left transition-all group cursor-pointer"
          >
            <Sliders className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-cms-body text-white font-serif">The Craft (5 Stages)</h4>
            <p className="text-cms-small text-neutral-400 mt-1">Source, Select, Blend, Prepare, Experience stages.</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('tea-stories')}
            className="p-5 rounded-sm border border-[#222] hover:border-[#444] bg-[#0a0a0a] hover:bg-[#161616] text-left transition-all group cursor-pointer"
          >
            <Coffee className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-cms-body text-white font-serif">Tea Stories</h4>
            <p className="text-cms-small text-neutral-400 mt-1">Tasting notes, origins, and non-commerce stories.</p>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('languages')}
            className="p-5 rounded-sm border border-[#222] hover:border-[#444] bg-[#0a0a0a] hover:bg-[#161616] text-left transition-all group cursor-pointer"
          >
            <Globe className="w-5 h-5 text-white mb-2 group-hover:scale-110 transition-transform" />
            <h4 className="font-bold text-cms-body text-white font-serif">Languages (EN & MR)</h4>
            <p className="text-cms-small text-neutral-400 mt-1">Audit and update English and Marathi texts.</p>
          </button>
        </div>
      </div>
    </div>
  );
};




