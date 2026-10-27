import React from 'react';

export const ProductRevealSection: React.FC = () => {
  return (
    <section
      id="reveal"
      className="relative min-h-screen flex flex-col justify-end sm:justify-center px-5 sm:px-12 lg:px-20 py-16 sm:py-24 z-10 pointer-events-none"
      aria-label="NOVA FORM Product Reveal"
    >
      <div className="max-w-md w-full pointer-events-auto pb-4 sm:pb-0">
        <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--color-accent-champagne)] font-bold">
          02 / The Reveal
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase text-[var(--color-text-primary)] mt-2 leading-none">
          Zero <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--color-accent-silver)] to-[var(--color-accent-champagne)]">
            Equilibrium.
          </span>
        </h2>

        <p className="mt-4 text-xs sm:text-sm text-[var(--color-text-secondary)] font-light leading-relaxed">
          Aerodynamic lateral profile tuned to center kinetic mass along the tarsal axis.
        </p>

        {/* Minimal Badges */}
        <div className="mt-6 flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 text-[10px] font-mono text-[var(--color-accent-silver)]">
            Airflow Zoned
          </div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 text-[10px] font-mono text-[var(--color-accent-silver)]">
            Biometric Balance
          </div>
        </div>
      </div>
    </section>
  );
};
