import { CMSState, MediaSlot, NavigationItem, ProductItem, SectionConfig } from '../types/cms';
import { DEFAULT_MEDIA_ITEMS } from './defaultMediaAssets';

export const DEFAULT_MEDIA_SLOTS: Record<string, MediaSlot> = {
  BRAND_LOGO_PRIMARY: {
    id: 'slot_logo_primary',
    slotKey: 'BRAND_LOGO_PRIMARY',
    label: 'Brand Crest Logo (Primary)',
    description: 'Main logo shown in the navbar, header, and official crest cards.',
    category: 'brand',
    desktopImageId: 'media_logo_primary',
    mobileImageId: 'media_logo_primary',
    focalX: 50,
    focalY: 50,
    mobileFocalX: 50,
    mobileFocalY: 50,
    objectFit: 'contain',
    aspectRatioHint: '16:9'
  },
  BRAND_LOGO_LIGHT: {
    id: 'slot_logo_light',
    slotKey: 'BRAND_LOGO_LIGHT',
    label: 'Brand Logo (Light Monochrome)',
    description: 'Clean monochrome/light variant for saturated dark backgrounds.',
    category: 'brand',
    desktopImageId: 'media_logo_light',
    focalX: 50,
    focalY: 50,
    objectFit: 'contain',
    aspectRatioHint: '16:9'
  },
  HOME_HERO_PRIMARY: {
    id: 'slot_hero_primary',
    slotKey: 'HOME_HERO_PRIMARY',
    label: 'Homepage Hero Backdrop (Royal Heritage)',
    description: 'Main panoramic backdrop featuring copper ware, fresh tea leaves, and spices.',
    category: 'hero',
    desktopImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    mobileFocalX: 50,
    mobileFocalY: 50,
    objectFit: 'cover',
    aspectRatioHint: '21:9'
  },
  ABOUT_IMAGE_PRIMARY: {
    id: 'slot_about_primary',
    slotKey: 'ABOUT_IMAGE_PRIMARY',
    label: 'About / Heritage Tea Bowl Visual',
    description: 'Ornate antique copper bowl with master blend tea and aromatics.',
    category: 'about',
    desktopImageId: 'media_royal_bowl',
    focalX: 50,
    focalY: 45,
    objectFit: 'cover',
    aspectRatioHint: '1:1'
  },
  CTA_BACKGROUND: {
    id: 'slot_cta_bg',
    slotKey: 'CTA_BACKGROUND',
    label: 'Call to Action Banner Background',
    description: 'Panoramic tea & spice backdrop for bottom wholesale inquiry banner.',
    category: 'cta',
    desktopImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 55,
    objectFit: 'cover',
    aspectRatioHint: '21:9'
  }
};

export const DEFAULT_NAVIGATION: NavigationItem[] = [
  { id: 'nav_home', label: 'HOME', url: '#hero', isExternal: false, isButton: false, isEnabled: true, order: 1 },
  { id: 'nav_about', label: 'ABOUT US', url: '#about', isExternal: false, isButton: false, isEnabled: true, order: 2 },
  { id: 'nav_products', label: 'PRODUCTS & PRICING', url: '#products', isExternal: false, isButton: false, isEnabled: true, order: 3 },
  { id: 'nav_applications', label: 'APPLICATIONS', url: '#applications', isExternal: false, isButton: false, isEnabled: true, order: 4 },
  { id: 'nav_preparation', label: 'PREPARATION', url: '#preparation', isExternal: false, isButton: false, isEnabled: true, order: 5 },
  { id: 'nav_ordering', label: 'ORDERING', url: '#ordering', isExternal: false, isButton: false, isEnabled: true, order: 6 },
  { id: 'nav_track', label: 'TRACK ORDER', url: '#track-order', isExternal: false, isButton: false, isEnabled: true, order: 7 },
  { id: 'nav_contact', label: 'CONTACT US', url: '#contact', isExternal: false, isButton: false, isEnabled: true, order: 8 }
];

