import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  activeSection?: number;
  prefersReducedMotion?: boolean;
  onToggleReducedMotion?: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Track window scroll for glassmorphism header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(8,9,11,0.85)] backdrop-blur-xl border-b border-[var(--color-border)] py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Wordmark & Agency Credit */}
        <div className="flex items-center gap-4">
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('overview');
            }}
            className="group flex flex-col focus-visible:outline-none"
            aria-label="NOVA FORM Home"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-[-0.04em] text-[var(--color-text-primary)] uppercase flex items-center gap-2">
              <span>NOVA</span>
              <span className="font-light text-[var(--color-accent-champagne)]">FORM</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[var(--color-text-tertiary)] uppercase flex items-center gap-1">
              <span>PORTFOLIO BY</span>
              <span className="text-[var(--color-text-secondary)] font-medium">LEAD FLOW TECH</span>
            </span>
          </a>
        </div>

        {/* Agency Direct Inquiry CTA — Strictly "Let's Build" */}
        <div>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="group flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[var(--color-accent-champagne)] hover:bg-[#d6bc96] text-[#08090b] text-xs font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-[0_0_20px_rgba(199,173,134,0.35)] cursor-pointer"
          >
            <span>Let's Build</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </header>
  );
};
