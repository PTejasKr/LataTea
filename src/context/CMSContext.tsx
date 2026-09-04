import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import { CMSState, LanguageCode, LocalizedString, MediaItem, MediaSlot, ValidationIssue } from '../types/cms';
import { cmsStore } from '../services/cmsStore';
import { UI_TRANSLATIONS } from '../data/translations';
import { AlertCircle, Save, X, LogOut } from 'lucide-react';

const CMS_AUTH_KEY = 'latatea_cms_auth_session';
const LANG_STORAGE_KEY = 'latatea_preferred_lang';

interface CMSContextValue {
  publishedState: CMSState;
  draftState: CMSState;
  activeView: 'public' | 'admin';
  setActiveView: (view: 'public' | 'admin') => void;
  isCmsAuthenticated: boolean;
  loginCms: (user: string, pass: string) => boolean;
  logoutCms: () => void;
  previewDevice: 'desktop' | 'tablet' | 'mobile';
  setPreviewDevice: (device: 'desktop' | 'tablet' | 'mobile') => void;
  showPreviewModal: boolean;
  setShowPreviewModal: (show: boolean) => void;
  showInquiryModal: boolean;
  setShowInquiryModal: (show: boolean) => void;
  inquiryProduct: string | null;
  setInquiryProduct: (prod: string | null) => void;
  
  // Bilingual Language System
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (field: LocalizedString | string | undefined, fallback?: string) => string;

  hasDraftChanges: boolean;
  updateDraft: (updater: (prev: CMSState) => CMSState) => void;
  publish: () => Promise<{ success: boolean; issues: ValidationIssue[] }>;
  discardDraft: () => void;
  resetToFactory: () => void;
  exitCms: () => void;
  isPublishing: boolean;
  resolveSlotImage: (
    slotKey: string,
    isMobile?: boolean,
    useDraft?: boolean
  ) => {
    url: string;
    alt: string;
    style: React.CSSProperties;
    slot: MediaSlot | null;
  };
  getMediaItem: (mediaId: string, useDraft?: boolean) => MediaItem | undefined;
}

const CMSContext = createContext<CMSContextValue | null>(null);

