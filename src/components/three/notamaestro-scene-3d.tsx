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
 * NotaMaestro 3D scene: a big open book that travels through the page
 * (right → center → left → right, same no-zigzag choreography as the other
 * landings), pages gently breathing, escorted by a graduation cap with a
 * swinging tassel, hexagonal pencils and floating paper sheets.
 */

type SceneProps = {
  progressRef: RefObject<number>;
  reduced: boolean;
};

/* ------------------------------------------------------------------ */
/* Materials                                                          */
/* ------------------------------------------------------------------ */

function useMaterials() {
  return useMemo(() => {
    const cover = new THREE.MeshStandardMaterial({
      color: "#b45309",
      roughness: 0.55,
      metalness: 0.15,
      envMapIntensity: 0.8,
    });
    const coverDark = new THREE.MeshStandardMaterial({
      color: "#7c3a08",
      roughness: 0.6,
      metalness: 0.1,
    });
    const pages = new THREE.MeshStandardMaterial({
      color: "#f7eeda",
      roughness: 0.9,
      metalness: 0,
    });
    const gold = new THREE.MeshPhysicalMaterial({
      color: "#f2c02c",
      metalness: 1,
      roughness: 0.25,
      envMapIntensity: 1.3,
    });
    const felt = new THREE.MeshStandardMaterial({
      color: "#2b2118",
      roughness: 0.85,
      metalness: 0.05,
    });
    const pencilBody = new THREE.MeshStandardMaterial({
      color: "#e78617",
      roughness: 0.5,
      metalness: 0.1,
    });
    const wood = new THREE.MeshStandardMaterial({
      color: "#e0b98c",
      roughness: 0.8,
    });
    const graphite = new THREE.MeshStandardMaterial({
      color: "#33302c",
      roughness: 0.4,
      metalness: 0.4,
    });
    const eraser = new THREE.MeshStandardMaterial({
      color: "#e78a8a",
      roughness: 0.9,
    });
    const paper = new THREE.MeshStandardMaterial({
      color: "#f5ecd8",
      roughness: 0.95,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    return { cover, coverDark, pages, gold, felt, pencilBody, wood, graphite, eraser, paper };
  }, []);
}

type Materials = ReturnType<typeof useMaterials>;

/* ------------------------------------------------------------------ */
/* Objects                                                            */
/* ------------------------------------------------------------------ */

/** Open book: covers + page blocks hinged on a spine, pages breathing. */
function OpenBook({
  materials,
  reduced,
  scale = 1,
}: {
  materials: Materials;
  reduced: boolean;
  scale?: number;
}) {
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reduced || !left.current || !right.current) return;
    // Pages "breathe" — the book almost closes and reopens very slowly.
    const t = state.clock.elapsedTime;
    const breathe = 0.34 + Math.sin(t * 0.45) * 0.08;
    left.current.rotation.z = breathe;
    right.current.rotation.z = -breathe;
  });

  const half = (
    <>
      {/* Cover */}
      <mesh material={materials.cover} position={[0.62, -0.035, 0]}>
        <boxGeometry args={[1.24, 0.05, 1.62]} />
      </mesh>
      {/* Page block (slightly smaller, sits on the cover) */}
      <mesh material={materials.pages} position={[0.6, 0.035, 0]}>
        <boxGeometry args={[1.14, 0.09, 1.52]} />
      </mesh>
    </>
  );

  return (
    <group scale={scale}>
      {/* Left half (mirrored) */}
      <group ref={left} rotation={[0, 0, 0.34]}>
        <group scale={[-1, 1, 1]}>{half}</group>
      </group>
      {/* Right half */}
      <group ref={right} rotation={[0, 0, -0.34]}>
        {half}
      </group>
      {/* Spine */}
      <mesh material={materials.coverDark} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 1.62, 12]} />
      </mesh>
      {/* Bookmark ribbon */}
      <mesh material={materials.gold} position={[0.25, 0.02, 0.55]} rotation={[0.15, 0, -0.3]}>
        <boxGeometry args={[0.07, 0.005, 0.75]} />
      </mesh>
    </group>
  );
}

