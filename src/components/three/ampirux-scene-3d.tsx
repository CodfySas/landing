"use client";

import { useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  FloatGroup,
  interp,
  mulberry32,
  ProceduralEnvironment,
  SparkleField,
} from "./helpers";

/**
 * Ampirux 3D scene: a hero pair of golden/purple barber scissors that travels
 * across the page as you scroll, snipping as it goes, surrounded by smaller
 * floating scissors, combs and sparkles. Renders as a fixed full-page
 * background behind the content.
 */

type SceneProps = {
  /** Page scroll progress 0..1, updated outside the canvas. */
  progressRef: RefObject<number>;
  reduced: boolean;
};

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

/* ------------------------------------------------------------------ */
/* Geometry + materials                                               */
/* ------------------------------------------------------------------ */

function useBladeGeometry() {
  return useMemo(() => {
    // Blade lying along +X with the pivot at the origin.
    const shape = new THREE.Shape();
    shape.moveTo(0, 0.07);
    shape.lineTo(0.24, 0.2);
    shape.quadraticCurveTo(1.7, 0.36, 3.05, 0.04);
    shape.quadraticCurveTo(1.65, -0.07, 0.26, -0.13);
    shape.lineTo(0, -0.07);
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth: 0.06,
      bevelEnabled: true,
      bevelThickness: 0.018,
      bevelSize: 0.02,
      bevelSegments: 2,
      curveSegments: 24,
    });
    geo.center();
    // center() moved the blade to the origin — push it back so the heel
    // (pivot end) sits at x=0 again.
    geo.translate(1.53, 0, 0);
    return geo;
  }, []);
}

function useScissorMaterials() {
  return useMemo(() => {
    const blade = new THREE.MeshPhysicalMaterial({
      color: "#d8d5ea",
      metalness: 1,
      roughness: 0.22,
      clearcoat: 0.6,
      clearcoatRoughness: 0.25,
      envMapIntensity: 1.25,
    });
    const gold = new THREE.MeshPhysicalMaterial({
      color: "#f2c02c",
      metalness: 1,
      roughness: 0.24,
      envMapIntensity: 1.35,
    });
    const purple = new THREE.MeshStandardMaterial({
      color: "#9d4eda",
      emissive: "#3a1456",
      emissiveIntensity: 0.55,
      metalness: 0.55,
      roughness: 0.3,
      envMapIntensity: 1,
    });
    return { blade, gold, purple };
  }, []);
}

type Materials = ReturnType<typeof useScissorMaterials>;

/** One half: blade (+X) + purple arm + gold handle ring (−X). */
function ScissorHalf({
  bladeGeo,
  materials,
}: {
  bladeGeo: THREE.ExtrudeGeometry;
  materials: Materials;
}) {
  return (
    <group>
      <mesh geometry={bladeGeo} material={materials.blade} castShadow />
      {/* Arm from pivot down toward the handle */}
      <mesh
        material={materials.purple}
        position={[-0.62, -0.34, 0]}
        rotation={[0, 0, Math.atan2(-0.68, -1.24)]}
      >
        <capsuleGeometry args={[0.09, 1.16, 6, 14]} />
      </mesh>
      {/* Handle ring */}
      <mesh material={materials.gold} position={[-1.38, -0.76, 0]}>
        <torusGeometry args={[0.34, 0.095, 18, 40]} />
      </mesh>
    </group>
  );
}

/**
 * Full scissors. `openRef` (radians) controls how far the blades are open.
 * The second half is mirrored across the X axis, so giving both halves the
 * same rotation.z opens them symmetrically.
 */
