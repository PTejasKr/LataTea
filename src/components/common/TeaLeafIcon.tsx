import React from 'react';

interface TeaLeafIconProps {
  className?: string;
  size?: number | string;
}

export const TeaLeafIcon: React.FC<TeaLeafIconProps> = ({ 
  className = 'w-4 h-4 inline-block', 
  size 
}) => {
  return (
    <img
      src="/assets/images/tea_leaf_icon.png"
      alt="Lata Tea Leaf"
      style={size ? { width: size, height: size } : undefined}
      className={`object-contain shrink-0 ${className}`}
    />
  );
};
