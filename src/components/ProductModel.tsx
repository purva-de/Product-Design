import React, { useMemo, useEffect, useRef } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import type { ProductVariant } from '../config/productConfig';
import { ProceduralSneaker } from './ProceduralSneaker';

interface ProductModelProps {
  variant: ProductVariant;
  useProceduralFallback?: boolean;
  onModelLoaded?: () => void;
}

export const ProductModel: React.FC<ProductModelProps> = ({
  variant,
  useProceduralFallback = false,
  onModelLoaded,
}) => {
  if (useProceduralFallback) {
    return <ProceduralSneaker variant={variant} />;
  }

  return (
    <ActualGLTFModel
      variant={variant}
      onModelLoaded={onModelLoaded}
      fallback={<ProceduralSneaker variant={variant} />}
    />
  );
};

interface ActualGLTFModelProps {
  variant: ProductVariant;
  onModelLoaded?: () => void;
  fallback: React.ReactNode;
}

const MODEL_PATH = '/models/chuck-taylor.glb';

// Preload GLB with MeshoptDecoder
useGLTF.preload(MODEL_PATH, true, true, (loader) => {
  loader.setMeshoptDecoder(MeshoptDecoder);
});

const ActualGLTFModel: React.FC<ActualGLTFModelProps> = ({
  variant,
  onModelLoaded,
  fallback,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const upperMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);

  // Safely attempt useGLTF with MeshoptDecoder
  let gltf: ReturnType<typeof useGLTF> | null = null;
  let loadError = false;

  try {
    gltf = useGLTF(MODEL_PATH, true, true, (loader) => {
      loader.setMeshoptDecoder(MeshoptDecoder);
    });
  } catch (err) {
    console.warn('Failed to load GLTF model, switching to procedural fallback:', err);
    loadError = true;
  }

  // Clone scene and calibrate scale & materials
  const { clonedScene, scaleFactor } = useMemo(() => {
    if (!gltf || !gltf.scene) return { clonedScene: null, scaleFactor: 1 };
    const clone = gltf.scene.clone(true);

    // Compute bounding box
    const bbox = new THREE.Box3().setFromObject(clone);
    const size = new THREE.Vector3();
    bbox.getSize(size);

    // Target length is 2.55 units
    const length = size.x || Math.max(size.x, size.y, size.z) || 1;
    const factor = 2.55 / length;

    // Separate canvas upper materials from vulcanized sole and hardware
    const upperMats: THREE.MeshStandardMaterial[] = [];

    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          const clonedMat = mat.clone();
          mesh.material = clonedMat;

          const matName = (clonedMat.name || '').toUpperCase();
          const meshName = (mesh.name || '').toUpperCase();

          // 1. Canvas Upper (FIRM / Object_8)
          if (matName.includes('FIRM') || meshName.includes('OBJECT_8')) {
            clonedMat.color = new THREE.Color(variant.materials.upperColor);
            clonedMat.roughness = variant.materials.upperRoughness;
            clonedMat.metalness = variant.materials.upperMetalness;
            upperMats.push(clonedMat);
          }
          // 2. Laces (LACE / Object_4)
          else if (matName.includes('LACE') || meshName.includes('OBJECT_4')) {
            clonedMat.color = new THREE.Color('#f0ece1');
            clonedMat.roughness = 0.8;
            clonedMat.metalness = 0.0;
          }
          // 3. Eyelet Rings (RINGS / Object_6)
          else if (matName.includes('RING') || meshName.includes('OBJECT_6')) {
            clonedMat.color = new THREE.Color('#d4d8e2');
            clonedMat.metalness = 0.95;
            clonedMat.roughness = 0.15;
          }
          // 4. Vulcanized Midsole (SOIL / Object_9)
          else if (matName === 'SOIL' || meshName.includes('OBJECT_9')) {
            clonedMat.color = new THREE.Color('#f6f2e9');
            clonedMat.roughness = 0.42;
            clonedMat.metalness = 0.05;
          }
          // 5. Pinstripe (SOIL_BLACK / Object_10)
          else if (matName.includes('BLACK') || meshName.includes('OBJECT_10')) {
            clonedMat.color = new THREE.Color('#101114');
            clonedMat.roughness = 0.3;
          }
          // 6. Rubber Toe Bumper Cap (SOIL_FRONT / Object_11)
          else if (matName.includes('FRONT') || meshName.includes('OBJECT_11')) {
            clonedMat.color = new THREE.Color('#f7f4ec');
            clonedMat.roughness = 0.35;
          }
          // 7. Rubber Outsole (soil_bottom / Object_12)
          else if (matName.includes('BOTTOM') || meshName.includes('OBJECT_12')) {
            clonedMat.color = new THREE.Color('#855c39');
            clonedMat.roughness = 0.85;
          }
          // 8. Ankle Patch (LABLE / Object_14)
          else if (matName.includes('LAB') || meshName.includes('OBJECT_14')) {
            clonedMat.roughness = 0.5;
          }
        }
      }
    });

    upperMaterialsRef.current = upperMats;
    return { clonedScene: clone, scaleFactor: factor };
  }, [gltf, variant.materials]);

  // Update canvas color smoothly when variant changes
  useEffect(() => {
    if (upperMaterialsRef.current.length > 0) {
      upperMaterialsRef.current.forEach((mat) => {
        mat.color.set(variant.materials.upperColor);
        mat.roughness = variant.materials.upperRoughness;
        mat.metalness = variant.materials.upperMetalness;
        mat.needsUpdate = true;
      });
    }
  }, [variant]);

  useEffect(() => {
    if (clonedScene && onModelLoaded) {
      onModelLoaded();
    }
  }, [clonedScene, onModelLoaded]);

  if (loadError || !clonedScene) {
    return <>{fallback}</>;
  }

  return (
    <group ref={groupRef} name="gltf-sneaker-container">
      {/* Center the Chuck Taylor model cleanly with exact ground plane alignment */}
      <Center position={[0, -0.05, 0]}>
        <primitive object={clonedScene} scale={scaleFactor} />
      </Center>
    </group>
  );
};
