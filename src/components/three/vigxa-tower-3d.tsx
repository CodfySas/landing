"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { mulberry32, ProceduralEnvironment, SparkleField } from "./helpers";

/**
 * Vigxa 3D tower — a realistic night-time high-rise: 14 floors in three
 * setback tiers, concrete slabs, dark reflective curtain-wall glass,
 * randomly lit windows, corner columns, a glowing lobby podium, parapet,
 * rooftop plant room and a beacon mast.
 *
 * It erects floor-by-floor as `buildLevelRef` goes 1→6 (driven by the
 * scrollytelling section outside the canvas) and spins slowly. The canvas is
 * positioned/scaled by the parent (framer-motion).
 */

type TowerProps = {
  /** 1..6 — construction stage (floors ramp in over 1→5.6, antenna 5→6). */
  buildLevelRef: RefObject<number>;
  reduced: boolean;
};

/* ------------------------------------------------------------------ */
/* Layout constants                                                   */
/* ------------------------------------------------------------------ */

const FLOOR_H = 0.38;
const PODIUM_H = 0.55;

type Tier = { from: number; to: number; w: number; d: number };
const TIERS: Tier[] = [
  { from: 0, to: 5, w: 2.9, d: 2.2 },
  { from: 6, to: 10, w: 2.35, d: 1.8 },
  { from: 11, to: 13, w: 1.75, d: 1.35 },
];
const FLOOR_COUNT = 14;
const TOWER_TOP = PODIUM_H + FLOOR_COUNT * FLOOR_H; // 5.87
/** Center the whole building (incl. mast) on y=0 for the parent group. */
const CENTER_Y = -(TOWER_TOP + 1.0) / 2;

function tierOf(floor: number): Tier {
  return TIERS.find((t) => floor >= t.from && floor <= t.to)!;
}

/** 0..1 how built floor `i` is at build level `b` (1..6). At b=1 the first
 * floor is already rising over the podium so the "site" never looks empty. */
function floorAppear(b: number, i: number): number {
  return Math.max(0, Math.min(1, ((b - 0.8) * FLOOR_COUNT) / 4.8 - i));
}

/* ------------------------------------------------------------------ */
/* Shared materials                                                   */
/* ------------------------------------------------------------------ */

function useTowerMaterials() {
  const materials = useMemo(() => {
    const concrete = new THREE.MeshStandardMaterial({
      color: "#8a7c66",
      roughness: 0.92,
      metalness: 0.04,
    });
    const concreteDark = new THREE.MeshStandardMaterial({
      color: "#4d443a",
      roughness: 0.95,
      metalness: 0.02,
    });
    const glass = new THREE.MeshPhysicalMaterial({
      color: "#2c2416",
      metalness: 0.75,
      roughness: 0.16,
      envMapIntensity: 1.35,
    });
    const lobbyGlow = new THREE.MeshBasicMaterial({
      color: "#ffd27a",
      toneMapped: false,
    });
    return { concrete, concreteDark, glass, lobbyGlow };
  }, []);

  useEffect(() => {
    return () => {
      Object.values(materials).forEach((m) => m.dispose());
    };
  }, [materials]);

  return materials;
}

type Materials = ReturnType<typeof useTowerMaterials>;

/* ------------------------------------------------------------------ */
/* One floor: slab + glass band + lit windows                          */
/* ------------------------------------------------------------------ */

