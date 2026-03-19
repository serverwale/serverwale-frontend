
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  bg?: 'white' | 'gray' | 'dark' | 'blue';
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id, 
  title, 
  subtitle, 
  centered = false,
  bg = 'white'
}) => {
  const bgStyles = {
    white: 'bg-white',
    gray: 'bg-slate-50',
    dark: 'bg-slate-900 text-white',
    blue: 'bg-[#0055E5] text-white'
  };

  return (
    <section id={id} className={`py-20 md:py-32 ${bgStyles[bg]} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle) && (
          <div className={`mb-16 ${centered ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
            {subtitle && (
              <span className={`text-sm font-bold tracking-widest uppercase mb-4 block ${bg === 'dark' || bg === 'blue' ? 'text-blue-300' : 'text-[#0055E5]'}`}>
                {subtitle}
              </span>
            )}
            {title && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
                {title}
              </h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

