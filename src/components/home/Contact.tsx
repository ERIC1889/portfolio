'use client'

import { motion } from 'framer-motion'
import { useLang } from '@/components/providers/LanguageProvider'
import { ScrollSection, fadeUp, stagger } from '@/components/motion'
import type { Contact as ContactItem, Profile } from '@/content/types'
import { SECTION_TITLES } from '@/content/ui'
import { SectionHead } from './SectionHead'

const ICONS: Record<ContactItem['kind'], string> = {
  phone: '📞',
  email: '✉️',
  address: '📍',
  languages: '🌐',
  github: '💻',
  linkedin: '🔗',
}

function isExternal(href: string) {
  return href.startsWith('http')
}

export function Contact({ profile }: { profile: Profile }) {
  const { t } = useLang()
  return (
    <ScrollSection className="sec" id="contact">
      <div className="sec-inner">
        <SectionHead num="05" title={SECTION_TITLES.contact} />
        <motion.div className="contact-grid" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {profile.contacts.map((contact) => (
            <motion.div key={contact.kind} className="glass contact-card" variants={fadeUp} whileHover={{ y: -5 }}>
              <div className="contact-icon" aria-hidden="true">
                {ICONS[contact.kind]}
              </div>
              <div className="contact-label">{t(contact.label)}</div>
              <div className="contact-value">
                {contact.href ? (
                  <a
                    href={contact.href}
                    {...(isExternal(contact.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {t(contact.value)}
                  </a>
                ) : (
                  t(contact.value)
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </ScrollSection>
  )
}
