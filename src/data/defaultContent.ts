import { CMSState, MediaSlot, ProductItem, SolutionItem, DomainItem, SectionConfig, NavigationItem } from '../types/cms';
import { DEFAULT_MEDIA_ITEMS } from './defaultMediaAssets';

export const DEFAULT_MEDIA_SLOTS: Record<string, MediaSlot> = {
  HOME_HERO_PRIMARY: {
    id: 'slot_hero_primary',
    slotKey: 'HOME_HERO_PRIMARY',
    label: 'Hero Panoramic Background',
    description: 'High-definition heritage photograph of copper bowl, tea spices, and brass cup',
    category: 'hero',
    desktopImageId: 'media_royal_panoramic',
    mobileImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 50,
    objectFit: 'cover',
    aspectRatioHint: '21:9'
  },
  ABOUT_IMAGE_PRIMARY: {
    id: 'slot_about_primary',
    slotKey: 'ABOUT_IMAGE_PRIMARY',
    label: 'About Showcase Copper Bowl & Spoon',
    description: 'Carved antique copper bowl with spoon pouring master tea mix',
    category: 'about',
    desktopImageId: 'media_royal_bowl',
    mobileImageId: 'media_royal_bowl',
    focalX: 50,
    focalY: 45,
    objectFit: 'cover',
    aspectRatioHint: '1:1'
  },
  CTA_BACKGROUND: {
    id: 'slot_cta_bg',
    slotKey: 'CTA_BACKGROUND',
    label: 'CTA Section Backdrop',
    description: 'Panoramic tea spices and ambient royal lighting',
    category: 'cta',
    desktopImageId: 'media_royal_panoramic',
    mobileImageId: 'media_royal_panoramic',
    focalX: 50,
    focalY: 60,
    objectFit: 'cover',
    aspectRatioHint: '16:9'
  },
  BRAND_LOGO_PRIMARY: {
    id: 'slot_brand_logo_pri',
    slotKey: 'BRAND_LOGO_PRIMARY',
    label: 'Brand Logo (Primary Crest)',
    description: 'Main royal green and gold Lata Tea crest logo',
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
    description: 'Light tinted version for dark backgrounds',
    category: 'brand',
    desktopImageId: 'media_logo_light',
    focalX: 50,
    focalY: 50,
    objectFit: 'contain',
    aspectRatioHint: '16:9'
  }
};