/** Graduation cap with a swinging golden tassel. */
function GradCap({
  materials,
  reduced,
  scale = 1,
}: {
  materials: Materials;
  reduced: boolean;
  scale?: number;
}) {
  const tassel = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (reduced || !tassel.current) return;
    const t = state.clock.elapsedTime;
    tassel.current.rotation.x = Math.sin(t * 1.1) * 0.18;
    tassel.current.rotation.z = Math.cos(t * 0.9) * 0.22;
  });

  return (
    <group scale={scale}>
      {/* Skull cap */}
      <mesh material={materials.felt} position={[0, -0.14, 0]}>
        <cylinderGeometry args={[0.34, 0.4, 0.26, 24]} />
      </mesh>
      {/* Mortarboard */}
      <mesh material={materials.felt} rotation={[0, Math.PI / 4, 0]}>
        <boxGeometry args={[1.15, 0.06, 1.15]} />
      </mesh>
      {/* Button */}
      <mesh material={materials.gold} position={[0, 0.045, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.03, 12]} />
      </mesh>
      {/* Tassel: cord hanging from the button, weight at the end */}
      <group ref={tassel} position={[0, 0.04, 0]}>
        <mesh material={materials.gold} position={[0.3, -0.12, 0.3]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.55, 6]} />
        </mesh>
        <mesh material={materials.gold} position={[0.3, -0.44, 0.3]}>
          <cylinderGeometry args={[0.05, 0.035, 0.16, 10]} />
        </mesh>
      </group>
    </group>
  );
}

/** Classic hexagonal pencil. */
function Pencil({ materials, scale = 1 }: { materials: Materials; scale?: number }) {
  return (
    <group scale={scale} rotation={[0, 0, Math.PI / 2]}>
      {/* Hex body */}
      <mesh material={materials.pencilBody}>
        <cylinderGeometry args={[0.07, 0.07, 1.3, 6]} />
      </mesh>
      {/* Wood cone */}
      <mesh material={materials.wood} position={[0, 0.75, 0]}>
        <coneGeometry args={[0.07, 0.2, 6]} />
      </mesh>
      {/* Graphite tip */}
      <mesh material={materials.graphite} position={[0, 0.88, 0]}>
        <coneGeometry args={[0.025, 0.08, 6]} />
      </mesh>
      {/* Ferrule */}
      <mesh material={materials.gold} position={[0, -0.68, 0]}>
        <cylinderGeometry args={[0.072, 0.072, 0.08, 12]} />
      </mesh>
      {/* Eraser */}
      <mesh material={materials.eraser} position={[0, -0.76, 0]}>
        <cylinderGeometry args={[0.068, 0.068, 0.09, 12]} />
      </mesh>
    </group>
  );
}

/** Floating paper sheet. */
function Paper({ materials, scale = 1 }: { materials: Materials; scale?: number }) {
  return (
    <mesh material={materials.paper} scale={scale} rotation={[-0.4, 0.2, 0.1]}>
      <planeGeometry args={[0.7, 0.95]} />
    </mesh>
  );
}

/* ------------------------------------------------------------------ */
/* Hero book — scroll-driven travel                                    */
/* ------------------------------------------------------------------ */

