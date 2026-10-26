import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

// --- 1. HERO GLASS SCENE (Top 3D Artifact) ---
function HeroGlassScene({ scrollYProgress }) {
  const group = useRef()
  const coreRef = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    const scroll = scrollYProgress.get()
    const t = state.clock.getElapsedTime()
    const isMobile = viewport.width < 5
    const targetX = isMobile ? 0 : 2.0
    const targetY = isMobile ? 1.5 : 0

    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY + scroll * 15, 0.05)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, -scroll * 10, 0.05)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX + scroll * 5, 0.05)
    
    group.current.rotation.y = t * 0.1 + state.pointer.x * 0.2
    group.current.rotation.x = t * 0.1 - state.pointer.y * 0.2
    
    if (coreRef.current) {
      coreRef.current.rotation.y = -t * 0.2
      coreRef.current.rotation.z = t * 0.15
    }
  })

  const gems = useMemo(() => Array.from({ length: 6 }, (_, i) => ({
    angle: (i / 6) * Math.PI * 2,
    radius: 1.8 + (i % 2) * 0.3,
    y: (i % 3 - 1) * 0.3,
    color: ['#818cf8', '#6ee7b7', '#7dd3fc', '#fbbf24', '#c4b5fd', '#67e8f9'][i],
  })), [])

  return (
    <group ref={group} position={[2, 0, 0]} scale={0.9}>
      <mesh>
        <torusKnotGeometry args={[1, 0.35, 200, 40, 2, 3]} />
        <MeshTransmissionMaterial
          backside samples={6} thickness={0.4} chromaticAberration={0.15}
          anisotropy={0.2} distortion={0.3} distortionScale={0.15}
          temporalDistortion={0.1} iridescence={1} iridescenceIOR={1.5}
          color="#a5b4fc" roughness={0.05} metalness={0.1} envMapIntensity={1.5}
        />
      </mesh>
      
      <mesh ref={coreRef} scale={0.5}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color="#6366f1" emissive="#4338ca" emissiveIntensity={0.8}
          metalness={1} roughness={0.05} clearcoat={1} envMapIntensity={2}
        />
      </mesh>

      {gems.map((g, i) => (
        <Float key={i} speed={1 + i * 0.2} floatIntensity={0.5} rotationIntensity={0.5}>
          <mesh position={[Math.cos(g.angle) * g.radius, g.y, Math.sin(g.angle) * g.radius]}>
            <octahedronGeometry args={[0.08]} />
            <meshPhysicalMaterial color={g.color} emissive={g.color} emissiveIntensity={0.6} metalness={0.9} roughness={0.1} clearcoat={1} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

// --- 2. MASSIVE GLOWING AMBIENT ORBS (Glassmorphism backdrop) ---
function AtmosphericOrbs({ scrollYProgress }) {
  const group = useRef()
  
  useFrame((state) => {
    const scroll = scrollYProgress.get()
    const t = state.clock.getElapsedTime()
    // Slowly rotate the entire ambient rig
    group.current.rotation.y = t * 0.05 + scroll * Math.PI
    group.current.position.y = scroll * 2
  })

  return (
    <group ref={group}>
      <mesh position={[-8, 5, -8]}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.15} />
      </mesh>
      <mesh position={[8, -5, -6]}>
        <sphereGeometry args={[5, 32, 32]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.15} />
      </mesh>
      <mesh position={[0, -12, -10]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

function FlowingParticles({ scrollYProgress }) {
  const group = useRef()
  const particles = useMemo(() => Array.from({ length: 40 }, () => ({
    pos: [(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 30 - 5, (Math.random() - 0.5) * 15 - 5],
    scale: Math.random() * 0.1 + 0.02,
    color: ['#38bdf8', '#818cf8', '#c084fc', '#e2e8f0'][Math.floor(Math.random() * 4)]
  })), [])

  useFrame((state) => {
    const scroll = scrollYProgress.get()
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = scroll * Math.PI * 0.5 + t * 0.01
    group.current.position.y = scroll * 10
  })

  return (
    <group ref={group}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.pos} scale={p.scale}>
          <octahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color={p.color} emissive={p.color} emissiveIntensity={0.6} metalness={0.9} clearcoat={1} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  )
}

// --- MAIN EXPORT ---
export default function Global3DScene({ showHero = true }) {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} color="#e0e7ff" />
      <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#c7d2fe" />
      <spotLight position={[0, 10, 0]} intensity={1.2} color="#8b5cf6" penumbra={1} angle={0.8} />

      <Environment preset="studio" environmentIntensity={0.8} />

      <AtmosphericOrbs scrollYProgress={scrollYProgress} />
      {showHero && <HeroGlassScene scrollYProgress={scrollYProgress} />}
      <FlowingParticles scrollYProgress={scrollYProgress} />
    </>
  )
}
