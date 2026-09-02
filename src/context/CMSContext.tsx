import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CMSState, LanguageCode, LocalizedString, MediaItem, MediaSlot, ValidationIssue } from '../types/cms';
import { cmsStore } from '../services/cmsStore';
import { UI_TRANSLATIONS } from '../data/translations';

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
  publish: () => { success: boolean; issues: ValidationIssue[] };
  discardDraft: () => void;
  resetToFactory: () => void;
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

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [publishedState, setPublishedState] = useState<CMSState>(() => cmsStore.getPublishedState());
  const [draftState, setDraftState] = useState<CMSState>(() => cmsStore.getDraftState());
  
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
    return path.includes('/cms') || hash.includes('/cms') || search.includes('cms=true');
  };

  const [activeView, setActiveView] = useState<'public' | 'admin'>(() => (isCmsRoute() ? 'admin' : 'public'));
  
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
      if (isCmsRoute()) {
        setActiveView('admin');
      } else {
        setActiveView('public');
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

  const logoutCms = () => {
    sessionStorage.removeItem(CMS_AUTH_KEY);
    setIsCmsAuthenticated(false);
    setActiveView('public');
  };

  const hasDraftChanges = useMemo(() => {
    return cmsStore.hasDraftChanges();
  }, [draftState, publishedState]);

  const updateDraft = (updater: (prev: CMSState) => CMSState) => {
    setDraftState(prev => {
      const next = updater(prev);
      cmsStore.saveDraftState(next);
      return next;
    });
  };

  const publish = () => {
    const res = cmsStore.publishDraft();
    if (res.success) {
      setPublishedState(cmsStore.getPublishedState());
      setDraftState(cmsStore.getDraftState());
    }
    return res;
  };

  const discardDraft = () => {
    cmsStore.discardDraft();
    setDraftState(cmsStore.getDraftState());
  };

  const resetToFactory = () => {
    cmsStore.resetToFactory();
    setPublishedState(cmsStore.getPublishedState());
    setDraftState(cmsStore.getDraftState());
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
        resolveSlotImage,
        getMediaItem
      }}
    >
      {children}
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
