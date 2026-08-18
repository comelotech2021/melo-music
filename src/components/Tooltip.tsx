import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  subtext?: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  subtext,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'top':
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'bottom':
        return 'bottom-full left-1/2 -translate-x-1/2 border-b-[#1c1c28] border-x-transparent border-t-transparent border-b-4 border-x-4 border-t-0';
      case 'left':
        return 'left-full top-1/2 -translate-y-1/2 border-l-[#1c1c28] border-y-transparent border-r-transparent border-l-4 border-y-4 border-r-0';
      case 'right':
        return 'right-full top-1/2 -translate-y-1/2 border-r-[#1c1c28] border-y-transparent border-l-transparent border-r-4 border-y-4 border-l-0';
      case 'top':
      default:
        return 'top-full left-1/2 -translate-x-1/2 border-t-[#1c1c28] border-x-transparent border-b-transparent border-t-4 border-x-4 border-b-0';
    }
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <div
          role="tooltip"
          className={`absolute z-50 pointer-events-none ${getPositionClasses()} animate-in fade-in zoom-in-95 duration-150`}
        >
          <div className="relative bg-[#14141c] text-white text-xs font-semibold px-3 py-1.5 rounded-xl border border-[#2a2a3e] shadow-[0_8px_20px_rgba(0,0,0,0.8)] backdrop-blur-md max-w-xs whitespace-normal text-center min-w-[140px]">
            <p className="text-white text-[11px] font-bold leading-tight">{content}</p>
            {subtext && (
              <p className="text-[10px] text-zinc-400 font-normal mt-0.5 leading-snug">
                {subtext}
              </p>
            )}
            {/* Triangular arrow */}
            <div className={`absolute w-0 h-0 ${getArrowClasses()}`} />
          </div>
        </div>
      )}
    </div>
  );
};
