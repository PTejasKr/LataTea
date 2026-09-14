import { 
  CMSState, 
  MediaSlot, 
  TeaStoryItem, 
  DomainItem, 
  SectionConfig, 
  NavigationItem, 
  EditorialStoryContent 
} from '../types/cms';
import { DEFAULT_MEDIA_ITEMS } from './defaultMediaAssets';

export const DEFAULT_MEDIA_SLOTS: Record<string, MediaSlot> = {
  HOME_HERO_PRIMARY: {
    id: 'slot_hero_primary',
    slotKey: 'HOME_HERO_PRIMARY',
    label: 'Hero Panoramic Image',
    description: 'Panoramic photograph of tea spices and brass cup',
    category: 'hero',
    desktopImageId: 'media_royal_panoramic',
    mobileImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover',
    aspectRatioHint: '21:9'
  },
  STORY_IMAGE_PRIMARY: {
    id: 'slot_story_primary',
    slotKey: 'STORY_IMAGE_PRIMARY',
    label: 'Brand Story Copper Bowl',
    description: 'Antique copper bowl with traditional tea blend',
    category: 'story',
    desktopImageId: 'media_royal_bowl',
    mobileImageId: 'media_royal_bowl',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover',
    aspectRatioHint: '4:3'
  },
  HERITAGE_IMAGE: {
    id: 'slot_heritage_primary',
    slotKey: 'HERITAGE_IMAGE',
    label: 'Heritage Spices & Leaves',
    description: 'Tea leaves and cardamom harvest',
    category: 'heritage',
    desktopImageId: 'media_royal_panoramic',
    mobileImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover',
    aspectRatioHint: '16:9'
  },
  CRAFT_STAGE_1: {
    id: 'slot_craft_1',
    slotKey: 'CRAFT_STAGE_1',
    label: 'Craft Stage 1 - Sourcing',
    description: 'Assam valley tea estates',
    category: 'craft',
    desktopImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover'
  },
  CRAFT_STAGE_2: {
    id: 'slot_craft_2',
    slotKey: 'CRAFT_STAGE_2',
    label: 'Craft Stage 2 - Spices',
    description: 'Green cardamom and ginger pods',
    category: 'craft',
    desktopImageId: 'media_royal_bowl',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover'
  },
  CRAFT_STAGE_3: {
    id: 'slot_craft_3',
    slotKey: 'CRAFT_STAGE_3',
    label: 'Craft Stage 3 - Blending',
    description: 'Artisan tea formulation',
    category: 'craft',
    desktopImageId: 'media_royal_bowl',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover'
  },
  CRAFT_STAGE_4: {
    id: 'slot_craft_4',
    slotKey: 'CRAFT_STAGE_4',
    label: 'Craft Stage 4 - Simmering',
    description: 'Simmering tea pan',
    category: 'craft',
    desktopImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover'
  },
  CRAFT_STAGE_5: {
    id: 'slot_craft_5',
    slotKey: 'CRAFT_STAGE_5',
    label: 'Craft Stage 5 - Serving',
    description: 'Hot cup of Basundi Chai',
    category: 'craft',
    desktopImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover'
  },
  BRAND_LOGO_PRIMARY: {
    id: 'slot_brand_logo',
    slotKey: 'BRAND_LOGO_PRIMARY',
    label: 'Brand Logo',
    description: 'Primary logo',
    category: 'brand',
    desktopImageId: 'media_logo_primary',
    focalX: 50,
    focalY: 50,
    objectFit: 'contain',
    aspectRatioHint: '16:9'
  },
  BRAND_LOGO_LIGHT: {
    id: 'slot_brand_logo_light',
    slotKey: 'BRAND_LOGO_LIGHT',
    label: 'Brand Logo (Light)',
    description: 'Light version for dark footers',
    category: 'brand',
    desktopImageId: 'media_logo_light',
    focalX: 50,
    focalY: 50,
    objectFit: 'contain',
    aspectRatioHint: '16:9'
  }
};

export const DEFAULT_NAVIGATION: NavigationItem[] = [
  { 
    id: 'nav_home', 
    label: { en: 'Home', mr: 'à¤®à¥à¤–à¥à¤¯ à¤ªà¥ƒà¤·à¥à¤ ' }, 
    url: '/', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 1 
  },
  { 
    id: 'nav_about', 
    label: { en: 'Our Story', mr: 'à¤†à¤®à¤šà¥€ à¤•à¤¥à¤¾' }, 
    url: '/about', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 2 
  },
  { 
    id: 'nav_process', 
    label: { en: 'Process', mr: 'à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾' }, 
    url: '/process', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 3 
  },
  { 
    id: 'nav_products', 
    label: { en: 'Tea Catalogue', mr: 'à¤šà¤¹à¤¾ à¤•à¥…à¤Ÿà¤²à¥‰à¤—' }, 
    url: '/products', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 4 
  },
  { 
    id: 'nav_contact', 
    label: { en: 'Contact', mr: 'à¤¸à¤‚à¤ªà¤°à¥à¤•' }, 
    url: '/contact', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 5 
  }
];

