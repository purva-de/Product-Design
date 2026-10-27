import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import type { FeatureCallout } from '../config/productConfig';

interface DetailCalloutProps {
  callout: FeatureCallout;
  index: number;
  isActive: boolean;
  visible: boolean;
  accentColor: string;
  prefersReducedMotion?: boolean;
  onSelect: (index: number) => void;
}

export const DetailCallout: React.FC<DetailCalloutProps> = ({
  callout,
  index,
  isActive,
  visible,
  accentColor,
  prefersReducedMotion = false,
  onSelect,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!visible) return null;

  return (
    <Html
      position={callout.worldPosition}
      center
      distanceFactor={5.5}
      zIndexRange={[100, 0]}
      style={{
        transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease, transform 0.3s ease',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Sleek Minimalist Luxury Hotspot Pin */}
        <button
          type="button"
          onClick={() => onSelect(index)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          className={`relative flex items-center justify-center w-7 h-7 rounded-full cursor-pointer transition-all duration-300 focus-visible:outline-none ${
            isActive ? 'scale-110 shadow-lg' : 'hover:scale-105'
          }`}
          aria-label={`${callout.number}: ${callout.title}`}
        >
          {/* Subtle soft radar ripple ring */}
          {!prefersReducedMotion && (
            <span
              className={`absolute inset-0 rounded-full transition-opacity duration-300 ${
                isActive ? 'opacity-60 animate-ping' : 'opacity-20 hover:opacity-40'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--color-accent-champagne)' : accentColor,
                animationDuration: '2.5s',
              }}
            />
          )}

          {/* Core Circular Glass Pin */}
          <span
            className={`relative flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-mono font-bold tracking-tight transition-all duration-300 backdrop-blur-md shadow-md ${
              isActive
                ? 'bg-[var(--color-accent-champagne)] text-black border border-white/60 shadow-[0_0_12px_rgba(230,195,142,0.4)]'
                : 'bg-[rgba(15,17,21,0.85)] text-white border border-white/30 hover:border-white/60 hover:text-[var(--color-accent-champagne)]'
            }`}
          >
            {callout.number}
          </span>
        </button>

        {/* Minimalist Floating Single-Line Tooltip (Strictly hidden when not hovered) */}
        <div
          className={`absolute left-9 top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none transition-all duration-200 z-50 ${
            isHovered
              ? 'opacity-100 translate-x-0 scale-100'
              : 'opacity-0 -translate-x-2 scale-95 pointer-events-none'
          }`}
        >
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/15 bg-[rgba(12,14,18,0.94)] backdrop-blur-xl shadow-2xl">
            <span
              className="text-[9px] font-mono font-bold uppercase tracking-wider text-[var(--color-accent-champagne)]"
            >
              {callout.number}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="text-xs font-medium text-white tracking-tight">
              {callout.title}
            </span>
          </div>
        </div>
      </div>
    </Html>
  );
};