import { INITIAL_CMS_STATE } from "../data/defaultContent";
export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publishedState, setPublishedState] = useState<CMSState>(() => cmsStore.getPublishedState());
  const [draftState, setDraftState] = useState<CMSState>(() => cmsStore.getDraftState());
  const [isInitializing, setIsInitializing] = useState(true);
  useEffect(() => {
    Promise.all([fetch("/api/cms/published"), fetch("/api/cms/draft")]).then(async ([p, d]) => {
      if (p.ok) {
        const pData = await p.json();
        if (pData) setPublishedState(cmsStore.mergeWithInitialState(pData));
      }
      if (d.ok) {
        const dData = await d.json();
        if (dData) setDraftState(cmsStore.mergeWithInitialState(dData));
      }
    }).catch(console.error).finally(() => setIsInitializing(false));
  }, []);
  
  // Language selection with local persistence (English is default)
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'mr' || saved === 'en') {
        return saved;
      }
    } catch (e) {
      console.warn('Could not read saved language', e);
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
      document.documentElement.lang = lang;
    } catch (e) {
      console.warn('Could not save language', e);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  // Translation helper function
  const t = (field: LocalizedString | string | undefined, fallback = ''): string => {
    if (!field) return fallback;
    
    // Handle string inputs (check static dictionary)
    if (typeof field === 'string') {
      if (UI_TRANSLATIONS[field]) {
        return language === 'mr' ? UI_TRANSLATIONS[field].mr : UI_TRANSLATIONS[field].en;
      }
      return field;
    }
    
    // Handle LocalizedString objects
    if (language === 'mr' && field.mr && field.mr.trim() !== '') {
      return field.mr;
    }
    return field.en || fallback;
  };

  // URL routing check for /cms
  const isCmsRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();
    return (
      path === '/cms' ||
      path === '/cms/' ||
      hash === '#cms' ||
      hash === '#/cms' ||
      hash.startsWith('#/cms/') ||
      hash.startsWith('#cms/') ||
      search.includes('cms=true')
    );
  };

  const [activeView, setActiveView] = useState<'public' | 'admin'>(() => (isCmsRoute() ? 'admin' : 'public'));
  
  const [sessionInitialState, setSessionInitialState] = useState<CMSState | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [pendingExitCallback, setPendingExitCallback] = useState<(() => void) | null>(null);

  // Refs for popstate handler
  const stateRefs = useRef({ activeView, isDirty, isPublishing });
  useEffect(() => {
    stateRefs.current = { activeView, isDirty, isPublishing };
  }, [activeView, isDirty, isPublishing]);

  useEffect(() => {
    if (activeView === 'admin') {
      setSessionInitialState(cmsStore.getDraftState());
      setIsDirty(false);
    }
  }, [activeView]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (stateRefs.current.isDirty || stateRefs.current.isPublishing) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
  
  const [isCmsAuthenticated, setIsCmsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem(CMS_AUTH_KEY) === 'true';
  });

  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [showInquiryModal, setShowInquiryModal] = useState<boolean>(false);
  const [inquiryProduct, setInquiryProduct] = useState<string | null>(null);

  // Listen for browser navigation changes
  useEffect(() => {
    const handlePopState = () => {
      const isNowAdmin = isCmsRoute();
      const { activeView: currentView, isDirty: currentDirty, isPublishing: currentPub } = stateRefs.current;
      
      if (currentView === 'admin' && !isNowAdmin) {
        if (currentDirty || currentPub) {
          window.history.pushState(null, '', '/#cms');
          if (!currentPub) {
            setPendingExitCallback(() => {
              if (window.location.pathname.toLowerCase().includes('/cms')) {
                window.history.replaceState(null, '', '/');
              }
              window.location.hash = '';
              setActiveView('public');
              setIsDirty(false);
              setSessionInitialState(null);
              setPublishedState(cmsStore.getPublishedState());
            });
            setShowExitModal(true);
          }
        } else {
          if (window.location.pathname.toLowerCase().includes('/cms')) {
            window.history.replaceState(null, '', '/');
          }
          setActiveView('public');
          setSessionInitialState(null);
          setPublishedState(cmsStore.getPublishedState());
        }
      } else if (currentView === 'public' && isNowAdmin) {
        setActiveView('admin');
      }
    };
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Sync state from cmsStore
  useEffect(() => {
    const unsubscribe = cmsStore.subscribe(() => {
      setPublishedState(cmsStore.getPublishedState());
      setDraftState(cmsStore.getDraftState());
    });
    return unsubscribe;
  }, []);

  const loginCms = (user: string, pass: string): boolean => {
    if (user.trim() === 'Murjo Basu' && pass.trim() === 'Basu@123') {
      sessionStorage.setItem(CMS_AUTH_KEY, 'true');
      setIsCmsAuthenticated(true);
      return true;
    }
    return false;
  };

  const exitCms = () => {
    const doExit = () => {
      // 1. Completely remove /cms from browser history and URL
      window.history.replaceState(null, '', '/');
      window.location.hash = '';

      // 2. Fetch fresh published state so all published changes are live
      const freshPublished = cmsStore.getPublishedState();
      setPublishedState(freshPublished);
      setDraftState(cmsStore.getDraftState());

      // 3. Switch to public main website
      setActiveView('public');
      setIsDirty(false);
      setSessionInitialState(null);

      // 4. Scroll to top of main page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isPublishing) return;
    if (isDirty) {
      setPendingExitCallback(() => doExit);
      setShowExitModal(true);
    } else {
      doExit();
    }
  };

  const logoutCms = () => {
    const doLogout = () => {
      sessionStorage.removeItem(CMS_AUTH_KEY);
      setIsCmsAuthenticated(false);

      // 1. Completely remove /cms from browser history and URL
      window.history.replaceState(null, '', '/');
      window.location.hash = '';

      // 2. Fetch fresh published state
      const freshPublished = cmsStore.getPublishedState();
      setPublishedState(freshPublished);
      setDraftState(cmsStore.getDraftState());

      // 3. Switch to public view
      setActiveView('public');
      setIsDirty(false);
      setSessionInitialState(null);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isPublishing) return;
    if (isDirty) {
      setPendingExitCallback(() => doLogout);
      setShowExitModal(true);
    } else {
      doLogout();
    }
  };

  const hasDraftChanges = useMemo(() => {
    return cmsStore.hasDraftChanges();
  }, [draftState, publishedState]);

  const updateDraft = (updater: (prev: CMSState) => CMSState) => {
    setDraftState(prev => {
      const next = updater(prev);
      cmsStore.saveDraftState(next);
      fetch("/api/cms/draft", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) }).catch(console.error);
      
      return next;
    });
  };

  const publish = async () => {
    setIsPublishing(true);
    await new Promise(r => setTimeout(r, 600)); // Simulate save operation
    const res = cmsStore.publishDraft();
    if (res.success) {
      setPublishedState(cmsStore.getPublishedState());
      setDraftState(cmsStore.getDraftState());
      setIsDirty(false);
    }
    setIsPublishing(false);
    return res;
  };

  const discardDraft = () => {
    cmsStore.discardDraft();
    setDraftState(cmsStore.getDraftState());
    setIsDirty(false);
  };

  const resetToFactory = () => {
    cmsStore.resetToFactory();
    setPublishedState(cmsStore.getPublishedState());
    setDraftState(cmsStore.getDraftState());
    setIsDirty(false);
  };

  const getMediaItem = (mediaId: string, useDraft = false): MediaItem | undefined => {
    const state = useDraft ? draftState : publishedState;
    return state.mediaLibrary.find(m => m.id === mediaId);
  };

  const resolveSlotImage = (slotKey: string, isMobile = false, useDraft = false) => {
    const state = useDraft ? draftState : publishedState;
    const slot = state.mediaSlots[slotKey] || null;

    if (!slot) {
      return {
        url: '/assets/images/hero_tea_panoramic.png',
        alt: 'Lata Teamix Imagery',
        style: { objectFit: 'cover' as const, objectPosition: 'center center' },
        slot: null
      };
    }

    const imageId = (isMobile && slot.mobileImageId) ? slot.mobileImageId : slot.desktopImageId;
    const media = state.mediaLibrary.find(m => m.id === imageId);
    
    const posX = isMobile && slot.mobileFocalX !== undefined ? slot.mobileFocalX : slot.focalX;
    const posY = isMobile && slot.mobileFocalY !== undefined ? slot.mobileFocalY : slot.focalY;

    return {
      url: media ? media.url : '/assets/images/hero_tea_panoramic.png',
      alt: media ? media.alt : slot.label,
      style: {
        objectFit: slot.objectFit,
        objectPosition: `${posX}% ${posY}%`
      },
      slot
    };
  };

  if (isInitializing) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>;

  return (
    <CMSContext.Provider
      value={{
        publishedState,
        draftState,
        activeView,
        setActiveView,
        isCmsAuthenticated,
        loginCms,
        logoutCms,
        previewDevice,
        setPreviewDevice,
        showPreviewModal,
        setShowPreviewModal,
        showInquiryModal,
        setShowInquiryModal,
        inquiryProduct,
        setInquiryProduct,
        language,
        setLanguage,
        t,
        hasDraftChanges,
        updateDraft,
        publish,
        discardDraft,
        resetToFactory,
        exitCms,
        isPublishing,
        resolveSlotImage,
        getMediaItem
      }}
    >
      {children}
      
      {/* Session Publishing Overlay */}
      {isPublishing && activeView === 'admin' && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center">
          <div className="w-12 h-12 border-4 border-amber-500/30 border-t-amber-500 rounded-full animate-spin mb-4" />
          <p className="text-amber-400 font-mono font-bold tracking-widest uppercase">Saving your changes...</p>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showExitModal && (
        <div className="fixed inset-0 z-[110] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#162032] border border-slate-700 w-full max-w-md rounded-2xl p-6 shadow-2xl relative">
            <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <AlertCircle className="w-6 h-6 text-amber-500" />
              Unsaved changes
            </h2>
            <p className="text-slate-300 text-sm mb-6">
              You have changes that haven't been saved yet. What would you like to do?
            </p>
            
            <div className="space-y-3">
              <button
                onClick={async () => {
                  setShowExitModal(false);
                  setIsPublishing(true);
                  cmsStore.publishDraft();
                  setPublishedState(cmsStore.getPublishedState());
                  setDraftState(cmsStore.getDraftState());
                  setIsPublishing(false);
                  setIsDirty(false); 
                  if (pendingExitCallback) pendingExitCallback();
                  setPendingExitCallback(null);
                }}
                className="w-full py-3 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Save className="w-5 h-5" />
                SAVE & EXIT
              </button>
              
              <button
                onClick={() => {
                  if (sessionInitialState) {
                    cmsStore.saveDraftState(sessionInitialState);
                    setDraftState(sessionInitialState);
                  }
                  setShowExitModal(false);
                  setIsDirty(false);
                  if (pendingExitCallback) pendingExitCallback();
                  setPendingExitCallback(null);
                }}
                className="w-full py-3 px-4 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-xl border border-rose-500/30 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                EXIT WITHOUT SAVING
              </button>

              <button
                onClick={() => {
                  setShowExitModal(false);
                  setPendingExitCallback(null);
                }}
                className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl border border-slate-600 flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextValue => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};

