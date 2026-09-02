export type ObjectFitMode = 'cover' | 'contain' | 'fill' | 'scale-down';

export type LanguageCode = 'en' | 'mr';

export interface LocalizedString {
  en: string;
  mr: string;
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  alt: string;
  caption?: string;
  dimensions?: { width: number; height: number };
  fileSize?: string;
  mediaType: 'image/png' | 'image/jpeg' | 'image/webp' | 'image/svg+xml';
  uploadedAt: string;
  sourceWebsite?: string;
  photographer?: string;
  license?: string;
}

export interface MediaSlot {
  id: string;
  slotKey: string;
  label: string;
  description: string;
  category: 'brand' | 'hero' | 'story' | 'heritage' | 'craft' | 'tea' | 'experience' | 'contact' | 'footer';
  desktopImageId: string;
  mobileImageId?: string;
  focalX: number; // 0 to 100
  focalY: number; // 0 to 100
  mobileFocalX?: number; // 0 to 100
  mobileFocalY?: number; // 0 to 100
  objectFit: ObjectFitMode;
  aspectRatioHint?: string; // e.g. "16:9", "1:1", "4:3", "21:9"
}

export interface NavigationItem {
  id: string;
  label: LocalizedString;
  url: string;
  isExternal: boolean;
  isButton: boolean;
  isEnabled: boolean;
  order: number;
}

export interface MilestoneItem {
  year: string;
  title: LocalizedString;
  description: LocalizedString;
  imageSlotId?: string;
}

export interface ProcessStepItem {
  id: number;
  titleEn: string;
  titleMr: string;
  descEn: string;
  descMr: string;
}

export interface CraftStageItem {
  stageNumber: number; // 1 to 5
  tagline: LocalizedString; // e.g. "01 — SOURCE" / "०१ — स्त्रोत"
  title: LocalizedString;
  description: LocalizedString;
  imageSlotId: string;
  keyDetails?: LocalizedString[];
}

export interface ProductCategoryItem {
  id: string;
  slug: string;
  name: LocalizedString;
  order: number;
  isVisible: boolean;
}

export interface TeaStoryItem {
  id: string;
  slug: string;
  name: LocalizedString;
  tagline: LocalizedString;
  category: 'gud' | 'sugar' | 'premixes';
  categoryName: LocalizedString;
  shortDescription: LocalizedString;
  editorialStory: LocalizedString;
  tastingNotes: LocalizedString[];
  ingredients: LocalizedString[];
  origin: LocalizedString;
  servingRitual: LocalizedString;
  imageSlotId: string;
  displayOrder: number;
  isFeatured: boolean;
  isVisible: boolean;
  badgeText?: LocalizedString;
}

export interface WhyLataPillar {
  title: LocalizedString;
  description: LocalizedString;
  metric?: string;
  icon?: string;
}

export interface EditorialStoryContent {
  hero: {
    headline: LocalizedString;
    subheadline: LocalizedString;
    tagline: LocalizedString;
    primaryCtaText: LocalizedString;
    primaryCtaLink: string;
    secondaryCtaText: LocalizedString;
    secondaryCtaLink: string;
    badgeText: LocalizedString;
  };
  story: {
    tagline: LocalizedString;
    heading: LocalizedString;
    subheading: LocalizedString;
    introduction: LocalizedString;
    paragraphs: LocalizedString[];
    quote: LocalizedString;
    imageSlotId: string;
  };
  heritage: {
    tagline: LocalizedString;
    heading: LocalizedString;
    subheading: LocalizedString;
    narrative: LocalizedString;
    milestones: MilestoneItem[];
    imageSlotId: string;
  };
  craft: {
    tagline: LocalizedString;
    heading: LocalizedString;
    subheading: LocalizedString;
    introduction: LocalizedString;
    stages: CraftStageItem[];
  };
  experience: {
    tagline: LocalizedString;
    heading: LocalizedString;
    subheading: LocalizedString;
    sensoryDescription: LocalizedString;
    ritualSteps: { title: LocalizedString; note: LocalizedString }[];
    imageSlotId: string;
  };
  whyLata: {
    tagline: LocalizedString;
    heading: LocalizedString;
    subheading: LocalizedString;
    pillars: WhyLataPillar[];
  };
  brandStatement: {
    quote: LocalizedString;
    subtext: LocalizedString;
    author: LocalizedString;
  };
  contact: {
    tagline: LocalizedString;
    heading: LocalizedString;
    subheading: LocalizedString;
    enquiryNotice: LocalizedString;
  };
  footer: {
    aboutText: LocalizedString;
    copyrightText: LocalizedString;
    legalLinks: { label: LocalizedString; url: string }[];
  };
}

