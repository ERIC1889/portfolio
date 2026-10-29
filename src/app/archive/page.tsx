import { ArchiveView } from '@/components/pages/ArchiveView'
import { archive, getFeatured, getRecordStats, projects } from '@/content'
import { pageMetadata } from '../_lib/pages'

export const metadata = pageMetadata({
  title: '전체 기록',
  description: '허준영의 전체 프로젝트, 논문, 수상, 활동, 학력.',
  path: '/archive',
})

export default function ArchivePage() {
  // Featured projects first in page order, then the rest as written.
  const featured = getFeatured()
  const rest = projects.filter((project) => !featured.includes(project))
  return <ArchiveView archive={archive} projects={[...featured, ...rest]} stats={getRecordStats()} />
}
