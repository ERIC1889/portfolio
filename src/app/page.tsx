import { AiSection } from '@/components/home/AiSection'
import { Contact } from '@/components/home/Contact'
import { Intro } from '@/components/home/Intro'
import { Record } from '@/components/home/Record'
import { Showcase } from '@/components/home/Showcase'
import { Skills } from '@/components/home/Skills'
import { WorkCard } from '@/components/home/WorkCard'
import { aiWork, archive, getCaseNames, getRecordStats, getShowcase, getTopActivities, getTopAwards, getWork, profile, projects } from '@/content'
import { HOME_IDS, SECTION_TITLES } from '@/content/ui'

export default function Home() {
  const work = getWork()
  return (
    <main id="main">
      <Intro profile={profile} />
      {work && <WorkCard project={work} />}
      <Showcase id={HOME_IDS.projects} title={SECTION_TITLES.main} projects={getShowcase('main')} />
      <Skills rows={archive.skills} />
      <AiSection ai={aiWork} />
      <Showcase id={HOME_IDS.supporting} title={SECTION_TITLES.supporting} projects={getShowcase('supporting')} more total={projects.length} />
      <Record archive={archive} topAwards={getTopAwards()} topActivities={getTopActivities()} stats={getRecordStats().slice(0, 3)} caseNames={getCaseNames()} />
      <Contact profile={profile} />
    </main>
  )
}
