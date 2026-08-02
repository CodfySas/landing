"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { interp, mulberry32, ProceduralEnvironment, SparkleField } from "./helpers";

/**
 * CODFY home 3D scene — "el mundito de redes": a network globe. Nodes are
 * scattered over a sphere (fibonacci distribution), wired together with
 * glowing great-circle arcs; light pulses travel along the arcs like data
 * packets. The globe drifts through the page with scroll (right → center →
 * left → right, no zigzag) and tilts toward the mouse.
 */

type SceneProps = {
  progressRef: RefObject<number>;
  mouseRef: RefObject<{ x: number; y: number }>;
  reduced: boolean;
};

const GLOBE_R = 2.35;
const NODE_COUNT = 220;
const ARC_COUNT = 34;
const ARC_SEGMENTS = 24;
const PULSE_COUNT = 14;

/** Fibonacci sphere — evenly spread points. */
function useNodePositions() {
  return useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < NODE_COUNT; i++) {
      const y = 1 - (i / (NODE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * r * GLOBE_R,
          y * GLOBE_R,
          Math.sin(theta) * r * GLOBE_R
        )
      );
    }
    return pts;
  }, []);
}

/** Random node pairs joined by quadratic-bezier arcs bulging outward. */
function useArcs(nodes: THREE.Vector3[]) {
  return useMemo(() => {
    const rand = mulberry32(77);
    const arcs: THREE.QuadraticBezierCurve3[] = [];
    let guard = 0;
    while (arcs.length < ARC_COUNT && guard++ < 500) {
      const a = nodes[Math.floor(rand() * nodes.length)];
      const b = nodes[Math.floor(rand() * nodes.length)];
      const dist = a.distanceTo(b);
      // mid-range hops read best — skip neighbors and antipodes
      if (dist < GLOBE_R * 0.5 || dist > GLOBE_R * 1.6) continue;
      const mid = a
        .clone()
        .add(b)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(GLOBE_R * (1.12 + (dist / GLOBE_R) * 0.25));
      arcs.push(new THREE.QuadraticBezierCurve3(a.clone(), mid, b.clone()));
    }
    return arcs;
  }, [nodes]);
}

