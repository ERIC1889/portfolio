import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CaseStudy } from '@/components/case/CaseStudy'
import { getFeatured, getProject } from '@/content'
import { getCasePage } from '../../_lib/pages'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return getFeatured().map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  const title = `${project.name} — 허준영`
  const description = (project.question ?? project.summary).ko
  return {
    title,
    description,
    openGraph: { title, description, ...(project.image ? { images: [project.image] } : {}) },
  }
}

// A direct visit or refresh shows the full page; clicks inside the site open @modal/(.)projects instead.
export default async function ProjectPage({ params }: Props) {
  const page = getCasePage((await params).slug)
  if (!page) notFound()
  return <CaseStudy project={page.project} prev={page.prev} next={page.next} />
}
