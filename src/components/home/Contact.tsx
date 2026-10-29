'use client'

import { useLang } from '@/components/providers/LanguageProvider'
import { SmartLink } from '@/components/common/bits'
import type { Profile } from '@/content/types'
import { HOME_IDS, SECTION_TITLES } from '@/content/ui'
import { SectionHead } from './SectionHead'

export function Contact({ profile }: { profile: Profile }) {
  const { t } = useLang()
  return (
    <section className="section section-last" aria-labelledby={HOME_IDS.contact}>
      <div className="wrap">
        <SectionHead id={HOME_IDS.contact} title={SECTION_TITLES.contact} />
        <ul className="contact-line">
          {profile.contacts.map((contact) => (
            <li key={contact.kind}>
              {contact.value !== t(contact.label) && <span className="label">{t(contact.label)}</span>}
              <SmartLink href={contact.href}>{contact.value}</SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
