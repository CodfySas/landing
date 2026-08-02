"use client";

import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree, type ThreeElements } from "@react-three/fiber";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/** Piecewise-linear interpolation over sorted stops, clamped at both ends. */
export function interp(t: number, stops: number[], values: number[]): number {
  if (t <= stops[0]) return values[0];
  const last = stops.length - 1;
  if (t >= stops[last]) return values[last];
  for (let i = 0; i < last; i++) {
    if (t <= stops[i + 1]) {
      const f = (t - stops[i]) / (stops[i + 1] - stops[i]);
      return values[i] + (values[i + 1] - values[i]) * f;
    }
  }
  return values[last];
}

/** Deterministic PRNG so scene layouts are stable across renders. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Generates a procedural studio environment map (no external assets, so it
 * works offline with `output: "export"`). This is what makes the metallic
 * materials actually reflect something instead of rendering black.
 */
export function ProceduralEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envScene = new RoomEnvironment();
    const rt = pmrem.fromScene(envScene, 0.04);
    scene.environment = rt.texture;
    return () => {
      scene.environment = null;
      rt.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);

  return null;
}

type FloatGroupProps = ThreeElements["group"] & {
  seed?: number;
  /** oscillations per second-ish */
  speed?: number;
  /** world units of vertical bob */
  floatIntensity?: number;
  /** radians of wobble */
  rotIntensity?: number;
  paused?: boolean;
};

/** Gently bobs and wobbles its children, like drei's <Float>. */
export function FloatGroup({
  seed = 0,
  speed = 1,
  floatIntensity = 0.4,
  rotIntensity = 0.15,
  paused = false,
  children,
  ...props
}: FloatGroupProps) {
  const inner = useRef<THREE.Group>(null);
  const phase = seed * 12.9898;

  useFrame((state) => {
    if (!inner.current || paused) return;
    const t = state.clock.elapsedTime * speed + phase;
    inner.current.position.y = Math.sin(t) * floatIntensity;
    inner.current.rotation.x = Math.sin(t * 0.7) * rotIntensity;
    inner.current.rotation.z = Math.cos(t * 0.55) * rotIntensity;
  });

  return (
    <group {...props}>
      <group ref={inner}>{children}</group>
    </group>
  );
}

const SPARKLE_VERTEX = /* glsl */ `
  attribute float aPhase;
  attribute float aScale;
  uniform float uSize;
  varying float vPhase;
  void main() {
    vPhase = aPhase;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = clamp(uSize * aScale * (12.0 / -mvPosition.z), 1.5, uSize * 2.5);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const SPARKLE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSpeed;
  uniform float uOpacity;
  varying float vPhase;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float disk = smoothstep(0.5, 0.05, d);
    float twinkle = 0.2 + 0.8 * (0.5 + 0.5 * sin(uTime * uSpeed + vPhase));
    gl_FragColor = vec4(uColor, disk * twinkle * uOpacity);
  }
`;

type SparkleFieldProps = {
  count?: number;
  color?: string;
  /** box extents (x, y, z) the sparkles are scattered in */
  area?: [number, number, number];
  /** roughly pixels at z = -1 */
  size?: number;
  speed?: number;
  opacity?: number;
  seed?: number;
  paused?: boolean;
  position?: [number, number, number];
};

/** Twinkling additive point cloud (GPU, one draw call). */
export function SparkleField({
  count = 80,
  color = "#f2c02c",
  area = [18, 12, 8],
  size = 8,
  speed = 1.6,
  opacity = 1,
  seed = 1,
  paused = false,
  position,
}: SparkleFieldProps) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const { positions, phases, scales } = useMemo(() => {
    const rand = mulberry32(seed * 1000 + 7);
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const scales = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * area[0];
      positions[i * 3 + 1] = (rand() - 0.5) * area[1];
      positions[i * 3 + 2] = (rand() - 0.5) * area[2];
      phases[i] = rand() * Math.PI * 2;
      scales[i] = 0.5 + rand();
    }
    return { positions, phases, scales };
  }, [count, area, seed]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: size },
      uSpeed: { value: speed },
      uOpacity: { value: opacity },
      uColor: { value: new THREE.Color(color) },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    uniforms.uSize.value = size;
    uniforms.uSpeed.value = speed;
    uniforms.uOpacity.value = opacity;
    uniforms.uColor.value.set(color);
  }, [uniforms, size, speed, opacity, color]);

  useFrame((_, delta) => {
    if (!paused && material.current) {
      material.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <points position={position} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={material}
        vertexShader={SPARKLE_VERTEX}
        fragmentShader={SPARKLE_FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