export const DEFAULT_PRODUCTS: ProductItem[] = [
  // 1. Gud Tea Range (Organic Jaggery)
  {
    id: 'prod_gud_basundi',
    slug: 'gud-basundi-tea',
    name: 'Gud Basundi Tea (Spiced Jaggery)',
    category: 'gud',
    categoryName: 'Gud Tea Range',
    shortDescription: 'Signature blend sweetened with pure organic jaggery and rich basundi spices.',
    fullDescription: 'Crafted for connoisseurs seeking the authentic warmth of traditional Indian jaggery tea. Infused with cardamom, mace, nutmeg, and ginger, our signature Gud Basundi Tea dissolves completely in hot water and milk for a velvety, immunity-boosting cup.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Single Sachet', price: 15, inStock: true },
      { size: '160g Pouch (10 Cups)', price: 135, inStock: true },
      { size: '1kg Bulk HoReCa Pack', price: 780, inStock: true }
    ],
    applications: ['Corporate Pantries', 'Traditional Chai Outlets', 'Hotels & Banquets', 'Retail Kitchens'],
    features: ['100% Pure Organic Jaggery', 'No Refined Sugar', 'Rich Cardamom & Nutmeg Infusion', 'Ready in 2–3 Minutes'],
    ingredients: ['Assam CTC Tea Extract', 'Pure Jaggery (Gud) Powder', 'Cardamom', 'Ginger Root', 'Nutmeg', 'Mace'],
    preparationNote: 'Boil 400ml water and 400ml milk, add 160g mix (or 16g per single cup), simmer for 2 mins and serve.',
    displayOrder: 1,
    isFeatured: true,
    isVisible: true,
    badgeText: '★ Best Seller',
    seoTitle: 'Gud Basundi Tea Mix — Natural Organic Jaggery Chai | LataTea',
    seoDescription: 'Experience rich, creamy Gud Basundi Chai sweetened with 100% organic jaggery and royal spices. Fast dissolving, zero refined sugar.'
  },
  {
    id: 'prod_gud_plain',
    slug: 'gud-plain-tea',
    name: 'Gud Plain Chai (Classic Jaggery)',
    category: 'gud',
    categoryName: 'Gud Tea Range',
    shortDescription: 'Pure jaggery sweetness balanced with bold Assam tea leaves without added spice aromatics.',
    fullDescription: 'A wholesome everyday cup for purists who love the unadulterated taste of country jaggery and robust Assam CTC tea. Delivers deep amber color, smooth sweetness, and comforting warmth without curdling milk.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Single Sachet', price: 14, inStock: true },
      { size: '160g Pouch (10 Cups)', price: 125, inStock: true },
      { size: '1kg Bulk HoReCa Pack', price: 720, inStock: true }
    ],
    applications: ['Daily Home Brewing', 'Office Pantries', 'Cafés'],
    features: ['Mild Natural Sweetness', 'Zero Preservatives', 'Rich Assam CTC Profile'],
    ingredients: ['Assam CTC Tea Extract', 'Natural Desi Jaggery Powder'],
    displayOrder: 2,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Pure Jaggery',
    seoTitle: 'Gud Plain Chai Mix — Traditional Jaggery Tea | LataTea',
    seoDescription: 'Wholesome everyday chai with pure country jaggery and robust Assam tea leaves.'
  },
  {
    id: 'prod_gud_ginger',
    slug: 'gud-ginger-adrak-tea',
    name: 'Gud Ginger Adrak Special',
    category: 'gud',
    categoryName: 'Gud Tea Range',
    shortDescription: 'Invigorating Sunthi dried ginger extract blended with organic jaggery.',
    fullDescription: 'Packed with the zest of natural Sunthi ginger, this blend cuts through cold days and boosts digestive vitality. The sharp, spicy ginger note harmonizes exquisitely with the rich sweetness of jaggery.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '16g Single Sachet', price: 15, inStock: true },
      { size: '160g Pouch (10 Cups)', price: 135, inStock: true },
      { size: '1kg Bulk HoReCa Pack', price: 790, inStock: true }
    ],
    applications: ['Winter Specials', 'Highway Chai Lounges', 'Hospitality'],
    features: ['Zesty Sunthi Ginger', 'Natural Throat Soother', 'Immunity Formulation'],
    ingredients: ['Assam CTC Tea Extract', 'Jaggery Powder', 'Dried Ginger (Sunthi)', 'Black Pepper'],
    displayOrder: 3,
    isFeatured: true,
    isVisible: true,
    badgeText: 'Immunity Boost',
    seoTitle: 'Gud Ginger Adrak Chai — Spiced Jaggery Tea | LataTea',
    seoDescription: 'Zesty natural ginger blended with organic jaggery for soothing digestion and immunity.'
  },

  // 2. Sugar Tea Range
  {
    id: 'prod_sugar_basundi',
    slug: 'sugar-basundi-tea',
    name: 'Sugar Basundi Royal Chai',
    category: 'sugar',
    categoryName: 'Sugar Tea Range',
    shortDescription: 'Creamy condensed basundi milk profile with cardamom, saffron notes, and refined sweetness.',
    fullDescription: 'The pride of festive Maharashtrian hospitality. Our Sugar Basundi formulation captures the slow-simmered, thickened milk richness of authentic Rabdi/Basundi combined with prime high-grown tea leaves and aromatic green cardamom.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '14g Single Sachet', price: 14, inStock: true },
      { size: '140g Pouch (10 Cups)', price: 130, inStock: true },
      { size: '1kg HoReCa Pack', price: 760, inStock: true }
    ],
    applications: ['Weddings & Banquets', 'Sweet Shops', 'Upscale Restaurants', 'Gift Hampers'],
    features: ['Thick Creamy Mouthfeel', 'Royal Green Cardamom & Saffron Notes', 'Instant Hot Dispense'],
    ingredients: ['Tea Solids', 'Fine Cane Sugar', 'Dairy Cream Solids', 'Green Cardamom', 'Natural Basundi Flavour', 'Saffron Notes'],
    displayOrder: 4,
    isFeatured: true,
    isVisible: true,
    badgeText: 'Royal Choice',
    seoTitle: 'Sugar Basundi Royal Chai — Creamy Cardamom Tea | LataTea',
    seoDescription: 'Thick, creamy royal basundi chai formulated for weddings, banquets, and tea lounges.'
  },
  {
    id: 'prod_sugar_masala',
    slug: 'sugar-kadak-masala-tea',
    name: 'Sugar Kadak Masala Chai',
    category: 'sugar',
    categoryName: 'Sugar Tea Range',
    shortDescription: 'The classic Indian 5-spice blend of clove, cardamom, cinnamon, black pepper, and ginger.',
    fullDescription: 'Bold, robust, and unmistakably authentic. Designed for high-volume tea counters and chai enthusiasts who demand a fiery, aromatic kick in every sip.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '14g Single Sachet', price: 12, inStock: true },
      { size: '140g Pouch (10 Cups)', price: 115, inStock: true },
      { size: '1kg HoReCa Pack', price: 690, inStock: true }
    ],
    applications: ['QSR Outlets', 'Office Pantries', 'Canteens', 'Railway Lounges'],
    features: ['Authentic 5-Spice Bouquet', 'High-Grown Kadak Assam Base', 'Consistent Flavor Ratio'],
    ingredients: ['CTC Tea Extract', 'Sugar', 'Clove', 'Cardamom', 'Cinnamon', 'Black Pepper', 'Ginger'],
    displayOrder: 5,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Kadak 5-Spice',
    seoTitle: 'Sugar Kadak Masala Chai — Authentic Indian Spiced Tea | LataTea',
    seoDescription: 'Bold Assam tea with 5 whole ground spices and balanced sweetness for high-volume service.'
  },

  // 3. Vending Premixes
  {
    id: 'prod_vending_gud',
    slug: 'vending-gud-tea-premix',
    name: 'Vending Premix — Gud Basundi Chai (3-in-1)',
    category: 'vending',
    categoryName: 'Vending Premixes',
    shortDescription: 'Free-flowing instant 3-in-1 premix (Tea + Milk + Gud) for automatic vending machines.',
    fullDescription: 'Specially engineered granular formulation with anti-caking properties for seamless flow in all standard automatic tea/coffee vending dispensers. Delivers velvety jaggery basundi chai in under 10 seconds per cup.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '1kg Vending Foil Pack', price: 420, inStock: true },
      { size: '10kg Commercial Carton (10x1kg)', price: 4000, inStock: true }
    ],
    applications: ['Corporate Pantries', 'Vending Operators', 'Hospitals', 'Airports & Transit Hubs'],
    features: ['Anti-Caking Granules', 'Instant 10-Second Dispense', 'Zero Boiler Residue', 'No Curdling'],
    ingredients: ['Micro-Granulated CTC Tea', 'Dairy Creamer', 'Organic Jaggery Solids', 'Basundi Aromatics'],
    displayOrder: 6,
    isFeatured: true,
    isVisible: true,
    badgeText: '3-in-1 Vending',
    seoTitle: 'Automatic Vending Gud Chai Premix — Fast Dispense | LataTea',
    seoDescription: 'Free-flowing 3-in-1 jaggery tea premix for automatic vending machines in corporate offices and transit hubs.'
  },
  {
    id: 'prod_vending_masala',
    slug: 'vending-masala-chai-premix',
    name: 'Vending Premix — Cardamom Masala Chai (3-in-1)',
    category: 'vending',
    categoryName: 'Vending Premixes',
    shortDescription: 'Instant machine-ready spiced tea premix with real dairy and fragrant green cardamom.',
    fullDescription: 'A favorite for corporate cafeterias and B2B workplaces. Gives employees and visitors a refreshing, consistent cup of spiced kadak chai without manual brewing effort or mess.',
    imageSlotId: 'ABOUT_IMAGE_PRIMARY',
    packSizes: [
      { size: '1kg Vending Foil Pack', price: 390, inStock: true },
      { size: '10kg Commercial Carton (10x1kg)', price: 3750, inStock: true }
    ],
    applications: ['Offices', 'Manufacturing Plants', 'Co-working Hubs'],
    features: ['Standardized Flavor Across Batches', 'Fast Dissolving', 'Low Waste'],
    ingredients: ['Tea Extract', 'Dairy Creamer', 'Sugar', 'Green Cardamom Extracts', 'Ginger Extract'],
    displayOrder: 7,
    isFeatured: false,
    isVisible: true,
    badgeText: 'Vending Ready',
    seoTitle: 'Cardamom Masala Vending Premix — 3-in-1 Chai | LataTea',
    seoDescription: 'Commercial grade 3-in-1 cardamom spiced tea premix for high-volume automatic vending dispensers.'
  }
];

