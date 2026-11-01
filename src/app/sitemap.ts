import type { MetadataRoute } from 'next'
import { SITE_URL, getCases } from '@/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', ...getCases().map((project) => `/projects/${project.slug}`), '/story', '/archive', '/resume']
  return paths.map((path) => ({ url: `${SITE_URL}${path === '/' ? '' : path}` }))
}
