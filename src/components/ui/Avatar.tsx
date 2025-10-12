import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  initials,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6 text-xs',
    md: 'w-8 h-8 text-sm',
    lg: 'w-12 h-12 text-base',
  };
  
  const baseClasses = `inline-flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium ${sizeClasses[size]} ${className}`;
  
  if (src) {
    return (
      <img
        src={src}
        alt={alt || initials}
        className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
      />
    );
  }
  
  return (
    <div className={baseClasses}>
      {initials}
    </div>
  );
};
