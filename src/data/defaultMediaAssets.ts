import { MediaItem } from '../types/cms';

export const ROYAL_PANORAMIC_IMG = '/assets/images/hero_tea_panoramic.png';
export const ROYAL_BOWL_IMG = '/assets/images/royal_tea_bowl.jpg';
export const TEA_LEAF_IMG = '/assets/images/tea_leaf_icon.png';

export const LOGO_PRIMARY_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="100%" height="100%">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="50%" stop-color="#E58A1F" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A3CB58" />
      <stop offset="100%" stop-color="#67AF68" />
    </linearGradient>
    <filter id="dropShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.25"/>
    </filter>
  </defs>
  
  <path d="M 50,40 C 90,15 130,25 200,15 C 270,25 310,15 350,40 C 375,80 365,120 375,160 C 350,185 310,175 200,185 C 90,175 50,185 25,160 C 35,120 25,80 50,40 Z" 
        fill="#1E3F20" stroke="url(#goldGrad)" stroke-width="4" stroke-linecap="round" filter="url(#dropShadow)" />
        
  <path d="M 60,48 C 95,28 135,35 200,27 C 265,35 305,28 340,48 C 362,82 354,118 362,152 C 340,172 305,165 200,173 C 95,165 60,172 38,152 C 46,118 38,82 60,48 Z" 
        fill="none" stroke="#E58A1F" stroke-width="1.5" stroke-dasharray="8 4" opacity="0.8" />

  <g transform="translate(200, 105)">
    <path d="M 5,-40 C 15,-65 45,-60 40,-35 C 28,-30 15,-32 5,-40 Z" fill="url(#leafGrad)" />
    <path d="M -5,-35 C -25,-55 -40,-30 -20,-22 C -10,-24 -5,-28 -5,-35 Z" fill="#8DB843" />
    <path d="M 0,-42 Q 10,-32 15,-18" stroke="#FAF6EE" stroke-width="2" fill="none" />

    <text x="0" y="10" font-family="'Rozha One', 'Playfair Display', Georgia, serif" font-weight="900" font-size="76" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">
      Lata
    </text>
  </g>

  <g transform="translate(200, 162)">
    <rect x="-85" y="-18" width="170" height="36" rx="18" fill="url(#goldGrad)" stroke="#FFFFFF" stroke-width="2" filter="url(#dropShadow)" />
    <text x="0" y="6" font-family="'Cinzel', 'Playfair Display', serif" font-weight="700" font-size="18" fill="#FFFFFF" text-anchor="middle" letter-spacing="3">
      TEAMIX
    </text>
  </g>
</svg>
`)}`;

export const LOGO_LIGHT_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" width="100%" height="100%">
  <defs>
    <linearGradient id="goldGradL" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FCD34D" />
      <stop offset="100%" stop-color="#F59E0B" />
    </linearGradient>
  </defs>
  
  <path d="M 50,40 C 90,15 130,25 200,15 C 270,25 310,15 350,40 C 375,80 365,120 375,160 C 350,185 310,175 200,185 C 90,175 50,185 25,160 C 35,120 25,80 50,40 Z" 
        fill="rgba(255,255,255,0.08)" stroke="url(#goldGradL)" stroke-width="3.5" />

  <g transform="translate(200, 105)">
    <path d="M 5,-40 C 15,-65 45,-60 40,-35 C 28,-30 15,-32 5,-40 Z" fill="#8DB843" />
    <path d="M -5,-35 C -25,-55 -40,-30 -20,-22 C -10,-24 -5,-28 -5,-35 Z" fill="#A3CB58" />
    <text x="0" y="10" font-family="'Rozha One', 'Playfair Display', Georgia, serif" font-weight="900" font-size="76" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">
      Lata
    </text>
  </g>

  <g transform="translate(200, 162)">
    <rect x="-85" y="-18" width="170" height="36" rx="18" fill="url(#goldGradL)" stroke="#FFFFFF" stroke-width="2" />
    <text x="0" y="6" font-family="'Cinzel', 'Playfair Display', serif" font-weight="700" font-size="18" fill="#1E3F20" text-anchor="middle" letter-spacing="3">
      TEAMIX
    </text>
  </g>
</svg>
`)}`;

export const DEFAULT_MEDIA_ITEMS: MediaItem[] = [
  {
    id: 'media_royal_panoramic',
    filename: 'hero_tea_panoramic.png',
    url: ROYAL_PANORAMIC_IMG,
    alt: 'Authentic Indian Royal Tea Leaves, Spices, and Brass Kulhad',
    dimensions: { width: 1920, height: 720 },
    fileSize: '820 KB',
    mediaType: 'image/png',
    uploadedAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'media_royal_bowl',
    filename: 'royal_tea_bowl.jpg',
    url: ROYAL_BOWL_IMG,
    alt: 'Carved Antique Copper Bowl with Premium Ground Lata Tea and Whole Spices',
    dimensions: { width: 1024, height: 1024 },
    fileSize: '540 KB',
    mediaType: 'image/jpeg',
    uploadedAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'media_tea_leaf',
    filename: 'tea_leaf_icon.png',
    url: TEA_LEAF_IMG,
    alt: 'Authentic Fresh Green Tea Leaf',
    dimensions: { width: 512, height: 512 },
    fileSize: '45 KB',
    mediaType: 'image/png',
    uploadedAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'media_logo_primary',
    filename: 'lata-tea-logo-primary.svg',
    url: LOGO_PRIMARY_SVG,
    alt: 'Lata Tea Royal Rajwada Crest Logo',
    dimensions: { width: 400, height: 240 },
    fileSize: '4.2 KB',
    mediaType: 'image/svg+xml',
    uploadedAt: '2026-09-01T00:00:00.000Z'
  },
  {
    id: 'media_logo_light',
    filename: 'lata-tea-logo-light.svg',
    url: LOGO_LIGHT_SVG,
    alt: 'Lata Tea Light Crest Logo',
    dimensions: { width: 400, height: 240 },
    fileSize: '3.8 KB',
    mediaType: 'image/svg+xml',
    uploadedAt: '2026-09-01T00:00:00.000Z'
  }
];
