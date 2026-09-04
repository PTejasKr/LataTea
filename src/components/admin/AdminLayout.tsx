import React, { useState } from 'react';
import { BrandLogo } from '../common/BrandLogo';
import { useCMS } from '../../context/CMSContext';
import { 
  LayoutDashboard, 
  BookOpen, 
  Sliders, 
  Coffee, 
  Menu as MenuIcon, 
  Image as ImageIcon, 
  Crosshair, 
  Layers, 
  Phone, 
  Search, 
  Eye, 
  UploadCloud, 
  RotateCcw, 
  Globe, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  Network,
  FolderTree
} from 'lucide-react';

export type AdminTab = 
  | 'dashboard'
  | 'story'
  | 'craft'
  | 'tea-stories'
  | 'categories'
  | 'process-steps'
  | 'languages'
  | 'navigation'
  | 'domains'
  | 'media-library'
  | 'image-position'
  | 'sections'
  | 'contact'
  | 'seo';

interface AdminLayoutProps {
  activeTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onOpenPublishModal: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  activeTab,
  onSelectTab,
  onOpenPublishModal,
  children
}) => {
  const { 
    draftState, 
    hasDraftChanges, 
    exitCms, 
    setShowPreviewModal, 
    discardDraft,
    logoutCms
  } = useCMS();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navLinks: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'story', label: 'Story & Heritage', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
    { id: 'craft', label: 'The Craft / Process', icon: <Sliders className="w-4 h-4 text-lataleaf-400" /> },
    { id: 'tea-stories', label: 'Tea Stories', icon: <Coffee className="w-4 h-4 text-amber-400" />, badge: `${(draftState.teaStories || []).length}` },
    { id: 'categories', label: 'Product Categories', icon: <FolderTree className="w-4 h-4 text-emerald-400" /> },
    { id: 'process-steps', label: 'Process Page', icon: <Layers className="w-4 h-4 text-amber-400" /> },
    { id: 'languages', label: 'Languages (EN & MR)', icon: <Globe className="w-4 h-4 text-emerald-400" /> },
    { id: 'navigation', label: 'Navigation Manager', icon: <MenuIcon className="w-4 h-4" /> },
    { id: 'domains', label: 'Domain Management', icon: <Network className="w-4 h-4 text-sky-400" />, badge: `${(draftState.domains || []).length}` },
    { id: 'media-library', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'image-position', label: 'Image Focal Points', icon: <Crosshair className="w-4 h-4 text-amber-400" /> },
    { id: 'contact', label: 'Contact & Statutory', icon: <Phone className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO Settings', icon: <Search className="w-4 h-4" /> },
    { id: 'sections', label: 'Section Manager', icon: <Layers className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans">
      {/* Top Application Bar */}
      <header className="h-16 bg-[#1E293B] border-b border-slate-700/80 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#142615] flex items-center justify-center font-serif font-black text-amber-400 text-cms-body shadow-md border border-amber-500/30">
              LT
            </div>
            <div>
              <div className="font-bold text-cms-body text-white tracking-wide flex items-center gap-2">
                <span>Storytelling CMS</span>
                <span className="text-cms-small uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Editorial Suite
                </span>
              </div>
              <div className="text-cms-small text-slate-400">
                Logged in as: <span className="text-amber-300 font-semibold">Murjo Basu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right Status & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-cms-small">
            <span className={`w-2.5 h-2.5 rounded-full ${hasDraftChanges ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
            <span className="font-semibold text-slate-300">
              {hasDraftChanges ? 'Draft Edits Pending' : 'Live & Published'}
            </span>
          </div>

          {hasDraftChanges && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Discard all uncommitted draft changes and restore published state?')) {
                  discardDraft();
                }
              }}
              className="px-3 py-1.5 rounded-lg text-cms-btn bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Discard all pending draft edits"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Discard Draft</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-3 sm:px-4 py-1.5 rounded-lg text-cms-small font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all flex items-center gap-1.5 cursor-pointer"
            title="Preview live changes across devices"
          >
            <Eye className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            type="button"
            onClick={onOpenPublishModal}
            disabled={!hasDraftChanges}
            className={`px-4 py-1.5 rounded-lg text-cms-small font-bold flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
              hasDraftChanges
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Publish</span>
          </button>

          <button
            type="button"
            onClick={exitCms}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-cms-btn text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-600 cursor-pointer"
          >
            <span>Exit to Site</span>
          </button>

          <button
            type="button"
            onClick={logoutCms}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Body: Sidebar + Dynamic Workspace Pane */}
      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <aside
          className={`bg-[#1E293B] border-r border-slate-700/80 transition-all duration-300 flex flex-col justify-between shrink-0 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="py-4 px-2 space-y-1">
            <div className={`px-3 py-2 text-cms-small uppercase font-bold text-slate-400 tracking-wider ${sidebarCollapsed ? 'hidden' : 'block'}`}>
              Storytelling Modules
            </div>

            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onSelectTab(link.id)}
                  title={sidebarCollapsed ? link.label : undefined}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-cms-btn transition-all cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <span className={isActive ? 'text-slate-950' : 'text-slate-400'}>{link.icon}</span>
                  {!sidebarCollapsed && (
                    <span className="flex-1 text-left truncate">{link.label}</span>
                  )}
                  {!sidebarCollapsed && link.badge && (
                    <span className={`text-cms-small px-1.5 py-0.5 rounded-full font-mono ${
                      isActive ? 'bg-slate-950 text-amber-300' : 'bg-slate-700 text-slate-300'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-slate-700/60 text-center">
            {!sidebarCollapsed && (
              <div className="text-cms-small text-slate-500 font-mono">
                Lata Teamix CMS • Multilingual
              </div>
            )}
          </div>
        </aside>

        {/* Content View Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-[#0F172A]">
          {children}
        </main>
      </div>
    </div>
  );
};



