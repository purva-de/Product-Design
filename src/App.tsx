import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PRODUCT_CONFIG } from './config/productConfig';
import type { ProductVariant } from './config/productConfig';
import { useReducedMotion } from './hooks/useReducedMotion';
import { useWebGLSupport } from './hooks/useWebGLSupport';
import { Navigation } from './components/Navigation';
import { LoadingScreen } from './components/LoadingScreen';
import { ProductCanvas } from './components/ProductCanvas';
import { HeroSection } from './sections/HeroSection';
import { ProductRevealSection } from './sections/ProductRevealSection';
import { MaterialsSection } from './sections/MaterialsSection';
import { InteractiveProductSection } from './sections/InteractiveProductSection';
import { FinaleSection } from './sections/FinaleSection';
import { ContactSection } from './sections/ContactSection';
import { AlertTriangle, RefreshCw } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion preference and WebGL capabilities
  const systemReducedMotion = useReducedMotion();
  const [manualReducedMotion, setManualReducedMotion] = useState<boolean | null>(null);
  const prefersReducedMotion = manualReducedMotion !== null ? manualReducedMotion : systemReducedMotion;
  const webglSupport = useWebGLSupport();

  // App state
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(1);
  const [activeVariant, setActiveVariant] = useState<ProductVariant>(PRODUCT_CONFIG.variants[0]);
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  // Setup GSAP ScrollTrigger timeline
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Primary scroll listener binding 0.0 to 1.0 progress
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        fastScrollEnd: true,
        preventOverlaps: true,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Calculate active section from progress thresholds
          if (progress < 0.16) {
            setActiveSection(1);
          } else if (progress < 0.36) {
            setActiveSection(2);
          } else if (progress < 0.60) {
            setActiveSection(3);
          } else if (progress < 0.78) {
            setActiveSection(4);
          } else if (progress < 0.88) {
            setActiveSection(5);
          } else if (progress < 0.95) {
            setActiveSection(6);
          } else {
            setActiveSection(7);
          }
        },
      });

      // Refresh ScrollTrigger once fonts/layout settle
      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Smooth navigation handler to scroll directly to target section
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  // Jump camera focus during materials section
  const handleFocusFeature = (index: number) => {
    // Scrolls to the exact fraction of the materials section
    const targetScroll = 0.38 + (index / 3) * 0.22;
    if (typeof window !== 'undefined') {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({
        top: maxScroll * targetScroll,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]"
    >
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />

      {/* Global Semantic Navigation */}
      <Navigation
        activeSection={activeSection}
        prefersReducedMotion={prefersReducedMotion}
        onToggleReducedMotion={() => setManualReducedMotion(!prefersReducedMotion)}
        onNavigate={handleNavigate}
      />

      {/* 3D WebGL Product Canvas (Fixed in background across all scroll sections) */}
      {webglSupport.supported ? (
        <ProductCanvas
          scrollProgress={scrollProgress}
          activeSection={activeSection}
          activeFeatureIndex={activeFeatureIndex}
          onSelectFeature={setActiveFeatureIndex}
          variant={activeVariant}
          prefersReducedMotion={prefersReducedMotion}
          onModelLoaded={() => setIsLoading(false)}
        />
      ) : (
        /* WebGL Fallback if device disables WebGL */
        <div className="fixed inset-0 z-0 flex items-center justify-center p-6 bg-[#08090b]">
          <div className="p-8 rounded-2xl border border-[var(--color-border)] bg-[rgba(19,21,25,0.9)] max-w-md text-center">
            <AlertTriangle className="w-10 h-10 text-[var(--color-accent-champagne)] mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">WebGL Hardware Notice</h3>
            <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-6">
              Hardware WebGL acceleration is currently inactive in your environment. You can still experience all design specifications, editorial content, and enquiry submissions below.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--color-accent-champagne)] text-black text-xs font-bold uppercase tracking-wider"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry WebGL Initialization</span>
            </button>
          </div>
        </div>
      )}

      {/* Semantic Main Content Sections (Scrollable content flow) */}
      <main className="relative z-10">
        {/* Section 01: Hero */}
        <HeroSection
          onExploreClick={() => handleNavigate('reveal')}
          onDetailsClick={() => handleNavigate('craftsmanship')}
        />

        {/* Section 02: Reveal */}
        <ProductRevealSection />

        {/* Section 03: Materials & Craftsmanship */}
        <MaterialsSection
          activeFeatureIndex={activeFeatureIndex}
          onSelectFeature={setActiveFeatureIndex}
          onFocusFeature={handleFocusFeature}
        />

        {/* Section 04 & 05: 360 Studio & Color Variants */}
        <InteractiveProductSection
          activeVariant={activeVariant}
          onSelectVariant={setActiveVariant}
        />

        {/* Section 06: Finale */}
        <FinaleSection
          onBuildExperienceClick={() => handleNavigate('contact')}
        />

        {/* Section 07: Lead Flow Tech Conversion & Inquiries */}
        <ContactSection />
      </main>
    </div>
  );
};

export default App;
