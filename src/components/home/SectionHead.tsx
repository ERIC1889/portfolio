'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/components/providers/LanguageProvider'
import { fadeUp } from '@/components/motion'
import type { L } from '@/content/types'

export function SectionHead({ num, title }: { num: string; title: L }) {
  const { t } = useLang()
  return (
    <motion.div className="sec-head" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <span className="sec-num">{num}</span>
      <h2>{t(title)}</h2>
    </motion.div>
  )
}
