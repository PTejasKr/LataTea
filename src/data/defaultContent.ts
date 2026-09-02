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
    label: 'Hero Panoramic Composition',
    description: 'High-definition heritage photograph of copper bowl, tea spices, and brass cup',
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
    label: 'Brand Story Antique Copper Bowl',
    description: 'Carved antique copper bowl with spoon pouring master tea mix',
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
    label: 'Heritage Harvest & Spices',
    description: 'Fresh tea leaves and sun-dried cardamom harvest',
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
    description: 'Assam valley tea estates & natural jaggery',
    category: 'craft',
    desktopImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover'
  },
  CRAFT_STAGE_2: {
    id: 'slot_craft_2',
    slotKey: 'CRAFT_STAGE_2',
    label: 'Craft Stage 2 - Selection',
    description: 'Whole green cardamom and dry ginger pods',
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
    description: 'Precision artisan compounding',
    category: 'craft',
    desktopImageId: 'media_royal_bowl',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover'
  },
  CRAFT_STAGE_4: {
    id: 'slot_craft_4',
    slotKey: 'CRAFT_STAGE_4',
    label: 'Craft Stage 4 - Preparation',
    description: 'Simmering tea kettle and milk infusion',
    category: 'craft',
    desktopImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover'
  },
  CRAFT_STAGE_5: {
    id: 'slot_craft_5',
    slotKey: 'CRAFT_STAGE_5',
    label: 'Craft Stage 5 - Experience',
    description: 'Steaming glass cup of golden Basundi Chai',
    category: 'craft',
    desktopImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover'
  },
  BRAND_LOGO_PRIMARY: {
    id: 'slot_brand_logo',
    slotKey: 'BRAND_LOGO_PRIMARY',
    label: 'Brand Logo (Primary/Dark)',
    description: 'Deep green royal emblem logo',
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
    label: 'Brand Logo (Light/Footer)',
    description: 'Light cream version for dark backgrounds',
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
    label: { en: 'Our Story', mr: 'आमची गाथा' }, 
    url: '/story', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 1 
  },
  { 
    id: 'nav_heritage', 
    label: { en: 'Heritage', mr: 'वारसा' }, 
    url: '/heritage', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 2 
  },
  { 
    id: 'nav_craft', 
    label: { en: 'The Craft', mr: 'निर्मिती कला' }, 
    url: '/craft', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 3 
  },
  { 
    id: 'nav_tea', 
    label: { en: 'Tea Stories', mr: 'चहा संग्रह' }, 
    url: '/tea', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 4 
  },
  { 
    id: 'nav_experience', 
    label: { en: 'Experience', mr: 'अनुभूती' }, 
    url: '/experience', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 5 
  },
  { 
    id: 'nav_contact', 
    label: { en: 'Contact & Inquiries', mr: 'संपर्क आणि चौकशी' }, 
    url: '/contact', 
    isExternal: false, 
    isButton: false, 
    isEnabled: true, 
    order: 6 
  }
];