export const DEFAULT_SECTIONS: SectionConfig[] = [
  { id: 'sec_hero', key: 'hero', name: 'Hero Royal Showcase', description: 'Headline, heritage tea backdrop, and CTAs', isEnabled: true, order: 1, bgType: 'green' },
  { id: 'sec_about', key: 'about', name: 'Brand Story & Rajwada Heritage', description: 'Brewing Tea As You Like It narrative & quality highlights', isEnabled: true, order: 2, bgType: 'cream' },
  { id: 'sec_products', key: 'products', name: 'Product Catalog & Pricing Matrix', description: 'Single consolidated showcase for Gud, Sugar, and Vending ranges', isEnabled: true, order: 3, bgType: 'white' },
  { id: 'sec_applications', key: 'applications', name: 'Ideal Applications (HoReCa & Retail)', description: 'Offices, Hotels, Restaurants, Cafes, Retail, Vending', isEnabled: true, order: 4, bgType: 'cream' },
  { id: 'sec_preparation', key: 'preparation', name: '6-Step Preparation Recipe', description: 'Illustrated step-by-step brewing guide with exact measures', isEnabled: true, order: 5, bgType: 'white' },
  { id: 'sec_ordering', key: 'ordering', name: '7-Step Ordering Roadmap', description: 'Large intuitive process tabs from inquiry to after-sales care', isEnabled: true, order: 6, bgType: 'cream' },
  { id: 'sec_track', key: 'track', name: 'Universal Order Tracking', description: 'Live tracking portal for domestic & institutional consignments', isEnabled: true, order: 7, bgType: 'white' },
  { id: 'sec_cta', key: 'cta', name: 'Wholesale & Sample CTA', description: 'High-conversion banner with quick quote modal', isEnabled: true, order: 8, bgType: 'green' },
  { id: 'sec_contact', key: 'contact', name: 'Contact & Registration Info', description: 'Address, phone, GST, FSSAI, banking (only displays if set)', isEnabled: true, order: 9, bgType: 'cream' },
  { id: 'sec_footer', key: 'footer', name: 'Footer', description: 'Navigation links, legal disclaimers, and copyright', isEnabled: true, order: 10, bgType: 'green' }
];

