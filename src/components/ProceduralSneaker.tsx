import React, { useMemo } from 'react';
import * as THREE from 'three';
import type { ProductVariant } from '../config/productConfig';

interface ProceduralSneakerProps {
  variant: ProductVariant;
}

export const ProceduralSneaker: React.FC<ProceduralSneakerProps> = ({ variant }) => {
  // High-top canvas silhouette matching the classic Chuck Taylor
  const {
    soleGeometry,
    upperGeometry,
    toeCapGeometry,
    pinstripeGeometry,
    patchGeometry,
    laceGeometry,
    eyeletGeometries,
  } = useMemo(() => {
    // 1. Vulcanized Sole
    const soleShape = new THREE.Shape();
    soleShape.moveTo(-1.25, -0.25);
    soleShape.lineTo(1.35, -0.25);
    soleShape.bezierCurveTo(1.45, -0.22, 1.45, 0.0, 1.35, 0.05);
    soleShape.lineTo(-1.25, 0.05);
    soleShape.bezierCurveTo(-1.32, 0.0, -1.32, -0.22, -1.25, -0.25);

    const soleExtrude = new THREE.ExtrudeGeometry(soleShape, {
      depth: 0.58,
      bevelEnabled: true,
      bevelThickness: 0.04,
      bevelSize: 0.03,
      bevelSegments: 3,
    });
    soleExtrude.center();

    // 2. High-top Canvas Upper
    const upperShape = new THREE.Shape();
    upperShape.moveTo(-1.2, 0.04);
    upperShape.lineTo(-1.22, 1.15); // High-top heel collar
    upperShape.bezierCurveTo(-1.1, 1.25, -0.5, 1.25, -0.4, 1.15); // Ankle opening
    upperShape.lineTo(0.1, 0.65); // Eyestay slope
    upperShape.lineTo(0.9, 0.35); // Forefoot slope
    upperShape.lineTo(1.25, 0.12); // Above toe cap
    upperShape.lineTo(1.25, 0.04);
    upperShape.lineTo(-1.2, 0.04);

    const upperExtrude = new THREE.ExtrudeGeometry(upperShape, {
      depth: 0.50,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 3,
    });
    upperExtrude.center();
    upperExtrude.translate(-0.05, 0.40, 0);

    // 3. Rubber Toe Cap
    const toeCapGeo = new THREE.SphereGeometry(0.32, 24, 16, 0, Math.PI, 0, Math.PI * 0.5);
    toeCapGeo.rotateZ(-Math.PI * 0.5);
    toeCapGeo.scale(1.1, 0.85, 0.85);
    toeCapGeo.translate(1.05, 0.05, 0);

    // 4. Black Midsole Pinstripe
    const pinstripeGeo = new THREE.BoxGeometry(2.65, 0.03, 0.62);
    pinstripeGeo.translate(0.04, -0.06, 0);

    // 5. Medial Star Ankle Patch (circular patch on inside ankle)
    const patchGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.02, 32);
    patchGeo.rotateX(Math.PI / 2);
    patchGeo.translate(-0.65, 0.68, 0.26);

    // 6. High-top Cross Laces
    const laceCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.9, 0.28, -0.14),
      new THREE.Vector3(0.9, 0.28, 0.14),
      new THREE.Vector3(0.65, 0.38, -0.15),
      new THREE.Vector3(0.65, 0.38, 0.15),
      new THREE.Vector3(0.4, 0.50, -0.16),
      new THREE.Vector3(0.4, 0.50, 0.16),
      new THREE.Vector3(0.15, 0.64, -0.16),
      new THREE.Vector3(0.15, 0.64, 0.16),
      new THREE.Vector3(-0.1, 0.80, -0.16),
      new THREE.Vector3(-0.1, 0.80, 0.16),
    ]);
    const laceGeo = new THREE.TubeGeometry(laceCurve, 40, 0.02, 8, false);

    // 7. Silver Eyelets
    const eyelets: THREE.TorusGeometry[] = [];
    for (let i = 0; i < 6; i++) {
      const ey = new THREE.TorusGeometry(0.03, 0.012, 8, 16);
      ey.rotateY(Math.PI / 2);
      ey.translate(0.8 - i * 0.18, 0.3 + i * 0.10, 0.26);
      eyelets.push(ey);
    }

    return {
      soleGeometry: soleExtrude,
      upperGeometry: upperExtrude,
      toeCapGeometry: toeCapGeo,
      pinstripeGeometry: pinstripeGeo,
      patchGeometry: patchGeo,
      laceGeometry: laceGeo,
      eyeletGeometries: eyelets,
    };
  }, []);

  const materials = variant.materials;

  return (
    <group name="procedural-high-top" scale={[0.95, 0.95, 0.95]} position={[0, -0.05, 0]}>
      {/* 12oz Duck Canvas Upper */}
      <mesh geometry={upperGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={materials.upperColor}
          roughness={materials.upperRoughness}
          metalness={materials.upperMetalness}
        />
      </mesh>

      {/* Vulcanized Rubber Foxing Sole */}
      <mesh geometry={soleGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={materials.soleColor}
          roughness={materials.soleRoughness}
          metalness={materials.soleMetalness}
        />
      </mesh>

      {/* Rubber Toe Bumper Cap */}
      <mesh geometry={toeCapGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={materials.soleColor}
          roughness={0.35}
          metalness={0.05}
        />
      </mesh>

      {/* Black Midsole Pinstripe */}
      <mesh geometry={pinstripeGeometry}>
        <meshStandardMaterial color="#101114" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Medial Chuck Taylor Star Ankle Patch */}
      <mesh geometry={patchGeometry}>
        <meshStandardMaterial color="#f7f5ee" roughness={0.5} />
      </mesh>

      {/* Laces */}
      <mesh geometry={laceGeometry} castShadow receiveShadow>
        <meshStandardMaterial
          color={materials.lacesColor}
          roughness={materials.lacesRoughness}
          metalness={0.0}
        />
      </mesh>

      {/* Silver Metallic Eyelet Rings */}
      {eyeletGeometries.map((geo, idx) => (
        <mesh key={idx} geometry={geo} castShadow>
          <meshStandardMaterial color="#d4d8e2" metalness={0.95} roughness={0.15} />
        </mesh>
      ))}
    </group>
  );
};
