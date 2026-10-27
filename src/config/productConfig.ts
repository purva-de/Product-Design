export interface ProductVariant {
  id: string;
  name: string;
  subtitle: string;
  colorSwatch: string;
  accentColor: string;
  materials: {
    upperColor: string;
    upperRoughness: number;
    upperMetalness: number;
    soleColor: string;
    soleRoughness: number;
    soleMetalness: number;
    lacesColor: string;
    lacesRoughness: number;
    accentColor: string;
    accentMetalness: number;
    accentRoughness: number;
    variantMappingIndex: number;
  };
}

export interface FeatureCallout {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  specs: string[];
  worldPosition: [number, number, number];
}

export const PRODUCT_CONFIG = {
  brand: {
    name: "NOVA FORM",
    agency: "Lead Flow Tech",
    tagline: "FORM THAT MOVES YOU.",
    subtagline: "Vintage heritage canvas. Reimagined in pure dimension.",
    description: "Classic high-top canvas sneaker silhouette.",
  },
  model: {
    primaryPath: "/models/chuck-taylor.glb",
    initialScale: 1.0,
    centerOffset: [0, 0, 0] as [number, number, number],
  },
  variants: [
    {
      id: "heritage-blue",
      name: "Heritage Blue",
      subtitle: "Vintage 70s Royal Canvas",
      colorSwatch: "#2f5ea8",
      accentColor: "#6b9beb",
      materials: {
        upperColor: "#2d5ca3",
        upperRoughness: 0.82,
        upperMetalness: 0.04,
        soleColor: "#f6f2e9",
        soleRoughness: 0.40,
        soleMetalness: 0.05,
        lacesColor: "#f2ede2",
        lacesRoughness: 0.75,
        accentColor: "#c0c5cf",
        accentMetalness: 0.95,
        accentRoughness: 0.15,
        variantMappingIndex: 0,
      },
    },
    {
      id: "obsidian-black",
      name: "Obsidian Black",
      subtitle: "Classic Monochrome Canvas",
      colorSwatch: "#18191c",
      accentColor: "#A5A7AD",
      materials: {
        upperColor: "#1a1b1e",
        upperRoughness: 0.85,
        upperMetalness: 0.05,
        soleColor: "#f6f2e9",
        soleRoughness: 0.40,
        soleMetalness: 0.05,
        lacesColor: "#f2ede2",
        lacesRoughness: 0.75,
        accentColor: "#c0c5cf",
        accentMetalness: 0.95,
        accentRoughness: 0.15,
        variantMappingIndex: 1,
      },
    },
  ] as ProductVariant[],
  features: [
    {
      id: "canvas",
      number: "01",
      title: "12oz Duck Canvas",
      tagline: "Heavyweight Upper",
      description: "Durable vintage weave with high tensile strength and breathable comfort.",
      specs: ["12oz 100% Cotton", "Contrast Stitching"],
      worldPosition: [0.22, 0.04, 0.32],
    },
    {
      id: "patch",
      number: "02",
      title: "Ankle Star Patch",
      tagline: "Medial Emblem",
      description: "Iconic circular ankle crest with Chuck Taylor signature graphic.",
      specs: ["Vintage screenprint", "Medial placement"],
      worldPosition: [-0.15, 0.22, 0.32],
    },
    {
      id: "foxing",
      number: "03",
      title: "Vulcanized Foxing",
      tagline: "Pinstripe Rubber",
      description: "Glossy egret tape with black pinstripe and reinforced diamond bumper.",
      specs: ["Higher rubber foxing", "OrthoLite cushion"],
      worldPosition: [0.60, -0.28, 0.22],
    },
  ] as FeatureCallout[],
  agency: {
    name: "Lead Flow Tech",
    tagline: "We build immersive digital experiences for ambitious brands.",
    services: [
      {
        title: "3D Product Experiences",
        description: "Photorealistic WebGL showcases built for conversion.",
        metric: "+94% Conversion",
      },
      {
        title: "Cinematic Websites",
        description: "Editorial art direction and physics-based motion.",
        metric: "AOTD Caliber",
      },
      {
        title: "Digital Showrooms",
        description: "Real-time configurators with custom PBR materials.",
        metric: "Sub-Second",
      },
    ],
  },
};