export const DEFAULT_PRODUCTS: ProductItem[] = [
  // --- Gud Tea Range ---
  {
    id: 'prod_gud_basundi',
    name: 'Gud Basundi Tea',
    category: 'gud',
    categoryName: 'Gud Tea Range',
    shortDescription: 'Rich traditional tea infused with pure organic jaggery and basundi richness.',
    fullDescription: 'Crafted with premium tea leaves and natural jaggery sweetness, Lata Gud Basundi Tea offers authentic warmth and immunity-boosting taste with zero refined sugar.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Sachet', price: 3.5, inStock: true },
      { size: '160g Pack', price: 25.0, inStock: true },
      { size: '1kg Pack', price: 150.0, inStock: true }
    ],
    applications: ['Offices', 'Hotels', 'Restaurants', 'Cafés', 'Retail Stores'],
    displayOrder: 1,
    isFeatured: true,
    isVisible: true,
    badgeText: 'Natural Jaggery',
    ingredients: ['CTC Tea Leaf Extract', 'Organic Jaggery Powder', 'Dairy Solid Extracts', 'Cardamom Essence']
  },
  {
    id: 'prod_gud_elaichi_basundi',
    name: 'Gud Elaichi Basundi',
    category: 'gud',
    categoryName: 'Gud Tea Range',
    shortDescription: 'Aromatic green cardamom paired with wholesome organic jaggery goodness.',
    fullDescription: 'The royal flavor of fragrant Malabar cardamom blended seamlessly with sweet creamy jaggery basundi notes for an exquisite cup.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Sachet', price: 3.75, inStock: true },
      { size: '160g Pack', price: 26.5, inStock: true },
      { size: '1kg Pack', price: 160.0, inStock: true }
    ],
    applications: ['Cafés', 'Restaurants', 'Retail Stores', 'Offices'],
    displayOrder: 2,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Cardamom Infused',
    ingredients: ['Premium Tea Extract', 'Natural Jaggery', 'Crushed Green Cardamom', 'Milk Solids']
  },
  {
    id: 'prod_gud_kadak_basundi',
    name: 'Gud Kadak Basundi',
    category: 'gud',
    categoryName: 'Gud Tea Range',
    shortDescription: 'Strong, robust tea blend with the bold energy of natural jaggery.',
    fullDescription: 'For chai lovers who demand an extra-strong kick without sacrificing the health benefits of authentic Indian gud.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Sachet', price: 3.8, inStock: true },
      { size: '160g Pack', price: 28.0, inStock: true },
      { size: '1kg Pack', price: 170.0, inStock: true }
    ],
    applications: ['Offices', 'HoReCa', 'Vending'],
    displayOrder: 3,
    isFeatured: true,
    isVisible: true,
    badgeText: 'Strong Brew',
    ingredients: ['Extra Strong Assam Tea Blend', 'Pure Jaggery Extract', 'Dairy Solids']
  },
  {
    id: 'prod_gud_elaichi_kadak_basundi',
    name: 'Gud Elaichi Kadak Basundi',
    category: 'gud',
    categoryName: 'Gud Tea Range',
    shortDescription: 'The ultimate signature combination of strong brew, fragrant cardamom, and jaggery.',
    fullDescription: 'Our master blend marrying bold brisk tea, fragrant cardamom aromas, and velvety natural jaggery richness.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Sachet', price: 4.0, inStock: true },
      { size: '160g Pack', price: 29.5, inStock: true },
      { size: '1kg Pack', price: 180.0, inStock: true }
    ],
    applications: ['Restaurants', 'Hotels', 'Retail', 'Cafés'],
    displayOrder: 4,
    isFeatured: true,
    isVisible: true,
    badgeText: 'Master Blend',
    ingredients: ['Assam CTC Granules', 'Royal Cardamom Pods', 'Organic Jaggery Powder', 'Whole Milk Essence']
  },

  // --- Sugar Tea Range ---
  {
    id: 'prod_sugar_basundi',
    name: 'Sugar Basundi Tea',
    category: 'sugar',
    categoryName: 'Sugar Tea Range',
    shortDescription: 'Classic creamy basundi tea crafted for everyday perfection and instant joy.',
    fullDescription: 'Traditional Indian chai taste loved by millions, formulated with refined cane sugar and rich basundi body for smooth satisfaction.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Sachet', price: 3.5, inStock: true },
      { size: '160g Pack', price: 25.0, inStock: true },
      { size: '1kg Pack', price: 150.0, inStock: true }
    ],
    applications: ['Offices', 'Hotels', 'Restaurants', 'Retail Stores'],
    displayOrder: 5,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Classic Choice',
    ingredients: ['Tea Solids', 'Pure Sugar', 'Milk Solids']
  },
  {
    id: 'prod_sugar_elaichi_basundi',
    name: 'Sugar Elaichi Basundi',
    category: 'sugar',
    categoryName: 'Sugar Tea Range',
    shortDescription: 'Fragrant elaichi chai with balanced sweetness and silky texture.',
    fullDescription: 'Every sip delivers the comforting aroma of handpicked cardamom and silky tea creaminess.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Sachet', price: 3.75, inStock: true },
      { size: '160g Pack', price: 26.5, inStock: true },
      { size: '1kg Pack', price: 160.0, inStock: true }
    ],
    applications: ['Cafés', 'Hotels', 'Offices'],
    displayOrder: 6,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Popular',
    ingredients: ['Tea Extract', 'Fine Sugar', 'Natural Elaichi Flavor', 'Dairy Solids']
  },
  {
    id: 'prod_sugar_kadak_basundi',
    name: 'Sugar Kadak Basundi',
    category: 'sugar',
    categoryName: 'Sugar Tea Range',
    shortDescription: 'Deep amber, brisk tea brew packed with energizing kadak flavor.',
    fullDescription: 'Engineered for high energy breaks at work and hospitality lounges, delivering heavy body and invigorating flavor.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Sachet', price: 3.8, inStock: true },
      { size: '160g Pack', price: 28.0, inStock: true },
      { size: '1kg Pack', price: 170.0, inStock: true }
    ],
    applications: ['Offices', 'Vending', 'HoReCa'],
    displayOrder: 7,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Kadak Chai',
    ingredients: ['Selected CTC Tea', 'Sugar', 'Milk Solids']
  },
  {
    id: 'prod_sugar_elaichi_kadak_basundi',
    name: 'Sugar Elaichi Kadak Basundi',
    category: 'sugar',
    categoryName: 'Sugar Tea Range',
    shortDescription: 'Robust briskness infused with authentic cardamom spice and smooth sweetness.',
    fullDescription: 'The perfect harmony of strong tea punch, aromatic spice bouquet, and comforting sweetness.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Sachet', price: 4.0, inStock: true },
      { size: '160g Pack', price: 29.5, inStock: true },
      { size: '1kg Pack', price: 180.0, inStock: true }
    ],
    applications: ['Restaurants', 'Retail Stores', 'Hotels'],
    displayOrder: 8,
    isFeatured: true,
    isVisible: true,
    badgeText: 'Specialty',
    ingredients: ['Strong Tea Extract', 'Elaichi Powder', 'Cane Sugar', 'Creamer']
  },

  // --- Vending Premix Range ---
  {
    id: 'prod_masala_premix',
    name: 'Masala Tea Premix',
    category: 'vending',
    categoryName: 'Vending Machine Premix',
    shortDescription: 'Instant authentic masala chai premix optimized for automatic vending dispensers.',
    fullDescription: 'Formulated with ginger, cinnamon, clove, and black pepper notes for rapid, lump-free dispensing in modern vending equipment.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '14g Sachet', price: 3.4, inStock: true },
      { size: '140g Pack', price: 22.0, inStock: true },
      { size: '1kg Pack', price: 170.0, inStock: true }
    ],
    applications: ['Offices', 'Vending Machines', 'Cafés', 'Hotels'],
    displayOrder: 9,
    isFeatured: true,
    isVisible: true,
    badgeText: 'Vending Ready',
    ingredients: ['Soluble Tea Powder', 'Spice Blend (Ginger, Cinnamon, Clove)', 'Milk Solids', 'Sugar']
  },
  {
    id: 'prod_elaichi_premix',
    name: 'Elaichi Tea Premix',
    category: 'vending',
    categoryName: 'Vending Machine Premix',
    shortDescription: 'Instant aromatic elaichi tea premix for single-touch refreshment.',
    fullDescription: 'Instant flow formula that produces a frothy, fragrant cardamom tea in seconds through automatic machines or manual hot water stir.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '14g Sachet', price: 3.4, inStock: true },
      { size: '140g Pack', price: 22.0, inStock: true },
      { size: '1kg Pack', price: 170.0, inStock: true }
    ],
    applications: ['Vending Machines', 'Corporate Offices', 'Transit Hubs'],
    displayOrder: 10,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Vending Ready',
    ingredients: ['Instant Tea', 'Cardamom Extract', 'Dairy Solids', 'Sugar']
  },
  {
    id: 'prod_ginger_premix',
    name: 'Ginger Tea Premix',
    category: 'vending',
    categoryName: 'Vending Machine Premix',
    shortDescription: 'Zesty adrak chai premix with soothing throat warmth and sharp aroma.',
    fullDescription: 'Real dried ginger extract combined with rich tea solids for a soothing, revitalizing hot beverage.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '14g Sachet', price: 3.4, inStock: true },
      { size: '140g Pack', price: 22.0, inStock: true },
      { size: '1kg Pack', price: 170.0, inStock: true }
    ],
    applications: ['Offices', 'Hotels', 'Vending Machines'],
    displayOrder: 11,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Adrak Special',
    ingredients: ['Natural Ginger Powder', 'Instant Tea', 'Dairy Creamer', 'Sugar']
  },
  {
    id: 'prod_latte_premix',
    name: 'Latte Coffee Premix',
    category: 'vending',
    categoryName: 'Vending Machine Premix',
    shortDescription: 'Smooth, creamy instant latte with balanced roast notes and velvet foam.',
    fullDescription: 'Premium coffee extract blended with rich milk powders for a European style café latte experience at office speed.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '14g Sachet', price: 3.4, inStock: true },
      { size: '140g Pack', price: 22.0, inStock: true },
      { size: '1kg Pack', price: 170.0, inStock: true }
    ],
    applications: ['Offices', 'Cafés', 'Vending Machines', 'Hotels'],
    displayOrder: 12,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Café Quality',
    ingredients: ['Microground Coffee', 'Spray Dried Dairy Base', 'Sugar']
  },
  {
    id: 'prod_cappuccino_premix',
    name: 'Cappuccino Coffee Premix',
    category: 'vending',
    categoryName: 'Vending Machine Premix',
    shortDescription: 'Frothy, full-bodied Italian-style cappuccino premix with rich cocoa undertones.',
    fullDescription: 'Dense frothy head, aromatic roasted coffee notes, and indulgent creaminess in every single dispense.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '14g Sachet', price: 3.4, inStock: true },
      { size: '140g Pack', price: 22.0, inStock: true },
      { size: '1kg Pack', price: 170.0, inStock: true }
    ],
    applications: ['Vending Machines', 'Offices', 'Hotels', 'Lounges'],
    displayOrder: 13,
    isFeatured: true,
    isVisible: true,
    badgeText: 'Rich Foam',
    ingredients: ['Roasted Coffee Extract', 'Frothing Dairy Solids', 'Fine Cane Sugar']
  }
];