function HeroBook({ progressRef, reduced, materials }: SceneProps & { materials: Materials }) {
  const group = useRef<THREE.Group>(null);
  const viewport = useThree((s) => s.viewport);

  useFrame((state) => {
    if (!group.current) return;
    const t = reduced ? 0 : state.clock.elapsedTime;
    const p = progressRef.current ?? 0;

    // No zigzag: hero RIGHT → center → LEFT → RIGHT at the end.
    const fx = interp(p, [0, 0.3, 0.55, 0.85, 1], [0.24, 0, -0.26, -0.26, 0.22]);
    const fy = interp(p, [0, 0.3, 0.55, 0.85, 1], [0.08, -0.06, 0.05, -0.08, 0]);
    group.current.position.x = fx * viewport.width;
    group.current.position.y = fy * viewport.height + (reduced ? 0 : Math.sin(t * 0.6) * 0.22);
    // Deep in the fog while crossing the content-heavy middle sections so it
    // never fights the cards for attention; closer at hero and the final CTA.
    const fz = interp(p, [0, 0.3, 0.55, 0.85, 1], [-1.6, 0.6, -2.4, -2.4, -0.6]);
    group.current.position.z = fz;

    group.current.rotation.y = reduced ? 0.5 : Math.sin(t * 0.2) * 0.5 + p * 1.2;
    group.current.rotation.x = 0.42 + (reduced ? 0 : Math.sin(t * 0.27) * 0.1);
    group.current.rotation.z = interp(p, [0, 0.5, 1], [-0.08, 0.1, -0.05]);
  });

  return (
    <group ref={group}>
      <OpenBook materials={materials} reduced={reduced} scale={1.7} />
      {/* The cap rides above the book */}
      <FloatGroup position={[0.9, 1.5, 0.3]} seed={4} speed={0.7} floatIntensity={0.18} rotIntensity={0.1} paused={reduced}>
        <group rotation={[0.15, -0.4, 0.1]}>
          <GradCap materials={materials} reduced={reduced} scale={0.9} />
        </group>
      </FloatGroup>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Background props                                                   */
/* ------------------------------------------------------------------ */

function BackgroundProps({ reduced, materials }: { reduced: boolean; materials: Materials }) {
  const viewport = useThree((s) => s.viewport);

  const specs = useMemo(() => {
    const rand = mulberry32(20260802);
    const slots: Array<[number, number, "pencil" | "paper" | "cap"]> = [
      [-0.42, 0.3, "pencil"],
      [0.42, 0.34, "paper"],
      [0.45, -0.28, "pencil"],
      [-0.4, -0.3, "paper"],
      [-0.05, 0.42, "paper"],
      [0.12, -0.42, "pencil"],
      [-0.48, 0.02, "cap"],
      [0.5, 0.04, "paper"],
    ];
    return slots.map(([fx, fy, kind]) => ({
      kind,
      fx,
      fy,
      z: -3 - rand() * 5,
      scale: 0.5 + rand() * 0.4,
      seed: rand() * 100,
      rotZ: (rand() - 0.5) * 1.2,
    }));
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
          floatIntensity={0.3}
          rotIntensity={0.2}
          paused={reduced}
        >
          {s.kind === "pencil" && <Pencil materials={materials} scale={s.scale} />}
          {s.kind === "paper" && <Paper materials={materials} scale={s.scale} />}
          {s.kind === "cap" && (
            <GradCap materials={materials} reduced={reduced} scale={s.scale * 0.8} />
          )}
        </FloatGroup>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Camera + root                                                      */
/* ------------------------------------------------------------------ */

function CameraRig({ progressRef, reduced }: SceneProps) {
  useFrame((state) => {
    const t = reduced ? 0 : state.clock.elapsedTime;
    const p = progressRef.current ?? 0;
    const cam = state.camera;
    cam.position.x = Math.sin(t * 0.1) * 0.35;
    cam.position.y = Math.cos(t * 0.12) * 0.25 - p * 0.5;
    cam.position.z = 13 - Math.sin(p * Math.PI) * 1;
    cam.lookAt(0, 0, 0);
  });
  return null;
}

function NotaMaestroSceneContent({ progressRef, reduced }: SceneProps) {
  const materials = useMaterials();
  return (
    <>
      <ProceduralEnvironment />
      <fog attach="fog" args={["#160c02", 10, 25]} />
      <ambientLight intensity={0.4} color="#ffe8cf" />
      <directionalLight position={[5, 8, 6]} intensity={1.15} color="#fff1dd" />
      <pointLight position={[-7, -3, 5]} intensity={45} color="#e78617" distance={28} />
      <pointLight position={[7, 4, 6]} intensity={30} color="#f4a442" distance={26} />

      <CameraRig progressRef={progressRef} reduced={reduced} />
      <HeroBook progressRef={progressRef} reduced={reduced} materials={materials} />
      <BackgroundProps reduced={reduced} materials={materials} />

      <SparkleField
        count={80}
        color="#f4a442"
        area={[24, 16, 10]}
        size={8}
        seed={23}
        paused={reduced}
      />
      <SparkleField
        count={40}
        color="#ffe9c4"
        area={[26, 16, 12]}
        size={6}
        seed={41}
        opacity={0.7}
        paused={reduced}
      />
    </>
  );
}

export function NotaMaestroScene3D({ progressRef, reduced }: SceneProps) {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 13], fov: 45 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <NotaMaestroSceneContent progressRef={progressRef} reduced={reduced} />
    </Canvas>
  );
}
