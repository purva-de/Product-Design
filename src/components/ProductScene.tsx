import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PRODUCT_CONFIG } from '../config/productConfig';
import type { ProductVariant } from '../config/productConfig';
import { ProductModel } from './ProductModel';
import { ProductLighting } from './ProductLighting';
import { DetailCallout } from './DetailCallout';

interface ProductSceneProps {
  scrollProgress: number; // 0.0 to 1.0
  activeSection: number;  // 1 to 7
  activeFeatureIndex?: number;
  onSelectFeature?: (index: number) => void;
  variant: ProductVariant;
  useProceduralFallback?: boolean;
  prefersReducedMotion: boolean;
  isInteractiveMode: boolean;
  onModelLoaded?: () => void;
  onUserInteracted?: () => void;
}

export const ProductScene: React.FC<ProductSceneProps> = ({
  scrollProgress,
  activeSection,
  activeFeatureIndex = 0,
  onSelectFeature,
  variant,
  useProceduralFallback = false,
  prefersReducedMotion,
  isInteractiveMode: _isInteractiveMode,
  onModelLoaded,
  onUserInteracted,
}) => {
  const { camera, size, viewport } = useThree();

  // Responsive device classification & distance scaling
  const isMobile = size.width < 768 || viewport.aspect < 0.95;
  const isTablet = (size.width >= 768 && size.width < 1024) || (viewport.aspect >= 0.95 && viewport.aspect < 1.35);

  // Dynamic distance multiplier so the 2.55-unit sneaker fits horizontally on mobile vertical screens
  const distanceMultiplier = isMobile
    ? Math.min(Math.max(1.35 / Math.max(viewport.aspect, 0.42), 1.45), 2.1)
    : isTablet
    ? THREE.MathUtils.lerp(1.3, 1.05, Math.min(Math.max((viewport.aspect - 0.75) / 0.55, 0), 1))
    : 1.0;

  // Root transform references
  const rootGroupRef = useRef<THREE.Group>(null);
  const scrollGroupRef = useRef<THREE.Group>(null);
  const dragGroupRef = useRef<THREE.Group>(null);

  // Manual interactive drag state
  const isDraggingRef = useRef(false);
  const previousPointerXRef = useRef(0);
  const manualRotationYRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastInteractionTimeRef = useRef(Date.now());

  // Camera targets for smooth frame-rate independent interpolation
  const targetCameraPos = useRef(new THREE.Vector3(0.8, 0.4, 3.8 * distanceMultiplier));
  const targetLookAt = useRef(new THREE.Vector3(0.35, 0.0, 0));

  // Current smoothed vectors (both position and lookAt are lerped to eliminate rotational snapping)
  const currentCameraPos = useRef(new THREE.Vector3(0.8, 0.4, 3.8 * distanceMultiplier));
  const currentLookAt = useRef(new THREE.Vector3(0.35, 0.0, 0));

  // Product target transforms driven by scroll progress
  const targetProductRot = useRef(new THREE.Euler(-0.15, 0.45, 0.08));
  const targetProductPos = useRef(new THREE.Vector3(0.6, 0.1, 0));
  const currentProductPos = useRef(new THREE.Vector3(0.6, 0.1, 0));
  const currentProductRot = useRef(new THREE.Euler(-0.15, 0.45, 0.08));

  // Compute camera and product waypoints from scroll progress & responsive layout
  useEffect(() => {
    // If reduced motion is requested, keep camera centered and stable
    if (prefersReducedMotion) {
      targetCameraPos.current.set(
        isMobile ? 0.0 : 1.2,
        isMobile ? 0.2 : 0.6,
        3.4 * distanceMultiplier
      );
      targetLookAt.current.set(isMobile ? 0.0 : 0.2, isMobile ? 0.15 : 0.05, 0);
      targetProductRot.current.set(0, 0.15, 0);
      targetProductPos.current.set(isMobile ? 0.0 : 0.2, isMobile ? 0.15 : 0, 0);
      return;
    }

    // SECTION 01 — CINEMATIC OPENING (0.0 to 0.18)
    if (scrollProgress <= 0.18) {
      const t = scrollProgress / 0.18;
      const camX = isMobile ? 0.0 : isTablet ? 0.35 : THREE.MathUtils.lerp(0.8, 0.6, t);
      const camY = isMobile ? 0.32 : THREE.MathUtils.lerp(0.5, 0.35, t);
      const camZ = THREE.MathUtils.lerp(4.0, 3.6, t) * distanceMultiplier;
      targetCameraPos.current.set(camX, camY, camZ);

      const lookX = isMobile ? 0.0 : isTablet ? 0.2 : 0.35;
      const lookY = isMobile ? 0.15 : 0.0;
      targetLookAt.current.set(lookX, lookY, 0);

      const prodX = isMobile ? 0.0 : isTablet ? 0.25 : 0.45;
      const prodY = isMobile ? 0.18 : 0.0;
      targetProductPos.current.set(prodX, prodY, 0);
      targetProductRot.current.set(-0.10, 0.35 + t * 0.1, 0.04);
    }
    // SECTION 02 — THE PRODUCT REVEAL (0.18 to 0.38) -> PURE SIDE PROFILE
    else if (scrollProgress <= 0.38) {
      const t = (scrollProgress - 0.18) / 0.20;
      const camX = isMobile ? 0.0 : isTablet ? THREE.MathUtils.lerp(0.35, 0.0, t) : THREE.MathUtils.lerp(0.6, 0.0, t);
      const camY = isMobile ? 0.22 : THREE.MathUtils.lerp(0.35, 0.1, t);
      const camZ = THREE.MathUtils.lerp(3.6, 3.4, t) * distanceMultiplier;
      targetCameraPos.current.set(camX, camY, camZ);

      const lookX = isMobile ? 0.0 : THREE.MathUtils.lerp(0.35, 0.0, t);
      const lookY = isMobile ? 0.18 : 0.0;
      targetLookAt.current.set(lookX, lookY, 0);

      const prodX = isMobile ? 0.0 : THREE.MathUtils.lerp(0.45, 0.0, t);
      const prodY = isMobile ? 0.18 : 0.0;
      targetProductPos.current.set(prodX, prodY, 0);

      // Rotate smoothly into pure lateral profile (rotation Y = 0)
      targetProductRot.current.set(
        THREE.MathUtils.lerp(-0.10, 0.0, t),
        THREE.MathUtils.lerp(0.45, 0.0, t),
        THREE.MathUtils.lerp(0.04, 0.0, t)
      );
    }
    // SECTION 03 — MATERIALS & CRAFTSMANSHIP (0.38 to 0.62)
    else if (scrollProgress <= 0.62) {
      const t = (scrollProgress - 0.38) / 0.24;

      // Position sneaker cleanly (centered & raised on mobile, right-shifted on desktop)
      const prodX = isMobile ? 0.0 : isTablet ? 0.22 : 0.35;
      const prodY = isMobile ? 0.22 : -0.05;
      targetProductPos.current.set(prodX, prodY, 0.0);

      const lookX = isMobile ? 0.0 : isTablet ? 0.20 : 0.30;
      const lookY = isMobile ? 0.20 : 0.0;
      targetLookAt.current.set(lookX, lookY, 0.0);

      // Keep comfortable viewing distance so the full sneaker silhouette is clear
      const camZ = THREE.MathUtils.lerp(3.7, 3.65, Math.sin(t * Math.PI)) * distanceMultiplier;
      const camY = isMobile ? 0.25 : THREE.MathUtils.lerp(0.18, 0.12, t);
      const camX = isMobile ? 0.0 : THREE.MathUtils.lerp(0.08, 0.18, t);
      targetCameraPos.current.set(camX, camY, camZ);

      // Subtle, elegant rotation revealing depth while keeping medial star patch, canvas, and foxing in view
      targetProductRot.current.set(
        THREE.MathUtils.lerp(-0.04, 0.02, t),
        THREE.MathUtils.lerp(0.15, -0.08, t),
        THREE.MathUtils.lerp(0.02, -0.02, t)
      );
    }
    // SECTION 04 & 05 — INTERACTIVE ROTATION & VARIANTS (0.62 to 0.85)
    else if (scrollProgress <= 0.85) {
      const camY = isMobile ? 0.30 : 0.25;
      targetCameraPos.current.set(0.0, camY, 3.5 * distanceMultiplier);

      const lookY = isMobile ? 0.15 : 0.0;
      targetLookAt.current.set(0.0, lookY, 0.0);

      const prodY = isMobile ? 0.15 : 0.0;
      targetProductPos.current.set(0.0, prodY, 0.0);
      targetProductRot.current.set(0.0, 0.0, 0.0);
    }
    // SECTION 06 & 07 — CINEMATIC FINALE & LEAD FLOW TECH (0.85 to 1.0)
    else {
      const t = (scrollProgress - 0.85) / 0.15;
      const camX = isMobile ? 0.0 : THREE.MathUtils.lerp(0.0, 0.8, t);
      const camY = isMobile ? 0.35 : THREE.MathUtils.lerp(0.25, 0.5, t);
      const camZ = THREE.MathUtils.lerp(3.5, 4.2, t) * distanceMultiplier;
      targetCameraPos.current.set(camX, camY, camZ);

      const lookX = isMobile ? 0.0 : 0.1;
      const lookY = isMobile ? 0.2 : 0.1;
      targetLookAt.current.set(lookX, lookY, 0.0);

      const prodX = isMobile ? 0.0 : isTablet ? 0.2 : THREE.MathUtils.lerp(0.0, 0.4, t);
      const prodY = isMobile ? 0.2 : 0.05;
      targetProductPos.current.set(prodX, prodY, 0.0);
      targetProductRot.current.set(-0.10, 0.35 + t * 0.15, 0.04);
    }
  }, [scrollProgress, prefersReducedMotion, distanceMultiplier, isMobile, isTablet]);

  // Pointer / Touch 360-degree rotation listeners on window during active drag
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const deltaX = e.clientX - previousPointerXRef.current;
      previousPointerXRef.current = e.clientX;

      // Sensitivity factor tuned for both mouse and high-DPI touchscreens
      const sensitivity = isMobile ? 0.008 : 0.006;
      manualRotationYRef.current += deltaX * sensitivity;
      dragVelocityRef.current = deltaX * sensitivity;
      lastInteractionTimeRef.current = Date.now();

      if (onUserInteracted) onUserInteracted();
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerup', handlePointerUp);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [onUserInteracted, isMobile]);

  // Three.js Render Loop with Frame-Rate Independent Exponential Smoothing
  useFrame((state, delta) => {
    // Clamp delta to prevent erratic jumps on background tab resume
    const safeDelta = Math.min(delta, 0.1);

    // Frame-rate independent exponential damping factors
    const cameraDamping = 1 - Math.exp(-4.8 * safeDelta);
    const lookAtDamping = 1 - Math.exp(-5.5 * safeDelta);
    const productDamping = 1 - Math.exp(-5.2 * safeDelta);

    // 1. Smoothly interpolate camera position
    currentCameraPos.current.lerp(targetCameraPos.current, cameraDamping);
    camera.position.copy(currentCameraPos.current);

    // 2. Smoothly interpolate camera lookAt target to eliminate rotational snapping
    currentLookAt.current.lerp(targetLookAt.current, lookAtDamping);
    camera.lookAt(currentLookAt.current);

    // 3. Damping physics for manual drag rotation
    if (!isDraggingRef.current) {
      manualRotationYRef.current += dragVelocityRef.current;
      dragVelocityRef.current *= Math.exp(-4.2 * safeDelta); // Exponential friction
    }

    // 4. Gentle automatic idle rotation when idle for > 2.5s (unless reduced motion)
    const timeSinceInteraction = Date.now() - lastInteractionTimeRef.current;
    if (
      !isDraggingRef.current &&
      timeSinceInteraction > 2500 &&
      !prefersReducedMotion &&
      (activeSection === 1 || activeSection === 4 || activeSection === 6)
    ) {
      manualRotationYRef.current += safeDelta * 0.18;
    }

    // Apply manual rotation to dragGroup
    if (dragGroupRef.current) {
      dragGroupRef.current.rotation.y = manualRotationYRef.current;
    }

    // 5. Subtle atmospheric floating levitation (hover breathing effect)
    if (scrollGroupRef.current) {
      const levitation = prefersReducedMotion ? 0 : Math.sin(state.clock.elapsedTime * 1.5) * 0.035;

      const targetWithLevitation = new THREE.Vector3(
        targetProductPos.current.x,
        targetProductPos.current.y + levitation,
        targetProductPos.current.z
      );

      currentProductPos.current.lerp(targetWithLevitation, productDamping);
      scrollGroupRef.current.position.copy(currentProductPos.current);

      // Smoothly interpolate scroll-driven orientation
      currentProductRot.current.x = THREE.MathUtils.lerp(
        currentProductRot.current.x,
        targetProductRot.current.x,
        productDamping
      );
      currentProductRot.current.y = THREE.MathUtils.lerp(
        currentProductRot.current.y,
        targetProductRot.current.y,
        productDamping
      );
      currentProductRot.current.z = THREE.MathUtils.lerp(
        currentProductRot.current.z,
        targetProductRot.current.z,
        productDamping
      );

      scrollGroupRef.current.rotation.copy(currentProductRot.current);
    }
  });

  // Callouts are visible during Section 3 (Materials & Craftsmanship)
  const showCallouts = activeSection === 3 && scrollProgress > 0.36 && scrollProgress < 0.64;

  return (
    <group ref={rootGroupRef}>
      {/* Dynamic Lighting Setup */}
      <ProductLighting variant={variant} />

      {/* Scroll-Progress driven transform container */}
      <group ref={scrollGroupRef}>
        {/* Interactive user rotation transform container */}
        <group
          ref={dragGroupRef}
          onPointerDown={(e) => {
            // Initiate drag
            e.stopPropagation();
            isDraggingRef.current = true;
            previousPointerXRef.current = e.clientX;
            dragVelocityRef.current = 0;
            lastInteractionTimeRef.current = Date.now();
            if (onUserInteracted) onUserInteracted();
          }}
        >
          {/* Real 3D Model with Procedural Fallback */}
          <ProductModel
            variant={variant}
            useProceduralFallback={useProceduralFallback}
            onModelLoaded={onModelLoaded}
          />

          {/* 3D Feature Callouts tracked to sneaker geometry */}
          {PRODUCT_CONFIG.features.map((feature, idx) => (
            <DetailCallout
              key={feature.id}
              callout={feature}
              index={idx}
              isActive={activeFeatureIndex === idx}
              visible={showCallouts}
              accentColor={variant.accentColor}
              prefersReducedMotion={prefersReducedMotion}
              onSelect={(index) => {
                if (onSelectFeature) onSelectFeature(index);
              }}
            />
          ))}
        </group>
      </group>
    </group>
  );
};
