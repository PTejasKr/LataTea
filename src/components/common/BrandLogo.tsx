import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'icon'; // Future-proofing if they ever want just the icon
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = 'h-10 w-auto', variant = 'full' }) => {
  return (
    <img 
      src="/assets/images/logo-teamix.png" 
      alt="Lata Teamix Logo" 
      className={`object-contain ${className}`}
      loading="eager"
    />
  );
};
