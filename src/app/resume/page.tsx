import { Resume } from '@/components/pages/Resume'
import { SITE_URL, archive, profile, projects } from '@/content'
import { RESUME_SITE } from '@/content/resume'
import { pageMetadata } from '../_lib/pages'
import { resumePhoto } from '../_lib/resumePhoto'

export const metadata = pageMetadata({
  title: '이력서',
  description: '허준영 · 백엔드 중심 풀스택 개발자 이력서.',
  path: '/resume',
})

/** The portrait is published with the site at the user's request (2026-11-11) */
export default function ResumePage() {
  return <Resume profile={profile} archive={archive} projects={projects} siteUrl={SITE_URL} variant={{ ...RESUME_SITE, photo: resumePhoto() }} />
}
