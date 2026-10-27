import { useState } from 'react';

export interface WebGLSupportInfo {
  supported: boolean;
  webgl2: boolean;
  renderer: string;
  error?: string;
}

export function useWebGLSupport(): WebGLSupportInfo {
  const [support] = useState<WebGLSupportInfo>(() => {
    if (typeof window === 'undefined') {
      return { supported: true, webgl2: true, renderer: '' };
    }

    try {
      const canvas = document.createElement('canvas');
      const gl2 = canvas.getContext('webgl2');
      if (gl2) {
        const debugInfo = gl2.getExtension('WEBGL_debug_renderer_info');
        const renderer = debugInfo ? gl2.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'WebGL 2.0';
        return { supported: true, webgl2: true, renderer: String(renderer) };
      }

      const gl1 = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (gl1) {
        return { supported: true, webgl2: false, renderer: 'WebGL 1.0' };
      }

      return {
        supported: false,
        webgl2: false,
        renderer: '',
        error: 'WebGL not supported on this browser or hardware acceleration is disabled.',
      };
    } catch (e) {
      return {
        supported: false,
        webgl2: false,
        renderer: '',
        error: e instanceof Error ? e.message : 'Unknown WebGL initialization error',
      };
    }
  });

  return support;
}
