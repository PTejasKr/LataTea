import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CMSState, MediaItem, MediaSlot, ValidationIssue } from '../types/cms';
import { cmsStore } from '../services/cmsStore';
import { CartItem, orderStore } from '../services/orderStore';

const CMS_AUTH_KEY = 'latatea_cms_auth_session';

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
  
  // Cart state
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQty: (cartItemId: string, qty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  cartSubtotal: number;
  cartTotalCount: number;

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

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => orderStore.getCart());
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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

  // Save cart changes
  useEffect(() => {
    orderStore.saveCart(cart);
  }, [cart]);

  // Sync with cmsStore updates
  useEffect(() => {
    const unsubscribe = cmsStore.subscribe(() => {
      setPublishedState(cmsStore.getPublishedState());
      setDraftState(cmsStore.getDraftState());
    });
    return unsubscribe;
  }, []);

  const loginCms = (user: string, pass: string): boolean => {
    if (user.trim() === 'Murjo Basu' && pass === 'Basu@123') {
      setIsCmsAuthenticated(true);
      sessionStorage.setItem(CMS_AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const logoutCms = () => {
    setIsCmsAuthenticated(false);
    sessionStorage.removeItem(CMS_AUTH_KEY);
    window.location.hash = '';
    setActiveView('public');
  };

  const addToCart = (itemData: Omit<CartItem, 'id'>) => {
    setCart(prev => {
      const existingIdx = prev.findIndex(
        i => i.productId === itemData.productId && i.packSize === itemData.packSize
      );
      if (existingIdx !== -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += itemData.quantity;
        return copy;
      } else {
        const newItem: CartItem = {
          ...itemData,
          id: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`
        };
        return [...prev, newItem];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartQty = (cartItemId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => (item.id === cartItemId ? { ...item, quantity: qty } : item)));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cart]);

  const cartTotalCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const hasDraftChanges = useMemo(() => {
    const cleanPub = { ...publishedState, lastSavedAt: '', status: '' };
    const cleanDraft = { ...draftState, lastSavedAt: '', status: '' };
    return JSON.stringify(cleanPub) !== JSON.stringify(cleanDraft);
  }, [publishedState, draftState]);

  const updateDraft = (updater: (prev: CMSState) => CMSState) => {
    const updated = updater(draftState);
    setDraftState(updated);
    cmsStore.saveDraftState(updated);
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
    const lib = useDraft ? draftState.mediaLibrary : publishedState.mediaLibrary;
    return lib.find(m => m.id === mediaId);
  };

  const resolveSlotImage = (
    slotKey: string,
    isMobile = false,
    useDraft = false
  ) => {
    const state = useDraft ? draftState : publishedState;
    const slot = state.mediaSlots[slotKey] || null;

    if (!slot) {
      return {
        url: '',
        alt: 'Image not found',
        style: { objectFit: 'cover' as const, objectPosition: 'center center' },
        slot: null
      };
    }

    const imageId = (isMobile && slot.mobileImageId) ? slot.mobileImageId : slot.desktopImageId;
    const mediaItem = getMediaItem(imageId, useDraft);
    const focalX = (isMobile && slot.mobileFocalX !== undefined) ? slot.mobileFocalX : slot.focalX;
    const focalY = (isMobile && slot.mobileFocalY !== undefined) ? slot.mobileFocalY : slot.focalY;

    const style: React.CSSProperties = {
      objectFit: slot.objectFit || 'cover',
      objectPosition: `${focalX ?? 50}% ${focalY ?? 50}%`
    };

    return {
      url: mediaItem?.url || '',
      alt: mediaItem?.alt || slot.label,
      style,
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
        cart,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        cartSubtotal,
        cartTotalCount,
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

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
