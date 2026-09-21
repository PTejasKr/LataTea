import React from 'react';
import { useCMS } from '../../context/CMSContext';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'light';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'h-10 w-auto', variant = 'full' }) => {
  const { publishedState, resolveSlotImage } = useCMS();
  const slotKey = variant === 'light' 
    ? (publishedState?.brand?.lightLogoSlotId || 'BRAND_LOGO_LIGHT') 
    : (publishedState?.brand?.logoSlotId || 'BRAND_LOGO_PRIMARY');
  
  const resolved = resolveSlotImage(slotKey, false, false);
  const logoSrc = resolved?.url || '/assets/images/logo-teamix.png';
  const logoAlt = resolved?.alt || 'Lata Teamix Logo';

  return (
    <img 
      src={logoSrc} 
      alt={logoAlt} 
      className={`object-contain ${className}`}
      loading="eager"
    />
  );
};