export interface SectionConfig {
  id: string;
  key: string;
  name: string;
  description: string;
  isEnabled: boolean;
  order: number;
  bgType?: 'cream' | 'green' | 'amber' | 'white';
}

export interface BrandSettings {
  primaryColor: string; // e.g. "#1E3F20"
  secondaryColor: string; // e.g. "#8DB843"
  accentColor: string; // e.g. "#E58A1F"
  backgroundColor: string; // e.g. "#FAF6EE"
  textColor: string; // e.g. "#1A2416"
  logoSlotId: string;
  lightLogoSlotId: string;
  faviconSlotId?: string;
  fontHeading: string;
  fontBody: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
  twitter?: string;
  whatsapp?: string;
}

export interface ContactInfo {
  companyName: string;
  address: string;
  email: string;
  phone1: string;
  phone2: string;
  phone3: string;
  whatsapp: string;
  website: string;
  googleMapsUrl: string;
  socials: SocialLinks;
}

export interface SeoConfig {
  seoTitle: LocalizedString;
  metaDescription: LocalizedString;
  ogTitle: LocalizedString;
  ogDescription: LocalizedString;
  ogImageSlotId: string;
  canonicalUrl: string;
  robots: string;
}

export type DomainType = 'primary' | 'secondary' | 'redirect';

export type DomainStatus = 
  | 'PENDING'
  | 'DNS_CONFIGURATION_REQUIRED'
  | 'VERIFYING'
  | 'VERIFIED'
  | 'SSL_PROVISIONING'
  | 'ACTIVE'
  | 'ERROR';

export type SSLStatus = 'ACTIVE' | 'PENDING' | 'PROVISIONING' | 'ERROR';

export interface DNSRecord {
  type: 'A' | 'CNAME' | 'TXT';
  name: string;
  value: string;
  ttl?: string;
  status?: 'matched' | 'pending' | 'mismatched';
}

export interface DomainItem {
  id: string;
  hostname: string;
  type: DomainType;
  status: DomainStatus;
  isPrimary: boolean;
  redirectToPrimary?: boolean;
  sslStatus: SSLStatus;
  dnsRecords: DNSRecord[];
  registrar?: string;
  hostingProvider?: string;
  targetDestination: string;
  lastVerifiedAt?: string;
  errorMessage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CMSState {
  version: number;
  status: 'published' | 'draft';
  lastPublishedAt: string | null;
  lastSavedAt: string;
  defaultLanguage: LanguageCode;
  sections: SectionConfig[];
  navigation: NavigationItem[];
  teaStories: TeaStoryItem[];
  processSteps?: ProcessStepItem[];
  categories?: ProductCategoryItem[];
  domains: DomainItem[];
  mediaLibrary: MediaItem[];
  mediaSlots: Record<string, MediaSlot>;
  content: EditorialStoryContent;
  brand: BrandSettings;
  contact: ContactInfo;
  seo: SeoConfig;

  // Backward compatibility aliases if needed
  products?: TeaStoryItem[];
}

export interface ValidationIssue {
  id: string;
  type: 'error' | 'warning';
  category: string;
  message: string;
  fieldId?: string;
}


