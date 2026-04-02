import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

function useParallax(s = 0.3) {
  const { pointer } = useThree()
  return { mx: pointer.x * s, my: pointer.y * s }
}

/* ===== About: Premium Floating Book + Cap ===== */
function BookInner() {
  const g = useRef()
  const m = useParallax(0.4)
  useFrame((st) => {
    const t = st.clock.getElapsedTime()
    g.current.rotation.y = Math.sin(t * 0.4) * 0.25 + m.mx * 0.6
    g.current.rotation.x = 0.15 + Math.sin(t * 0.3) * 0.08 + m.my * 0.3
    g.current.position.y = Math.sin(t * 0.7) * 0.12
  })
  return (
    <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.25}>
      <group ref={g} scale={0.85}>
        <RoundedBox args={[1.8, 0.12, 2.3]} radius={0.04} smoothness={4} position={[0, 0.07, 0]}>
          <meshPhysicalMaterial color="#3b82f6" metalness={0.3} roughness={0.5} clearcoat={0.4} clearcoatRoughness={0.3} />
        </RoundedBox>
        <RoundedBox args={[1.7, 0.1, 2.2]} radius={0.02} smoothness={4} position={[0.02, 0, 0]}>
          <meshStandardMaterial color="#f8fafc" roughness={0.9} />
        </RoundedBox>
        <RoundedBox args={[1.8, 0.12, 2.3]} radius={0.04} smoothness={4} position={[0, -0.07, 0]}>
          <meshPhysicalMaterial color="#2563eb" metalness={0.3} roughness={0.5} clearcoat={0.4} />
        </RoundedBox>
        <mesh position={[-0.9, 0, 0]}>
          <boxGeometry args={[0.05, 0.28, 2.3]} />
          <meshPhysicalMaterial color="#1d4ed8" metalness={0.5} roughness={0.4} />
        </mesh>
        <mesh position={[0.2, 0.1, -0.9]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.06, 0.5, 0.01]} />
          <meshStandardMaterial color="#ef4444" roughness={0.6} />
        </mesh>
        <group position={[0.1, 0.32, 0.1]} rotation={[0, 0.2, 0]}>
          <mesh><boxGeometry args={[0.8, 0.035, 0.8]} /><meshPhysicalMaterial color="#1e293b" clearcoat={0.6} /></mesh>
          <mesh position={[0, 0.1, 0]}><cylinderGeometry args={[0.07, 0.07, 0.18, 8]} /><meshPhysicalMaterial color="#1e293b" clearcoat={0.6} /></mesh>
          <mesh position={[0.32, 0.04, 0]}><sphereGeometry args={[0.035, 8, 8]} /><meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={0.4} /></mesh>
        </group>
      </group>
    </Float>
  )
}

export function AboutScene() {
  return (
    <Canvas camera={{ position: [0, 1.2, 4.5], fov: 36 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} color="#93c5fd" />
      <directionalLight position={[-4, 2, 3]} intensity={0.25} color="#c4b5fd" />
      <BookInner />
    </Canvas>
  )
}

/* ===== Projects: Polished Gem Cube ===== */
function CubeInner() {
  const core = useRef()
  const shell = useRef()
  const m = useParallax(0.5)
  useFrame((st) => {
    const t = st.clock.getElapsedTime()
    core.current.rotation.x = t * 0.12 + m.my * 0.4
    core.current.rotation.y = t * 0.15 + m.mx * 0.4
    shell.current.rotation.x = -t * 0.08
    shell.current.rotation.y = -t * 0.1
  })

  return (
    <group>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshPhysicalMaterial
          color="#6366f1" metalness={0.85} roughness={0.12}
          clearcoat={1} clearcoatRoughness={0.05}
          envMapIntensity={1.5}
          transparent opacity={0.8}
        />
      </mesh>
      <mesh scale={0.45}>
        <octahedronGeometry args={[1]} />
        <meshPhysicalMaterial color="#06b6d4" emissive="#0891b2" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} clearcoat={1} transparent opacity={0.7} />
      </mesh>
      <mesh ref={shell} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.06} />
      </mesh>
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2
        return (
          <Float key={i} speed={1.5 + i * 0.2} floatIntensity={0.3}>
            <mesh position={[Math.cos(a) * 2.2, Math.sin(a * 1.3) * 0.6, Math.sin(a) * 2.2]}>
              <octahedronGeometry args={[0.05]} />
              <meshStandardMaterial color="#818cf8" emissive="#6366f1" emissiveIntensity={1.2} />
            </mesh>
          </Float>
        )
      })}
    </group>
  )
}

export function ProjectsScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.5], fov: 40 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[4, 4, 4]} intensity={0.7} color="#93c5fd" />
      <directionalLight position={[-3, -1, 3]} intensity={0.3} color="#c4b5fd" />
      <pointLight position={[0, 0, 3]} intensity={0.15} color="#06b6d4" />
      <CubeInner />
    </Canvas>
  )
}