export const DEFAULT_TEA_STORIES: TeaStoryItem[] = [
  {
    id: 'tea_gud_basundi',
    slug: 'gud-basundi-tea',
    name: {
      en: 'Gud Basundi Tea (Spiced Jaggery)',
      mr: 'गूळ बासुंदी चहा (मसाला गूळ)'
    },
    tagline: {
      en: 'Velvety Jaggery Chai Infused with Cardamom & Mace',
      mr: 'वेलची आणि जायपत्रीयुक्त मखमली गुळाचा चहा'
    },
    category: 'gud',
    categoryName: {
      en: 'Jaggery Heritage Series',
      mr: 'गुळ चहा वारसा मालिका'
    },
    shortDescription: {
      en: 'Signature blend sweetened exclusively with pure unrefined jaggery and roasted basundi spices.',
      mr: 'केवळ शुद्ध नैसर्गिक गूळ आणि भाजलेल्या सुगंधी बासुंदी मसाल्यांनी समृद्ध असलेला स्वाक्षरी चहा.'
    },
    editorialStory: {
      en: 'Inspired by the slow-simmered basundi pots of traditional Maharashtrian households, this blend pairs robust Assam CTC leaves with unrefined cane jaggery. Infused with green cardamom, mace, nutmeg, and ginger, it dissolves smoothly into boiling milk without curdling, yielding a golden caramel cup of royal nostalgia.',
      mr: 'महाराष्ट्रातील पारंपरिक सणांच्या बासुंदीच्या संथ उकळणाऱ्या कढईपासून प्रेरित होऊन, हा चहा आसामच्या कडक चहाच्या पानांना आणि शुद्ध देशी गुळाला एकत्र आणतो. हिरवी वेलची, जायपत्री, जायफळ आणि आल्याचा अर्क दुधात परिपूर्ण विरघळतो आणि न फाटता अस्सल राजेशाही चव देतो.'
    },
    tastingNotes: [
      { en: 'Warm caramel sweetness', mr: 'उबदार कॅरॅमल गोडवा' },
      { en: 'Fragrant green cardamom aromatics', mr: 'सुगंधी हिरव्या वेलचीचा दरवळ' },
      { en: 'Deep malty Assam finish', mr: 'आसाम चहाचा गडद आणि कडक शेवट' }
    ],
    ingredients: [
      { en: 'Assam CTC Tea Leaves Extract', mr: 'आसाम सीटीसी चहाचा अर्क' },
      { en: '100% Pure Organic Cane Jaggery (Gud)', mr: '१००% नैसर्गिक सेंद्रिय देशी गूळ' },
      { en: 'Green Cardamom, Mace, Nutmeg, Sun-Dried Ginger', mr: 'हिरवी वेलची, जायपत्री, जायफळ, सुंठ' }
    ],
    origin: {
      en: 'Assam Valley & Kolhapur Sugarcane Collectives',
      mr: 'आसाम व्हॅली आणि कोल्हापूर सेंद्रिय ऊस उत्पादक'
    },
    servingRitual: {
      en: 'Simmer with equal parts fresh spring water and whole cow milk for 3 minutes.',
      mr: 'समान प्रमाणात पाणी आणि ताजे दूध एकत्र करून ३ मिनिटे उकळू द्या.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 1,
    isFeatured: true,
    isVisible: true,
    badgeText: { en: 'Royal Signature', mr: 'राजेशाही स्वाक्षरी' }
  },
  {
    id: 'tea_gud_plain',
    slug: 'gud-plain-chai',
    name: {
      en: 'Gud Plain Chai (Classic Jaggery)',
      mr: 'गूळ प्लेन चहा (अस्सल साधा गूळ)'
    },
    tagline: {
      en: 'The Honest Harmony of Robust CTC and Country Jaggery',
      mr: 'कडक सीटीसी आणि गावठी गुळाचा प्रामाणिक मेळ'
    },
    category: 'gud',
    categoryName: {
      en: 'Jaggery Heritage Series',
      mr: 'गुळ चहा वारसा मालिका'
    },
    shortDescription: {
      en: 'Pure jaggery sweetness balanced with bold Assam tea leaves without added spice aromatics.',
      mr: 'मसाल्यांशिवाय, फक्त अस्सल आसाम चहा आणि देशी गुळाचा सेंद्रिय गोडवा.'
    },
    editorialStory: {
      en: 'A pure everyday cup for purists who cherish the unadulterated depth of countryside cane jaggery. Stripped of spices to celebrate the raw malt of full-bodied Assam leaves, it delivers comforting warmth and a rich copper glow.',
      mr: 'ज्यांना केवळ शुद्ध गावठी गुळाची चव आवडते अशा चहाप्रेमींसाठी हा एक साधा पण संपन्न चहा आहे. मसाल्यांचा अतिरेक न ठेवता आसामच्या पानांचा नैसर्गिक कडकपणा आणि गुळाचा नैसर्गिक पौष्टिक गोडवा यात जपला आहे.'
    },
    tastingNotes: [
      { en: 'Earthy cane jaggery', mr: 'मातीचा अस्सल उसाचा गोडवा' },
      { en: 'Robust CTC body', mr: 'कडक आणि घट्ट रंग' },
      { en: 'Clean soothing finish', mr: 'मऊ आणि शांत करणारा अनुभव' }
    ],
    ingredients: [
      { en: 'Premium Assam CTC Granules', mr: 'प्रीमियम आसाम सीटीसी दाणे' },
      { en: 'Desi Organic Jaggery Powder', mr: 'देशी सेंद्रिय गूळ पावडर' }
    ],
    origin: {
      en: 'Upper Assam Tea Estates',
      mr: 'अप्पर आसाम चहा मळे'
    },
    servingRitual: {
      en: 'Brew directly in simmering milk for a traditional morning energizer.',
      mr: 'सकाळच्या प्रसन्नतेसाठी दुधात उकळून पारंपरिक पद्धतीने आस्वाद घ्या.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 2,
    isFeatured: false,
    isVisible: true,
    badgeText: { en: 'Everyday Classic', mr: 'रोजचा पारंपरिक' }
  },
  {
    id: 'tea_sugar_basundi',
    slug: 'royal-sugar-basundi',
    name: {
      en: 'Sugar Basundi Tea (Royal Spiced Kadak)',
      mr: 'साखर बासुंदी चहा (शाही मसाला कडक)'
    },
    tagline: {
      en: 'Slow-Simmered Banquet Richness Crafted for Chai Connoisseurs',
      mr: 'सण आणि मेजवानीसाठी खास तयार केलेली मंद आचेवरची चव'
    },
    category: 'sugar',
    categoryName: {
      en: 'Royal Basundi Series',
      mr: 'शाही बासुंदी मालिका'
    },
    shortDescription: {
      en: 'A decadent spiced blend reminiscent of royal festival chai with rich dairy notes.',
      mr: 'शाही उत्सवांची आठवण करून देणारा, दूध आणि खमंग मसाल्यांनी भरलेला बासुंदी चहा.'
    },
    editorialStory: {
      en: 'In royal Indian banquets, chai was often prepared by slowly simmering whole milk until thick and velvety, then spiced with freshly crushed green pods and fragrant bark. Royal Sugar Basundi recreates this creamy mouthfeel and spice resonance in 3 minutes.',
      mr: 'भारतीय राजेशाही मेजवान्यांमध्ये, दूध संथपणे उकळवून बासुंदीसारखे घट्ट केले जाई आणि त्यात ताजी वेलची आणि मसाले घातले जायचे. हा चहा अगदी त्याच मखमली अनुभवाची अनुभूती अवघ्या ३ मिनिटांत देतो.'
    },
    tastingNotes: [
      { en: 'Creamy condensed basundi texture', mr: 'घट्ट बासुंदीसारखी मखमली अनुभूती' },
      { en: 'Zesty ginger bite', mr: 'सुंठीचा हलका झणझणीत स्पर्श' },
      { en: 'Sweet aromatic cardamom cloud', mr: 'हिरव्या वेलचीचा शाही सुगंध' }
    ],
    ingredients: [
      { en: 'High-Grown Assam Dust & CTC Blend', mr: 'आसाम डस्ट आणि सीटीसी मिश्रण' },
      { en: 'Fine Crystal Cane Sugar', mr: 'शुद्ध दाणेदार साखर' },
      { en: 'Nutmeg, Mace, Ginger, Cardamom Oil', mr: 'जायफळ, जायपत्री, सुंठ, वेलची तेल' }
    ],
    origin: {
      en: 'Western Ghats Spice Collectives & Assam',
      mr: 'पश्चिम घाट मसाला उत्पादक आणि आसाम'
    },
    servingRitual: {
      en: 'Serve boiling hot in earthen kulhads to accent the basundi richness.',
      mr: 'मातीच्या कुल्हडमध्ये गरम सर्व्ह करा.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 3,
    isFeatured: true,
    isVisible: true,
    badgeText: { en: 'Festive Reserve', mr: 'उत्सव खास' }
  },
  {
    id: 'tea_instant_premix',
    slug: 'instant-basundi-premix',
    name: {
      en: '3-in-1 Basundi Chai Premix (Instant Vending & HoReCa)',
      mr: '३-इन-१ बासुंदी चहा प्रीमिक्स (इन्स्टंट वेंडिंग)'
    },
    tagline: {
      en: 'Consistent Golden Chai Anywhere: Just Add Hot Water',
      mr: 'फक्त गरम पाणी घाला आणि कुठेही परिपूर्ण बासुंदी चहा मिळवा'
    },
    category: 'premixes',
    categoryName: {
      en: 'Instant Premix Collection',
      mr: 'इन्स्टंट प्रीमिक्स संग्रह'
    },
    shortDescription: {
      en: 'Free-flowing granulated instant mix with pure milk solids and balanced jaggery spices.',
      mr: 'दुधाची भुकटी आणि सुगंधी मसाल्यांचे दाणेदार मिश्रण, हॉटेल आणि ऑफिससाठी सर्वोत्तम.'
    },
    editorialStory: {
      en: 'Engineered for luxury hospitality, corporate pantries, and premium automatic dispensers. Uses micro-encapsulated spice oils and pure dairy solids to ensure free-flowing dispensing with zero clumping and 100% cup consistency.',
      mr: 'कॉर्पोरेट कार्यालये, हॉटेल्स आणि प्रवासासाठी तयार केलेले हे प्रीमिक्स प्रत्येक कपात सारखीच राजेशाही चव देते. मशीनमध्ये अडकणार नाही असे उत्तम दाणेदार तंत्रज्ञान.'
    },
    tastingNotes: [
      { en: 'Instant velvety creaminess', mr: 'झटपट मखमली घट्टपणा' },
      { en: 'Balanced spice warmth', mr: 'संतुलित मसाल्यांची उब' },
      { en: 'Smooth lingering finish', mr: 'समाधानकारक गोडवा' }
    ],
    ingredients: [
      { en: 'Pure Whole Dairy Milk Solids', mr: 'शुद्ध दुधाची भुकटी' },
      { en: 'Black Tea Extract', mr: 'काळी चहा अर्क' },
      { en: 'Natural Spice Compounding', mr: 'नैसर्गिक मसाला अर्क' }
    ],
    origin: {
      en: 'Maharashtra Cleanroom Facility',
      mr: 'महाराष्ट्र अत्याधुनिक क्लीनरूम युनिट'
    },
    servingRitual: {
      en: 'Add 14g to 80ml boiling hot water, stir well for 10 seconds and enjoy.',
      mr: '८० मिली उकळत्या पाण्यात १४ ग्रॅम घाला, १० सेकंद ढवळा आणि आस्वाद घ्या.'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY',
    displayOrder: 4,
    isFeatured: true,
    isVisible: true,
    badgeText: { en: 'Instant Craft', mr: 'झटपट निर्मिती' }
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
      en: 'AUTHENTIC TASTE • HERITAGE CRAFT • 3-MINUTE SIMMER',
      mr: 'अस्सल चव • पारंपरिक वारसा • ३ मिनिटांत तयार'
    },
    headline: {
      en: 'Where Royal Indian Tradition Meets Pure Jaggery Craft',
      mr: 'जिथे राजेशाही भारतीय परंपरा आणि अस्सल गुळाची कला एकत्र येते'
    },
    subheadline: {
      en: 'Discover LataTea: Velvety, spiced Basundi Chai crafted with select Assam harvest and 100% natural organic jaggery. An authentic ceremonial ritual ready in three minutes.',
      mr: 'लता टी: आसामच्या उत्कृष्ट बागांतील पाने आणि १००% नैसर्गिक सेंद्रिय गुळाने तयार केलेला मखमली बासुंदी चहा. अवघ्या ३ मिनिटांत अनुभवा राजेशाही आस्वाद.'
    },
    primaryCtaText: {
      en: 'Discover Our Story',
      mr: 'आमची गाथा जाणून घ्या'
    },
    primaryCtaLink: '#story',
    secondaryCtaText: {
      en: 'Explore Tea Collection',
      mr: 'चहा संग्रह पहा'
    },
    secondaryCtaLink: '#tea',
    badgeText: {
      en: 'Pure Jaggery & Royal Spices',
      mr: 'शुद्ध गूळ आणि शाही मसाले'
    }
  },

  // 02 THE STORY
  story: {
    tagline: {
      en: 'WHO WE ARE & WHY WE EXIST',
      mr: 'आम्ही कोण आहोत आणि आमचा हेतू काय?'
    },
    heading: {
      en: 'A Reverence for the Timeless Indian Chai Gathering',
      mr: 'भारतीय चहा संस्कृतीचा गौरवशाली वारसा'
    },
    subheading: {
      en: 'Reviving the pure, unhurried warmth of traditional jaggery tea for the modern conscious lifestyle.',
      mr: 'आधुनिक जीवनशैलीसाठी पारंपरिक गुळाच्या चहाची नैसर्गिक उब पुन्हा जिवंत करत आहोत.'
    },
    introduction: {
      en: 'In an era overwhelmed by refined sugars, chemical emulsifiers, and artificial spice essences, LataTea was founded on a singular conviction: Authentic Indian chai deserves the purity of unrefined sugarcane jaggery, fresh Malabar spices, and honest CTC leaves.',
      mr: 'रिफाइन्ड साखर, कृत्रिम इसेन्स आणि रसायनांच्या काळात, लता टी चा जन्म एका ठाम विश्वासातून झाला: अस्सल भारतीय चहामध्ये केवळ नैसर्गिक गूळ, अस्सल मसाले आणि उत्कृष्ट आसामची पानेच असायला हवीत.'
    },
    paragraphs: [
      {
        en: 'Our journey started in Maharashtra, where the festive aroma of boiling milk, cardamom, and slow-thickened Basundi is celebrated as the highest expression of hospitality. We dedicated years to perfecting a formulation that blends natural cane jaggery with whole crushed spices that dissolves instantly without ever curdling boiling milk.',
        mr: 'आमचा प्रवास महाराष्ट्रात सुरू झाला, जिथे संथ आचेवर उकळणाऱ्या दुधाचा, वेलचीचा आणि बासुंदीचा सुगंध हा आतिथ्याचा सर्वोच्च आविष्कार मानला जातो. दुधात न फाटता परिपूर्ण विरघळेल असा शुद्ध गुळाचा आणि मसाल्यांचा चहा तयार करण्यासाठी आम्ही सातत्यपूर्ण संशोधन केले.'
      },
      {
        en: 'Today, Purple Bean Agro Industries Private Limited produces LataTea in an ISO and FSSAI certified climate-controlled cleanroom facility, offering households, luxury hotels, and corporate pantries an uncompromising cup of royal nostalgia.',
        mr: 'आज, पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड अत्याधुनिक आयएसओ आणि एफएसएसएआय प्रमाणित क्लीनरूम युनिटमध्ये लता टी चे उत्पादन करते, ज्यामुळे प्रत्येक कपात अस्सल चव टिकून राहते.'
      }
    ],
    quote: {
      en: '“We do not just formulate tea; we preserve the warmth of homecoming in every boiling kettle.”',
      mr: '“आम्ही फक्त चहा बनवत नाही; आम्ही प्रत्येक उकळत्या किटलीत घराच्या आपुलकीची उब जपतो.”'
    },
    imageSlotId: 'STORY_IMAGE_PRIMARY'
  },

  // 03 HERITAGE
  heritage: {
    tagline: {
      en: 'ROOTS, REVERENCE & HARVEST',
      mr: 'मुळे, निष्ठा आणि निसर्गाची देणगी'
    },
    heading: {
      en: 'Honoring Generations of Soil, Sun, and Spice',
      mr: 'माती, सूर्य आणि मसाल्यांच्या पिढ्यान्-पिढ्यांचा आदर'
    },
    subheading: {
      en: 'Tracing our legacy from the fertile floodplains of the Brahmaputra to the artisanal jaggery cauldrons of western India.',
      mr: 'ब्रह्मपुत्रेच्या सुपीक खोऱ्यांपासून ते पश्चिम भारतातील पारंपरिक गुळाच्या गुऱ्हाळांपर्यंतचा आमचा प्रवास.'
    },
    narrative: {
      en: 'The soul of LataTea lives in the estates and agricultural collectives we partner with. Every leaf is chosen during peak harvest seasons when natural essential oils and brisk tannins reach their crescendo.',
      mr: 'लता टी चा आत्मा हा आमच्या शेतकरी सहकाऱ्यांमध्ये वसलेला आहे. जेव्हा पानांमध्ये नैसर्गिक सुगंधी तेले आणि कडकपणा सर्वोच्च असतो, तेव्हाच चहाची पाने काळजीपूर्वक निवडली जातात.'
    },
    milestones: [
      {
        year: 'Roots',
        title: { en: 'The Jaggery Wisdom', mr: 'गुळाचा पारंपरिक वारसा' },
        description: { 
          en: 'Adopting time-tested Kolhapur and western Maharashtra artisanal boiling methods for unrefined sugarcane nectar.',
          mr: 'पश्चिम महाराष्ट्रातील पारंपरिक गुऱ्हाळांमधून मिळवलेल्या शुद्ध सेंद्रिय उसाच्या रसाचा वापर.'
        }
      },
      {
        year: 'Craft',
        title: { en: 'Cleanroom Innovation', mr: 'अत्याधुनिक निर्मिती' },
        description: { 
          en: 'Eliminating acidity to ensure pure organic jaggery completely dissolves into boiling milk without curdling.',
          mr: 'दूध न फाटता गूळ आणि चहा एकत्र उकळू शकेल असे अभिनव संतुलन.'
        }
      },
      {
        year: 'Today',
        title: { en: 'B2B & HoReCa Presence', mr: 'हॉस्पिटॅलिटी आणि घरघरात' },
        description: { 
          en: 'Trusted by premium corporate offices, banquets, cafés, and connoisseurs nationwide.',
          mr: 'देशभरातील कॉर्पोरेट कार्यालये, हॉटेल्स आणि चहाप्रेमींचा विश्वासू ब्रँड.'
        }
      }
    ],
    imageSlotId: 'HERITAGE_IMAGE'
  },

  // 04 THE CRAFT (5 Stages)
  craft: {
    tagline: {
      en: 'HOW THE ROYAL CUP COMES TOGETHER',
      mr: 'राजेशाही चहा कसा तयार होतो?'
    },
    heading: {
      en: 'An Editorial Chronicle of Craftsmanship',
      mr: 'अस्सल कारागिरीचा टप्प्याटप्प्याचा प्रवास'
    },
    subheading: {
      en: 'Five disciplined stages uniting garden-fresh Assam CTC with fragrant Malabar aromatics.',
      mr: 'पाच शिस्तबद्ध टप्पे जे ताजी आसामची पाने आणि मसाल्यांना एकत्र आणतात.'
    },
    introduction: {
      en: 'True excellence in tea is never an accident of luck. It is the calculated harmony of seasonal harvest, spice grinding at low temperatures, and airtight moisture protection.',
      mr: 'उत्कृष्ट चहा हा केवळ योगायोग नसतो. तो हंगामी वेचणी, कमी तापमानावर मसाल्यांची भरड आणि शुद्धतेचे काटेकोर संतुलन असतो.'
    },
    stages: [
      {
        stageNumber: 1,
        tagline: { en: '01 — SOURCE', mr: '०१ — स्त्रोत' },
        title: { en: 'Selected Assam CTC Leaves', mr: 'निवडक आसाम सीटीसी पाने' },
        description: {
          en: 'Harvested from lush high-yield tea gardens where monsoon showers yield dense, brisk CTC granules with rich amber liquor.',
          mr: 'आसामच्या बागांमधून वेचलेली कडक, दाणेदार चहाची पाने जी चहाला गडद तांबूस रंग आणि कडक चव देतात.'
        },
        imageSlotId: 'CRAFT_STAGE_1',
        keyDetails: [
          { en: 'Brisk malty character', mr: 'कडक आणि भरदार चव' },
          { en: '100% genuine Assam harvest', mr: '१००% अस्सल आसाम चहा' }
        ]
      },
      {
        stageNumber: 2,
        tagline: { en: '02 — SELECT', mr: '०२ — निवड' },
        title: { en: 'Whole Dried Spices & Organic Jaggery', mr: 'अख्खे सुके मसाले आणि सेंद्रिय गूळ' },
        description: {
          en: 'Sun-ripened green cardamom pods, fiery dried ginger roots, fragrant mace (javitri), and nutmeg sourced directly from trusted growers.',
          mr: 'हिरवी वेलची, सुंठ, जायपत्री आणि जायफळ यांची थेट शेतकऱ्यांकडून निवड.'
        },
        imageSlotId: 'CRAFT_STAGE_2',
        keyDetails: [
          { en: 'No chemical essences', mr: 'कोणताही कृत्रिम रंग किंवा इसेन्स नाही' },
          { en: 'Natural essential oils preserved', mr: 'नैसर्गिक सुगंधी तेले सुरक्षित' }
        ]
      },
      {
        stageNumber: 3,
        tagline: { en: '03 — BLEND', mr: '०३ — मिश्रण' },
        title: { en: 'Micro-Compounded Precision Ratios', mr: 'अचूक वैज्ञानिक संतुलन' },
        description: {
          en: 'Gently blended in humidity-controlled chambers. The whole ground spices are calibrated to elevate rather than dominate the tea.',
          mr: 'कंट्रोल्ड वातावरणात मंद गतीने केलेले मिश्रण, ज्यामुळे मसाल्यांचा सुगंध चहाच्या अस्सल चवीला अधिक उठावदार करतो.'
        },
        imageSlotId: 'CRAFT_STAGE_3',
        keyDetails: [
          { en: 'Non-curdling formula', mr: 'दूध न फाटण्याची हमी' },
          { en: 'Consistent cup density', mr: 'प्रत्येक वेळी तीच परिपूर्ण चव' }
        ]
      },
      {
        stageNumber: 4,
        tagline: { en: '04 — PREPARE', mr: '०४ — कृती' },
        title: { en: 'The 3-Minute Boiling Simmer', mr: '३ मिनिटांची सोपी उकळी' },
        description: {
          en: 'Combine equal parts spring water and fresh whole milk in a clean pan. Add the LataTea master mix, let the aromatic brew rise gently for 2 to 3 minutes, and strain.',
          mr: 'समान प्रमाणात पाणी आणि दूध एकत्र करा. लता टी घाला, २ ते ३ मिनिटे मंद आचेवर उकळू द्या आणि गाळून गरमागरम आस्वाद घ्या.'
        },
        imageSlotId: 'CRAFT_STAGE_4',
        keyDetails: [
          { en: '1:1 milk and water ratio', mr: '१:१ दूध आणि पाण्याचे प्रमाण' },
          { en: 'Ready in under 180 seconds', mr: 'अवघ्या १८० सेकंदात तयार' }
        ]
      },
      {
        stageNumber: 5,
        tagline: { en: '05 — EXPERIENCE', mr: '०५ — अनुभूती' },
        title: { en: 'The Royal Velvet Sip', mr: 'राजेशाही मखमली घोट' },
        description: {
          en: 'Poured hot into traditional clay kulhads or fine porcelain. A comforting cloud of fragrant cardamom aroma followed by sweet jaggery warmth.',
          mr: 'मातीच्या कुल्हडमध्ये किंवा कपात ओतलेला गरमागरम चहा. पहिल्या घोटातच वेलचीचा दरवळ आणि गुळाचा तृप्त करणारा गोडवा.'
        },
        imageSlotId: 'CRAFT_STAGE_5',
        keyDetails: [
          { en: 'Nostalgic Basundi creaminess', mr: 'अस्सल बासुंदीसारखा दाटपणा' },
          { en: 'Immunity-boosting warmth', mr: 'आरोग्यदायी आणि ताजेतवाने' }
        ]
      }
    ]
  },

  // 06 THE EXPERIENCE
  experience: {
    tagline: {
      en: 'THE SENSORY RITUAL',
      mr: 'संवेदनात्मक चहाचा सोहळा'
    },
    heading: {
      en: 'More Than Tea: A Moment of Unhurried Calm',
      mr: 'केवळ चहा नाही: शांतता आणि समाधानाचा एक क्षण'
    },
    subheading: {
      en: 'Step away from the noise and surrender to the soothing warmth of an authentic Indian chai.',
      mr: 'धावपळीच्या जगातून थोडा वेळ स्वतःसाठी काढा आणि अनुभवा अस्सल चहाची उब.'
    },
    sensoryDescription: {
      en: 'The sound of bubbling milk on a quiet morning. The slow release of cardamom and nutmeg vapors permeating the air. The golden hue reflecting against earthenware. LataTea transforms the daily cup of chai into an intimate, mindful celebration of Indian heritage.',
      mr: 'सकाळच्या शांततेत उकळणाऱ्या दुधाचा मंद आवाज. हवेत दरवळणारा वेलची आणि जायफळाचा सुगंध. कुल्हडमधील सोनेरी रंग. लता टी तुमच्या रोजच्या चहाच्या क्षणाला एका सुंदर उत्सवात बदलते.'
    },
    ritualSteps: [
      {
        title: { en: 'Aroma Blooms', mr: 'सुगंधाचा दरवळ' },
        note: { en: 'The steam releases sun-dried spices and warm cane sugar oils.', mr: 'वाफेसोबत अख्ख्या मसाल्यांचे आणि गुळाचे सुगंध हवेत पसरतात.' }
      },
      {
        title: { en: 'Velvet Body', mr: 'मखमली दाटपणा' },
        note: { en: 'Rich basundi texture blankets the palate smoothly without heaviness.', mr: 'बासुंदीसारखा मऊ घट्टपणा जिभेवर रेंगाळतो.' }
      },
      {
        title: { en: 'Spiced Resonance', mr: 'मसाल्यांची उब' },
        note: { en: 'A lingering ginger warmth that revives the senses naturally.', mr: 'सुंठ आणि वेलचीची उब शरीराला नवी ऊर्जा देते.' }
      }
    ],
    imageSlotId: 'STORY_IMAGE_PRIMARY'
  },

  // 08 WHY LATA TEA
  whyLata: {
    tagline: {
      en: 'AUTHENTIC DIFFERENTIATORS',
      mr: 'आमची खरी वैशिष्ट्ये'
    },
    heading: {
      en: 'Built on Purity. Backed by Standards.',
      mr: 'शुद्धतेचा पाया, सर्वोच्च मानकांची हमी'
    },
    subheading: {
      en: 'No fabricated claims. Just honest ingredients formulated for perfection.',
      mr: 'कोणतेही खोटे दावे नाहीत. फक्त अस्सल साहित्य आणि प्रामाणिक निर्मिती.'
    },
    pillars: [
      {
        title: { en: '100% Unrefined Cane Jaggery', mr: '१००% नैसर्गिक सेंद्रिय गूळ' },
        description: { 
          en: 'No bleached sugars or synthetic caramel syrups. Naturally rich in trace minerals with a comforting earthy sweetness.',
          mr: 'कोणतीही रासायनिक साखर नाही. नैसर्गिक खनिजांनी समृद्ध आणि आरोग्यदायी गोडवा.'
        },
        metric: '100%',
        icon: 'Leaf'
      },
      {
        title: { en: 'Zero Milk Curdling Guarantee', mr: 'दूध न फाटण्याची १००% हमी' },
        description: { 
          en: 'Scientifically balanced pH eliminates the common curdling issue when boiling pure jaggery with dairy milk.',
          mr: 'गुळामुळे दूध फाटण्याची जुनी समस्या आमच्या अचूक वैज्ञानिक समतोलामुळे कायमची दूर.'
        },
        metric: '0%',
        icon: 'ShieldCheck'
      },
      {
        title: { en: 'ISO & FSSAI Cleanroom Unit', mr: 'अत्याधुनिक प्रमाणित उत्पादन' },
        description: { 
          en: 'Blended and packaged under nitrogen-flush climate-controlled cleanrooms in Pune, Maharashtra.',
          mr: 'पुणे येथील आयएसओ आणि एफएसएसएआय प्रमाणित अत्याधुनिक क्लीनरूम युनिटमध्ये सुरक्षित पॅकिंग.'
        },
        metric: 'ISO 22000',
        icon: 'Award'
      },
      {
        title: { en: '3-Minute Instant Simmer', mr: '३ मिनिटांत झटपट तयार' },
        description: { 
          en: 'Saves commercial establishments hours of boiling while delivering consistent royal basundi richness in every cup.',
          mr: 'हॉटेल्स, हॉस्पिटॅलिटी आणि घरासाठी तासभराची मेहनत वाचवणारा ३ मिनिटांचा चहा.'
        },
        metric: '3 Min',
        icon: 'Clock'
      }
    ]
  },

  // 10 FINAL BRAND STATEMENT
  brandStatement: {
    quote: {
      en: '“A ritual of purity in every boiling cup.”',
      mr: '“प्रत्येक उकळत्या कपात शुद्धतेचा सोहळा.”'
    },
    subtext: {
      en: 'Crafted with reverence for Indian tea culture by Purple Bean Agro Industries Private Limited.',
      mr: 'पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड द्वारे भारतीय चहा संस्कृतीचा गौरव.'
    },
    author: {
      en: 'LataTea — Pune, Maharashtra',
      mr: 'लता टी — पुणे, महाराष्ट्र'
    }
  },

  // CONTACT & ENQUIRIES
  contact: {
    tagline: {
      en: 'COMMERCIAL & SAMPLE INQUIRIES',
      mr: 'व्यावसायिक आणि नमुना चहा चौकशी'
    },
    heading: {
      en: 'Begin a Conversation with LataTea',
      mr: 'लता टी सोबत नवीन सहकार्य सुरू करा'
    },
    subheading: {
      en: 'For corporate pantry contracts, luxury banquet sampling, and wholesale distributor partnerships.',
      mr: 'कॉर्पोरेट कार्यालये, बँक्वेट्स, हॉटेल्स आणि वितरकांसाठी मोफत सॅम्पल आणि व्यावसायिक चौकशी.'
    },
    enquiryNotice: {
      en: 'Our enterprise team responds within 24 business hours with custom trial kits and distributor pricing.',
      mr: 'आमची तज्ज्ञ टीम २४ तासांच्या आत ट्रायल किट्स आणि व्यावसायिक माहितीसह संपर्क करेल.'
    }
  },

  // FOOTER
  footer: {
    aboutText: {
      en: 'LataTea is an artisan Indian tea brand crafting authentic jaggery Basundi Chai, royal spiced blends, and cleanroom vending premixes. Manufactured by Purple Bean Agro Industries Private Limited.',
      mr: 'लता टी हा अस्सल गुळाचा बासुंदी चहा आणि शाही मसाल्यांचा चहा तयार करणारा अग्रगण्य ब्रँड आहे. पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड द्वारे उत्पादित.'
    },
    copyrightText: {
      en: '© 2026 Purple Bean Agro Industries Private Limited. All rights reserved.',
      mr: '© २०२६ पर्पल बीन अ‍ॅग्रो इंडस्ट्रीज प्रायव्हेट लिमिटेड. सर्व हक्क राखीव.'
    },
    legalLinks: [
      { label: { en: 'Privacy Policy', mr: 'गोपनीयता धोरण' }, url: '/privacy' },
      { label: { en: 'Terms of Service', mr: 'नियम आणि अटी' }, url: '/terms' },
      { label: { en: 'FSSAI Lic: 11525996000709', mr: 'एफएसएसएआय परवाना: ११५२५९९६०००७०९' }, url: '/contact' }
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
    { id: 'sec_hero', key: 'hero', name: 'Hero Composition', description: 'Editorial visual composition and powerful statement', isEnabled: true, order: 1, bgType: 'green' },
    { id: 'sec_story', key: 'story', name: 'The Story', description: 'Who we are & Why Lata Tea exists', isEnabled: true, order: 2, bgType: 'cream' },
    { id: 'sec_heritage', key: 'heritage', name: 'Heritage', description: 'Agricultural roots & milestones', isEnabled: true, order: 3, bgType: 'cream' },
    { id: 'sec_craft', key: 'craft', name: 'The Craft', description: '5 stages of tea craftsmanship', isEnabled: true, order: 4, bgType: 'white' },
    { id: 'sec_tea', key: 'tea', name: 'Tea Stories', description: 'Editorial discovery of signature tea blends', isEnabled: true, order: 5, bgType: 'cream' },
    { id: 'sec_experience', key: 'experience', name: 'The Experience', description: 'Sensory and emotional tea ritual', isEnabled: true, order: 6, bgType: 'white' },
    { id: 'sec_why', key: 'why', name: 'Why Lata Tea', description: 'Verified differentiators & purity pillars', isEnabled: true, order: 7, bgType: 'cream' },
    { id: 'sec_statement', key: 'statement', name: 'Brand Statement', description: 'Concluding story quote', isEnabled: true, order: 8, bgType: 'green' },
    { id: 'sec_contact', key: 'contact', name: 'Contact & Inquiries', description: 'Statutory credentials & wholesale forms', isEnabled: true, order: 9, bgType: 'white' }
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
      en: 'LataTea — Authentic Indian Jaggery Chai & Royal Basundi Spices',
      mr: 'लता टी — अस्सल भारतीय गूळ बासुंदी चहा'
    },
    metaDescription: {
      en: 'Discover LataTea: Velvety spiced Basundi Chai crafted with 100% natural organic jaggery and pure Assam leaves. Ready in 3 minutes.',
      mr: '१००% नैसर्गिक सेंद्रिय गूळ आणि आसामच्या चहाच्या पानांपासून बनवलेला मखमली बासुंदी चहा. अवघ्या ३ मिनिटांत तयार.'
    },
    ogTitle: {
      en: 'LataTea — Royal Heritage Tea Story',
      mr: 'लता टी — राजेशाही भारतीय चहाचा वारसा'
    },
    ogDescription: {
      en: 'Experience authentic Indian jaggery tea and basundi chai ready in 3 minutes. Cleanroom packaged in Pune, Maharashtra.',
      mr: '३ मिनिटांत तयार होणारा अस्सल भारतीय गुळाचा आणि बासुंदी चहा.'
    },
    ogImageSlotId: 'HOME_HERO_PRIMARY',
    canonicalUrl: 'https://latatea.com',
    robots: 'index, follow'
  }
};

export const BROCHURE_CONTACT_PRESET = INITIAL_CMS_STATE.contact;
