import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei'

function CoreObject() {
  const groupRef = useRef()
  const wireRef = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    const g = groupRef.current
    // Smooth auto-rotation + mouse parallax
    g.rotation.y = t * 0.12 + pointer.x * 0.4
    g.rotation.x = Math.sin(t * 0.08) * 0.15 + pointer.y * 0.3

    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.08
      wireRef.current.rotation.z = t * 0.05
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
      <group ref={groupRef}>
        {/* Core solid shape */}
        <mesh>
          <icosahedronGeometry args={[1.3, 1]} />
          <MeshDistortMaterial
            color="#3b82f6"
            emissive="#1e40af"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.9}
            distort={0.3}
            speed={1.8}
            transparent
            opacity={0.55}
          />
        </mesh>
        {/* Inner glow sphere */}
        <mesh scale={0.6}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial color="#60a5fa" transparent opacity={0.08} />
        </mesh>
        {/* Wireframe overlay */}
        <mesh ref={wireRef} scale={1.5}>
          <icosahedronGeometry args={[1, 1]} />
          <meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.06} />
        </mesh>
        {/* Outer wireframe ring */}
        <mesh scale={2.0}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.03} />
        </mesh>
      </group>
    </Float>
  )
}

function OrbitNodes() {
  const groupRef = useRef()
  const count = 10

  const nodes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const phi = Math.acos(-1 + (2 * i) / count)
      const theta = Math.sqrt(count * Math.PI) * phi
      const r = 3.0
      return {
        pos: [
          r * Math.cos(theta) * Math.sin(phi),
          r * Math.sin(theta) * Math.sin(phi),
          r * Math.cos(phi)
        ],
        size: 0.025 + Math.random() * 0.035
      }
    })
  }, [])

  useFrame((state) => {
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={1 + i * 0.15} floatIntensity={0.15}>
          <mesh position={node.pos}>
            <octahedronGeometry args={[node.size]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#3b82f6"
              emissiveIntensity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <ambientLight intensity={0.15} />
      <pointLight position={[5, 5, 5]} color="#3b82f6" intensity={0.6} />
      <pointLight position={[-5, -3, 3]} color="#06b6d4" intensity={0.3} />
      <pointLight position={[0, -5, 2]} color="#8b5cf6" intensity={0.15} />
      <CoreObject />
      <OrbitNodes />
      <Sparkles
        count={50}
        scale={9}
        size={1.0}
        speed={0.15}
        color="#60a5fa"
        opacity={0.3}
      />
    </Canvas>
  )
}
