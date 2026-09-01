import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { 
  LayoutDashboard, 
  Type, 
  Menu as MenuIcon, 
  ShoppingBag, 
  Image as ImageIcon, 
  Crosshair, 
  Layers, 
  Palette, 
  Phone, 
  Search, 
  Eye, 
  UploadCloud, 
  RotateCcw, 
  Globe, 
  ChevronLeft, 
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';

export type AdminTab = 
  | 'dashboard'
  | 'text'
  | 'navigation'
  | 'products'
  | 'media-library'
  | 'image-position'
  | 'sections'
  | 'brand'
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
    setActiveView, 
    setShowPreviewModal, 
    discardDraft,
    logoutCms
  } = useCMS();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const navLinks: { id: AdminTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'text', label: 'Website Text', icon: <Type className="w-4 h-4" /> },
    { id: 'navigation', label: 'Navigation Manager', icon: <MenuIcon className="w-4 h-4" /> },
    { id: 'products', label: 'Product Manager', icon: <ShoppingBag className="w-4 h-4" />, badge: `${draftState.products.length}` },
    { id: 'image-position', label: 'Image Position Editor', icon: <Crosshair className="w-4 h-4 text-amber-400" />, badge: 'Featured' },
    { id: 'media-library', label: 'Media Library', icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'sections', label: 'Section Manager', icon: <Layers className="w-4 h-4" /> },
    { id: 'brand', label: 'Brand Settings', icon: <Palette className="w-4 h-4" /> },
    { id: 'contact', label: 'Contact & Company', icon: <Phone className="w-4 h-4" /> },
    { id: 'seo', label: 'SEO Settings', icon: <Search className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col font-sans">
      {/* Top Application Bar */}
      <header className="h-16 bg-[#1E293B] border-b border-slate-700/80 px-4 sm:px-6 flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-latagreen-700 flex items-center justify-center font-serif font-black text-amber-300 text-sm shadow-md">
              LT
            </div>
            <div>
              <div className="font-bold text-sm text-white tracking-wide flex items-center gap-2">
                <span>Media Management System</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Definitive Admin
                </span>
              </div>
              <div className="text-[11px] text-slate-400">
                Admin: <span className="text-amber-300 font-semibold">Murjo Basu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center/Right Status & Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Live Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700 text-xs">
            <span className={`w-2.5 h-2.5 rounded-full ${hasDraftChanges ? 'bg-amber-400 animate-pulse' : 'bg-emerald-400'}`} />
            <span className="font-semibold text-slate-300">
              {hasDraftChanges ? 'Draft Edits Pending' : 'Live & Published'}
            </span>
          </div>

          {/* Discard Draft Button */}
          {hasDraftChanges && (
            <button
              onClick={() => {
                if (window.confirm('Discard all uncommitted draft changes and restore published state?')) {
                  discardDraft();
                }
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 transition-all flex items-center gap-1.5"
              title="Discard all pending draft edits"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Discard</span>
            </button>
          )}

          {/* Preview Website Button */}
          <button
            onClick={() => setShowPreviewModal(true)}
            className="px-3 sm:px-4 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Eye className="w-3.5 h-3.5 text-sky-400" />
            <span>Preview</span>
          </button>

          {/* Publish Changes Button */}
          <button
            onClick={onOpenPublishModal}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md ${
              hasDraftChanges
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 ring-2 ring-amber-400/50 animate-bounce-subtle'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Publish Live</span>
          </button>

          {/* View Public Site */}
          <button
            onClick={() => {
              window.location.hash = '';
              setActiveView('public');
            }}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
            title="View Public Website"
          >
            <Globe className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Logout CMS */}
          <button
            onClick={logoutCms}
            className="p-2 rounded-lg bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
            title="Sign Out (Murjo Basu)"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-[#1E293B] border-r border-slate-700/80 flex flex-col justify-between transition-all duration-200 z-20 ${
            sidebarCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <div className="p-3 space-y-1 overflow-y-auto">
            {navLinks.map(link => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                  title={sidebarCollapsed ? link.label : undefined}
                >
                  <div className="shrink-0">{link.icon}</div>
                  {!sidebarCollapsed && (
                    <div className="flex-1 flex items-center justify-between truncate text-left">
                      <span className="truncate">{link.label}</span>
                      {link.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          link.badge === 'Featured'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}>
                          {link.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Bottom Metadata */}
          {!sidebarCollapsed && (
            <div className="p-4 border-t border-slate-700/60 text-[11px] text-slate-400 space-y-2 bg-[#172033]">
              <div className="flex items-center justify-between">
                <span>Authenticated:</span>
                <span className="text-amber-300 font-bold flex items-center gap-1">
                  <UserCheck className="w-3 h-3 text-emerald-400" />
                  Murjo Basu
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Access URL:</span>
                <span className="text-slate-300 font-mono">/cms</span>
              </div>
            </div>
          )}
        </aside>

        {/* Content View Area */}
        <main className="flex-1 overflow-y-auto bg-[#0F172A] p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
