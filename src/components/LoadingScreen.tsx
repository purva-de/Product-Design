import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface LoadingScreenProps {
  isLoading: boolean;
  onLoaded?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  onLoaded,
}) => {
  const [progress, setProgress] = useState(15);
  const [fadedOut, setFadedOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      const timer = setTimeout(() => {
        setFadedOut(true);
        if (onLoaded) onLoaded();
      }, 500);
      return () => clearTimeout(timer);
    }

    // Smooth progressive loading simulation while WebGL assets compile
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) {
          clearInterval(interval);
          return 92;
        }
        return prev + Math.floor(Math.random() * 14 + 6);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [isLoading, onLoaded]);

  if (fadedOut) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#08090B] transition-opacity duration-700 ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Loading 3D Showroom"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="flex flex-col items-center text-center max-w-sm px-6">
        {/* Animated Brand Monogram */}
        <div className="relative w-16 h-16 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[var(--color-accent-champagne)]/30 animate-ping" />
          <div className="w-12 h-12 rounded-full border border-[var(--color-accent-champagne)] flex items-center justify-center bg-black/60 shadow-[0_0_30px_rgba(199,173,134,0.3)]">
            <span className="text-sm font-black tracking-widest text-[var(--color-accent-champagne)]">
              NF
            </span>
          </div>
        </div>

        {/* Wordmark */}
        <h2 className="text-xl font-extrabold tracking-[-0.03em] uppercase text-white mb-2">
          NOVA <span className="font-light text-[var(--color-accent-champagne)]">FORM</span>
        </h2>

        <p className="text-xs font-mono tracking-widest uppercase text-[var(--color-text-secondary)] mb-6">
          Initializing 3D Digital Showroom
        </p>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-[var(--color-accent-champagne)] transition-all duration-300 ease-out shadow-[0_0_10px_var(--color-accent-champagne)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-64 text-[10px] font-mono text-[var(--color-text-tertiary)]">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[var(--color-accent-champagne)]" />
            <span>WebGL Shaders</span>
          </span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
};
