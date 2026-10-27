import React from 'react';
import { ContactShadows, Environment } from '@react-three/drei';
import type { ProductVariant } from '../config/productConfig';

interface ProductLightingProps {
  variant: ProductVariant;
}

export const ProductLighting: React.FC<ProductLightingProps> = ({ variant }) => {
  return (
    <>
      {/* Studio Reflection Environment */}
      <Environment preset="studio" environmentIntensity={0.85} />

      {/* Gentle base ambient light */}
      <ambientLight intensity={0.45} color="#dbe0ea" />

      {/* Primary Key Light — large soft directional with subtle warm cast */}
      <directionalLight
        position={[4, 5, 4]}
        intensity={1.8}
        color="#fffbf5"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />

      {/* Secondary Fill Light — cool tone for dark luxury shadows */}
      <directionalLight
        position={[-4, 2, -2]}
        intensity={0.65}
        color="#b0b8c8"
      />

      {/* Rim / Silhouette Light — creates sharp edge separation against dark backdrop */}
      <spotLight
        position={[0, 6, -5]}
        intensity={2.2}
        angle={0.6}
        penumbra={0.8}
        color={variant.accentColor || '#c7ad86'}
      />

      {/* Under-glow / Floor Bounce light */}
      <pointLight
        position={[0, -1.5, 0]}
        intensity={0.3}
        color="#626a7a"
        distance={6}
      />

      {/* Contact Shadow — soft, grounded studio contact shadow */}
      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.75}
        scale={6.5}
        blur={2.4}
        far={2.5}
        resolution={512}
        color="#040507"
      />
    </>
  );
};
