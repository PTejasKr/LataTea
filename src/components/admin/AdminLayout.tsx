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
    { id: 'story', label: 'Story & Heritage', icon: <BookOpen className="w-4 h-4 text-white" /> },
    { id: 'craft', label: 'The Craft / Process', icon: <Sliders className="w-4 h-4 text-neutral-300" /> },
    { id: 'tea-stories', label: 'Tea Stories', icon: <Coffee className="w-4 h-4 text-white" />, badge: `${(draftState.teaStories || []).length}` },
    { id: 'categories', label: 'Product Categories', icon: <FolderTree className="w-4 h-4 text-neutral-300" /> },
    { id: 'process-steps', label: 'Process Page', icon: <Layers className="w-4 h-4 text-white" /> },
    { id: 'languages', label: 'Languages (EN & MR)', icon: <Globe className="w-4 h-4 text-neutral-300" /> },
    { id: 'navigation', label: 'Navigation Manager', icon: <MenuIcon className="w-4 h-4" /> },
    { id: 'domains', label: 'Domain Management', icon: <Network className="w-4 h-4 text-neutral-300" />, badge: `${(draftState.domains || []).length}` },
    { id: 'media-library', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'image-position', label: 'Image Focal Points', icon: <Crosshair className="w-4 h-4 text-white" /> },
    { id: 'contact', label: 'Contact & Statutory', icon: <Phone className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO Settings', icon: <Search className="w-4 h-4" /> },
    { id: 'sections', label: 'Section Manager', icon: <Layers className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-sans">
      {/* Top Application Bar */}
      <header className="h-16 bg-[#0a0a0a] border-b border-[#222] px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-sm bg-[#111111] hover:bg-[#222222] text-neutral-300 transition-colors cursor-pointer"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-white flex items-center justify-center font-serif font-black text-black text-cms-body border border-[#333]">
              LT
            </div>
            <div>
              <div className="font-bold text-cms-body text-white tracking-wide flex items-center gap-2">
                <span>Storytelling CMS</span>
                <span className="text-cms-small uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white text-black border border-[#333]">
                  Editorial Suite
                </span>
              </div>
              <div className="text-cms-small text-neutral-400">
                Logged in as: <span className="text-white font-semibold">Murjo Basu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right Status & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-sm bg-[#0a0a0a]/80 border border-[#222] text-cms-small">
            <span className={`w-2.5 h-2.5 rounded-sm ${hasDraftChanges ? 'bg-white text-black animate-pulse' : 'bg-[#111111]'}`} />
            <span className="font-semibold text-neutral-300">
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
              className="px-3 py-1.5 rounded-sm text-cms-btn bg-neutral-800 text-white/20 hover:bg-neutral-800 text-white/30 text-white border border-[#333] transition-all flex items-center gap-1.5 cursor-pointer"
              title="Discard all pending draft edits"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Discard Draft</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="px-3 sm:px-4 py-1.5 rounded-sm text-cms-small font-bold bg-[#111111] hover:bg-[#222222] text-neutral-200 border border-[#333] transition-all flex items-center gap-1.5 cursor-pointer"
            title="Preview live changes across devices"
          >
            <Eye className="w-3.5 h-3.5 text-white" />
            <span className="hidden sm:inline">Preview</span>
          </button>

          <button
            type="button"
            onClick={onOpenPublishModal}
            disabled={!hasDraftChanges}
            className={`px-4 py-1.5 rounded-sm text-cms-small font-bold flex items-center gap-1.5 transition-all  cursor-pointer ${
              hasDraftChanges
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-[#222222] text-neutral-400 cursor-not-allowed'
            }`}
          >
            <UploadCloud className="w-4 h-4" />
            <span>Publish</span>
          </button>

          <button
            type="button"
            onClick={exitCms}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-cms-btn font-semibold text-neutral-200 hover:text-white bg-[#111111] hover:bg-[#222222] border border-[#333] transition-all cursor-pointer shadow-xs"
            title="Exit CMS and return to live website"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Exit to Site</span>
            <span className="sm:hidden">Exit</span>
          </button>

          <button
            type="button"
            onClick={logoutCms}
            className="p-1.5 rounded-sm text-neutral-400 hover:text-neutral-400 hover:text-white hover:bg-neutral-800 text-white/10 transition-colors cursor-pointer"
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
          className={`bg-[#0a0a0a] border-r border-[#222] transition-all duration-300 flex flex-col justify-between shrink-0 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="py-4 px-2 space-y-1">
            <div className={`px-3 py-2 text-cms-small uppercase font-bold text-neutral-400 tracking-wider ${sidebarCollapsed ? 'hidden' : 'block'}`}>
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
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-cms-btn transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-black font-bold '
                      : 'text-neutral-300 hover:bg-[#111111] hover:text-white'
                  } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
                >
                  <span className={isActive ? '' : 'text-neutral-400'}>{link.icon}</span>
                  {!sidebarCollapsed && (
                    <span className="flex-1 text-left truncate">{link.label}</span>
                  )}
                  {!sidebarCollapsed && link.badge && (
                    <span className={`text-cms-small px-1.5 py-0.5 rounded-sm font-mono ${
                      isActive ? 'bg-slate-950 text-white' : 'bg-[#222222] text-neutral-300'
                    }`}>
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-3 border-t border-[#222]/60 text-center">
            {!sidebarCollapsed && (
              <div className="text-cms-small text-neutral-500 font-mono">
                Lata Teamix CMS â€¢ Multilingual
              </div>
            )}
          </div>
        </aside>

        {/* Content View Pane */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-black">
          {children}
        </main>
      </div>
    </div>
  );
};