/* ===== Skills: Neural Network ===== */
function NetworkInner() {
  const g = useRef()
  const m = useParallax(0.3)
  const nodes = useMemo(() => {
    const cols = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#06b6d4', '#ef4444']
    return Array.from({ length: 18 }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / 18)
      const theta = Math.sqrt(18 * Math.PI) * phi
      const r = 2
      return {
        pos: [r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi)],
        color: cols[i % cols.length], size: 0.06 + Math.random() * 0.06,
      }
    })
  }, [])

  useFrame((st) => {
    const t = st.clock.getElapsedTime()
    g.current.rotation.y = t * 0.06 + m.mx * 0.4
    g.current.rotation.x = Math.sin(t * 0.04) * 0.15 + m.my * 0.2
  })

  return (
    <group ref={g}>
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhysicalMaterial color="#6366f1" metalness={0.8} roughness={0.15} clearcoat={1} clearcoatRoughness={0.05} envMapIntensity={2} />
      </mesh>
      {nodes.map((n, i) => (
        <Float key={i} speed={0.8 + i * 0.08} floatIntensity={0.15}>
          <mesh position={n.pos}>
            <sphereGeometry args={[n.size, 12, 12]} />
            <meshPhysicalMaterial color={n.color} emissive={n.color} emissiveIntensity={0.4} metalness={0.6} roughness={0.25} clearcoat={0.5} />
          </mesh>
        </Float>
      ))}
      {[1, 1.5, 2.1].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 3.5 + i * 0.5, i * 0.7, 0]}>
          <torusGeometry args={[r, 0.006, 6, 80]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  )
}

export function SkillsScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 42 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 3, 5]} intensity={0.6} color="#93c5fd" />
      <directionalLight position={[-3, -2, 3]} intensity={0.25} color="#c4b5fd" />
      <NetworkInner />
    </Canvas>
  )
}

/* ===== Awards: Polished Trophy ===== */
function TrophyInner() {
  const g = useRef()
  const star = useRef()
  const m = useParallax(0.4)
  useFrame((st) => {
    const t = st.clock.getElapsedTime()
    g.current.rotation.y = t * 0.25 + m.mx * 0.5
    g.current.position.y = Math.sin(t * 0.6) * 0.08
    star.current.rotation.y = t * 1.5
    star.current.position.y = 1.55 + Math.sin(t * 1.2) * 0.06
  })

  return (
    <Float speed={0.8} rotationIntensity={0.06} floatIntensity={0.2}>
      <group ref={g}>
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.5, 0.3, 0.7, 24]} />
          <meshPhysicalMaterial color="#fbbf24" metalness={0.95} roughness={0.08} clearcoat={1} clearcoatRoughness={0.02} />
        </mesh>
        {[-1, 1].map(s => (
          <mesh key={s} position={[s * 0.58, 0.78, 0]} rotation={[0, 0, s * -0.25]}>
            <torusGeometry args={[0.17, 0.035, 12, 24, Math.PI]} />
            <meshPhysicalMaterial color="#fbbf24" metalness={0.95} roughness={0.08} clearcoat={1} />
          </mesh>
        ))}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.05, 0.07, 0.3, 12]} />
          <meshPhysicalMaterial color="#fbbf24" metalness={0.95} roughness={0.08} clearcoat={1} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.3, 0.35, 0.08, 24]} />
          <meshPhysicalMaterial color="#fbbf24" metalness={0.95} roughness={0.08} clearcoat={1} />
        </mesh>
        <mesh position={[0, -0.02, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.03, 24]} />
          <meshPhysicalMaterial color="#27272a" metalness={0.7} roughness={0.2} clearcoat={0.8} />
        </mesh>
        <mesh ref={star} position={[0, 1.55, 0]}>
          <octahedronGeometry args={[0.12]} />
          <meshPhysicalMaterial color="#fff" emissive="#fbbf24" emissiveIntensity={2} metalness={0.3} clearcoat={1} />
        </mesh>
        {Array.from({ length: 10 }, (_, i) => {
          const a = (i / 10) * Math.PI * 2
          return (
            <Float key={i} speed={1.5 + Math.random()} floatIntensity={0.4}>
              <mesh position={[Math.cos(a) * (1 + Math.random() * 0.4), 0.4 + Math.random() * 1.2, Math.sin(a) * (1 + Math.random() * 0.4)]}>
                <octahedronGeometry args={[0.02 + Math.random() * 0.02]} />
                <meshStandardMaterial color="#fbbf24" emissive="#f59e0b" emissiveIntensity={1.5} />
              </mesh>
            </Float>
          )
        })}
      </group>
    </Float>
  )
}

export function AwardsScene() {
  return (
    <Canvas camera={{ position: [0, 0.8, 4], fov: 38 }} dpr={[1, 2]} gl={{ alpha: true, antialias: true }} style={{ background: 'transparent' }}>
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 5, 4]} intensity={0.8} color="#fde68a" />
      <directionalLight position={[-2, 0, 3]} intensity={0.2} color="#fbbf24" />
      <TrophyInner />
    </Canvas>
  )
}
