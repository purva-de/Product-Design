import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import type { ProductVariant } from '../config/productConfig';
import { ProductScene } from './ProductScene';
import { Rotate3d } from 'lucide-react';

interface ProductCanvasProps {
  scrollProgress: number;
  activeSection: number;
  activeFeatureIndex?: number;
  onSelectFeature?: (index: number) => void;
  variant: ProductVariant;
  prefersReducedMotion: boolean;
  onModelLoaded?: () => void;
}

export const ProductCanvas: React.FC<ProductCanvasProps> = ({
  scrollProgress,
  activeSection,
  activeFeatureIndex = 0,
  onSelectFeature,
  variant,
  prefersReducedMotion,
  onModelLoaded,
}) => {
  const [hasInteracted, setHasInteracted] = useState(false);

  // Show "Drag to Explore" hint during section 4 or when hovering 3D canvas
  const isInteractiveSection = activeSection === 4;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Real-time WebGL Canvas */}
      <Canvas
        shadows
        dpr={[1, Math.min(window.devicePixelRatio || 1, 2)]}
        camera={{ position: [0.8, 0.4, 3.8], fov: 30, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
        }}
        className="w-full h-full"
        style={{ pointerEvents: isInteractiveSection ? 'auto' : 'auto' }}
        aria-hidden="true"
      >
        <Suspense fallback={null}>
          <ProductScene
            scrollProgress={scrollProgress}
            activeSection={activeSection}
            activeFeatureIndex={activeFeatureIndex}
            onSelectFeature={onSelectFeature}
            variant={variant}
            useProceduralFallback={false}
            prefersReducedMotion={prefersReducedMotion}
            isInteractiveMode={isInteractiveSection}
            onModelLoaded={onModelLoaded}
            onUserInteracted={() => setHasInteracted(true)}
          />
        </Suspense>
      </Canvas>

      {/* Floating Interactive 360 Drag Guide (Visible in Section 4, positioned above bottom dock) */}
      <div
        className={`absolute bottom-28 sm:bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-auto transition-all duration-500 whitespace-nowrap ${
          isInteractiveSection
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-white/15 bg-[rgba(19,21,25,0.85)] backdrop-blur-xl shadow-2xl">
          <Rotate3d className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[var(--color-accent-champagne)] animate-spin" style={{ animationDuration: '6s' }} />
          <span className="text-[10px] sm:text-xs uppercase tracking-widest font-mono text-[var(--color-text-primary)]">
            {hasInteracted ? 'Active 360° View — Drag Anywhere' : 'Drag or Swipe to Explore 360°'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-champagne)]" />
        </div>
      </div>

      {/* Cinematic Vignette Overlay */}
      <div className="cinematic-vignette absolute inset-0 pointer-events-none" />
      {/* Subtle Film Grain for high-end cinematic editorial polish */}
      <div className="cinematic-film-grain absolute inset-0 pointer-events-none" />
    </div>
  );
};
