'use client'

import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type Variants } from 'framer-motion'

const EASE_OUT = [0.16, 1, 0.3, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, delay: i * 0.07, ease: EASE_OUT } }),
}

export const stagger: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
}

export function ScrollSection({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.15], [60, 0])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 })

  return (
    <section ref={ref} className={className} id={id}>
      <motion.div style={{ opacity: smoothOpacity, y: smoothY }}>{children}</motion.div>
    </section>
  )
}

type TiltCardProps = {
  children: ReactNode
  className?: string
  disableTilt?: boolean
  onClick?: () => void
}

export function TiltCard({ children, className, disableTilt, onClick }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(x, [-0.5, 0.5], [-6, 6])

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    if (disableTilt || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    if (!rect.width || !rect.height) return
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    x.set(px)
    y.set(py)
    ref.current.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    ref.current.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={disableTilt ? {} : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
      }}
      whileHover={disableTilt ? {} : { scale: 1.02 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
