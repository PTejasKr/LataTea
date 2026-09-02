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
    id: 'nav_story', 
    label: { en: 'Our Story', mr: 'आमची गोष्ट' }, 
    url: '/story', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 1 
  },
  { 
    id: 'nav_craft', 
    label: { en: 'The Process', mr: 'पद्धत' }, 
    url: '/craft', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 2 
  },
  { 
    id: 'nav_tea', 
    label: { en: 'Teas', mr: 'चहा' }, 
    url: '/tea', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 3 
  },
  { 
    id: 'nav_contact', 
    label: { en: 'Contact', mr: 'संपर्क' }, 
    url: '/contact', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 4 
  }
];

export const DEFAULT_TEA_STORIES: TeaStoryItem[] = [
  {
    id: 'tea_gud_basundi',
    slug: 'gud-basundi-tea',
    name: {
      en: 'Gud Basundi Tea',
      mr: 'गूळ बासुंदी चहा'
    },
    tagline: {
      en: 'Spiced Jaggery Chai',
      mr: 'मसाला गूळ चहा'
    },
    category: 'gud',
    categoryName: {
      en: 'Jaggery Blends',
      mr: 'गूळ चहा'
    },
    shortDescription: {
      en: 'Assam CTC tea blended with natural cane jaggery, cardamom, mace, nutmeg, and ginger.',
      mr: 'आसाम चहा, नैसर्गिक गूळ, वेलची, जायपत्री, जायफळ आणि सुंठीचे मिश्रण.'
    },
    editorialStory: {
      en: 'A rich, creamy chai inspired by western Indian milk sweets. Blended so jaggery dissolves into boiling milk without curdling, giving a clean caramel sweetness and warm spice finish in 3 minutes.',
      mr: 'पारंपरिक बासुंदीच्या स्वादाने प्रेरित. उकळत्या दुधात न फाटता परिपूर्ण विरघळणारा हा चहा ३ मिनिटांत तयार होतो.'
    },
    tastingNotes: [
      { en: 'Caramel jaggery', mr: 'गुळाचा गोडवा' },
      { en: 'Crushed cardamom', mr: 'हिरवी वेलची' },
      { en: 'Bold Assam finish', mr: 'कडक आसाम चहा' }
    ],
    ingredients: [
      { en: 'Assam CTC Tea', mr: 'आसाम सीटीसी चहा' },
      { en: 'Organic Cane Jaggery', mr: 'सेंद्रिय गूळ' },
      { en: 'Cardamom, Ginger, Mace, Nutmeg', mr: 'वेलची, सुंठ, जायपत्री, जायफळ' }
    ],
    origin: {
      en: 'Assam & Kolhapur',
      mr: 'आसाम व कोल्हापूर'
    },
    servingRitual: {
      en: 'Simmer with equal parts water and milk for 2 to 3 minutes.',
      mr: 'समान प्रमाणात पाणी व दूध एकत्र करून २ ते ३ मिनिटे उकळा.'
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
      mr: 'गूळ साधा चहा'
    },
    tagline: {
      en: 'Classic Jaggery & Tea',
      mr: 'अस्सल साधा गूळ चहा'
    },
    category: 'gud',
    categoryName: {
      en: 'Jaggery Blends',
      mr: 'गूळ चहा'
    },
    shortDescription: {
      en: 'Unrefined cane jaggery with strong Assam CTC tea, without spices.',
      mr: 'मसाल्यांशिवाय, फक्त कडक आसाम चहा आणि देशी गूळ.'
    },
    editorialStory: {
      en: 'For everyday drinking. Clean, earthy jaggery paired directly with brisk black tea leaves. No white sugar, no preservatives.',
      mr: 'दैनंदिन चहासाठी. पांढरी साखर नाही, कोणतेही प्रिझर्व्हेटिव्ह नाहीत.'
    },
    tastingNotes: [
      { en: 'Natural cane sweetness', mr: 'नैसर्गिक गोडवा' },
      { en: 'Robust CTC body', mr: 'कडक रंग' },
      { en: 'Clean finish', mr: 'हलकी चव' }
    ],
    ingredients: [
      { en: 'Assam CTC Tea Granules', mr: 'आसाम सीटीसी चहा दाणे' },
      { en: 'Organic Desi Jaggery', mr: 'देशी सेंद्रिय गूळ' }
    ],
    origin: {
      en: 'Upper Assam',
      mr: 'अप्पर आसाम'
    },
    servingRitual: {
      en: 'Boil in milk for 2 to 3 minutes.',
      mr: 'दुधात २ ते ३ मिनिटे उकळा.'
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
      mr: 'साखर बासुंदी चहा'
    },
    tagline: {
      en: 'Spiced Dairy Chai',
      mr: 'मसाला बासुंदी चहा'
    },
    category: 'sugar',
    categoryName: {
      en: 'Basundi Series',
      mr: 'बासुंदी मालिका'
    },
    shortDescription: {
      en: 'Cardamom and nutmeg spiced tea blend formulated for thick, creamy chai.',
      mr: 'घट्ट, मलईदार चहासाठी वेलची आणि जायफळयुक्त मिश्रण.'
    },
    editorialStory: {
      en: 'Delivers the mouthfeel of slow-cooked basundi chai with whole-ground spices and strong Assam tea in standard brewing time.',
      mr: 'संथपणे उकळवलेल्या पारंपरिक चहाची चव घरच्या घरी कमी वेळेत मिळवा.'
    },
    tastingNotes: [
      { en: 'Creamy texture', mr: 'मखमली घट्टपणा' },
      { en: 'Aromatic cardamom', mr: 'वेलचीचा सुगंध' },
      { en: 'Ginger warmth', mr: 'सुंठीची उब' }
    ],
    ingredients: [
      { en: 'Assam Tea Blend', mr: 'आसाम चहा' },
      { en: 'Cane Sugar', mr: 'साखर' },
      { en: 'Cardamom, Ginger, Mace, Nutmeg', mr: 'वेलची, सुंठ, जायपत्री, जायफळ' }
    ],
    origin: {
      en: 'Assam & Western Ghats',
      mr: 'आसाम व पश्चिम घाट'
    },
    servingRitual: {
      en: 'Boil with whole milk for 3 minutes.',
      mr: 'दुधात ३ मिनिटे उकळा.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 3,
    isFeatured: true,
    isVisible: true
  },
  {
    id: 'tea_instant_premix',
    slug: 'instant-basundi-premix',
    name: {
      en: '3-in-1 Basundi Premix',
      mr: '३-इन-१ बासुंदी प्रीमिक्स'
    },
    tagline: {
      en: 'Instant Hot Water Mix',
      mr: 'इन्स्टंट प्रीमिक्स'
    },
    category: 'premixes',
    categoryName: {
      en: 'Instant Premixes',
      mr: 'इन्स्टंट प्रीमिक्स'
    },
    shortDescription: {
      en: 'Dairy milk solids, tea extract, and spices. Just add hot water.',
      mr: 'दुधाची भुकटी, चहा अर्क आणि मसाले. फक्त गरम पाणी घाला.'
    },
    editorialStory: {
      en: 'Granulated premix designed for offices, hotels, and vending machines. Dissolves cleanly without clumping.',
      mr: 'ऑफिस आणि हॉटेलसाठी सोयीस्कर. पाण्यात सहज विरघळणारे दाणेदार मिश्रण.'
    },
    tastingNotes: [
      { en: 'Consistent taste', mr: 'एकसारखी चव' },
      { en: 'Balanced spice', mr: 'संतुलित मसाला' },
      { en: 'Instant cup', mr: 'झटपट तयार' }
    ],
    ingredients: [
      { en: 'Dairy Milk Powder', mr: 'दुधाची पावडर' },
      { en: 'Black Tea Extract', mr: 'चहा अर्क' },
      { en: 'Spice Extracts', mr: 'मसाला अर्क' }
    ],
    origin: {
      en: 'Pune, Maharashtra',
      mr: 'पुणे, महाराष्ट्र'
    },
    servingRitual: {
      en: 'Add 14g to 80ml hot water and stir.',
      mr: '८० मिली गरम पाण्यात १४ ग्रॅम घालून ढवळा.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 4,
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
      en: 'LATA TEA • PUNE',
      mr: 'लता टी • पुणे'
    },
    headline: {
      en: 'Pure Jaggery Basundi Chai',
      mr: 'अस्सल गूळ बासुंदी चहा'
    },
    subheadline: {
      en: 'Strong Assam CTC tea, whole spices, and organic cane jaggery. Ready in 3 minutes without curdling milk.',
      mr: 'आसाम चहा, अख्खे मसाले आणि सेंद्रिय गूळ. दूध न फाटता ३ मिनिटांत तयार.'
    },
    primaryCtaText: {
      en: 'Explore Teas',
      mr: 'चहा पहा'
    },
    primaryCtaLink: '#tea',
    secondaryCtaText: {
      en: 'Our Story',
      mr: 'आमची गोष्ट'
    },
    secondaryCtaLink: '#story',
    badgeText: {
      en: 'Natural Jaggery',
      mr: 'नैसर्गिक गूळ'
    }
  },

  // 02 THE STORY
  story: {
    tagline: {
      en: 'ABOUT LATA TEA',
      mr: 'आमच्याबद्दल'
    },
    heading: {
      en: 'Real Chai, Unrefined Sweetness',
      mr: 'अस्सल चहा, नैसर्गिक गोडवा'
    },
    subheading: {
      en: 'Made in Pune by Purple Bean Agro Industries Private Limited.',
      mr: 'पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड, पुणे.'
    },
    introduction: {
      en: 'Most everyday tea relies on refined white sugar. We built Lata Tea to give families and businesses an easy way to brew traditional jaggery chai without milk curdling or burnt notes.',
      mr: 'रोजच्या चहात पांढऱ्या साखरेचा वापर जास्त होतो. दूध न फाटता घरच्या घरी गुळाचा चहा बनवता यावा यासाठी आम्ही लता टी ची सुरुवात केली.'
    },
    paragraphs: [
      {
        en: 'We source strong CTC leaves from Assam and blend them with unrefined cane jaggery and crushed spices: green cardamom, ginger root, mace, and nutmeg.',
        mr: 'आम्ही आसामचा कडक चहा, नैसर्गिक देशी गूळ आणि वेलची, सुंठ, जायपत्री व जायफळ एकत्र करून हे मिश्रण तयार करतो.'
      },
      {
        en: 'Our facility in Pune operates under FSSAI and ISO 22000 hygiene certifications, supplying households, corporate pantries, and restaurants across India.',
        mr: 'पुणे येथील अन्न सुरक्षा प्रमाणित युनिटमध्ये तयार केलेला हा चहा देशभरातील घरे आणि कार्यालयांना पुरवला जातो.'
      }
    ],
    quote: {
      en: '“Pure ingredients. Honest ratios. No shortcuts.”',
      mr: '“शुद्ध घटक, प्रामाणिक प्रमाण.”'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY'
  },

  // 03 HERITAGE
  heritage: {
    tagline: {
      en: 'SOURCE & ROOTS',
      mr: 'उगम'
    },
    heading: {
      en: 'Assam Tea & Maharashtra Jaggery',
      mr: 'आसाम चहा आणि महाराष्ट्राचा गूळ'
    },
    subheading: {
      en: 'Two distinct agricultural regions brought together in one kettle.',
      mr: 'दोन प्रांतांची निसर्गदत्त देणगी एका कपात.'
    },
    narrative: {
      en: 'We source tea directly from Assam tea gardens and combine it with cane jaggery from western Maharashtra.',
      mr: 'आसामच्या बागांमधील ताजी चहाची पाने आणि पश्चिम महाराष्ट्रातील गूळ यांचा समतोल.'
    },
    milestones: [
      {
        year: 'Origin',
        title: { en: 'Kolhapur Jaggery', mr: 'कोल्हापुरी गूळ' },
        description: { 
          en: 'Unrefined sugarcane jaggery prepared with traditional boiling methods.',
          mr: 'पारंपरिक पद्धतीने तयार केलेला शुद्ध सेंद्रिय गूळ.'
        }
      },
      {
        year: 'Formulation',
        title: { en: 'Non-Curdling Blend', mr: 'न फाटणारा चहा' },
        description: { 
          en: 'Balanced acidity so jaggery dissolves into boiling milk smoothly.',
          mr: 'उकळत्या दुधात गूळ सुरक्षितपणे विरघळेल अशी रचना.'
        }
      },
      {
        year: 'Supply',
        title: { en: 'B2B & Homes', mr: 'घर आणि ऑफिस' },
        description: { 
          en: 'Supplied to corporate offices, cafés, and retail kitchens nationwide.',
          mr: 'देशभरातील कार्यालये आणि घरांसाठी उपलब्ध.'
        }
      }
    ],
    imageSlotId: 'HERITAGE_IMAGE'
  },

  // 04 THE CRAFT (5 Stages)
  craft: {
    tagline: {
      en: 'HOW IT IS MADE',
      mr: 'कृती'
    },
    heading: {
      en: 'Five Steps from Garden to Cup',
      mr: 'बागेपासून कपापर्यंत ५ टप्पे'
    },
    subheading: {
      en: 'Clean, predictable preparation every time.',
      mr: 'प्रत्येक वेळी तीच खात्रीशीर चव.'
    },
    introduction: {
      en: 'From harvest selection to the 3-minute boil, every step is tested for consistency.',
      mr: 'पाने निवडण्यापासून ते ३ मिनिटांच्या उकळीपर्यंत प्रत्येक टप्पा तपासलेला आहे.'
    },
    stages: [
      {
        stageNumber: 1,
        tagline: { en: '01 — SOURCE', mr: '०१ — पाने' },
        title: { en: 'Assam CTC Tea', mr: 'आसाम सीटीसी पाने' },
        description: {
          en: 'Dense, brisk CTC granules that give strong amber color and body.',
          mr: 'चहाला कडक रंग आणि चव देणारी आसामची दाणेदार पाने.'
        },
        imageSlotId: 'CRAFT_STAGE_1'
      },
      {
        stageNumber: 2,
        tagline: { en: '02 — SELECT', mr: '०२ — मसाले' },
        title: { en: 'Whole Spices & Jaggery', mr: 'अख्खे मसाले व गूळ' },
        description: {
          en: 'Cardamom pods, sun-dried ginger, mace, nutmeg, and organic cane jaggery.',
          mr: 'हिरवी वेलची, सुंठ, जायपत्री, जायफळ आणि शुद्ध गूळ.'
        },
        imageSlotId: 'CRAFT_STAGE_2'
      },
      {
        stageNumber: 3,
        tagline: { en: '03 — BLEND', mr: '०३ — प्रमाण' },
        title: { en: 'Measured Blending', mr: 'अचूक मिश्रण' },
        description: {
          en: 'Spices and jaggery balanced to prevent milk curdling when boiled.',
          mr: 'उकळताना दूध फाटणार नाही या अचूक प्रमाणावर तयार केलेले मिश्रण.'
        },
        imageSlotId: 'CRAFT_STAGE_3'
      },
      {
        stageNumber: 4,
        tagline: { en: '04 — BREW', mr: '०४ — उकळी' },
        title: { en: '3-Minute Simmer', mr: '३ मिनिटे उकळणे' },
        description: {
          en: 'Mix equal parts water and milk, add Lata Tea, and boil for 2 to 3 minutes.',
          mr: 'समान पाणी आणि दूध घ्या, लता टी घाला आणि २ ते ३ मिनिटे उकळा.'
        },
        imageSlotId: 'CRAFT_STAGE_4'
      },
      {
        stageNumber: 5,
        tagline: { en: '05 — SERVE', mr: '०५ — सर्व्ह' },
        title: { en: 'Strain & Enjoy', mr: 'गाळून आस्वाद घ्या' },
        description: {
          en: 'Strain into cups. Clean jaggery sweetness with aromatic cardamom notes.',
          mr: 'कपात गाळा. वेलचीचा सुगंध आणि गुळाचा गोडवा अनुभवा.'
        },
        imageSlotId: 'CRAFT_STAGE_5'
      }
    ]
  },

  // 06 THE EXPERIENCE
  experience: {
    tagline: {
      en: 'THE CUP',
      mr: 'अनुभव'
    },
    heading: {
      en: 'Warmth in Every Cup',
      mr: 'प्रत्येक कपात आपुलकीची उब'
    },
    subheading: {
      en: 'A comforting cup of spiced tea for morning routines and afternoon breaks.',
      mr: 'सकाळच्या प्रसन्नतेसाठी आणि दुपारच्या थकव्यासाठी उत्तम चहा.'
    },
    sensoryDescription: {
      en: 'The smell of crushed cardamom in boiling milk, the golden color of Assam leaves, and the gentle caramel note of cane jaggery.',
      mr: 'उकळत्या दुधातील वेलचीचा दरवळ, आसाम पानांचा तांबूस रंग आणि गुळाचा नैसर्गिक गोडवा.'
    },
    ritualSteps: [
      {
        title: { en: 'Aroma', mr: 'सुगंध' },
        note: { en: 'Fresh cardamom and warm ginger.', mr: 'ताजी वेलची आणि सुंठीचा सुगंध.' }
      },
      {
        title: { en: 'Body', mr: 'घट्टपणा' },
        note: { en: 'Velvety texture that holds in whole milk.', mr: 'दुधात मिसळणारा मऊ दाटपणा.' }
      },
      {
        title: { en: 'Taste', mr: 'चव' },
        note: { en: 'Clean cane jaggery with zero bitterness.', mr: 'कोणताही कडूपणा नसलेला गुळाचा गोडवा.' }
      }
    ],
    imageSlotId: 'STORY_IMAGE_PRIMARY'
  },

  // 08 WHY LATA TEA
  whyLata: {
    tagline: {
      en: 'KEY FACTS',
      mr: 'महत्त्वाचे'
    },
    heading: {
      en: 'Honest Standards',
      mr: 'आमची मानके'
    },
    subheading: {
      en: 'Clear ingredients, no synthetic flavorings.',
      mr: 'शुद्ध घटक, कोणतेही कृत्रिम फ्लेवर नाही.'
    },
    pillars: [
      {
        title: { en: 'Natural Cane Jaggery', mr: 'नैसर्गिक गूळ' },
        description: { 
          en: 'Sweetened with unrefined jaggery. No white sugar or synthetic syrup.',
          mr: 'केवळ नैसर्गिक गूळ. पांढरी साखर किंवा सिरप नाही.'
        },
        metric: '100%',
        icon: 'Leaf'
      },
      {
        title: { en: 'Non-Curdling Formula', mr: 'दूध न फाटण्याची हमी' },
        description: { 
          en: 'Calibrated acidity allows boiling directly in dairy milk.',
          mr: 'थेट दुधात उकळण्यासाठी संतुलित मिश्रण.'
        },
        metric: '0%',
        icon: 'ShieldCheck'
      },
      {
        title: { en: 'FSSAI Certified Unit', mr: 'प्रमाणित उत्पादन' },
        description: { 
          en: 'Blended and packed in our licensed Pune facility.',
          mr: 'पुण्यातील नोंदणीकृत युनिटमध्ये पॅकिंग.'
        },
        metric: 'ISO 22000',
        icon: 'Award'
      },
      {
        title: { en: '3-Minute Brew', mr: '३ मिनिटांत तयार' },
        description: { 
          en: 'Simple 1:1 milk and water boil. Ready fast for homes and offices.',
          mr: 'पाणी व दुधात ३ मिनिटे उकळा आणि चहा तयार.'
        },
        metric: '3 Min',
        icon: 'Clock'
      }
    ]
  },

  // 10 FINAL BRAND STATEMENT
  brandStatement: {
    quote: {
      en: '“Real tea. Real jaggery. Ready in 3 minutes.”',
      mr: '“अस्सल चहा. शुद्ध गूळ. अवघ्या ३ मिनिटांत.”'
    },
    subtext: {
      en: 'Purple Bean Agro Industries Private Limited — Pune, Maharashtra',
      mr: 'पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड — पुणे, महाराष्ट्र'
    },
    author: {
      en: 'Lata Tea',
      mr: 'लता टी'
    }
  },

  // CONTACT & ENQUIRIES
  contact: {
    tagline: {
      en: 'COMMERCIAL INQUIRIES',
      mr: 'व्यावसायिक संपर्क'
    },
    heading: {
      en: 'Contact & Sample Requests',
      mr: 'संपर्क आणि नमुने'
    },
    subheading: {
      en: 'For distributor inquiries, hotel partnerships, and sample kits.',
      mr: 'वितरक, हॉटेल्स आणि मोफत नमुना चहासाठी संपर्क करा.'
    },
    enquiryNotice: {
      en: 'We respond within 24 business hours.',
      mr: 'आम्ही २४ तासांत संपर्क करू.'
    }
  },

  // FOOTER
  footer: {
    aboutText: {
      en: 'Lata Tea is manufactured by Purple Bean Agro Industries Private Limited in Pune, Maharashtra. Natural jaggery tea and basundi premixes.',
      mr: 'पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड, पुणे. नैसर्गिक गूळ चहा आणि बासुंदी प्रीमिक्स.'
    },
    copyrightText: {
      en: '© 2026 Purple Bean Agro Industries Private Limited. All rights reserved.',
      mr: '© २०२६ पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड. सर्व हक्क राखीव.'
    },
    legalLinks: [
      { label: { en: 'Privacy Policy', mr: 'गोपनीयता धोरण' }, url: '/privacy' },
      { label: { en: 'Terms of Service', mr: 'नियम व अटी' }, url: '/terms' },
      { label: { en: 'FSSAI: 11525996000709', mr: 'एफएसएसएआय: ११५२५९९६०००७०९' }, url: '/contact' }
    ]
  }
};

export const INITIAL_CMS_STATE: CMSState = {
  version: 3,
  status: 'published',
  lastPublishedAt: new Date().toISOString(),
  lastSavedAt: new Date().toISOString(),
  defaultLanguage: 'en',
  sections: [
    { id: 'sec_hero', key: 'hero', name: 'Hero', description: 'Hero statement and links', isEnabled: true, order: 1, bgType: 'green' },
    { id: 'sec_story', key: 'story', name: 'Our Story', description: 'Brand background and jaggery approach', isEnabled: true, order: 2, bgType: 'cream' },
    { id: 'sec_heritage', key: 'heritage', name: 'Heritage', description: 'Assam tea and Maharashtra jaggery roots', isEnabled: true, order: 3, bgType: 'cream' },
    { id: 'sec_craft', key: 'craft', name: 'The Process', description: '5 stages of tea preparation', isEnabled: true, order: 4, bgType: 'white' },
    { id: 'sec_tea', key: 'tea', name: 'Tea Collection', description: 'Signature tea blends', isEnabled: true, order: 5, bgType: 'cream' },
    { id: 'sec_experience', key: 'experience', name: 'Experience', description: 'Tasting notes and aroma', isEnabled: true, order: 6, bgType: 'white' },
    { id: 'sec_why', key: 'why', name: 'Key Facts', description: 'Standards and differentiators', isEnabled: true, order: 7, bgType: 'cream' },
    { id: 'sec_statement', key: 'statement', name: 'Statement', description: 'Closing brand quote', isEnabled: true, order: 8, bgType: 'green' },
    { id: 'sec_contact', key: 'contact', name: 'Contact', description: 'Statutory info and inquiry forms', isEnabled: true, order: 9, bgType: 'white' }
  ],
  navigation: DEFAULT_NAVIGATION,
  teaStories: DEFAULT_TEA_STORIES,
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
      instagram: 'https://instagram.com/latatea_official',
      facebook: 'https://facebook.com/latatea',
      linkedin: 'https://linkedin.com/company/latatea',
      whatsapp: 'https://wa.me/917666953873'
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
  },
  seo: {
    seoTitle: {
      en: 'Lata Tea — Pure Jaggery Basundi Chai',
      mr: 'लता टी — अस्सल गूळ बासुंदी चहा'
    },
    metaDescription: {
      en: 'Assam CTC tea and pure cane jaggery. Ready in 3 minutes. Made by Purple Bean Agro Industries in Pune.',
      mr: 'आसाम चहा आणि शुद्ध गूळ. ३ मिनिटांत तयार. पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज, पुणे.'
    },
    ogTitle: {
      en: 'Lata Tea — Jaggery Basundi Chai',
      mr: 'लता टी — गूळ बासुंदी चहा'
    },
    ogDescription: {
      en: 'Authentic Indian jaggery tea and basundi premixes ready in 3 minutes.',
      mr: '३ मिनिटांत तयार होणारा अस्सल गुळाचा चहा.'
    },
    ogImageSlotId: 'HOME_HERO_PRIMARY',
    canonicalUrl: 'https://latatea.com',
    robots: 'index, follow'
  }
};

export const BROCHURE_CONTACT_PRESET = INITIAL_CMS_STATE.contact;