export const DEFAULT_SOLUTIONS: SolutionItem[] = [
  {
    id: 'sol_corporate',
    slug: 'corporate',
    title: 'Corporate Offices & IT Parks',
    subtitle: 'Boost workplace productivity with instant, hygienic, authentic chai on tap.',
    tagline: 'HIGH-VOLUME PANTRY PERFECTION',
    targetAudience: 'Facilities Managers, HR Teams, Corporate Caterers',
    problemStatement: 'Offices lose hours of productivity with unpredictable canteen chai, messy manual tea preparation, and employee dissatisfaction with watery machine beverages.',
    lataSolution: 'LataTea delivers standard-defining Gud Basundi & Masala premixes that dispense in seconds through automatic vending or quick pantry kettles, maintaining consistent royal flavor across 1,000+ daily cups.',
    benefits: [
      { title: 'Zero Preparation Mess', description: 'No boiling leaves, no strained sieves, and no burnt milk crust in pantry kettles.', icon: 'ShieldCheck' },
      { title: 'Healthier Energy', description: 'Organic Jaggery (Gud) options give staff sustained energy without refined sugar crashes.', icon: 'Leaf' },
      { title: 'Cost Predictability', description: 'Standardized per-cup costing of under ₹6–₹12 per serving with zero ingredient pilferage.', icon: 'Award' }
    ],
    recommendedProductIds: ['prod_vending_gud', 'prod_gud_basundi', 'prod_vending_masala'],
    bannerSlotId: 'HOME_HERO_PRIMARY',
    applicationSteps: [
      { stepNumber: 1, title: 'Fill Hopper or Pantry Dispenser', instruction: 'Load the 1kg foil pack directly into your automatic machine canister.' },
      { stepNumber: 2, title: 'Calibrate Water Flow', instruction: 'Set single-press ratio (14g mix to 90ml hot water 85°C).' },
      { stepNumber: 3, title: 'Enjoy Instant Cup', instruction: 'Dispense velvety, aromatic chai with rich crema in under 8 seconds.' }
    ],
    icon: 'Building2',
    isEnabled: true,
    displayOrder: 1
  },
  {
    id: 'sol_hotels',
    slug: 'hotels',
    title: 'Hotels & Banquets',
    subtitle: 'Deliver authentic royal Indian hospitality with heritage Basundi Chai at weddings & breakfast buffets.',
    tagline: 'LUXURY HOSPITALITY & BANQUET SOLUTIONS',
    targetAudience: 'Executive Chefs, F&B Directors, Banquet Managers',
    problemStatement: 'High-end banquets struggle to serve authentic, thick spiced chai to 500+ guests simultaneously during morning conferences or wedding muhurats without taste variation.',
    lataSolution: 'Our 1kg HoReCa master packs allow banquet teams to brew 50–100 liters of luxurious, thickened Basundi chai in minutes, ensuring the 500th guest enjoys the exact same rich, fragrant cup as the first.',
    benefits: [
      { title: 'Mass Scalability', description: 'Prepare 100 liters of festive chai in under 15 minutes with complete batch consistency.', icon: 'Users' },
      { title: 'Signature Heritage Touch', description: 'Real cardamom, saffron notes, and pure jaggery impress discerning destination wedding guests.', icon: 'Award' },
      { title: 'Reduced Chef Dependency', description: 'Any banquet staff member can follow the 1:1 recipe with foolproof results.', icon: 'CheckCircle2' }
    ],
    recommendedProductIds: ['prod_sugar_basundi', 'prod_gud_basundi'],
    bannerSlotId: 'HOME_HERO_PRIMARY',
    applicationSteps: [
      { stepNumber: 1, title: 'Batch Boiling', instruction: 'Boil equal parts milk and water in your large banquet samovar or kettle.' },
      { stepNumber: 2, title: 'Stir in Lata Mix', instruction: 'Whisk in 160g mix per liter of liquid for 2 minutes.' },
      { stepNumber: 3, title: 'Serve Hot in Kulhads', instruction: 'Pour into earthen clay kulhads for an authentic royal banquet presentation.' }
    ],
    icon: 'Hotel',
    isEnabled: true,
    displayOrder: 2
  },
  {
    id: 'sol_restaurants',
    slug: 'restaurants',
    title: 'Fine Dining & Quick Service Restaurants',
    subtitle: 'Elevate your beverage menu with high-margin signature regional chai blends.',
    tagline: 'PREMIUM MENU DIFFERENTIATION',
    targetAudience: 'Restaurateurs, QSR Franchise Operators, Cloud Kitchens',
    problemStatement: 'Restaurants often treat chai as an afterthought, losing beverage revenue and dessert-pairing opportunities to specialty coffee chains.',
    lataSolution: 'LataTea transforms chai into a premium destination item. Feature "Desi Gud Basundi Chai" or "Kadak Malabar Masala" on your beverage and dessert menus with over 75% gross profit margins.',
    benefits: [
      { title: 'High Margin Category', description: 'Serve premium ₹60–₹120 artisanal chai cups at an ingredient cost of ₹8–₹15.', icon: 'TrendingUp' },
      { title: 'Speed of Service', description: 'Fulfill dine-in and delivery tea orders in under 3 minutes without keeping milk boiling constantly.', icon: 'Clock' },
      { title: 'Zero Curdling Risk', description: 'Proprietary non-acidic jaggery formulation guarantees milk never curdles.', icon: 'ShieldCheck' }
    ],
    recommendedProductIds: ['prod_gud_basundi', 'prod_sugar_basundi', 'prod_gud_ginger'],
    bannerSlotId: 'ABOUT_IMAGE_PRIMARY',
    applicationSteps: [
      { stepNumber: 1, title: 'Steam or Boil Milk', instruction: 'Use espresso steam wand or small induction pan with milk & water.' },
      { stepNumber: 2, title: 'Add Single Sachet', instruction: 'Stir one 16g sachet directly into 120ml hot liquid.' },
      { stepNumber: 3, title: 'Garnish & Serve', instruction: 'Top with slivered pistachios or crushed cardamom for gourmet presentation.' }
    ],
    icon: 'Utensils',
    isEnabled: true,
    displayOrder: 3
  },
  {
    id: 'sol_cafes',
    slug: 'cafes',
    title: 'Modern Cafés & Tea Lounges',
    subtitle: 'Add artisanal Indian craft chai to attract modern wellness-conscious consumers.',
    tagline: 'CONTEMPORARY CHAI CULTURE',
    targetAudience: 'Café Owners, Specialty Coffee & Tea Shops, Co-working Lounges',
    problemStatement: 'Modern café patrons are seeking alternatives to sugary syrups and artificial powders, demanding authentic unrefined jaggery and real spice infusions.',
    lataSolution: 'LataTea bridges heritage Indian chai and modern café culture with clean-label organic jaggery formulation, perfect for hot cups, iced chai lattes, and artisanal chai frappes.',
    benefits: [
      { title: 'Clean Label Story', description: 'No artificial flavors, unrefined jaggery, and traceable Assam CTC tea origin.', icon: 'Leaf' },
      { title: 'Versatile Drink Creations', description: 'Ideal base for Iced Gud Chai, Oat Milk Spiced Lattes, and Chai affogatos.', icon: 'Sparkles' },
      { title: 'Fast Barista Workflow', description: 'Instant dissolve texture speeds up drink queue times during peak morning rush.', icon: 'Clock' }
    ],
    recommendedProductIds: ['prod_gud_basundi', 'prod_gud_ginger', 'prod_sugar_masala'],
    bannerSlotId: 'ABOUT_IMAGE_PRIMARY',
    applicationSteps: [
      { stepNumber: 1, title: 'Dine-In Hot Cup', instruction: 'Steam with milk of choice (dairy or oat) and serve in glass tulip mugs.' },
      { stepNumber: 2, title: 'Iced Chai Latte', instruction: 'Dissolve in 40ml hot water, pour over ice, top with cold foamed milk.' }
    ],
    icon: 'Coffee',
    isEnabled: true,
    displayOrder: 4
  },
  {
    id: 'sol_retail',
    slug: 'retail',
    title: 'Retail & Supermarket Distribution',
    subtitle: 'Eye-catching royal packaging with high shelf velocity and repeat consumer loyalty.',
    tagline: 'FAST-MOVING CONSUMER PACKS',
    targetAudience: 'FMCG Distributors, Supermarket Chains, Kirana Networks',
    problemStatement: 'Retail shelves are saturated with generic plain tea powders, leaving consumers hungry for convenient, authentic premixes with genuine jaggery and basundi heritage.',
    lataSolution: 'LataTea 160g stand-up zipper pouches and 16g hanging sachet strips offer standout royal emerald and gold shelf appeal, driving high trial rates and repeat weekly purchases.',
    benefits: [
      { title: 'High Shelf Turnover', description: 'Fast adoption due to the revolutionary 3-minute home basundi promise.', icon: 'ShoppingBag' },
      { title: 'Robust Margin Structure', description: 'Attractive retail distributor margins and point-of-sale display collaterals.', icon: 'Award' },
      { title: 'Tamper-Proof Packaging', description: 'Multi-layer nitrogen-flushed barrier pouches ensure 12 months fresh shelf life.', icon: 'ShieldCheck' }
    ],
    recommendedProductIds: ['prod_gud_basundi', 'prod_gud_plain', 'prod_sugar_basundi'],
    bannerSlotId: 'HOME_HERO_PRIMARY',
    applicationSteps: [
      { stepNumber: 1, title: 'End-Cap Shelf Placement', instruction: 'Position near traditional tea and breakfast staple aisles.' },
      { stepNumber: 2, title: 'In-Store Live Sampling', instruction: 'Run quick 3-minute kettle sampling to convert 8 out of 10 shoppers.' }
    ],
    icon: 'Store',
    isEnabled: true,
    displayOrder: 5
  },
  {
    id: 'sol_vending',
    slug: 'vending',
    title: 'Vending Machine Operators',
    subtitle: 'High-yield, zero-choke premixes designed for 24/7 automated hot beverage vending.',
    tagline: 'MACHINE-OPTIMIZED FORMULATION',
    targetAudience: 'Vending Route Operators, Canteen Concessionaires, Transit Hub Managers',
    problemStatement: 'Vending operators suffer high machine maintenance costs from gummy premixes that clog dispensing nozzles and trigger service calls.',
    lataSolution: 'LataTea vending formulations use micro-granulation with strict moisture control under 2.5%, ensuring smooth free-fall discharge, zero hopper clogs, and high cup yield per kilogram.',
    benefits: [
      { title: 'Zero Nozzle Clogging', description: 'Free-flowing granules dissolve instantly without clinging to mixing bowls.', icon: 'Cpu' },
      { title: 'High Yield per Kg', description: 'Yields 70–80 cups per 1kg pack, maximizing operator profitability per refill.', icon: 'TrendingUp' },
      { title: 'Long Hopper Stability', description: 'Resists ambient humidity inside machines in hot and humid regional climates.', icon: 'ShieldCheck' }
    ],
    recommendedProductIds: ['prod_vending_gud', 'prod_vending_masala'],
    bannerSlotId: 'HOME_HERO_PRIMARY',
    applicationSteps: [
      { stepNumber: 1, title: 'Canister Refill', instruction: 'Pour directly into dry vending canister without breaking granules.' },
      { stepNumber: 2, title: 'Set Throw Grammage', instruction: 'Calibrate throw to 13.5g per 90ml cup.' },
      { stepNumber: 3, title: 'Routine Flush', instruction: 'Standard end-of-day hot water rinse keeps lines pristine.' }
    ],
    icon: 'Cpu',
    isEnabled: true,
    displayOrder: 6
  }
];