function Scissors({
  openRef,
  open = 0.3,
  materials,
  scale = 1,
}: {
  openRef?: RefObject<number>;
  /** Static open angle (radians) used when no openRef is given. */
  open?: number;
  materials: Materials;
  scale?: number;
}) {
  const bladeGeo = useBladeGeometry();
  const halfA = useRef<THREE.Group>(null);
  const halfB = useRef<THREE.Group>(null);

  useFrame(() => {
    const angle = openRef?.current ?? open;
    if (halfA.current) halfA.current.rotation.z = angle / 2;
    if (halfB.current) halfB.current.rotation.z = angle / 2;
  });

  return (
    <group scale={scale}>
      <group ref={halfA} position={[0, 0, 0.045]}>
        <ScissorHalf bladeGeo={bladeGeo} materials={materials} />
      </group>
      <group ref={halfB} position={[0, 0, -0.045]} scale={[1, -1, 1]}>
        <ScissorHalf bladeGeo={bladeGeo} materials={materials} />
      </group>
      {/* Pivot screw */}
      <mesh material={materials.gold} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.3, 24]} />
      </mesh>
      <mesh material={materials.purple} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.34, 16]} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Hero scissors — scroll-driven travel + snipping                    */
/* ------------------------------------------------------------------ */

function HeroScissors({
  progressRef,
  reduced,
  materials,
}: SceneProps & { materials: Materials }) {
  const group = useRef<THREE.Group>(null);
  const openRef = useRef(0.35);
  const viewport = useThree((s) => s.viewport);

  useFrame((state) => {
    if (!group.current) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    const p = progressRef.current ?? 0;

    // Travel across the page — no zigzag: hero RIGHT (deep in the fog behind
    // the dashboard) → center → LEFT for the middle sections → RIGHT at the
    // closing CTA.
    const fx = interp(p, [0, 0.25, 0.5, 0.8, 1], [0.26, 0, -0.27, -0.27, 0.24]);
    const fy = interp(p, [0, 0.25, 0.5, 0.8, 1], [0.1, -0.08, 0.06, -0.1, 0.0]);
    group.current.position.x = fx * viewport.width;
    group.current.position.y = fy * viewport.height + (reduced ? 0 : Math.sin(t * 0.7) * 0.25);
    group.current.position.z = interp(p, [0, 0.4, 1], [-3.2, 1.1, -0.8]);

    group.current.rotation.z = interp(p, [0, 0.5, 1], [-0.28, 0.62, -0.15]);
    group.current.rotation.y = reduced ? 0.4 : Math.sin(t * 0.24) * 0.55 + p * 1.4;
    group.current.rotation.x = reduced ? 0 : Math.sin(t * 0.31) * 0.16;

    // Resting pose is WIDE OPEN; a slow gate periodically brings in a burst
    // of quick snips, then the scissors relax open again.
    if (reduced) {
      openRef.current = 0.55;
    } else {
      const gate = smoothstep(0.25, 0.75, 0.5 + 0.5 * Math.sin(t * 0.32));
      const snips = 0.5 + 0.5 * Math.sin(t * 2.6);
      openRef.current = 0.58 - gate * snips * 0.48;
    }
  });

  return (
    <group ref={group}>
      <Scissors openRef={openRef} materials={materials} scale={1.75} />
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Background props: small scissors + combs                           */
/* ------------------------------------------------------------------ */

function Comb({ materials }: { materials: Materials }) {
  const teeth = useMemo(() => Array.from({ length: 14 }, (_, i) => i), []);
  return (
    <group>
      <mesh material={materials.purple} position={[0, 0.12, 0]}>
        <boxGeometry args={[1.9, 0.22, 0.07]} />
      </mesh>
      {teeth.map((i) => (
        <mesh
          key={i}
          material={materials.purple}
          position={[-0.85 + i * 0.13, -0.14, 0]}
        >
          <boxGeometry args={[0.05, 0.34, 0.05]} />
        </mesh>
      ))}
      <mesh material={materials.gold} position={[0.82, 0.12, 0.05]}>
        <sphereGeometry args={[0.045, 12, 12]} />
      </mesh>
    </group>
  );
}

type PropSpec = {
  kind: "scissors" | "comb";
  fx: number;
  fy: number;
  z: number;
  scale: number;
  seed: number;
  rotZ: number;
  open: number;
};

function BackgroundProps({
  reduced,
  materials,
}: {
  reduced: boolean;
  materials: Materials;
}) {
  const viewport = useThree((s) => s.viewport);

  const specs = useMemo<PropSpec[]>(() => {
    const rand = mulberry32(20240802);
    const out: PropSpec[] = [];
    const slots: Array<[number, number]> = [
      [-0.42, 0.32],
      [0.4, 0.36],
      [0.44, -0.3],
      [-0.4, -0.32],
      [-0.05, 0.42],
      [0.1, -0.44],
      [-0.48, 0.0],
      [0.5, 0.05],
    ];
    slots.forEach(([fx, fy], i) => {
      out.push({
        kind: i % 3 === 2 ? "comb" : "scissors",
        fx,
        fy,
        z: -3.5 - rand() * 5,
        scale: 0.35 + rand() * 0.3,
        seed: rand() * 100,
        rotZ: (rand() - 0.5) * 1.4,
        // varied poses: some wide open, some nearly closed
        open: 0.12 + rand() * 0.55,
      });
    });
    return out;
  }, []);

  return (
    <>
      {specs.map((s, i) => (
        <FloatGroup
          key={i}
          position={[s.fx * viewport.width, s.fy * viewport.height, s.z]}
          rotation={[0, 0, s.rotZ]}
          seed={s.seed}
          speed={0.5 + (s.seed % 1) * 0.4}
          floatIntensity={0.35}
          rotIntensity={0.22}
          paused={reduced}
        >
          <SpinSlow seed={s.seed} paused={reduced}>
            {s.kind === "scissors" ? (
              <Scissors materials={materials} scale={s.scale} open={s.open} />
            ) : (
              <group scale={s.scale * 1.4}>
                <Comb materials={materials} />
              </group>
            )}
          </SpinSlow>
        </FloatGroup>
      ))}
    </>
  );
}

function SpinSlow({
  seed,
  paused,
  children,
}: {
  seed: number;
  paused: boolean;
  children: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const dir = seed % 2 > 1 ? -1 : 1;
  useFrame((state) => {
    if (!ref.current || paused) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.22 * dir + seed;
  });
  return <group ref={ref}>{children}</group>;
}

/* ------------------------------------------------------------------ */
/* Camera rig — subtle scroll + idle drift                            */
/* ------------------------------------------------------------------ */

function CameraRig({ progressRef, reduced }: SceneProps) {
  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    const p = progressRef.current ?? 0;
    const cam = state.camera;
    cam.position.x = Math.sin(t * 0.11) * 0.4;
    cam.position.y = Math.cos(t * 0.13) * 0.3 - p * 0.6;
    cam.position.z = 14 - Math.sin(p * Math.PI) * 1.2;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Scene root                                                         */
/* ------------------------------------------------------------------ */

function AmpiruxSceneContent({ progressRef, reduced }: SceneProps) {
  const materials = useScissorMaterials();
  return (
    <>
      <ProceduralEnvironment />
      <fog attach="fog" args={["#0d0322", 11, 26]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 8, 6]} intensity={1.1} color="#fff4e0" />
      <pointLight position={[-7, -4, 5]} intensity={60} color="#7b2cbf" distance={30} />
      <pointLight position={[7, 4, 6]} intensity={45} color="#f2c02c" distance={28} />

      <CameraRig progressRef={progressRef} reduced={reduced} />
      <HeroScissors progressRef={progressRef} reduced={reduced} materials={materials} />
      <BackgroundProps reduced={reduced} materials={materials} />

      <SparkleField
        count={90}
        color="#f2c02c"
        area={[24, 16, 10]}
        size={9}
        seed={3}
        paused={reduced}
      />
      <SparkleField
        count={50}
        color="#c39bff"
        area={[26, 16, 12]}
        size={7}
        seed={9}
        opacity={0.8}
        paused={reduced}
      />
    </>
  );
}

export function AmpiruxScene3D({ progressRef, reduced }: SceneProps) {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 14], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <AmpiruxSceneContent progressRef={progressRef} reduced={reduced} />
    </Canvas>
  );
}
