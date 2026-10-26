'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/components/providers/LanguageProvider'
import { useIsMobile } from '@/lib/useIsMobile'
import type { L, Profile } from '@/content/types'
import { UI } from '@/content/ui'

const PROMPT = '~/junyoung $'

/** "~/junyoung $ whoami → output" split so the prompt and the output can be colored like a terminal. */
function splitWhoami(line: string) {
  const [command, ...rest] = line.split('→')
  return { command: command.replace(PROMPT, '').trim(), output: rest.join('→').trim() }
}

export function Hero({ profile, stats }: { profile: Profile; stats: { label: L; value: number }[] }) {
  const { t } = useLang()
  const isMobile = useIsMobile(768)
  const whoami = splitWhoami(t(profile.whoami))

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-grid" />
      </div>
      <div className="hero-inner">
        <div className="hero-content">
          <motion.img
            src={profile.photo}
            alt={t(UI.photoAlt)}
            className="hero-photo"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          />
          <motion.p
            className="mono hero-whoami"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="term-prompt">{PROMPT}</span> {whoami.command}{' '}
            <span className="term-comment">→ {whoami.output}</span>
          </motion.p>
          <motion.h1
            className="hero-quote gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {t(profile.quote)}
          </motion.h1>
          <motion.p className="hero-sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            {t(profile.intro)}
          </motion.p>
          <motion.dl className="mono hero-stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            {stats.map((stat) => (
              <div key={stat.label.ko}>
                <dt>{t(stat.label)}</dt> <dd>{stat.value}</dd>
              </div>
            ))}
          </motion.dl>
          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a href="/#journey" className="hero-cta">
              {t(UI.ctaJourney)} <span aria-hidden="true">↓</span>
            </a>
            <a href="/#cases" className="btn-glass hero-link">
              {t(UI.ctaCases)}
            </a>
            <a href="https://github.com/ERIC1889" className="btn-glass hero-link" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </motion.div>
        </div>
        <div className="hero-3d">{isMobile && <div className="hero-mobile-glow" />}</div>
      </div>
      <div className="scroll-indicator" aria-hidden="true">
        <div className="scroll-mouse" />
      </div>
    </section>
  )
}