export const DEFAULT_NAVIGATION: NavigationItem[] = [
  { id: 'nav_home', label: 'Home', url: '/', isExternal: false, isButton: false, isEnabled: true, order: 1 },
  { id: 'nav_about', label: 'About', url: '/about', isExternal: false, isButton: false, isEnabled: true, order: 2 },
  {
    id: 'nav_products',
    label: 'Products',
    url: '/products',
    isExternal: false,
    isButton: false,
    isEnabled: true,
    order: 3,
    children: [
      { label: 'Gud Tea Range', url: '/products/gud-tea', description: 'Sweetened with 100% pure organic jaggery', badge: 'Natural Gud' },
      { label: 'Sugar Tea Range', url: '/products/sugar-tea', description: 'Royal Basundi & Kadak Masala blends', badge: 'Royal Rich' },
      { label: 'Vending Premixes', url: '/products/premixes', description: '3-in-1 machine-ready instant tea granules', badge: 'Vending' },
      { label: 'View All Products', url: '/products', description: 'Explore complete catalogue with direct order options' }
    ]
  },
  {
    id: 'nav_solutions',
    label: 'Solutions',
    url: '/solutions',
    isExternal: false,
    isButton: false,
    isEnabled: true,
    order: 4,
    children: [
      { label: 'Corporate Offices', url: '/solutions/corporate', description: 'Pantry & automated vending for workspaces' },
      { label: 'Hotels & Banquets', url: '/solutions/hotels', description: 'High-volume luxury hospitality brewing' },
      { label: 'Restaurants & QSR', url: '/solutions/restaurants', description: 'High-margin artisanal tea menu integration' },
      { label: 'Modern Cafés', url: '/solutions/cafes', description: 'Craft Indian chai culture & iced blends' },
      { label: 'Retail & Supermarkets', url: '/solutions/retail', description: 'Consumer pouches & distributor packs' },
      { label: 'Vending Operators', url: '/solutions/vending', description: 'Zero-clog 3-in-1 commercial premixes' }
    ]
  },
  { id: 'nav_prep', label: 'Preparation', url: '/preparation', isExternal: false, isButton: false, isEnabled: true, order: 5 },
  { id: 'nav_story', label: 'Our Story', url: '/our-story', isExternal: false, isButton: false, isEnabled: true, order: 6 },
  { id: 'nav_contact', label: 'Contact', url: '/contact', isExternal: false, isButton: false, isEnabled: true, order: 7 }
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

export const INITIAL_CMS_STATE: CMSState = {
  version: 2,
  status: 'published',
  lastPublishedAt: new Date().toISOString(),
  lastSavedAt: new Date().toISOString(),
  sections: [
    { id: 'sec_hero', key: 'hero', name: 'Hero Showcase', description: 'Hero banner with 3-minute proposition & panoramic tea visual', isEnabled: true, order: 1, bgType: 'green' },
    { id: 'sec_promise', key: 'promise', name: 'The Lata Promise', description: 'Brand core philosophy & quality pillars', isEnabled: true, order: 2, bgType: 'cream' },
    { id: 'sec_about', key: 'about', name: 'Why Choose Lata', description: 'Key differentiators & cleanroom manufacturing', isEnabled: true, order: 3, bgType: 'cream' },
    { id: 'sec_worlds', key: 'worlds', name: 'Product Worlds', description: 'Large editorial showcases for Gud, Sugar, and Vending ranges', isEnabled: true, order: 4, bgType: 'white' },
    { id: 'sec_products', key: 'products', name: 'Signature Products', description: 'Curated hero products catalogue and pack selection', isEnabled: true, order: 5, bgType: 'cream' },
    { id: 'sec_solutions', key: 'solutions', name: 'Business Solutions', description: 'HoReCa & Commercial industry solutions overview', isEnabled: true, order: 6, bgType: 'white' },
    { id: 'sec_preparation', key: 'preparation', name: '3-Minute Preparation', description: 'Visual brewing steps & master 160g recipe', isEnabled: true, order: 7, bgType: 'cream' },
    { id: 'sec_story_teaser', key: 'story_teaser', name: 'Our Story Teaser', description: 'Visual bridge to the heritage story', isEnabled: true, order: 8, bgType: 'green' },
    { id: 'sec_track', key: 'track', name: 'Consignment Tracking', description: 'Universal order & delivery tracking portal', isEnabled: true, order: 9, bgType: 'white' },
    { id: 'sec_cta', key: 'cta', name: 'Conversion & Sample Request', description: 'B2B Wholesale & Free Sample request call-to-action', isEnabled: true, order: 10, bgType: 'green' },
    { id: 'sec_contact', key: 'contact', name: 'Registration & Contact', description: 'Official corporate addresses and statutory credentials', isEnabled: true, order: 11, bgType: 'cream' },
    { id: 'sec_footer', key: 'footer', name: 'Corporate Footer', description: 'Footer legal links and credentials', isEnabled: true, order: 12, bgType: 'green' }
  ],
  navigation: DEFAULT_NAVIGATION,
  products: DEFAULT_PRODUCTS,
  solutions: DEFAULT_SOLUTIONS,
  domains: DEFAULT_DOMAINS,
  mediaLibrary: DEFAULT_MEDIA_ITEMS,
  mediaSlots: DEFAULT_MEDIA_SLOTS,
  content: {
    hero: {
      headline: 'Authentic Taste. Consistent Quality.',
      subheadline: 'Traditional Basundi Chai in 3 Minutes. Crafted with pure organic jaggery and royal spices for chai lovers everywhere.',
      tagline: 'AUTHENTIC TASTE • CONSISTENT QUALITY • INSTANT CONVENIENCE',
      ctaPrimaryText: 'Explore Products',
      ctaPrimaryLink: '/products',
      ctaSecondaryText: 'Request Free Samples',
      ctaSecondaryLink: '/contact',
      badgeText: '★ 100% PURE JAGGERY (GUD)'
    },
    promise: {
      tagline: 'THE LATA PROMISE',
      heading: 'Heritage Flavor Meets Modern Scientific Consistency',
      subheading: 'We reimagined traditional Indian chai brewing to solve every problem of uneven sweetness, curdling milk, and lengthy boiling times.',
      pillars: [
        { title: '100% Pure Organic Jaggery', description: 'Natural unrefined desi gud with zero chemical bleach, high iron content, and guaranteed non-curdling formula.', metric: '100% Desi Gud' },
        { title: 'Assam Master Harvest', description: 'Selective orthodox & CTC black tea leaves sourced directly from high-elevation Assam estates for robust liquor.', metric: 'Grade-A Leaves' },
        { title: '3-Minute Ready Convenience', description: 'Pre-blended precision measures save 70% preparation time across home kitchens and busy commercial pantries.', metric: 'Under 3 Mins' }
      ]
    },
    about: {
      tagline: 'WHY CHOOSE LATA?',
      heading: 'A Masterclass in Indian Tea Craftsmanship',
      subheading: 'Born from a deep passion for the authentic, slow-simmered basundi chai of Maharashtra and the royal spiced brews of India.',
      storyParagraphs: [
        'For generations, preparing authentic spiced basundi chai meant boiling milk for hours, carefully grinding fresh cardamom and spices, and balancing country jaggery without letting the brew curdle.',
        'At LataTea, we modernized this beloved ritual. By micro-homogenizing real Assam tea extracts with certified organic jaggery and authentic Malabar spices in an ISO-certified cleanroom facility, we created a blend that dissolves flawlessly in minutes.'
      ],
      highlights: [
        { id: 'h1', title: '100% Pure Jaggery (Gud)', description: 'Rich in natural minerals with a warm caramel undertone that never curdles boiling milk.', icon: 'Leaf' },
        { id: 'h2', title: 'Velvety Basundi Richness', description: 'Captures the nostalgic texture of traditional slow-thickened milk without artificial stabilizers.', icon: 'Award' },
        { id: 'h3', title: '3-Minute Instant Preparation', description: 'Saves labor, energy, and preparation time with complete batch consistency.', icon: 'Clock' },
        { id: 'h4', title: 'Retail & HoReCa Ready', description: 'Available in 16g single sachets, 160g consumer pouches, and 1kg commercial packs.', icon: 'Store' },
        { id: 'h5', title: 'Automatic Vending Compatible', description: 'Free-flowing granules deliver high-yield cups with zero nozzle clogs.', icon: 'Cpu' },
        { id: 'h6', title: 'Hygienic Cleanroom Packing', description: 'Formulated in ISO & FSSAI certified climate-controlled cleanrooms.', icon: 'ShieldCheck' }
      ]
    },
    applications: {
      tagline: 'VERSATILE HOSPITALITY & RETAIL SOLUTIONS',
      heading: 'DESIGNED FOR EVERY SETTING',
      subheading: 'Whether for corporate tea breaks, luxury hotel dining, or convenient on-the-go vending.',
      items: [
        { id: 'app1', title: 'Corporate Offices', description: 'High-speed pantries and vending setups.', imageSlotId: 'ABOUT_IMAGE_PRIMARY', icon: 'Building2' },
        { id: 'app2', title: 'Hotels & Banquets', description: 'Royal Indian hospitality at weddings.', imageSlotId: 'ABOUT_IMAGE_PRIMARY', icon: 'Hotel' },
        { id: 'app3', title: 'Restaurants & QSR', description: 'High-margin signature chai brews.', imageSlotId: 'ABOUT_IMAGE_PRIMARY', icon: 'UtensilsCrossed' }
      ]
    },
    ourStory: {
      heroTitle: 'From the Spice Gardens to the Royal Cup',
      heroSubtitle: 'The journey of LataTea: Honoring Indian tea heritage through uncompromising purity and modern innovation.',
      origins: 'The story of LataTea began with a simple question: Why should authentic, velvety spiced jaggery chai be limited to hours of slow boiling at traditional festivals? We set out to capture the authentic, comforting taste of homemade Basundi Chai in an instant, pure form that any tea lover, café, or workplace can brew in minutes.',
      philosophy: 'We believe true luxury in tea is rooted in natural purity. In an era dominated by synthetic essences and bleached sugars, LataTea champions unrefined Indian jaggery (Gud), sun-dried Malabar ginger, and fragrant green cardamom sourced directly from trusted grower collectives.',
      craftAndSpices: 'Every batch of LataTea begins with premium Assam CTC tea leaves, renowned for their deep amber color and full-bodied malt profile. We gently combine these with whole ground spices in precise ratios to ensure the spices elevate rather than overpower the tea.',
      modernStandards: 'Our formulation is manufactured in an ISO and FSSAI certified cleanroom facility with automated nitrogen-flush multi-layer packaging. This ensures every grain retains its fresh aroma for 12 months with zero chemical preservatives.'
    },
    preparation: {
      tagline: 'PREPARATION MADE SIMPLE',
      heading: 'Master 160g Recipe — 10 Perfect Cups in 3 Minutes',
      subheading: 'Follow our simple 1:1 water-milk ratio for the most velvety, aromatic Basundi Chai experience.',
      yieldText: 'Yields 10 cups (approx 75–80ml each)',
      ingredients: [
        { name: 'Fresh Water', quantity: '400 ml', icon: 'Droplets' },
        { name: 'Fresh Milk', quantity: '400 ml', icon: 'Milk' },
        { name: 'Lata Tea Mix', quantity: '160 g (or 16g per cup)', icon: 'Sparkles' }
      ],
      steps: [
        { stepNumber: 1, title: 'Combine Water & Milk', instruction: 'Take 400ml fresh water and 400ml fresh milk in a clean tea saucepan.', imageSlotId: 'ABOUT_IMAGE_PRIMARY' },
        { stepNumber: 2, title: 'Heat to Light Simmer', instruction: 'Place the pot on medium flame and bring the liquid to a gentle first simmer.', imageSlotId: 'ABOUT_IMAGE_PRIMARY' },
        { stepNumber: 3, title: 'Add Lata Tea Mix', instruction: 'Pour in the complete 160g pouch (or 16g single sachet for 1 cup).', imageSlotId: 'ABOUT_IMAGE_PRIMARY' },
        { stepNumber: 4, title: 'Stir Continuously', instruction: 'Whisk gently for 2 to 3 minutes as the mix completely dissolves and the aroma blooms.', imageSlotId: 'ABOUT_IMAGE_PRIMARY' },
        { stepNumber: 5, title: 'Bring to Full Boil', instruction: 'Allow the chai to rise to a rich rolling boil, creating a golden velvety crema on top.', imageSlotId: 'ABOUT_IMAGE_PRIMARY' },
        { stepNumber: 6, title: 'Serve Hot & Enjoy', instruction: 'Strain if desired (or pour directly) into warm cups or earthen kulhads.', imageSlotId: 'ABOUT_IMAGE_PRIMARY' }
      ],
      footerNote: 'Pro Tip: For single-cup brewing, use 80ml water + 80ml milk + 16g Lata Tea Mix (1 single sachet).'
    },
    ordering: {
      tagline: 'HOW TO GET LATA TEA',
      heading: '7-Step Seamless Ordering & Distribution Process',
      subheading: 'From wholesale sample tasting to rapid dispatched delivery and after-sales support.',
      steps: [
        { stepNumber: 1, title: 'Inquire & Request Samples', description: 'Reach out via phone, WhatsApp, or our online portal to request trial samples.', icon: 'PhoneCall' },
        { stepNumber: 2, title: 'Select Product Range', description: 'Choose your desired combination of Gud, Sugar, and Vending pack sizes.', icon: 'PackageCheck' },
        { stepNumber: 3, title: 'Confirm & Proforma Invoice', description: 'Receive commercial quotation with volume tiered pricing and GST invoicing.', icon: 'Receipt' },
        { stepNumber: 4, title: 'Secure Banking Settlement', description: 'Transfer funds securely to our official IDFC First Bank corporate account.', icon: 'CreditCard' },
        { stepNumber: 5, title: 'Dispatched in 24–48 Hours', description: 'Your order is packed in tamper-proof cartons and dispatched via express logistics.', icon: 'Truck' },
        { stepNumber: 6, title: 'Live Universal Tracking', description: 'Track your consignment in real time using your unique Order Tracking ID.', icon: 'Search' },
        { stepNumber: 7, title: 'Dedicated After-Sales Care', description: 'Get ongoing replenishment support and machine calibration assistance.', icon: 'HeartHandshake' }
      ],
      footerNote: 'Wholesale consignments are dispatched from Pune, Maharashtra to over 500+ pin codes nationwide.'
    },
    cta: {
      headline: 'Bring the Authentic LataTea Experience to Your Business',
      subheadline: 'Join over 250+ corporate offices, hotels, restaurants, and retail stores serving unforgettable Basundi Chai every single day.',
      primaryButtonText: 'Request Free Sample Kit',
      primaryButtonLink: '/contact',
      secondaryButtonText: 'Explore Complete Catalogue',
      secondaryButtonLink: '/products',
      backgroundImageSlotId: 'CTA_BACKGROUND'
    },
    footer: {
      aboutText: 'LataTea is a premier Indian tea brand manufactured by Purple Bean Agro Industries Private Limited. Committed to delivering unadulterated jaggery tea, royal basundi blends, and high-efficiency vending premixes.',
      copyrightText: '© 2026 LataTea (Purple Bean Agro Industries Pvt. Ltd.). All rights reserved.',
      legalLinks: [
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Terms of Service', url: '/terms' },
        { label: 'FSSAI & Regulatory Compliance', url: '/compliance' }
      ]
    }
  },
  brand: {
    primaryColor: '#1E3F20',
    secondaryColor: '#8DB843',
    accentColor: '#E58A1F',
    backgroundColor: '#FAF6EE',
    textColor: '#1A2416',
    logoSlotId: 'BRAND_LOGO_PRIMARY',
    lightLogoSlotId: 'BRAND_LOGO_LIGHT',
    fontHeading: 'Playfair Display',
    fontBody: 'Plus Jakarta Sans'
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
    seoTitle: 'LataTea — Authentic Indian Jaggery Chai, Royal Basundi & Vending Premixes',
    metaDescription: 'Discover LataTea premium Gud Basundi, Sugar Basundi, and Vending Premixes. 100% natural organic jaggery, pure spices, 3-minute brewing.',
    ogTitle: 'LataTea — Royal Heritage Tea & Basundi Premixes',
    ogDescription: 'Experience authentic Indian jaggery tea and basundi chai ready in 3 minutes. Perfect for retail, corporate pantries, and HoReCa.',
    ogImageSlotId: 'HOME_HERO_PRIMARY',
    canonicalUrl: 'https://latatea.com',
    robots: 'index, follow'
  }
};

export const BROCHURE_CONTACT_PRESET = INITIAL_CMS_STATE.contact;

