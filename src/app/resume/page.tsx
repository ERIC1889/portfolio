import { Resume } from '@/components/pages/Resume'
import { SITE_URL, archive, profile, projects } from '@/content'
import { RESUME_SITE } from '@/content/resume'
import { pageMetadata } from '../_lib/pages'

export const metadata = pageMetadata({
  title: '이력서',
  description: '허준영 · 백엔드 중심 풀스택 개발자 이력서.',
  path: '/resume',
})

/** The public copy never carries the portrait: public/resume.pdf is printed from this page and published with the site */
export default function ResumePage() {
  return <Resume profile={profile} archive={archive} projects={projects} siteUrl={SITE_URL} variant={RESUME_SITE} />
}