export const INITIAL_CMS_STATE: CMSState = {
  version: 2,
  status: 'published',
  lastPublishedAt: '2026-09-01T01:00:00.000Z',
  lastSavedAt: '2026-09-01T01:00:00.000Z',
  sections: DEFAULT_SECTIONS,
  navigation: DEFAULT_NAVIGATION,
  products: DEFAULT_PRODUCTS,
  mediaLibrary: DEFAULT_MEDIA_ITEMS,
  mediaSlots: DEFAULT_MEDIA_SLOTS,
  brand: {
    primaryColor: '#1E3F20',
    secondaryColor: '#8DB843',
    accentColor: '#E58A1F',
    backgroundColor: '#FAF6EE',
    textColor: '#1A2416',
    logoSlotId: 'BRAND_LOGO_PRIMARY',
    lightLogoSlotId: 'BRAND_LOGO_LIGHT',
    faviconSlotId: 'BRAND_LOGO_PRIMARY',
    fontHeading: "'Rozha One', 'Cinzel', serif",
    fontBody: "'Plus Jakarta Sans', 'Inter', sans-serif"
  },
  content: {
    hero: {
      headline: 'Authentic Taste. Consistent Quality.',
      subheadline: 'Rajwada Royal Chai Heritage & Instant Basundi Convenience',
      tagline: 'AUTHENTIC TASTE • CONSISTENT QUALITY • INSTANT CONVENIENCE',
      ctaPrimaryText: 'Explore Tea Range',
      ctaPrimaryLink: '#products',
      ctaSecondaryText: 'Order Online / Samples',
      ctaSecondaryLink: '#products',
      badgeText: '100% Traditional Goodness'
    },
    about: {
      tagline: 'WHY CHOOSE LATA?',
      heading: 'BREWING TEA AS YOU LIKE IT!',
      subheading: 'Crafted with masterfully blended Assam tea leaves, natural organic jaggery (Gud), crushed green cardamom, and rich basundi body.',
      storyParagraphs: [
        'Lata Tea represents the pinnacle of Indian royal tea tradition. Every blend is formulated with selected whole-spice aromatics, authentic jaggery goodness, and rich creamy textures to deliver an unmatched culinary tea experience.',
        'With precision recipes manufactured in state-of-the-art cleanroom facilities, Lata guarantees the same golden, frothy, comforting cup in every household, corporate office, and luxury hotel lounge.'
      ],
      highlights: [
        { id: 'h1', title: 'Premium Quality Ingredients', description: 'Assam CTC tea leaves, natural organic jaggery, and royal Malabar spices.', icon: 'Leaf' },
        { id: 'h2', title: 'Consistent Taste in Every Cup', description: 'Precision formulation guarantees identical rich aroma and mouthfeel daily.', icon: 'Award' },
        { id: 'h3', title: 'Easy & Quick Preparation', description: 'Brew a velvety, steaming batch in under 3 minutes with zero guesswork.', icon: 'Clock' },
        { id: 'h4', title: 'Ideal for Retail & HoReCa', description: 'Versatile packaging for countertop sachets, consumer packs, and bulk catering.', icon: 'Store' },
        { id: 'h5', title: 'Suitable for Vending', description: 'Free-flowing premix dissolves instantly without residue or clogging.', icon: 'Cpu' },
        { id: 'h6', title: 'Hygienically Manufactured', description: 'Packaged in ISO & FSSAI certified cleanroom facilities for absolute purity.', icon: 'ShieldCheck' }
      ]
    },
    applications: {
      tagline: 'VERSATILE HOSPITALITY & RETAIL SOLUTIONS',
      heading: 'DESIGNED FOR EVERY SETTING',
      subheading: 'Whether for daily corporate tea breaks, luxury hotel dining, or convenient on-the-go vending.',
      items: [
        { id: 'app_offices', title: 'Corporate Offices', description: 'Boost team productivity with quick, delicious tea and coffee in breakrooms.', imageSlotId: 'HOME_HERO_PRIMARY', icon: 'Building2' },
        { id: 'app_hotels', title: 'Hotels & Banquets', description: 'Deliver consistent high-end beverage service for morning buffets and room service.', imageSlotId: 'HOME_HERO_PRIMARY', icon: 'Hotel' },
        { id: 'app_restaurants', title: 'Fine Restaurants', description: 'Pair traditional Indian meals with rich Gud Basundi and spice tea desserts.', imageSlotId: 'HOME_HERO_PRIMARY', icon: 'UtensilsCrossed' },
        { id: 'app_cafes', title: 'Modern Cafés', description: 'Expand your artisan menu with authentic regional jaggery chai recipes.', imageSlotId: 'HOME_HERO_PRIMARY', icon: 'Coffee' },
        { id: 'app_retail', title: 'Retail & Supermarkets', description: 'Eye-catching standee pouches and consumer sachets with high margin velocity.', imageSlotId: 'ABOUT_IMAGE_PRIMARY', icon: 'ShoppingBag' },
        { id: 'app_vending', title: 'Vending Operators', description: 'High-yield, moisture-resistant powders tailored for 2-lane to 4-lane machines.', imageSlotId: 'HOME_HERO_PRIMARY', icon: 'Zap' }
      ]
    },
    preparation: {
      tagline: 'PERFECT PREPARATION GUIDE',
      heading: 'HOW TO BREW LATA TEA MIX',
      subheading: 'Master the authentic taste with our proven 160g batch recipe for family gatherings or office groups.',
      yieldText: 'Batch: 160g Tea Mix • Yields: 6-8 Generous Servings',
      ingredients: [
        { name: 'Pure Water', quantity: '400 ml', icon: 'Droplets' },
        { name: 'Fresh Milk', quantity: '400 ml', icon: 'Milk' },
        { name: 'Lata Tea Mix', quantity: '160 g', icon: 'Sparkles' }
      ],
      steps: [
        { stepNumber: 1, title: 'Boil Water', instruction: 'Boil 400 ml of fresh drinking water in a stainless steel saucepan.', imageSlotId: 'HOME_HERO_PRIMARY' },
        { stepNumber: 2, title: 'Add Milk', instruction: 'Pour in 400 ml of fresh milk and bring the mixture to a gentle boil.', imageSlotId: 'HOME_HERO_PRIMARY' },
        { stepNumber: 3, title: 'Add Lata Mix', instruction: 'Add 160g of your chosen Lata Tea Mix powder directly into the pot.', imageSlotId: 'ABOUT_IMAGE_PRIMARY' },
        { stepNumber: 4, title: 'Stir Well', instruction: 'Stir thoroughly with a whisk or ladle to dissolve the rich aromatics evenly.', imageSlotId: 'HOME_HERO_PRIMARY' },
        { stepNumber: 5, title: 'Simmer 2-3 Mins', instruction: 'Allow the chai to boil and simmer on medium flame for 2 to 3 minutes until frothy.', imageSlotId: 'ABOUT_IMAGE_PRIMARY' },
        { stepNumber: 6, title: 'Pour & Serve', instruction: 'Strain and pour into traditional cups or glasses and serve hot with snacks.', imageSlotId: 'ABOUT_IMAGE_PRIMARY' }
      ],
      footerNote: 'Tea Mix — Chai For Every Moment!'
    },
    ordering: {
      tagline: 'SEAMLESS SUPPLY CHAIN',
      heading: 'OUR ORDERING PROCEDURE',
      subheading: 'Simplified 7-step roadmap designed for smooth, crystal-clear ordering and reliable doorstep delivery.',
      steps: [
        { stepNumber: 1, title: 'CALL & INQUIRE', description: 'Share your requirements with us via phone, WhatsApp, or instant web cart.', icon: 'PhoneCall' },
        { stepNumber: 2, title: 'SELECT RANGE', description: 'Choose preferred flavours and pack sizes (16g Sachets, 160g Packs, or 1kg Bags).', icon: 'CheckSquare' },
        { stepNumber: 3, title: 'CONFIRM ORDER', description: 'We review your quotation, confirm batch freshness, and process your dispatch schedule.', icon: 'FileCheck' },
        { stepNumber: 4, title: 'MAKE PAYMENT', description: 'Complete payment securely via UPI, NetBanking, RTGS, Cards, or Trade Accounts.', icon: 'CreditCard' },
        { stepNumber: 5, title: 'FAST DISPATCH', description: 'We pack and ship your order with live transit tracking ID and courier updates.', icon: 'Truck' },
        { stepNumber: 6, title: 'LIVE SUPPORT', description: 'Our dedicated customer success team assists you with fulfillment and scheduling.', icon: 'Headphones' },
        { stepNumber: 7, title: 'AFTER-SALES CARE', description: 'Full replenishment support, guaranteed batch quality, returns, and exchange care.', icon: 'HeartHandshake' }
      ],
      footerNote: 'Tea Mix — Tradition, Quality & Your Satisfaction'
    },
    cta: {
      headline: 'Experience Royal Rajwada Chai in Your Business',
      subheadline: 'Join hundreds of corporate pantries, restaurants, luxury hotels, and retail stores serving authentic LataTea.',
      primaryButtonText: 'Request Sample Box',
      primaryButtonLink: '#inquire-modal',
      secondaryButtonText: 'Order Online',
      secondaryButtonLink: '#products',
      backgroundImageSlotId: 'CTA_BACKGROUND'
    },
    footer: {
      aboutText: 'LataTea represents the finest heritage of Indian tea craft, combining pure organic jaggery, handpicked whole spices, and modern manufacturing convenience.',
      copyrightText: '© 2026 LataTea. All rights reserved.',
      legalLinks: [
        { label: 'Privacy Policy', url: '#privacy' },
        { label: 'Terms of Use', url: '#terms' },
        { label: 'Disclaimer', url: '#disclaimer' }
      ]
    }
  },
  contact: {
    companyName: '',
    address: '',
    email: '',
    phone1: '',
    phone2: '',
    phone3: '',
    whatsapp: '',
    website: '',
    googleMapsUrl: '',
    socials: {
      instagram: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      twitter: ''
    },
    registration: {
      fssai: '',
      iec: '',
      gst: ''
    },
    payment: {
      accountName: '',
      bankName: '',
      accountNumber: '',
      ifscCode: ''
    }
  },
  seo: {
    seoTitle: 'LataTea — Rajwada Heritage Tea & Jaggery Basundi Chai',
    metaDescription: 'Discover LataTea premium Gud Basundi, Sugar Basundi, and Vending Premixes. Authentic taste, consistent quality, instant convenience.',
    ogTitle: 'LataTea — Authentic Rajwada Taste & Instant Convenience',
    ogDescription: 'Experience natural sweetness and traditional goodness with LataTea Gud and Basundi Chai mixes.',
    ogImageSlotId: 'HOME_HERO_PRIMARY',
    canonicalUrl: 'https://latatea.com',
    robots: 'index, follow'
  }
};

export const BROCHURE_CONTACT_PRESET = {
  companyName: 'Purple Bean Agro Industries Private Limited',
  address: 'Office 12, Business Avenue, Aundh, Pune, Maharashtra 411012',
  email: 'info@latatea.com',
  phone1: '+91 7666953873',
  phone2: '+91 8483067383',
  phone3: '+91 9595333976',
  whatsapp: '+91 7666953873',
  website: 'https://latatea.com',
  googleMapsUrl: 'https://maps.google.com/?q=Aundh+Pune',
  socials: {
    instagram: 'https://instagram.com/latateaofficial',
    facebook: 'https://facebook.com/latateaofficial',
    linkedin: 'https://linkedin.com/company/latatea',
    youtube: 'https://youtube.com/@latatea',
    twitter: 'https://twitter.com/latatea'
  },
  registration: {
    fssai: '11525996000709',
    iec: 'AAPCP3820M',
    gst: '27AAPCP3820M1ZX'
  },
  payment: {
    accountName: 'Purple Bean Agro Industries Private Limited',
    bankName: 'IDFC First Bank',
    accountNumber: '10227953860',
    ifscCode: 'IDFB0041438'
  }
};
