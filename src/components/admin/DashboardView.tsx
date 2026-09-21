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
  Network,
  FolderTree
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
                Lata Private Limited Sovereign Platform
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

      {/* Categorized Management Hubs */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#222]">
          <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            Categorized Editorial Suite
          </h3>
          <span className="text-xs text-neutral-500 font-mono">5 Core Domains</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Category 1: Editorial & Stories */}
          <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-4 hover:border-[#333] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-base">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Editorial & Stories</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#161616] text-emerald-400 border border-emerald-950">
                Core Narrative
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Founding history, 5-stage craftsmanship narrative, brewing processes, and tea tasting profiles.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => onSelectTab('story')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Heritage & Origins</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('craft')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>The Craft (5 Stages)</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('process-steps')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Brewing Page</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('tea-stories')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Tea Blends ({teaStoriesCount})</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          {/* Category 2: Catalogue & Taxonomy */}
          <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-4 hover:border-[#333] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-base">
                <FolderTree className="w-4 h-4 text-amber-400" />
                <span>Catalogue & Taxonomy</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#161616] text-amber-400 border border-amber-950">
                Structure
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Manage product categories, Marathi translations, ordering, and public display filters.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => onSelectTab('categories')}
                className="w-full px-3 py-2.5 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Product Categories Manager</span>
                <ArrowRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          {/* Category 3: Media & Assets */}
          <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-4 hover:border-[#333] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-base">
                <ImageIcon className="w-4 h-4 text-sky-400" />
                <span>Media & Assets</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#161616] text-sky-400 border border-sky-950">
                Visuals
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Asset uploads, banner graphics, SVG vectors, and responsive device crop focal points.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => onSelectTab('media-library')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Media Library</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('image-position')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Focal Points</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
              </button>
            </div>
          </div>

          {/* Category 4: Site Structure & Design */}
          <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-4 hover:border-[#333] transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-base">
                <Sliders className="w-4 h-4 text-purple-400" />
                <span>Site Structure & Design</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#161616] text-purple-400 border border-purple-950">
                Layout
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Header/footer navigation hierarchy, homepage section visibility, and brochure color themes.
            </p>
            <div className="grid grid-cols-3 gap-2 pt-2">
              <button
                type="button"
                onClick={() => onSelectTab('navigation')}
                className="px-2.5 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Navigation</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('sections')}
                className="px-2.5 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Sections</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('brand')}
                className="px-2.5 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Brand Style</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Category 5: System & Localization */}
          <div className="bg-[#111111] rounded-sm p-6 border border-[#222] space-y-4 hover:border-[#333] transition-colors md:col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-serif font-bold text-base">
                <Globe className="w-4 h-4 text-neutral-300" />
                <span>System, Localization & Infrastructure</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-sm bg-[#161616] text-neutral-300 border border-[#333]">
                Settings & Legal
              </span>
            </div>
            <p className="text-xs text-neutral-400">
              Bilingual English/Marathi verification, Google SEO meta tags, corporate contacts, and domain DNS.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
              <button
                type="button"
                onClick={() => onSelectTab('languages')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Languages (EN/MR)</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('seo')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>SEO & Meta</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('contact')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Contact & Legal</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTab('domains')}
                className="px-3 py-2 rounded-sm bg-[#0a0a0a] hover:bg-[#161616] border border-[#222] hover:border-[#333] text-left text-xs text-white transition-all group cursor-pointer flex items-center justify-between"
              >
                <span>Domains ({draftState.domains?.length || 1})</span>
                <ArrowRight className="w-3 h-3 text-neutral-500 group-hover:text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};




