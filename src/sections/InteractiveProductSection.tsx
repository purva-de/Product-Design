import React from 'react';
import { PRODUCT_CONFIG } from '../config/productConfig';
import type { ProductVariant } from '../config/productConfig';
import { VariantSelector } from '../components/VariantSelector';
import { Rotate3d } from 'lucide-react';

interface InteractiveProductSectionProps {
  activeVariant: ProductVariant;
  onSelectVariant: (variant: ProductVariant) => void;
}

export const InteractiveProductSection: React.FC<InteractiveProductSectionProps> = ({
  activeVariant,
  onSelectVariant,
}) => {
  return (
    <section
      id="studio-360"
      className="relative min-h-screen flex flex-col justify-between px-5 sm:px-12 lg:px-20 py-16 sm:py-24 z-10 pointer-events-none"
      aria-label="NOVA FORM 360 Studio and Material Customization"
    >
      {/* Top Header */}
      <div className="max-w-md w-full pointer-events-auto">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-accent-champagne)] font-bold flex items-center gap-1.5">
          <Rotate3d className="w-3 h-3" />
          04 / 360° Studio
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-[var(--color-text-primary)] mt-2 leading-none">
          See It From <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-accent-silver)] to-[var(--color-accent-champagne)]">
            Every Angle.
          </span>
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-[var(--color-text-secondary)] font-light">
          Drag horizontally to rotate. Select an edition below.
        </p>
      </div>

      {/* Floating Bottom Variant Selector Dock */}
      <div id="variants" className="mt-8 flex items-end justify-between pointer-events-auto">
        <VariantSelector
          variants={PRODUCT_CONFIG.variants}
          activeVariant={activeVariant}
          onSelectVariant={onSelectVariant}
        />
      </div>
    </section>
  );
};
