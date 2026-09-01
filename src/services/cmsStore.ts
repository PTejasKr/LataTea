import { CMSState, MediaItem, MediaSlot, ProductItem, SolutionItem, ValidationIssue } from '../types/cms';
import { INITIAL_CMS_STATE } from '../data/defaultContent';

const STORAGE_KEY_PUBLISHED = 'latatea_cms_published_v2';
const STORAGE_KEY_DRAFT = 'latatea_cms_draft_v2';

type Listener = () => void;
const listeners: Set<Listener> = new Set();

function notifyListeners() {
  listeners.forEach(cb => cb());
}

function mergeWithInitialState(parsed: Partial<CMSState> | null): CMSState {
  if (!parsed) return INITIAL_CMS_STATE;

  return {
    ...INITIAL_CMS_STATE,
    ...parsed,
    version: INITIAL_CMS_STATE.version,
    content: {
      ...INITIAL_CMS_STATE.content,
      ...(parsed.content || {}),
      hero: {
        ...INITIAL_CMS_STATE.content.hero,
        ...((parsed.content && parsed.content.hero) || {})
      },
      promise: {
        ...INITIAL_CMS_STATE.content.promise,
        ...((parsed.content && parsed.content.promise) || {})
      },
      about: {
        ...INITIAL_CMS_STATE.content.about,
        ...((parsed.content && parsed.content.about) || {})
      },
      ourStory: {
        ...INITIAL_CMS_STATE.content.ourStory,
        ...((parsed.content && parsed.content.ourStory) || {})
      },
      applications: {
        ...INITIAL_CMS_STATE.content.applications,
        ...((parsed.content && parsed.content.applications) || {})
      },
      preparation: {
        ...INITIAL_CMS_STATE.content.preparation,
        ...((parsed.content && parsed.content.preparation) || {})
      },
      ordering: {
        ...INITIAL_CMS_STATE.content.ordering,
        ...((parsed.content && parsed.content.ordering) || {})
      },
      cta: {
        ...INITIAL_CMS_STATE.content.cta,
        ...((parsed.content && parsed.content.cta) || {})
      },
      footer: {
        ...INITIAL_CMS_STATE.content.footer,
        ...((parsed.content && parsed.content.footer) || {})
      }
    },
    products: (parsed.products && parsed.products.length > 0 && parsed.products[0].slug)
      ? parsed.products
      : INITIAL_CMS_STATE.products,
    solutions: (parsed.solutions && parsed.solutions.length > 0)
      ? parsed.solutions
      : INITIAL_CMS_STATE.solutions,
    domains: (parsed.domains && parsed.domains.length > 0)
      ? parsed.domains
      : INITIAL_CMS_STATE.domains,
    navigation: (parsed.navigation && parsed.navigation.length > 0 && parsed.navigation.some((n: any) => n.children))
      ? parsed.navigation
      : INITIAL_CMS_STATE.navigation,
    sections: (parsed.sections && parsed.sections.length > 0)
      ? parsed.sections
      : INITIAL_CMS_STATE.sections,
    mediaSlots: {
      ...INITIAL_CMS_STATE.mediaSlots,
      ...(parsed.mediaSlots || {})
    },
    brand: {
      ...INITIAL_CMS_STATE.brand,
      ...(parsed.brand || {})
    },
    contact: {
      ...INITIAL_CMS_STATE.contact,
      ...(parsed.contact || {})
    },
    seo: {
      ...INITIAL_CMS_STATE.seo,
      ...(parsed.seo || {})
    }
  };
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
        const parsed = JSON.parse(data);
        return mergeWithInitialState(parsed);
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
        const parsed = JSON.parse(data);
        return mergeWithInitialState(parsed);
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

    const published: CMSState = {
      ...draft,
      status: 'published',
      lastPublishedAt: new Date().toISOString(),
      lastSavedAt: new Date().toISOString(),
      version: draft.version + 1
    };

    this.savePublishedState(published);
    this.saveDraftState(published);
    notifyListeners();
    return { success: true, issues };
  },

  discardDraft(): void {
    const published = this.getPublishedState();
    this.saveDraftState(published);
    notifyListeners();
  },

  resetToFactory(): void {
    localStorage.removeItem(STORAGE_KEY_PUBLISHED);
    localStorage.removeItem(STORAGE_KEY_DRAFT);
    this.savePublishedState(INITIAL_CMS_STATE);
    this.saveDraftState(INITIAL_CMS_STATE);
    notifyListeners();
  },

  async uploadFile(file: File): Promise<MediaItem> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const newMedia: MediaItem = {
          id: `media_${Date.now()}`,
          filename: file.name,
          url: base64,
          alt: file.name.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' '),
          fileSize: `${Math.round(file.size / 1024)} KB`,
          mediaType: (file.type as any) || 'image/png',
          uploadedAt: new Date().toISOString()
        };

        const draft = this.getDraftState();
        const updated = {
          ...draft,
          mediaLibrary: [newMedia, ...draft.mediaLibrary]
        };
        this.saveDraftState(updated);
        resolve(newMedia);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  calculateCompleteness(state: CMSState): { overall: number; contentScore: number; mediaScore: number; brandingScore: number } {
    let contentFilled = 0;
    const contentTotal = 5;
    if (state.content.hero.headline) contentFilled++;
    if (state.content.about.heading) contentFilled++;
    if (state.content.promise.heading) contentFilled++;
    if (state.content.preparation.heading) contentFilled++;
    if (state.content.cta.headline) contentFilled++;

    const contentScore = Math.round((contentFilled / contentTotal) * 100);

    const totalSlots = Object.keys(state.mediaSlots).length;
    const assignedSlots = Object.values(state.mediaSlots).filter(s => !!s.desktopImageId).length;
    const mediaScore = totalSlots > 0 ? Math.round((assignedSlots / totalSlots) * 100) : 100;

    let brandingFilled = 0;
    if (state.brand.primaryColor) brandingFilled++;
    if (state.brand.logoSlotId) brandingFilled++;
    const brandingScore = Math.round((brandingFilled / 2) * 100);

    const overall = Math.round((contentScore + mediaScore + brandingScore) / 3);

    return { overall, contentScore, mediaScore, brandingScore };
  },

  validateState(state: CMSState): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check Hero text
    if (!state.content.hero.headline || state.content.hero.headline.trim() === '') {
      issues.push({
        id: 'hero_headline_empty',
        type: 'error',
        category: 'Hero Section',
        message: 'Hero headline cannot be empty.',
        fieldId: 'hero_headline'
      });
    }

    // Check Products
    if (!state.products || state.products.length === 0) {
      issues.push({
        id: 'products_empty',
        type: 'warning',
        category: 'Products',
        message: 'No products are defined in the catalogue.'
      });
    }

    state.products.forEach(p => {
      if (!p.name || p.name.trim() === '') {
        issues.push({
          id: `product_${p.id}_name_empty`,
          type: 'error',
          category: 'Products',
          message: `Product (ID: ${p.id}) must have a name.`
        });
      }
      if (!p.packSizes || p.packSizes.length === 0) {
        issues.push({
          id: `product_${p.id}_packs_empty`,
          type: 'warning',
          category: 'Products',
          message: `Product "${p.name}" has no pack sizes configured.`
        });
      }
    });

    // Check Media Slots
    Object.values(state.mediaSlots).forEach(slot => {
      if (!slot.desktopImageId) {
        issues.push({
          id: `slot_${slot.slotKey}_unassigned`,
          type: 'warning',
          category: 'Media Slots',
          message: `Slot "${slot.label}" has no desktop image assigned.`
        });
      }
    });

    return issues;
  }
};
