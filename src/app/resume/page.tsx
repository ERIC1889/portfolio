import { Resume } from '@/components/pages/Resume'
import { SITE_URL, archive, getResumeProjects, getTopActivities, getTopAwards, profile } from '@/content'
import { RESUME_SITE } from '@/content/resume'
import { pageMetadata } from '../_lib/pages'

export const metadata = pageMetadata({
  title: '이력서',
  description: '허준영 · 백엔드 중심 풀스택 개발자 이력서.',
  path: '/resume',
})

export default function ResumePage() {
  return <Resume profile={profile} archive={archive} projects={getResumeProjects()} topAwards={getTopAwards()} topActivities={getTopActivities()} siteUrl={SITE_URL} variant={RESUME_SITE} />
}
