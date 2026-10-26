'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useIsMobile } from '@/lib/useIsMobile'

const SceneCanvas = dynamic(() => import('@/components/three/SceneCanvas'), { ssr: false })

export function Background3D() {
  const isMobile = useIsMobile(768)
  const pathname = usePathname()
  // Wait for mount so phones never start downloading the 3D bundle during hydration.
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted || isMobile) return null

  return (
    <div
      data-testid="background-3d"
      aria-hidden="true"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
    >
      {/* The big glass object sits in the home hero's empty column; on reading pages it would cover the text. */}
      <SceneCanvas showHero={pathname === '/'} />
    </div>
  )
}
