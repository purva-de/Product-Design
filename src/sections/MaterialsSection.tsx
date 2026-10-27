import React from 'react';
import { PRODUCT_CONFIG } from '../config/productConfig';

interface MaterialsSectionProps {
  activeFeatureIndex?: number;
  onSelectFeature?: (index: number) => void;
  onFocusFeature?: (index: number) => void;
}

export const MaterialsSection: React.FC<MaterialsSectionProps> = ({
  activeFeatureIndex = 0,
  onSelectFeature,
  onFocusFeature,
}) => {
  const features = PRODUCT_CONFIG.features;
  const current = features[activeFeatureIndex] || features[0];

  return (
    <section
      id="craftsmanship"
      className="relative min-h-screen flex flex-col justify-end sm:justify-center px-5 sm:px-12 lg:px-20 py-16 sm:py-24 z-10 pointer-events-none"
      aria-label="NOVA FORM Materials and Craftsmanship"
    >
      <div className="max-w-md w-full pointer-events-auto pb-4 sm:pb-0">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-accent-champagne)] font-bold">
          03 / Craftsmanship
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-[var(--color-text-primary)] mt-2 leading-none">
          Every Detail <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-accent-silver)] to-[var(--color-accent-champagne)]">
            Has Purpose.
          </span>
        </h2>

        {/* Feature Tabs */}
        <div className="mt-6 flex items-center gap-1.5 border-b border-white/10 pb-3">
          {features.map((feat, idx) => (
            <button
              key={feat.id}
              type="button"
              onClick={() => {
                if (onSelectFeature) onSelectFeature(idx);
                if (onFocusFeature) onFocusFeature(idx);
              }}
              className={`px-3 py-1.5 rounded-md text-[11px] font-mono uppercase tracking-wider transition-all cursor-pointer ${
                activeFeatureIndex === idx
                  ? 'bg-[var(--color-accent-champagne)] text-black font-bold'
                  : 'bg-white/5 text-[var(--color-text-secondary)] hover:text-white'
              }`}
            >
              {feat.number} {feat.title.split(' ')[1] || feat.title}
            </button>
          ))}
        </div>

        {/* Active Feature Detail Card */}
        <div className="mt-4 p-5 rounded-xl border border-[var(--color-border)] bg-[rgba(19,21,25,0.85)] backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
            <span className="text-[10px] font-mono text-[var(--color-accent-champagne)] font-semibold uppercase">
              {current.tagline}
            </span>
            <span className="text-[9px] font-mono text-[var(--color-text-tertiary)] uppercase">
              3D Tracked
            </span>
          </div>

          <h3 className="text-base font-bold text-white tracking-tight truncate">
            {current.title}
          </h3>

          <p className="mt-1 text-xs text-[var(--color-text-secondary)] font-light truncate">
            {current.description}
          </p>

          <div className="mt-3 flex gap-2">
            {current.specs.map((spec, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded text-[9px] font-mono border border-white/10 bg-black/30 text-[var(--color-accent-silver)]"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
