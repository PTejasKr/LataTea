import { CMSState, MediaItem, MediaSlot, TeaStoryItem, ValidationIssue } from '../types/cms';
import { INITIAL_CMS_STATE } from '../data/defaultContent';

const STORAGE_KEY_PUBLISHED = 'latatea_cms_v9_pub';
const STORAGE_KEY_DRAFT = 'latatea_cms_v9_draft';

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
    defaultLanguage: parsed.defaultLanguage || 'en',
    content: {
      ...INITIAL_CMS_STATE.content,
      ...(parsed.content || {}),
      hero: {
        ...INITIAL_CMS_STATE.content.hero,
        ...((parsed.content && parsed.content.hero) || {})
      },
      story: {
        ...INITIAL_CMS_STATE.content.story,
        ...((parsed.content && parsed.content.story) || {})
      },
      heritage: {
        ...INITIAL_CMS_STATE.content.heritage,
        ...((parsed.content && parsed.content.heritage) || {})
      },
      craft: {
        ...INITIAL_CMS_STATE.content.craft,
        ...((parsed.content && parsed.content.craft) || {})
      },
      experience: {
        ...INITIAL_CMS_STATE.content.experience,
        ...((parsed.content && parsed.content.experience) || {})
      },
      whyLata: {
        ...INITIAL_CMS_STATE.content.whyLata,
        ...((parsed.content && parsed.content.whyLata) || {})
      },
      brandStatement: {
        ...INITIAL_CMS_STATE.content.brandStatement,
        ...((parsed.content && parsed.content.brandStatement) || {})
      },
      contact: {
        ...INITIAL_CMS_STATE.content.contact,
        ...((parsed.content && parsed.content.contact) || {})
      },
      footer: {
        ...INITIAL_CMS_STATE.content.footer,
        ...((parsed.content && parsed.content.footer) || {})
      }
    },
    sections: INITIAL_CMS_STATE.sections,
    navigation: INITIAL_CMS_STATE.navigation,
    teaStories: parsed.teaStories && parsed.teaStories.length > 0 ? parsed.teaStories : INITIAL_CMS_STATE.teaStories,
    categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : INITIAL_CMS_STATE.categories,
    domains: parsed.domains || INITIAL_CMS_STATE.domains,
    mediaLibrary: parsed.mediaLibrary || INITIAL_CMS_STATE.mediaLibrary,
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
      // Clean up legacy keys
      localStorage.removeItem('latatea_cms_v4_pub');
      localStorage.removeItem('latatea_cms_v4_draft');
      localStorage.removeItem('latatea_cms_story_v3_pub');
      localStorage.removeItem('latatea_cms_story_v3_draft');
      localStorage.removeItem('latatea_cms_pub_v2');
      localStorage.removeItem('latatea_cms_draft_v2');

      const data = localStorage.getItem(STORAGE_KEY_PUBLISHED);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && parsed.version === INITIAL_CMS_STATE.version) {
          return mergeWithInitialState(parsed);
        }
      }
    } catch (e) {
      console.error('Error reading published CMS state:', e);
    }
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
        if (parsed && parsed.version === INITIAL_CMS_STATE.version) {
          return mergeWithInitialState(parsed);
        }
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
      version: (draft.version || 3) + 1
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

  calculateCompleteness(state: CMSState): { 
    overall: number; 
    contentScore: number; 
    mediaScore: number; 
    languageScore: number;
  } {
    let contentFilled = 0;
    const contentTotal = 6;
    if (state.content.hero.headline.en) contentFilled++;
    if (state.content.story.heading.en) contentFilled++;
    if (state.content.heritage.heading.en) contentFilled++;
    if (state.content.craft.heading.en) contentFilled++;
    if (state.content.experience.heading.en) contentFilled++;
    if (state.content.brandStatement.quote.en) contentFilled++;

    const contentScore = Math.round((contentFilled / contentTotal) * 100);

    const totalSlots = Object.keys(state.mediaSlots).length;
    const assignedSlots = Object.values(state.mediaSlots).filter(s => !!s.desktopImageId).length;
    const mediaScore = totalSlots > 0 ? Math.round((assignedSlots / totalSlots) * 100) : 100;

    // Language Completeness (Marathi coverage)
    let marathiFilled = 0;
    let marathiTotal = 6;
    if (state.content.hero.headline.mr) marathiFilled++;
    if (state.content.story.heading.mr) marathiFilled++;
    if (state.content.heritage.heading.mr) marathiFilled++;
    if (state.content.craft.heading.mr) marathiFilled++;
    if (state.content.experience.heading.mr) marathiFilled++;
    if (state.content.brandStatement.quote.mr) marathiFilled++;

    const languageScore = Math.round((marathiFilled / marathiTotal) * 100);
    const overall = Math.round((contentScore + mediaScore + languageScore) / 3);

    return { overall, contentScore, mediaScore, languageScore };
  },

  validateState(state: CMSState): ValidationIssue[] {
    const issues: ValidationIssue[] = [];

    // Check Hero text
    if (!state.content.hero.headline.en || state.content.hero.headline.en.trim() === '') {
      issues.push({
        id: 'hero_headline_empty',
        type: 'error',
        category: 'Hero Section',
        message: 'Hero headline (English) cannot be empty.',
        fieldId: 'hero_headline'
      });
    }

    // Check Tea Stories
    if (!state.teaStories || state.teaStories.length === 0) {
      issues.push({
        id: 'tea_stories_empty',
        type: 'warning',
        category: 'Tea Stories',
        message: 'No tea stories are present in the collection.'
      });
    }

    (state.teaStories || []).forEach(t => {
      if (!t.name.en || t.name.en.trim() === '') {
        issues.push({
          id: `tea_${t.id}_name_empty`,
          type: 'error',
          category: 'Tea Stories',
          message: `Tea Story (ID: ${t.id}) must have an English name.`
        });
      }
      if (!t.name.mr || t.name.mr.trim() === '') {
        issues.push({
          id: `tea_${t.id}_name_mr_empty`,
          type: 'warning',
          category: 'Tea Stories',
          message: `Tea Story "${t.name.en}" is missing Marathi translation.`
        });
      }
    });

    return issues;
  }
};
