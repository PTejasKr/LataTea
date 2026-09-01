export type ObjectFitMode = 'cover' | 'contain' | 'fill' | 'scale-down';

export type ProductCategory = 'gud' | 'sugar' | 'vending';

export interface PackSizePrice {
  size: string; // e.g. "16g Sachet", "160g Pack", "1kg Pack"
  price: number; // e.g. 3.5, 25, 150
  inStock: boolean;
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
  category: 'brand' | 'hero' | 'about' | 'products' | 'solutions' | 'story' | 'preparation' | 'cta' | 'footer';
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
  label: string;
  url: string;
  isExternal: boolean;
  isButton: boolean;
  isEnabled: boolean;
  order: number;
  children?: { label: string; url: string; description?: string; badge?: string }[];
}

export interface ProductItem {
  id: string;
  slug: string; // e.g. "gud-basundi-tea"
  name: string;
  category: ProductCategory;
  categoryName: string;
  shortDescription: string;
  fullDescription: string;
  imageSlotId: string;
  alternateImageSlotIds?: string[];
  packSizes: PackSizePrice[];
  applications: string[];
  features?: string[];
  ingredients?: string[];
  preparationNote?: string;
  displayOrder: number;
  isFeatured: boolean;
  isVisible: boolean;
  badgeText?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface SolutionItem {
  id: string;
  slug: string; // e.g. "corporate", "hotels", "restaurants", "cafes", "retail", "vending"
  title: string;
  subtitle: string;
  tagline: string;
  targetAudience: string;
  problemStatement: string;
  lataSolution: string;
  benefits: { title: string; description: string; icon: string }[];
  recommendedProductIds: string[];
  bannerSlotId: string;
  applicationSteps: { stepNumber: number; title: string; instruction: string }[];
  icon: string;
  isEnabled: boolean;
  displayOrder: number;
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

export interface RegistrationDetails {
  fssai?: string;
  iec?: string;
  gst?: string;
}

export interface PaymentDetails {
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
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
  registration: RegistrationDetails;
  payment: PaymentDetails;
}

export interface SeoConfig {
  seoTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImageSlotId: string;
  canonicalUrl: string;
  robots: string;
}

export interface HighlightItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ApplicationItem {
  id: string;
  title: string;
  description: string;
  imageSlotId: string;
  icon: string;
}

export interface PreparationStep {
  stepNumber: number;
  title: string;
  instruction: string;
  imageSlotId: string;
}

export interface OrderingStep {
  stepNumber: number;
  title: string;
  description: string;
  icon: string;
}

export interface WebsiteContent {
  hero: {
    headline: string;
    subheadline: string;
    tagline: string;
    ctaPrimaryText: string;
    ctaPrimaryLink: string;
    ctaSecondaryText: string;
    ctaSecondaryLink: string;
    badgeText: string;
  };
  promise: {
    tagline: string;
    heading: string;
    subheading: string;
    pillars: { title: string; description: string; metric?: string }[];
  };
  about: {
    tagline: string;
    heading: string;
    subheading: string;
    storyParagraphs: string[];
    highlights: HighlightItem[];
  };
  applications: {
    tagline: string;
    heading: string;
    subheading: string;
    items: ApplicationItem[];
  };
  ourStory: {
    heroTitle: string;
    heroSubtitle: string;
    origins: string;
    philosophy: string;
    craftAndSpices: string;
    modernStandards: string;
  };
  preparation: {
    tagline: string;
    heading: string;
    subheading: string;
    yieldText: string;
    ingredients: { name: string; quantity: string; icon: string }[];
    steps: PreparationStep[];
    footerNote: string;
  };
  ordering: {
    tagline: string;
    heading: string;
    subheading: string;
    steps: OrderingStep[];
    footerNote: string;
  };
  cta: {
    headline: string;
    subheadline: string;
    primaryButtonText: string;
    primaryButtonLink: string;
    secondaryButtonText: string;
    secondaryButtonLink: string;
    backgroundImageSlotId: string;
  };
  footer: {
    aboutText: string;
    copyrightText: string;
    legalLinks: { label: string; url: string }[];
  };
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
  sections: SectionConfig[];
  navigation: NavigationItem[];
  products: ProductItem[];
  solutions: SolutionItem[];
  domains: DomainItem[];
  mediaLibrary: MediaItem[];
  mediaSlots: Record<string, MediaSlot>;
  content: WebsiteContent;
  brand: BrandSettings;
  contact: ContactInfo;
  seo: SeoConfig;
}

export interface ValidationIssue {
  id: string;
  type: 'error' | 'warning';
  category: string;
  message: string;
  fieldId?: string;
}

