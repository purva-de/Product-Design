import React from 'react';
import { ArrowDown, ChevronRight, Sparkles } from 'lucide-react';
import { PRODUCT_CONFIG } from '../config/productConfig';

interface HeroSectionProps {
  onExploreClick: () => void;
  onDetailsClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onDetailsClick,
}) => {
  return (
    <section
      id="overview"
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 lg:px-20 z-10 pointer-events-none"
      aria-label="NOVA FORM Hero Introduction"
    >
      {/* Top Tagline */}
      <div className="flex items-center gap-3 pointer-events-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border border-white/10 bg-white/5 backdrop-blur-md text-[var(--color-accent-champagne)]">
          <Sparkles className="w-3 h-3" />
          <span>Series 01</span>
        </span>
      </div>

      {/* Main Editorial Hero Typography */}
      <div className="max-w-xl my-auto py-12 pointer-events-auto">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-[-0.04em] uppercase text-[var(--color-text-primary)] leading-[0.92]">
          FORM THAT <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-accent-silver)] to-[var(--color-accent-champagne)]">
            MOVES YOU.
          </span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-[var(--color-text-secondary)] font-light tracking-wide max-w-md">
          {PRODUCT_CONFIG.brand.subtagline}
        </p>

        {/* Action CTAs */}
        <div className="mt-7 flex items-center gap-3">
          <button
            type="button"
            onClick={onExploreClick}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-text-primary)] hover:bg-white text-[#08090b] font-bold text-xs uppercase tracking-widest transition-all shadow-xl cursor-pointer"
          >
            <span>Explore</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={onDetailsClick}
            className="px-5 py-3 rounded-full border border-white/15 bg-black/30 hover:bg-white/10 text-xs font-medium uppercase tracking-widest text-[var(--color-text-primary)] backdrop-blur-md transition-all cursor-pointer"
          >
            <span>Details</span>
          </button>
        </div>
      </div>

      {/* Bottom Information Row & Scroll Indicator */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10 pointer-events-auto">
        <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-tertiary)]">
          <div>
            <span className="text-[var(--color-text-secondary)] font-bold">260g</span>
            <span className="ml-1.5 hidden sm:inline">Chassis</span>
          </div>
          <div className="w-px h-4 bg-white/10" />
          <div>
            <span className="text-[var(--color-text-secondary)] font-bold">74%</span>
            <span className="ml-1.5 hidden sm:inline">Rebound</span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex items-center gap-2.5 text-[10px] font-mono uppercase tracking-widest text-[var(--color-text-secondary)]">
          <span>Scroll</span>
          <div className="w-6 h-6 rounded-full border border-white/15 bg-white/5 flex items-center justify-center animate-bounce">
            <ArrowDown className="w-3 h-3 text-[var(--color-accent-champagne)]" />
          </div>
        </div>
      </div>
    </section>
  );
};
