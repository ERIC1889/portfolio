import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Resume } from '@/components/pages/Resume'
import { SITE_URL, archive, getResumeProjects, getTopActivities, getTopAwards, profile } from '@/content'
import { daangnVariant } from '@/content/resume'

export const metadata: Metadata = { title: '이력서 (제출본)', robots: { index: false, follow: false } }

/** The submission copy: printed from a development server only. Production builds answer 404, and the 병역·입사 line comes from .env.local, not the repository. */
export default function DaangnResumePage() {
  if (process.env.NODE_ENV === 'production') notFound()
  const ko = process.env.RESUME_SERVICE_KO
  const service = ko ? { ko, en: process.env.RESUME_SERVICE_EN ?? ko } : undefined
  return <Resume profile={profile} archive={archive} projects={getResumeProjects()} topAwards={getTopAwards()} topActivities={getTopActivities()} siteUrl={SITE_URL} variant={daangnVariant(service)} />
}
