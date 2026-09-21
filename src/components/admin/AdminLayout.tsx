import React, { useState, useEffect, useMemo } from 'react';
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
  ChevronDown,
  LogOut,
  Network,
  FolderTree,
  Palette,
  List,
  Settings,
  LayoutTemplate,
  CheckCircle2,
  X,
  MoreVertical
} from 'lucide-react';

export type AdminTab = 
  | 'dashboard'
  | 'story'
  | 'craft'
  | 'process-steps'
  | 'tea-stories'
  | 'categories'
  | 'media-library'
  | 'image-position'
  | 'navigation'
  | 'sections'
  | 'brand'
  | 'languages'
  | 'seo'
  | 'contact'
  | 'domains';

export interface NavItem {
  id: AdminTab;
  label: string;
  shortLabel?: string;
  icon: React.ReactNode;
  badge?: string;
  description?: string;
}

export interface NavCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Define professional navigation categories according to industry standards
  const navigationCategories: NavCategory[] = useMemo(() => [
    {
      id: 'editorial',
      label: 'Editorial & Stories',
      icon: <BookOpen className="w-4 h-4 text-gray-400" />,
      items: [
        { 
          id: 'story', 
          label: 'Story & Heritage', 
          shortLabel: 'Heritage',
          icon: <BookOpen className="w-4 h-4" />, 
          description: 'Brand origins, values & milestone timeline' 
        },
        { 
          id: 'craft', 
          label: 'The Craft Process', 
          shortLabel: 'The Craft',
          icon: <Sliders className="w-4 h-4" />, 
          description: '5 sequential artisanal craft stages' 
        },
        { 
          id: 'process-steps', 
          label: 'Process & Brewing Page', 
          shortLabel: 'Brewing Guide',
          icon: <List className="w-4 h-4" />, 
          description: 'Interactive recipes, reels & video modules' 
        },
        { 
          id: 'tea-stories', 
          label: 'Tea Blend Profiles', 
          shortLabel: 'Tea Blends',
          icon: <Coffee className="w-4 h-4" />, 
          badge: `${(draftState.teaStories || []).length}`,
          description: 'Tasting notes, flavor cards & origins' 
        },
      ]
    },
    {
      id: 'catalogue',
      label: 'Catalogue & Taxonomy',
      icon: <FolderTree className="w-4 h-4 text-gray-300" />,
      items: [
        { 
          id: 'categories', 
          label: 'Product Categories', 
          shortLabel: 'Categories',
          icon: <FolderTree className="w-4 h-4" />, 
          badge: `${(draftState.categories || []).length}`,
          description: 'Catalogue segments & Marathi taxonomy' 
        },
      ]
    },
    {
      id: 'assets',
      label: 'Media & Assets',
      icon: <ImageIcon className="w-4 h-4 text-sky-400" />,
      items: [
        { 
          id: 'media-library', 
          label: 'Media Library', 
          shortLabel: 'Media',
          icon: <ImageIcon className="w-4 h-4" />, 
          badge: `${(draftState.mediaLibrary || []).length}`,
          description: 'Asset uploads, banners & SVG vectors' 
        },
        { 
          id: 'image-position', 
          label: 'Image Focal Points', 
          shortLabel: 'Focal Points',
          icon: <Crosshair className="w-4 h-4" />, 
          description: 'Responsive framing & viewport crops' 
        },
      ]
    },
    {
      id: 'structure',
      label: 'Site Structure & Design',
      icon: <LayoutTemplate className="w-4 h-4 text-gray-300" />,
      items: [
        { 
          id: 'navigation', 
          label: 'Navigation Menus', 
          shortLabel: 'Navigation',
          icon: <MenuIcon className="w-4 h-4" />, 
          description: 'Header & footer links hierarchy' 
        },
        { 
          id: 'sections', 
          label: 'Homepage Sections', 
          shortLabel: 'Sections',
          icon: <Layers className="w-4 h-4" />, 
          description: 'Section ordering & display toggles' 
        },
        { 
          id: 'brand', 
          label: 'Brand & Brochure Colors', 
          shortLabel: 'Brand Colors',
          icon: <Palette className="w-4 h-4" />, 
          description: 'Brochure palette & typography spec' 
        },
      ]
    },
    {
      id: 'system',
      label: 'System & Localization',
      icon: <Settings className="w-4 h-4 text-neutral-400" />,
      items: [
        { 
          id: 'languages', 
          label: 'Languages (EN & MR)', 
          shortLabel: 'Localization',
          icon: <Globe className="w-4 h-4" />, 
          description: 'Bilingual translation coverage' 
        },
        { 
          id: 'seo', 
          label: 'SEO & Social Meta', 
          shortLabel: 'SEO Settings',
          icon: <Search className="w-4 h-4" />, 
          description: 'Google search tags & OpenGraph' 
        },
        { 
          id: 'contact', 
          label: 'Contact & Statutory', 
          shortLabel: 'Contact & Legal',
          icon: <Phone className="w-4 h-4" />, 
          description: 'HQ address, WhatsApp & FSSAI' 
        },
        { 
          id: 'domains', 
          label: 'Domain Management', 
          shortLabel: 'Domains',
          icon: <Network className="w-4 h-4" />, 
          badge: `${(draftState.domains || []).length}`,
          description: 'Custom domain DNS & SSL status' 
        },
      ]
    }
  ], [draftState]);

  // Track expanded groups
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    editorial: true,
    catalogue: true,
    assets: false,
    structure: false,
    system: false
  });

  // Auto-expand active tab's parent category
  useEffect(() => {
    const parentCategory = navigationCategories.find(cat => 
      cat.items.some(item => item.id === activeTab)
    );
    if (parentCategory) {
      setExpandedCategories(prev => ({
        ...prev,
        [parentCategory.id]: true
      }));
    }
  }, [activeTab, navigationCategories]);

  const toggleCategory = (catId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  const handleSelectNav = (tabId: AdminTab) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  // Current category & item for breadcrumb
  const currentCategory = navigationCategories.find(c => c.items.some(i => i.id === activeTab));
  const currentItem = currentCategory?.items.find(i => i.id === activeTab);

  // Filter items by search query
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return navigationCategories;
    const q = searchQuery.toLowerCase().trim();
    return navigationCategories.map(cat => {
      const matchingItems = cat.items.filter(item => 
        item.label.toLowerCase().includes(q) || 
        (item.description && item.description.toLowerCase().includes(q))
      );
      return {
        ...cat,
        items: matchingItems
      };
    }).filter(cat => cat.items.length > 0);
  }, [navigationCategories, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-neutral-800 selection:text-white">
      {/* Top Application Bar */}
      <header className="h-14 sm:h-16 bg-[#0a0a0a] border-b border-[#1f1f1f] px-3 sm:px-6 flex items-center justify-between z-30 sticky top-0 backdrop-blur-md">
        {/* Left: Mobile Drawer Trigger / Desktop Collapse & Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-sm bg-[#141414] hover:bg-[#222222] text-neutral-300 transition-colors cursor-pointer border border-[#262626] min-w-[38px] min-h-[38px] flex items-center justify-center"
            title="Open Mobile Menu"
            aria-label="Open Mobile Menu"
          >
            <MenuIcon className="w-4 h-4" />
          </button>

          {/* Desktop Sidebar Toggle */}
          <button
            type="button"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hidden md:flex p-2 rounded-sm bg-[#141414] hover:bg-[#222222] text-neutral-300 transition-colors cursor-pointer border border-[#262626] items-center justify-center"
            title="Toggle Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
          
          {/* Brand Identity */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-white flex items-center justify-center font-serif font-black text-black text-xs sm:text-sm border border-[#333] shadow-xs">
              LT
            </div>
            <div>
              <div className="font-bold text-xs sm:text-sm text-white tracking-wide flex items-center gap-1.5 sm:gap-2">
                <span>Lata Tea CMS</span>
                <span className="hidden sm:inline-block text-[9px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-sm bg-neutral-900 text-neutral-400 border border-[#2d2d2d]">
                  Suite
                </span>
              </div>
              <div className="text-[10px] sm:text-xs text-neutral-400 hidden xs:block truncate max-w-[130px] sm:max-w-none">
                Editor: <span className="text-white font-medium">Murjo Basu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Actions Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Pending Status Badge (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-sm bg-[#111111] border border-[#222] text-xs">
            <span className={`w-2 h-2 rounded-full ${hasDraftChanges ? 'bg-gray-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="font-medium text-neutral-300 text-[11px]">
              {hasDraftChanges ? 'Draft Pending' : 'Published'}
            </span>
          </div>

          {/* Discard Draft (Desktop/Tablet) */}
          {hasDraftChanges && (
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Discard all uncommitted draft changes and restore published state?')) {
                  discardDraft();
                }
              }}
              className="hidden sm:flex px-2.5 py-1.5 rounded-sm text-xs font-semibold bg-[#161616] hover:bg-[#222] text-neutral-300 hover:text-white border border-[#333] transition-all items-center gap-1.5 cursor-pointer"
              title="Discard all pending draft edits"
            >
              <RotateCcw className="w-3.5 h-3.5 text-neutral-400" />
              <span>Discard</span>
            </button>
          )}

          {/* Live Preview Button */}
          <button
            type="button"
            onClick={() => setShowPreviewModal(true)}
            className="p-2 sm:px-3 sm:py-1.5 rounded-sm text-xs font-semibold bg-[#141414] hover:bg-[#222222] text-neutral-200 border border-[#333] transition-all flex items-center gap-1.5 cursor-pointer min-h-[36px] min-w-[36px] justify-center"
            title="Preview live changes across devices"
          >
            <Eye className="w-3.5 h-3.5 text-neutral-300" />
            <span className="hidden md:inline">Preview</span>
          </button>

          {/* Publish Button */}
          <button
            type="button"
            onClick={onOpenPublishModal}
            disabled={!hasDraftChanges}
            className={`px-3 sm:px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer min-h-[36px] ${
              hasDraftChanges
                ? 'bg-white text-black hover:bg-neutral-200 shadow-sm'
                : 'bg-[#181818] text-neutral-500 border border-[#262626] cursor-not-allowed'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Publish</span>
            {hasDraftChanges && <span className="w-1.5 h-1.5 rounded-full bg-gray-400 md:hidden" />}
          </button>

          {/* Exit to Site Button (Desktop) */}
          <button
            type="button"
            onClick={exitCms}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-medium text-neutral-200 hover:text-white bg-[#141414] hover:bg-[#222222] border border-[#2d2d2d] transition-all cursor-pointer min-h-[36px]"
            title="Exit CMS and return to live website"
          >
            <Globe className="w-3.5 h-3.5 text-gray-400" />
            <span>Exit to Site</span>
          </button>

          {/* Mobile More Options Dropdown Toggle */}
          <div className="relative sm:hidden">
            <button
              type="button"
              onClick={() => setMobileMoreOpen(!mobileMoreOpen)}
              className="p-2 rounded-sm bg-[#141414] text-neutral-300 border border-[#262626] min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
              title="More Options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {mobileMoreOpen && (
              <div 
                className="absolute right-0 top-full mt-2 w-48 bg-[#111111] border border-[#333] rounded-sm shadow-2xl p-1.5 z-50 space-y-1 animate-in fade-in"
                onClick={() => setMobileMoreOpen(false)}
              >
                <button
                  onClick={exitCms}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-200 hover:bg-[#1f1f1f] rounded-sm text-left"
                >
                  <Globe className="w-3.5 h-3.5 text-gray-400" />
                  <span>Exit to Live Site</span>
                </button>
                {hasDraftChanges && (
                  <button
                    onClick={() => {
                      if (window.confirm('Discard all uncommitted draft changes?')) {
                        discardDraft();
                      }
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-gray-300 hover:bg-[#1f1f1f] rounded-sm text-left"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Discard Draft</span>
                  </button>
                )}
                <button
                  onClick={logoutCms}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-[#1f1f1f] rounded-sm text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

          {/* Desktop Logout Button */}
          <button
            type="button"
            onClick={logoutCms}
            className="hidden sm:flex p-2 rounded-sm text-neutral-400 hover:text-white hover:bg-[#1a1a1a] transition-colors cursor-pointer min-h-[36px] min-w-[36px] items-center justify-center"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Body: Sidebar + Dynamic Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Mobile Backdrop Overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xs z-40 md:hidden transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}

        {/* Navigation Sidebar (Desktop + Mobile Drawer) */}
        <aside
          className={`bg-[#0a0a0a] border-r border-[#1f1f1f] flex flex-col justify-between shrink-0 select-none z-50 md:z-auto transition-all duration-300 ${
            // Mobile Drawer classes:
            mobileMenuOpen 
              ? 'fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl translate-x-0'
              : 'fixed inset-y-0 left-0 w-72 -translate-x-full md:translate-x-0 md:static'
          } ${
            // Desktop width classes:
            sidebarCollapsed ? 'md:w-[68px]' : 'md:w-72'
          }`}
        >
          {/* Mobile Drawer Header with Close Button */}
          <div className="md:hidden flex items-center justify-between p-3.5 border-b border-[#1f1f1f] bg-[#0d0d0d]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-sm bg-white text-black font-bold text-xs flex items-center justify-center font-serif">
                LT
              </div>
              <span className="font-bold text-xs text-white">Editorial Modules</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-sm bg-[#161616] text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Top of Sidebar: Search & Overview */}
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-2.5 space-y-3">
            
            {/* Minimal Filter Input (when expanded or on mobile) */}
            {(!sidebarCollapsed || mobileMenuOpen) && (
              <div className="relative mb-1">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Quick jump / search..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111111] border border-[#262626] rounded-sm pl-8 pr-7 py-2 md:py-1.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white cursor-pointer p-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}

            {/* Root Hub: Overview / Dashboard */}
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => handleSelectNav('dashboard')}
                title={sidebarCollapsed && !mobileMenuOpen ? 'Dashboard & Health' : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-xs transition-all cursor-pointer group min-h-[40px] ${
                  activeTab === 'dashboard'
                    ? 'bg-white text-black font-bold shadow-xs'
                    : 'text-neutral-300 hover:bg-[#141414] hover:text-white'
                } ${sidebarCollapsed && !mobileMenuOpen ? 'justify-center px-0' : ''}`}
              >
                <LayoutDashboard className={`w-4 h-4 shrink-0 ${activeTab === 'dashboard' ? 'text-black' : 'text-neutral-400 group-hover:text-white'}`} />
                {(!sidebarCollapsed || mobileMenuOpen) && (
                  <div className="flex-1 text-left flex items-center justify-between">
                    <span className="font-semibold">Dashboard & Health</span>
                    {hasDraftChanges && (
                      <span className="w-2 h-2 rounded-full bg-gray-400 animate-pulse" />
                    )}
                  </div>
                )}
              </button>
            </div>

            <div className="h-px bg-[#1f1f1f] my-1" />

            {/* Categorized Submenus */}
            <div className="space-y-2">
              {filteredCategories.map(category => {
                const isExpanded = expandedCategories[category.id] || searchQuery.length > 0;
                const hasActiveChild = category.items.some(i => i.id === activeTab);

                return (
                  <div key={category.id} className="space-y-1">
                    {/* Category Group Header Button */}
                    {(!sidebarCollapsed || mobileMenuOpen) ? (
                      <button
                        type="button"
                        onClick={() => toggleCategory(category.id)}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-neutral-400 hover:text-neutral-200 transition-colors cursor-pointer group min-h-[32px]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="shrink-0">{category.icon}</span>
                          <span className="truncate">{category.label}</span>
                        </div>
                        <ChevronDown 
                          className={`w-3.5 h-3.5 text-neutral-500 group-hover:text-neutral-300 transition-transform duration-200 ${
                            isExpanded ? 'rotate-0' : '-rotate-90'
                          }`}
                        />
                      </button>
                    ) : (
                      <div className="h-px bg-[#1a1a1a] my-1" />
                    )}

                    {/* Submenu Items List */}
                    {(isExpanded || (sidebarCollapsed && !mobileMenuOpen)) && (
                      <div className={`space-y-0.5 ${(!sidebarCollapsed || mobileMenuOpen) ? 'pl-2 border-l border-[#1f1f1f] ml-3.5' : ''}`}>
                        {category.items.map(item => {
                          const isActive = activeTab === item.id;

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectNav(item.id)}
                              title={sidebarCollapsed && !mobileMenuOpen ? `${category.label} > ${item.label}` : item.description}
                              className={`w-full flex items-center gap-2.5 px-2.5 py-2.5 md:py-2 rounded-sm text-xs transition-all cursor-pointer group relative min-h-[38px] ${
                                isActive
                                  ? 'bg-[#1e1e1e] text-white font-semibold border border-[#333] shadow-xs'
                                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-[#121212]'
                              } ${sidebarCollapsed && !mobileMenuOpen ? 'justify-center px-0' : ''}`}
                            >
                              <span className={`shrink-0 transition-colors ${
                                isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                              }`}>
                                {item.icon}
                              </span>

                              {(!sidebarCollapsed || mobileMenuOpen) && (
                                <>
                                  <span className="flex-1 text-left truncate">
                                    {item.label}
                                  </span>
                                  {item.badge && (
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded-sm font-mono shrink-0 ${
                                      isActive 
                                        ? 'bg-neutral-800 text-neutral-200 border border-neutral-700' 
                                        : 'bg-[#1a1a1a] text-neutral-400 border border-[#262626]'
                                    }`}>
                                      {item.badge}
                                    </span>
                                  )}
                                </>
                              )}

                              {/* Active marker pill when collapsed */}
                              {sidebarCollapsed && !mobileMenuOpen && isActive && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-white rounded-r-sm" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer of Sidebar */}
          <div className="p-3 border-t border-[#1f1f1f] bg-[#080808]">
            {(!sidebarCollapsed || mobileMenuOpen) ? (
              <div className="flex items-center justify-between text-[11px] text-neutral-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
                  <span>v1.2 Sovereign</span>
                </div>
                <span className="font-mono text-[10px] text-neutral-400">EN / MR</span>
              </div>
            ) : (
              <div className="flex justify-center text-neutral-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-gray-400" />
              </div>
            )}
          </div>
        </aside>

        {/* Content View Pane */}
        <main className="flex-1 overflow-y-auto bg-[#000000] flex flex-col min-w-0">
          {/* Minimal Breadcrumb & Context Header */}
          {activeTab !== 'dashboard' && currentCategory && currentItem && (
            <div className="px-3 sm:px-6 py-2.5 sm:py-3 border-b border-[#181818] bg-[#080808]/80 backdrop-blur-xs flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-neutral-400 font-medium overflow-hidden">
                <button 
                  onClick={() => onSelectTab('dashboard')} 
                  className="hover:text-white transition-colors cursor-pointer shrink-0"
                >
                  CMS
                </button>
                <span className="text-neutral-600">/</span>
                <span className="text-neutral-300 hidden xs:inline truncate">{currentCategory.label}</span>
                <span className="text-neutral-600 hidden xs:inline">/</span>
                <span className="text-white font-semibold flex items-center gap-1.5 truncate">
                  {currentItem.label}
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] text-neutral-400 shrink-0">
                <span className="hidden sm:inline">Scope:</span>
                <span className="px-2 py-0.5 rounded-sm bg-[#141414] border border-[#262626] font-mono text-neutral-300 uppercase">
                  {currentCategory.id}
                </span>
              </div>
            </div>
          )}

          {/* View Container */}
          <div className="p-3.5 sm:p-6 lg:p-8 flex-1 max-w-full overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};




