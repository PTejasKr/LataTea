import { CMSState, MediaItem, MediaSlot, ProductItem, ValidationIssue } from '../types/cms';
import { INITIAL_CMS_STATE } from '../data/defaultContent';

const STORAGE_KEY_PUBLISHED = 'latatea_cms_published_v1';
const STORAGE_KEY_DRAFT = 'latatea_cms_draft_v1';

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach(cb => cb());
}

export const cmsStore = {
  subscribe(listener: Listener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },

  getPublishedState(): CMSState {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PUBLISHED);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading published CMS state:', e);
    }
    // Initialize if not present
    this.savePublishedState(INITIAL_CMS_STATE);
    return INITIAL_CMS_STATE;
  },

  savePublishedState(state: CMSState): void {
    try {
      localStorage.setItem(STORAGE_KEY_PUBLISHED, JSON.stringify(state));
    } catch (e) {
      console.error('Error saving published state:', e);
    }
  },

  getDraftState(): CMSState {
    try {
      const data = localStorage.getItem(STORAGE_KEY_DRAFT);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading draft CMS state:', e);
    }
    const published = this.getPublishedState();
    this.saveDraftState(published);
    return published;
  },

  saveDraftState(state: CMSState): void {
    try {
      const updated: CMSState = {
        ...state,
        status: 'draft',
        lastSavedAt: new Date().toISOString()
      };
      localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(updated));
      notifyListeners();
    } catch (e) {
      console.error('Error saving draft state:', e);
    }
  },

  hasDraftChanges(): boolean {
    const pub = this.getPublishedState();
    const draft = this.getDraftState();
    const cleanPub = { ...pub, lastSavedAt: '', status: '' };
    const cleanDraft = { ...draft, lastSavedAt: '', status: '' };
    return JSON.stringify(cleanPub) !== JSON.stringify(cleanDraft);
  },

  publishDraft(): { success: boolean; issues: ValidationIssue[] } {
    const draft = this.getDraftState();
    const issues = this.validateState(draft);
    const errors = issues.filter(i => i.type === 'error');

    if (errors.length > 0) {
      return { success: false, issues };
    }

    const now = new Date().toISOString();
    const publishedState: CMSState = {
      ...draft,
      status: 'published',
      lastPublishedAt: now,
      lastSavedAt: now
    };

    this.savePublishedState(publishedState);
    this.saveDraftState(publishedState);
    notifyListeners();
    return { success: true, issues };
  },

  discardDraft(): void {
    const published = this.getPublishedState();
    localStorage.setItem(STORAGE_KEY_DRAFT, JSON.stringify(published));
    notifyListeners();
  },

  resetToFactory(): void {
    this.savePublishedState(INITIAL_CMS_STATE);
    this.saveDraftState(INITIAL_CMS_STATE);
    notifyListeners();
  },

  validateState(state: CMSState): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // 1. Hero Content
    if (!state.content.hero.headline.trim()) {
      issues.push({ id: 'err_hero_head', type: 'error', category: 'Hero', message: 'Hero headline cannot be empty.' });
    }
    if (!state.content.hero.tagline.trim()) {
      issues.push({ id: 'warn_hero_tag', type: 'warning', category: 'Hero', message: 'Hero tagline is recommended for visual balance.' });
    }

    // 2. Navigation
    const activeNav = state.navigation.filter(n => n.isEnabled);
    if (activeNav.length === 0) {
      issues.push({ id: 'err_nav_empty', type: 'error', category: 'Navigation', message: 'At least one navigation menu item must be enabled.' });
    }

    // 3. Products
    const activeProds = state.products.filter(p => p.isVisible);
    if (activeProds.length === 0) {
      issues.push({ id: 'err_prod_empty', type: 'error', category: 'Products', message: 'At least one product must be set to visible.' });
    }
    state.products.forEach((p, idx) => {
      if (!p.name.trim()) {
        issues.push({ id: `err_p_name_${idx}`, type: 'error', category: 'Products', message: `Product #${idx + 1} has no name.` });
      }
      if (!p.packSizes || p.packSizes.length === 0) {
        issues.push({ id: `warn_p_size_${idx}`, type: 'warning', category: 'Products', message: `Product "${p.name || `#${idx + 1}`}" has no pack sizes configured.` });
      } else {
        const invalidPrices = p.packSizes.filter(ps => isNaN(ps.price) || ps.price <= 0);
        if (invalidPrices.length > 0) {
          issues.push({ id: `warn_p_price_${idx}`, type: 'warning', category: 'Products', message: `Product "${p.name}" has pack sizes with 0 or invalid price.` });
        }
      }
    });

    // 4. Media Slots
    Object.entries(state.mediaSlots).forEach(([key, slot]) => {
      const exists = state.mediaLibrary.some(m => m.id === slot.desktopImageId);
      if (!exists && slot.desktopImageId) {
        issues.push({ id: `warn_slot_${key}`, type: 'warning', category: 'Media Slots', message: `Media Slot "${slot.label}" references missing image ID.` });
      }
    });

    // 5. SEO
    if (!state.seo.seoTitle.trim()) {
      issues.push({ id: 'warn_seo_title', type: 'warning', category: 'SEO', message: 'Page SEO Title is missing.' });
    }
    if (!state.seo.metaDescription.trim()) {
      issues.push({ id: 'warn_seo_desc', type: 'warning', category: 'SEO', message: 'Page Meta Description is missing.' });
    }

    return issues;
  },

  calculateCompleteness(state: CMSState): { contentScore: number; mediaScore: number; overallScore: number } {
    let contentTotal = 0;
    let contentFilled = 0;

    // Content fields
    const checkField = (val: unknown) => {
      contentTotal++;
      if (typeof val === 'string' && val.trim().length > 0) contentFilled++;
      else if (Array.isArray(val) && val.length > 0) contentFilled++;
      else if (val && typeof val === 'object') contentFilled++;
    };

    checkField(state.content.hero.headline);
    checkField(state.content.hero.subheadline);
    checkField(state.content.hero.tagline);
    checkField(state.content.about.heading);
    checkField(state.content.about.subheading);
    checkField(state.content.about.storyParagraphs);
    checkField(state.content.applications.heading);
    checkField(state.content.preparation.heading);
    checkField(state.content.ordering.heading);
    checkField(state.content.cta.headline);
    checkField(state.seo.seoTitle);
    checkField(state.seo.metaDescription);

    // Products completeness
    state.products.forEach(p => {
      checkField(p.name);
      checkField(p.shortDescription);
    });

    const contentScore = Math.round((contentFilled / Math.max(1, contentTotal)) * 100);

    // Media slots completeness
    const slots = Object.values(state.mediaSlots);
    const totalSlots = slots.length;
    const filledSlots = slots.filter(s => s.desktopImageId && s.desktopImageId.length > 0).length;
    const mediaScore = Math.round((filledSlots / Math.max(1, totalSlots)) * 100);

    const overallScore = Math.round((contentScore * 0.6) + (mediaScore * 0.4));

    return { contentScore, mediaScore, overallScore };
  },

  async uploadFile(file: File, altText = ''): Promise<MediaItem> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const mediaItem: MediaItem = {
          id: `media_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
          filename: file.name,
          url: result,
          alt: altText || file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          fileSize: `${(file.size / 1024).toFixed(1)} KB`,
          mediaType: file.type as MediaItem['mediaType'],
          uploadedAt: new Date().toISOString()
        };

        const draft = this.getDraftState();
        draft.mediaLibrary = [mediaItem, ...draft.mediaLibrary];
        this.saveDraftState(draft);
        resolve(mediaItem);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  },

  updateMediaSlot(slotKey: string, updates: Partial<MediaSlot>): void {
    const draft = this.getDraftState();
    if (draft.mediaSlots[slotKey]) {
      draft.mediaSlots[slotKey] = {
        ...draft.mediaSlots[slotKey],
        ...updates
      };
      this.saveDraftState(draft);
    }
  },

  updateProduct(productId: string, updates: Partial<ProductItem>): void {
    const draft = this.getDraftState();
    const idx = draft.products.findIndex(p => p.id === productId);
    if (idx !== -1) {
      draft.products[idx] = { ...draft.products[idx], ...updates };
      this.saveDraftState(draft);
    }
  },

  addProduct(product: Omit<ProductItem, 'id'>): ProductItem {
    const draft = this.getDraftState();
    const newProduct: ProductItem = {
      ...product,
      id: `prod_${Date.now()}`
    };
    draft.products.push(newProduct);
    this.saveDraftState(draft);
    return newProduct;
  },

  deleteProduct(productId: string): void {
    const draft = this.getDraftState();
    draft.products = draft.products.filter(p => p.id !== productId);
    this.saveDraftState(draft);
  }
};