function Floor({
  index,
  buildLevelRef,
  materials,
}: {
  index: number;
  buildLevelRef: RefObject<number>;
  materials: Materials;
}) {
  const group = useRef<THREE.Group>(null);
  const { w, d } = tierOf(index);
  const bottom = PODIUM_H + index * FLOOR_H;
  const glassH = FLOOR_H - 0.09;

  const windowMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        transparent: true,
        toneMapped: false,
        depthWrite: false,
      }),
    []
  );
  useEffect(() => () => windowMat.dispose(), [windowMat]);

  // Window quads on the 4 facades — thin instanced boxes sitting just
  // outside the glass, some lit warm, most dark (curtain-wall panels).
  const windowsRef = useRef<THREE.InstancedMesh>(null);
  const { count: windowCount, nx, nz } = useMemo(() => {
    const nx = Math.max(3, Math.round(w / 0.27));
    const nz = Math.max(3, Math.round(d / 0.27));
    return { count: (nx + nz) * 2, nx, nz };
  }, [w, d]);

  useEffect(() => {
    const mesh = windowsRef.current;
    if (!mesh) return;
    const rand = mulberry32(9100 + index * 37);
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    const midY = 0.09 + glassH / 2;
    let i = 0;

    const place = (
      n: number,
      span: number,
      axis: "x" | "z",
      offset: number,
      rotY: number
    ) => {
      const bay = span / n;
      for (let k = 0; k < n; k++) {
        const along = -span / 2 + bay * (k + 0.5);
        if (axis === "x") dummy.position.set(along, midY, offset);
        else dummy.position.set(offset, midY, along);
        dummy.rotation.set(0, rotY, 0);
        dummy.scale.set(bay * 0.78, glassH * 0.66, 0.015);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
        const lit = rand() < 0.42;
        if (lit) {
          // warm household lights with slight per-window variation
          color.setHSL(0.1 + rand() * 0.02, 0.85, 0.62 + rand() * 0.15);
        } else {
          color.set("#181209");
        }
        mesh.setColorAt(i, color);
        i++;
      }
    };

    place(nx, w, "x", d / 2 + 0.008, 0);
    place(nx, w, "x", -(d / 2 + 0.008), 0);
    place(nz, d, "z", w / 2 + 0.008, Math.PI / 2);
    place(nz, d, "z", -(w / 2 + 0.008), Math.PI / 2);

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [index, w, d, nx, nz, glassH]);

  useFrame(() => {
    if (!group.current) return;
    const a = floorAppear(buildLevelRef.current ?? 6, index);
    group.current.scale.y = Math.max(0.0001, a);
    group.current.visible = a > 0.001;
    windowMat.opacity = a;
  });

  return (
    <group ref={group} position={[0, bottom, 0]}>
      {/* Slab band */}
      <mesh material={materials.concrete} position={[0, 0.045, 0]}>
        <boxGeometry args={[w + 0.1, 0.09, d + 0.1]} />
      </mesh>
      {/* Curtain-wall glass */}
      <mesh material={materials.glass} position={[0, 0.09 + glassH / 2, 0]}>
        <boxGeometry args={[w, glassH, d]} />
      </mesh>
      {/* Windows */}
      <instancedMesh
        ref={windowsRef}
        args={[undefined, undefined, windowCount]}
        material={windowMat}
        renderOrder={2}
        frustumCulled={false}
      >
        <boxGeometry args={[1, 1, 1]} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Corner columns per tier                                            */
/* ------------------------------------------------------------------ */

function TierColumns({
  tier,
  buildLevelRef,
  materials,
}: {
  tier: Tier;
  buildLevelRef: RefObject<number>;
  materials: Materials;
}) {
  const group = useRef<THREE.Group>(null);
  const floors = tier.to - tier.from + 1;
  const height = floors * FLOOR_H;
  const bottom = PODIUM_H + tier.from * FLOOR_H;
  const hx = tier.w / 2 - 0.02;
  const hz = tier.d / 2 - 0.02;

  useFrame(() => {
    if (!group.current) return;
    const b = buildLevelRef.current ?? 6;
    // Column grows with the tier's floors.
    const a =
      (floorAppear(b, tier.from) === 0
        ? 0
        : Math.min(
            1,
            (((b - 0.8) * FLOOR_COUNT) / 4.8 - tier.from) / floors
          ));
    group.current.scale.y = Math.max(0.0001, a);
    group.current.visible = a > 0.001;
  });

  return (
    <group ref={group} position={[0, bottom, 0]}>
      {[
        [hx, hz],
        [hx, -hz],
        [-hx, hz],
        [-hx, -hz],
      ].map(([x, z], i) => (
        <mesh
          key={i}
          material={materials.concreteDark}
          position={[x, height / 2, z]}
        >
          <boxGeometry args={[0.13, height, 0.13]} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Podium (lobby), roof and ground                                    */
/* ------------------------------------------------------------------ */

function Podium({ materials }: { materials: Materials }) {
  const w = 3.5;
  const d = 2.75;
  return (
    <group>
      {/* Lobby glass band, glowing from inside */}
      <mesh material={materials.lobbyGlow} position={[0, 0.24, 0]}>
        <boxGeometry args={[w - 0.16, 0.34, d - 0.16]} />
      </mesh>
      <mesh material={materials.glass} position={[0, 0.24, 0]}>
        <boxGeometry args={[w, 0.4, d]} />
      </mesh>
      {/* Podium roof slab */}
      <mesh material={materials.concrete} position={[0, 0.5, 0]}>
        <boxGeometry args={[w + 0.14, 0.1, d + 0.14]} />
      </mesh>
      {/* Entrance canopy */}
      <mesh material={materials.concreteDark} position={[0, 0.42, d / 2 + 0.3]}>
        <boxGeometry args={[1.1, 0.05, 0.6]} />
      </mesh>
      {/* Warm light spilling out of the lobby */}
      <pointLight position={[0, 0.35, 0]} intensity={5} color="#ffd27a" distance={4.5} />
    </group>
  );
}

function Roof({
  buildLevelRef,
  reduced,
  materials,
}: TowerProps & { materials: Materials }) {
  const group = useRef<THREE.Group>(null);
  const beacon = useRef<THREE.MeshBasicMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const top = TIERS[2];

  useFrame((state) => {
    if (!group.current) return;
    const b = buildLevelRef.current ?? 6;
    const a = Math.max(0, Math.min(1, b - 5));
    group.current.scale.setScalar(Math.max(0.0001, a));
    group.current.visible = a > 0.001;
    const pulse = reduced ? 1 : 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 3.4);
    if (beacon.current) beacon.current.opacity = a * (0.5 + 0.5 * pulse);
    if (light.current) light.current.intensity = 5 * a * pulse;
  });

  return (
    <group ref={group} position={[0, TOWER_TOP, 0]}>
      {/* Parapet */}
      <mesh material={materials.concrete} position={[0, 0.05, 0]}>
        <boxGeometry args={[top.w + 0.12, 0.1, top.d + 0.12]} />
      </mesh>
      {/* Plant room */}
      <mesh material={materials.concreteDark} position={[-0.35, 0.23, -0.2]}>
        <boxGeometry args={[0.7, 0.26, 0.55]} />
      </mesh>
      {/* AC units */}
      <mesh material={materials.concreteDark} position={[0.45, 0.16, 0.3]}>
        <boxGeometry args={[0.3, 0.12, 0.3]} />
      </mesh>
      {/* Mast */}
      <mesh position={[0.2, 0.55, 0.1]}>
        <cylinderGeometry args={[0.018, 0.035, 0.9, 10]} />
        <meshStandardMaterial color="#c9b48a" roughness={0.4} metalness={0.8} />
      </mesh>
      {/* Beacon */}
      <mesh position={[0.2, 1.02, 0.1]}>
        <sphereGeometry args={[0.075, 16, 16]} />
        <meshBasicMaterial ref={beacon} color="#ff6a4a" transparent toneMapped={false} />
      </mesh>
      <pointLight ref={light} position={[0.2, 1.02, 0.1]} color="#ff7a55" distance={5} />
    </group>
  );
}

function Ground() {
  // Kept comfortably inside the camera frustum — a clipped plaza reads as a
  // broken model at the canvas edges.
  return (
    <group position={[0, -0.05, 0]}>
      <mesh>
        <cylinderGeometry args={[2.55, 2.55, 0.1, 48]} />
        <meshStandardMaterial color="#171209" roughness={0.95} metalness={0.02} />
      </mesh>
      {/* Plaza edge ring */}
      <mesh position={[0, 0.051, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.32, 2.5, 48]} />
        <meshBasicMaterial color="#f59e0b" transparent opacity={0.25} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Assembly                                                           */
/* ------------------------------------------------------------------ */

function Tower({ buildLevelRef, reduced }: TowerProps) {
  const spin = useRef<THREE.Group>(null);
  const bob = useRef<THREE.Group>(null);
  const materials = useTowerMaterials();
  const floors = useMemo(() => Array.from({ length: FLOOR_COUNT }, (_, i) => i), []);

  useFrame((state, delta) => {
    if (!spin.current || !bob.current) return;
    if (reduced) {
      spin.current.rotation.y = 0.6;
      return;
    }
    spin.current.rotation.y += delta * 0.14;
    bob.current.position.y = Math.sin(state.clock.elapsedTime * 0.9) * 0.07;
  });

  return (
    <group ref={bob}>
      <group ref={spin}>
        <group position={[0, CENTER_Y, 0]}>
          <Ground />
          <Podium materials={materials} />
          {floors.map((i) => (
            <Floor
              key={i}
              index={i}
              buildLevelRef={buildLevelRef}
              materials={materials}
            />
          ))}
          {TIERS.map((tier, i) => (
            <TierColumns
              key={i}
              tier={tier}
              buildLevelRef={buildLevelRef}
              materials={materials}
            />
          ))}
          <Roof buildLevelRef={buildLevelRef} reduced={reduced} materials={materials} />
        </group>
      </group>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    // Aiming slightly above center drops the building lower in the frame so
    // the plaza never kisses the bottom edge of the canvas.
    state.camera.lookAt(0, 0.5, 0);
  });
  return null;
}

export function VigxaTower3D({ buildLevelRef, reduced }: TowerProps) {
  return (
    <Canvas
      camera={{ position: [0, 2.6, 13.2], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
    >
      <ProceduralEnvironment />
      <ambientLight intensity={0.32} color="#ffe2b8" />
      {/* Warm key light (city glow) + cool moonlight fill */}
      <directionalLight position={[5, 7, 4]} intensity={1.2} color="#ffc46e" />
      <directionalLight position={[-6, 5, -5]} intensity={0.35} color="#7a8fc4" />
      <CameraRig />
      <Tower buildLevelRef={buildLevelRef} reduced={reduced} />
      <SparkleField
        count={22}
        color="#fcd34d"
        area={[6.5, 8, 6.5]}
        size={6}
        seed={11}
        opacity={0.7}
        paused={reduced}
      />
    </Canvas>
  );
}
