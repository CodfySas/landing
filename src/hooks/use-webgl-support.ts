"use client";

import { useEffect, useState } from "react";

/**
 * Detects WebGL availability after mount. Returns `null` while unknown
 * (first render / SSR), then `true` or `false`. Pages use this to decide
 * between the Three.js scene and the legacy CSS/canvas fallback without
 * pulling three.js into the main bundle.
 */
export function useWebGLSupport(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  return supported;
}