export const DEFAULT_TEA_STORIES: TeaStoryItem[] = [
  {
    id: 'tea_gud_basundi',
    slug: 'gud-basundi-tea',
    name: {
      en: 'Gud Basundi Tea',
      mr: 'à¤—à¥‚à¤³ à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤šà¤¹à¤¾'
    },
    tagline: {
      en: 'Spiced Jaggery Chai',
      mr: 'à¤®à¤¸à¤¾à¤²à¤¾ à¤—à¥‚à¤³ à¤šà¤¹à¤¾'
    },
    category: 'gud',
    categoryName: {
      en: 'Jaggery Blends',
      mr: 'à¤—à¥‚à¤³ à¤šà¤¹à¤¾'
    },
    shortDescription: {
      en: 'Assam CTC tea blended with natural cane jaggery, cardamom, mace, nutmeg, and ginger.',
      mr: 'à¤†à¤¸à¤¾à¤® à¤šà¤¹à¤¾, à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‚à¤³, à¤µà¥‡à¤²à¤šà¥€, à¤œà¤¾à¤¯à¤ªà¤¤à¥à¤°à¥€, à¤œà¤¾à¤¯à¤«à¤³ à¤†à¤£à¤¿ à¤¸à¥à¤‚à¤ à¥€à¤šà¥‡ à¤®à¤¿à¤¶à¥à¤°à¤£.'
    },
    editorialStory: {
      en: 'A rich, creamy chai inspired by western Indian milk sweets. Blended so jaggery dissolves into boiling milk without curdling, giving a clean caramel sweetness and warm spice finish in 3 minutes.',
      mr: 'à¤ªà¤¾à¤°à¤‚à¤ªà¤°à¤¿à¤• à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€à¤šà¥à¤¯à¤¾ à¤¸à¥à¤µà¤¾à¤¦à¤¾à¤¨à¥‡ à¤ªà¥à¤°à¥‡à¤°à¤¿à¤¤. à¤‰à¤•à¤³à¤¤à¥à¤¯à¤¾ à¤¦à¥à¤§à¤¾à¤¤ à¤¨ à¤«à¤¾à¤Ÿà¤¤à¤¾ à¤ªà¤°à¤¿à¤ªà¥‚à¤°à¥à¤£ à¤µà¤¿à¤°à¤˜à¤³à¤£à¤¾à¤°à¤¾ à¤¹à¤¾ à¤šà¤¹à¤¾ à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚à¤¤ à¤¤à¤¯à¤¾à¤° à¤¹à¥‹à¤¤à¥‹.'
    },
    tastingNotes: [
      { en: 'Caramel jaggery', mr: 'à¤—à¥à¤³à¤¾à¤šà¤¾ à¤—à¥‹à¤¡à¤µà¤¾' },
      { en: 'Crushed cardamom', mr: 'à¤¹à¤¿à¤°à¤µà¥€ à¤µà¥‡à¤²à¤šà¥€' },
      { en: 'Bold Assam finish', mr: 'à¤•à¤¡à¤• à¤†à¤¸à¤¾à¤® à¤šà¤¹à¤¾' }
    ],
    ingredients: [
      { en: 'Assam CTC Tea', mr: 'à¤†à¤¸à¤¾à¤® à¤¸à¥€à¤Ÿà¥€à¤¸à¥€ à¤šà¤¹à¤¾' },
      { en: 'Organic Cane Jaggery', mr: 'à¤¸à¥‡à¤‚à¤¦à¥à¤°à¤¿à¤¯ à¤—à¥‚à¤³' },
      { en: 'Cardamom, Ginger, Mace, Nutmeg', mr: 'à¤µà¥‡à¤²à¤šà¥€, à¤¸à¥à¤‚à¤ , à¤œà¤¾à¤¯à¤ªà¤¤à¥à¤°à¥€, à¤œà¤¾à¤¯à¤«à¤³' }
    ],
    origin: {
      en: 'Assam & Kolhapur',
      mr: 'à¤†à¤¸à¤¾à¤® à¤µ à¤•à¥‹à¤²à¥à¤¹à¤¾à¤ªà¥‚à¤°'
    },
    servingRitual: {
      en: 'Simmer with equal parts water and milk for 2 to 3 minutes.',
      mr: 'à¤¸à¤®à¤¾à¤¨ à¤ªà¥à¤°à¤®à¤¾à¤£à¤¾à¤¤ à¤ªà¤¾à¤£à¥€ à¤µ à¤¦à¥‚à¤§ à¤à¤•à¤¤à¥à¤° à¤•à¤°à¥‚à¤¨ à¥¨ à¤¤à¥‡ à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡ à¤‰à¤•à¤³à¤¾.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 1,
    isFeatured: true,
    isVisible: true
  },
  {
    id: 'tea_gud_plain',
    slug: 'gud-plain-chai',
    name: {
      en: 'Gud Plain Chai',
      mr: 'à¤—à¥‚à¤³ à¤¸à¤¾à¤§à¤¾ à¤šà¤¹à¤¾'
    },
    tagline: {
      en: 'Classic Jaggery & Tea',
      mr: 'à¤…à¤¸à¥à¤¸à¤² à¤¸à¤¾à¤§à¤¾ à¤—à¥‚à¤³ à¤šà¤¹à¤¾'
    },
    category: 'gud',
    categoryName: {
      en: 'Jaggery Blends',
      mr: 'à¤—à¥‚à¤³ à¤šà¤¹à¤¾'
    },
    shortDescription: {
      en: 'Unrefined cane jaggery with strong Assam CTC tea, without spices.',
      mr: 'à¤®à¤¸à¤¾à¤²à¥à¤¯à¤¾à¤‚à¤¶à¤¿à¤µà¤¾à¤¯, à¤«à¤•à¥à¤¤ à¤•à¤¡à¤• à¤†à¤¸à¤¾à¤® à¤šà¤¹à¤¾ à¤†à¤£à¤¿ à¤¦à¥‡à¤¶à¥€ à¤—à¥‚à¤³.'
    },
    editorialStory: {
      en: 'For everyday drinking. Clean, earthy jaggery paired directly with brisk black tea leaves. No white sugar, no preservatives.',
      mr: 'à¤¦à¥ˆà¤¨à¤‚à¤¦à¤¿à¤¨ à¤šà¤¹à¤¾à¤¸à¤¾à¤ à¥€. à¤ªà¤¾à¤‚à¤¢à¤°à¥€ à¤¸à¤¾à¤–à¤° à¤¨à¤¾à¤¹à¥€, à¤•à¥‹à¤£à¤¤à¥‡à¤¹à¥€ à¤ªà¥à¤°à¤¿à¤à¤°à¥à¤µà¥à¤¹à¥‡à¤Ÿà¤¿à¤µà¥à¤¹ à¤¨à¤¾à¤¹à¥€à¤¤.'
    },
    tastingNotes: [
      { en: 'Natural cane sweetness', mr: 'à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‹à¤¡à¤µà¤¾' },
      { en: 'Robust CTC body', mr: 'à¤•à¤¡à¤• à¤°à¤‚à¤—' },
      { en: 'Clean finish', mr: 'à¤¹à¤²à¤•à¥€ à¤šà¤µ' }
    ],
    ingredients: [
      { en: 'Assam CTC Tea Granules', mr: 'à¤†à¤¸à¤¾à¤® à¤¸à¥€à¤Ÿà¥€à¤¸à¥€ à¤šà¤¹à¤¾ à¤¦à¤¾à¤£à¥‡' },
      { en: 'Organic Desi Jaggery', mr: 'à¤¦à¥‡à¤¶à¥€ à¤¸à¥‡à¤‚à¤¦à¥à¤°à¤¿à¤¯ à¤—à¥‚à¤³' }
    ],
    origin: {
      en: 'Upper Assam',
      mr: 'à¤…à¤ªà¥à¤ªà¤° à¤†à¤¸à¤¾à¤®'
    },
    servingRitual: {
      en: 'Boil in milk for 2 to 3 minutes.',
      mr: 'à¤¦à¥à¤§à¤¾à¤¤ à¥¨ à¤¤à¥‡ à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡ à¤‰à¤•à¤³à¤¾.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 2,
    isFeatured: false,
    isVisible: true
  },
  {
    id: 'tea_sugar_basundi',
    slug: 'royal-sugar-basundi',
    name: {
      en: 'Sugar Basundi Tea',
      mr: 'à¤¸à¤¾à¤–à¤° à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤šà¤¹à¤¾'
    },
    tagline: {
      en: 'Spiced Dairy Chai',
      mr: 'à¤®à¤¸à¤¾à¤²à¤¾ à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤šà¤¹à¤¾'
    },
    category: 'sugar',
    categoryName: {
      en: 'Basundi Series',
      mr: 'à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤®à¤¾à¤²à¤¿à¤•à¤¾'
    },
    shortDescription: {
      en: 'Cardamom and nutmeg spiced tea blend formulated for thick, creamy chai.',
      mr: 'à¤˜à¤Ÿà¥à¤Ÿ, à¤®à¤²à¤ˆà¤¦à¤¾à¤° à¤šà¤¹à¤¾à¤¸à¤¾à¤ à¥€ à¤µà¥‡à¤²à¤šà¥€ à¤†à¤£à¤¿ à¤œà¤¾à¤¯à¤«à¤³à¤¯à¥à¤•à¥à¤¤ à¤®à¤¿à¤¶à¥à¤°à¤£.'
    },
    editorialStory: {
      en: 'Delivers the mouthfeel of slow-cooked basundi chai with whole-ground spices and strong Assam tea in standard brewing time.',
      mr: 'à¤¸à¤‚à¤¥à¤ªà¤£à¥‡ à¤‰à¤•à¤³à¤µà¤²à¥‡à¤²à¥à¤¯à¤¾ à¤ªà¤¾à¤°à¤‚à¤ªà¤°à¤¿à¤• à¤šà¤¹à¤¾à¤šà¥€ à¤šà¤µ à¤˜à¤°à¤šà¥à¤¯à¤¾ à¤˜à¤°à¥€ à¤•à¤®à¥€ à¤µà¥‡à¤³à¥‡à¤¤ à¤®à¤¿à¤³à¤µà¤¾.'
    },
    tastingNotes: [
      { en: 'Creamy texture', mr: 'à¤®à¤–à¤®à¤²à¥€ à¤˜à¤Ÿà¥à¤Ÿà¤ªà¤£à¤¾' },
      { en: 'Aromatic cardamom', mr: 'à¤µà¥‡à¤²à¤šà¥€à¤šà¤¾ à¤¸à¥à¤—à¤‚à¤§' },
      { en: 'Ginger warmth', mr: 'à¤¸à¥à¤‚à¤ à¥€à¤šà¥€ à¤‰à¤¬' }
    ],
    ingredients: [
      { en: 'Assam Tea Blend', mr: 'à¤†à¤¸à¤¾à¤® à¤šà¤¹à¤¾' },
      { en: 'Cane Sugar', mr: 'à¤¸à¤¾à¤–à¤°' },
      { en: 'Cardamom, Ginger, Mace, Nutmeg', mr: 'à¤µà¥‡à¤²à¤šà¥€, à¤¸à¥à¤‚à¤ , à¤œà¤¾à¤¯à¤ªà¤¤à¥à¤°à¥€, à¤œà¤¾à¤¯à¤«à¤³' }
    ],
    origin: {
      en: 'Assam & Western Ghats',
      mr: 'à¤†à¤¸à¤¾à¤® à¤µ à¤ªà¤¶à¥à¤šà¤¿à¤® à¤˜à¤¾à¤Ÿ'
    },
    servingRitual: {
      en: 'Boil with whole milk for 3 minutes.',
      mr: 'à¤¦à¥à¤§à¤¾à¤¤ à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡ à¤‰à¤•à¤³à¤¾.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 4,
    isFeatured: true,
    isVisible: true
  },
  {
    id: 'tea_instant_premix',
    slug: 'instant-basundi-premix',
    name: {
      en: '3-in-1 Basundi Premix',
      mr: 'à¥©-à¤‡à¤¨-à¥§ à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤ªà¥à¤°à¥€à¤®à¤¿à¤•à¥à¤¸'
    },
    tagline: {
      en: 'Instant Hot Water Mix',
      mr: 'à¤‡à¤¨à¥à¤¸à¥à¤Ÿà¤‚à¤Ÿ à¤ªà¥à¤°à¥€à¤®à¤¿à¤•à¥à¤¸'
    },
    category: 'premixes',
    categoryName: {
      en: 'Instant Premixes',
      mr: 'à¤‡à¤¨à¥à¤¸à¥à¤Ÿà¤‚à¤Ÿ à¤ªà¥à¤°à¥€à¤®à¤¿à¤•à¥à¤¸'
    },
    shortDescription: {
      en: 'Dairy milk solids, tea extract, and spices. Just add hot water.',
      mr: 'à¤¦à¥à¤§à¤¾à¤šà¥€ à¤­à¥à¤•à¤Ÿà¥€, à¤šà¤¹à¤¾ à¤…à¤°à¥à¤• à¤†à¤£à¤¿ à¤®à¤¸à¤¾à¤²à¥‡. à¤«à¤•à¥à¤¤ à¤—à¤°à¤® à¤ªà¤¾à¤£à¥€ à¤˜à¤¾à¤²à¤¾.'
    },
    editorialStory: {
      en: 'Granulated premix designed for offices, hotels, and vending machines. Dissolves cleanly without clumping.',
      mr: 'à¤‘à¤«à¤¿à¤¸ à¤†à¤£à¤¿ à¤¹à¥‰à¤Ÿà¥‡à¤²à¤¸à¤¾à¤ à¥€ à¤¸à¥‹à¤¯à¥€à¤¸à¥à¤•à¤°. à¤ªà¤¾à¤£à¥à¤¯à¤¾à¤¤ à¤¸à¤¹à¤œ à¤µà¤¿à¤°à¤˜à¤³à¤£à¤¾à¤°à¥‡ à¤¦à¤¾à¤£à¥‡à¤¦à¤¾à¤° à¤®à¤¿à¤¶à¥à¤°à¤£.'
    },
    tastingNotes: [
      { en: 'Consistent taste', mr: 'à¤à¤•à¤¸à¤¾à¤°à¤–à¥€ à¤šà¤µ' },
      { en: 'Balanced spice', mr: 'à¤¸à¤‚à¤¤à¥à¤²à¤¿à¤¤ à¤®à¤¸à¤¾à¤²à¤¾' },
      { en: 'Instant cup', mr: 'à¤à¤Ÿà¤ªà¤Ÿ à¤¤à¤¯à¤¾à¤°' }
    ],
    ingredients: [
      { en: 'Dairy Milk Powder', mr: 'à¤¦à¥à¤§à¤¾à¤šà¥€ à¤ªà¤¾à¤µà¤¡à¤°' },
      { en: 'Black Tea Extract', mr: 'à¤šà¤¹à¤¾ à¤…à¤°à¥à¤•' },
      { en: 'Spice Extracts', mr: 'à¤®à¤¸à¤¾à¤²à¤¾ à¤…à¤°à¥à¤•' }
    ],
    origin: {
      en: 'Maharashtra',
      mr: 'à¤ªà¥à¤£à¥‡, à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°'
    },
    servingRitual: {
      en: 'Add 14g to 80ml hot water and stir.',
      mr: 'à¥®à¥¦ à¤®à¤¿à¤²à¥€ à¤—à¤°à¤® à¤ªà¤¾à¤£à¥à¤¯à¤¾à¤¤ à¥§à¥ª à¤—à¥à¤°à¥…à¤® à¤˜à¤¾à¤²à¥‚à¤¨ à¤¢à¤µà¤³à¤¾.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 5,
    isFeatured: true,
    isVisible: true
  }
];

export const DEFAULT_DOMAINS: DomainItem[] = [
  {
    id: 'dom_1',
    hostname: 'latatea.com',
    type: 'primary',
    status: 'ACTIVE',
    isPrimary: true,
    redirectToPrimary: false,
    sslStatus: 'ACTIVE',
    registrar: 'GoDaddy',
    hostingProvider: 'Hostinger',
    targetDestination: 'cname.hostinger.com',
    dnsRecords: [
      { type: 'A', name: '@', value: '185.199.108.153', status: 'matched', ttl: '3600' },
      { type: 'CNAME', name: 'www', value: 'latatea.com', status: 'matched', ttl: '3600' }
    ],
    lastVerifiedAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'dom_2',
    hostname: 'www.latatea.com',
    type: 'redirect',
    status: 'ACTIVE',
    isPrimary: false,
    redirectToPrimary: true,
    sslStatus: 'ACTIVE',
    registrar: 'GoDaddy',
    hostingProvider: 'Hostinger',
    targetDestination: 'latatea.com',
    dnsRecords: [
      { type: 'CNAME', name: 'www', value: 'latatea.com', status: 'matched', ttl: '3600' }
    ],
    lastVerifiedAt: new Date().toISOString(),
    createdAt: new Date(Date.now() - 30 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const DEFAULT_STORY_CONTENT: EditorialStoryContent = {
  // 01 HERO
  hero: {
    tagline: {
      en: 'Lata Teamix â€” MAHARASHTRA',
      mr: 'à¤²à¤¤à¤¾ à¤Ÿà¥€à¤®à¤¿à¤•à¥à¤¸ â€” à¤ªà¥à¤£à¥‡'
    },
    headline: {
      en: 'Authentic taste\nConsistent quality\nInstant Convenience',
      mr: 'à¤–à¤°à¤¾ à¤¸à¥à¤µà¤¾à¤¦\nà¤¸à¤¾à¤¤à¤¤à¥à¤¯à¤ªà¥‚à¤°à¥à¤£ à¤—à¥à¤£à¤µà¤¤à¥à¤¤à¤¾\nà¤à¤Ÿà¤ªà¤Ÿ à¤¸à¥‹à¤¯'
    },
    subheadline: {
      en: 'Strong Assam CTC tea, whole spices, and organic cane jaggery. Ready in 3 minutes without curdling milk.',
      mr: 'à¤†à¤¸à¤¾à¤® à¤šà¤¹à¤¾, à¤…à¤–à¥à¤–à¥‡ à¤®à¤¸à¤¾à¤²à¥‡ à¤†à¤£à¤¿ à¤¸à¥‡à¤‚à¤¦à¥à¤°à¤¿à¤¯ à¤—à¥‚à¤³. à¤¦à¥‚à¤§ à¤¨ à¤«à¤¾à¤Ÿà¤¤à¤¾ à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚à¤¤ à¤¤à¤¯à¤¾à¤°.'
    },
    primaryCtaText: {
      en: 'Explore Teas',
      mr: 'à¤šà¤¹à¤¾ à¤ªà¤¹à¤¾'
    },
    primaryCtaLink: '#tea',
    secondaryCtaText: {
      en: 'Our Story',
      mr: 'à¤†à¤®à¤šà¥€ à¤—à¥‹à¤·à¥à¤Ÿ'
    },
    secondaryCtaLink: '#story',
    badgeText: {
      en: 'Natural Jaggery',
      mr: 'à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‚à¤³'
    }
  },

  // 02 THE STORY
  story: {
    tagline: {
      en: 'ABOUT Lata Teamix',
      mr: 'à¤†à¤®à¤šà¥à¤¯à¤¾à¤¬à¤¦à¥à¤¦à¤²'
    },
    heading: {
      en: 'Real Chai, Unrefined Sweetness',
      mr: 'à¤…à¤¸à¥à¤¸à¤² à¤šà¤¹à¤¾, à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‹à¤¡à¤µà¤¾'
    },
    subheading: {
      en: 'Made in Maharashtra.',
      mr: 'à¤ªà¥à¤£à¥‡, à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°.'
    },
    introduction: {
      en: 'Most everyday tea relies on refined white sugar. We built Lata Teamix to give families and businesses an easy way to brew traditional jaggery chai without milk curdling or burnt notes.',
      mr: 'à¤°à¥‹à¤œà¤šà¥à¤¯à¤¾ à¤šà¤¹à¤¾à¤¤ à¤ªà¤¾à¤‚à¤¢à¤±à¥à¤¯à¤¾ à¤¸à¤¾à¤–à¤°à¥‡à¤šà¤¾ à¤µà¤¾à¤ªà¤° à¤œà¤¾à¤¸à¥à¤¤ à¤¹à¥‹à¤¤à¥‹. à¤¦à¥‚à¤§ à¤¨ à¤«à¤¾à¤Ÿà¤¤à¤¾ à¤˜à¤°à¤šà¥à¤¯à¤¾ à¤˜à¤°à¥€ à¤—à¥à¤³à¤¾à¤šà¤¾ à¤šà¤¹à¤¾ à¤¬à¤¨à¤µà¤¤à¤¾ à¤¯à¤¾à¤µà¤¾ à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤†à¤®à¥à¤¹à¥€ à¤²à¤¤à¤¾ à¤Ÿà¥€ à¤šà¥€ à¤¸à¥à¤°à¥à¤µà¤¾à¤¤ à¤•à¥‡à¤²à¥€.'
    },
    paragraphs: [
      {
        en: 'Sourcing premium teas from India\'s finest growing regions, we blend them with precision and expertise to create exceptional tea products that bring the richness and character of Indian tea to customers across the globe.',
        mr: 'à¤†à¤®à¥à¤¹à¥€ à¤†à¤¸à¤¾à¤®à¤šà¤¾ à¤•à¤¡à¤• à¤šà¤¹à¤¾, à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤¦à¥‡à¤¶à¥€ à¤—à¥‚à¤³ à¤†à¤£à¤¿ à¤µà¥‡à¤²à¤šà¥€, à¤¸à¥à¤‚à¤ , à¤œà¤¾à¤¯à¤ªà¤¤à¥à¤°à¥€ à¤µ à¤œà¤¾à¤¯à¤«à¤³ à¤à¤•à¤¤à¥à¤° à¤•à¤°à¥‚à¤¨ à¤¹à¥‡ à¤®à¤¿à¤¶à¥à¤°à¤£ à¤¤à¤¯à¤¾à¤° à¤•à¤°à¤¤à¥‹.'
      },
      {
        en: 'Premium Tea from India\'s Finest Gardens\nState-of-the-Art Processing & Blending Facility\nConsistent Quality, Every Batch\nStrong Procurement Network Across India',
        mr: 'à¤ªà¥à¤£à¥‡ à¤¯à¥‡à¤¥à¥€à¤² à¤…à¤¨à¥à¤¨ à¤¸à¥à¤°à¤•à¥à¤·à¤¾ à¤ªà¥à¤°à¤®à¤¾à¤£à¤¿à¤¤ à¤¯à¥à¤¨à¤¿à¤Ÿà¤®à¤§à¥à¤¯à¥‡ à¤¤à¤¯à¤¾à¤° à¤•à¥‡à¤²à¥‡à¤²à¤¾ à¤¹à¤¾ à¤šà¤¹à¤¾ à¤¦à¥‡à¤¶à¤­à¤°à¤¾à¤¤à¥€à¤² à¤˜à¤°à¥‡ à¤†à¤£à¤¿ à¤•à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯à¤¾à¤‚à¤¨à¤¾ à¤ªà¥à¤°à¤µà¤²à¤¾ à¤œà¤¾à¤¤à¥‹.'
      }
    ],
    quote: {
      en: 'â€œPure ingredients. Honest ratios. No shortcuts.â€',
      mr: 'â€œà¤¶à¥à¤¦à¥à¤§ à¤˜à¤Ÿà¤•, à¤ªà¥à¤°à¤¾à¤®à¤¾à¤£à¤¿à¤• à¤ªà¥à¤°à¤®à¤¾à¤£.â€'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY'
  },

  // 03 HERITAGE
  heritage: {
    tagline: {
      en: 'SOURCE & ROOTS',
      mr: 'à¤‰à¤—à¤®'
    },
    heading: {
      en: 'Assam Tea & Maharashtra Jaggery',
      mr: 'à¤†à¤¸à¤¾à¤® à¤šà¤¹à¤¾ à¤†à¤£à¤¿ à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°à¤¾à¤šà¤¾ à¤—à¥‚à¤³'
    },
    subheading: {
      en: 'Two distinct agricultural regions brought together in one kettle.',
      mr: 'à¤¦à¥‹à¤¨ à¤ªà¥à¤°à¤¾à¤‚à¤¤à¤¾à¤‚à¤šà¥€ à¤¨à¤¿à¤¸à¤°à¥à¤—à¤¦à¤¤à¥à¤¤ à¤¦à¥‡à¤£à¤—à¥€ à¤à¤•à¤¾ à¤•à¤ªà¤¾à¤¤.'
    },
    narrative: {
      en: 'We source tea directly from Assam tea gardens and combine it with cane jaggery from western Maharashtra.',
      mr: 'à¤†à¤¸à¤¾à¤®à¤šà¥à¤¯à¤¾ à¤¬à¤¾à¤—à¤¾à¤‚à¤®à¤§à¥€à¤² à¤¤à¤¾à¤œà¥€ à¤šà¤¹à¤¾à¤šà¥€ à¤ªà¤¾à¤¨à¥‡ à¤†à¤£à¤¿ à¤ªà¤¶à¥à¤šà¤¿à¤® à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°à¤¾à¤¤à¥€à¤² à¤—à¥‚à¤³ à¤¯à¤¾à¤‚à¤šà¤¾ à¤¸à¤®à¤¤à¥‹à¤².'
    },
    milestones: [
      {
        year: 'Origin',
        title: { en: 'Kolhapur Jaggery', mr: 'à¤•à¥‹à¤²à¥à¤¹à¤¾à¤ªà¥à¤°à¥€ à¤—à¥‚à¤³' },
        description: { 
          en: 'Unrefined sugarcane jaggery prepared with traditional boiling methods.',
          mr: 'à¤ªà¤¾à¤°à¤‚à¤ªà¤°à¤¿à¤• à¤ªà¤¦à¥à¤§à¤¤à¥€à¤¨à¥‡ à¤¤à¤¯à¤¾à¤° à¤•à¥‡à¤²à¥‡à¤²à¤¾ à¤¶à¥à¤¦à¥à¤§ à¤¸à¥‡à¤‚à¤¦à¥à¤°à¤¿à¤¯ à¤—à¥‚à¤³.'
        }
      },
      {
        year: 'Formulation',
        title: { en: 'Non-Curdling Blend', mr: 'à¤¨ à¤«à¤¾à¤Ÿà¤£à¤¾à¤°à¤¾ à¤šà¤¹à¤¾' },
        description: { 
          en: 'Balanced acidity so jaggery dissolves into boiling milk smoothly.',
          mr: 'à¤‰à¤•à¤³à¤¤à¥à¤¯à¤¾ à¤¦à¥à¤§à¤¾à¤¤ à¤—à¥‚à¤³ à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤à¤ªà¤£à¥‡ à¤µà¤¿à¤°à¤˜à¤³à¥‡à¤² à¤…à¤¶à¥€ à¤°à¤šà¤¨à¤¾.'
        }
      },
      {
        year: 'Supply',
        title: { en: 'B2B & Homes', mr: 'à¤˜à¤° à¤†à¤£à¤¿ à¤‘à¤«à¤¿à¤¸' },
        description: { 
          en: 'Supplied to corporate offices, cafÃ©s, and retail kitchens nationwide.',
          mr: 'à¤¦à¥‡à¤¶à¤­à¤°à¤¾à¤¤à¥€à¤² à¤•à¤¾à¤°à¥à¤¯à¤¾à¤²à¤¯à¥‡ à¤†à¤£à¤¿ à¤˜à¤°à¤¾à¤‚à¤¸à¤¾à¤ à¥€ à¤‰à¤ªà¤²à¤¬à¥à¤§.'
        }
      }
    ],
    imageSlotId: 'HERITAGE_IMAGE'
  },

  // 04 THE CRAFT (5 Stages)
  craft: {
    tagline: {
      en: 'HOW IT IS MADE',
      mr: 'à¤•à¥ƒà¤¤à¥€'
    },
    heading: {
      en: 'Five Steps from Garden to Cup',
      mr: 'à¤¬à¤¾à¤—à¥‡à¤ªà¤¾à¤¸à¥‚à¤¨ à¤•à¤ªà¤¾à¤ªà¤°à¥à¤¯à¤‚à¤¤ à¥« à¤Ÿà¤ªà¥à¤ªà¥‡'
    },
    subheading: {
      en: 'Clean, predictable preparation every time.',
      mr: 'à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤µà¥‡à¤³à¥€ à¤¤à¥€à¤š à¤–à¤¾à¤¤à¥à¤°à¥€à¤¶à¥€à¤° à¤šà¤µ.'
    },
    introduction: {
      en: 'From harvest selection to the 3-minute boil, every step is tested for consistency.',
      mr: 'à¤ªà¤¾à¤¨à¥‡ à¤¨à¤¿à¤µà¤¡à¤£à¥à¤¯à¤¾à¤ªà¤¾à¤¸à¥‚à¤¨ à¤¤à¥‡ à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚à¤šà¥à¤¯à¤¾ à¤‰à¤•à¤³à¥€à¤ªà¤°à¥à¤¯à¤‚à¤¤ à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤Ÿà¤ªà¥à¤ªà¤¾ à¤¤à¤ªà¤¾à¤¸à¤²à¥‡à¤²à¤¾ à¤†à¤¹à¥‡.'
    },
    stages: [
      {
        stageNumber: 1,
        tagline: { en: '01 â€” SOURCE', mr: 'à¥¦à¥§ â€” à¤ªà¤¾à¤¨à¥‡' },
        title: { en: 'Assam CTC Tea', mr: 'à¤†à¤¸à¤¾à¤® à¤¸à¥€à¤Ÿà¥€à¤¸à¥€ à¤ªà¤¾à¤¨à¥‡' },
        description: {
          en: 'Dense, brisk CTC granules that give strong amber color and body.',
          mr: 'à¤šà¤¹à¤¾à¤²à¤¾ à¤•à¤¡à¤• à¤°à¤‚à¤— à¤†à¤£à¤¿ à¤šà¤µ à¤¦à¥‡à¤£à¤¾à¤°à¥€ à¤†à¤¸à¤¾à¤®à¤šà¥€ à¤¦à¤¾à¤£à¥‡à¤¦à¤¾à¤° à¤ªà¤¾à¤¨à¥‡.'
        },
        imageSlotId: 'CRAFT_STAGE_1'
      },
      {
        stageNumber: 2,
        tagline: { en: '02 â€” SELECT', mr: 'à¥¦à¥¨ â€” à¤®à¤¸à¤¾à¤²à¥‡' },
        title: { en: 'Whole Spices & Jaggery', mr: 'à¤…à¤–à¥à¤–à¥‡ à¤®à¤¸à¤¾à¤²à¥‡ à¤µ à¤—à¥‚à¤³' },
        description: {
          en: 'Cardamom pods, sun-dried ginger, mace, nutmeg, and organic cane jaggery.',
          mr: 'à¤¹à¤¿à¤°à¤µà¥€ à¤µà¥‡à¤²à¤šà¥€, à¤¸à¥à¤‚à¤ , à¤œà¤¾à¤¯à¤ªà¤¤à¥à¤°à¥€, à¤œà¤¾à¤¯à¤«à¤³ à¤†à¤£à¤¿ à¤¶à¥à¤¦à¥à¤§ à¤—à¥‚à¤³.'
        },
        imageSlotId: 'CRAFT_STAGE_2'
      },
      {
        stageNumber: 3,
        tagline: { en: '03 â€” BLEND', mr: 'à¥¦à¥© â€” à¤ªà¥à¤°à¤®à¤¾à¤£' },
        title: { en: 'Measured Blending', mr: 'à¤…à¤šà¥‚à¤• à¤®à¤¿à¤¶à¥à¤°à¤£' },
        description: {
          en: 'Spices and jaggery balanced to prevent milk curdling when boiled.',
          mr: 'à¤‰à¤•à¤³à¤¤à¤¾à¤¨à¤¾ à¤¦à¥‚à¤§ à¤«à¤¾à¤Ÿà¤£à¤¾à¤° à¤¨à¤¾à¤¹à¥€ à¤¯à¤¾ à¤…à¤šà¥‚à¤• à¤ªà¥à¤°à¤®à¤¾à¤£à¤¾à¤µà¤° à¤¤à¤¯à¤¾à¤° à¤•à¥‡à¤²à¥‡à¤²à¥‡ à¤®à¤¿à¤¶à¥à¤°à¤£.'
        },
        imageSlotId: 'CRAFT_STAGE_3'
      },
      {
        stageNumber: 4,
        tagline: { en: '04 â€” BREW', mr: 'à¥¦à¥ª â€” à¤‰à¤•à¤³à¥€' },
        title: { en: '3-Minute Simmer', mr: 'à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡ à¤‰à¤•à¤³à¤£à¥‡' },
        description: {
          en: 'Mix equal parts water and milk, add Lata Teamix, and boil for 2 to 3 minutes.',
          mr: 'à¤¸à¤®à¤¾à¤¨ à¤ªà¤¾à¤£à¥€ à¤†à¤£à¤¿ à¤¦à¥‚à¤§ à¤˜à¥à¤¯à¤¾, à¤²à¤¤à¤¾ à¤Ÿà¥€ à¤˜à¤¾à¤²à¤¾ à¤†à¤£à¤¿ à¥¨ à¤¤à¥‡ à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡ à¤‰à¤•à¤³à¤¾.'
        },
        imageSlotId: 'CRAFT_STAGE_4'
      },
      {
        stageNumber: 5,
        tagline: { en: '05 â€” SERVE', mr: 'à¥¦à¥« â€” à¤¸à¤°à¥à¤µà¥à¤¹' },
        title: { en: 'Strain & Enjoy', mr: 'à¤—à¤¾à¤³à¥‚à¤¨ à¤†à¤¸à¥à¤µà¤¾à¤¦ à¤˜à¥à¤¯à¤¾' },
        description: {
          en: 'Strain into cups. Clean jaggery sweetness with aromatic cardamom notes.',
          mr: 'à¤•à¤ªà¤¾à¤¤ à¤—à¤¾à¤³à¤¾. à¤µà¥‡à¤²à¤šà¥€à¤šà¤¾ à¤¸à¥à¤—à¤‚à¤§ à¤†à¤£à¤¿ à¤—à¥à¤³à¤¾à¤šà¤¾ à¤—à¥‹à¤¡à¤µà¤¾ à¤…à¤¨à¥à¤­à¤µà¤¾.'
        },
        imageSlotId: 'CRAFT_STAGE_5'
      }
    ]
  },

  // 06 THE EXPERIENCE
  experience: {
    tagline: {
      en: 'THE CUP',
      mr: 'à¤…à¤¨à¥à¤­à¤µ'
    },
    heading: {
      en: 'Warmth in Every Cup',
      mr: 'à¤ªà¥à¤°à¤¤à¥à¤¯à¥‡à¤• à¤•à¤ªà¤¾à¤¤ à¤†à¤ªà¥à¤²à¤•à¥€à¤šà¥€ à¤‰à¤¬'
    },
    subheading: {
      en: 'A comforting cup of spiced tea for morning routines and afternoon breaks.',
      mr: 'à¤¸à¤•à¤¾à¤³à¤šà¥à¤¯à¤¾ à¤ªà¥à¤°à¤¸à¤¨à¥à¤¨à¤¤à¥‡à¤¸à¤¾à¤ à¥€ à¤†à¤£à¤¿ à¤¦à¥à¤ªà¤¾à¤°à¤šà¥à¤¯à¤¾ à¤¥à¤•à¤µà¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤‰à¤¤à¥à¤¤à¤® à¤šà¤¹à¤¾.'
    },
    sensoryDescription: {
      en: 'The smell of crushed cardamom in boiling milk, the golden color of Assam leaves, and the gentle caramel note of cane jaggery.',
      mr: 'à¤‰à¤•à¤³à¤¤à¥à¤¯à¤¾ à¤¦à¥à¤§à¤¾à¤¤à¥€à¤² à¤µà¥‡à¤²à¤šà¥€à¤šà¤¾ à¤¦à¤°à¤µà¤³, à¤†à¤¸à¤¾à¤® à¤ªà¤¾à¤¨à¤¾à¤‚à¤šà¤¾ à¤¤à¤¾à¤‚à¤¬à¥‚à¤¸ à¤°à¤‚à¤— à¤†à¤£à¤¿ à¤—à¥à¤³à¤¾à¤šà¤¾ à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‹à¤¡à¤µà¤¾.'
    },
    ritualSteps: [
      {
        title: { en: 'Aroma', mr: 'à¤¸à¥à¤—à¤‚à¤§' },
        note: { en: 'Fresh cardamom and warm ginger.', mr: 'à¤¤à¤¾à¤œà¥€ à¤µà¥‡à¤²à¤šà¥€ à¤†à¤£à¤¿ à¤¸à¥à¤‚à¤ à¥€à¤šà¤¾ à¤¸à¥à¤—à¤‚à¤§.' }
      },
      {
        title: { en: 'Body', mr: 'à¤˜à¤Ÿà¥à¤Ÿà¤ªà¤£à¤¾' },
        note: { en: 'Velvety texture that holds in whole milk.', mr: 'à¤¦à¥à¤§à¤¾à¤¤ à¤®à¤¿à¤¸à¤³à¤£à¤¾à¤°à¤¾ à¤®à¤Š à¤¦à¤¾à¤Ÿà¤ªà¤£à¤¾.' }
      },
      {
        title: { en: 'Taste', mr: 'à¤šà¤µ' },
        note: { en: 'Clean cane jaggery with zero bitterness.', mr: 'à¤•à¥‹à¤£à¤¤à¤¾à¤¹à¥€ à¤•à¤¡à¥‚à¤ªà¤£à¤¾ à¤¨à¤¸à¤²à¥‡à¤²à¤¾ à¤—à¥à¤³à¤¾à¤šà¤¾ à¤—à¥‹à¤¡à¤µà¤¾.' }
      }
    ],
    imageSlotId: 'STORY_IMAGE_PRIMARY'
  },

  // 08 WHY Lata Teamix
  whyLata: {
    tagline: {
      en: 'KEY FACTS',
      mr: 'à¤®à¤¹à¤¤à¥à¤¤à¥à¤µà¤¾à¤šà¥‡'
    },
    heading: {
      en: 'Honest Standards',
      mr: 'à¤†à¤®à¤šà¥€ à¤®à¤¾à¤¨à¤•à¥‡'
    },
    subheading: {
      en: 'Clear ingredients, no synthetic flavorings.',
      mr: 'à¤¶à¥à¤¦à¥à¤§ à¤˜à¤Ÿà¤•, à¤•à¥‹à¤£à¤¤à¥‡à¤¹à¥€ à¤•à¥ƒà¤¤à¥à¤°à¤¿à¤® à¤«à¥à¤²à¥‡à¤µà¤° à¤¨à¤¾à¤¹à¥€.'
    },
    pillars: [
      {
        title: { en: 'Natural Cane Jaggery', mr: 'à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‚à¤³' },
        description: { 
          en: 'Sweetened with unrefined jaggery. No white sugar or synthetic syrup.',
          mr: 'à¤•à¥‡à¤µà¤³ à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‚à¤³. à¤ªà¤¾à¤‚à¤¢à¤°à¥€ à¤¸à¤¾à¤–à¤° à¤•à¤¿à¤‚à¤µà¤¾ à¤¸à¤¿à¤°à¤ª à¤¨à¤¾à¤¹à¥€.'
        },
        metric: '100%',
        icon: 'Leaf'
      },
      {
        title: { en: 'Non-Curdling Formula', mr: 'à¤¦à¥‚à¤§ à¤¨ à¤«à¤¾à¤Ÿà¤£à¥à¤¯à¤¾à¤šà¥€ à¤¹à¤®à¥€' },
        description: { 
          en: 'Calibrated acidity allows boiling directly in dairy milk.',
          mr: 'à¤¥à¥‡à¤Ÿ à¤¦à¥à¤§à¤¾à¤¤ à¤‰à¤•à¤³à¤£à¥à¤¯à¤¾à¤¸à¤¾à¤ à¥€ à¤¸à¤‚à¤¤à¥à¤²à¤¿à¤¤ à¤®à¤¿à¤¶à¥à¤°à¤£.'
        },
        metric: '0%',
        icon: 'ShieldCheck'
      },
      {
        title: { en: 'FSSAI Certified Unit', mr: 'à¤ªà¥à¤°à¤®à¤¾à¤£à¤¿à¤¤ à¤‰à¤¤à¥à¤ªà¤¾à¤¦à¤¨' },
        description: { 
          en: 'Blended and packed in our licensed facility.',
          mr: 'à¤ªà¥à¤£à¥à¤¯à¤¾à¤¤à¥€à¤² à¤¨à¥‹à¤‚à¤¦à¤£à¥€à¤•à¥ƒà¤¤ à¤¯à¥à¤¨à¤¿à¤Ÿà¤®à¤§à¥à¤¯à¥‡ à¤ªà¥…à¤•à¤¿à¤‚à¤—.'
        },
        metric: 'ISO 22000',
        icon: 'Award'
      },
      {
        title: { en: '3-Minute Brew', mr: 'à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚à¤¤ à¤¤à¤¯à¤¾à¤°' },
        description: { 
          en: 'Simple 1:1 milk and water boil. Ready fast for homes and offices.',
          mr: 'à¤ªà¤¾à¤£à¥€ à¤µ à¤¦à¥à¤§à¤¾à¤¤ à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¥‡ à¤‰à¤•à¤³à¤¾ à¤†à¤£à¤¿ à¤šà¤¹à¤¾ à¤¤à¤¯à¤¾à¤°.'
        },
        metric: '3 Min',
        icon: 'Clock'
      }
    ]
  },

  // 10 FINAL BRAND STATEMENT
  brandStatement: {
    quote: {
      en: 'â€œReal tea. Real jaggery. Ready in 3 minutes.â€',
      mr: 'â€œà¤…à¤¸à¥à¤¸à¤² à¤šà¤¹à¤¾. à¤¶à¥à¤¦à¥à¤§ à¤—à¥‚à¤³. à¤…à¤µà¤˜à¥à¤¯à¤¾ à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚à¤¤.â€'
    },
    subtext: {
      en: 'Maharashtra',
      mr: 'à¤ªà¥à¤£à¥‡, à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°'
    },
    author: {
      en: 'Lata Teamix',
      mr: 'à¤²à¤¤à¤¾ à¤Ÿà¥€'
    }
  },

  // CONTACT & ENQUIRIES
  contact: {
    tagline: {
      en: 'COMMERCIAL INQUIRIES',
      mr: 'à¤µà¥à¤¯à¤¾à¤µà¤¸à¤¾à¤¯à¤¿à¤• à¤¸à¤‚à¤ªà¤°à¥à¤•'
    },
    heading: {
      en: 'Contact & Sample Requests',
      mr: 'à¤¸à¤‚à¤ªà¤°à¥à¤• à¤†à¤£à¤¿ à¤¨à¤®à¥à¤¨à¥‡'
    },
    subheading: {
      en: 'For distributor inquiries, hotel partnerships, and sample kits.',
      mr: 'à¤µà¤¿à¤¤à¤°à¤•, à¤¹à¥‰à¤Ÿà¥‡à¤²à¥à¤¸ à¤†à¤£à¤¿ à¤®à¥‹à¤«à¤¤ à¤¨à¤®à¥à¤¨à¤¾ à¤šà¤¹à¤¾à¤¸à¤¾à¤ à¥€ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¤¾.'
    },
    enquiryNotice: {
      en: 'We respond within 24 business hours.',
      mr: 'à¤†à¤®à¥à¤¹à¥€ à¥¨à¥ª à¤¤à¤¾à¤¸à¤¾à¤‚à¤¤ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤•à¤°à¥‚.'
    }
  },

  // FOOTER
  footer: {
    aboutText: {
      en: 'Lata Teamix is manufactured in Maharashtra. Natural jaggery tea and basundi premixes.',
      mr: 'à¤ªà¥à¤£à¥‡, à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°. à¤¨à¥ˆà¤¸à¤°à¥à¤—à¤¿à¤• à¤—à¥‚à¤³ à¤šà¤¹à¤¾ à¤†à¤£à¤¿ à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤ªà¥à¤°à¥€à¤®à¤¿à¤•à¥à¤¸.'
    },
    copyrightText: {
      en: 'Â© 2026 Lata Private Limited. All rights reserved.',
      mr: 'Â© à¥¨à¥¦à¥¨à¥¬ à¤²à¤¤à¤¾ à¤Ÿà¥€à¤®à¤¿à¤•à¥à¤¸. à¤¸à¤°à¥à¤µ à¤¹à¤•à¥à¤• à¤°à¤¾à¤–à¥€à¤µ.'
    },
    legalLinks: [
      { label: { en: 'Privacy Policy', mr: 'à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾ à¤§à¥‹à¤°à¤£' }, url: '/privacy' },
      { label: { en: 'Terms of Service', mr: 'à¤¨à¤¿à¤¯à¤® à¤µ à¤…à¤Ÿà¥€' }, url: '/terms' },
      
    ]
  }
};

export const INITIAL_CMS_STATE: CMSState = {
  version: 10,
  status: 'published',
  lastPublishedAt: new Date().toISOString(),
  lastSavedAt: new Date().toISOString(),
  defaultLanguage: 'en',
  sections: [
    { id: 'sec_hero', key: 'hero', name: 'Hero', description: 'Hero statement and links', isEnabled: true, order: 1, bgType: 'green' },
    { id: 'sec_story', key: 'story', name: 'Our Story', description: 'Brand background and jaggery approach', isEnabled: true, order: 2, bgType: 'cream' },
    { id: 'sec_heritage', key: 'heritage', name: 'Heritage', description: 'Assam tea and Maharashtra jaggery roots', isEnabled: true, order: 4, bgType: 'cream' },
    { id: 'sec_craft', key: 'craft', name: 'The Process', description: '5 stages of tea preparation', isEnabled: true, order: 5, bgType: 'white' },
    { id: 'sec_tea', key: 'tea', name: 'Tea Collection', description: 'Signature tea blends', isEnabled: true, order: 5, bgType: 'cream' },
    { id: 'sec_experience', key: 'experience', name: 'Experience', description: 'Tasting notes and aroma', isEnabled: true, order: 6, bgType: 'white' },
    { id: 'sec_why', key: 'why', name: 'Key Facts', description: 'Standards and differentiators', isEnabled: true, order: 7, bgType: 'cream' },
    { id: 'sec_statement', key: 'statement', name: 'Statement', description: 'Closing brand quote', isEnabled: true, order: 8, bgType: 'green' },
    { id: 'sec_contact', key: 'contact', name: 'Contact', description: 'Statutory info and inquiry forms', isEnabled: true, order: 9, bgType: 'white' }
  ],
  navigation: DEFAULT_NAVIGATION,
  teaStories: DEFAULT_TEA_STORIES,
  recipes: [
    {
      id: 'r1',
      titleEn: 'Gud Basundi Tea',
      titleMr: 'à¤—à¥‚à¤³ à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤šà¤¹à¤¾',
      instructionsEn: 'STEP 1: Add required quantity of tea mix.\nSTEP 2: Add hot water/milk as applicable.\nSTEP 3: Mix according to the recommended preparation method.\nSTEP 4: Serve.',
      instructionsMr: 'à¤¸à¥à¤Ÿà¥‡à¤ª à¥§: à¤†à¤µà¤¶à¥à¤¯à¤• à¤ªà¥à¤°à¤®à¤¾à¤£à¤¾à¤¤ à¤šà¤¹à¤¾ à¤®à¤¿à¤•à¥à¤¸ à¤˜à¤¾à¤²à¤¾.\nà¤¸à¥à¤Ÿà¥‡à¤ª à¥¨: à¤†à¤µà¤¶à¥à¤¯à¤•à¤¤à¥‡à¤¨à¥à¤¸à¤¾à¤° à¤—à¤°à¤® à¤ªà¤¾à¤£à¥€/à¤¦à¥‚à¤§ à¤˜à¤¾à¤²à¤¾.\nà¤¸à¥à¤Ÿà¥‡à¤ª à¥©: à¤¶à¤¿à¤«à¤¾à¤°à¤¸ à¤•à¥‡à¤²à¥‡à¤²à¥à¤¯à¤¾ à¤ªà¤¦à¥à¤§à¤¤à¥€à¤¨à¥à¤¸à¤¾à¤° à¤®à¤¿à¤•à¥à¤¸ à¤•à¤°à¤¾.\nà¤¸à¥à¤Ÿà¥‡à¤ª à¥ª: à¤¸à¤°à¥à¤µà¥à¤¹ à¤•à¤°à¤¾.',
      displayOrder: 1,
      isVisible: true
    }
  ],
  helpfulVideos: [
    {
      id: 'v1',
      instagramUrl: 'https://www.instagram.com/p/C_mF1GwvqfH/',
      titleEn: 'How to prepare Gud Basundi Tea',
      titleMr: 'à¤—à¥‚à¤³ à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤šà¤¹à¤¾ à¤•à¤¸à¤¾ à¤¬à¤¨à¤µà¤¾à¤¯à¤šà¤¾',
      descriptionEn: 'A quick guide to making the perfect cup of Lata Teamix.',
      descriptionMr: 'à¤²à¤¤à¤¾ à¤Ÿà¥€à¤®à¤¿à¤•à¥à¤¸à¤šà¤¾ à¤‰à¤¤à¥à¤¤à¤® à¤šà¤¹à¤¾ à¤¬à¤¨à¤µà¤£à¥à¤¯à¤¾à¤šà¥€ à¤à¤• à¤¦à¥à¤°à¥à¤¤ à¤®à¤¾à¤°à¥à¤—à¤¦à¤°à¥à¤¶à¤•.',
      displayOrder: 1,
      isVisible: true,
      thumbnailUrl: 'https://latatea.vercel.app/media_royal_bowl.jpg'
    }
  ],
  processSteps: [
    { id: 1, titleEn: 'Enquire', titleMr: 'à¤šà¥Œà¤•à¤¶à¥€ à¤•à¤°à¤¾', descEn: 'Connect with our team.', descMr: 'à¤†à¤®à¤šà¥à¤¯à¤¾ à¤Ÿà¥€à¤®à¤¶à¥€ à¤¸à¤‚à¤ªà¤°à¥à¤• à¤¸à¤¾à¤§à¤¾.' },
    { id: 2, titleEn: 'Select Products', titleMr: 'à¤‰à¤¤à¥à¤ªà¤¾à¤¦à¤¨à¥‡ à¤¨à¤¿à¤µà¤¡à¤¾', descEn: 'Choose your tea blend.', descMr: 'à¤¤à¥à¤®à¤šà¤¾ à¤šà¤¹à¤¾ à¤¬à¥à¤²à¥‡à¤‚à¤¡ à¤¨à¤¿à¤µà¤¡à¤¾.' },
    { id: 3, titleEn: 'Confirm Order', titleMr: 'à¤‘à¤°à¥à¤¡à¤° à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤ à¤•à¤°à¤¾', descEn: 'Confirm quantity.', descMr: 'à¤‘à¤°à¥à¤¡à¤° à¤¨à¤¿à¤¶à¥à¤šà¤¿à¤¤ à¤•à¤°à¤¾.' },
    { id: 4, titleEn: 'Processing', titleMr: 'à¤ªà¥à¤°à¤•à¥à¤°à¤¿à¤¯à¤¾', descEn: 'Fresh blending.', descMr: 'à¤¤à¤¾à¤œà¥‡ à¤¬à¥à¤²à¥‡à¤‚à¤¡à¤¿à¤‚à¤—.' },
    { id: 5, titleEn: 'Packing', titleMr: 'à¤ªà¥…à¤•à¤¿à¤‚à¤—', descEn: 'Packed for freshness.', descMr: 'à¤¤à¤¾à¤œà¥‡à¤ªà¤£à¤¾à¤¸à¤¾à¤ à¥€ à¤ªà¥…à¤•à¤¿à¤‚à¤—.' },
    { id: 6, titleEn: 'Dispatch', titleMr: 'à¤¡à¤¿à¤¸à¥à¤ªà¥…à¤š', descEn: 'Careful loading.', descMr: 'à¤•à¤¾à¤³à¤œà¥€à¤ªà¥‚à¤°à¥à¤µà¤• à¤²à¥‹à¤¡à¤¿à¤‚à¤—.' },
    { id: 7, titleEn: 'Delivery', titleMr: 'à¤µà¤¿à¤¤à¤°à¤£', descEn: 'Delivered to your location.', descMr: 'à¤¤à¥à¤®à¤šà¥à¤¯à¤¾ à¤¸à¥à¤¥à¤¾à¤¨à¤¾à¤µà¤° à¤µà¤¿à¤¤à¤°à¤£.' }
  ],
  categories: [
    { id: 'cat_all', slug: 'all', name: { en: 'All Teas', mr: 'à¤¸à¤°à¥à¤µ à¤šà¤¹à¤¾' }, order: 1, isVisible: true },
    { id: 'cat_gud', slug: 'gud', name: { en: 'Jaggery Blends', mr: 'à¤—à¥à¤³à¤¾à¤šà¥‡ à¤¬à¥à¤²à¥‡à¤‚à¤¡à¥à¤¸' }, order: 2, isVisible: true },
    { id: 'cat_sugar', slug: 'sugar', name: { en: 'Basundi Series', mr: 'à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤¸à¤¿à¤°à¥€à¤œ' }, order: 4, isVisible: true },
    { id: 'cat_premixes', slug: 'premixes', name: { en: 'Premixes', mr: 'à¤ªà¥à¤°à¥€à¤®à¤¿à¤•à¥à¤¸' }, order: 5, isVisible: true }
  ],
  domains: DEFAULT_DOMAINS,
  mediaLibrary: DEFAULT_MEDIA_ITEMS,
  mediaSlots: DEFAULT_MEDIA_SLOTS,
  content: DEFAULT_STORY_CONTENT,
  brand: {
    primaryColor: '#1E3F20',
    secondaryColor: '#8DB843',
    accentColor: '#E58A1F',
    backgroundColor: '#FAF6EE',
    textColor: '#1A2416',
    logoSlotId: 'BRAND_LOGO_PRIMARY',
    lightLogoSlotId: 'BRAND_LOGO_LIGHT',
    fontHeading: 'Cinzel, Rozha One, serif',
    fontBody: 'Plus Jakarta Sans, sans-serif'
  },
  contact: {
    companyName: 'Lata Private Limited',
    address: '679/2, Chakan - Alandi Rd, Alandi Fata, Kurli, Maharashtra 410501',
    email: 'info@latatea.com',
    phone1: '+91 7666953873',
    phone2: '+91 8483067383',
    phone3: '',
    whatsapp: '+91 7666953873',
    website: 'https://latatea.com',
    googleMapsUrl: 'https://maps.google.com/?q=Chakan+Pune',
    socials: {
      instagram: 'https://instagram.com/latatea_official',
      facebook: 'https://facebook.com/latatea',
      linkedin: 'https://linkedin.com/company/latatea',
      whatsapp: 'https://wa.me/917666953873'
    }
  },
  seo: {
    seoTitle: {
      en: 'Lata Teamix â€” Pure Jaggery Basundi Chai',
      mr: 'à¤²à¤¤à¤¾ à¤Ÿà¥€ â€” à¤…à¤¸à¥à¤¸à¤² à¤—à¥‚à¤³ à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤šà¤¹à¤¾'
    },
    metaDescription: {
      en: 'Assam CTC tea and pure cane jaggery. Ready in 3 minutes. Made in Maharashtra.',
      mr: 'à¤†à¤¸à¤¾à¤® à¤šà¤¹à¤¾ à¤†à¤£à¤¿ à¤¶à¥à¤¦à¥à¤§ à¤—à¥‚à¤³. à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚à¤¤ à¤¤à¤¯à¤¾à¤°. à¤ªà¥à¤£à¥‡, à¤®à¤¹à¤¾à¤°à¤¾à¤·à¥à¤Ÿà¥à¤°.'
    },
    ogTitle: {
      en: 'Lata Teamix â€” Jaggery Basundi Chai',
      mr: 'à¤²à¤¤à¤¾ à¤Ÿà¥€ â€” à¤—à¥‚à¤³ à¤¬à¤¾à¤¸à¥à¤‚à¤¦à¥€ à¤šà¤¹à¤¾'
    },
    ogDescription: {
      en: 'Authentic Indian jaggery tea and basundi premixes ready in 3 minutes.',
      mr: 'à¥© à¤®à¤¿à¤¨à¤¿à¤Ÿà¤¾à¤‚à¤¤ à¤¤à¤¯à¤¾à¤° à¤¹à¥‹à¤£à¤¾à¤°à¤¾ à¤…à¤¸à¥à¤¸à¤² à¤—à¥à¤³à¤¾à¤šà¤¾ à¤šà¤¹à¤¾.'
    },
    ogImageSlotId: 'HOME_HERO_PRIMARY',
    canonicalUrl: 'https://latatea.com',
    robots: 'index, follow'
  }
};

export const BROCHURE_CONTACT_PRESET = INITIAL_CMS_STATE.contact;

