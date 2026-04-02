import { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial } from '@react-three/drei'

function Sphere() {
  const mesh = useRef()
  const { pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    mesh.current.rotation.x = t * 0.08 + pointer.y * 0.15
    mesh.current.rotation.y = t * 0.1 + pointer.x * 0.15
    mesh.current.position.y = Math.sin(t * 0.4) * 0.1
  })

  return (
    <mesh ref={mesh} scale={2.2}>
      <icosahedronGeometry args={[1, 8]} />
      <MeshDistortMaterial
        color="#4f7df5"
        emissive="#1e3a8a"
        emissiveIntensity={0.15}
        roughness={0.5}
        metalness={0.6}
        distort={0.12}
        speed={1.2}
        transparent
        opacity={0.35}
      />
    </mesh>
  )
}

export default function HeroSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} color="#93c5fd" intensity={0.4} />
      <directionalLight position={[-3, -2, 4]} color="#818cf8" intensity={0.15} />
      <Sphere />
    </Canvas>
  )
}
