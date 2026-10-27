import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FinaleSectionProps {
  onBuildExperienceClick: () => void;
}

export const FinaleSection: React.FC<FinaleSectionProps> = ({
  onBuildExperienceClick,
}) => {
  return (
    <section
      id="finale"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24 z-10 pointer-events-none"
      aria-label="NOVA FORM Cinematic Finale"
    >
      <div className="max-w-xl pointer-events-auto">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-accent-champagne)] font-bold">
          05 / The Finale
        </span>

        <h2 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-[-0.04em] uppercase text-[var(--color-text-primary)] mt-2 leading-[0.95]">
          Built to be <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-accent-silver)] to-[var(--color-accent-champagne)]">
            Experienced.
          </span>
        </h2>

        <p className="mt-4 text-sm sm:text-base text-[var(--color-text-secondary)] font-light max-w-md">
          Some products deserve more than a photograph.
        </p>

        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={onBuildExperienceClick}
            className="group flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--color-accent-champagne)] hover:bg-[#d6bc96] text-[#08090b] font-bold text-xs uppercase tracking-widest transition-all shadow-xl cursor-pointer"
          >
            <span>Create Your Experience</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
