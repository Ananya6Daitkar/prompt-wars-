import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// ─── Grandstand rings ────────────────────────────────────────────────────────
function GrandstandRings() {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.08
  })

  const rings = [
    { radius: 4.2, tube: 0.06, color: '#00d9ff', opacity: 0.55, segments: 120 },
    { radius: 5.8, tube: 0.05, color: '#a855f7', opacity: 0.45, segments: 120 },
    { radius: 7.2, tube: 0.04, color: '#00d9ff', opacity: 0.3,  segments: 120 },
  ]

  return (
    <group ref={group}>
      {rings.map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[r.radius, r.tube, 16, r.segments]} />
          <meshBasicMaterial color={r.color} transparent opacity={r.opacity} wireframe={false} />
        </mesh>
      ))}
      {/* Wireframe structural arches */}
      {[0, 1, 2].map(i => (
        <mesh key={`arch-${i}`} rotation={[Math.PI / 2, (i * Math.PI) / 3, 0]}>
          <torusGeometry args={[6.5, 0.02, 8, 80, Math.PI]} />
          <meshBasicMaterial color="#00d9ff" transparent opacity={0.18} wireframe />
        </mesh>
      ))}
    </group>
  )
}

// ─── Holographic wireframe stadium shell ─────────────────────────────────────
function StadiumShell() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y -= delta * 0.04
  })

  return (
    <group>
      {/* Outer shell — wireframe torus */}
      <mesh ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[7.8, 1.8, 12, 80]} />
        <meshBasicMaterial color="#a855f7" transparent opacity={0.08} wireframe />
      </mesh>
      {/* Inner seating bowl */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[5.0, 1.2, 10, 60]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.06} wireframe />
      </mesh>
    </group>
  )
}

// ─── Reflective pitch floor ───────────────────────────────────────────────────
function PitchFloor() {
  return (
    <group>
      {/* Polished black marble floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]}>
        <circleGeometry args={[12, 64]} />
        <meshStandardMaterial
          color="#050810"
          roughness={0.05}
          metalness={0.95}
          envMapIntensity={1.5}
        />
      </mesh>
      {/* Field markings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.79, 0]}>
        <ringGeometry args={[2.8, 2.85, 64]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.79, 0]}>
        <ringGeometry args={[1.4, 1.44, 64]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.15} />
      </mesh>
      {/* Center spot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.79, 0]}>
        <circleGeometry args={[0.12, 32]} />
        <meshBasicMaterial color="#00ff88" transparent opacity={0.5} />
      </mesh>
    </group>
  )
}

// ─── Coordinate grid ─────────────────────────────────────────────────────────
function CoordGrid() {
  const gridRef = useRef<THREE.GridHelper>(null)
  const grid = useMemo(() => {
    const g = new THREE.GridHelper(24, 24, '#00d9ff', '#0d1b3e')
    const mat = g.material as THREE.LineBasicMaterial
    mat.transparent = true
    mat.opacity = 0.12
    return g
  }, [])

  return <primitive ref={gridRef} object={grid} position={[0, -1.78, 0]} />
}

// ─── Telemetry spotlights ─────────────────────────────────────────────────────
function TelemetrySpotlights() {
  const refs = [
    useRef<THREE.SpotLight>(null),
    useRef<THREE.SpotLight>(null),
    useRef<THREE.SpotLight>(null),
    useRef<THREE.SpotLight>(null),
  ]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const configs = [
      { x: 8, z: 8, phase: 0 },
      { x: -8, z: 8, phase: Math.PI / 2 },
      { x: -8, z: -8, phase: Math.PI },
      { x: 8, z: -8, phase: (3 * Math.PI) / 2 },
    ]
    refs.forEach((ref, i) => {
      if (ref.current) {
        const c = configs[i]
        ref.current.target.position.set(
          Math.sin(t * 0.4 + c.phase) * 3,
          -1.8,
          Math.cos(t * 0.4 + c.phase) * 3
        )
        ref.current.target.updateMatrixWorld()
      }
    })
  })

  const spotConfigs = [
    { pos: [8, 6, 8] as [number,number,number],   color: '#00d9ff', intensity: 40 },
    { pos: [-8, 6, 8] as [number,number,number],  color: '#a855f7', intensity: 35 },
    { pos: [-8, 6, -8] as [number,number,number], color: '#00d9ff', intensity: 40 },
    { pos: [8, 6, -8] as [number,number,number],  color: '#a855f7', intensity: 35 },
  ]

  return (
    <>
      {spotConfigs.map((s, i) => (
        <spotLight
          key={i}
          ref={refs[i]}
          position={s.pos}
          color={s.color}
          intensity={s.intensity}
          angle={0.3}
          penumbra={0.8}
          distance={20}
          castShadow={false}
        />
      ))}
    </>
  )
}

// ─── Central volumetric glow ──────────────────────────────────────────────────
function CentralGlow() {
  const lightRef = useRef<THREE.PointLight>(null)

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime()
      lightRef.current.intensity = 18 + Math.sin(t * 1.2) * 4
    }
  })

  return (
    <>
      <pointLight ref={lightRef} position={[0, 0.5, 0]} color="#00d9ff" intensity={18} distance={12} />
      {/* Glow sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial color="#00d9ff" transparent opacity={0.9} />
      </mesh>
      {/* Halo rings */}
      {[0.4, 0.7, 1.1].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <ringGeometry args={[r, r + 0.015, 64]} />
          <meshBasicMaterial color="#00d9ff" transparent opacity={0.3 - i * 0.08} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </>
  )
}

// ─── Floating data particles ──────────────────────────────────────────────────
function DataParticles() {
  const count = 120
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const radius = 3 + Math.random() * 6
      arr[i * 3]     = Math.cos(angle) * radius
      arr[i * 3 + 1] = (Math.random() - 0.5) * 4
      arr[i * 3 + 2] = Math.sin(angle) * radius
    }
    return arr
  }, [])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#00d9ff" size={0.04} transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

