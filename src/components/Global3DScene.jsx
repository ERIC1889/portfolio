import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Float, RoundedBox, Environment, ContactShadows, Text, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { useScroll } from 'framer-motion'

// --- 1. HERO GLASS SCENE ---
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

// --- 2. CUTE ROBOT (Dark Purple / Metallic) ---
function RobotScene({ scrollYProgress }) {
  const group = useRef()
  const headRef = useRef()
  const { viewport } = useThree()
  const isMobile = viewport.width < 5

  useFrame((state) => {
    const scroll = scrollYProgress.get()
    const t = state.clock.getElapsedTime()
    
    // Adjusted range to avoid overlap with Laptop: active 0.05 to 0.32
    const isActive = scroll >= 0.05 && scroll <= 0.32
    const targetY = isActive ? -0.5 : -15
    const targetZ = isActive ? 0 : -5
    const targetX = isActive ? (isMobile ? 0 : 2.5) : 8 
    
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05)
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.05)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX - (scroll * 2), 0.05)

    // Gentle hover
    group.current.position.y += Math.sin(t * 2) * 0.002

    // Head tracks mouse tracking
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, state.pointer.x * 0.8, 0.08)
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -state.pointer.y * 0.6, 0.08)
  })

  return (
    <group ref={group} position={[3, -15, -5]} scale={isMobile ? 0.7 : 0.9}>
      <Float speed={1.5} floatIntensity={0.2} floatingRange={[-0.05, 0.05]}>
        
        {/* Head */}
        <group ref={headRef} position={[0, 1.4, 0]}>
          <RoundedBox args={[1.5, 0.9, 0.8]} radius={0.15}>
            <meshPhysicalMaterial color="#3b0764" metalness={0.8} roughness={0.25} clearcoat={0.8} clearcoatRoughness={0.1} envMapIntensity={2} />
          </RoundedBox>
          <mesh position={[0, 0, -0.05]}>
             <RoundedBox args={[1.55, 0.95, 0.7]} radius={0.15}>
               <meshPhysicalMaterial color="#db2777" metalness={0.8} roughness={0.2} clearcoat={1} />
             </RoundedBox>
          </mesh>
          <mesh position={[-0.35, 0.05, 0.4]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1} />
          </mesh>
          <mesh position={[0.35, 0.05, 0.4]}>
            <sphereGeometry args={[0.15, 32, 32]} />
            <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={1} />
          </mesh>
          <mesh position={[0, 0, 0.41]}>
            <planeGeometry args={[1.3, 0.7]} />
            <meshPhysicalMaterial color="#1e1e1e" metalness={0.9} roughness={0.0} transmission={0.5} opacity={0.8} transparent />
          </mesh>
        </group>

        {/* Neck */}
        <mesh position={[0, 0.7, 0]}>
          <cylinderGeometry args={[0.15, 0.35, 0.6, 32]} />
          <meshPhysicalMaterial color="#000" metalness={0.9} roughness={0.4} clearcoat={0.5} />
        </mesh>

        {/* Small Body / Base */}
        <mesh position={[0, 0.4, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhysicalMaterial color="#000" metalness={0.9} roughness={0.4} clearcoat={0.5} />
        </mesh>
        
        {/* Legs / Stand */}
        <mesh position={[-0.15, 0.1, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.3, 16]} />
          <meshPhysicalMaterial color="#000" metalness={0.9} roughness={0.4} clearcoat={0.5} />
        </mesh>
        <mesh position={[0.15, 0.1, 0]}>
          <cylinderGeometry args={[0.08, 0.1, 0.3, 16]} />
          <meshPhysicalMaterial color="#000" metalness={0.9} roughness={0.4} clearcoat={0.5} />
        </mesh>

        {/* Cube Pedestal underneath */}
        <RoundedBox args={[1.2, 1.5, 1.2]} position={[0, -0.8, 0]} radius={0.05}>
          <meshPhysicalMaterial color="#3b0764" metalness={0.8} roughness={0.25} clearcoat={0.8} clearcoatRoughness={0.1} envMapIntensity={2} />
        </RoundedBox>

      </Float>
    </group>
  )
}

// --- 3. PREMIUM MACBOOK SCENE ---
function MacbookScene({ scrollYProgress }) {
  const group = useRef()
  const lidRef = useRef()
  const uiRef = useRef()
  const { viewport } = useThree()

  useFrame((state) => {
    const scroll = scrollYProgress.get()
    const t = state.clock.getElapsedTime()

    // Starts appearing at 0.38
    const isActive = scroll >= 0.38 && scroll <= 0.9
    const isMobile = viewport.width < 5

    const targetY = isActive ? (isMobile ? -1.0 : -0.5) : -15
    const targetX = isActive ? (isMobile ? 0 : -2.5) : -8

    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05)
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, 0.05)
    
    // Slight mouse follow rotation
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, 0.6 + state.pointer.x * 0.15, 0.04)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.25 - state.pointer.y * 0.1, 0.04)

    // Lid opening smoothly: Closed is Math.PI/2, Open is -0.3
    let lidAngle = Math.PI / 2
    if (scroll > 0.38 && scroll <= 0.44) {
       // Opening
       lidAngle = THREE.MathUtils.lerp(Math.PI / 2, -0.25, (scroll - 0.38) / 0.06)
    } else if (scroll > 0.44 && scroll <= 0.8) {
       // Fully open
       lidAngle = -0.25
    } else if (scroll > 0.8 && scroll <= 0.85) {
       // Closing
       lidAngle = THREE.MathUtils.lerp(-0.25, Math.PI / 2, (scroll - 0.8) / 0.05)
    }

    lidRef.current.rotation.x = THREE.MathUtils.lerp(lidRef.current.rotation.x, lidAngle, 0.08)

    // Holographic UI shrink factor so it folds completely back into the screen when closed
    if (uiRef.current) {
      // lidAngle ranges from -0.25 (fully open) to Math.PI/2 (closed, ~1.57)
      const openRatio = 1 - Math.max(0, Math.min(1, (lidRef.current.rotation.x + 0.25) / (Math.PI / 2 + 0.25)))
      const scaleVal = Math.max(0.0001, openRatio)
      uiRef.current.scale.setScalar(scaleVal)
    }
  })

  // Materials
  const spaceGrey = <meshPhysicalMaterial color="#8e9297" metalness={0.9} roughness={0.15} clearcoat={0.3} envMapIntensity={2.5} />
  const blackGlass = <meshPhysicalMaterial color="#000" metalness={1} roughness={0} clearcoat={1} envMapIntensity={3} />
  const matteBlack = <meshStandardMaterial color="#111" roughness={0.8} />

  return (
    <group ref={group} position={[-5, -15, 0]} scale={0.85}>
      <Float speed={1.5} floatIntensity={0.15} floatingRange={[-0.05, 0.05]}>
        
        {/* Base Chassis (Unibody) */}
        <RoundedBox args={[3.8, 0.08, 2.6]} radius={0.03} position={[0, -0.04, 0]} castShadow>
          {spaceGrey}
        </RoundedBox>

        {/* Footpads */}
        <mesh position={[-1.7, -0.09, -1.1]}><sphereGeometry args={[0.04, 16, 16]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[1.7, -0.09, -1.1]}><sphereGeometry args={[0.04, 16, 16]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[-1.7, -0.09, 1.1]}><sphereGeometry args={[0.04, 16, 16]} /><meshStandardMaterial color="#222" /></mesh>
        <mesh position={[1.7, -0.09, 1.1]}><sphereGeometry args={[0.04, 16, 16]} /><meshStandardMaterial color="#222" /></mesh>
        
        {/* Keyboard Well */}
        <group position={[0, 0, -0.3]}>
          <RoundedBox args={[3.2, 0.02, 1.4]} position={[0, 0.01, 0]} radius={0.01}>
            <meshStandardMaterial color="#242629" roughness={0.9} />
          </RoundedBox>
          {/* Key layout abstraction (minimalist) */}
          {Array.from({ length: 5 }).map((_, row) => 
            Array.from({ length: 14 }).map((_, col) => (
              <RoundedBox key={`${row}-${col}`} args={[0.2, 0.015, 0.22]} position={[-1.44 + col * 0.222, 0.02, -0.55 + row * 0.27]} radius={0.01}>
                {matteBlack}
              </RoundedBox>
            ))
          )}
        </group>

        {/* Trackpad */}
        <RoundedBox args={[1.6, 0.01, 0.8]} position={[0, 0, 0.8]} radius={0.01}>
           <meshPhysicalMaterial color="#7a7e84" metalness={0.9} roughness={0.25} />
        </RoundedBox>



        {/* Lid (Hinged slightly elevated at Y=0.06 to perfectly sit on keyboard) */}
        <group position={[0, 0.06, -1.25]}>
          <group ref={lidRef} rotation={[0, 0, 0]}>
            
            {/* Lid Shell */}
            <RoundedBox args={[3.8, 2.6, 0.05]} position={[0, 1.3, 0]} radius={0.03} castShadow>
              {spaceGrey}
            </RoundedBox>
            
            {/* Screen Glass Bezel Edge-to-Edge */}
            <RoundedBox args={[3.76, 2.56, 0.01]} position={[0, 1.3, 0.03]} radius={0.04}>
              {blackGlass}
            </RoundedBox>

            {/* Glowing Screen Content */}
            <group position={[0, 1.3, 0.04]}>
               {/* Wallpaper / Active screen */}
               <mesh>
                 <planeGeometry args={[3.6, 2.4]} />
                 <meshBasicMaterial color="#0f172a" />
               </mesh>
               
               {/* 3D UI floating OUT of the screen holographically */}
               <group ref={uiRef} position={[0, 0, 0]}>
                 <Float speed={2} floatIntensity={0.5} rotationIntensity={0.1}>
                   <RoundedBox args={[1.8, 1.0, 0.02]} position={[-0.6, 0.3, 0.2]} radius={0.03}>
                     <meshPhysicalMaterial color="#ffffff" transmission={0.9} opacity={0.8} transparent roughness={0} metalness={0.1} />
                   </RoundedBox>
                   <mesh position={[-0.6, 0.3, 0.22]}>
                     <planeGeometry args={[1.5, 0.7]} />
                     <meshBasicMaterial color="#38bdf8" />
                   </mesh>
                 </Float>

                 <Float speed={2.5} floatIntensity={0.4} rotationIntensity={0.2}>
                   <RoundedBox args={[0.8, 1.2, 0.02]} position={[0.9, -0.1, 0.3]} radius={0.03}>
                     <meshPhysicalMaterial color="#000" metalness={0.8} roughness={0.2} clearcoat={1} />
                   </RoundedBox>
                   {/* Neon ring */}
                   <mesh position={[0.9, 0.2, 0.32]}>
                     <torusGeometry args={[0.2, 0.02, 16, 32]} />
                     <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
                   </mesh>
                   {/* Floating pill */}
                   <RoundedBox args={[0.5, 0.15, 0.02]} position={[0.9, -0.4, 0.32]} radius={0.05}>
                     <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
                   </RoundedBox>
                 </Float>
               </group>
            </group>
            
          </group>
        </group>
      </Float>
    </group>
  )
}

// --- 4. MASSIVE GLOWING AMBIENT ORBS (Glassmorphism backdrop) ---
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
export default function Global3DScene() {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 15, 10]} intensity={1.5} color="#e0e7ff" castShadow />
      <directionalLight position={[-10, 5, -5]} intensity={0.8} color="#c7d2fe" />
      <spotLight position={[0, 10, 0]} intensity={1.2} color="#8b5cf6" penumbra={1} angle={0.8} />

      <Environment preset="studio" environmentIntensity={0.8} />

      <AtmosphericOrbs scrollYProgress={scrollYProgress} />
      <HeroGlassScene scrollYProgress={scrollYProgress} />
      <RobotScene scrollYProgress={scrollYProgress} />
      <MacbookScene scrollYProgress={scrollYProgress} />
      <FlowingParticles scrollYProgress={scrollYProgress} />

      <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={25} blur={1.5} far={5} color="#0f172a" resolution={512} />
    </>
  )
}