function NetworkGlobe({ progressRef, mouseRef, reduced }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  const globe = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);

  const nodes = useNodePositions();
  const arcs = useArcs(nodes);

  /* Nodes — instanced spheres, blue with purple + gold accents */
  const nodesRef = useRef<THREE.InstancedMesh>(null);
  useEffect(() => {
    const mesh = nodesRef.current;
    if (!mesh) return;
    const rand = mulberry32(31);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    for (let i = 0; i < NODE_COUNT; i++) {
      dummy.position.copy(nodes[i]);
      const s = 0.02 + rand() * 0.035;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      const roll = rand();
      if (roll < 0.06) color.set("#f2c02c");
      else if (roll < 0.22) color.set("#9d4eda");
      else color.set("#6ab5e3");
      mesh.setColorAt(i, color);
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodes]);

  /* Arc lines — one static LineSegments buffer for all arcs */
  const arcPositions = useMemo(() => {
    const out = new Float32Array(ARC_COUNT * ARC_SEGMENTS * 2 * 3);
    let o = 0;
    for (const arc of arcs) {
      const pts = arc.getPoints(ARC_SEGMENTS);
      for (let s = 0; s < ARC_SEGMENTS; s++) {
        out[o++] = pts[s].x;
        out[o++] = pts[s].y;
        out[o++] = pts[s].z;
        out[o++] = pts[s + 1].x;
        out[o++] = pts[s + 1].y;
        out[o++] = pts[s + 1].z;
      }
    }
    return out;
  }, [arcs]);

  /* Data pulses traveling along arcs */
  const pulsesRef = useRef<THREE.InstancedMesh>(null);
  const pulseSpecs = useMemo(() => {
    const rand = mulberry32(913);
    return Array.from({ length: PULSE_COUNT }, () => ({
      arc: Math.floor(rand() * ARC_COUNT),
      speed: 0.12 + rand() * 0.2,
      offset: rand(),
    }));
  }, []);
  const pulseDummy = useMemo(() => new THREE.Object3D(), []);
  const pulseVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!root.current) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    const p = progressRef.current ?? 0;
    const m = mouseRef.current ?? { x: 0, y: 0 };

    // Scroll path — no zigzag: hero RIGHT → center → LEFT (middle sections)
    // → RIGHT again for the closing contact section.
    const fx = interp(p, [0, 0.22, 0.45, 0.7, 0.86, 1], [0.23, 0, -0.24, -0.24, 0.21, 0.21]);
    const fy = interp(p, [0, 0.22, 0.45, 0.7, 0.86, 1], [0.02, -0.04, 0.03, 0.03, -0.02, -0.02]);
    root.current.position.x = fx * viewport.width;
    root.current.position.y = fy * viewport.height + (reduced ? 0 : Math.sin(t * 0.5) * 0.16);
    root.current.scale.setScalar(interp(p, [0, 0.5, 1], [1, 0.88, 0.8]));

    // Mouse tilt (lerped so it feels weighty)
    const targetY = m.x * 0.4;
    const targetX = -m.y * 0.28;
    root.current.rotation.y += (targetY - root.current.rotation.y) * Math.min(1, delta * 2.5);
    root.current.rotation.x += (targetX - root.current.rotation.x) * Math.min(1, delta * 2.5);

    // Continuous slow spin of the globe itself
    if (globe.current) {
      globe.current.rotation.y = t * 0.12 + p * 1.8;
    }

    // Move data pulses along their arcs
    const pm = pulsesRef.current;
    if (pm) {
      for (let i = 0; i < PULSE_COUNT; i++) {
        const spec = pulseSpecs[i];
        const arc = arcs[spec.arc];
        if (!arc) continue;
        const frac = (spec.offset + t * spec.speed) % 1;
        arc.getPoint(frac, pulseVec);
        pulseDummy.position.copy(pulseVec);
        // shrink at the ends so pulses fade in/out of nodes
        const endFade = Math.min(1, Math.min(frac, 1 - frac) * 8);
        pulseDummy.scale.setScalar(0.045 * endFade + 0.0001);
        pulseDummy.updateMatrix();
        pm.setMatrixAt(i, pulseDummy.matrix);
      }
      pm.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={root}>
      <group ref={globe}>
        {/* Graticule (lat/long wireframe) */}
        <mesh>
          <sphereGeometry args={[GLOBE_R, 28, 18]} />
          <meshBasicMaterial
            color="#429cd8"
            wireframe
            transparent
            opacity={0.07}
            depthWrite={false}
          />
        </mesh>
        {/* Soft inner body so the far side dims (depth cue) */}
        <mesh>
          <sphereGeometry args={[GLOBE_R * 0.985, 32, 24]} />
          <meshBasicMaterial color="#0d1226" transparent opacity={0.55} depthWrite={false} />
        </mesh>
        {/* Nodes */}
        <instancedMesh
          ref={nodesRef}
          args={[undefined, undefined, NODE_COUNT]}
          frustumCulled={false}
        >
          <sphereGeometry args={[1, 10, 10]} />
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
        {/* Connection arcs */}
        <lineSegments frustumCulled={false}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[arcPositions, 3]} />
          </bufferGeometry>
          <lineBasicMaterial
            color="#429cd8"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </lineSegments>
        {/* Data pulses */}
        <instancedMesh
          ref={pulsesRef}
          args={[undefined, undefined, PULSE_COUNT]}
          frustumCulled={false}
        >
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#dff1ff" toneMapped={false} />
        </instancedMesh>
      </group>

      {/* Atmosphere halo */}
      <mesh scale={1.06}>
        <sphereGeometry args={[GLOBE_R, 32, 24]} />
        <meshBasicMaterial
          color="#429cd8"
          transparent
          opacity={0.045}
          side={THREE.BackSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner glow */}
      <pointLight intensity={26} color="#6ab5e3" distance={13} />
    </group>
  );
}

function CameraRig({ progressRef, mouseRef, reduced }: SceneProps) {
  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    const p = progressRef.current ?? 0;
    const m = mouseRef.current ?? { x: 0, y: 0 };
    const cam = state.camera;
    cam.position.x = Math.sin(t * 0.08) * 0.3 + m.x * 0.5;
    cam.position.y = Math.cos(t * 0.1) * 0.25 + m.y * 0.35 - p * 0.8;
    cam.position.z = 11 + p * 1.6;
    cam.lookAt(0, -p * 0.8, 0);
  });
  return null;
}

function HomeSceneContent(props: SceneProps) {
  return (
    <>
      <ProceduralEnvironment />
      <fog attach="fog" args={["#100f1f", 13, 30]} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[6, 8, 5]} intensity={0.9} color="#eaf4ff" />
      <pointLight position={[-8, -3, 6]} intensity={70} color="#7b2cbf" distance={34} />
      <pointLight position={[8, 5, 7]} intensity={55} color="#429cd8" distance={30} />

      <CameraRig {...props} />
      <NetworkGlobe {...props} />

      <SparkleField
        count={150}
        color="#6ab5e3"
        area={[30, 18, 14]}
        size={7}
        seed={5}
        opacity={0.9}
        paused={props.reduced}
      />
      <SparkleField
        count={60}
        color="#c39bff"
        area={[28, 18, 16]}
        size={6}
        seed={17}
        opacity={0.7}
        paused={props.reduced}
      />
    </>
  );
}

export function HomeScene3D(props: SceneProps) {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 11], fov: 50 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={props.reduced ? "demand" : "always"}
    >
      <HomeSceneContent {...props} />
    </Canvas>
  );
}