// ─── Gate beacons ─────────────────────────────────────────────────────────────
function GateBeacons() {
  const beaconRef = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (beaconRef.current) {
      beaconRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh
        const t = clock.getElapsedTime()
        const mat = mesh.material as THREE.MeshBasicMaterial
        mat.opacity = 0.4 + Math.sin(t * 2 + i * 0.8) * 0.3
      })
    }
  })

  const gates = [
    { angle: 0 }, { angle: Math.PI / 4 }, { angle: Math.PI / 2 },
    { angle: (3 * Math.PI) / 4 }, { angle: Math.PI }, { angle: (5 * Math.PI) / 4 },
    { angle: (3 * Math.PI) / 2 }, { angle: (7 * Math.PI) / 4 },
  ]

  return (
    <group ref={beaconRef}>
      {gates.map((g, i) => {
        const x = Math.cos(g.angle) * 7.8
        const z = Math.sin(g.angle) * 7.8
        const color = i % 2 === 0 ? '#00d9ff' : '#a855f7'
        return (
          <mesh key={i} position={[x, -1.5, z]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshBasicMaterial color={color} transparent opacity={0.7} />
          </mesh>
        )
      })}
    </group>
  )
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      {/* Fog for deep dark horizon */}
      <fog attach="fog" args={['#050810', 18, 60]} />

      {/* Ambient */}
      <ambientLight intensity={0.15} color="#0d1b3e" />

      {/* Components */}
      <GrandstandRings />
      <StadiumShell />
      <PitchFloor />
      <CoordGrid />
      <TelemetrySpotlights />
      <CentralGlow />
      <DataParticles />
      <GateBeacons />
    </>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
interface CyberStadiaProps {
  height?: number | string
  interactive?: boolean
}

export default function CyberStadia({ height = 520, interactive = false }: CyberStadiaProps) {
  return (
    <div style={{ width: '100%', height, position: 'relative' }}>
      <Canvas
        shadows={false}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 5, 14]} fov={55} />
        {interactive && <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} maxPolarAngle={Math.PI / 2.2} minPolarAngle={Math.PI / 6} />}
        {!interactive && <AutoRotate />}
        <Scene />
      </Canvas>
    </div>
  )
}

function AutoRotate() {
  const groupRef = useRef<THREE.Group>(null)
  useFrame((state) => {
    state.camera.position.x = Math.sin(state.clock.getElapsedTime() * 0.12) * 14
    state.camera.position.z = Math.cos(state.clock.getElapsedTime() * 0.12) * 14
    state.camera.lookAt(0, 0, 0)
  })
  return <group ref={groupRef} />
}
