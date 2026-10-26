import { Archive } from '@/components/home/Archive'
import { Contact } from '@/components/home/Contact'
import { FeaturedCases } from '@/components/home/FeaturedCases'
import { Hero } from '@/components/home/Hero'
import { JourneyLog } from '@/components/home/JourneyLog'
import { Throughline } from '@/components/home/Throughline'
import { archive, chapters, getFeatured, getHeroStats, getLines, getThroughline, profile } from '@/content'

export default function Home() {
  return (
    <main>
      <Hero profile={profile} stats={getHeroStats()} />
      <JourneyLog chapters={chapters} />
      <Throughline items={getThroughline()} />
      <FeaturedCases projects={getFeatured()} />
      <Archive archive={archive} lines={getLines()} />
      <Contact profile={profile} />
    </main>
  )
}
