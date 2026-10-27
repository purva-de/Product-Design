# NOVA FORM — Immersive 3D Product Showcase

> High-performance real-time 3D product showcase and digital showroom website built for **NOVA FORM**, featuring the **Heritage Blue Chuck Taylor All Star 70 High-Top**.  
> Created as a flagship portfolio project for **Lead Flow Tech**, a digital agency specializing in immersive web experiences.

[![Live Demo](https://img.shields.io/badge/Demo-Local%20Live-brightgreen)](http://127.0.0.1:5173/)
[![Three.js](https://img.shields.io/badge/Three.js-r174-black?logo=three.js)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-v9-blue)](https://docs.pmnd.rs/react-three-fiber/)
[![Vite](https://img.shields.io/badge/Vite-v8-purple?logo=vite)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)

---

## Overview

The **NOVA FORM** showcase feels like an interactive product film combined with a high-end digital showroom. The experience is driven by real-time 3D WebGL rendering that responds smoothly to scrolling, user interactions, and device viewports.

### Key Features

- **Real-Time 3D Footwear Engine**:
  - Photorealistic PBR materials with Meshopt-compressed GLTF asset loading and procedural fallback.
  - Authentic high-top silhouette with separate material channels for 12oz duck canvas, vulcanized rubber foxing tape, pinstripe, toe bumper, eyelets, and the circular Chuck Taylor medial ankle star patch.
- **Cinematic Scroll-Driven Camera**:
  - GSAP ScrollTrigger timeline smoothly driving camera position, focal look-at targets, and product orientation across 7 cinematic chapters.
  - Frame-rate independent exponential damping for uniform, stutter-free movement across 60Hz, 120Hz, and 144Hz displays.
- **Clean 3D Hotspot Detail Pins**:
  - Minimalist circular glass pins (`01`, `02`, `03`) directly tracked to 3D sneaker geometry.
  - Clean single-line hover/focus pills without visual clutter.
  - Two-way synchronization with the editorial craftsmanship panel.
- **Interactive 360° Studio & Color Customizer**:
  - Damped pointer and touch drag physics with automatic subtle idle levitation.
  - Real-time material shader switching between **Heritage Blue** and **Obsidian Black**.
- **Multi-Device Responsive Architecture**:
  - **Mobile (< 768px)**: Dynamic distance scaling ensures the sneaker fits without horizontal cropping on narrow vertical screens. Editorial cards anchor cleanly to the bottom (`justify-end`), reserving the upper screen for 3D interaction.
  - **Tablet (768px – 1024px)**: Interpolated camera framing and balanced column margins.
  - **Desktop (> 1024px)**: Telephoto FOV (30°) with generous negative space and off-center sneaker staging.
- **Accessibility & Performance Compliance**:
  - Semantic HTML5 structure throughout.
  - Respects `prefers-reduced-motion` with stable camera positioning and reduced rotational velocity.
  - Device pixel ratio capped to 2 to maintain 60–120 FPS performance on high-DPI screens.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | React 19, TypeScript, Vite 8 |
| **3D & Graphics** | Three.js, React Three Fiber, React Three Drei, Meshoptimizer |
| **Animation & Scroll** | GSAP, ScrollTrigger |
| **Styling & System** | Tailwind CSS v4, Custom Design Tokens, CSS Variables |
| **Icons & Visuals** | Lucide React, Canvas Confetti |

---

## Project Structure

```
nova-form/
├── public/
│   └── models/
│       └── chuck-taylor.glb       # Optimized 3D GLTF asset with Meshopt compression
├── src/
│   ├── components/
│   │   ├── ContactForm.tsx        # Client enquiry form with client-side validation
│   │   ├── DetailCallout.tsx      # Sleek 3D circular hotspot pins with hover pills
│   │   ├── LoadingScreen.tsx      # Cinematic brand loader
│   │   ├── Navigation.tsx         # Minimalist luxury header with "Let's Build" CTA
│   │   ├── ProceduralSneaker.tsx  # Procedural high-top fallback geometry
│   │   ├── ProductCanvas.tsx      # R3F Canvas setup, DPR limits, and 360 guide
│   │   ├── ProductLighting.tsx    # Multi-point studio key/fill/rim lighting
│   │   ├── ProductModel.tsx       # GLTF loader, material mapping, and mesh centering
│   │   ├── ProductScene.tsx       # Frame-rate independent camera rig and scroll waypoints
│   │   └── VariantSelector.tsx    # Clean 2-column colorway selector dock
│   ├── config/
│   │   └── productConfig.ts       # Central product data, colorways, specs, and agency details
│   ├── hooks/
│   │   ├── useReducedMotion.ts    # User motion preference hook
│   │   └── useWebGLSupport.ts     # Hardware acceleration availability check
│   ├── sections/
│   │   ├── HeroSection.tsx        # 01 / Cinematic hero opening
│   │   ├── ProductRevealSection.tsx # 02 / Unforeshortened lateral profile reveal
│   │   ├── MaterialsSection.tsx   # 03 / Craftsmanship and tracked 3D detail hotspots
│   │   ├── InteractiveProductSection.tsx # 04 & 05 / 360° Studio & Colorways
│   │   ├── FinaleSection.tsx      # 06 / Cinematic outro pullback
│   │   └── ContactSection.tsx     # 07 / Lead Flow Tech agency capabilities & inquiry form
│   ├── App.tsx                    # GSAP ScrollTrigger timeline controller
│   ├── index.css                  # Design system tokens and typography
│   └── main.tsx                   # Application entrypoint
├── index.html
├── package.json
└── tsconfig.json
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/purva-de/Product-Design.git
cd Product-Design

# Install dependencies
npm install

# Start local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
# Type check and build optimized bundle
npm run build

# Preview production build locally
npm run preview
```

---

## Agency Credits

Designed and engineered for **NOVA FORM** by **Lead Flow Tech** — Digital experiences for ambitious brands.
