import React from 'react';
import type { ProductVariant } from '../config/productConfig';
import { Check } from 'lucide-react';

interface VariantSelectorProps {
  variants: ProductVariant[];
  activeVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  activeVariant,
  onSelectVariant,
}) => {
  return (
    <div
      className="p-3.5 sm:p-4 rounded-xl border border-[var(--color-border)] bg-[rgba(19,21,25,0.88)] backdrop-blur-xl shadow-2xl max-w-sm w-full mx-auto sm:mx-0"
      role="radiogroup"
      aria-label="Sneaker color and material variants"
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 text-xs font-mono">
        <span className="text-[var(--color-accent-champagne)] font-bold uppercase truncate">
          {activeVariant.name}
        </span>
        <span className="text-[10px] text-[var(--color-text-tertiary)] uppercase truncate">
          {activeVariant.subtitle}
        </span>
      </div>

      {/* Swatch Selector Buttons */}
      <div className="grid grid-cols-2 gap-2.5">
        {variants.map((v) => {
          const isSelected = v.id === activeVariant.id;
          return (
            <button
              key={v.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectVariant(v)}
              className={`flex items-center gap-2 p-2 rounded-lg border transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-accent-champagne)] ${
                isSelected
                  ? 'border-[var(--color-accent-champagne)] bg-white/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              {/* Color Swatch Circle */}
              <div
                className="w-5 h-5 rounded-full border border-white/20 shadow-inner flex items-center justify-center shrink-0"
                style={{ backgroundColor: v.colorSwatch }}
              >
                {isSelected && (
                  <Check
                    className={`w-3 h-3 ${
                      v.id === 'cloud' ? 'text-black' : 'text-white'
                    }`}
                  />
                )}
              </div>

              {/* Name */}
              <span className="text-xs font-medium text-[var(--color-text-primary)] truncate">
                {v.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
