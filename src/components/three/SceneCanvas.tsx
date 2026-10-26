'use client'

import { Canvas } from '@react-three/fiber'
import Global3DScene from './Global3DScene'

export default function SceneCanvas({ showHero }: { showHero: boolean }) {
  return (
    <Canvas eventSource={document.body} eventPrefix="client" camera={{ position: [0, 0, 5], fov: 40 }} dpr={[1, 2]}>
      <Global3DScene showHero={showHero} />
    </Canvas>
  )
}
