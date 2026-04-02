import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

function GlassKnot() {
  const mesh = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = t * 0.06 + pointer.y * 0.12
    mesh.current.rotation.y = t * 0.08 + pointer.x * 0.12
    mesh.current.position.y = Math.sin(t * 0.4) * 0.08
  })

  return (
    <mesh ref={mesh} scale={1.1}>
      <torusKnotGeometry args={[1, 0.35, 200, 40, 2, 3]} />
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={0.4}
        chromaticAberration={0.15}
        anisotropy={0.2}
        distortion={0.3}
        distortionScale={0.15}
        temporalDistortion={0.1}
        iridescence={1}
        iridescenceIOR={1.5}
        iridescenceThicknessRange={[100, 400]}
        color="#a5b4fc"
        roughness={0.05}
        metalness={0.1}
        envMapIntensity={1.5}
      />
    </mesh>
  )
}

function InnerCore() {
  const mesh = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.y = -t * 0.15
    mesh.current.rotation.z = t * 0.1
  })
  return (
    <mesh ref={mesh} scale={0.5}>
      <octahedronGeometry args={[1, 0]} />
      <meshPhysicalMaterial
        color="#6366f1"
        emissive="#4338ca"
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0}
        envMapIntensity={2}
      />
    </mesh>
  )
}

function OrbitingGems() {
  const group = useRef()
  const gems = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      radius: 2.2 + (i % 2) * 0.4,
      y: (i % 3 - 1) * 0.4,
      size: 0.06 + (i % 3) * 0.03,
      speed: 0.8 + i * 0.15,
      color: ['#818cf8', '#6ee7b7', '#7dd3fc', '#fbbf24', '#c4b5fd', '#67e8f9', '#a78bfa', '#34d399'][i],
    })), [])

  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.04
  })

  return (
    <group ref={group}>
      {gems.map((g, i) => (
        <Float key={i} speed={g.speed} floatIntensity={0.25} rotationIntensity={0.4}>
          <mesh position={[Math.cos(g.angle) * g.radius, g.y, Math.sin(g.angle) * g.radius]}>
            <octahedronGeometry args={[g.size]} />
            <meshPhysicalMaterial
              color={g.color}
              emissive={g.color}
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
              clearcoat={1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function AmbientRings() {
  const group = useRef()
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    group.current.children.forEach((ring, i) => {
      ring.rotation.x = Math.sin(t * 0.1 + i) * 0.3
      ring.rotation.z = t * (0.02 + i * 0.01)
    })
  })

  return (
    <group ref={group}>
      {[1.6, 2.0, 2.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 4 + i * 0.4, i * 0.5, 0]}>
          <torusGeometry args={[r, 0.005, 6, 100]} />
          <meshBasicMaterial color="#818cf8" transparent opacity={0.06 + i * 0.02} />
        </mesh>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['transparent']} />

      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e0e7ff" />
      <directionalLight position={[-4, -2, 4]} intensity={0.3} color="#c7d2fe" />
      <spotLight position={[0, 8, 0]} intensity={0.4} color="#818cf8" angle={0.5} penumbra={1} />

      <Environment preset="city" environmentIntensity={0.5} />

      <GlassKnot />
      <InnerCore />
      <OrbitingGems />
      <AmbientRings />
    </Canvas>
  )
}
